# RBAC Matrix — Roles → Permissions

**Status:** Final as of Step 20 (aligned with `src/modules/rbac/domain/catalog.ts`)  
**Source of truth:** `src/modules/rbac/domain/catalog.ts` + `npm run seed:rbac`

**Rules:**

1. Only the **platform** defines permissions.
2. Organizations may create **custom roles** and attach existing **org-scoped** permissions only (never `platform.*`).
3. Permission key format: `resource[.subresource].action`
4. Evaluation uses active request context (platform hat vs org hat vs customer).
5. Grants are loaded by `loadRbac` middleware into `RequestContext.permissions`.

---

## Seed counts (v1)

| Item | Count |
|------|------:|
| Permissions | 54 |
| Platform roles | 10 |
| Org role templates | 16 |

---

## 1. Permission catalog (seed v1)

Grouped list. Expandable without schema changes.

### Platform

| Permission | Description |
|------------|-------------|
| `platform.organizations.read` | View any organization |
| `platform.organizations.manage` | Create/update/suspend orgs |
| `platform.organizations.approve` | Approve org onboarding workflows |
| `platform.users.manage` | Manage platform staff users |
| `platform.roles.manage` | Manage platform roles |
| `platform.settings.manage` | Platform settings |
| `platform.analytics.view` | Platform-wide analytics |
| `platform.audit.view` | Platform-wide audit |
| `platform.moderation.manage` | Moderate listings/content |
| `platform.support.manage` | Support tooling |
| `platform.finance.view` | Finance/revenue views |
| `platform.marketing.manage` | Marketing tools |
| `platform.pr.manage` | PR/comms tools |

### Organization & users

| Permission | Description |
|------------|-------------|
| `organization.read` | View org profile |
| `organization.update` | Update org profile/settings |
| `organization.branches.manage` | Manage branches |
| `users.read` | List org members |
| `users.manage` | Invite/remove/update members |
| `roles.read` | View org roles |
| `roles.manage` | Create custom roles / assign permissions |
| `settings.update` | Org settings |

### Catalog & batch

| Permission | Description |
|------------|-------------|
| `product.create` | Create catalog entities |
| `product.read` | View catalog |
| `product.update` | Update catalog |
| `product.delete` | Soft-delete catalog |
| `product.publish` | Submit/publish catalog |
| `product.approve` | Approve products (workflow actor) |
| `batch.create` | Create batches |
| `batch.read` | View batches |
| `batch.update` | Update batch metadata |
| `batch.qa.manage` | QA transitions |
| `batch.recall.manage` | Initiate/manage recalls |

### Warehouse & inventory

| Permission | Description |
|------------|-------------|
| `warehouse.manage` | CRUD warehouses |
| `warehouse.read` | View warehouses |
| `inventory.read` | View stock |
| `inventory.adjust` | Adjust quantities |
| `inventory.transfer` | Transfer within org |
| `inventory.reserve` | Reserve stock |
| `inventory.approve` | Approve sensitive inventory workflows |

### Verification

| Permission | Description |
|------------|-------------|
| `barcode.generate` | Generate signed unit identities |
| `barcode.scan` | Perform authenticated scans (staff) |
| `verification.read` | View verification/scan data |

### Supply chain

| Permission | Description |
|------------|-------------|
| `supply_chain.read` | View transfers |
| `supply_chain.create` | Create transfers |
| `supply_chain.approve` | Approve transfers |
| `supply_chain.receive` | Receive transfers |

### Marketplace & orders

| Permission | Description |
|------------|-------------|
| `marketplace.listing.manage` | Create/update listings |
| `marketplace.listing.publish` | Submit listing for approval |
| `orders.read` | View org orders |
| `orders.manage` | Fulfill/manage orders |
| `payments.read` | View payment status |

### Analytics, reports, audit

| Permission | Description |
|------------|-------------|
| `analytics.view` | Org/branch/warehouse analytics |
| `reports.export` | Export reports |
| `audit.view` | View org audit logs |

### Public / customer (not org permissions)

Customer capabilities are **feature flags / auth checks**, not org RBAC:

- register/login, browse, buy, track orders, verify medicine, scan history, addresses, profile, recall notifications

Public scan may be allowed without auth; authenticated scan attaches user identity.

---

## 2. Platform roles → permissions

| Role | Intended use | Permissions (summary) |
|------|--------------|------------------------|
| `SUPER_ADMIN` | Full SaaS control | **All platform + break-glass org read** |
| `PLATFORM_ADMIN` | Ops admin | All `platform.*` except irreversible super-only keys (document any reserved) |
| `PLATFORM_SUPPORT` | Support | `platform.support.manage`, `platform.organizations.read`, `platform.users.manage` (limited), `audit.view` (platform) |
| `PLATFORM_MODERATOR` | Content/listing moderation | `platform.moderation.manage`, `platform.organizations.read` |
| `PLATFORM_ACCOUNTANT` | Finance | `platform.finance.view`, `platform.analytics.view` |
| `PLATFORM_ANALYST` | Data | `platform.analytics.view`, `reports.export` (platform scope) |
| `PLATFORM_AUDITOR` | Compliance | `platform.audit.view`, `platform.organizations.read`, `analytics.view` (read-only platform) |
| `PLATFORM_MARKETING` | Growth | `platform.marketing.manage`, `platform.analytics.view` |
| `PLATFORM_PR` | Comms | `platform.pr.manage` |
| `PLATFORM_VIEWER` | Read-only staff | `platform.organizations.read`, `platform.analytics.view` |

Exact seed grants are encoded in `src/modules/rbac/domain/catalog.ts`.  
`SUPER_ADMIN` receives **all** permission keys from the catalog.

---

## 3. Organization default roles → permissions

Seeded on every new organization. `isSystem = true`.

| Role | Permissions |
|------|-------------|
| `OWNER` | All org-scoped permissions |
| `ADMIN` | All except maybe `roles.manage` restriction optional — **v1: almost all, including roles.manage** |
| `MODERATOR` | `product.read/update`, `marketplace.listing.manage`, moderation-like org content |
| `TEAM_MANAGER` | `users.read`, `users.manage`, `organization.branches.manage`, `roles.read` |
| `ACCOUNTANT` | `orders.read`, `payments.read`, `analytics.view`, `reports.export` |
| `WAREHOUSE_MANAGER` | `warehouse.*`, `inventory.*`, `supply_chain.read/receive` |
| `INVENTORY_MANAGER` | `inventory.*`, `warehouse.read`, `batch.read` |
| `QUALITY_ASSURANCE` | `batch.read`, `batch.qa.manage`, `batch.recall.manage`, `product.read`, `audit.view` |
| `PRODUCTION_MANAGER` | `product.*` (except approve if platform-only), `batch.create/update`, `barcode.generate` |
| `SALES_MANAGER` | `marketplace.listing.*`, `orders.*`, `analytics.view` |
| `CUSTOMER_SUPPORT` | `orders.read`, `users.read`, `verification.read` |
| `MARKETING` | `marketplace.listing.manage`, `analytics.view` |
| `PHARMACIST` | `product.read`, `inventory.read`, `orders.manage`, `barcode.scan`, `verification.read` |
| `CASHIER` | `orders.manage`, `barcode.scan`, `inventory.read` |
| `VIEWER` | `*.read` / `analytics.view` (read-only set) |
| `USER` | Minimal: `organization.read`, `product.read`, `inventory.read` |

### Suggested detailed grants (system roles)

Legend: ✓ = granted

| Permission | OWNER | ADMIN | WAREHOUSE_MANAGER | INVENTORY_MANAGER | QA | PRODUCTION | PHARMACIST | CASHIER | VIEWER |
|------------|:-----:|:-----:|:-----------------:|:-----------------:|:--:|:----------:|:----------:|:-------:|:------:|
| `organization.update` | ✓ | ✓ | | | | | | | |
| `users.manage` | ✓ | ✓ | | | | | | | |
| `roles.manage` | ✓ | ✓ | | | | | | | |
| `product.create` | ✓ | ✓ | | | | ✓ | | | |
| `product.publish` | ✓ | ✓ | | | | ✓ | | | |
| `batch.create` | ✓ | ✓ | | | | ✓ | | | |
| `batch.qa.manage` | ✓ | ✓ | | | ✓ | | | | |
| `batch.recall.manage` | ✓ | ✓ | | | ✓ | | | | |
| `warehouse.manage` | ✓ | ✓ | ✓ | | | | | | |
| `inventory.transfer` | ✓ | ✓ | ✓ | ✓ | | | | | |
| `inventory.adjust` | ✓ | ✓ | ✓ | ✓ | | | | | |
| `barcode.generate` | ✓ | ✓ | | | | ✓ | | | |
| `barcode.scan` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | |
| `supply_chain.create` | ✓ | ✓ | ✓ | | | | | | |
| `supply_chain.approve` | ✓ | ✓ | ✓ | | | | | | |
| `supply_chain.receive` | ✓ | ✓ | ✓ | ✓ | | | | | |
| `marketplace.listing.manage` | ✓ | ✓ | | | | | | | |
| `orders.manage` | ✓ | ✓ | | | | | ✓ | ✓ | |
| `analytics.view` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | | | ✓ |
| `audit.view` | ✓ | ✓ | | | ✓ | | | | |
| `reports.export` | ✓ | ✓ | | | | | | | |

Remaining system roles follow `ORG_ROLE_TEMPLATES` in `catalog.ts` (seed-authoritative).

### Runtime APIs (Step 5)

| Method | Path | Permission |
|--------|------|------------|
| GET | `/api/v1/rbac/permissions` | Authenticated |
| GET | `/api/v1/rbac/platform/roles` | Authenticated |
| POST | `/api/v1/rbac/platform/users/:userId/roles` | `platform.roles.manage` |
| GET | `/api/v1/rbac/me` | Authenticated (org via `X-Organization-Id`) |
| POST | `/api/v1/rbac/organizations/bootstrap` | Authenticated (temp until Step 6) |
| GET/POST | `/api/v1/organizations/:orgId/roles` | `roles.read` / `roles.manage` |

---

## 4. Custom roles

```text
POST /api/v1/organizations/:orgId/roles
body: { name, permissionKeys: string[] }
```

Validations:

- All `permissionKeys` must exist in platform Permission table
- Reject unknown keys
- Cannot escalate to platform-only permissions from org context
- Only `roles.manage` holders can create/assign

---

## 5. Authorization algorithm

```text
1. Authenticate JWT → userId
2. Resolve actor mode:
   - platform route → load PlatformUserRole permissions
   - org route → validate membership + load MembershipRole → permissions
   - customer route → require CustomerProfile / authenticated user
3. requirePermission('inventory.transfer') → intersection check
4. Repository applies organizationId from context
```

Caching: Redis cache of `userId+orgId → permission set` with TTL; invalidate on role changes.

---

## 6. Mapping from legacy roles

| Legacy | New |
|--------|-----|
| `ADMIN` | `SUPER_ADMIN` or `PLATFORM_ADMIN` |
| `MODERATOR` | `PLATFORM_MODERATOR` |
| `MANUFACTURER` | Org membership + `OWNER`/`PRODUCTION_MANAGER` on Manufacturer org |
| `USER` | `CustomerProfile` and/or org `USER` |
