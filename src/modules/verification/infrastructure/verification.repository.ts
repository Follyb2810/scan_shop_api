import { prisma } from "../../../infrastructure/database";
import { BaseRepository } from "../../../infrastructure/database/base.repository";

const unitInclude = {
  packagingInstance: true,
  batch: {
    include: {
      packageDefinition: {
        include: {
          variant: {
            include: {
              medicine: {
                include: { brand: true, category: true },
              },
              dosageForm: true,
            },
          },
          packagingType: true,
        },
      },
    },
  },
} as const;

export class VerificationRepository extends BaseRepository {
  findBatch(organizationId: string, batchId: string) {
    return this.db.batch.findFirst({
      where: { id: batchId, organizationId, deletedAt: null },
      include: {
        packageDefinition: true,
      },
    });
  }

  maxUnitNumber(batchId: string) {
    return this.db.trackableUnit.aggregate({
      where: { batchId },
      _max: { unitNumber: true },
    });
  }

  async createSignedUnit(data: {
    id: string;
    organizationId: string;
    batchId: string;
    packageDefinitionId: string | null;
    packagingLevel: string;
    unitNumber: number;
    qrPayload: string;
    signature: string;
    keyId: string;
  }) {
    const pack = await this.db.packagingInstance.create({
      data: {
        batchId: data.batchId,
        level: data.packagingLevel,
        serial: String(data.unitNumber),
        barcode: data.id,
      },
    });

    return this.db.trackableUnit.create({
      data: {
        id: data.id,
        organizationId: data.organizationId,
        batchId: data.batchId,
        packageDefinitionId: data.packageDefinitionId,
        packagingInstanceId: pack.id,
        unitNumber: data.unitNumber,
        qrPayload: data.qrPayload,
        signature: data.signature,
        keyId: data.keyId,
        status: "active",
        isAuthentic: true,
        currentOrganizationId: data.organizationId,
      },
      include: unitInclude,
    });
  }

  findUnitById(id: string) {
    return this.db.trackableUnit.findUnique({
      where: { id },
      include: unitInclude,
    });
  }

  findUnitInOrg(organizationId: string, id: string) {
    return this.db.trackableUnit.findFirst({
      where: { id, organizationId },
      include: unitInclude,
    });
  }

  listUnits(organizationId: string, filters?: { batchId?: string; take?: number }) {
    return this.db.trackableUnit.findMany({
      where: {
        organizationId,
        batchId: filters?.batchId,
      },
      include: unitInclude,
      orderBy: { createdAt: "desc" },
      take: filters?.take ?? 100,
    });
  }

  listScansForUser(userId: string, take = 50) {
    return this.db.scanEvent.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take,
      include: {
        trackableUnit: {
          select: {
            id: true,
            unitNumber: true,
            batchId: true,
            organizationId: true,
            status: true,
          },
        },
      },
    });
  }

  listScansForUnit(organizationId: string, unitId: string) {
    return this.db.scanEvent.findMany({
      where: {
        trackableUnitId: unitId,
        organizationId,
      },
      orderBy: { createdAt: "desc" },
      take: 100,
    });
  }

  async recordScanAndTouchUnit(data: {
    trackableUnitId: string | null;
    organizationId: string | null;
    userId: string | null;
    result: string;
    reasonCodes: string[];
    isFirstScan: boolean;
    payloadSnapshot: string;
    ipAddress?: string | null;
    userAgent?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    city?: string | null;
    country?: string | null;
  }) {
    const event = await this.db.scanEvent.create({
      data: {
        trackableUnitId: data.trackableUnitId,
        organizationId: data.organizationId,
        userId: data.userId,
        result: data.result,
        reasonCodes: data.reasonCodes.join(","),
        isFirstScan: data.isFirstScan,
        payloadSnapshot: data.payloadSnapshot,
        ipAddress: data.ipAddress ?? null,
        userAgent: data.userAgent ?? null,
        latitude: data.latitude ?? null,
        longitude: data.longitude ?? null,
        city: data.city ?? null,
        country: data.country ?? null,
      },
    });

    if (data.trackableUnitId && data.result !== "forged" && data.result !== "unknown") {
      const now = new Date();
      await this.db.trackableUnit.update({
        where: { id: data.trackableUnitId },
        data: {
          scannedCount: { increment: 1 },
          lastScannedAt: now,
          ...(data.isFirstScan ? { firstScannedAt: now } : {}),
          ...(data.result === "suspicious"
            ? { isSuspicious: true, status: "suspicious" }
            : {}),
        },
      });
    }

    return event;
  }
}

export const verificationRepository = new VerificationRepository(prisma);
