# Step 3 — Global middleware & API shell

**Status:** Complete  
**Date:** 2026-08-07

---

## What shipped

### Middleware (`src/middleware/`)

| Middleware | Role |
|------------|------|
| `authenticate` / `authenticateOptional` / `requireAuth` | JWT access-token parse (`JWT_ACCESS_SECRET`); optional globally, required on protected routes |
| `resolveTenant` / `requireTenant` | Reads `X-Organization-Id` / `X-Branch-Id` into context (membership check → Step 6) |
| `requirePermission` | Permission gate (grants → Step 5) |
| `requirePlatformRole` | Platform role gate (roles → Step 5) |
| `validate` / `validateBody` | Zod request validation |
| `auditRequest` | Stub audit log for mutating HTTP |
| `notFoundHandler` | Consistent 404 envelope |
| `errorHandler` | Central errors (already from Step 1) |
| `rateLimitMiddleware` | IP rate limit |

### Global pipeline (`createApp`)

```text
pino-http → cors → helmet → json → rateLimit
→ requestContext → authenticateOptional → resolveTenant → auditRequest
→ /api/v1 → swagger → legacy modules
→ notFound → errorHandler
```

### API shell demos (`/api/v1/system`)

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/system/context` | Inspect context |
| GET | `/system/protected` | Requires Bearer |
| GET | `/system/tenant-required` | Requires `X-Organization-Id` |
| POST | `/system/echo` | Zod validation demo |
| GET | `/system/permission-demo` | Permission gate demo |
| GET | `/system/platform-demo` | Platform role gate demo |

### Swagger

- `src/config/swagger.ts` — Healthcare OS title, bearer + org headers
- UI: `/api-docs`
- Spec JSON: `/api-docs.json`

### Access token helper

- `src/shared/utils/accessToken.ts` — verify/sign for middleware + tests  
- Full identity issuance remains Step 4

---

## Migrations

None.

---

## Tests

`tests/integration/api-shell.test.ts` + prior unit tests:

```text
24 passed
```

Covers: 401 without/invalid token, 403 without tenant/permission, Zod 400, Swagger JSON, health, 404 envelope.

---

## Done criteria

- [x] Middleware chain mounted  
- [x] Swagger UI loads  
- [x] Unauthenticated protected routes return consistent errors  

---

## Next

```text
Do Step 4
```
