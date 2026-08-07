# Mobile Frontend Agent Guide

**Audience:** Frontend / mobile agent building the Scan Shop / Healthcare OS client  
**API base:** `{APP_URL}/api/v1` (local default `http://localhost:5000/api/v1`)  
**Live contract:** Swagger at `{APP_URL}/api-docs` — prefer this over older outline docs if they disagree  
**Last aligned to:** implemented routers in `src/api/v1/routes.ts` + module `presentation/routes.ts`

---

## 0. What you are building

Build **one mobile app with two modes** (tabs / role switch), not two separate apps:

| Mode | Who | Primary jobs |
|------|-----|----------------|
| **Consumer** | Shopper / patient | Browse marketplace, cart, checkout, pay, scan/verify packs, orders, wishlist, notifications |
| **Staff** | Org member (pharmacy, warehouse, seller) | Pick org, inventory, fulfill orders, batches, transfers, listings, analytics |

Platform admin is **web-first** — do not prioritize platform screens in v1 mobile.

### Non-negotiable client rules

1. **Envelope:** every JSON response is `{ success, data?, error?, meta? }`. Never assume bare payloads.
2. **Auth:** store `accessToken` + `refreshToken` securely (Keychain / Keystore / SecureStore). Attach `Authorization: Bearer <accessToken>` on protected calls.
3. **Tenant:** for staff org calls, send `X-Organization-Id: <orgUuid>` **or** use nested paths `/organizations/:orgId/...` (backend sets tenant from `:orgId`). Prefer nested paths for clarity.
4. **Hats:** after login, call `GET /auth/me` and `GET /organizations/mine`. If user has memberships → offer Staff mode. Always ensure customer profile before shop flows (`POST /customers/profile`).
5. **Errors:** map `error.code` to UI. On `401`, try refresh once, then force logout.
6. **Do not invent endpoints.** If Swagger does not list it, do not call it. Ignore outline paths like `/users/me`, top-level `/batches`, `/ready`.

---

## 1. Client architecture (best for a mobile agent)

### Recommended stack choices

| Concern | Recommendation |
|---------|----------------|
| Framework | React Native (Expo) **or** Flutter — pick one and stay consistent |
| Navigation | File/stack tabs: `AuthStack` → `RootTabs(Consumer | Staff)` |
| Server state | TanStack Query / Riverpod+Async — cache lists, invalidate on mutations |
| Local secrets | Secure storage only for tokens |
| HTTP | Single `apiClient` with interceptors (auth, org header, refresh, request id) |
| Forms | Schema-validated forms matching API bodies (zod / freezed) |
| QR | Camera + ML kit / `expo-camera` → POST scan/verify |
| Payments (dev) | Call stub pay after intent; production later swaps provider SDK |

### `apiClient` checklist

```text
baseURL = APP_URL + /api/v1
headers:
  Content-Type: application/json
  Authorization: Bearer <access>          // if logged in
  X-Organization-Id: <activeOrgId>        // staff mode only
  X-Branch-Id: <activeBranchId>           // optional staff context
  X-Request-Id: <uuid>                    // generate per request
  Idempotency-Key: <uuid>                 // ONLY on POST /payments/intent

on 401:
  POST /auth/refresh { refreshToken }
  retry original once
  else clear session → AuthStack

on success:false:
  throw ApiError(code, message, details)
```

### Response shape

```json
{ "success": true, "data": {}, "meta": {} }
{ "success": false, "error": { "code": "FORBIDDEN", "message": "...", "details": {} } }
```

### Global app state to keep

| Key | Source | Notes |
|-----|--------|-------|
| `session.user` | `/auth/me` | Identity |
| `session.tokens` | login/refresh | Secure store |
| `customer.profile` | `/customers/me` | Required for cart/checkout |
| `orgs.mine` | `/organizations/mine` | Gate Staff mode |
| `org.activeId` | user pick | Drive `X-Organization-Id` |
| `org.permissions` | `/rbac/me` or `/auth/me` context | Hide screens/actions |
| `branch.activeId` | optional | Warehouse/branch filters |
| `cart.badge` | `/marketplace/cart` | Tab badge |
| `notifications.unread` | `/notifications` | Tab badge |

---

## 2. App navigation map (implement in this order)

```text
AuthStack
  Splash
  Welcome
  Login
  Register
  ForgotPassword
  ResetPassword
  VerifyEmail

Root (after auth)
  ModeSwitch (Consumer | Staff)     // hide Staff if orgs.mine empty

  ConsumerTabs
    Home / Discover
    Scan
    Cart
    Orders
    Account
      Profile, Addresses, Wishlist, Notifications, Security, Switch to Staff

  StaffTabs (requires activeOrg)
    Dashboard
    Orders (fulfill)
    Inventory
    Scan / Units
    More
      Catalog, Batches, Warehouses, Transfers, Listings, Members, Analytics, Settings
```

Build **Consumer first** (shippable), then Staff modules by role.

---

## 3. Shared auth pages

### Page: Splash

**Job:** Restore session or send to Welcome.  
**APIs:**

| When | Call |
|------|------|
| Has refresh token | `POST /auth/refresh` `{ refreshToken }` |
| Success | `GET /auth/me` then navigate Root |
| Fail | clear storage → Welcome |

**Best:** soft timeout (2s max). Do not block forever on network.

---

### Page: Welcome

**Job:** Brand + CTAs Login / Register / “Continue as guest scan”.  
**APIs:** none (guest can later hit public verify).  
**Best:** guest scan → Scan page using only `POST /verification/verify` (no history). Prompt login to save history via `/scans`.

---

### Page: Register

**API:** `POST /auth/register`

```json
{
  "email": "user@example.com",
  "password": "string(8-128)",
  "firstName": "optional",
  "lastName": "optional",
  "phoneNumber": "optional"
}
```

**Then immediately:**

1. Persist `data.tokens`
2. `POST /customers/profile` `{ displayName?, phone? }`
3. Optional: if `emailVerificationToken` present (dev), offer verify screen
4. Navigate Consumer Home

**Best:** after register always create customer profile before showing shop UI.

---

### Page: Login

**API:** `POST /auth/login`

```json
{
  "email": "",
  "password": "",
  "totpCode": "optional if 2FA",
  "deviceName": "iPhone 15",
  "deviceFingerprint": "stable-device-id"
}
```

**Then:** `GET /auth/me` → `GET /organizations/mine` → `POST /customers/profile` (idempotent ensure) → Root.

**Best:** send `deviceName` + `deviceFingerprint` for session list later.

---

### Page: Forgot / Reset / Verify email

| Page | API |
|------|-----|
| Forgot | `POST /auth/forgot-password` `{ email }` |
| Reset | `POST /auth/reset-password` `{ token, password }` |
| Verify | `POST /auth/verify-email` `{ token }` |

**Best:** deep link tokens from email into Reset/Verify screens.

---

### Page: Account → Security

| Action | API |
|--------|-----|
| Sessions list | `GET /auth/sessions` |
| Revoke session | `DELETE /auth/sessions/:id` |
| Devices | `GET /auth/devices` |
| Login history | `GET /auth/login-history` |
| 2FA setup | `POST /auth/2fa/setup` |
| 2FA enable | `POST /auth/2fa/enable` `{ totpCode }` |
| 2FA disable | `POST /auth/2fa/disable` `{ totpCode, password }` |
| Logout | `POST /auth/logout` `{ refreshToken? }` then clear storage |

---

## 4. Consumer pages (page-by-page)

### Page: Home / Discover

**Job:** Browse published medicines/listings.  
**APIs:**

| UI block | API |
|----------|-----|
| Categories chips | `GET /marketplace/categories` |
| Listing grid | `GET /marketplace/listings?…` |
| Search | `GET /marketplace/search?q=…` |
| Pull-to-refresh | same |

**Best:**

- Public — works logged out; gate Add-to-cart behind auth.
- Cache categories longer than listings.
- Listing card: image, title, price, seller org name, rating if present.

---

### Page: Listing Detail

**APIs:**

| Action | API |
|--------|-----|
| Load | `GET /marketplace/listings/:listingId` |
| Wishlist add/remove | `POST` / `DELETE /marketplace/wishlist/:listingId` |
| Add to cart | `POST /marketplace/cart` `{ listingId, quantity }` |
| Review | `POST /marketplace/reviews` `{ listingId, rating, comment? }` |

**Best:** optimistic wishlist heart; require auth for cart/wishlist/review with login sheet.

---

### Page: Cart

**APIs:**

| Action | API |
|--------|-----|
| Load | `GET /marketplace/cart` |
| Upsert qty | `POST /marketplace/cart` `{ listingId, quantity }` |
| Remove | `DELETE /marketplace/cart/:listingId` |
| Validate coupon | `GET /marketplace/coupons/validate?code=&orderTotal=` |

**Best:** keep coupon draft local until checkout; revalidate totals after cart changes.

---

### Page: Checkout

**Prereq:** addresses loaded; customer profile exists.

**APIs:**

| Step | API |
|------|-----|
| Addresses | `GET /customers/me/addresses` |
| Create address (inline) | `POST /customers/me/addresses` |
| Place order | `POST /marketplace/orders` |
| Pay intent | `POST /payments/intent` + header `Idempotency-Key` |
| Dev complete pay | `POST /payments/stub/pay` `{ orderId }` |
| Confirm | `GET /marketplace/orders/:orderId` |

**Checkout body:**

```json
{
  "addressId": "uuid-or-null",
  "shippingAddress": { "line1": "", "city": "", "country": "" },
  "couponCode": "optional",
  "notes": "optional"
}
```

**Payment intent body:** `{ "orderId": "…", "provider": "stub" }`

**Best flow (dev/sandbox):**

```text
create order → payment intent (Idempotency-Key) → stub/pay → show Order Confirmed
poll GET order until status paid (or trust stub response)
```

**Best UX:** never double-tap pay — disable button; reuse same Idempotency-Key on retry.

---

### Page: My Orders (consumer)

| Action | API |
|--------|-----|
| List | `GET /marketplace/orders` |
| Detail / track | `GET /marketplace/orders/:orderId` |
| Payment status | `GET /payments/:id` if payment id known |

**Best:** status timeline from order fields (`pending` → `paid` → `fulfilled` / etc.). Do **not** use org `GET /orders` here.

---

### Page: Scan / Verify (hero feature)

Two modes on one screen:

| Mode | When | API | Saves history? |
|------|------|-----|----------------|
| Quick verify | Guest or fast check | `POST /verification/verify` `{ payload }` | No |
| Full scan | Logged in preferred | `POST /scans` `{ payload, lat?, lng?, city?, country? }` | Yes |
| History | Logged in | `GET /scans/mine` | — |

**Best:**

1. Camera reads QR → string `payload`.
2. Call `/scans` if authenticated, else `/verification/verify`.
3. Show clear result states: **authentic / forged / recalled / unknown** from API fields.
4. Optional GPS for trust/context.
5. After result, CTA: “View product” if listing/package linkage exists; else “Done”.

---

### Page: Wishlist

| Action | API |
|--------|-----|
| List | `GET /marketplace/wishlist` |
| Remove | `DELETE /marketplace/wishlist/:listingId` |
| Add from detail | `POST /marketplace/wishlist/:listingId` |

---

### Page: Account / Profile

| Action | API |
|--------|-----|
| Ensure profile | `POST /customers/profile` |
| Get | `GET /customers/me` |
| Update | `PATCH /customers/me` |
| Identity | `GET /auth/me` |

---

### Page: Addresses

| Action | API |
|--------|-----|
| List | `GET /customers/me/addresses` |
| Create | `POST /customers/me/addresses` |
| Update | `PATCH /customers/me/addresses/:addressId` |
| Delete | `DELETE /customers/me/addresses/:addressId` |

**Best:** one default address flag in UI even if API is flat — send preferred addressId at checkout.

---

### Page: Notifications

| Action | API |
|--------|-----|
| List | `GET /notifications` |
| Read one | `POST /notifications/:id/read` |
| Read all | `POST /notifications/read-all` |

**Best:** badge = count unread client-side; refresh on app foreground.

---

## 5. Staff pages (page-by-page)

### Gate: Org picker

**API:** `GET /organizations/mine`  
**Job:** user selects active org → set `org.activeId` → `GET /rbac/me` (with `X-Organization-Id`) → build Staff tabs from permissions.

**Hide actions without permission** (do not only disable — remove dead ends):

| Permission | Unlocks |
|------------|---------|
| `orders.read` / `orders.manage` | Orders inbox / fulfill |
| `inventory.*` | Inventory |
| `warehouse.*` | Warehouses |
| `batch.*` | Batches |
| `barcode.generate` / `verification.read` | Units |
| `supply_chain.*` | Transfers |
| `marketplace.listing.*` | Seller listings |
| `analytics.view` | Analytics |
| `product.*` | Catalog |
| `users.*` / `roles.*` | Members / roles |

---

### Page: Staff Dashboard

**APIs (send tenant header):**

| Card | API |
|------|-----|
| Overview | `GET /analytics/organization/overview` |
| Sales | `GET /analytics/sales` |
| Inventory snapshot | `GET /analytics/inventory` |
| Verification | `GET /analytics/verification` |

**Best:** 4 KPI cards + “Open orders” shortcut. Fail soft if `analytics.view` missing.

---

### Page: Org Orders (fulfillment)

| Action | API |
|--------|-----|
| List | `GET /orders` **or** `GET /organizations/:orgId/orders` |
| Fulfill | `PATCH /orders/:orderId/fulfill` `{ status, trackingCode? }` |

**Best:** staff list ≠ consumer `/marketplace/orders`. Use org orders only in Staff mode.

---

### Page: Inventory

Base: `/organizations/:orgId/inventory`

| Action | API |
|--------|-----|
| Positions | `GET .../inventory` |
| Movements | `GET .../inventory/movements` |
| Position | `GET .../inventory/positions/:positionId` |
| Receive | `POST .../inventory/receive` |
| Adjust | `POST .../inventory/adjust` |
| Reserve | `POST .../inventory/reserve` |
| Release | `POST .../inventory/release` |
| Transfer (internal) | `POST .../inventory/transfer` |

**Best:** default list view; detail sheet for movements. Confirm destructive adjusts.

---

### Page: Warehouses

| Action | API |
|--------|-----|
| Types (once) | `GET /warehouses/types` |
| List/create | `GET`/`POST /organizations/:orgId/warehouses` |
| Update/delete | `PATCH`/`DELETE .../warehouses/:warehouseId` |
| Branch nested | `.../branches/:branchId/warehouses` |

---

### Page: Batches

| Action | API |
|--------|-----|
| List/create | `GET`/`POST .../batches` |
| Detail/update | `GET`/`PATCH .../batches/:batchId` |
| QA | `POST .../batches/:batchId/qa` |
| Recall | `POST .../batches/:batchId/recall` |

**Best:** QA/Recall behind confirmation + reason field; only show if permission present.

---

### Page: Generate / manage units (staff scan ops)

| Action | API |
|--------|-----|
| Generate | `POST .../verification/units/generate` |
| List | `GET .../verification/units` |
| Detail | `GET .../verification/units/:unitId` |
| Unit scans | `GET .../verification/units/:unitId/scans` |

**Best:** after generate, show QR payloads for print/share. Staff verifying in field can also use consumer Scan page.

---

### Page: Supply chain transfers

Base: `/organizations/:orgId/supply-chain/transfers`

| Action | API |
|--------|-----|
| List/create | `GET` / `POST .../transfers` |
| Detail | `GET .../transfers/:transferId` |
| Submit | `POST .../transfers/:id/submit` |
| Approve / Reject | `POST .../approve` / `.../reject` |
| Ship | `POST .../ship` |
| Receive | `POST .../receive` |
| Cancel | `POST .../cancel` |

**Best:** wizard UI by status (`draft → submitted → approved → in_transit → received`). Show only actions valid for current status + permission.

---

### Page: Seller listings

| Action | API |
|--------|-----|
| My listings | `GET /marketplace/seller/listings` or `GET .../marketplace/listings` |
| Create | `POST /marketplace/listings` (tenant header) |
| Publish | `POST /marketplace/listings/:listingId/publish` |

**Best:** publishing may enter workflow — show “pending approval” state; poll or rely on notification.

---

### Page: Catalog (manufacturer / pharmacy advanced)

Base: `/organizations/:orgId`

| Resource | APIs |
|----------|------|
| Families | `GET`/`POST .../families` |
| Brands | `POST .../brands` |
| Medicines | `GET`/`POST .../medicines`, `PATCH .../medicines/:id`, `POST .../medicines/:id/submit` |
| Variants | `POST .../variants` |
| Packages | `GET`/`POST .../packages` |
| One-shot | `POST .../hierarchy` |

**Best:** mobile = simplified “create medicine package” using `/hierarchy` if available; full tree editing is better on web.

---

### Page: Members & roles

| Action | API |
|--------|-----|
| Members | `GET`/`POST`/`PATCH .../members` |
| Roles | `GET`/`POST .../roles` |
| Role perms | `PATCH .../roles/:roleId/permissions` |
| Assign | `POST .../roles/members/:userId/assign` |

---

### Page: Org settings / branches

| Action | API |
|--------|-----|
| Org | `GET`/`PATCH /organizations/:orgId` |
| Branches | `GET`/`POST`/`PATCH`/`DELETE .../branches` |
| Create org (onboarding) | `POST /organizations` → then wait workflow |

**Create org types:** `GET /organizations/types` for picker.

---

### Page: Workflow inbox (light)

| Action | API |
|--------|-----|
| Definitions | `GET /workflows/definitions` |
| Instance | `GET /workflows/instances/:id` |
| Act | `POST /workflows/instances/:id/actions` |

**Best:** deep-link from notifications (“Listing needs approval”) rather than a full inbox in v1.

---

### Page: Audit (optional staff)

`GET /organizations/:orgId/audit` — read-only trail. Low priority for mobile v1.

---

## 6. End-to-end flows the agent must implement correctly

### A. Consumer purchase

```text
Register/Login
 → POST /customers/profile
 → Browse listings
 → POST /marketplace/cart
 → POST /marketplace/orders
 → POST /payments/intent (Idempotency-Key)
 → POST /payments/stub/pay          // sandbox
 → GET /marketplace/orders/:id
 → GET /notifications               // order.paid
```

### B. Authenticity scan

```text
Camera → payload string
 → POST /scans (auth) OR /verification/verify (guest)
 → Result UI
 → optional GET /scans/mine
```

### C. Staff fulfill

```text
GET /organizations/mine → select org
 → GET /orders
 → PATCH /orders/:id/fulfill
```

### D. Staff receive stock / transfer

```text
Create transfer (sender org) → submit → approve → ship
 → receiver org: receive
 → GET inventory to confirm
```

---

## 7. Permission-driven UI (do this well)

1. After org select, load `GET /rbac/me`.
2. Build a `can(permission: string)` helper.
3. Tabs/actions:
   - missing `orders.read` → hide Orders tab
   - missing `inventory.read` → hide Inventory
   - show “Request access” empty state only if useful
4. `OWNER` / broad grants may include `*org`-style power — still check concrete keys from `/rbac/me`.

Customer mode does **not** use org permission keys; it uses login + customer profile.

---

## 8. UX / quality bar for the mobile agent

| Area | Guidance |
|------|----------|
| Empty states | Always explain next action (“Scan a pack”, “Add from Discover”) |
| Offline | Queue non-critical GETs; never queue payments blindly |
| Loading | Skeleton for lists; disable double submits on POSTs |
| Security | No tokens in AsyncStorage plain text; no logging Authorization headers |
| Deep links | `/listing/:id`, `/orders/:id`, `/reset?token=`, `/verify-email?token=` |
| Accessibility | Large scan result text (authentic vs forged) |
| Theming | Follow product brand; avoid generic purple AI UI |
| Guest | Allow verify + browse; soft-gate cart/checkout |

---

## 9. What NOT to build on mobile v1

- Platform admin consoles (`platform.*`)
- Full RBAC permission matrix editors (keep simple assign)
- Assuming top-level `/batches`, `/inventory`, `/users/me`, `/ready`
- Card-payment SDK until real provider replaces stub
- Legacy `/src/module` prototype APIs (removed)

---

## 10. Implementation checklist (agent execution order)

Use this as the build sequence:

1. [ ] `apiClient` + secure token store + refresh
2. [ ] AuthStack (register/login/me/logout)
3. [ ] Customer profile ensure + Account/Addresses
4. [ ] Discover + Listing detail + Wishlist
5. [ ] Cart + Checkout + stub payment + Order detail
6. [ ] Scan/Verify + scan history
7. [ ] Notifications
8. [ ] Org picker + permission gating
9. [ ] Staff orders fulfill
10. [ ] Inventory + warehouses
11. [ ] Batches + unit generate
12. [ ] Supply-chain transfers
13. [ ] Seller listings
14. [ ] Staff dashboard analytics
15. [ ] Security (sessions/2FA) polish

---

## 11. Quick API index (mobile-relevant)

### Public / light auth

- `GET /health`
- `GET /marketplace/categories|listings|search|listings/:id`
- `POST /verification/verify`
- `POST /scans` (optional auth)
- `GET /catalog/categories|dosage-forms|packaging-types`
- `GET /organizations/types`
- `GET /warehouses/types`

### Consumer auth

- `/auth/*`, `/customers/*`, `/marketplace/cart|orders|wishlist|reviews|coupons/*`
- `/payments/intent`, `/payments/stub/pay`, `/payments/:id`
- `/scans/mine`, `/notifications/*`

### Staff (tenant)

- `/organizations/mine`, `/organizations/:orgId/**`
- `/orders`, `/marketplace/seller/listings`, `/marketplace/listings*`
- `/analytics/organization/*`, `/rbac/me`, `/workflows/instances/:id/actions`

---

## 12. Source of truth while coding

| Need | Go here |
|------|---------|
| Try endpoints | `{APP_URL}/api-docs` |
| Route mounts | `src/api/v1/routes.ts` |
| Permissions | `docs/rbac/roles-permissions-matrix.md` |
| Flow diagrams | `docs/architecture/sequence-diagrams.md` |
| This guide | `docs/mobile/FRONTEND_AGENT_GUIDE.md` |

When unsure, **call Swagger / read the presentation router** — do not guess from outdated outline sections.
