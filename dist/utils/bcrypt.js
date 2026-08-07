"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComparePassword = exports.hashPwd = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const env_1 = require("../config/env");
/**
 * Password hashing policy (Step 19):
 * - Algorithm: bcrypt
 * - Cost factor: BCRYPT_ROUNDS (default 10, min 10)
 */
const hashPwd = async (pwd) => {
    const salt = await bcrypt_1.default.genSalt(env_1.env.BCRYPT_ROUNDS);
    return bcrypt_1.default.hash(pwd, salt);
};
exports.hashPwd = hashPwd;
const ComparePassword = async (password, hash) => {
    try {
        return await bcrypt_1.default.compare(password, hash);
    }
    catch {
        throw new Error("Error comparing passwords");
    }
};
exports.ComparePassword = ComparePassword;
//# sourceMappingURL=bcrypt.js.map