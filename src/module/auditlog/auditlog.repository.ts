import prisma from "../../config/prisma-client";
import { Prisma, AuditLog } from "@prisma/client";
import { TAuditLogCreate, TAuditLogUpdate } from "./auditlog.type";

export class AuditLogRepository {
  private readonly db = prisma;

  async create(data: TAuditLogCreate): Promise<AuditLog> {
    const { productUnitId, userId } = data;
    const payload: Prisma.AuditLogCreateInput = {
      action: "UNIT_CREATED",
      productUnit: { connect: { id: productUnitId } },
      user: userId ? { connect: { id: userId } } : undefined,
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
