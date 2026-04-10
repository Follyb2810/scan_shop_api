"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const BaseError_1 = require("./BaseError");
const jsonwebtoken_1 = require("jsonwebtoken");
const errorHandler = (err, res, _next) => {
    console.error(`[Error]`, err);
    if (err instanceof BaseError_1.BaseError) {
        return res.status(err.statusCode).json({
            success: false,
            status: err.status,
            message: err.message,
        });
    }
    if (err instanceof Error) {
        return res.status(500).json({
            success: false,
            status: "Server Error",
            message: err.message,
        });
    }
    if (err instanceof jsonwebtoken_1.TokenExpiredError) {
        return res.status(401).json({
            success: false,
            status: "Server Error",
            message: "Token expired",
        });
    }
    else if (err instanceof jsonwebtoken_1.JsonWebTokenError) {
        return res.status(401).json({
            success: false,
            status: "Server Error",
            message: "Invalid token",
        });
    }
    return res.status(500).json({
        success: false,
        status: "Server Error",
        message: typeof err === "string" ? err : "Something went wrong.",
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map