# Step 11 — Inventory module

**Status:** Complete  
**Date:** 2026-08-07

---

## What shipped

### Prisma

- `InventoryPosition` — stock by org → branch → warehouse → batch → packaging level
- State buckets: available, reserved, damaged, expired, quarantined, returned, inTransit, sold, destroyed
- `InventoryMovement` ledger
- `version` for optimistic concurrency

### Module `src/modules/inventory`

- Receive into available
- Reserve / release (`available ↔ reserved`)
- Adjust between any states
- Transfer within org (warehouse → warehouse)
- Atomic `updateMany` with `gte` guards + transaction retries

### APIs

| Method | Path | Permission |
|--------|------|------------|
| GET | `/api/v1/organizations/:orgId/inventory` | `inventory.read` |
| GET | `/api/v1/organizations/:orgId/inventory/movements` | `inventory.read` |
| GET | `/api/v1/organizations/:orgId/inventory/positions/:id` | `inventory.read` |
| POST | `/api/v1/organizations/:orgId/inventory/receive` | `inventory.adjust` |
| POST | `.../reserve` · `.../release` | `inventory.reserve` |
| POST | `.../adjust` | `inventory.adjust` |
| POST | `.../transfer` | `inventory.transfer` |

---

## Proven

`tests/integration/inventory.test.ts`:

- Receive / reserve / release / adjust / transfer
- Oversell rejected (409)
- **Concurrent-style:** 20 parallel reserves of 10 against 100 available → exactly 10 succeed, totals stay consistent

**Suite: 93 passed**

---

## Next

```text
Do Step 12
```
