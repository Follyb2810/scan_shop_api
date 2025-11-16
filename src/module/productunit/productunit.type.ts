import { ProductUnit } from "@prisma/client";

export type TProductUnitID = ProductUnit["id"];

export type TProductUnitCreate = {
  productId: string;
  batchNumber?: string;
  manufactureDate?: Date;
  expiryDate?: Date;
  metadata?: string | null;
};

export type TProductUnitUpdate = Partial<TProductUnitCreate>;
