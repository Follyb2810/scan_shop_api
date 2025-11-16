import { AuditLog } from "@prisma/client";

export type TAuditLogID = AuditLog["id"];

export type TAuditLogCreate = Omit<
  AuditLog,
  | "id"
  | "timestamp"
  | "user"
  | "productUnit"
  | "createdAt"
  | "updatedAt"
>;

export type TAuditLogUpdate = Partial<TAuditLogCreate>;
