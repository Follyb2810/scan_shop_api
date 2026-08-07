import { randomUUID } from "crypto";
import {
  ConflictError,
  NotFoundError,
  TenantIsolationError,
  ValidationError,
} from "../../../shared/errors";
import { env } from "../../../config/env";
import {
  buildSignedPayload,
  parsePayload,
  verifySignature,
} from "../domain/qr-payload";
import {
  verificationRepository,
  VerificationRepository,
} from "../infrastructure/verification.repository";

export type ScanContext = {
  userId?: string | null;
  ipAddress?: string | null;
  userAgent?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  city?: string | null;
  country?: string | null;
};

export class VerificationService {
  constructor(
    private readonly repo: VerificationRepository = verificationRepository
  ) {}

  async generateUnits(
    organizationId: string,
    input: {
      batchId: string;
      packagingLevel: string;
      quantity: number;
    }
  ) {
    const batch = await this.repo.findBatch(organizationId, input.batchId);
    if (!batch) {
      throw new TenantIsolationError("Batch not found in this organization");
    }
    if (batch.qaStatus !== "passed") {
      throw new ValidationError("Batch must pass QA before generating units");
    }
    if (batch.recallStatus === "recalled") {
      throw new ConflictError("Cannot generate units for a recalled batch");
    }

    const packagingLevel = input.packagingLevel.toUpperCase();
    const agg = await this.repo.maxUnitNumber(input.batchId);
    let next = (agg._max.unitNumber ?? 0) + 1;

    const units = [];
    for (let i = 0; i < input.quantity; i++) {
      const unitId = randomUUID();
      const signed = buildSignedPayload({
        organizationId,
        packageDefinitionId: batch.packageDefinitionId,
        batchId: batch.id,
        packagingLevel,
        unitId,
      });

      const unit = await this.repo.createSignedUnit({
        id: unitId,
        organizationId,
        batchId: batch.id,
        packageDefinitionId: batch.packageDefinitionId,
        packagingLevel,
        unitNumber: next++,
        qrPayload: signed.payload,
        signature: signed.signature,
        keyId: env.HMAC_KEY_ID,
      });

      units.push({
        id: unit.id,
        unitNumber: unit.unitNumber,
        packagingLevel,
        qrPayload: unit.qrPayload,
        signature: unit.signature,
        keyId: unit.keyId,
        status: unit.status,
      });
    }

    return { batchId: batch.id, count: units.length, units };
  }

  listUnits(
    organizationId: string,
    filters?: { batchId?: string; take?: number }
  ) {
    return this.repo.listUnits(organizationId, filters);
  }

  async getUnit(organizationId: string, unitId: string) {
    const unit = await this.repo.findUnitInOrg(organizationId, unitId);
    if (!unit) throw new NotFoundError("Trackable unit not found");
    return unit;
  }

  listUnitScans(organizationId: string, unitId: string) {
    return this.repo.listScansForUnit(organizationId, unitId);
  }

  listMyScans(userId: string) {
    return this.repo.listScansForUser(userId);
  }

  /**
   * Signature-only check (no scan event recorded).
   */
  verifyPayload(payload: string) {
    const fields = parsePayload(payload);
    if (!fields) {
      return {
        valid: false,
        result: "unknown" as const,
        reasonCodes: ["MALFORMED_PAYLOAD"],
        fields: null,
      };
    }

    if (fields.v !== "1") {
      return {
        valid: false,
        result: "unknown" as const,
        reasonCodes: ["UNSUPPORTED_VERSION"],
        fields,
      };
    }

    if (fields.pid !== env.PLATFORM_ID) {
      return {
        valid: false,
        result: "forged" as const,
        reasonCodes: ["PLATFORM_MISMATCH"],
        fields,
      };
    }

    if (!verifySignature(fields)) {
      return {
        valid: false,
        result: "forged" as const,
        reasonCodes: ["INVALID_SIGNATURE"],
        fields,
      };
    }

    return {
      valid: true,
      result: "authentic" as const,
      reasonCodes: [] as string[],
      fields,
    };
  }

  /**
   * Full scan: verify signature + business rules + append ScanEvent.
   */
  async scan(payload: string, ctx: ScanContext = {}) {
    const cryptoCheck = this.verifyPayload(payload);
    const fields = cryptoCheck.fields;

    if (!cryptoCheck.valid || !fields) {
      const event = await this.repo.recordScanAndTouchUnit({
        trackableUnitId: fields?.uid ?? null,
        organizationId: fields?.oid ?? null,
        userId: ctx.userId ?? null,
        result: cryptoCheck.result,
        reasonCodes: cryptoCheck.reasonCodes,
        isFirstScan: false,
        payloadSnapshot: payload,
        ipAddress: ctx.ipAddress,
        userAgent: ctx.userAgent,
        latitude: ctx.latitude,
        longitude: ctx.longitude,
        city: ctx.city,
        country: ctx.country,
      });

      return {
        result: cryptoCheck.result,
        reasonCodes: cryptoCheck.reasonCodes,
        isFirstScan: false,
        unit: null,
        batch: null,
        scanEventId: event.id,
      };
    }

    const unit = await this.repo.findUnitById(fields.uid);
    const reasonCodes: string[] = [];
    let result:
      | "authentic"
      | "forged"
      | "recalled"
      | "expired"
      | "suspicious"
      | "unknown"
      | "inactive" = "authentic";

    if (!unit) {
      reasonCodes.push("UNIT_NOT_FOUND");
      result = "unknown";
    } else {
      if (unit.organizationId !== fields.oid) {
        reasonCodes.push("ORG_MISMATCH");
        result = "forged";
      }
      if (unit.batchId !== fields.bid) {
        reasonCodes.push("BATCH_MISMATCH");
        result = "forged";
      }
      if (unit.signature !== fields.sig) {
        reasonCodes.push("STORED_SIGNATURE_MISMATCH");
        result = "forged";
      }
      if (!unit.isAuthentic) {
        reasonCodes.push("MARKED_UNAUTHENTIC");
        result = "forged";
      }
      if (unit.status === "destroyed" || unit.status === "inactive") {
        reasonCodes.push("UNIT_INACTIVE");
        result = "inactive";
      }
      if (unit.isSuspicious || unit.status === "suspicious") {
        reasonCodes.push("UNIT_SUSPICIOUS");
        result = "suspicious";
      }

      const batch = unit.batch;
      if (batch.recallStatus === "recalled") {
        reasonCodes.push("BATCH_RECALLED");
        result = "recalled";
      }
      if (batch.expiryDate.getTime() < Date.now()) {
        reasonCodes.push("BATCH_EXPIRED");
        if (result === "authentic") result = "expired";
      }

      // Multiple prior scans can be OK; flag heavy re-scan as suspicious hint
      if (unit.scannedCount >= 20 && result === "authentic") {
        reasonCodes.push("HIGH_SCAN_COUNT");
        result = "suspicious";
      }
    }

    const isFirstScan = !!unit && !unit.firstScannedAt && result !== "forged";

    const event = await this.repo.recordScanAndTouchUnit({
      trackableUnitId: unit?.id ?? fields.uid,
      organizationId: unit?.organizationId ?? fields.oid,
      userId: ctx.userId ?? null,
      result,
      reasonCodes,
      isFirstScan,
      payloadSnapshot: payload,
      ipAddress: ctx.ipAddress,
      userAgent: ctx.userAgent,
      latitude: ctx.latitude,
      longitude: ctx.longitude,
      city: ctx.city,
      country: ctx.country,
    });

    const refreshed = unit ? await this.repo.findUnitById(unit.id) : null;

    return {
      result,
      reasonCodes,
      isFirstScan,
      unit: refreshed
        ? {
            id: refreshed.id,
            unitNumber: refreshed.unitNumber,
            status: refreshed.status,
            isAuthentic: refreshed.isAuthentic,
            scannedCount: refreshed.scannedCount,
            firstScannedAt: refreshed.firstScannedAt,
            organizationId: refreshed.organizationId,
            packagingLevel: refreshed.packagingInstance.level,
          }
        : null,
      batch: refreshed
        ? {
            id: refreshed.batch.id,
            batchNumber: refreshed.batch.batchNumber,
            expiryDate: refreshed.batch.expiryDate,
            qaStatus: refreshed.batch.qaStatus,
            recallStatus: refreshed.batch.recallStatus,
            productName:
              refreshed.batch.packageDefinition?.variant?.medicine?.name ?? null,
          }
        : null,
      scanEventId: event.id,
    };
  }
}

export const verificationService = new VerificationService();
