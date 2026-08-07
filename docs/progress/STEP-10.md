# Step 10 — Warehouse module

**Status:** Complete  
**Date:** 2026-08-07

---

## What shipped

### Prisma

- `WarehouseType` (seeded reference)
- `Warehouse` under Organization + Branch (`code` unique per branch)

### Module `src/modules/warehouse`

- Seeded types: Main, Cold Storage, Returns, Transit, Overflow
- CRUD (soft-delete) scoped by org membership + `warehouse.*` permissions
- Create via org path or nested `/branches/:branchId/warehouses`

### APIs

| Method | Path | Permission |
|--------|------|------------|
| GET | `/api/v1/warehouses/types` | public |
| GET/POST | `/api/v1/organizations/:orgId/warehouses` | `warehouse.read` / `warehouse.manage` |
| GET/PATCH/DELETE | `/api/v1/organizations/:orgId/warehouses/:id` | read / manage |
| GET/POST | `/api/v1/organizations/:orgId/branches/:branchId/warehouses` | read / manage |

---

## Proven

`tests/integration/warehouse.test.ts`:

- Multiple warehouses per branch (and across branches)
- Branch filter on list
- Duplicate code rejected
- Cross-tenant blocked
- Soft-delete hides warehouse

**Suite: 86 passed**

---

## Next

```text
Do Step 11
```
