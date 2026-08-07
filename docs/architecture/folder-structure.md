# Target Folder Structure

Approved layout for implementation (Steps 1+).  
Legacy `src/module/*` feature folders are **not** extended; new code uses `src/modules/*`.

```text
scan_shop_api/
├── docker/
│   ├── Dockerfile
│   ├── Dockerfile.dev
│   └── postgres/
│       └── init.sql
├── docker-compose.yml
├── docker-compose.prod.yml
│
├── docs/
│   ├── BUILD_GUIDE.md
│   ├── architecture/
│   │   ├── SAD.md
│   │   ├── domain-model.md
│   │   ├── erd.md
│   │   ├── prisma-schema-proposal.md
│   │   ├── folder-structure.md
│   │   └── roadmap.md
│   ├── api/
│   │   └── api-spec-outline.md
│   ├── rbac/
│   │   └── roles-permissions-matrix.md
│   ├── deployment/
│   │   ├── setup.md
│   │   ├── docker.md
│   │   └── production-checklist.md
│   ├── testing-strategy.md
│   └── progress/
│       ├── STATUS.md
│       └── STEP-XX.md
│
├── prisma/
│   ├── schema/
│   │   ├── schema.prisma
│   │   ├── identity.prisma
│   │   ├── rbac.prisma
│   │   ├── organization.prisma
│   │   ├── workflow.prisma
│   │   ├── catalog.prisma
│   │   ├── batch.prisma
│   │   ├── warehouse.prisma
│   │   ├── inventory.prisma
│   │   ├── verification.prisma
│   │   ├── supply-chain.prisma
│   │   ├── marketplace.prisma
│   │   ├── customer.prisma
│   │   ├── payments.prisma
│   │   ├── notification.prisma
│   │   ├── analytics.prisma
│   │   └── audit.prisma
│   ├── migrations/
│   └── seed/
│
├── src/
│   ├── main.ts
│   ├── app.ts
│   ├── config/
│   ├── shared/
│   │   ├── errors/
│   │   ├── http/
│   │   ├── types/
│   │   ├── utils/
│   │   ├── constants/
│   │   └── di/
│   ├── infrastructure/
│   │   ├── database/
│   │   ├── cache/
│   │   ├── queue/
│   │   ├── mail/
│   │   ├── sms/
│   │   ├── storage/
│   │   └── events/
│   ├── middleware/
│   ├── modules/
│   │   ├── identity/
│   │   ├── platform/
│   │   ├── rbac/
│   │   ├── organization/
│   │   ├── workflow/
│   │   ├── catalog/
│   │   ├── batch/
│   │   ├── warehouse/
│   │   ├── inventory/
│   │   ├── verification/
│   │   ├── supply-chain/
│   │   ├── marketplace/
│   │   ├── customer/
│   │   ├── payments/
│   │   ├── notification/
│   │   ├── analytics/
│   │   └── audit/
│   └── api/
│       └── v1/
│           └── routes.ts
│
├── tests/
│   ├── unit/
│   ├── integration/
│   ├── e2e/
│   └── helpers/
│
├── scripts/
├── .env.example
├── package.json
├── tsconfig.json
├── vitest.config.ts
└── README.md
```

## Module internal shape (every domain)

```text
src/modules/<name>/
├── domain/
│   ├── entities/
│   ├── value-objects/
│   ├── events/
│   └── repositories/          # interfaces only
├── application/
│   ├── dto/
│   ├── use-cases/
│   └── validators/
├── infrastructure/
│   └── repositories/          # Prisma implementations
├── presentation/
│   ├── controllers/
│   ├── routes.ts
│   └── openapi.ts
└── index.ts                   # public module API
```

## Import rules

1. `presentation` → `application` only  
2. `application` → `domain` + ports  
3. `infrastructure` implements ports  
4. Modules must not import another module’s `infrastructure` or `presentation`  
5. Cross-module calls go through public `index.ts` application facades or domain events  

## Legacy

| Path | Fate |
|------|------|
| `src/module/*` | Freeze; migrate concepts into `src/modules/*` |
| `src/create-feature.ts` | Replace with module generator aligned to new shape (optional later) |
| `dev.db` SQLite | Retire after Postgres migration (Step 1) |
