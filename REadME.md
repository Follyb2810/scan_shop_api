# Shop Scan Backend — Secure Starter (Express + Prisma + SQLite)

This document contains a secure, production-minded starter backend implementing:

- Manufacturer onboarding (application + admin approval)
- Roles: ADMIN, MODERATOR, MANUFACTURER, USER
- Products (catalog-level) and ProductUnits (individual physical units)
- Per-unit barcode generation (unique barcode per produced item)
- Scan verification for individual units
- Audit logs

---

## Highlights of the design

- **Manufacturer onboarding**: manufacturers **cannot** self-register as `MANUFACTURER`. They submit an application; admin reviews & approves. Admin creates the `Manufacturer` and links a `User` with role `MANUFACTURER` to it.

- **Product vs ProductUnit**: A `Product` represents a product model (e.g., "Product A"). When a manufacturer reports producing `quantity` units, the backend creates `quantity` `ProductUnit` records — each with a unique `barcodeData`. Scanning verifies the unit, not only the product model. This lets you mark individual units as sold/used and track per-unit audit logs.

- **Barcode uniqueness & forgery resistance**: Barcode payload includes manufacturer id, product id, unit serial, and an HMAC signature (configurable secret). This prevents easy forging of barcode strings.

- **Scanner flow**: Scanner posts `barcodeData` to `/products/scan`. The backend verifies HMAC and then looks up the `ProductUnit`.

---

### barcode

### MSC|M:{manufacturerId}|P:{productId}|U:{unitUUID}|S:{unitNumber}

### MSC|M:98c2-44ab|P:a12b-889c|U:772f-e21d-992e|S:104

### MSC = “Manufacturer Supply Chain” (your namespace)
# scan_shop_api
