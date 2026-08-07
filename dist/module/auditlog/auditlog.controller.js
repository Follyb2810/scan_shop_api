"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditLogController = void 0;
const auditlog_service_1 = require("./auditlog.service");
exports.AuditLogController = {
    create: async (req, res) => {
        try {
            const log = await auditlog_service_1.auditLogService.log(req.body);
            res.status(201).json({ message: "Audit log created", log });
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    getByProductUnit: async (req, res) => {
        const { productUnitId } = req.params;
        const logs = await auditlog_service_1.auditLogService.getByProductUnit(productUnitId);
        res.json(logs);
    },
    getByUser: async (req, res) => {
        const { userId } = req.params;
        const logs = await auditlog_service_1.auditLogService.getByUser(userId);
        res.json(logs);
    },
    getAll: async (_req, res) => {
        const logs = await auditlog_service_1.auditLogService.getAll();
        res.json(logs);
    },
    delete: async (req, res) => {
        const { id } = req.params;
        const result = await auditlog_service_1.auditLogService.delete(id);
        res.json({ message: "Audit log deleted", result });
    },
};
//# sourceMappingURL=auditlog.controller.js.map