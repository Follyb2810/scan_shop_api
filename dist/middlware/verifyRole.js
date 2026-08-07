"use strict";
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
    return async (req, res, next) => {
        const authReq = req;
        const userId = authReq.userId;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized: No userId found" });
        }
        const user = await prisma_client_1.prisma.user.findUnique({
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
    };
};
exports.verifyRole = verifyRole;
//# sourceMappingURL=verifyRole.js.map