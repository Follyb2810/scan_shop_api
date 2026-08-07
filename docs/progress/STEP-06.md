# Step 6 — Organization / multi-tenant module

**Status:** Complete  
**Date:** 2026-08-07

---

## What shipped

### Prisma

- `OrganizationType` (10 seeded types)
- `Organization` (+ optional `typeId`, status)
- `OrganizationProfile`
- `Branch` (unique code per org)
- `Membership.defaultBranchId`

### Module `src/modules/organization`

- Create org → seeds RBAC roles → assigns `OWNER` → creates HQ branch
- List mine / get / update (membership-scoped)
- Branch CRUD
- Member invite / list / update
- `TenantIsolationError` on cross-tenant access

### Tenant middleware

- `resolveTenant` validates org exists
- Validates `X-Branch-Id` belongs to active org
- `loadRbac` still rejects non-members (403)

### APIs

| Method | Path |
|--------|------|
| GET | `/api/v1/organizations/types` |
| POST | `/api/v1/organizations` |
| GET | `/api/v1/organizations/mine` |
| GET/PATCH | `/api/v1/organizations/:orgId` |
| GET/POST/PATCH/DELETE | `/api/v1/organizations/:orgId/branches...` |
| GET/POST/PATCH | `/api/v1/organizations/:orgId/members...` |
| * | `/api/v1/organizations/:orgId/roles...` (from Step 5, nested) |

### Org types seeded

Manufacturer, Pharmacy, Distributor, Wholesaler, Hospital, Clinic, Laboratory, Importer, NGO, Government

---

## Isolation proven

`tests/integration/organization.test.ts`:

- Owner A cannot read org B
- Branch from org A rejected under org B header
- Invited member of B cannot access org A
- `/organizations/mine` only returns memberships

**Suite: 57 passed**

---

## Notes

- Org create status gated by Step 7 workflow (`pending` → approve → `active`)
- RBAC bootstrap endpoint still works (delegates to organization service)

---

## Next

Completed — see [STEP-07](./STEP-07.md)
