import prisma from "../../config/prisma-client";
import { Prisma, AuditLog } from "@prisma/client";
import { TAuditLogCreate, TAuditLogUpdate } from "./auditlog.type";

export class AuditLogRepository {
  private readonly db = prisma;

  async create(data: TAuditLogCreate): Promise<AuditLog> {
    const payload: Prisma.AuditLogCreateInput = {
      action: data.action,
      metadata: data.metadata,
      notes: data.notes,
      userAgent: data.userAgent,
      ipAddress: data.ipAddress,
      latitude: data.latitude,
      longitude: data.longitude,
      city: data.city,
      country: data.country,
      isFirstScan: data.isFirstScan,
      oldStatus: data.oldStatus,
      newStatus: data.newStatus,
      timestamp: new Date(),

      // Relations
      productUnit: { connect: { id: data.productUnitId } },
      user: data.userId ? { connect: { id: data.userId } } : undefined,
    };

    return this.db.auditLog.create({
      data: payload,
      include: {
        user: true,
        productUnit: true,
      },
    });
  }

  async getByProductUnit(productUnitId: string) {
    return this.db.auditLog.findMany({
      where: { productUnitId },
      orderBy: { timestamp: "desc" },
      include: { user: true },
    });
  }
  async getLogsForUnit(unitId: string) {
    return this.db.auditLog.findMany({
      where: { productUnitId: unitId },
      orderBy: { timestamp: "desc" },
    });
  }

  async getByUser(userId: string) {
    return this.db.auditLog.findMany({
      where: { userId },
      orderBy: { timestamp: "desc" },
      include: { productUnit: true },
    });
  }

  async getAll() {
    return this.db.auditLog.findMany({
      orderBy: { timestamp: "desc" },
      include: { user: true, productUnit: true },
    });
  }

  async update(id: string, data: TAuditLogUpdate) {
    return this.db.auditLog.update({
      where: { id },
      data,
      include: { user: true, productUnit: true },
    });
  }

  async delete(id: string) {
    return this.db.auditLog.delete({ where: { id } });
  }
}
