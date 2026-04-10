"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = require("../utils/jwt");
const authMiddleware = (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
        if (!token) {
            res.status(401).json({
                success: false,
                message: "No token provided",
            });
            return;
        }
        const decoded = jwt_1.JwtService.verifyToken(token);
        if (!decoded) {
            res.status(401).json({
                success: false,
                message: "Invalid token",
            });
            return;
        }
        req.userId = decoded.id;
        next();
    }
    catch (error) {
        res.status(401).json({
            success: false,
            message: "Authentication failed",
        });
    }
};
exports.default = authMiddleware;
//# sourceMappingURL=auth.middleware.js.map