generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  // url      = env("DATABASE_URL")
}

model User {
  id          String   @id @default(uuid())
  email       String   @unique
  password    String
  firstName   String
  lastName    String
  phoneNumber String?
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  manufacturer Manufacturer?
  auditLogs    AuditLog[]
  userRoles    UserRole[]

  @@index([email])
}

model Role {
  id    String     @id @default(uuid())
  name  String     @unique
  users UserRole[]
}

model UserRole {
  userId String
  roleId String

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  role Role @relation(fields: [roleId], references: [id], onDelete: Cascade)

  @@id([userId, roleId])
}

model Manufacturer {
  id     String @id @default(uuid())
  userId String @unique

  companyName  String
  companyEmail String  @unique
  companyPhone String
  website      String?

  address    String
  city       String
  state      String
  country    String
  postalCode String?

  licenseNumber      String  @unique
  registrationNumber String?
  taxId              String?
  nafdacNumber       String?
  sonCertification   String?

  businessType        String?
  yearsInBusiness     Int?
  supportingDocuments String?

  verificationStatus String    @default("PENDING") // Use enum later
  verificationNotes  String?
  applicationDate    DateTime  @default(now())
  reviewedAt         DateTime?
  reviewedBy         String?
  isVerified         Boolean   @default(false)
  verifiedAt         DateTime?

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  user         User          @relation(fields: [userId], references: [id], onDelete: Cascade)
  products     Product[]
  productUnits ProductUnit[]

  @@index([verificationStatus])
  @@index([isVerified])
}

model Product {
  id             String @id @default(uuid())
  manufacturerId String

  name        String
  description String?
  category    String
  sku         String  @unique
  imageUrl    String?

  weight      String?
  dimensions  String?
  ingredients String?

  batchNumber     String
  manufactureDate DateTime
  expiryDate      DateTime?

  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  manufacturer Manufacturer  @relation(fields: [manufacturerId], references: [id], onDelete: Cascade)
  units        ProductUnit[]

  @@index([manufacturerId])
  @@index([sku])
  @@index([batchNumber])
  @@index([category])
}

model ProductUnit {
  id        String @id @default(uuid())
  productId String

  manufacturerId String
  manufacturer   Manufacturer @relation(fields: [manufacturerId], references: [id])

  barcode    String  @unique
  unitNumber Int
  qrCodeData String?
  signature  String?

  status      String  @default("ACTIVE") // Use enum later
  isAuthentic Boolean @default(true)

  firstScannedAt DateTime?
  firstScannedBy String?
  scannedCount   Int       @default(0)
  lastScannedAt  DateTime?

  currentOwnerId String?
  soldAt         DateTime?
  soldTo         String?

  lastLatitude  Float?
  lastLongitude Float?
  geoAccuracy   Float?
  lastCity      String?
  lastCountry   String?

  reportedCount   Int     @default(0)
  isSuspicious    Boolean @default(false)
  suspiciousNotes String?

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  product   Product    @relation(fields: [productId], references: [id], onDelete: Cascade)
  auditLogs AuditLog[] 

  @@unique([productId, unitNumber])
  @@index([barcode])
  @@index([productId])
  @@index([status])
  @@index([firstScannedAt])
}

model AuditLog {
  id String @id @default(uuid())

  productUnitId String

  userId    String?
  ipAddress String?
  userAgent String?

  action      String // Use enum later
  isFirstScan Boolean @default(false)

  latitude  Float?
  longitude Float?
  city      String?
  country   String?

  metadata String?
  notes    String?

  oldStatus String?
  newStatus String?

  timestamp DateTime @default(now())

  productUnit ProductUnit @relation(fields: [productUnitId], references: [id], onDelete: Cascade)
  user        User?       @relation(fields: [userId], references: [id], onDelete: SetNull)

  @@index([productUnitId])
  @@index([userId])
  @@index([action])
  @@index([timestamp])
}

// enum Role {
//   ADMIN
//   MODERATOR
//   MANUFACTURER
//   USER
// }

// enum VerificationStatus {
//   PENDING
//   UNDER_REVIEW
//   APPROVED
//   REJECTED
//   SUSPENDED
// }

// enum ProductUnitStatus {
//   ACTIVE
//   SOLD
//   USED
//   RECALLED
//   EXPIRED
//   REPORTED
// }

// enum AuditAction {
//   UNIT_CREATED
//   FIRST_SCAN
//   SUBSEQUENT_SCAN
//   MARKED_SOLD
//   MARKED_USED
//   STATUS_CHANGED
//   REPORTED_SUSPICIOUS
//   LOCATION_TRACKED
// }

