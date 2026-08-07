# Step 14 — Marketplace + customer modules

**Status:** Complete  
**Date:** 2026-08-07

---

## What shipped

### Prisma

- `CustomerProfile`, `Address`
- `MarketplaceCategory`, `Listing`, `ListingReview`
- `Cart`, `CartItem`, `Order`, `OrderLine`, `WishlistItem`, `Coupon`

### Customer (`src/modules/customer`)

Non-tenant platform users: ensure profile, me, addresses CRUD.

### Marketplace (`src/modules/marketplace`)

- Browse/search published listings + categories
- Seller create/publish listing (allowed types: PHARMACY, WHOLESALER, DISTRIBUTOR, MANUFACTURER)
- Publish → `marketplace.listing.approval` workflow → published
- Cart (single-seller MVP), checkout → order with tracking code
- Org fulfill: confirmed → processing → shipped → delivered
- Wishlist, reviews (rating avg), coupon validate (`WELCOME10`, `SAVE500`)

### APIs

| Area | Paths |
|------|--------|
| Customer | `/api/v1/customers/profile`, `/me`, `/me/addresses` |
| Public market | `/api/v1/marketplace/categories\|listings\|search` |
| Seller | `POST /marketplace/listings`, `.../publish` (+ org-scoped mirrors) |
| Buyer | cart, orders, wishlist, reviews, coupons/validate |
| Org orders | `GET/PATCH /api/v1/orders...` (`orders.read` / `orders.manage`) |

### MVP deferrals (noted)

- Multi-seller cart / split orders
- Payment settlement (Step 15)
- Promotions beyond simple coupons

---

## Proven

- Customer browse → cart → order → track shipped status
- Listing moderation workflow publishes listing
- Coupon discount applied on checkout

**Suite: 108 passed**

---

## Next

```text
Do Step 15
```
