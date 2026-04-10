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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("./user.service");
const successHandler_1 = require("../../errors/successHandler");
const user_dto_1 = require("./user.dto");
const jwt_1 = __importDefault(require("../../utils/jwt"));
const errorHandler_1 = require("../../errors/errorHandler");
exports.UserController = {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { password, email } = req.body;
            const result = yield user_service_1.userService.createUser({ email, password });
            const accessToken = jwt_1.default.generateAccessToken({
                id: result.id,
                email: result.email,
            });
            const refreshToken = jwt_1.default.generateRefreshToken({
                id: result.id,
                email: result.email,
            });
            (0, successHandler_1.successHandler)(res, { data: (0, user_dto_1.userResponseDto)(result), accessToken, refreshToken }, "User Created Successfully", 201);
        });
    },
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const result = yield user_service_1.userService.login(email, password);
            const refreshToken = jwt_1.default.generateRefreshToken({
                id: result.id,
                email: result.email,
            });
            const accessToken = jwt_1.default.generateAccessToken({
                id: result.id,
                email: result.email,
            });
            (0, successHandler_1.successHandler)(res, { data: (0, user_dto_1.userResponseDto)(result), accessToken, refreshToken }, "User Login Successfully", 200);
        });
    },
    refreshToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { token } = req.body;
            if (!token) {
                return (0, errorHandler_1.errorHandler)("REFRESH_TOKEN_REQUIRED", res);
            }
            console.log({ token });
            const decoded = jwt_1.default.verifyToken(token);
            const result = yield user_service_1.userService.getUserById(decoded.id);
            if (!result) {
                return (0, errorHandler_1.errorHandler)("INVALID_USER", res);
            }
            const refreshToken = jwt_1.default.generateRefreshToken({
                id: result.id,
                email: result.email,
            });
            const accessToken = jwt_1.default.generateAccessToken({
                id: result.id,
                email: result.email,
            });
            (0, successHandler_1.successHandler)(res, { accessToken, refreshToken }, "New Refresh token sent", 200);
        });
    },
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield user_service_1.userService.getAllUsers();
            const data = result.map(user_dto_1.userResponseDto);
            (0, successHandler_1.successHandler)(res, data, "All User Successfully", 200);
        });
    },
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.userId;
            const result = yield user_service_1.userService.getUserById(userId);
            (0, successHandler_1.successHandler)(res, { data: result ? (0, user_dto_1.userResponseDto)(result) : result }, "Single User Successfully", 200);
        });
    },
    updateUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.userId;
            const data = req.body;
            const result = yield user_service_1.userService.updateUserById(userId, Object.assign({}, data));
            (0, successHandler_1.successHandler)(res, { data: result ? (0, user_dto_1.userResponseDto)(result) : result }, "Single User Successfully", 200);
        });
    },
    updatePassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.userId;
            const { password } = req.body;
            const result = yield user_service_1.userService.updatePassword(userId, password);
            (0, successHandler_1.successHandler)(res, { data: result ? (0, user_dto_1.userResponseDto)(result) : result }, "Single User Successfully", 200);
        });
    },
    deleteUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.userId;
            yield user_service_1.userService.deleteUserById(userId);
            (0, successHandler_1.successHandler)(res, { data: null }, "User Delete Successfully  Successfully", 200);
        });
    },
};
//# sourceMappingURL=user.controller.js.map