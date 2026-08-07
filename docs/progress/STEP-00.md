# Step 0 — Software Architecture Package

**Status:** Complete (pending user approval)  
**Date:** 2026-08-07  
**Code written:** None (docs only)

---

## What shipped

| Artifact | Path |
|----------|------|
| Software Architecture Document | `docs/architecture/SAD.md` |
| Domain Model | `docs/architecture/domain-model.md` |
| ERD | `docs/architecture/erd.md` |
| Prisma schema proposal | `docs/architecture/prisma-schema-proposal.md` |
| Folder structure | `docs/architecture/folder-structure.md` |
| Implementation roadmap | `docs/architecture/roadmap.md` |
| RBAC matrix | `docs/rbac/roles-permissions-matrix.md` |
| API specification outline | `docs/api/api-spec-outline.md` |

---

## Key decisions locked (defaults)

1. **Modular monolith** with Clean Architecture per bounded context  
2. **Shared PostgreSQL schema** + `organizationId` row-level isolation  
3. **Customers ≠ tenants**; orgs are tenants; platform staff are SaaS operators  
4. **Platform owns permissions**; orgs assign to custom roles only  
5. **Workflow engine** for all major approvals  
6. **HMAC-signed versioned QR payload** for verification  
7. **Legacy Product/ProductUnit/Manufacturer** migrate into new modules — not extended in place  
8. **Clean Postgres schema** preferred over evolving SQLite prototype  

---

## Migrations

None.

---

## Endpoints

None.

---

## Tests

None.

---

## Deviations from BUILD_GUIDE

None.

---

## Gate

Wait for:

```text
Approve Step 0
```

Then proceed with:

```text
Do Step 1
```

---

## Review checklist for you

- [ ] Tenancy model acceptable  
- [ ] Actor model (platform / org / customer) acceptable  
- [ ] Catalog → batch → packaging → inventory split acceptable  
- [ ] RBAC permission naming + role sets acceptable  
- [ ] API surface outline acceptable  
- [ ] Roadmap order acceptable  
- [ ] Any decision changes noted before approval  
