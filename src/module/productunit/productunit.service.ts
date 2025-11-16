import crypto from "crypto";
import { ProductRepository } from "../product/product.repository";
import { ManufacturerRepository } from "../manufacturer/manufacturer.repository";
import { ProductUnitRepository } from "./productunit.repository";
import { AuditLogRepository } from "../auditlog/auditlog.repository";
import { TProductUnitCreate } from "./productunit.type";

export class ProductUnitService {
  private readonly repo = new ProductUnitRepository();
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

    // Get next unit number
    const count = await this.repo.getByProduct(product.id);
    const unitNumber = count.length + 1;

    const barcode = this.generateBarcode();
    const signature = this.generateSignature(product.id, unitNumber);

    const unit = await this.repo.create({
      unitNumber,
      barcode,
      signature,
      qrCodeData: signature,
      product: { connect: { id: product.id } },
      manufacturer: { connect: { id: manufacturer.id } },
    });

    // AUDIT LOG → UNIT CREATED
    await this.auditRepo.create({
      productUnit: { connect: { id: unit.id } },
      action: "UNIT_CREATED",
      isFirstScan: false,
      notes: "Product unit created",
      metadata: JSON.stringify({ barcode, signature, unitNumber }),
    });

    return unit;
  }

  /**
   * Scan a product unit
   */
  async scan(unitId: string, data: any) {
    const unit = await this.repo.getById(unitId);
    if (!unit) throw new Error("Product unit not found.");

    const isFirstScan = unit.scannedCount === 0;

    // Update scan metadata
    await this.repo.update(unitId, {
      scannedCount: { increment: 1 },
      lastScannedAt: new Date(),
      firstScannedAt: isFirstScan ? new Date() : unit.firstScannedAt,
      lastLatitude: data.latitude,
      lastLongitude: data.longitude,
      lastCity: data.city,
      lastCountry: data.country,
    });

    // AUDIT LOG → SCAN
    await this.auditRepo.create({
      productUnit: { connect: { id: unitId } },
      user: data.userId ? { connect: { id: data.userId } } : undefined,
      action: isFirstScan ? "FIRST_SCAN" : "SUBSEQUENT_SCAN",
      isFirstScan: isFirstScan,
      latitude: data.latitude,
      longitude: data.longitude,
      city: data.city,
      country: data.country,

      ipAddress: data.ip,
      userAgent: data.userAgent,
      metadata: JSON.stringify(data),
      notes: isFirstScan ? "First time scan" : "Duplicate scan detected",
    });

    return {
      message: isFirstScan ? "Authentic product" : "Duplicate scan detected",
      isFirstScan,
    };
  }
}
