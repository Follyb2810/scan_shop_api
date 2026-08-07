"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auditLogService = exports.AuditLogService = void 0;
const auditlog_repository_1 = require("./auditlog.repository");
// import { AuditLog } from "@prisma/client";
class AuditLogService {
    constructor() {
        this.repo = new auditlog_repository_1.AuditLogRepository();
    }
    async log(data) {
        return this.repo.create(data);
    }
    async getByProductUnit(productUnitId) {
        return this.repo.getByProductUnit(productUnitId);
    }
    async getByUser(userId) {
        return this.repo.getByUser(userId);
    }
    async getAll() {
        return this.repo.getAll();
    }
    async update(id, data) {
        return this.repo.update(id, data);
    }
    async delete(id) {
        return this.repo.delete(id);
    }
}
exports.AuditLogService = AuditLogService;
exports.auditLogService = new AuditLogService();
//# sourceMappingURL=auditlog.service.js.map