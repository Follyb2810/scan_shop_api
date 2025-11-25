// import { Manufacturer } from "@prisma/client";

import { Manufacturer } from "../../generated/prisma/client";

export type TManufacturerID = Manufacturer["id"];

export type TManufacturerCreate = Omit<
  Manufacturer,
  | "id"
  | "userId"
  | "createdAt"
  | "updatedAt"
  | "verificationStatus"
  | "isVerified"
  | "reviewedAt"
  | "reviewedBy"
  | "applicationDate"
>;

export type TManufacturerUpdate = Partial<TManufacturerCreate>;
