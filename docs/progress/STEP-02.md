# Step 2 — Shared infrastructure

**Status:** Complete  
**Date:** 2026-08-07

---

## What shipped

### Database

- `src/infrastructure/database/prisma.client.ts` — singleton Prisma client (SQLite default; PG adapter path ready)
- `src/infrastructure/database/transaction.ts` — `withTransaction()`
- `src/infrastructure/database/base.repository.ts` — thin base + tenant guard
- `src/config/prisma-client.ts` — re-exports for legacy modules

### Cache / queues / events

- `src/infrastructure/cache/redis.client.ts` — lazy ioredis client (`REDIS_ENABLED`)
- `src/infrastructure/queue/bullmq.connection.ts` + `queues.ts` — queue registry (`notifications`, `webhooks`, `analytics`, `email`)
- `src/infrastructure/events/event-bus.ts` — in-process domain event bus
- `src/infrastructure/bootstrap.ts` — DI registration + connect/shutdown lifecycle

### Shared

- DI container: `src/shared/di/container.ts`
- Pagination helpers: `src/shared/http/pagination.ts`
- `Result` type: `src/shared/types/Result.ts`
- Request context: `tenantId` + `organizationId` helpers

### App wiring

- `main.ts` bootstraps infrastructure and shuts down on SIGINT/SIGTERM
- Health check reports `checks.database` and `checks.redis`

### Tests

- Vitest (`npm test`)
- Helpers under `tests/helpers/`
- Unit/smoke: pagination, DI, Result/event-bus, infrastructure (13 passing)

---

## Env additions

```env
REDIS_ENABLED=false   # set true when `npm run docker:up` Redis is running
REDIS_URL=redis://localhost:6379
```

---

## Migrations

None.

---

## Endpoints

`GET /api/v1/health` now includes:

```json
"checks": { "database": "up", "redis": "disabled" }
```

---

## How to enable Redis

```bash
npm run docker:up
# set REDIS_ENABLED=true in .env
npm run dev
```

---

## Next

```text
Do Step 3
```
