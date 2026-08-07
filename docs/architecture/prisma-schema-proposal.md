# Prisma Schema Proposal

**Status:** Proposal only (Step 0). No migrations applied.  
**DB:** PostgreSQL  
**IDs:** UUID (`@id @default(uuid())`)  
**Timestamps:** `createdAt`, `updatedAt`; `deletedAt` where soft-delete applies  

Prisma multi-file layout (Step 1+):

```text
prisma/schema/
  schema.prisma          # generator + datasource
  identity.prisma
  rbac.prisma
  organization.prisma
  ...
```

---

## 1. Generator & datasource

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

> Note: Current repo uses Prisma 7 client output path quirks. Step 1 will align generator config with installed Prisma version.

---

## 2. Identity

```prisma
model User {
  id           String    @id @default(uuid())
  email        String    @unique
  passwordHash String
  firstName    String?
  lastName     String?
  phoneNumber  String?
  status       String    @default("active") // active|disabled|pending_verification
  emailVerifiedAt DateTime?
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt
  deletedAt    DateTime?

  sessions          Session[]
  refreshTokens     RefreshToken[]
  devices           Device[]
  loginHistories    LoginHistory[]
  twoFactorSecret   TwoFactorSecret?
  platformUserRoles PlatformUserRole[]
  memberships       Membership[]
  customerProfile   CustomerProfile?
  auditLogs         AuditLog[]         @relation("AuditActor")
  notifications     Notification[]
  workflowActions   WorkflowAction[]

  @@index([status])
  @@index([deletedAt])
}

model Session {
  id           String   @id @default(uuid())
  userId       String
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  deviceId     String?
  ipAddress    String?
  userAgent    String?
  expiresAt    DateTime
  revokedAt    DateTime?
  createdAt    DateTime @default(now())

  @@index([userId])
  @@index([expiresAt])
}

model RefreshToken {
  id              String   @id @default(uuid())
  userId          String
  user            User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  tokenHash       String   @unique
  familyId        String
  expiresAt       DateTime
  revokedAt       DateTime?
  replacedByToken String?
  createdAt       DateTime @default(now())

  @@index([userId])
  @@index([familyId])
}

model Device {
  id         String   @id @default(uuid())
  userId     String
  user       User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  name       String?
  fingerprint String?
  lastSeenAt DateTime?
  createdAt  DateTime @default(now())

  @@index([userId])
}

model LoginHistory {
  id        String   @id @default(uuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  ipAddress String?
  userAgent String?
  success   Boolean
  reason    String?
  createdAt DateTime @default(now())

  @@index([userId, createdAt])
}

model TwoFactorSecret {
  id        String   @id @default(uuid())
  userId    String   @unique
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  secretEnc String
  enabled   Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model EmailVerificationToken {
  id        String   @id @default(uuid())
  userId    String
  tokenHash String   @unique
  expiresAt DateTime
  usedAt    DateTime?
  createdAt DateTime @default(now())

  @@index([userId])
}

model PasswordResetToken {
  id        String   @id @default(uuid())
  userId    String
  tokenHash String   @unique
  expiresAt DateTime
  usedAt    DateTime?
  createdAt DateTime @default(now())

  @@index([userId])
}
```

---

## 3. RBAC

```prisma
model Permission {
  id          String   @id @default(uuid())
  key         String   @unique // product.create
  description String?
  group       String?  // product|inventory|platform|...
  createdAt   DateTime @default(now())

  rolePermissions RolePermission[]
}

model PlatformRole {
  id          String   @id @default(uuid())
  key         String   @unique // SUPER_ADMIN
  name        String
  description String?
  createdAt   DateTime @default(now())

  users           PlatformUserRole[]
  rolePermissions RolePermission[]
}

model PlatformUserRole {
  userId String
  roleId String
  user   User         @relation(fields: [userId], references: [id], onDelete: Cascade)
  role   PlatformRole @relation(fields: [roleId], references: [id], onDelete: Cascade)
  assignedAt DateTime @default(now())

  @@id([userId, roleId])
}

model OrganizationRole {
  id             String       @id @default(uuid())
  organizationId String
  organization   Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)
  key            String       // OWNER, CUSTOM_X
  name           String
  description    String?
  isSystem       Boolean      @default(false) // seeded defaults
  createdAt      DateTime     @default(now())
  updatedAt      DateTime     @updatedAt
  deletedAt      DateTime?

  rolePermissions RolePermission[]
  membershipRoles MembershipRole[]

  @@unique([organizationId, key])
  @@index([organizationId])
}

/// Polymorphic grant: exactly one of platformRoleId | organizationRoleId set
model RolePermission {
  id                 String  @id @default(uuid())
  permissionId       String
  permission         Permission @relation(fields: [permissionId], references: [id], onDelete: Cascade)
  platformRoleId     String?
  platformRole       PlatformRole? @relation(fields: [platformRoleId], references: [id], onDelete: Cascade)
  organizationRoleId String?
  organizationRole   OrganizationRole? @relation(fields: [organizationRoleId], references: [id], onDelete: Cascade)

  @@index([permissionId])
  @@index([platformRoleId])
  @@index([organizationRoleId])
}
```

---

## 4. Organization

```prisma
model OrganizationType {
  id        String   @id @default(uuid())
  key       String   @unique // MANUFACTURER
  name      String
  createdAt DateTime @default(now())

  organizations Organization[]
}

model Organization {
  id        String   @id @default(uuid())
  typeId    String
  type      OrganizationType @relation(fields: [typeId], references: [id])
  name      String
  slug      String   @unique
  status    String   @default("pending") // pending|active|suspended|rejected
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  deletedAt DateTime?

  profile      OrganizationProfile?
  branches     Branch[]
  memberships  Membership[]
  roles        OrganizationRole[]
  warehouses   Warehouse[]
  // catalog/batch/etc relations added in those files

  @@index([typeId])
  @@index([status])
}

model OrganizationProfile {
  id                 String       @id @default(uuid())
  organizationId     String       @unique
  organization       Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)
  companyEmail       String?
  companyPhone       String?
  website            String?
  address            String?
  city               String?
  state              String?
  country            String?
  postalCode         String?
  licenseNumber      String?
  registrationNumber String?
  taxId              String?
  nafdacNumber       String?
  sonCertification   String?
  supportingDocuments Json?
  createdAt          DateTime @default(now())
  updatedAt          DateTime @updatedAt
}

model Branch {
  id             String       @id @default(uuid())
  organizationId String
  organization   Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)
  name           String
  code           String
  address        String?
  city           String?
  state          String?
  country        String?
  status         String       @default("active")
  createdAt      DateTime     @default(now())
  updatedAt      DateTime     @updatedAt
  deletedAt      DateTime?

  warehouses Warehouse[]
  inventory  InventoryPosition[]

  @@unique([organizationId, code])
  @@index([organizationId])
}

model Membership {
  id             String       @id @default(uuid())
  organizationId String
  organization   Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)
  userId         String
  user           User         @relation(fields: [userId], references: [id], onDelete: Cascade)
  status         String       @default("active")
  defaultBranchId String?
  createdAt      DateTime     @default(now())
  updatedAt      DateTime     @updatedAt

  roles MembershipRole[]

  @@unique([organizationId, userId])
  @@index([userId])
}

model MembershipRole {
  membershipId String
  roleId       String
  membership   Membership       @relation(fields: [membershipId], references: [id], onDelete: Cascade)
  role         OrganizationRole @relation(fields: [roleId], references: [id], onDelete: Cascade)
  assignedAt   DateTime @default(now())

  @@id([membershipId, roleId])
}
```

---

## 5. Workflow

```prisma
model WorkflowDefinition {
  id        String   @id @default(uuid())
  key       String   @unique
  name      String
  createdAt DateTime @default(now())

  steps     WorkflowStepDefinition[]
  instances WorkflowInstance[]
}

model WorkflowStepDefinition {
  id           String @id @default(uuid())
  definitionId String
  definition   WorkflowDefinition @relation(fields: [definitionId], references: [id], onDelete: Cascade)
  stepOrder    Int
  name         String
  requiredPermissionKey String?

  @@unique([definitionId, stepOrder])
}

model WorkflowInstance {
  id             String   @id @default(uuid())
  definitionId   String
  definition     WorkflowDefinition @relation(fields: [definitionId], references: [id])
  subjectType    String   // organization|product|listing|recall|inventory|...
  subjectId      String
  organizationId String?
  status         String   @default("pending") // pending|approved|rejected|cancelled
  currentStep    Int      @default(1)
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
  completedAt    DateTime?

  actions WorkflowAction[]

  @@index([subjectType, subjectId])
  @@index([organizationId, status])
}

model WorkflowAction {
  id         String @id @default(uuid())
  instanceId String
  instance   WorkflowInstance @relation(fields: [instanceId], references: [id], onDelete: Cascade)
  actorUserId String
  actor      User   @relation(fields: [actorUserId], references: [id])
  stepOrder  Int
  decision   String // approve|reject|comment
  comment    String?
  createdAt  DateTime @default(now())

  @@index([instanceId])
}
```

---

## 6. Catalog (core)

```prisma
model MedicineCategory {
  id       String @id @default(uuid())
  key      String @unique
  name     String
  parentId String?
  medicines Medicine[]
}

model DosageForm {
  id   String @id @default(uuid())
  key  String @unique
  name String
  variants Variant[]
}

model PackagingType {
  id   String @id @default(uuid())
  key  String @unique // PALLET|CARTON|RETAIL_UNIT|...
  name String
  rank Int    // hierarchy order
}

model ProductFamily {
  id             String @id @default(uuid())
  organizationId String
  name           String
  description    String?
  status         String @default("draft")
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
  deletedAt      DateTime?

  brands Brand[]

  @@index([organizationId])
}

model Brand {
  id             String @id @default(uuid())
  organizationId String
  familyId       String
  family         ProductFamily @relation(fields: [familyId], references: [id])
  name           String
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
  deletedAt      DateTime?

  medicines Medicine[]

  @@index([organizationId])
  @@index([familyId])
}

model Medicine {
  id             String @id @default(uuid())
  organizationId String
  brandId        String
  brand          Brand  @relation(fields: [brandId], references: [id])
  categoryId     String?
  category       MedicineCategory? @relation(fields: [categoryId], references: [id])
  name           String
  description    String?
  status         String @default("draft")
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
  deletedAt      DateTime?

  variants Variant[]

  @@index([organizationId])
  @@index([brandId])
}

model Variant {
  id             String @id @default(uuid())
  organizationId String
  medicineId     String
  medicine       Medicine @relation(fields: [medicineId], references: [id])
  dosageFormId   String?
  dosageForm     DosageForm? @relation(fields: [dosageFormId], references: [id])
  name           String
  strength       String?
  sku            String
  gtin           String?
  color          String?
  size           String?
  weight         String?
  attributes     Json?
  status         String @default("draft")
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
  deletedAt      DateTime?

  packages PackageDefinition[]

  @@unique([organizationId, sku])
  @@index([medicineId])
  @@index([gtin])
}

model PackageDefinition {
  id             String @id @default(uuid())
  organizationId String
  variantId      String
  variant        Variant @relation(fields: [variantId], references: [id])
  packagingTypeId String?
  name           String
  unitsPerPackage Int
  barcodeTemplate String?
  status         String @default("draft")
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
  deletedAt      DateTime?

  batches  Batch[]
  listings Listing[]

  @@index([organizationId])
  @@index([variantId])
}
```

---

## 7. Batch, warehouse, inventory

```prisma
model Batch {
  id                   String @id @default(uuid())
  organizationId       String
  packageDefinitionId  String
  packageDefinition    PackageDefinition @relation(fields: [packageDefinitionId], references: [id])
  batchNumber          String
  lotNumber            String?
  manufactureDate      DateTime
  expiryDate           DateTime
  qaStatus             String @default("pending")
  recallStatus         String @default("none") // none|pending|recalled
  productionQuantity   Int
  currentQuantity      Int
  certificates         Json?
  documents            Json?
  nafdacRegistration   String?
  createdAt            DateTime @default(now())
  updatedAt            DateTime @updatedAt
  deletedAt            DateTime?

  packagingInstances PackagingInstance[]
  inventoryPositions InventoryPosition[]
  trackableUnits     TrackableUnit[]
  transferLines      CustodyTransferLine[]

  @@unique([organizationId, batchNumber])
  @@index([expiryDate])
  @@index([recallStatus])
}

model WarehouseType {
  id   String @id @default(uuid())
  key  String @unique
  name String
}

model Warehouse {
  id             String @id @default(uuid())
  organizationId String
  organization   Organization @relation(fields: [organizationId], references: [id])
  branchId       String
  branch         Branch @relation(fields: [branchId], references: [id])
  typeKey        String
  name           String
  status         String @default("active")
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
  deletedAt      DateTime?

  inventory InventoryPosition[]

  @@index([organizationId, branchId])
}

model InventoryPosition {
  id             String @id @default(uuid())
  organizationId String
  branchId       String
  branch         Branch @relation(fields: [branchId], references: [id])
  warehouseId    String
  warehouse      Warehouse @relation(fields: [warehouseId], references: [id])
  batchId        String
  batch          Batch @relation(fields: [batchId], references: [id])
  packagingLevel String
  available      Int @default(0)
  reserved       Int @default(0)
  damaged        Int @default(0)
  expired        Int @default(0)
  quarantined    Int @default(0)
  returned       Int @default(0)
  inTransit      Int @default(0)
  sold           Int @default(0)
  destroyed      Int @default(0)
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt

  movements InventoryMovement[]

  @@unique([warehouseId, batchId, packagingLevel])
  @@index([organizationId])
  @@index([batchId])
}

model InventoryMovement {
  id         String @id @default(uuid())
  positionId String
  position   InventoryPosition @relation(fields: [positionId], references: [id])
  type       String
  quantity   Int
  fromState  String?
  toState    String?
  reason     String?
  actorUserId String?
  referenceType String?
  referenceId   String?
  createdAt  DateTime @default(now())

  @@index([positionId, createdAt])
}
```

---

## 8. Verification

```prisma
model PackagingInstance {
  id         String @id @default(uuid())
  batchId    String
  batch      Batch  @relation(fields: [batchId], references: [id])
  parentId   String?
  parent     PackagingInstance?  @relation("PackTree", fields: [parentId], references: [id])
  children   PackagingInstance[] @relation("PackTree")
  level      String
  barcode    String? @unique
  serial     String?
  createdAt  DateTime @default(now())

  trackableUnit TrackableUnit?

  @@index([batchId])
  @@index([parentId])
}

model TrackableUnit {
  id                    String @id @default(uuid())
  organizationId        String // issuer
  batchId               String
  batch                 Batch  @relation(fields: [batchId], references: [id])
  packagingInstanceId   String @unique
  packagingInstance     PackagingInstance @relation(fields: [packagingInstanceId], references: [id])
  unitNumber            Int?
  qrPayload             String
  signature             String
  keyId                 String?
  status                String @default("active")
  isAuthentic           Boolean @default(true)
  currentOrganizationId String?
  currentWarehouseId    String?
  soldToCustomerId      String?
  firstScannedAt        DateTime?
  scannedCount          Int @default(0)
  lastScannedAt         DateTime?
  isSuspicious          Boolean @default(false)
  createdAt             DateTime @default(now())
  updatedAt             DateTime @updatedAt

  scanEvents ScanEvent[]

  @@index([organizationId])
  @@index([batchId])
  @@index([status])
  @@unique([batchId, unitNumber])
}

model ScanEvent {
  id              String @id @default(uuid())
  trackableUnitId String
  trackableUnit   TrackableUnit @relation(fields: [trackableUnitId], references: [id])
  userId          String?
  result          String // authentic|forged|recalled|expired|unknown|...
  isFirstScan     Boolean @default(false)
  ipAddress       String?
  userAgent       String?
  latitude        Float?
  longitude       Float?
  city            String?
  country         String?
  metadata        Json?
  createdAt       DateTime @default(now())

  @@index([trackableUnitId, createdAt])
  @@index([userId])
}
```

---

## 9. Supply chain, marketplace, customer, payments (summary)

```prisma
model CustodyTransfer {
  id                 String @id @default(uuid())
  fromOrganizationId String
  toOrganizationId   String
  status             String
  approvedByUserId   String?
  receivedByUserId   String?
  documents          Json?
  createdAt          DateTime @default(now())
  updatedAt          DateTime @updatedAt
  approvedAt         DateTime?
  receivedAt         DateTime?

  lines CustodyTransferLine[]

  @@index([fromOrganizationId, status])
  @@index([toOrganizationId, status])
}

model CustodyTransferLine {
  id             String @id @default(uuid())
  transferId     String
  transfer       CustodyTransfer @relation(fields: [transferId], references: [id], onDelete: Cascade)
  batchId        String
  batch          Batch @relation(fields: [batchId], references: [id])
  packagingLevel String
  quantity       Int
}

model CustomerProfile {
  id        String @id @default(uuid())
  userId    String @unique
  user      User   @relation(fields: [userId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  addresses Address[]
  wishlist  WishlistItem[]
  carts     Cart[]
  orders    Order[]
}

model Address {
  id         String @id @default(uuid())
  customerId String
  customer   CustomerProfile @relation(fields: [customerId], references: [id], onDelete: Cascade)
  label      String?
  line1      String
  line2      String?
  city       String
  state      String?
  country    String
  postalCode String?
  isDefault  Boolean @default(false)
}

model Listing {
  id                  String @id @default(uuid())
  organizationId      String
  packageDefinitionId String
  packageDefinition   PackageDefinition @relation(fields: [packageDefinitionId], references: [id])
  title               String
  price               Decimal @db.Decimal(18, 2)
  currency            String
  status              String @default("draft")
  createdAt           DateTime @default(now())
  updatedAt           DateTime @updatedAt
  deletedAt           DateTime?

  @@index([organizationId, status])
}

model Cart {
  id         String @id @default(uuid())
  customerId String
  customer   CustomerProfile @relation(fields: [customerId], references: [id], onDelete: Cascade)
  updatedAt  DateTime @updatedAt
  createdAt  DateTime @default(now())
  items      CartItem[]
}

model CartItem {
  id        String @id @default(uuid())
  cartId    String
  cart      Cart   @relation(fields: [cartId], references: [id], onDelete: Cascade)
  listingId String
  quantity  Int
  @@unique([cartId, listingId])
}

model Order {
  id         String @id @default(uuid())
  customerId String
  customer   CustomerProfile @relation(fields: [customerId], references: [id])
  status     String
  total      Decimal @db.Decimal(18, 2)
  currency   String
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
  lines      OrderLine[]
  payments   Payment[]
}

model OrderLine {
  id        String @id @default(uuid())
  orderId   String
  order     Order  @relation(fields: [orderId], references: [id], onDelete: Cascade)
  listingId String
  quantity  Int
  unitPrice Decimal @db.Decimal(18, 2)
}

model Payment {
  id         String @id @default(uuid())
  orderId    String
  order      Order  @relation(fields: [orderId], references: [id])
  provider   String
  status     String
  amount     Decimal @db.Decimal(18, 2)
  currency   String
  externalId String?
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  @@index([orderId])
}

model WishlistItem {
  id         String @id @default(uuid())
  customerId String
  customer   CustomerProfile @relation(fields: [customerId], references: [id], onDelete: Cascade)
  listingId  String
  createdAt  DateTime @default(now())
  @@unique([customerId, listingId])
}
```

---

## 10. Audit, notification, reference data

```prisma
model AuditLog {
  id             String @id @default(uuid())
  actorUserId    String?
  actor          User?  @relation("AuditActor", fields: [actorUserId], references: [id])
  organizationId String?
  branchId       String?
  warehouseId    String?
  action         String
  entityType     String?
  entityId       String?
  oldValue       Json?
  newValue       Json?
  ipAddress      String?
  userAgent      String?
  city           String?
  country        String?
  createdAt      DateTime @default(now())

  @@index([organizationId, createdAt])
  @@index([actorUserId, createdAt])
  @@index([entityType, entityId])
}

model Notification {
  id        String @id @default(uuid())
  userId    String
  user      User   @relation(fields: [userId], references: [id], onDelete: Cascade)
  channel   String // email|sms|push|in_app|webhook
  type      String
  status    String @default("pending")
  payload   Json
  createdAt DateTime @default(now())
  sentAt    DateTime?

  @@index([userId, createdAt])
}

model Country {
  id   String @id @default(uuid())
  iso2 String @unique
  name String
}

model Currency {
  id   String @id @default(uuid())
  code String @unique
  name String
}

model UnitOfMeasure {
  id   String @id @default(uuid())
  key  String @unique
  name String
}
```

---

## 11. Legacy retirement

| Legacy model | Replacement |
|--------------|-------------|
| `Manufacturer` | `Organization` + type + `OrganizationProfile` |
| `Product` | `Medicine` / `Variant` / `PackageDefinition` + `Batch` |
| `ProductUnit` | `PackagingInstance` + `TrackableUnit` |
| `Role` / `UserRole` | Platform + Organization RBAC tables |
| `AuditLog` (unit-only) | General `AuditLog` + `ScanEvent` |

Step 1 may keep old schema temporarily behind a feature flag **or** start a clean Postgres schema and migrate data later. Recommendation: **clean schema on Postgres** for Healthcare OS; archive SQLite `dev.db` as prototype data.
