"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseError = void 0;
class BaseError extends Error {
    constructor(message = "Unknown error", status = "Server Error", statusCode = 500) {
        super(message);
        this.status = status;
        this.statusCode = statusCode;
        this.name = new.target.name;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.BaseError = BaseError;
//# sourceMappingURL=BaseError.js.map