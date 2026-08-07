"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtService = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
class JwtService {
    constructor() { }
    static getSecret() {
        if (!this.secret) {
            this.secret = process.env.JWT_SECRET;
            if (!this.secret) {
                throw new Error("JWT_SECRET is not defined. Make sure it is set in the environment variables.");
            }
        }
        return this.secret;
    }
    static signToken(payload, options) {
        try {
            return (0, jsonwebtoken_1.sign)(payload, this.getSecret(), {
                expiresIn: "1000h",
                ...options,
            });
        }
        catch (err) {
            throw new Error(`JWT signing failed: ${err.message}`);
        }
    }
    static verifyToken(token) {
        try {
            return (0, jsonwebtoken_1.verify)(token, this.getSecret());
        }
        catch (err) {
            const error = err;
            if (error.name === "TokenExpiredError") {
                throw new Error("JWT token has expired");
            }
            if (error.name === "JsonWebTokenError") {
                throw new Error("Invalid JWT token");
            }
            throw error;
        }
    }
    static generateAccessToken(payload, expiresIn = "1h") {
        return this.signToken(payload, { expiresIn });
    }
    static generateRefreshToken(payload, expiresIn = "7d") {
        return this.signToken(payload, { expiresIn });
    }
    static decodeToken(token) {
        return (0, jsonwebtoken_1.verify)(token, this.getSecret(), { ignoreExpiration: true });
    }
}
exports.JwtService = JwtService;
JwtService.secret = null;
exports.default = JwtService;
//# sourceMappingURL=jwt.js.map