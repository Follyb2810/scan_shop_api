import { Manufacturer, Prisma } from "../../generated/prisma/client";
export type TManufacturerID = Manufacturer["id"];
export type TManufacturerCreate = Omit<Manufacturer, "id" | "userId" | "createdAt" | "updatedAt" | "verificationStatus" | "isVerified" | "reviewedAt" | "reviewedBy" | "applicationDate">;
export type TManufacturerUpdate = Partial<TManufacturerCreate>;
export type ManufacturerWithResponse = Prisma.ManufacturerGetPayload<{
    include: {
        user: {
            select: {
                id: true;
                email: true;
            };
        };
        products: true;
        productUnits: true;
    };
}>;
//# sourceMappingURL=manufacturer.type.d.ts.map