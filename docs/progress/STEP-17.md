# Step 17 — Analytics module

**Status:** Complete  
**Date:** 2026-08-07

## What shipped

Read aggregations (no BI warehouse):

- Platform overview (`platform.analytics.view`)
- Org overview, branch, warehouse, verification, sales, inventory (`analytics.view`)

### APIs

| Path | Authz |
|------|--------|
| `/api/v1/analytics/platform/overview` | `platform.analytics.view` |
| `/api/v1/platform/analytics/overview` | alias |
| `/api/v1/analytics/organization/overview` | `analytics.view` + tenant |
| `/api/v1/analytics/branch/:branchId` | same |
| `/api/v1/analytics/warehouse/:warehouseId` | same |
| `/api/v1/analytics/verification\|sales\|inventory` | same |

## Proven

Org inventory available qty matches receive fixture (25).

## Next

```text
Do Step 18
```
