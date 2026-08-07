"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productService = exports.ProductService = void 0;
const product_repository_1 = require("./product.repository");
const manufacturer_repository_1 = require("../manufacturer/manufacturer.repository");
class ProductService {
    constructor() {
        this.repo = new product_repository_1.ProductRepository();
        this.manufacturerRepo = new manufacturer_repository_1.ManufacturerRepository();
    }
    async create(userId, data) {
        // Manufacturer must exist
        const manufacturer = await this.manufacturerRepo.getByUserId(userId);
        if (!manufacturer) {
            throw new Error("Only manufacturers can create products.");
        }
        // Manufacturer must be verified
        if (!manufacturer.isVerified) {
            throw new Error("Your manufacturer account is not verified.");
        }
        return this.repo.create(manufacturer.id, data);
    }
    async getAll() {
        return this.repo.getAll();
    }
    async getById(id) {
        return this.repo.getById(id);
    }
    async getMyProducts(userId) {
        const manufacturer = await this.manufacturerRepo.getByUserId(userId);
        if (!manufacturer)
            throw new Error("Not a manufacturer.");
        return this.repo.getByManufacturer(manufacturer.id);
    }
    async update(id, data) {
        return this.repo.update(id, data);
    }
    async disable(id) {
        return this.repo.disable(id);
    }
    async delete(id) {
        return this.repo.delete(id);
    }
}
exports.ProductService = ProductService;
exports.productService = new ProductService();
//# sourceMappingURL=product.service.js.map