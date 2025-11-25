// import prisma from "../../config/prisma-client";
// import { Prisma } from "@prisma/client";
import {
  TAuditLogCreate,
  TAuditLogUpdate,
  TAuditLogUpdateFields,
} from "./auditlog.type";
import { prisma } from "../../config/prisma-client";
import { AuditLog, Prisma } from "../../generated/prisma/client";

// (property) AppointmentRepository.db: PrismaClient<{
//     adapter: PrismaPg;
// }, never, DefaultArgs>

export class AuditLogRepository {
  private readonly db = prisma;

  async create(data: TAuditLogCreate): Promise<AuditLog> {
    const { productUnitId, userId, action, ...rest } = data;

    const payload: Prisma.AuditLogCreateInput = {
      action,
      productUnit: { connect: { id: productUnitId } },
      user: userId ? { connect: { id: userId } } : undefined,
      ...rest,
    };

    return this.db.auditLog.create({
      data: payload,
      include: {
        user: true,
        productUnit: true,
      },
    });
  }

  async getByProductUnit(productUnitId: string): Promise<AuditLog[]> {
    return this.db.auditLog.findMany({
      where: { productUnitId },
      orderBy: { timestamp: "desc" },
      include: { user: true },
    });
  }

  async getLogsForUnit(unitId: string): Promise<AuditLog[]> {
    return this.getByProductUnit(unitId);
  }

  async getByUser(userId: string): Promise<AuditLog[]> {
    return this.db.auditLog.findMany({
      where: { userId },
      orderBy: { timestamp: "desc" },
      include: { productUnit: true },
    });
  }

  async getAll(): Promise<AuditLog[]> {
    return this.db.auditLog.findMany({
      orderBy: { timestamp: "desc" },
      include: { user: true, productUnit: true },
    });
  }

  // async update(data: TAuditLogUpdate): Promise<AuditLog> {
  //   const { productUnitId, userId, ...rest } = data;

  //   const auditLog = await this.db.auditLog.findFirst({
  //     where: { productUnitId, userId },
  //   });

  //   if (!auditLog) throw new Error("Audit log not found");

  //   return this.db.auditLog.update({
  //     where: { id: auditLog.id },
  //     data: rest,
  //     include: { user: true, productUnit: true },
  //   });
  // }

  async update(id: string, data: TAuditLogUpdateFields): Promise<AuditLog> {
    return this.db.auditLog.update({
      where: { id },
      data,
      include: { user: true, productUnit: true },
    });
  }

  async delete(id: string): Promise<AuditLog> {
    return this.db.auditLog.delete({ where: { id } });
  }
}
