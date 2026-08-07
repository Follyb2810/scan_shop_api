# Shop Scan / Healthcare OS API

Multi-tenant Healthcare OS backend (in progress).  
Follow the build guide: [`docs/BUILD_GUIDE.md`](docs/BUILD_GUIDE.md)

## Quick start (development — SQLite)

```bash
cp .env.example .env
npm install
npm run prisma:generate
npm run dev
```

Health: [http://localhost:5000/api/v1/health](http://localhost:5000/api/v1/health)

## Docker infra (Postgres + Redis)

```bash
npm run docker:up
```

The API still uses SQLite locally by default. See [`docs/deployment/setup.md`](docs/deployment/setup.md).

## Status

See [`docs/progress/STATUS.md`](docs/progress/STATUS.md).
