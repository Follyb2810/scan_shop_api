"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManufacturerRepository = void 0;
// import { Prisma, Manufacturer } from "@prisma/client";
// import prisma from "../../config/prisma-client";
const prisma_client_1 = require("../../config/prisma-client");
class ManufacturerRepository {
    constructor() {
        this.db = prisma_client_1.prisma;
    }
    async apply(userId, data) {
        const payload = {
            ...data,
            user: { connect: { id: userId } },
            verificationStatus: "PENDING",
            isVerified: false,
        };
        return this.db.manufacturer.create({
            data: payload,
            include: { user: true, products: true, productUnits: true },
        });
    }
    async getByUserId(userId) {
        return this.db.manufacturer.findUnique({
            where: { userId },
            include: { user: true },
        });
    }
    async getPending() {
        return this.db.manufacturer.findMany({
            where: { verificationStatus: "PENDING" },
        });
    }
    async approve(id, adminId) {
        return this.db.manufacturer.update({
            where: { id },
            data: {
                verificationStatus: "APPROVED",
                isVerified: true,
                reviewedAt: new Date(),
                reviewedBy: adminId,
            },
        });
    }
    async reject(id, adminId, notes) {
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
    }
}
exports.ManufacturerRepository = ManufacturerRepository;
//# sourceMappingURL=manufacturer.repository.js.map