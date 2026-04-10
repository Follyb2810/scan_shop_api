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
exports.AuditLogController = void 0;
const auditlog_service_1 = require("./auditlog.service");
exports.AuditLogController = {
    create: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const log = yield auditlog_service_1.auditLogService.log(req.body);
            res.status(201).json({ message: "Audit log created", log });
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }),
    getByProductUnit: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { productUnitId } = req.params;
        const logs = yield auditlog_service_1.auditLogService.getByProductUnit(productUnitId);
        res.json(logs);
    }),
    getByUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { userId } = req.params;
        const logs = yield auditlog_service_1.auditLogService.getByUser(userId);
        res.json(logs);
    }),
    getAll: (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const logs = yield auditlog_service_1.auditLogService.getAll();
        res.json(logs);
    }),
    delete: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const result = yield auditlog_service_1.auditLogService.delete(id);
        res.json({ message: "Audit log deleted", result });
    }),
};
//# sourceMappingURL=auditlog.controller.js.map