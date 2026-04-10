"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedError = exports.ValidationError = exports.NotFoundError = void 0;
const BaseError_1 = require("./BaseError");
class NotFoundError extends BaseError_1.BaseError {
    constructor(message = "Resource not found") {
        super(message, "Not Found", 404);
    }
}
exports.NotFoundError = NotFoundError;
class ValidationError extends BaseError_1.BaseError {
    constructor(message = "Invalid input") {
        super(message, "Bad Request", 400);
    }
}
exports.ValidationError = ValidationError;
class UnauthorizedError extends BaseError_1.BaseError {
    constructor(message = "Unauthorized") {
        super(message, "Unauthorized", 401);
    }
}
exports.UnauthorizedError = UnauthorizedError;
//# sourceMappingURL=CustomError.js.map