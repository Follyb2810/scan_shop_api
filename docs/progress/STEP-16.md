# Step 16 — Notification module

**Status:** Complete  
**Date:** 2026-08-07

## What shipped

- Prisma `Notification`
- Channels: in_app, email (console adapter), webhook
- `enqueueOrRun` — BullMQ when Redis on; inline handler when off (tests)
- Domain hooks: batch recall, order paid
- APIs: list / mark read / read-all

## Proven

Domain event → queued job → delivered notification row.

## Next

```text
Do Step 17
```
