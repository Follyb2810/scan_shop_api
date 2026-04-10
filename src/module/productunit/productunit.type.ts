import { Prisma, ProductUnit } from "../../generated/prisma/client";

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

export type TProductUnitCreate = TProductUnitCreateRequired &
  TProductUnitCreateOptional;

export type TProductUnitUpdate = Partial<TProductUnitCreate>;
export type ProductWithResponse = Prisma.ProductUnitGetPayload<{
  include: {
    manufacturer: { select: { id: true; userId: true } };
    product: { select: { id: true } };
  };
}>;
