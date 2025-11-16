-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "role" TEXT NOT NULL DEFAULT 'USER',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Manufacturer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "companyEmail" TEXT NOT NULL,
    "companyPhone" TEXT NOT NULL,
    "website" TEXT,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "postalCode" TEXT,
    "licenseNumber" TEXT NOT NULL,
    "registrationNumber" TEXT,
    "taxId" TEXT,
    "nafdacNumber" TEXT,
    "sonCertification" TEXT,
    "businessType" TEXT,
    "yearsInBusiness" INTEGER,
    "supportingDocuments" TEXT,
    "verificationStatus" TEXT NOT NULL DEFAULT 'PENDING',
    "verificationNotes" TEXT,
    "applicationDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reviewedAt" DATETIME,
    "reviewedBy" TEXT,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "verifiedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Manufacturer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "manufacturerId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "imageUrl" TEXT,
    "weight" TEXT,
    "dimensions" TEXT,
    "ingredients" TEXT,
    "batchNumber" TEXT NOT NULL,
    "manufactureDate" DATETIME NOT NULL,
    "expiryDate" DATETIME,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Product_manufacturerId_fkey" FOREIGN KEY ("manufacturerId") REFERENCES "Manufacturer" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ProductUnit" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "productId" TEXT NOT NULL,
    "manufacturerId" TEXT NOT NULL,
    "barcode" TEXT NOT NULL,
    "unitNumber" INTEGER NOT NULL,
    "qrCodeData" TEXT,
    "signature" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "isAuthentic" BOOLEAN NOT NULL DEFAULT true,
    "firstScannedAt" DATETIME,
    "firstScannedBy" TEXT,
    "scannedCount" INTEGER NOT NULL DEFAULT 0,
    "lastScannedAt" DATETIME,
    "currentOwnerId" TEXT,
    "soldAt" DATETIME,
    "soldTo" TEXT,
    "lastLatitude" REAL,
    "lastLongitude" REAL,
    "geoAccuracy" REAL,
    "lastCity" TEXT,
    "lastCountry" TEXT,
    "reportedCount" INTEGER NOT NULL DEFAULT 0,
    "isSuspicious" BOOLEAN NOT NULL DEFAULT false,
    "suspiciousNotes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ProductUnit_manufacturerId_fkey" FOREIGN KEY ("manufacturerId") REFERENCES "Manufacturer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProductUnit_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "productUnitId" TEXT NOT NULL,
    "userId" TEXT,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "action" TEXT NOT NULL,
    "isFirstScan" BOOLEAN NOT NULL DEFAULT false,
    "latitude" REAL,
    "longitude" REAL,
    "city" TEXT,
    "country" TEXT,
    "metadata" TEXT,
    "notes" TEXT,
    "oldStatus" TEXT,
    "newStatus" TEXT,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AuditLog_productUnitId_fkey" FOREIGN KEY ("productUnitId") REFERENCES "ProductUnit" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "AuditLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_role_idx" ON "User"("role");

-- CreateIndex
CREATE UNIQUE INDEX "Manufacturer_userId_key" ON "Manufacturer"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Manufacturer_companyEmail_key" ON "Manufacturer"("companyEmail");

-- CreateIndex
CREATE UNIQUE INDEX "Manufacturer_licenseNumber_key" ON "Manufacturer"("licenseNumber");

-- CreateIndex
CREATE INDEX "Manufacturer_verificationStatus_idx" ON "Manufacturer"("verificationStatus");

-- CreateIndex
CREATE INDEX "Manufacturer_isVerified_idx" ON "Manufacturer"("isVerified");

-- CreateIndex
CREATE UNIQUE INDEX "Product_sku_key" ON "Product"("sku");

-- CreateIndex
CREATE INDEX "Product_manufacturerId_idx" ON "Product"("manufacturerId");

-- CreateIndex
CREATE INDEX "Product_sku_idx" ON "Product"("sku");

-- CreateIndex
CREATE INDEX "Product_batchNumber_idx" ON "Product"("batchNumber");

-- CreateIndex
CREATE INDEX "Product_category_idx" ON "Product"("category");

-- CreateIndex
CREATE UNIQUE INDEX "ProductUnit_barcode_key" ON "ProductUnit"("barcode");

-- CreateIndex
CREATE INDEX "ProductUnit_barcode_idx" ON "ProductUnit"("barcode");

-- CreateIndex
CREATE INDEX "ProductUnit_productId_idx" ON "ProductUnit"("productId");

-- CreateIndex
CREATE INDEX "ProductUnit_status_idx" ON "ProductUnit"("status");

-- CreateIndex
CREATE INDEX "ProductUnit_firstScannedAt_idx" ON "ProductUnit"("firstScannedAt");

-- CreateIndex
CREATE UNIQUE INDEX "ProductUnit_productId_unitNumber_key" ON "ProductUnit"("productId", "unitNumber");

-- CreateIndex
CREATE INDEX "AuditLog_productUnitId_idx" ON "AuditLog"("productUnitId");

-- CreateIndex
CREATE INDEX "AuditLog_userId_idx" ON "AuditLog"("userId");

-- CreateIndex
CREATE INDEX "AuditLog_action_idx" ON "AuditLog"("action");

-- CreateIndex
CREATE INDEX "AuditLog_timestamp_idx" ON "AuditLog"("timestamp");
