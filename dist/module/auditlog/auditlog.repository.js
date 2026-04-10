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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditLogRepository = void 0;
const prisma_client_1 = require("../../config/prisma-client");
// (property) AppointmentRepository.db: PrismaClient<{
//     adapter: PrismaPg;
// }, never, DefaultArgs>
class AuditLogRepository {
    constructor() {
        this.db = prisma_client_1.prisma;
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { productUnitId, userId, action } = data, rest = __rest(data, ["productUnitId", "userId", "action"]);
            const payload = Object.assign({ action, productUnit: { connect: { id: productUnitId } }, user: userId ? { connect: { id: userId } } : undefined }, rest);
            return this.db.auditLog.create({
                data: payload,
                include: {
                    user: true,
                    productUnit: true,
                },
            });
        });
    }
    getByProductUnit(productUnitId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.auditLog.findMany({
                where: { productUnitId },
                orderBy: { timestamp: "desc" },
                include: { user: true, productUnit: true },
            });
        });
    }
    getLogsForUnit(unitId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getByProductUnit(unitId);
        });
    }
    getByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.auditLog.findMany({
                where: { userId },
                orderBy: { timestamp: "desc" },
                include: { user: true, productUnit: true },
            });
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.auditLog.findMany({
                orderBy: { timestamp: "desc" },
                include: { user: true, productUnit: true },
            });
        });
    }
    // async update(data: TAuditLogUpdate): Promise<AuditLogWithResponse> {
    //   const { productUnitId, userId, ...rest } = data;
    //   const auditLog = await this.db.auditLog.findFirst({
    //     where: { productUnitId, userId },
    //   });
    //   if (!auditLog) throw new Error("Audit log not found");
    //   return this.db.auditLog.update({
    //     where: { id: auditLog.id },
    //     data: rest,
    //     include: { user: true, productUnit: true },
    //   });
    // }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.auditLog.update({
                where: { id },
                data,
                include: { user: true, productUnit: true },
            });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.auditLog.delete({ where: { id } });
        });
    }
}
exports.AuditLogRepository = AuditLogRepository;
//# sourceMappingURL=auditlog.repository.js.map