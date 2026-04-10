import { Prisma, Product } from "../../generated/prisma/client";

export type TProductID = Product["id"];

export type TProductCreate = Omit<
  Product,
  "id" | "createdAt" | "updatedAt" | "manufacturer" | "units"
>;

export type TProductUpdate = Partial<TProductCreate>;

export type ProductWithResponse = Prisma.ProductGetPayload<{
  include: {
    manufacturer: { select: { id: true; userId: true } };
  };
}>;
