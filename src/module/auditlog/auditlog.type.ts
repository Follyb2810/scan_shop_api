import { AuditLog } from "@prisma/client";

export type TAuditLogID = AuditLog["id"];

export type TAuditLogLookup = {
  productUnitId: string;
  userId?: string;
};

export type TAuditLogUpdateFields = Partial<
  Pick<
    AuditLog,
    | "notes"
    | "metadata"
    | "ipAddress"
    | "userAgent"
    | "latitude"
    | "longitude"
    | "city"
    | "country"
    | "oldStatus"
    | "newStatus"
    | "isFirstScan"
  >
>;

export type TAuditLogUpdate = TAuditLogLookup & TAuditLogUpdateFields;

export type TAuditLogCreate = TAuditLogLookup & {
  action: string;
};
