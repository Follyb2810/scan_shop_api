"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditLogRepository = void 0;
const prisma_client_1 = require("../../config/prisma-client");
/**
 * Legacy product-unit audit trail (ENABLE_LEGACY_MODULES).
 * General compliance audit lives in src/modules/audit (Step 18).
 */
class AuditLogRepository {
    constructor() {
        this.db = prisma_client_1.prisma;
    }
    async create(data) {
        const { productUnitId, userId, action, ...rest } = data;
        const payload = {
            action,
            productUnit: { connect: { id: productUnitId } },
            user: userId ? { connect: { id: userId } } : undefined,
            ...rest,
        };
        return this.db.productUnitAuditLog.create({
            data: payload,
            include: {
                user: true,
                productUnit: true,
            },
        });
    }
    async getByProductUnit(productUnitId) {
        return this.db.productUnitAuditLog.findMany({
            where: { productUnitId },
            orderBy: { timestamp: "desc" },
            include: { user: true, productUnit: true },
        });
    }
    async getLogsForUnit(unitId) {
        return this.getByProductUnit(unitId);
    }
    async getByUser(userId) {
        return this.db.productUnitAuditLog.findMany({
            where: { userId },
            orderBy: { timestamp: "desc" },
            include: { user: true, productUnit: true },
        });
    }
    async getAll() {
        return this.db.productUnitAuditLog.findMany({
            orderBy: { timestamp: "desc" },
            include: { user: true, productUnit: true },
        });
    }
    async update(id, data) {
        return this.db.productUnitAuditLog.update({
            where: { id },
            data,
            include: { user: true, productUnit: true },
        });
    }
    async delete(id) {
        return this.db.productUnitAuditLog.delete({ where: { id } });
    }
}
exports.AuditLogRepository = AuditLogRepository;
//# sourceMappingURL=auditlog.repository.js.map