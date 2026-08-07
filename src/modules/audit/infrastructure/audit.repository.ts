import { prisma } from "../../../infrastructure/database";
import { BaseRepository } from "../../../infrastructure/database/base.repository";

function toJson(value: unknown): string | null {
  if (value === undefined || value === null) return null;
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

export class AuditRepository extends BaseRepository {
  create(data: {
    action: string;
    actorUserId?: string | null;
    organizationId?: string | null;
    branchId?: string | null;
    warehouseId?: string | null;
    entityType?: string | null;
    entityId?: string | null;
    oldValue?: unknown;
    newValue?: unknown;
    ipAddress?: string | null;
    userAgent?: string | null;
    city?: string | null;
    country?: string | null;
    requestId?: string | null;
    metadata?: Record<string, unknown> | null;
  }) {
    return this.db.auditLog.create({
      data: {
        action: data.action,
        actorUserId: data.actorUserId ?? null,
        organizationId: data.organizationId ?? null,
        branchId: data.branchId ?? null,
        warehouseId: data.warehouseId ?? null,
        entityType: data.entityType ?? null,
        entityId: data.entityId ?? null,
        oldValueJson: toJson(data.oldValue),
        newValueJson: toJson(data.newValue),
        ipAddress: data.ipAddress ?? null,
        userAgent: data.userAgent ?? null,
        city: data.city ?? null,
        country: data.country ?? null,
        requestId: data.requestId ?? null,
        metadataJson: toJson(data.metadata),
      },
    });
  }

  findById(id: string) {
    return this.db.auditLog.findUnique({ where: { id } });
  }

  list(filters: {
    organizationId?: string;
    actorUserId?: string;
    action?: string;
    entityType?: string;
    entityId?: string;
    from?: Date;
    to?: Date;
    take?: number;
    skip?: number;
  }) {
    return this.db.auditLog.findMany({
      where: {
        organizationId: filters.organizationId,
        actorUserId: filters.actorUserId,
        action: filters.action,
        entityType: filters.entityType,
        entityId: filters.entityId,
        createdAt:
          filters.from || filters.to
            ? {
                gte: filters.from,
                lte: filters.to,
              }
            : undefined,
      },
      orderBy: { createdAt: "desc" },
      take: filters.take ?? 50,
      skip: filters.skip ?? 0,
    });
  }
}

export const auditRepository = new AuditRepository(prisma);
