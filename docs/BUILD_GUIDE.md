# Healthcare OS Backend — Step-by-Step Build Guide

Follow this guide **in order**.  
At each step, tell the agent: **“Do Step N”** (or **“Approve Step N and continue”** when review is required).

Do **not** skip ahead. Each step must be complete before the next starts.

---

## How to use this guide

| You say | What happens |
|---------|----------------|
| `Do Step 0` | Architecture docs only — **no application code** |
| `Approve Step 0` | You reviewed the SAD / ERD / RBAC / API / roadmap |
| `Do Step 1` | Foundation scaffolding starts |
| `Do Step N` | That module/phase is built end-to-end |
| `Status` | Agent reports which step is done / in progress / blocked |

### Definition of Done (every implementation step)

A step is **done** only when all of these exist for that step:

- [ ] Code + folder structure for the step
- [ ] Prisma models / migration (when schema changes)
- [ ] Seed data (when applicable)
- [ ] Tests (unit and/or integration)
- [ ] Swagger / OpenAPI updated
- [ ] Short step notes in `docs/progress/STEP-XX.md`

---

## Phase map

```text
Phase A — Design          Steps 0
Phase B — Foundation      Steps 1–3
Phase C — Access & Tenancy Steps 4–7
Phase D — Product Core    Steps 8–12
Phase E — Commerce        Steps 13–15
Phase F — Platform Ops    Steps 16–18
Phase G — Hardening       Steps 19–21
```

---

# Phase A — Design (no code)

## Step 0 — Software Architecture Package

**Goal:** Lock the system design before writing runtime code.

**Deliverables:**

| Artifact | Path |
|----------|------|
| Software Architecture Document | `docs/architecture/SAD.md` |
| Domain Model | `docs/architecture/domain-model.md` |
| ERD | `docs/architecture/erd.md` |
| Prisma schema proposal | `docs/architecture/prisma-schema-proposal.md` |
| RBAC matrix | `docs/rbac/roles-permissions-matrix.md` |
| API specification outline | `docs/api/api-spec-outline.md` |
| Target folder structure | `docs/architecture/folder-structure.md` |
| Implementation roadmap | `docs/architecture/roadmap.md` |

**Includes decisions for:**

- Multi-tenant isolation strategy
- Platform users vs org users vs customers
- Permission naming convention (`resource.action`)
- Packaging hierarchy model
- Workflow engine shape
- Verification / HMAC payload design
- Module build order

**Gate:** You must reply **`Approve Step 0`** before Step 1.

**You say:** `Do Step 0`

---

# Phase B — Foundation

## Step 1 — Project foundation & tooling

**Goal:** Production-ready skeleton (stack + layout only).

**Build:**

- Folder structure (`src/shared`, `src/infrastructure`, `src/middleware`, `src/modules`, `src/api`, `tests`, `docs`)
- TypeScript strict config
- Zod-validated env (`src/config/env.ts`)
- Pino logger
- Express app bootstrap (`main.ts`, `app.ts`)
- Error classes + response helpers
- Helmet, CORS, rate limiting stubs
- Docker + Docker Compose (PostgreSQL + Redis)
- **Development DB: SQLite** (`DATABASE_PROVIDER=sqlite`); Postgres/Redis via Docker for infra + future switch
- Health check: `GET /api/v1/health`

**Out of scope:** Domain modules, auth business logic beyond stubs.

**Done when:** App boots on SQLite; health endpoint works; Compose files exist for Postgres + Redis (`npm run docker:up`).

**You say:** `Do Step 1`

---

## Step 2 — Shared infrastructure

**Goal:** Cross-cutting infrastructure used by every module.

**Build:**

- Prisma client + transaction helper
- Redis client
- BullMQ connection + queue registry
- Request context type (`tenantId`, `userId`, `permissions`, `branchId`)
- Async handler, pagination helpers
- Lightweight DI container
- Base repository patterns (optional thin helpers)
- Test harness (`tests/helpers`)

**Done when:** Infrastructure can be imported by modules; smoke tests pass.

**You say:** `Do Step 2`

---

## Step 3 — Global middleware & API shell

**Goal:** Every request can carry identity/tenant/permission context (hooks ready).

**Build:**

- `authenticate` middleware (JWT parse deferred until Identity exists — stub OK)
- `resolveTenant` middleware skeleton
- `requirePermission` / `requirePlatformRole` skeletons
- Zod `validate` middleware
- Central error handler
- Request logging
- `/api/v1` router mount point
- Swagger UI wiring

**Done when:** Middleware chain is mounted; Swagger UI loads; unauthenticated routes return consistent errors.

**You say:** `Do Step 3`

---

# Phase C — Access & Tenancy

## Step 4 — Identity module

**Goal:** Users can register, login, refresh, verify email, reset password.

**Domain:** `src/modules/identity`

**Build:**

- User, Session, RefreshToken, Device, LoginHistory, EmailVerification, PasswordReset, TwoFactor models
- Register / login / logout / refresh
- Email verification + password reset flows
- Session + device management
- JWT access + refresh token rotation
- Unit + API tests
- Swagger paths under `/api/v1/auth`

**Done when:** Full auth happy path + refresh rotation tested.

**You say:** `Do Step 4`

---

## Step 5 — RBAC module

**Goal:** Platform-defined permissions; assignable roles.

**Domain:** `src/modules/rbac`

**Build:**

- Permission catalog (hundreds-ready naming: `product.create`, `inventory.transfer`, …)
- Platform roles seed
- Organization default roles seed
- Custom org roles (assign existing permissions only — cannot invent permissions)
- Role ↔ permission grants
- `requirePermission` fully wired to DB/cache
- RBAC matrix doc updated to match seed reality

**Done when:** Permission middleware enforces real grants; seeds idempotent.

**You say:** `Do Step 5`

---

## Step 6 — Organization / multi-tenant module

**Goal:** Tenants exist; data isolation is enforced.

**Domain:** `src/modules/organization`

**Build:**

- Organization, OrganizationType, Branch, Membership
- Org types seed (Manufacturer, Pharmacy, Distributor, …)
- Create org + seed default roles/memberships
- Branch CRUD
- Tenant-aware middleware **enforced** on org-scoped routes
- Isolation tests (tenant A cannot read tenant B)

**Critical:** No tenant data leakage.

**Done when:** Integration tests prove isolation.

**You say:** `Do Step 6`

---

## Step 7 — Workflow engine

**Goal:** Reusable approvals — not hardcoded per feature.

**Domain:** `src/modules/workflow`

**Build:**

- WorkflowDefinition, WorkflowInstance, WorkflowStep, ApprovalAction
- Support targets: org approval, manufacturer approval, product approval, marketplace, recall, inventory
- Submit / approve / reject / cancel APIs
- Hooks for other modules to start a workflow

**First consumer:** Organization / manufacturer onboarding approval.

**Done when:** Org approval runs through workflow engine (not a one-off status flip only).

**You say:** `Do Step 7`

---

# Phase D — Product Core

## Step 8 — Catalog module

**Goal:** Healthcare-grade product hierarchy (not a flat Product table).

**Domain:** `src/modules/catalog`

**Build:**

- ProductFamily → Brand → Medicine → Variant → Strength / DosageForm → Package
- Categories, dosage forms, packaging types (seed)
- Tenant-scoped catalog writes
- Lifecycle states starting at Draft / Submitted
- Swagger + tests

**Done when:** Can create a full hierarchy for one medicine with variants/packages.

**You say:** `Do Step 8`

---

## Step 9 — Batch module

**Goal:** Manufacturing batch as a first-class aggregate.

**Domain:** `src/modules/batch`

**Build:**

- Batch number, Mfg/Expiry, lot, QA status, quantities, recall status
- NAFDAC / certificates / documents metadata
- Link to catalog package + manufacturer org
- Workflow integration for QA / approval where needed

**Done when:** Batch create + QA status transitions tested.

**You say:** `Do Step 9`

---

## Step 10 — Warehouse module

**Goal:** Branches own warehouses.

**Domain:** `src/modules/warehouse`

**Build:**

- Warehouse types seed (Main, Cold Storage, Returns, Transit, Overflow)
- Warehouse CRUD under Branch
- Access scoped by org + branch permissions

**Done when:** Org can manage multiple warehouses per branch.

**You say:** `Do Step 10`

---

## Step 11 — Inventory module

**Goal:** Inventory is stock state by location + batch + packaging — not a single quantity.

**Domain:** `src/modules/inventory`

**Build:**

- Stock positioned at Org → Branch → Warehouse → Batch → Packaging level
- States: Reserved, Available, Damaged, Expired, Quarantined, Returned, Sold, Transferred, Destroyed
- Reserve / release / adjust / transfer-within-org
- Transactions for consistency

**Done when:** Inventory movements keep totals consistent under concurrent-style tests.

**You say:** `Do Step 11`

---

## Step 12 — Verification module

**Goal:** Secure unit identity + scan authenticity.

**Domain:** `src/modules/verification`

**Build:**

- Logistics / retail unit identity
- HMAC-signed QR payload (Platform, Org, Product, Batch, Packaging, Unit, Timestamp)
- Scan API verifying product, manufacturer, batch, expiry, recall, ownership, authenticity
- Scan history
- Migrate concepts from old `ProductUnit` / barcode design into this domain

**Done when:** Forged signatures fail; valid scans return verification result + audit trail.

**You say:** `Do Step 12`

---

# Phase E — Commerce & Chain

## Step 13 — Supply chain module

**Goal:** Custody transfers across organizations.

**Domain:** `src/modules/supply-chain`

**Build:**

- Transfer records: sender, receiver, batch, qty, docs, approved/received by, status
- Manufacturer → Distributor → Wholesaler → Pharmacy → Customer path support
- Inventory updates on accept
- Workflow hooks for transfer approval

**Done when:** End-to-end transfer changes ownership/stock correctly.

**You say:** `Do Step 13`

---

## Step 14 — Marketplace + customer modules

**Goal:** Cross-tenant listing/buying for allowed org types; customers are non-tenant platform users.

**Domains:** `src/modules/marketplace`, `src/modules/customer`

**Build:**

- Customer profile, addresses, wishlist, scan history access
- Listings, categories, search
- Cart, orders, tracking
- Reviews, ratings, discounts/coupons/promotions (MVP subset OK if phased inside step notes)
- Marketplace approval via workflow

**Done when:** Customer can browse, order from a listing, track order.

**You say:** `Do Step 14`

---

## Step 15 — Payments module

**Goal:** Payment intents + order settlement hooks.

**Domain:** `src/modules/payments`

**Build:**

- Payment records, status machine
- Provider interface (stub adapter acceptable first)
- Webhook-ready endpoint shape
- Link to marketplace orders

**Done when:** Order can move to paid via stub provider + tests.

**You say:** `Do Step 15`

---

# Phase F — Platform Ops

## Step 16 — Notification module

**Goal:** Multi-channel notifications + queues.

**Domain:** `src/modules/notification`

**Build:**

- In-app notifications
- Email / SMS / push adapters (interfaces + at least one real or console adapter)
- Webhook event emission
- BullMQ workers
- Recall notification path hook

**Done when:** A domain event produces a queued notification job that completes.

**You say:** `Do Step 16`

---

## Step 17 — Analytics module

**Goal:** Dashboard aggregates at platform / org / branch / warehouse levels.

**Domain:** `src/modules/analytics`

**Build:**

- Read models / query services for sales, inventory, scans, verification, orders, recalls
- Permission-gated endpoints
- No heavy BI platform required — correct aggregations first

**Done when:** Key dashboard endpoints return consistent numbers from seeded fixtures.

**You say:** `Do Step 17`

---

## Step 18 — Audit module

**Goal:** Audit everything important immutably-enough for compliance.

**Domain:** `src/modules/audit`

**Build:**

- Audit log: actor, action, old/new values, IP, UA, location, org/branch/warehouse, timestamp
- Middleware / service helper used by other modules
- Query APIs for platform auditors + org-scoped audit views

**Done when:** Critical mutations write audit rows; query APIs permission-checked.

**You say:** `Do Step 18`

---

# Phase G — Hardening & Ship

## Step 19 — Security hardening pass

**Goal:** Production security baseline.

**Build / verify:**

- Helmet, CORS, rate limits tuned
- Refresh rotation + reuse detection
- Tenant isolation regression suite
- Password hashing policy
- CSRF strategy documented for cookie vs bearer
- Secrets only via env
- Permission fuzz tests on sensitive routes

**Done when:** Security checklist in `docs/deployment/production-checklist.md` is filled for auth/tenancy.

**You say:** `Do Step 19`

---

## Step 20 — Documentation completion

**Goal:** Docs match the running system.

**Build:**

- Complete Swagger for all shipped routes
- ERD regenerated from final Prisma
- Architecture diagrams + major sequence diagrams
- RBAC matrix final
- Setup guide + Docker guide + production checklist
- Testing strategy doc updated

**Done when:** A new engineer can run the stack from docs alone.

**You say:** `Do Step 20`

---

## Step 21 — Full test suite & release candidate

**Goal:** Confidence for deploy.

**Build:**

- Unit + integration + API tests green
- Tenant isolation suite green
- Seed for demo orgs (Pfizer-like, Pharmacy A, etc.) optional
- Tag release candidate notes in `docs/progress/STEP-21.md`

**Done when:** CI-ready test command passes locally.

**You say:** `Do Step 21`

---

## Progress tracking

After each completed step, create:

```text
docs/progress/STEP-XX.md
```

With:

- What shipped
- Migrations added
- Endpoints added
- Tests added
- Deviations from SAD (if any)
- Next step

Also keep a single status file:

```text
docs/progress/STATUS.md
```

Example:

```md
Current step: 4
Last completed: 3
Blocked: no
Notes: Waiting for user to say "Do Step 4"
```

---

## Quick command cheat sheet

| Intent | Say this |
|--------|----------|
| Start design | `Do Step 0` |
| Approve architecture | `Approve Step 0` |
| Build next foundation piece | `Do Step 1` … `Do Step 3` |
| Build next domain | `Do Step 4` … |
| See where we are | `Status` |
| Revisit a finished step (fixes only) | `Fix Step N: <issue>` |
| Pause after current step | `Stop after this step` |

---

## Important rules (for you and the agent)

1. **Architecture before features** — Step 0 is mandatory.
2. **No bolting onto old `Product` / `ProductUnit` modules** — migrate concepts into new bounded contexts.
3. **One step at a time** — complete DoD before advancing.
4. **Tenant isolation is non-negotiable** from Step 6 onward.
5. **Organizations cannot invent permissions** — only assign platform permissions.
6. **Workflow engine owns approvals** — avoid scattered `if (status === 'APPROVED')` special cases for new flows.
7. **Prefer extending domains** over growing a god `Product` service.

---

## Suggested first session

```text
1. Do Step 0
2. Review the docs
3. Approve Step 0
4. Do Step 1
```

Start when ready: **`Do Step 0`**
