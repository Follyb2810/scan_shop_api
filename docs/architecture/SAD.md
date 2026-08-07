# Software Architecture Document (SAD)

**Product:** Healthcare Commerce, Supply Chain & Marketplace Platform (Healthcare OS)  
**Document type:** Step 0 — Architecture Package  
**Status:** Pending user approval  
**Stack:** Node.js · Express · TypeScript · Prisma · PostgreSQL · Redis · BullMQ · Zod · Pino · OpenAPI

---

## 1. Purpose

This platform is **not** a generic e-commerce app.

It is a **multi-tenant Healthcare Operating System** that lets healthcare organizations operate independently while participating in a unified marketplace for verified medical products.

Every medicine must be traceable.  
Every scan must verify authenticity.  
Every organization must have isolated data.

---

## 2. Problem with the current codebase

The existing `scan_shop_api` is a **feature-sliced anti-counterfeit starter**:

| Current | Problem |
|---------|---------|
| `Manufacturer` as a special user-linked entity | Not a tenant model |
| Flat `Product` + `ProductUnit` | Collapses catalog, batch, packaging, inventory |
| Roles: ADMIN / MODERATOR / MANUFACTURER / USER | Coarse RBAC, no permissions |
| SQLite | Not production multi-tenant scale |
| Feature folders via `create_module` | Encourages CRUD growth, not bounded contexts |

**Decision:** Treat current code as a **reference prototype**. New architecture lands in bounded modules. Concepts migrate; the old Product-centric shape does not grow.

### Migration mapping (conceptual)

| Legacy | New home |
|--------|----------|
| `User` + auth | `identity` |
| `Role` / `UserRole` | `rbac` (+ platform vs org scope) |
| `Manufacturer` | `organization` (type = Manufacturer) + `workflow` approval |
| `Product` fields | `catalog` (+ split batch fields out) |
| `ProductUnit` + barcode/HMAC | `verification` (+ packaging/retail unit) |
| `AuditLog` (scan-centric) | `audit` (general) + verification scan history |

---

## 3. Architectural style

**Modular monolith** using:

- **Bounded contexts** as modules under `src/modules/*`
- **Clean Architecture layers** inside each module:
  - `domain` — entities, value objects, repository ports
  - `application` — use cases, DTOs, validators
  - `infrastructure` — Prisma repositories, adapters
  - `presentation` — controllers, routes, OpenAPI fragments
- **Shared kernel** only for cross-cutting concerns (`shared/`, `infrastructure/`, `middleware/`)
- **No microservices initially** — extract later only if a context proves independent scale/load needs

### Why modular monolith

- One deployable unit for early stage
- Strong module boundaries without network complexity
- Shared Postgres transactions across inventory + supply-chain + verification
- Clear path to extract `verification` or `marketplace` later

---

## 4. High-level system context

```text
                    ┌──────────────────────────────────────┐
                    │           Healthcare OS API          │
                    │         (Modular Monolith)           │
                    └──────────────────────────────────────┘
           │                │                │                │
           ▼                ▼                ▼                ▼
    Platform Staff    Org Staff         Customers         Scanners
    (SaaS ops)        (tenants)         (non-tenant)      (verify)
           │                │                │                │
           └────────────────┴────────────────┴────────────────┘
                                    │
                    ┌───────────────┼───────────────┐
                    ▼               ▼               ▼
               PostgreSQL        Redis          BullMQ
               (source of       (cache,        (email/SMS,
                truth)         sessions,        webhooks,
                               rate limit)      analytics)
```

---

## 5. Bounded contexts

| Module | Responsibility | Owns data? |
|--------|----------------|------------|
| `identity` | Auth, sessions, devices, 2FA, password reset | Yes |
| `platform` | SaaS owner operations, platform settings | Yes |
| `rbac` | Permission catalog, platform/org roles, grants | Yes |
| `organization` | Tenants, types, branches, memberships | Yes |
| `workflow` | Reusable approval engine | Yes |
| `catalog` | Product hierarchy (family → package) | Yes |
| `batch` | Lots, QA, certificates, recall flags | Yes |
| `warehouse` | Warehouses under branches | Yes |
| `inventory` | Stock states by location/batch/pack level | Yes |
| `verification` | Unit identity, QR/HMAC, scans | Yes |
| `supply-chain` | Inter-org custody transfers | Yes |
| `marketplace` | Listings, cart, orders, promos, reviews | Yes |
| `customer` | Non-tenant buyer profiles/addresses | Yes |
| `payments` | Payment intents & settlement hooks | Yes |
| `notification` | Email/SMS/push/in-app/webhooks | Yes |
| `analytics` | Aggregated read models / queries | Read-mostly |
| `audit` | Immutable-enough activity trail | Yes |

**Rule:** Modules communicate via **application services / domain events**, not by reaching into another module’s Prisma models from controllers.

---

## 6. Multi-tenancy strategy

### Decision: Shared DB + shared schema + row-level isolation

| Option | Chosen? | Why |
|--------|---------|-----|
| DB-per-tenant | No | Ops cost too high at thousands of orgs |
| Schema-per-tenant | No | Migration pain at scale |
| **Shared schema + `organizationId`** | **Yes** | Standard SaaS; enforce in middleware + repositories |

### Tenant rules

1. Every tenant-scoped row carries `organizationId` (UUID).
2. `resolveTenant` middleware sets `RequestContext.organizationId` from:
   - JWT membership claim, and/or
   - `X-Organization-Id` header validated against user’s memberships
3. Repositories **must** include tenant predicate on reads/writes.
4. Platform routes use platform roles; they may act across tenants only with explicit platform permissions (e.g. `platform.organizations.manage`).
5. Customers have **no** `organizationId` for tenancy; they interact with marketplace/verification as platform users.
6. Cross-tenant supply-chain and marketplace interactions are **explicit contracts** (transfer/order), not shared table reads.

### Isolation enforcement layers

```text
HTTP → authenticate → resolveTenant → requirePermission → use case → repository (tenant filter) → DB
                              ↓
                         audit middleware
```

Fail closed: missing tenant context on a tenant route → `403`.

---

## 7. Actor model

### 7.1 Platform users (staff)

Operate the SaaS itself. Seeded platform roles (see RBAC matrix).

### 7.2 Organization users (tenant members)

Belong to one or more organizations via `Membership`.  
Hold org roles (default + custom).  
Custom roles may only attach **existing platform-defined permissions**.

### 7.3 Customers (non-tenant)

- Register/login as platform identity
- No organization membership required
- Browse marketplace, buy, track orders, verify medicine, scan history, addresses, profile, recall notifications

### 7.4 One identity, multiple hats

A single `User` may be:

- Platform staff, and/or
- Member of multiple orgs, and/or
- A customer

Authorization is always evaluated in **request context** (which hat is active).

---

## 8. Organization structure

```text
Organization (tenant)
├── OrganizationType (Manufacturer, Pharmacy, …) — extensible seed
├── Branches (Lekki, Ikeja, …)
│   ├── Memberships / staff assignments
│   └── Warehouses (Main, Cold Storage, …)
│       └── Inventory positions
├── Roles (default seeded + custom)
└── Catalog / Batches / Listings (as permitted)
```

---

## 9. Product & packaging domain (summary)

Full hierarchy is in `domain-model.md`. Core idea:

```text
ProductFamily → Brand → Medicine → Variant → PackageDefinition
                                      ↓
                                   Batch
                                      ↓
                         PackagingInstance tree
                         (Pallet→…→RetailUnit)
                                      ↓
                         Verification identity (signed QR)
```

Inventory is **not** a column on Product. It is a position:

`Org → Branch → Warehouse → Batch → PackagingLevel → quantity by stock state`

---

## 10. Verification & anti-forgery

### QR / barcode payload (logical)

```text
v=1
pid=<platformId>
oid=<organizationId>
prd=<productOrPackageId>
bid=<batchId>
lvl=<packagingLevel>
uid=<retailOrLogisticsUnitId>
ts=<unix>
sig=<HMAC-SHA256>
```

### Rules

- Sign with server-side secret (per env; future: key rotation via `kid`)
- Never put PII or cost/price in QR
- Scan verifies: signature, product, manufacturer org, batch, expiry, recall, custody/ownership, authenticity flags
- Scan events are append-only history

Legacy barcode format `MSC|M:…|P:…|U:…|S:…` is superseded by versioned signed payload; adapters may support legacy during migration.

---

## 11. Workflow engine

Approvals are **not** hardcoded per feature.

```text
WorkflowDefinition (type, steps, permissions)
        ↓
WorkflowInstance (subjectType, subjectId, status)
        ↓
WorkflowStepInstance + ApprovalAction
```

**Initial subjects:** organization approval, manufacturer approval, product approval, marketplace listing approval, role elevation (optional), recall approval, inventory adjustment approval.

Modules start workflows through a `WorkflowService` port; they do not reimplement approval graphs.

---

## 12. Security architecture

| Control | Approach |
|---------|----------|
| Transport | TLS in deployment; Helmet headers |
| Auth | JWT access (short) + refresh rotation |
| Passwords | bcrypt/argon2 (decide in Step 4; prefer argon2id if feasible) |
| Input | Zod at boundary |
| Injection | Prisma parameterized queries |
| Tenancy | Middleware + repository filters + tests |
| Authz | Permission checks (`resource.action`) |
| Rate limit | Redis-backed |
| Audit | Mutating actions → audit log |
| Secrets | Env validated by Zod; never committed |
| CSRF | Bearer-token API (stateless); document cookie rules if cookies added |

---

## 13. Cross-cutting infrastructure

| Concern | Tech |
|---------|------|
| Primary DB | PostgreSQL |
| Cache / sessions / rate limit | Redis |
| Jobs | BullMQ (notifications, webhooks, heavy analytics) |
| Logging | Pino (structured JSON) |
| API docs | OpenAPI / Swagger UI |
| Validation | Zod |
| Containers | Docker + Compose |

---

## 14. API design principles

- REST, versioned: `/api/v1/...`
- Consistent error envelope
- Pagination: cursor or offset (standardize in Step 3; prefer cursor for large lists)
- Idempotency keys for payments and transfers (Step 13/15)
- OpenAPI is source of truth for public contract

---

## 15. Quality attributes

| Attribute | Target approach |
|-----------|-----------------|
| Scalability | Stateless API; Redis; indexed tenant queries; queues for async |
| Security | Defense in depth; fail-closed authz |
| Maintainability | Bounded modules; no god services |
| Auditability | Audit module + verification scan history |
| Extensibility | Permission catalog + workflow + packaging levels as data |
| Testability | Use cases unit-tested; tenant isolation integration suite |

---

## 16. Explicit non-goals (v1)

- Microservices / event mesh
- Full ERP / accounting suite
- Telemedicine / prescriptions (extension points only)
- Insurance adjudication
- Per-tenant DB routing
- Real-time multiplayer inventory UI

These must be addable **without rewriting** tenancy, RBAC, catalog, or verification cores.

---

## 17. Risks & mitigations

| Risk | Mitigation |
|------|------------|
| Accidental tenant leakage | Mandatory tenant tests from Step 6; repository helpers |
| God `Product` module returns | Split catalog/batch/inventory/verification |
| Approval logic duplication | Workflow engine early (Step 7) |
| Permission explosion chaos | Naming convention + seed ownership by platform |
| Premature marketplace complexity | MVP slice inside Step 14 with explicit deferrals noted |

---

## 18. Approval gate

Step 1 (foundation code) starts only after explicit:

```text
Approve Step 0
```

Related artifacts:

- [domain-model.md](./domain-model.md)
- [erd.md](./erd.md)
- [prisma-schema-proposal.md](./prisma-schema-proposal.md)
- [folder-structure.md](./folder-structure.md)
- [roadmap.md](./roadmap.md)
- [../rbac/roles-permissions-matrix.md](../rbac/roles-permissions-matrix.md)
- [../api/api-spec-outline.md](../api/api-spec-outline.md)
