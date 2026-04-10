"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productUnitService = exports.ProductUnitService = void 0;
const crypto_1 = __importDefault(require("crypto"));
const product_repository_1 = require("../product/product.repository");
const manufacturer_repository_1 = require("../manufacturer/manufacturer.repository");
const productunit_repository_1 = require("./productunit.repository");
const auditlog_repository_1 = require("../auditlog/auditlog.repository");
class ProductUnitService {
    constructor() {
        this.productUnitRepo = new productunit_repository_1.ProductUnitRepository();
        this.productRepo = new product_repository_1.ProductRepository();
        this.manufacturerRepo = new manufacturer_repository_1.ManufacturerRepository();
        this.auditRepo = new auditlog_repository_1.AuditLogRepository();
    }
    generateBarcode() {
        return "BC-" + crypto_1.default.randomUUID();
    }
    generateSignature(productId, unitNumber) {
        return crypto_1.default
            .createHash("sha256")
            .update(productId + "-" + unitNumber)
            .digest("hex");
    }
    create(userId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.productRepo.getById(data.productId);
            if (!product)
                throw new Error("Product not found.");
            const manufacturer = yield this.manufacturerRepo.getByUserId(userId);
            if (!manufacturer || manufacturer.id !== product.manufacturerId) {
                throw new Error("Unauthorized to create units for this product.");
            }
            if (!manufacturer.isVerified) {
                throw new Error("Manufacturer account is not verified.");
            }
            const unitNumber = (yield this.productUnitRepo.countByProduct(product.id)) + 1;
            const barcode = this.generateBarcode();
            const signature = this.generateSignature(product.id, unitNumber);
            const unit = yield this.productUnitRepo.create(Object.assign(Object.assign({}, data), { unitNumber,
                barcode,
                signature, status: "ACTIVE", isAuthentic: true }));
            yield this.auditRepo.create({
                productUnitId: unit.id,
                userId,
                action: "UNIT_CREATED",
                notes: "Product unit created",
                metadata: JSON.stringify({ barcode, signature, unitNumber }),
                isFirstScan: false,
            });
            return unit;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.productUnitRepo.getById(id);
        });
    }
    getByProduct(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.productUnitRepo.getByProduct(productId);
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.productUnitRepo.update(id, data);
        });
    }
    delete(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const unit = yield this.productUnitRepo.getById(id);
            if (!unit)
                throw new Error("Product unit not found.");
            yield this.auditRepo.create({
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
        });
    }
    scan(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const unit = yield this.productUnitRepo.getById(id);
            if (!unit)
                throw new Error("Product unit not found.");
            const isFirstScan = (unit.scannedCount || 0) === 0;
            const scannedCount = (unit.scannedCount || 0) + 1;
            const updatedUnit = yield this.productUnitRepo.update(id, {
                scannedCount,
                lastScannedAt: new Date(),
                firstScannedAt: isFirstScan ? new Date() : unit.firstScannedAt,
                lastLatitude: data.latitude,
                lastLongitude: data.longitude,
                lastCity: data.city,
                lastCountry: data.country,
            });
            yield this.auditRepo.create({
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
        });
    }
    markAsSold(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedUnit = yield this.productUnitRepo.update(id, {
                status: "SOLD",
                soldAt: new Date(),
                soldTo: data.soldTo,
                currentOwnerId: data.soldTo,
            });
            yield this.auditRepo.create({
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
        });
    }
    reportSuspicious(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const unit = yield this.productUnitRepo.getById(id);
            if (!unit)
                throw new Error("Product unit not found.");
            const reportedCount = (unit.reportedCount || 0) + 1;
            const updatedUnit = yield this.productUnitRepo.update(id, {
                isSuspicious: true,
                suspiciousNotes: data.notes,
                reportedCount,
                lastLatitude: data.latitude,
                lastLongitude: data.longitude,
                lastCity: data.city,
                lastCountry: data.country,
            });
            yield this.auditRepo.create({
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
        });
    }
}
exports.ProductUnitService = ProductUnitService;
exports.productUnitService = new ProductUnitService();
//# sourceMappingURL=productunit.service.js.map