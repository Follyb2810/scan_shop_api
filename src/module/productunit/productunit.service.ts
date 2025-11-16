import crypto from "crypto";
import { ProductRepository } from "../product/product.repository";
import { ManufacturerRepository } from "../manufacturer/manufacturer.repository";
import { ProductUnitRepository } from "./productunit.repository";
import { AuditLogRepository } from "../auditlog/auditlog.repository";
import { TProductUnitCreate } from "./productunit.type";

export class ProductUnitService {
  private readonly productUnitRepo = new ProductUnitRepository();
  private readonly productRepo = new ProductRepository();
  private readonly manufacturerRepo = new ManufacturerRepository();
  private readonly auditRepo = new AuditLogRepository();

  private generateBarcode() {
    return "BC-" + crypto.randomUUID();
  }

  private generateSignature(productId: string, unit: number) {
    return crypto
      .createHash("sha256")
      .update(productId + "-" + unit)
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

    // Fixed: Use count method instead of getByProduct for counting
    const unitCount = await this.productUnitRepo.countByProduct(product.id);
    const unitNumber = unitCount + 1;

    const barcode = this.generateBarcode();
    const signature = this.generateSignature(product.id, unitNumber);

    const unit = await this.productUnitRepo.create({
      barcode,
      unitNumber,
      manufacturerId: manufacturer.id,
      productId: product.id,
      signature,
      qrCodeData: signature,
      status: "ACTIVE", // Added required field
      isAuthentic: true, // Added required field
    });

    // Fixed audit log creation
    await this.auditRepo.create({
      productUnitId: unit.id,
      userId,
      action: "UNIT_CREATED",
      notes: "Product unit created",
      metadata: JSON.stringify({ barcode, signature, unitNumber }),
      isFirstScan: false, // Added required field
    });

    return unit;
  }

  /**
   * Scan a product unit
   */
  async scan(
    unitId: string,
    data: {
      userId?: string;
      latitude?: number;
      longitude?: number;
      city?: string;
      country?: string;
      ip?: string;
      userAgent?: string;
    }
  ) {
    const unit = await this.productUnitRepo.getById(unitId);
    if (!unit) throw new Error("Product unit not found.");

    const isFirstScan = unit.scannedCount === 0;

    // Update scan metadata
    await this.productUnitRepo.update(unitId, {
      scannedCount: { increment: 1 },
      lastScannedAt: new Date(),
      firstScannedAt: isFirstScan ? new Date() : unit.firstScannedAt,
      lastLatitude: data.latitude,
      lastLongitude: data.longitude,
      lastCity: data.city,
      lastCountry: data.country,
    });

    // Fixed audit log creation for scan
    await this.auditRepo.create({
      productUnitId: unitId,
      userId: data.userId,
      action: isFirstScan ? "FIRST_SCAN" : "SUBSEQUENT_SCAN",
      isFirstScan: isFirstScan,
      latitude: data.latitude,
      longitude: data.longitude,
      city: data.city,
      country: data.country,
      ipAddress: data.ip,
      userAgent: data.userAgent,
      metadata: JSON.stringify({
        scanType: isFirstScan ? "first_scan" : "subsequent_scan",
        timestamp: new Date().toISOString(),
        unitData: {
          scannedCount: unit.scannedCount + 1,
          previousScan: unit.lastScannedAt,
        },
      }),
      notes: isFirstScan ? "First time scan" : "Duplicate scan detected",
    });

    return {
      message: isFirstScan ? "Authentic product" : "Duplicate scan detected",
      isFirstScan,
      unit: {
        id: unit.id,
        barcode: unit.barcode,
        scannedCount: unit.scannedCount + 1,
        isFirstScan,
      },
    };
  }

  /**
   * Get product units by product ID
   */
  async getByProduct(productId: string) {
    return this.productUnitRepo.getByProduct(productId);
  }

  /**
   * Get product unit by ID
   */
  async getById(id: string) {
    return this.productUnitRepo.getById(id);
  }

  /**
   * Update product unit
   */
  async update(id: string, data: any) {
    return this.productUnitRepo.update(id, data);
  }

  /**
   * Delete product unit
   */
  async delete(id: string) {
    const unit = await this.productUnitRepo.getById(id);
    if (!unit) throw new Error("Product unit not found.");

    // Log the deletion
    await this.auditRepo.create({
      productUnitId: id,
      action: "UNIT_DELETED",
      notes: "Product unit deleted from system",
      metadata: JSON.stringify({
        barcode: unit.barcode,
        unitNumber: unit.unitNumber,
        deletedAt: new Date().toISOString(),
      }),
      isFirstScan: false,
    });

    return this.productUnitRepo.delete(id);
  }

  /**
   * Mark product unit as sold
   */
  async markAsSold(
    unitId: string,
    data: {
      soldTo: string;
      soldBy: string;
      notes?: string;
    }
  ) {
    const unit = await this.productUnitRepo.update(unitId, {
      soldAt: new Date(),
      soldTo: data.soldTo,
      status: "SOLD",
      currentOwnerId: data.soldTo,
    });

    await this.auditRepo.create({
      productUnitId: unitId,
      userId: data.soldBy,
      action: "MARKED_SOLD",
      notes: data.notes || "Product unit marked as sold",
      metadata: JSON.stringify({
        soldTo: data.soldTo,
        soldAt: new Date().toISOString(),
      }),
      isFirstScan: false,
    });

    return unit;
  }

  /**
   * Report product unit as suspicious
   */
  async reportSuspicious(
    unitId: string,
    data: {
      reportedBy: string;
      notes: string;
      latitude?: number;
      longitude?: number;
      city?: string;
      country?: string;
    }
  ) {
    const unit = await this.productUnitRepo.update(unitId, {
      isSuspicious: true,
      suspiciousNotes: data.notes,
      reportedCount: { increment: 1 },
      lastLatitude: data.latitude,
      lastLongitude: data.longitude,
      lastCity: data.city,
      lastCountry: data.country,
    });

    await this.auditRepo.create({
      productUnitId: unitId,
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
      }),
      isFirstScan: false,
    });

    return unit;
  }
}
// import crypto from "crypto";
// import { ProductRepository } from "../product/product.repository";
// import { ManufacturerRepository } from "../manufacturer/manufacturer.repository";
// import { ProductUnitRepository } from "./productunit.repository";
// import { AuditLogRepository } from "../auditlog/auditlog.repository";
// import { TProductUnitCreate } from "./productunit.type";

// export class ProductUnitService {
//   private readonly productUnitRepo = new ProductUnitRepository();
//   private readonly productRepo = new ProductRepository();
//   private readonly manufacturerRepo = new ManufacturerRepository();
//   private readonly auditRepo = new AuditLogRepository();

//   private generateBarcode() {
//     return "BC-" + crypto.randomUUID();
//   }

//   private generateSignature(productId: string, unit: number) {
//     return crypto
//       .createHash("sha256")
//       .update(productId + "-" + unit)
//       .digest("hex");
//   }

//   async create(userId: string, data: TProductUnitCreate) {
//     const product = await this.productRepo.getById(data.productId);
//     if (!product) throw new Error("Product not found.");

//     const manufacturer = await this.manufacturerRepo.getByUserId(userId);

//     if (!manufacturer || manufacturer.id !== product.manufacturerId) {
//       throw new Error("Unauthorized to create units for this product.");
//     }

//     if (!manufacturer.isVerified) {
//       throw new Error("Manufacturer account is not verified.");
//     }

//     const count = await this.productUnitRepo.getByProduct(product.id);
//     const unitNumber = count.length + 1;

//     const barcode = this.generateBarcode();
//     const signature = this.generateSignature(product.id, unitNumber);

//     const unit = await this.productUnitRepo.create({
//       barcode,
//       unitNumber,
//       manufacturerId: manufacturer.id,
//       productId: product.id,
//       signature,
//       qrCodeData: signature,
//     });

//     await this.auditRepo.create({
//       // isFirstScan: false,
//       // userId,
//       // // productUnit: unit.id,
//       // // productUnit: { connect: { id: unit.id } },
//       // action: "UNIT_CREATED",
//       // notes: "Product unit created",
//       // metadata: JSON.stringify({ barcode, signature, unitNumber }),
//       productUnitId: unit.id,
//       userId,
//       action: "UNIT_CREATED",
//       notes: "Product unit created",
//       metadata: JSON.stringify({ barcode, signature, unitNumber }),
//     });

//     return unit;
//   }

//   /**
//    * Scan a product unit
//    */
//   async scan(unitId: string, data: any) {
//     const unit = await this.productUnitRepo.getById(unitId);
//     if (!unit) throw new Error("Product unit not found.");

//     const isFirstScan = unit.scannedCount === 0;

//     // Update scan metadata
//     await this.productUnitRepo.update(unitId, {
//       scannedCount: { increment: 1 },
//       lastScannedAt: new Date(),
//       firstScannedAt: isFirstScan ? new Date() : unit.firstScannedAt,
//       lastLatitude: data.latitude,
//       lastLongitude: data.longitude,
//       lastCity: data.city,
//       lastCountry: data.country,
//     });

//     // AUDIT LOG → SCAN
//     await this.auditRepo.create({
//       productUnit: { connect: { id: unitId } },
//       user: data.userId ? { connect: { id: data.userId } } : undefined,
//       action: isFirstScan ? "FIRST_SCAN" : "SUBSEQUENT_SCAN",
//       isFirstScan: isFirstScan,
//       latitude: data.latitude,
//       longitude: data.longitude,
//       city: data.city,
//       country: data.country,

//       ipAddress: data.ip,
//       userAgent: data.userAgent,
//       metadata: JSON.stringify(data),
//       notes: isFirstScan ? "First time scan" : "Duplicate scan detected",
//     });

//     return {
//       message: isFirstScan ? "Authentic product" : "Duplicate scan detected",
//       isFirstScan,
//     };
//   }
// }
