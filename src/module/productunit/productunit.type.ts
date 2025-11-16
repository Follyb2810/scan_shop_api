import { ProductUnit } from "@prisma/client";

export type TProductUnitID = ProductUnit["id"];

export type TCallParticipantID = ProductUnit["id"];
export type TCallParticipantRead = Omit<ProductUnit, "createdAt" | "updatedAt">;

export type TProductUnitCreate = {
  productId: string;
  manufacturerId: string;
  barcode: string;
  unitNumber: number;
  signature: string;
  qrCodeData?: string;
  status?: string;
  isAuthentic?: boolean;
  currentOwnerId?: string;
};

export type TProductUnitUpdate = Partial<TProductUnitCreate>;
