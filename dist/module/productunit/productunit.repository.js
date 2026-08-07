"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductUnitRepository = void 0;
// import prisma from "../../config/prisma-client";
const prisma_client_1 = require("../../config/prisma-client");
class ProductUnitRepository {
    constructor() {
        this.db = prisma_client_1.prisma;
    }
    async create(data) {
        const { productId, manufacturerId, ...rest } = data;
        const payload = {
            product: { connect: { id: productId } },
            manufacturer: { connect: { id: manufacturerId } },
            ...rest,
        };
        return this.db.productUnit.create({ data: payload });
    }
    async getById(id) {
        return this.db.productUnit.findUnique({
            where: { id },
            include: { auditLogs: true, manufacturer: true, product: true },
        });
    }
    async countByProduct(productId) {
        return this.db.productUnit.count({ where: { productId } });
    }
    async getByProduct(productId) {
        return this.db.productUnit.findMany({
            where: { productId },
            include: { auditLogs: true, manufacturer: true, product: true },
        });
    }
    async update(id, data) {
        return this.db.productUnit.update({
            where: { id },
            data,
        });
    }
    async delete(id) {
        return this.db.productUnit.delete({ where: { id } });
    }
}
exports.ProductUnitRepository = ProductUnitRepository;
//# sourceMappingURL=productunit.repository.js.map