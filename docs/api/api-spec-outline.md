# API Specification Outline (`/api/v1`)

REST · JSON · Bearer JWT (unless noted) · OpenAPI will be generated/updated per implementation step.

---

## Conventions

| Topic | Standard |
|-------|----------|
| Base path | `/api/v1` |
| Auth header | `Authorization: Bearer <accessToken>` |
| Tenant header | `X-Organization-Id: <uuid>` on org-scoped routes |
| Success | `{ "success": true, "data": ..., "meta": ... }` |
| Error | `{ "success": false, "error": { "code", "message", "details?" } }` |
| Pagination | `?cursor=&limit=` (preferred) or `?page=&limit=` during early steps |
| Idempotency | `Idempotency-Key` on payments & transfers |

---

## 1. System

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/health` | Public | Liveness |
| GET | `/ready` | Public | DB/Redis readiness |

---

## 2. Auth — `/auth`

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/auth/register` | Public | Register identity (customer default) |
| POST | `/auth/login` | Public | Access + refresh tokens |
| POST | `/auth/refresh` | Refresh token | Rotate tokens |
| POST | `/auth/logout` | Auth | Revoke session/refresh family |
| POST | `/auth/verify-email` | Public | Confirm email token |
| POST | `/auth/forgot-password` | Public | Request reset |
| POST | `/auth/reset-password` | Public | Reset with token |
| POST | `/auth/2fa/setup` | Auth | Begin 2FA |
| POST | `/auth/2fa/enable` | Auth | Confirm 2FA |
| POST | `/auth/2fa/disable` | Auth | Disable 2FA |
| GET | `/auth/sessions` | Auth | List sessions |
| DELETE | `/auth/sessions/:id` | Auth | Revoke session |
| GET | `/auth/devices` | Auth | List devices |
| GET | `/auth/login-history` | Auth | Login history |
| GET | `/auth/me` | Auth | Current user + hats |

---

## 3. Platform — `/platform`

Platform roles required.

| Method | Path | Permission | Description |
|--------|------|------------|-------------|
| GET | `/platform/organizations` | `platform.organizations.read` | List orgs |
| GET | `/platform/organizations/:id` | `platform.organizations.read` | Get org |
| PATCH | `/platform/organizations/:id` | `platform.organizations.manage` | Suspend/update |
| POST | `/platform/organizations/:id/approve` | `platform.organizations.approve` | Approve via workflow action |
| GET | `/platform/users` | `platform.users.manage` | Platform staff list |
| POST | `/platform/users/:id/roles` | `platform.roles.manage` | Assign platform roles |
| GET | `/platform/analytics/overview` | `platform.analytics.view` | SaaS KPIs |
| GET | `/platform/audit` | `platform.audit.view` | Platform audit |

---

## 4. Organizations — `/organizations`

| Method | Path | Authz | Description |
|--------|------|-------|-------------|
| POST | `/organizations` | Auth | Apply / create org (starts workflow) |
| GET | `/organizations/mine` | Auth | Memberships |
| GET | `/organizations/:orgId` | `organization.read` | Get org |
| PATCH | `/organizations/:orgId` | `organization.update` | Update profile |
| GET | `/organizations/:orgId/branches` | `organization.read` | List branches |
| POST | `/organizations/:orgId/branches` | `organization.branches.manage` | Create branch |
| PATCH | `/organizations/:orgId/branches/:branchId` | `organization.branches.manage` | Update branch |
| GET | `/organizations/:orgId/members` | `users.read` | Members |
| POST | `/organizations/:orgId/members` | `users.manage` | Invite/add member |
| PATCH | `/organizations/:orgId/members/:membershipId` | `users.manage` | Update roles/status |
| DELETE | `/organizations/:orgId/members/:membershipId` | `users.manage` | Remove member |
| GET | `/organizations/:orgId/roles` | `roles.read` | List roles |
| POST | `/organizations/:orgId/roles` | `roles.manage` | Custom role |
| PATCH | `/organizations/:orgId/roles/:roleId` | `roles.manage` | Update grants |

---

## 5. Users — `/users`

| Method | Path | Description |
|--------|------|-------------|
| GET | `/users/me` | Profile |
| PATCH | `/users/me` | Update profile |

(Staff user admin lives under platform/org members.)

---

## 6. Catalog — `/products` (and nested)

Prefer resource paths that match hierarchy:

| Method | Path | Permission |
|--------|------|------------|
| GET/POST | `/organizations/:orgId/families` | `product.read` / `product.create` |
| GET/POST | `/organizations/:orgId/brands` | same |
| GET/POST | `/organizations/:orgId/medicines` | same |
| GET/PATCH | `/organizations/:orgId/medicines/:id` | `product.read` / `product.update` |
| GET/POST | `/organizations/:orgId/variants` | create/read |
| GET/POST | `/organizations/:orgId/packages` | create/read |
| POST | `/organizations/:orgId/products/:id/submit` | `product.publish` |

Public/global browse for marketplace is under `/marketplace`.

Also expose flatter aliases if useful:

- `/api/v1/products`
- `/api/v1/variants`

…always tenant-resolved via header/membership.

---

## 7. Batches — `/batches`

| Method | Path | Permission |
|--------|------|------------|
| POST | `/batches` | `batch.create` |
| GET | `/batches` | `batch.read` |
| GET | `/batches/:id` | `batch.read` |
| PATCH | `/batches/:id` | `batch.update` |
| POST | `/batches/:id/qa` | `batch.qa.manage` |
| POST | `/batches/:id/recall` | `batch.recall.manage` |

---

## 8. Warehouses — `/warehouses`

| Method | Path | Permission |
|--------|------|------------|
| POST | `/warehouses` | `warehouse.manage` |
| GET | `/warehouses` | `warehouse.read` |
| PATCH | `/warehouses/:id` | `warehouse.manage` |

Scoped by org + optional `branchId` query.

---

## 9. Inventory — `/inventory`

| Method | Path | Permission |
|--------|------|------------|
| GET | `/inventory` | `inventory.read` |
| POST | `/inventory/adjust` | `inventory.adjust` |
| POST | `/inventory/reserve` | `inventory.reserve` |
| POST | `/inventory/release` | `inventory.reserve` |
| POST | `/inventory/transfer` | `inventory.transfer` |
| GET | `/inventory/movements` | `inventory.read` |

---

## 10. Verification & scans — `/verification`, `/scans`

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/verification/units/generate` | `barcode.generate` | Create signed units |
| POST | `/verification/verify` | Public/Auth | Verify payload/signature |
| POST | `/scans` | Public/Auth | Record scan + result |
| GET | `/scans/mine` | Auth | Customer/staff scan history |
| GET | `/verification/units/:id` | `verification.read` | Unit detail |

---

## 11. Supply chain — `/supply-chain`

| Method | Path | Permission |
|--------|------|------------|
| POST | `/supply-chain/transfers` | `supply_chain.create` |
| GET | `/supply-chain/transfers` | `supply_chain.read` |
| GET | `/supply-chain/transfers/:id` | `supply_chain.read` |
| POST | `/supply-chain/transfers/:id/submit` | `supply_chain.create` |
| POST | `/supply-chain/transfers/:id/approve` | `supply_chain.approve` |
| POST | `/supply-chain/transfers/:id/ship` | `supply_chain.create` |
| POST | `/supply-chain/transfers/:id/receive` | `supply_chain.receive` |
| POST | `/supply-chain/transfers/:id/reject` | `supply_chain.approve` |
| POST | `/supply-chain/transfers/:id/cancel` | `supply_chain.create` |

---

## 12. Marketplace — `/marketplace`

| Method | Path | Auth |
|--------|------|------|
| GET | `/marketplace/categories` | Public |
| GET | `/marketplace/listings` | Public |
| GET | `/marketplace/listings/:id` | Public |
| GET | `/marketplace/search` | Public |
| POST | `/marketplace/listings` | `marketplace.listing.manage` |
| POST | `/marketplace/listings/:id/publish` | `marketplace.listing.publish` |
| POST | `/marketplace/wishlist/:listingId` | Customer |
| DELETE | `/marketplace/wishlist/:listingId` | Customer |
| GET | `/marketplace/wishlist` | Customer |
| POST | `/marketplace/reviews` | Customer |
| GET | `/marketplace/coupons/validate` | Customer |
| GET/POST | `/marketplace/cart` | Customer |
| DELETE | `/marketplace/cart/:listingId` | Customer |
| POST | `/marketplace/orders` | Customer |
| GET | `/marketplace/orders` | Customer |
| GET | `/marketplace/orders/:id` | Customer |

---

## 13. Orders & payments

| Method | Path | Auth |
|--------|------|------|
| GET | `/orders` | `orders.read` (org) |
| PATCH | `/orders/:id/fulfill` | `orders.manage` |
| POST | `/payments/intent` | Customer |
| POST | `/payments/webhook/:provider` | Signed webhook |
| GET | `/payments/:id` | Customer or `payments.read` |

---

## 14. Customer — `/customers`

| Method | Path | Description |
|--------|------|-------------|
| POST | `/customers/profile` | Ensure customer profile |
| GET/PATCH | `/customers/me` | Profile |
| GET/POST | `/customers/me/addresses` | Addresses |
| PATCH/DELETE | `/customers/me/addresses/:id` | Address CRUD |

---

## 15. Workflow — `/workflows`

| Method | Path | Authz |
|--------|------|-------|
| GET | `/workflows/instances` | permission by subject |
| GET | `/workflows/instances/:id` | read |
| POST | `/workflows/instances/:id/actions` | step permission |

Most domain endpoints start workflows internally; these are for inbox/ops UIs.

---

## 16. Analytics — `/analytics`

| Method | Path | Permission |
|--------|------|------------|
| GET | `/analytics/platform/overview` | `platform.analytics.view` |
| GET | `/analytics/organization/overview` | `analytics.view` |
| GET | `/analytics/branch/:branchId` | `analytics.view` |
| GET | `/analytics/warehouse/:warehouseId` | `analytics.view` |
| GET | `/analytics/verification` | `analytics.view` |
| GET | `/analytics/sales` | `analytics.view` |
| GET | `/analytics/inventory` | `analytics.view` |

---

## 17. Audit — `/audit`

| Method | Path | Authz |
|--------|------|-------|
| GET | `/audit` | `audit.view` (+ tenant) |
| GET | `/audit/:id` | `audit.view` or `platform.audit.view` |
| GET | `/organizations/:orgId/audit` | `audit.view` |
| GET | `/platform/audit` | `platform.audit.view` |
| GET | `/platform/audit/:id` | `platform.audit.view` |

---

## 18. Notifications — `/notifications`

| Method | Path | Auth |
|--------|------|------|
| GET | `/notifications` | Auth |
| POST | `/notifications/:id/read` | Auth |
| POST | `/notifications/read-all` | Auth |

---

## 19. Sequence sketches (major flows)

### Org onboarding

```text
POST /organizations
  → workflow.instance(organization.approval)
  → platform approves POST /workflows/instances/:id/actions
  → org status=active + default roles seeded
```

### Manufacture → verify

```text
catalog create → batch.create → barcode.generate
  → inventory receive into warehouse
  → POST /verification/verify | /scans
```

### Inter-org transfer

```text
POST /supply-chain/transfers → approve → ship → receive
  → inventory + unit custody update
```

### Marketplace purchase

```text
listing.publish (workflow) → cart → order → payment.intent
  → webhook paid → reserve/sell inventory → track order
```

---

## 20. OpenAPI delivery plan

| Step | OpenAPI work |
|------|----------------|
| 3 | Shell + health paths |
| 4+ | Each module adds `presentation/openapi.ts` fragments |
| 20 | Consolidated complete spec + examples |

Full path dump for Swagger lives in `docs/api/openapi.yaml` once implementation begins (not created in Step 0).
