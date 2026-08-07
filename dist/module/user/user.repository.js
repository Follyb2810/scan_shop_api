"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
exports.connectIf = connectIf;
const prisma_client_1 = require("../../config/prisma-client");
// import prisma from "../../config/prisma-client";
function connectIf(id) {
    return id ? { connect: { id } } : undefined;
}
class UserRepository {
    constructor() {
        this.db = prisma_client_1.prisma;
    }
    async create({ email, password }) {
        let userRole = await this.db.role.findUnique({ where: { name: "USER" } });
        if (!userRole) {
            userRole = await this.db.role.create({ data: { name: "USER" } });
        }
        const payload = {
            email,
            password,
            isActive: true,
        };
        return this.db.user.create({
            data: {
                ...payload,
                userRoles: {
                    create: [{ roleId: userRole.id }],
                },
            },
            include: {
                manufacturer: true,
                productUnitAuditLogs: true,
                userRoles: { include: { role: true } },
            },
        });
    }
    async findByEmail(email) {
        return this.db.user.findUnique({
            where: { email },
            include: {
                manufacturer: true,
                productUnitAuditLogs: true,
                userRoles: { include: { role: true } },
            },
        });
    }
    async getAll() {
        return this.db.user.findMany({
            include: {
                manufacturer: true,
                productUnitAuditLogs: true,
                userRoles: { include: { role: true } },
            },
        });
    }
    async getById(id) {
        return this.db.user.findUnique({
            where: { id },
            include: {
                manufacturer: true,
                productUnitAuditLogs: true,
                userRoles: { include: { role: true } },
            },
        });
    }
    async update(id, data) {
        return this.db.user.update({
            where: { id },
            data,
            include: {
                manufacturer: true,
                productUnitAuditLogs: true,
                userRoles: { include: { role: true } },
            },
        });
    }
    async delete(id) {
        return this.db.user.delete({
            where: { id },
        });
    }
    async createRole(data) {
        return this.db.role.create({ data });
    }
    async assignRole(userId, roleName) {
        let role = await this.db.role.findUnique({ where: { name: roleName } });
        if (!role) {
            role = await this.db.role.create({ data: { name: roleName } });
        }
        return this.db.userRole.create({
            data: {
                userId,
                roleId: role.id,
            },
        });
    }
    async removeRole(userId, roleName) {
        const role = await this.db.role.findUnique({ where: { name: roleName } });
        if (!role)
            return;
        await this.db.userRole.delete({
            where: {
                userId_roleId: {
                    userId,
                    roleId: role.id,
                },
            },
        });
    }
    async getUserRoles(userId) {
        const user = await this.db.user.findUnique({
            where: { id: userId },
            include: { userRoles: { include: { role: true } } },
        });
        if (!user)
            return [];
        return user.userRoles.map((ur) => ur.role);
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map