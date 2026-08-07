# Local setup

A new engineer should be able to run the API from this page alone.

## Prerequisites

- Node.js 20+
- npm
- (Optional) Docker Desktop — Postgres + Redis

## Quick start (SQLite)

```bash
cp .env.example .env
npm install
npm run prisma:generate
npm run prisma:push
npm run dev
```

Health:

```bash
curl http://localhost:5000/api/v1/health
```

Swagger UI: [http://localhost:5000/api-docs](http://localhost:5000/api-docs)

## Tests

```bash
npm test
```

See [testing-strategy.md](../testing-strategy.md).

## Optional Redis / Postgres

```bash
npm run docker:up          # postgres + redis
# then in .env:
# REDIS_ENABLED=true
```

Full Docker API profile: see [docker.md](./docker.md).

## Demo data (optional)

```bash
npm run seed:demo
```

Creates platform admin + manufacturer / pharmacy / distributor demo orgs (password `Password123!`).

## Production

Follow [production-checklist.md](./production-checklist.md) before deploy.

| Setting | Local default | Production |
|---------|---------------|------------|
| `DATABASE_PROVIDER` | `sqlite` | Prefer `postgresql` |
| `REDIS_ENABLED` | `false` | `true` recommended |
| `ENABLE_LEGACY_MODULES` | `true` (dev) | **must be `false`** |
| Secrets | `.env` defaults OK | Unique ≥32-char secrets |

## Architecture docs

- [SAD](../architecture/SAD.md)
- [ERD](../architecture/erd.md)
- [Sequence diagrams](../architecture/sequence-diagrams.md)
- [RBAC matrix](../rbac/roles-permissions-matrix.md)
- [API outline](../api/api-spec-outline.md)
- [BUILD_GUIDE](../BUILD_GUIDE.md)
