# Step 19 — Security hardening

**Status:** Complete  
**Date:** 2026-08-07

## What shipped

- Auth rate limiter (`AUTH_RATE_LIMIT_*`) on `/auth/*`
- Helmet CSP enabled in production; Swagger-friendly in non-prod
- Prod boot rejects default JWT/HMAC secrets and `ENABLE_LEGACY_MODULES=true`
- `BCRYPT_ROUNDS` env (password hashing policy)
- Tenant isolation + permission fuzz suite: `tests/integration/security.test.ts`
- CSRF bearer-vs-cookie strategy documented
- **Done gate:** `docs/deployment/production-checklist.md` auth/tenancy section filled

## Verified existing

- Refresh rotation + reuse detection (identity module)
- Global CORS allowlist + rate limit

## Next

```text
Do Step 20
```
