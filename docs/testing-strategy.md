# Testing strategy

## Stack

- **Runner:** Vitest (`npm test` / `npm run test:watch`)
- **HTTP:** Supertest against `createApp()`
- **DB:** SQLite (`file:./dev.db`) — shared local/dev DB; `fileParallelism: false` to avoid races
- **Redis:** Off in tests (`REDIS_ENABLED=false`); notifications use inline queue handlers

## Layout

```text
tests/
  global-setup.ts          # seeds org types, RBAC, workflows, catalog, warehouse, marketplace
  helpers/setup.ts         # env defaults per worker
  unit/                    # pure / small unit tests
  integration/             # API + domain flows
```

## What we test

| Layer | Examples |
|-------|----------|
| Auth | register/login, refresh rotation, reuse detection |
| Tenancy | cross-org 403/404 (`security.test.ts`) |
| Domains | catalog → batch → inventory → supply-chain → marketplace → payments |
| Platform | workflows, analytics, audit, notifications |
| Permissions | fuzz stranger vs owner on sensitive routes |

## Conventions

1. Prefer org-scoped routes with `Authorization` + `X-Organization-Id`.
2. Approve org workflows with a `SUPER_ADMIN` helper user in `beforeAll`.
3. Call `clearPermissionMemoryCache()` after role/org changes.
4. Do not rely on Redis for Done criteria; inline fallbacks must cover queues.

## CI

GitHub Actions workflow `.github/workflows/ci.yml` runs `npm ci`, `prisma generate`, and `npm test`.

## Local

```bash
npm test
npm test -- tests/integration/security.test.ts
```
