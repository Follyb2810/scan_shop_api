# Production checklist

Use this before promoting a release. Auth / tenancy section is the Step 19 Done gate.

## Auth & tenancy (Step 19)

| Item | Status | Notes |
|------|--------|-------|
| Helmet enabled | ✅ | CSP on in production; disabled for Swagger in non-prod |
| CORS allowlist via `CORS_ORIGINS` | ✅ | No `*` with credentials |
| Global rate limit | ✅ | `RATE_LIMIT_*` |
| Auth endpoint rate limit | ✅ | `AUTH_RATE_LIMIT_*` on `/auth/*` |
| Refresh rotation | ✅ | New refresh issued each rotate |
| Refresh reuse detection | ✅ | Reused revoked token revokes family → 401 |
| Password hashing policy | ✅ | bcrypt, `BCRYPT_ROUNDS` ≥ 10 (default 10) |
| Secrets via env only | ✅ | Zod-validated; prod rejects dev defaults |
| Production secret length ≥ 32 | ✅ | Enforced for JWT + HMAC when `NODE_ENV=production` |
| Legacy modules off in production | ✅ | `ENABLE_LEGACY_MODULES` defaults false in prod; boot fails if true |
| CSRF | ✅ | Documented — Bearer-first API; see below |
| Tenant isolation regression tests | ✅ | `tests/integration/security.test.ts` |
| Permission fuzz on sensitive routes | ✅ | listings, audit, analytics, orders fulfill |

### CSRF strategy (cookie vs bearer)

- **Current API auth:** `Authorization: Bearer <accessToken>` only. Refresh tokens are returned in JSON body (not HttpOnly cookies).
- **CSRF risk:** Classic cookie-session CSRF does **not** apply to pure Bearer clients (browser JS must attach the header; attackers cannot force custom Authorization headers on cross-site form posts).
- **If cookies are added later:** Prefer `__Host-` / `__Secure-` cookies, `SameSite=strict` (or `lax` + double-submit / CSRF token for state-changing routes), and keep refresh rotation + reuse detection.
- **Do not** store long-lived access tokens in `localStorage` for browser SPAs if XSS is a concern; prefer memory + short TTL + refresh.

## Secrets

| Variable | Required in prod | Notes |
|----------|------------------|-------|
| `JWT_ACCESS_SECRET` | Yes | ≥32 chars, unique |
| `JWT_REFRESH_SECRET` | Yes | ≥32 chars, unique |
| `HMAC_SECRET` | Yes | ≥32 chars, unique (QR signing) |
| `DATABASE_URL` | Yes | Prefer Postgres in prod |
| `REDIS_URL` | If Redis on | Set `REDIS_ENABLED=true` |

## Runtime

| Item | Status | Notes |
|------|--------|-------|
| `ENABLE_LEGACY_MODULES=false` | ✅ required in prod | |
| Prefer `DATABASE_PROVIDER=postgresql` | ⚠️ | SQLite OK for demos only |
| Redis for BullMQ notifications | Recommended | Inline fallback works without Redis |
| TLS termination | Ops | Terminate TLS at reverse proxy |
| Log PII minimization | Ops | Pino request logs omit bodies |

## Smoke after deploy

```bash
curl -fsS "$APP_URL/api/v1/health"
npm test   # or CI workflow
```
