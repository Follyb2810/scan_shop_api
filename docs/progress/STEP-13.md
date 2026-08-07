# Step 13 — Supply chain module

**Status:** Complete  
**Date:** 2026-08-07

---

## What shipped

### Prisma

- `CustodyTransfer` — sender/receiver orgs, warehouses, docs, approval/receive actors, status timeline
- `CustodyTransferLine` — batch + packagingLevel + quantity

### Inventory hook

- `inventoryService.consume()` — ship-out reserved stock
- `receive(..., { allowForeignBatch: true })` — receiver can stock manufacturer-owned batches

### Module `src/modules/supply-chain`

Lifecycle:

```text
draft → submitted → approved (reserve) → in_transit (consume reserved) → received (receive at dest warehouse)
         ↘ rejected / cancelled
```

Optional workflow: submit with `{ useWorkflow: true }` starts `custody.transfer.approval`.

### APIs (org-scoped)

| Method | Path | Authz |
|--------|------|--------|
| GET | `/api/v1/organizations/:orgId/supply-chain/transfers` | `supply_chain.read` |
| POST | `/api/v1/organizations/:orgId/supply-chain/transfers` | `supply_chain.create` |
| GET | `/api/v1/organizations/:orgId/supply-chain/transfers/:transferId` | `supply_chain.read` |
| POST | `.../submit` | `supply_chain.create` |
| POST | `.../approve` | `supply_chain.approve` |
| POST | `.../ship` | `supply_chain.create` |
| POST | `.../receive` | `supply_chain.receive` |
| POST | `.../reject` | `supply_chain.approve` |
| POST | `.../cancel` | `supply_chain.create` |

Supports Manufacturer → Distributor (and further hops) via any active org pair.

---

## Proven

- Manufacturer → Distributor transfer: approve reserves, ship consumes, receive credits distributor stock
- Receiver cannot approve sender transfer (403)
- Sent/received listing filters

**Suite: 103 passed**

---

## Next

```text
Do Step 14
```
