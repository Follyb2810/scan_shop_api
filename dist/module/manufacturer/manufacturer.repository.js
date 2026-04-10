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
exports.ManufacturerRepository = void 0;
// import { Prisma, Manufacturer } from "@prisma/client";
// import prisma from "../../config/prisma-client";
const prisma_client_1 = require("../../config/prisma-client");
class ManufacturerRepository {
    constructor() {
        this.db = prisma_client_1.prisma;
    }
    apply(userId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = Object.assign(Object.assign({}, data), { user: { connect: { id: userId } }, verificationStatus: "PENDING", isVerified: false });
            return this.db.manufacturer.create({
                data: payload,
                include: { user: true, products: true, productUnits: true },
            });
        });
    }
    getByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.manufacturer.findUnique({
                where: { userId },
                include: { user: true },
            });
        });
    }
    getPending() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.manufacturer.findMany({
                where: { verificationStatus: "PENDING" },
            });
        });
    }
    approve(id, adminId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.manufacturer.update({
                where: { id },
                data: {
                    verificationStatus: "APPROVED",
                    isVerified: true,
                    reviewedAt: new Date(),
                    reviewedBy: adminId,
                },
            });
        });
    }
    reject(id, adminId, notes) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.manufacturer.update({
                where: { id },
                data: {
                    verificationStatus: "REJECTED",
                    isVerified: false,
                    verificationNotes: notes,
                    reviewedAt: new Date(),
                    reviewedBy: adminId,
                },
            });
        });
    }
}
exports.ManufacturerRepository = ManufacturerRepository;
//# sourceMappingURL=manufacturer.repository.js.map