"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepository = void 0;
// import prisma from "../../config/prisma-client";
const prisma_client_1 = require("../../config/prisma-client");
class ProductRepository {
    constructor() {
        this.db = prisma_client_1.prisma;
    }
    async create(manufacturerId, data) {
        const payload = {
            ...data,
            manufacturer: { connect: { id: manufacturerId } }
        };
        return this.db.product.create({
            data: payload,
            include: {
                manufacturer: true,
                units: true,
            },
        });
    }
    async getAll() {
        return this.db.product.findMany({
            include: {
                manufacturer: true,
            },
        });
    }
    async getById(id) {
        return this.db.product.findUnique({
            where: { id },
            include: {
                manufacturer: true,
                units: true,
            },
        });
    }
    async getByManufacturer(manufacturerId) {
        return this.db.product.findMany({
            where: { manufacturerId },
            include: { units: true },
        });
    }
    async update(id, data) {
        return this.db.product.update({
            where: { id },
            data,
            include: {
                manufacturer: true,
                units: true,
            },
        });
    }
    async disable(id) {
        return this.db.product.update({
            where: { id },
            data: { isActive: false },
        });
    }
    async delete(id) {
        return this.db.product.delete({ where: { id } });
    }
}
exports.ProductRepository = ProductRepository;
//# sourceMappingURL=product.repository.js.map