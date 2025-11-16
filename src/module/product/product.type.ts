import { Product } from "@prisma/client";

export type TProductID = Product["id"];

export type TProductCreate = Omit<
  Product,
  | "id"
  | "createdAt"
  | "updatedAt"
  | "manufacturer"
  | "units"
>;

export type TProductUpdate = Partial<TProductCreate>;
