# Step 12 — Verification module

**Status:** Complete  
**Date:** 2026-08-07

---

## Also in this step

- Replaced custom `asyncHandler` with **`express-async-handler`** (`src/shared/http/asyncHandler.ts` re-exports it)

---

## What shipped

### Prisma

- `PackagingInstance` (pack tree-ready)
- `TrackableUnit` (signed QR identity; replaces legacy ProductUnit concept)
- `ScanEvent` (append-only scan history)

### HMAC QR payload (v1)

```text
v=1|pid=...|oid=...|prd=...|bid=...|lvl=...|uid=...|ts=...|kid=v1|sig=<hmac-sha256>
```

Env: `HMAC_SECRET`, `HMAC_KEY_ID`, `PLATFORM_ID`

### Module `src/modules/verification`

- Generate signed units after batch QA passed
- Public verify (signature only)
- Public/auth scan (business checks + ScanEvent)
- My scans + org unit scan history

### APIs

| Method | Path | Authz |
|--------|------|--------|
| POST | `/api/v1/organizations/:orgId/verification/units/generate` | `barcode.generate` |
| GET | `/api/v1/organizations/:orgId/verification/units...` | `verification.read` |
| POST | `/api/v1/verification/verify` | Public |
| POST | `/api/v1/scans` | Public / optional auth |
| GET | `/api/v1/scans/mine` | Auth |

---

## Proven

- Valid payload verifies authentic
- Forged `sig` → `forged` + scan event
- First vs subsequent scan
- Recalled batch → `recalled` on scan

**Suite: 99 passed**

---

## Next

```text
Do Step 13
```
