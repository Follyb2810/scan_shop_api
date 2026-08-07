# Step 18 — Audit module

**Status:** Complete  
**Date:** 2026-08-07

---

## What shipped

### Prisma

- Renamed legacy unit trail → `ProductUnitAuditLog` (legacy modules)
- New general `AuditLog`: actor, org/branch/warehouse, action, entity, old/new JSON, IP, UA, location, requestId, timestamp

### Module `src/modules/audit`

- `recordAudit()` / `auditService.recordFromContext()` — append-only helper
- Domain event handlers: workflow, listings, orders, custody transfers, batch QA/recall
- HTTP middleware persists successful mutating requests as `http.mutation`

### APIs

| Method | Path | Authz |
|--------|------|--------|
| GET | `/api/v1/audit` | `audit.view` + tenant |
| GET | `/api/v1/audit/:id` | `audit.view` or `platform.audit.view` |
| GET | `/api/v1/organizations/:orgId/audit` | `audit.view` |
| GET | `/api/v1/platform/audit` | `platform.audit.view` |

---

## Proven

- Listing create/publish writes domain audit rows
- HTTP mutations appear under `http.mutation`
- Platform auditor can query cross-tenant; strangers get 403

---

## Next

```text
Do Step 19
```
