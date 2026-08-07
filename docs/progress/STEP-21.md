# Step 21 — Full test suite & release candidate

**Status:** Complete — **RC-1**  
**Date:** 2026-08-07  
**Tag suggestion:** `v1.0.0-rc.1`

---

## Release candidate notes

### Confidence

| Gate | Result |
|------|--------|
| `npm test` | ✅ Green |
| Tenant isolation suite | ✅ `tests/integration/security.test.ts` |
| Auth refresh reuse | ✅ covered in `auth.test.ts` |
| CI workflow | ✅ `.github/workflows/ci.yml` |

### Suite snapshot

- **125 tests / 22 files** green on SQLite / Redis-off
- Domains covered: identity → analytics (Steps 4–18) + security (19)

### Optional demo seed

```bash
npm run seed:demo
```

Creates:

| Account | Role |
|---------|------|
| `demo.platform.admin@example.com` | SUPER_ADMIN |
| `demo.pfizer.owner@example.com` | Manufacturer org owner |
| `demo.pharmacy.a@example.com` | Pharmacy A owner |
| `demo.distributor@example.com` | Distributor owner |

Password for all: `Password123!`

### Production reminders

1. Set unique ≥32-char `JWT_*` / `HMAC_SECRET`
2. `ENABLE_LEGACY_MODULES=false`
3. Prefer Postgres + Redis
4. Walk `docs/deployment/production-checklist.md`

### Deviations / known limits

- Payment provider is **stub** only
- Notifications use inline queue when Redis is off
- Legacy modules still available in development
- Swagger JSDoc is representative for late modules (outline + tags); expand per-route schemas as needed

### How to cut RC

```bash
npm test
git tag v1.0.0-rc.1
```

---

## BUILD_GUIDE complete

Phases A–G (Steps 0–21) are done for this backend.
