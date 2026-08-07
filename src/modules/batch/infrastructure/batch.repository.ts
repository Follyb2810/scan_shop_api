import { prisma } from "../../../infrastructure/database";
import { BaseRepository } from "../../../infrastructure/database/base.repository";

const batchInclude = {
  packageDefinition: {
    include: {
      packagingType: true,
      variant: {
        include: {
          dosageForm: true,
          medicine: {
            include: {
              brand: { include: { family: true } },
              category: true,
            },
          },
        },
      },
    },
  },
} as const;

export class BatchRepository extends BaseRepository {
  findPackage(organizationId: string, packageDefinitionId: string) {
    return this.db.packageDefinition.findFirst({
      where: { id: packageDefinitionId, organizationId, deletedAt: null },
    });
  }

  findByBatchNumber(organizationId: string, batchNumber: string) {
    return this.db.batch.findFirst({
      where: { organizationId, batchNumber, deletedAt: null },
    });
  }

  findById(organizationId: string, id: string) {
    return this.db.batch.findFirst({
      where: { id, organizationId, deletedAt: null },
      include: batchInclude,
    });
  }

  list(organizationId: string, filters?: { qaStatus?: string; recallStatus?: string }) {
    return this.db.batch.findMany({
      where: {
        organizationId,
        deletedAt: null,
        qaStatus: filters?.qaStatus,
        recallStatus: filters?.recallStatus,
      },
      include: batchInclude,
      orderBy: { createdAt: "desc" },
    });
  }

  create(data: {
    organizationId: string;
    packageDefinitionId: string;
    batchNumber: string;
    lotNumber?: string | null;
    manufactureDate: Date;
    expiryDate: Date;
    productionQuantity: number;
    currentQuantity: number;
    certificatesJson?: string | null;
    documentsJson?: string | null;
    nafdacRegistration?: string | null;
    notes?: string | null;
  }) {
    return this.db.batch.create({
      data: {
        organizationId: data.organizationId,
        packageDefinitionId: data.packageDefinitionId,
        batchNumber: data.batchNumber,
        lotNumber: data.lotNumber ?? null,
        manufactureDate: data.manufactureDate,
        expiryDate: data.expiryDate,
        productionQuantity: data.productionQuantity,
        currentQuantity: data.currentQuantity,
        certificatesJson: data.certificatesJson ?? null,
        documentsJson: data.documentsJson ?? null,
        nafdacRegistration: data.nafdacRegistration ?? null,
        notes: data.notes ?? null,
        qaStatus: "pending",
        recallStatus: "none",
      },
      include: batchInclude,
    });
  }

  update(
    organizationId: string,
    id: string,
    data: {
      lotNumber?: string | null;
      notes?: string | null;
      nafdacRegistration?: string | null;
      certificatesJson?: string | null;
      documentsJson?: string | null;
      qaStatus?: string;
      recallStatus?: string;
      currentQuantity?: number;
    }
  ) {
    return this.db.batch.updateMany({
      where: { id, organizationId, deletedAt: null },
      data,
    });
  }
}

export const batchRepository = new BatchRepository(prisma);
