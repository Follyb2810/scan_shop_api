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
    create(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email, password }) {
            let userRole = yield this.db.role.findUnique({ where: { name: "USER" } });
            if (!userRole) {
                userRole = yield this.db.role.create({ data: { name: "USER" } });
            }
            const payload = {
                email,
                password,
                isActive: true,
            };
            return this.db.user.create({
                data: Object.assign(Object.assign({}, payload), { userRoles: {
                        create: [{ roleId: userRole.id }],
                    } }),
                include: {
                    manufacturer: true,
                    auditLogs: true,
                    userRoles: { include: { role: true } },
                },
            });
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.user.findUnique({
                where: { email },
                include: {
                    manufacturer: true,
                    auditLogs: true,
                    userRoles: { include: { role: true } },
                },
            });
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.user.findMany({
                include: {
                    manufacturer: true,
                    auditLogs: true,
                    userRoles: { include: { role: true } },
                },
            });
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.user.findUnique({
                where: { id },
                include: {
                    manufacturer: true,
                    auditLogs: true,
                    userRoles: { include: { role: true } },
                },
            });
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.user.update({
                where: { id },
                data,
                include: {
                    manufacturer: true,
                    auditLogs: true,
                    userRoles: { include: { role: true } },
                },
            });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.user.delete({
                where: { id },
            });
        });
    }
    createRole(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.role.create({ data });
        });
    }
    assignRole(userId, roleName) {
        return __awaiter(this, void 0, void 0, function* () {
            let role = yield this.db.role.findUnique({ where: { name: roleName } });
            if (!role) {
                role = yield this.db.role.create({ data: { name: roleName } });
            }
            return this.db.userRole.create({
                data: {
                    userId,
                    roleId: role.id,
                },
            });
        });
    }
    removeRole(userId, roleName) {
        return __awaiter(this, void 0, void 0, function* () {
            const role = yield this.db.role.findUnique({ where: { name: roleName } });
            if (!role)
                return;
            yield this.db.userRole.delete({
                where: {
                    userId_roleId: {
                        userId,
                        roleId: role.id,
                    },
                },
            });
        });
    }
    getUserRoles(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.db.user.findUnique({
                where: { id: userId },
                include: { userRoles: { include: { role: true } } },
            });
            if (!user)
                return [];
            return user.userRoles.map((ur) => ur.role);
        });
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map