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
}
