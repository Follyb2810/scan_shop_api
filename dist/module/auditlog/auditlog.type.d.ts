import { ProductUnitAuditLog, Prisma } from "../../generated/prisma/client";
export type TAuditLogID = ProductUnitAuditLog["id"];
export type TAuditLogLookup = {
    productUnitId: string;
    userId?: string;
};
export type TAuditLogUpdateFields = Partial<Pick<ProductUnitAuditLog, "notes" | "metadata" | "ipAddress" | "userAgent" | "latitude" | "longitude" | "city" | "country" | "oldStatus" | "newStatus" | "isFirstScan">>;
export type TAuditLogUpdate = TAuditLogLookup & TAuditLogUpdateFields;
export type TAuditLogCreate = TAuditLogLookup & {
    action: string;
    notes?: string;
    metadata?: string;
    isFirstScan?: boolean;
    latitude?: number;
    longitude?: number;
    city?: string;
    country?: string;
    ipAddress?: string;
    userAgent?: string;
};
export type AuditLogWithResponse = Prisma.ProductUnitAuditLogGetPayload<{
    include: {
        productUnit: true;
        user: true;
    };
}>;
//# sourceMappingURL=auditlog.type.d.ts.map