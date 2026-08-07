# Step 4 — Identity module

**Status:** Complete  
**Date:** 2026-08-07

---

## What shipped

### Prisma (SQLite)

Extended `User` + added:

- `Session`
- `RefreshToken` (hashed, family-based rotation + reuse detection)
- `Device`
- `LoginHistory`
- `TwoFactorSecret`
- `EmailVerificationToken`
- `PasswordResetToken`

New fields on `User`: `status`, `emailVerifiedAt`, `deletedAt`

### Module: `src/modules/identity`

| Layer | Contents |
|-------|----------|
| application | `AuthService`, Zod validators, DTOs |
| infrastructure | repository, JWT/opaque token helpers, TOTP (`otplib`) |
| presentation | `/api/v1/auth` routes + Swagger JSDoc |
| domain | status/session types |

### Routes (`/api/v1/auth`)

| Method | Path | Auth |
|--------|------|------|
| POST | `/register` | Public |
| POST | `/login` | Public |
| POST | `/refresh` | Refresh token |
| POST | `/logout` | Bearer |
| POST | `/verify-email` | Public |
| POST | `/forgot-password` | Public |
| POST | `/reset-password` | Public |
| GET | `/me` | Bearer |
| GET | `/sessions` | Bearer |
| DELETE | `/sessions/:id` | Bearer |
| GET | `/devices` | Bearer |
| GET | `/login-history` | Bearer |
| POST | `/2fa/setup` | Bearer |
| POST | `/2fa/enable` | Bearer |
| POST | `/2fa/disable` | Bearer |

### Security behavior

- Access tokens: JWT (`JWT_ACCESS_SECRET`, short-lived)
- Refresh tokens: opaque, **SHA-256 hashed** at rest, rotated on each refresh
- Refresh **reuse detection** revokes the whole token family
- Email verification / password reset tokens returned in **non-production** responses (email adapter → Step 16)
- TOTP 2FA via `otplib`

---

## Migrations

`prisma db push` applied to local SQLite `dev.db`.

---

## Tests

- `tests/integration/auth.test.ts` — register → verify → login → refresh rotation → logout → password reset
- `tests/unit/identity-tokens.test.ts`

**Suite: 38 passed**

---

## Next

```text
Do Step 5
```
