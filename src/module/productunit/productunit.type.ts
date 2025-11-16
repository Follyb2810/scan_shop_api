import { ProductUnit } from "@prisma/client";

export type TProductUnitID = ProductUnit["id"];

export type TProductUnitCreateRequired = {
  productId: string;
  manufacturerId: string;
  barcode: string;
  unitNumber: number;
  signature: string;
};

export type TProductUnitCreateOptional = {
  qrCodeData?: string;
  status?: string;
  isAuthentic?: boolean;
  currentOwnerId?: string;
  firstScannedAt?: Date | null;
  firstScannedBy?: string | null;
  lastScannedAt?: Date | null;
  lastLatitude?: number | null;
  lastLongitude?: number | null;
  lastCity?: string | null;
  lastCountry?: string | null;
  reportedCount?: number;
  isSuspicious?: boolean;
  suspiciousNotes?: string;
  soldAt?: Date | null;
  soldTo?: string | null;
};

export type TProductUnitCreate = TProductUnitCreateRequired &
  TProductUnitCreateOptional;

export type TProductUnitUpdate = Partial<TProductUnitCreate>;
