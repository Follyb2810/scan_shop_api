# Step 8 — Catalog module

**Status:** Complete  
**Date:** 2026-08-07

---

## What shipped

### Prisma

- Reference: `MedicineCategory`, `DosageForm`, `PackagingType`
- Hierarchy: `ProductFamily` → `Brand` → `Medicine` → `Variant` → `PackageDefinition`
- Tenant-scoped via `organizationId`; SKU unique per org

### Module `src/modules/catalog`

- Seeded categories, dosage forms, packaging types
- CRUD for hierarchy entities (tenant-scoped)
- Convenience `POST .../hierarchy` creates full tree
- Lifecycle: `draft` → `submitted` (publish) → `approved`/`rejected` via `product.approval` workflow

### APIs

| Method | Path |
|--------|------|
| GET | `/api/v1/catalog/categories` |
| GET | `/api/v1/catalog/dosage-forms` |
| GET | `/api/v1/catalog/packaging-types` |
| GET/POST | `/api/v1/organizations/:orgId/families` |
| POST | `/api/v1/organizations/:orgId/brands` |
| GET/POST/PATCH | `/api/v1/organizations/:orgId/medicines...` |
| POST | `/api/v1/organizations/:orgId/medicines/:id/submit` |
| POST | `/api/v1/organizations/:orgId/variants` |
| GET/POST | `/api/v1/organizations/:orgId/packages` |
| POST | `/api/v1/organizations/:orgId/hierarchy` |

---

## Proven

`tests/integration/catalog.test.ts`:

- Full hierarchy create with strength, dosage form, package
- Duplicate SKU rejected
- Cross-tenant access blocked
- Submit → workflow → approve → medicine `approved`

**Suite: 71 passed**

---

## Next

```text
Do Step 9
```
