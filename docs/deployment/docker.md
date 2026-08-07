# docs/deployment/docker.md

## Services

Defined in `docker-compose.yml`:

- `postgres` — PostgreSQL 16 (always available with `docker:up`)
- `redis` — Redis 7 with AOF
- `api` — optional, profile `full` (runs against Postgres)

Production-oriented file: `docker-compose.prod.yml`.

## Commands

```bash
# Infra only (recommended while developing on SQLite)
docker compose up -d postgres redis

# Stop
docker compose down

# API + infra
docker compose --profile full up -d --build
```

## Switching the app to Postgres later

1. Change `prisma/schema.prisma` datasource `provider` to `postgresql`
2. Set in `.env`:
   ```env
   DATABASE_PROVIDER=postgresql
   DATABASE_URL=postgresql://postgres:postgres@localhost:5432/healthcare_os?schema=public
   ```
3. Update `src/config/prisma-client.ts` to use `@prisma/adapter-pg`
4. Run migrations against Postgres

Until then, keep SQLite for local development.
