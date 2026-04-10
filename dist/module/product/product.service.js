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
Object.defineProperty(exports, "__esModule", { value: true });
exports.productService = exports.ProductService = void 0;
const product_repository_1 = require("./product.repository");
const manufacturer_repository_1 = require("../manufacturer/manufacturer.repository");
class ProductService {
    constructor() {
        this.repo = new product_repository_1.ProductRepository();
        this.manufacturerRepo = new manufacturer_repository_1.ManufacturerRepository();
    }
    create(userId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            // Manufacturer must exist
            const manufacturer = yield this.manufacturerRepo.getByUserId(userId);
            if (!manufacturer) {
                throw new Error("Only manufacturers can create products.");
            }
            // Manufacturer must be verified
            if (!manufacturer.isVerified) {
                throw new Error("Your manufacturer account is not verified.");
            }
            return this.repo.create(manufacturer.id, data);
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repo.getAll();
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repo.getById(id);
        });
    }
    getMyProducts(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const manufacturer = yield this.manufacturerRepo.getByUserId(userId);
            if (!manufacturer)
                throw new Error("Not a manufacturer.");
            return this.repo.getByManufacturer(manufacturer.id);
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repo.update(id, data);
        });
    }
    disable(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repo.disable(id);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repo.delete(id);
        });
    }
}
exports.ProductService = ProductService;
exports.productService = new ProductService();
//# sourceMappingURL=product.service.js.map