"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const jsonwebtoken_1 = require("jsonwebtoken");
const zod_1 = require("zod");
const BaseError_1 = require("./BaseError");
const errors_1 = require("../shared/errors");
const http_1 = require("../shared/http");
/**
 * Legacy controller helper: `errorHandler(err, res)`.
 * Prefer `next(err)` + middleware `errorHandler` in new modules.
 */
function errorHandler(err, res) {
    if (err instanceof errors_1.AppError) {
        return (0, http_1.sendError)(res, err.statusCode, err.code, err.message, err.details);
    }
    if (err instanceof BaseError_1.BaseError) {
        return (0, http_1.sendError)(res, err.statusCode, err.status, err.message);
    }
    if (err instanceof zod_1.ZodError) {
        return (0, http_1.sendError)(res, 400, "VALIDATION_ERROR", "Invalid request", err.flatten());
    }
    if (err instanceof jsonwebtoken_1.TokenExpiredError) {
        return (0, http_1.sendError)(res, 401, "TOKEN_EXPIRED", "Token expired");
    }
    if (err instanceof jsonwebtoken_1.JsonWebTokenError) {
        return (0, http_1.sendError)(res, 401, "INVALID_TOKEN", "Invalid token");
    }
    if (typeof err === "string") {
        return (0, http_1.sendError)(res, 400, err, err);
    }
    const message = err instanceof Error ? err.message : "Something went wrong.";
    return (0, http_1.sendError)(res, 500, "INTERNAL_ERROR", message);
}
//# sourceMappingURL=errorHandler.js.map