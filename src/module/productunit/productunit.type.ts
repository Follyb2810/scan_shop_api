import { ProductUnit } from "../../generated/prisma/client";

export type TProductUnitID = ProductUnit["id"];

// Required fields for creating a unit
export type TProductUnitCreateRequired = {
  productId: string;
  manufacturerId: string;
  barcode: string;
  unitNumber: number;
  signature: string;
};

// Optional fields for creation
export type TProductUnitCreateOptional = {
  qrCodeData?: string;
  status?: string;
  isAuthentic?: boolean;
  currentOwnerId?: string;
  firstScannedAt: Date | null;
  firstScannedBy?: string;
  lastScannedAt?: Date;
  lastLatitude?: number;
  lastLongitude?: number;
  lastCity?: string;
  lastCountry?: string;
  reportedCount?: number;
  isSuspicious?: boolean;
  suspiciousNotes?: string;
  soldAt?: Date;
  soldTo?: string;
  scannedCount?: number;
};

// Full type for create
export type TProductUnitCreate = TProductUnitCreateRequired &
  TProductUnitCreateOptional;

// For update: all fields optional
export type TProductUnitUpdate = Partial<TProductUnitCreate>;
