# Step 5 — RBAC module

**Status:** Complete  
**Date:** 2026-08-07

---

## What shipped

### Prisma

- `Permission`, `PlatformRole`, `PlatformUserRole`, `RolePermission`
- `Organization` (minimal scaffolding for Step 6)
- `OrganizationRole`, `Membership`, `MembershipRole`
- `OrgRoleTemplate`, `OrgRoleTemplatePermission`

### Module `src/modules/rbac`

- Permission catalog (54 keys) + platform roles (10) + org templates (16)
- Idempotent seed (`seedRbacCatalog`, `seedOrganizationRoles`)
- Permission cache (memory + Redis when enabled)
- `loadRbac` / `reloadOrgRbac` middleware — wires real grants into `RequestContext`
- `requirePermission` / `requirePlatformRole` enforce DB-backed grants

### APIs

| Path | Purpose |
|------|---------|
| `GET /api/v1/rbac/permissions` | Catalog |
| `GET /api/v1/rbac/platform/roles` | Platform roles |
| `POST /api/v1/rbac/platform/users/:id/roles` | Assign platform role |
| `GET /api/v1/rbac/me` | Authz snapshot |
| `POST /api/v1/rbac/organizations/bootstrap` | Temp org+OWNER bootstrap |
| `/api/v1/organizations/:orgId/roles` | List/create/update custom roles |

### Rules enforced

- Orgs **cannot invent** permissions
- Orgs **cannot assign** `platform.*` to custom roles
- System org roles cannot have permissions rewritten
- Non-members with `X-Organization-Id` → 403

### Commands

```bash
npm run seed:rbac
```

Seed also runs on app bootstrap and Vitest `globalSetup`.

---

## Tests

`tests/integration/rbac.test.ts` + prior suite → **47 passed**

---

## Next

```text
Do Step 6
```
