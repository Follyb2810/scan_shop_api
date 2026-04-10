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
exports.verifyRole = exports.TRole = void 0;
const prisma_client_1 = require("../config/prisma-client");
var TRole;
(function (TRole) {
    TRole["ADMIN"] = "ADMIN";
    TRole["MODERATOR"] = "MODERATOR";
    TRole["MANUFACTURER"] = "MANUFACTURER";
    TRole["USER"] = "USER";
})(TRole || (exports.TRole = TRole = {}));
const verifyRole = (...allowRoles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const authReq = req;
        const userId = authReq.userId;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized: No userId found" });
        }
        const user = yield prisma_client_1.prisma.user.findUnique({
            where: { id: userId },
            include: {
                userRoles: {
                    include: {
                        role: true,
                    },
                },
            },
        });
        if (!user) {
            return res.status(401).json({ message: "Unauthorized: User not found" });
        }
        const userRoles = user.userRoles.map((ur) => ur.role.name);
        const hasRole = userRoles.some((role) => allowRoles.includes(role));
        if (!hasRole) {
            return res.status(403).json({
                message: "Access denied: Insufficient privileges.",
            });
        }
        next();
    });
};
exports.verifyRole = verifyRole;
//# sourceMappingURL=verifyRole.js.map