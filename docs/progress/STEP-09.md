# Step 9 — Batch module

**Status:** Complete  
**Date:** 2026-08-07

---

## What shipped

### Prisma

- `Batch` linked to `PackageDefinition`
- Fields: batch/lot numbers, mfg/expiry, QA + recall status, quantities, NAFDAC, certificates/documents JSON

### Module `src/modules/batch`

- Create / list / get / update (tenant-scoped)
- QA transitions: `pending → in_review → passed|failed` (guarded matrix)
- Optional `useWorkflow` on QA `in_review` → `batch.qa.approval`
- Recall request → `recall.approval` workflow → `recalled`
- Domain events: `batch.created`, `batch.qa.updated`, `batch.recall.updated`

### APIs

| Method | Path | Permission |
|--------|------|------------|
| GET/POST | `/api/v1/organizations/:orgId/batches` | `batch.read` / `batch.create` |
| GET/PATCH | `/api/v1/organizations/:orgId/batches/:batchId` | `batch.read` / `batch.update` |
| POST | `/api/v1/organizations/:orgId/batches/:batchId/qa` | `batch.qa.manage` |
| POST | `/api/v1/organizations/:orgId/batches/:batchId/recall` | `batch.recall.manage` |

### Workflow seeds added

- `batch.qa.approval` (subjectType `batch`)

---

## Proven

`tests/integration/batch.test.ts`:

- Create batch on package with NAFDAC + certificates
- Reject expiry before manufacture
- Direct QA transitions + invalid transition rejected
- Recall via workflow → `recalled`
- QA via `batch.qa.approval` → `passed`

**Suite: 78 passed** (7 batch)

---

## Next

```text
Do Step 10
```
