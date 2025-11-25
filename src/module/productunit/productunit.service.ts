import crypto from "crypto";
import { ProductRepository } from "../product/product.repository";
import { ManufacturerRepository } from "../manufacturer/manufacturer.repository";
import { ProductUnitRepository } from "./productunit.repository";
import { AuditLogRepository } from "../auditlog/auditlog.repository";
import { TProductUnitCreate, TProductUnitUpdate } from "./productunit.type";

export class ProductUnitService {
  private readonly productUnitRepo = new ProductUnitRepository();
  private readonly productRepo = new ProductRepository();
  private readonly manufacturerRepo = new ManufacturerRepository();
  private readonly auditRepo = new AuditLogRepository();

  private generateBarcode() {
    return "BC-" + crypto.randomUUID();
  }

  private generateSignature(productId: string, unitNumber: number) {
    return crypto
      .createHash("sha256")
      .update(productId + "-" + unitNumber)
      .digest("hex");
  }

  async create(userId: string, data: TProductUnitCreate) {
    const product = await this.productRepo.getById(data.productId);
    if (!product) throw new Error("Product not found.");

    const manufacturer = await this.manufacturerRepo.getByUserId(userId);
    if (!manufacturer || manufacturer.id !== product.manufacturerId) {
      throw new Error("Unauthorized to create units for this product.");
    }
    if (!manufacturer.isVerified) {
      throw new Error("Manufacturer account is not verified.");
    }

    const unitNumber =
      (await this.productUnitRepo.countByProduct(product.id)) + 1;
    const barcode = this.generateBarcode();
    const signature = this.generateSignature(product.id, unitNumber);

    const unit = await this.productUnitRepo.create({
      ...data,
      unitNumber,
      barcode,
      signature,
      status: "ACTIVE",
      isAuthentic: true,
    });

    await this.auditRepo.create({
      productUnitId: unit.id,
      userId,
      action: "UNIT_CREATED",
      notes: "Product unit created",
      metadata: JSON.stringify({ barcode, signature, unitNumber }),
      isFirstScan: false,
    });

    return unit;
  }

  async getById(id: string) {
    return this.productUnitRepo.getById(id);
  }

  async getByProduct(productId: string) {
    return this.productUnitRepo.getByProduct(productId);
  }

  async update(id: string, data: TProductUnitUpdate) {
    return this.productUnitRepo.update(id, data);
  }

  async delete(id: string, userId?: string) {
    const unit = await this.productUnitRepo.getById(id);
    if (!unit) throw new Error("Product unit not found.");

    await this.auditRepo.create({
      productUnitId: id,
      userId,
      action: "UNIT_DELETED",
      notes: "Product unit deleted",
      metadata: JSON.stringify({
        barcode: unit.barcode,
        unitNumber: unit.unitNumber,
      }),
      isFirstScan: false,
    });

    return this.productUnitRepo.delete(id);
  }

  async scan(
    id: string,
    data: {
      userId?: string;
      latitude?: number;
      longitude?: number;
      city?: string;
      country?: string;
      ipAddress?: string;
      userAgent?: string;
    }
  ) {
    const unit = await this.productUnitRepo.getById(id);
    if (!unit) throw new Error("Product unit not found.");

    const isFirstScan = (unit.scannedCount || 0) === 0;
    const scannedCount = (unit.scannedCount || 0) + 1;

    const updatedUnit = await this.productUnitRepo.update(id, {
      scannedCount,
      lastScannedAt: new Date(),
      firstScannedAt: isFirstScan ? new Date() : unit.firstScannedAt,
      lastLatitude: data.latitude,
      lastLongitude: data.longitude,
      lastCity: data.city,
      lastCountry: data.country,
    });

    await this.auditRepo.create({
      productUnitId: id,
      userId: data.userId,
      action: isFirstScan ? "FIRST_SCAN" : "SUBSEQUENT_SCAN",
      isFirstScan,
      latitude: data.latitude,
      longitude: data.longitude,
      city: data.city,
      country: data.country,
      ipAddress: data.ipAddress,
      userAgent: data.userAgent,
      metadata: JSON.stringify({
        scanType: isFirstScan ? "first_scan" : "subsequent_scan",
        timestamp: new Date().toISOString(),
        scannedCount,
      }),
      notes: isFirstScan ? "First time scan" : "Duplicate scan detected",
    });

    return {
      message: isFirstScan ? "Authentic product" : "Duplicate scan detected",
      isFirstScan,
      unit: updatedUnit,
    };
  }

  async markAsSold(
    id: string,
    data: {
      soldTo: string;
      soldBy?: string;
      notes?: string;
    }
  ) {
    const updatedUnit = await this.productUnitRepo.update(id, {
      status: "SOLD",
      soldAt: new Date(),
      soldTo: data.soldTo,
      currentOwnerId: data.soldTo,
    });

    await this.auditRepo.create({
      productUnitId: id,
      userId: data.soldBy,
      action: "MARKED_SOLD",
      notes: data.notes || "Product unit marked as sold",
      metadata: JSON.stringify({
        soldTo: data.soldTo,
        soldAt: new Date().toISOString(),
      }),
      isFirstScan: false,
    });

    return updatedUnit;
  }

  async reportSuspicious(
    id: string,
    data: {
      reportedBy?: string;
      notes: string;
      latitude?: number;
      longitude?: number;
      city?: string;
      country?: string;
    }
  ) {
    const unit = await this.productUnitRepo.getById(id);
    if (!unit) throw new Error("Product unit not found.");

    const reportedCount = (unit.reportedCount || 0) + 1;

    const updatedUnit = await this.productUnitRepo.update(id, {
      isSuspicious: true,
      suspiciousNotes: data.notes,
      reportedCount,
      lastLatitude: data.latitude,
      lastLongitude: data.longitude,
      lastCity: data.city,
      lastCountry: data.country,
    });

    await this.auditRepo.create({
      productUnitId: id,
      userId: data.reportedBy,
      action: "REPORTED_SUSPICIOUS",
      notes: data.notes,
      latitude: data.latitude,
      longitude: data.longitude,
      city: data.city,
      country: data.country,
      metadata: JSON.stringify({
        reportReason: data.notes,
        reportedAt: new Date().toISOString(),
        reportedCount,
      }),
      isFirstScan: false,
    });

    return updatedUnit;
  }
}

export const productUnitService = new ProductUnitService();
