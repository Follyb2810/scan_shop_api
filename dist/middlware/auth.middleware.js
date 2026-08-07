"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = require("../utils/jwt");
const authMiddleware = (req, res, next) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
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