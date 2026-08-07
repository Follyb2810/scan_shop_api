# Domain Model

Companion to [SAD.md](./SAD.md). Describes aggregates, ubiquitous language, and lifecycle rules.

---

## 1. Ubiquitous language

| Term | Meaning |
|------|---------|
| Platform | The SaaS owner / operator of Healthcare OS |
| Organization (Tenant) | An independent healthcare business on the platform |
| Branch | A physical/logical site under an organization |
| Warehouse | Storage location under a branch |
| Membership | Link between a User and an Organization (with roles) |
| Customer | Platform buyer not acting as a tenant |
| Permission | Platform-defined capability (`resource.action`) |
| Role | Named set of permissions (platform-scoped or org-scoped) |
| Catalog item | Sellable/definable medicine hierarchy node |
| Batch / Lot | Manufactured quantity with shared expiry/QA |
| Packaging level | Pallet → … → Retail unit |
| Logistics unit | Higher packaging instance (carton, case, …) |
| Retail unit | Smallest scannable saleable unit |
| Custody transfer | Inter-org movement of batch/units |
| Verification | Cryptographic + business authenticity check on scan |
| Workflow | Reusable approval process instance |

---

## 2. Context map

```text
identity ──provides User──► rbac, organization, customer, audit
rbac ──authorizes──► all modules
organization ──tenancy──► catalog, batch, warehouse, inventory, …
workflow ◄──approvals──► organization, catalog, marketplace, inventory, supply-chain
catalog ──defines──► batch, marketplace, verification
batch ──produced──► inventory, verification, supply-chain
warehouse ──locates──► inventory
inventory ◄──moves──► supply-chain, marketplace
verification ──scans──► audit, notification
marketplace ──orders──► payments, inventory, notification
notification ◄──events──► many
analytics ◄──reads──► many (read model)
audit ◄──records──► many
```

---

## 3. Aggregates by context

### 3.1 Identity

**User** (aggregate root)

- email, password hash, profile fields, status
- EmailVerification, PasswordResetToken
- Sessions / RefreshTokens / Devices / LoginHistory
- TwoFactorSecret (optional)

Invariants:

- Email unique
- Refresh tokens rotated; reuse detected → revoke family

### 3.2 RBAC

**Permission** — immutable catalog entries owned by platform  
**PlatformRole** — platform staff roles  
**OrganizationRole** — per-org role definitions (seeded defaults + custom)  
**RolePermission** — grant  
**MembershipRole** — assigns org roles to a membership  
**PlatformUserRole** — assigns platform roles to a user

Invariants:

- Orgs cannot create Permission rows
- Custom org roles only reference existing permissions
- Permission names globally unique

### 3.3 Organization

**Organization** (root)

- name, slug, status, typeId
- OrganizationProfile (licenses, NAFDAC, tax, address, …)
- Branches[]
- Memberships[]

**Branch**

- name, code, address, status
- Warehouses[] (owned by warehouse context but FK here)

**Membership**

- userId, organizationId, status, optional defaultBranchId

Invariants:

- Soft-delete org does not hard-delete audit history
- User can have multiple memberships; active tenant chosen per request

### 3.4 Workflow

**WorkflowDefinition**

- key (e.g. `organization.approval`)
- steps[] with required permission / role

**WorkflowInstance**

- definitionId, subjectType, subjectId, organizationId?, status
- currentStep
- actions[] (actor, decision, comment, at)

Invariants:

- Only eligible actors can approve current step
- Subject status updates happen via application policy after workflow completion event

### 3.5 Catalog

Hierarchy (roots/entities):

```text
ProductFamily
  └── Brand
        └── Medicine (generic/trade identity)
              └── Variant (strength, form, attributes)
                    └── PackageDefinition (pack size, GTIN/SKU template, dosage form link)
```

Supporting:

- MedicineCategory
- DosageForm (Tablet, Capsule, Injection, …)
- Attribute definitions (color, size, weight, …)

**Lifecycle (catalog/publish):**  
`Draft → Submitted → Approved → …` (marketplace availability is separate)

Invariants:

- Tenant owns catalog rows via `organizationId`
- SKU/GTIN uniqueness rules scoped appropriately (global GTIN if present; SKU per org)

### 3.6 Batch

**Batch** (root)

- batchNumber, lotNumber
- manufactureDate, expiryDate
- qaStatus, recallStatus
- productionQty, currentQty
- manufacturerOrganizationId
- packageDefinitionId
- certificates / documents metadata

Invariants:

- Expiry >= manufacture
- Recall status changes emit domain events (notifications)
- Quantity reductions only through inventory/supply-chain services

### 3.7 Warehouse

**Warehouse** (root)

- branchId, organizationId
- type (Main, Cold Storage, Returns, Transit, Overflow)
- status, capacity metadata

### 3.8 Inventory

**InventoryPosition** (root)

- organizationId, branchId, warehouseId
- batchId
- packagingLevel
- packagingInstanceId? (optional for unit-level)
- quantities by state:
  - available, reserved, damaged, expired, quarantined, returned, in_transit, sold, destroyed

**InventoryMovement** (event/ledger)

- type, quantities, reason, actor, refs (transferId/orderId)

Invariants:

- Sum of states consistent with movements (ledger-friendly)
- Mutations in DB transactions
- Never negative available without explicit backorder policy (v1: reject)

### 3.9 Verification

**TrackableUnit** (root) — replaces legacy ProductUnit

- organizationId (manufacturer/issuer)
- batchId, packageDefinitionId
- packagingLevel, parentUnitId?
- serial / unitNumber
- barcode/QR payload, signature, keyId
- status (active, sold, recalled, expired, destroyed, suspicious)
- ownership hints (currentOrganizationId, currentWarehouseId, soldToCustomerId)

**ScanEvent**

- unitId, scanner user/customer, geo, result, reason codes

Invariants:

- Signature must validate before business checks
- First scan vs subsequent scan semantics preserved
- Forged/unknown units create failed scan events

### 3.10 Supply chain

**CustodyTransfer** (root)

- fromOrganizationId, toOrganizationId
- batchId / unit range refs
- quantity, packagingLevel
- status: draft → submitted → approved → in_transit → received → rejected/cancelled
- documents, approvedBy, receivedBy, timestamps

Invariants:

- Sender must own available stock
- Receive posts inventory to receiver warehouse
- Workflow may gate approve/receive

### 3.11 Marketplace & customer

**Listing** — org offers PackageDefinition/Batch availability at price  
**Cart / Order / OrderLine** — customer purchases  
**Promotion / Coupon** — optional MVP subset  
**Review / Rating**  
**CustomerProfile / Address / Wishlist**

Invariants:

- Listing org must be allowed type + approved
- Order payment state drives inventory reservation → capture

### 3.12 Payments

**Payment**

- orderId, amount, currency, provider, status, external refs

### 3.13 Notification / Audit / Analytics

- Notification outbox + channel deliveries
- AuditLog general (not only scans)
- Analytics via queries/materialized views later

---

## 4. Product lifecycle (end-to-end)

```text
Draft → Submitted → Approved → Manufactured → BatchCreated → QA
  → Available → Transferred → Listed(Marketplace) → Sold
  → Verified(Scan) → Expired | Recalled → Destroyed
```

States may live on different aggregates (catalog vs batch vs unit vs listing).  
Do **not** force one enum on one table for the entire chain.

---

## 5. Packaging hierarchy

Logical levels (extensible seed):

1. Pallet  
2. Container  
3. Carton  
4. Case  
5. Pack  
6. Bottle  
7. Strip  
8. Retail Unit  

Each **PackagingInstance** may have its own barcode/QR.  
Parent/child forms a tree under a batch.

---

## 6. Domain events (initial set)

| Event | Publishers | Consumers |
|-------|------------|-----------|
| `OrganizationSubmitted` | organization | workflow, notification |
| `OrganizationApproved` | workflow | organization, notification |
| `BatchRecalled` | batch | inventory, verification, notification, marketplace |
| `CustodyTransferReceived` | supply-chain | inventory, verification, audit |
| `OrderPaid` | payments | marketplace, inventory, notification |
| `UnitScanned` | verification | analytics, audit, notification (recall alerts) |
| `ListingApproved` | workflow | marketplace |

Implementation: in-process event bus first; BullMQ for async side effects.

---

## 7. Permission naming convention

```text
<resource>[.<subresource>].<action>
```

Examples:

- `product.create`
- `product.publish`
- `batch.create`
- `inventory.transfer`
- `warehouse.manage`
- `barcode.generate`
- `barcode.scan`
- `orders.manage`
- `users.manage`
- `roles.manage`
- `analytics.view`
- `reports.export`
- `audit.view`
- `settings.update`
- `platform.organizations.approve`

Actions vocabulary: `create | read | update | delete | manage | approve | publish | export | transfer | scan | generate | view`

---

## 8. Soft delete policy

Use `deletedAt` on: Organization, Branch, Warehouse, Catalog entities, Listings, Users (deactivate preferred).  
Do **not** soft-delete AuditLog or ScanEvent (append-only).  
Payments/Orders: status transitions, not delete.
