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
exports.auditLogService = exports.AuditLogService = void 0;
const auditlog_repository_1 = require("./auditlog.repository");
// import { AuditLog } from "@prisma/client";
class AuditLogService {
    constructor() {
        this.repo = new auditlog_repository_1.AuditLogRepository();
    }
    log(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repo.create(data);
        });
    }
    getByProductUnit(productUnitId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repo.getByProductUnit(productUnitId);
        });
    }
    getByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repo.getByUser(userId);
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repo.getAll();
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repo.update(id, data);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repo.delete(id);
        });
    }
}
exports.AuditLogService = AuditLogService;
exports.auditLogService = new AuditLogService();
//# sourceMappingURL=auditlog.service.js.map