# Step 15 — Payments module

**Status:** Complete  
**Date:** 2026-08-07

## What shipped

- Prisma `Payment` + Order `paid` / `paidAt`
- Stub provider + webhook endpoint
- Intent creation with `Idempotency-Key`
- Webhook success → payment `succeeded` → order `paid` → `ORDER_EVENTS.PAID`

### APIs

| Method | Path | Auth |
|--------|------|------|
| POST | `/api/v1/payments/intent` | Customer |
| POST | `/api/v1/payments/webhook/:provider` | Public (stub) |
| GET | `/api/v1/payments/:id` | Customer |
| POST | `/api/v1/payments/stub/pay` | Customer (sandbox) |

## Proven

Order moves to `paid` via stub webhook.

## Next

```text
Do Step 16
```
