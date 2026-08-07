# Step 1 — Project foundation & tooling

**Status:** Complete  
**Date:** 2026-08-07  
**Amendment:** SQLite remains the **development** database. Docker Compose provides Postgres + Redis for infra parity and future switch.

---

## What shipped

### Bootstrap

- `src/main.ts` — process entry
- `src/app.ts` — `createApp()` composition (no listen)
- Zod env: `src/config/env.ts`
- Pino logger: `src/config/logger.ts`
- Health: `GET /api/v1/health`

### Shared / middleware

- `src/shared/errors/*` — AppError family + TenantIsolationError
- `src/shared/http/*` — ApiResponse helpers + asyncHandler
- `src/shared/types/RequestContext.ts`
- `src/middleware/requestContext.ts`
- `src/middleware/errorHandler.ts` (Express 4-arg)
- `src/middleware/stubs.ts` — rate limit + auth/tenant stubs
- Legacy `src/errors/errorHandler.ts` kept as `(err, res)` helper for prototype controllers

### Folder placeholders

- `src/modules/`
- `src/infrastructure/`
- `src/api/v1/`
- `tests/`

### Docker / env

- `docker-compose.yml` — postgres, redis, optional `api` (profile `full`)
- `docker-compose.prod.yml`
- `docker/Dockerfile`, `docker/Dockerfile.dev`, `docker/postgres/init.sql`
- `.env.example` — **SQLite default**
- Docs: `docs/deployment/setup.md`, `docs/deployment/docker.md`

### Tooling

- Stricter `tsconfig.json` (`strict`, ES2020)
- Scripts: `dev` → `src/main.ts`, `docker:up`, `docker:down`, `docker:full`
- Deps: `zod`, `pino`, `pino-http`, `pino-pretty`, `express-rate-limit`

### Database decision (this step)

| Environment | Provider | How |
|-------------|----------|-----|
| Local development | **SQLite** | `DATABASE_PROVIDER=sqlite`, `DATABASE_URL=file:./dev.db` |
| Docker infra | Postgres 16 + Redis 7 | `npm run docker:up` |
| Future production / full profile | PostgreSQL | Switch Prisma provider + adapter (documented, not applied yet) |

Prisma schema **provider remains `sqlite`** for now so existing prototype modules keep working.

---

## Migrations

None (SQLite schema unchanged).

---

## Endpoints

| Method | Path | Notes |
|--------|------|-------|
| GET | `/api/v1/health` | Canonical liveness |
| GET | `/health` | Deprecated alias |

Verified response:

```json
{
  "success": true,
  "data": {
    "status": "ok",
    "service": "healthcare-os-api",
    "environment": "development",
    "databaseProvider": "sqlite",
    "timestamp": "..."
  }
}
```

---

## Tests

Typecheck: `npx tsc --noEmit` passes.  
Automated tests deferred to Step 2+.

---

## Docker note

`docker compose up` was **not** verified in this environment (Docker daemon unavailable). Compose files are in place; start Docker Desktop then run `npm run docker:up`.

---

## Deviations from original Step 1 text

- Original guide said “switch Prisma datasource to PostgreSQL”.
- Per product decision: **keep SQLite for development**, ship Postgres/Redis Docker config for later.

---

## Next

```text
Do Step 2
```
