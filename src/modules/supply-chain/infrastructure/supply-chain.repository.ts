import { prisma } from "../../../infrastructure/database";
import { BaseRepository } from "../../../infrastructure/database/base.repository";

const transferInclude = {
  lines: {
    include: {
      batch: {
        select: {
          id: true,
          batchNumber: true,
          organizationId: true,
          expiryDate: true,
          recallStatus: true,
          qaStatus: true,
        },
      },
    },
  },
  fromOrganization: { select: { id: true, name: true, slug: true } },
  toOrganization: { select: { id: true, name: true, slug: true } },
} as const;

export class SupplyChainRepository extends BaseRepository {
  findOrg(id: string) {
    return this.db.organization.findFirst({
      where: { id, deletedAt: null },
    });
  }

  findWarehouse(organizationId: string, warehouseId: string) {
    return this.db.warehouse.findFirst({
      where: { id: warehouseId, organizationId, deletedAt: null },
    });
  }

  findBatch(batchId: string) {
    return this.db.batch.findFirst({
      where: { id: batchId, deletedAt: null },
    });
  }

  create(data: {
    fromOrganizationId: string;
    toOrganizationId: string;
    fromWarehouseId: string;
    notes?: string | null;
    documentsJson?: string | null;
    createdByUserId?: string | null;
    lines: Array<{
      batchId: string;
      packagingLevel: string;
      quantity: number;
    }>;
  }) {
    return this.db.custodyTransfer.create({
      data: {
        fromOrganizationId: data.fromOrganizationId,
        toOrganizationId: data.toOrganizationId,
        fromWarehouseId: data.fromWarehouseId,
        notes: data.notes ?? null,
        documentsJson: data.documentsJson ?? null,
        createdByUserId: data.createdByUserId ?? null,
        status: "draft",
        lines: {
          create: data.lines.map((l) => ({
            batchId: l.batchId,
            packagingLevel: l.packagingLevel,
            quantity: l.quantity,
          })),
        },
      },
      include: transferInclude,
    });
  }

  findById(id: string) {
    return this.db.custodyTransfer.findUnique({
      where: { id },
      include: transferInclude,
    });
  }

  listForOrg(organizationId: string, filters?: { status?: string; direction?: "sent" | "received" }) {
    const where =
      filters?.direction === "sent"
        ? { fromOrganizationId: organizationId }
        : filters?.direction === "received"
          ? { toOrganizationId: organizationId }
          : {
              OR: [
                { fromOrganizationId: organizationId },
                { toOrganizationId: organizationId },
              ],
            };

    return this.db.custodyTransfer.findMany({
      where: {
        ...where,
        status: filters?.status,
      },
      include: transferInclude,
      orderBy: { createdAt: "desc" },
      take: 100,
    });
  }

  update(
    id: string,
    data: {
      status?: string;
      toWarehouseId?: string | null;
      notes?: string | null;
      documentsJson?: string | null;
      approvedByUserId?: string | null;
      receivedByUserId?: string | null;
      rejectedByUserId?: string | null;
      rejectReason?: string | null;
      submittedAt?: Date | null;
      approvedAt?: Date | null;
      shippedAt?: Date | null;
      receivedAt?: Date | null;
      rejectedAt?: Date | null;
    }
  ) {
    return this.db.custodyTransfer.update({
      where: { id },
      data,
      include: transferInclude,
    });
  }
}

export const supplyChainRepository = new SupplyChainRepository(prisma);
