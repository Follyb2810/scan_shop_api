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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = exports.UserService = void 0;
const bcrypt_1 = require("../../utils/bcrypt");
const user_repository_1 = require("./user.repository");
class UserService {
    constructor(userRepo = new user_repository_1.UserRepository()) {
        this.userRepo = userRepo;
    }
    createUser(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email, password, }) {
            const existingUser = yield this.userRepo.findByEmail(email);
            if (existingUser) {
                throw new Error("Email already in use");
            }
            const hashedPassword = yield (0, bcrypt_1.hashPwd)(password);
            const user = yield this.userRepo.create({
                email,
                password: hashedPassword,
            });
            // await this.userRepo.assignRole(user.id, "USER");
            return user;
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepo.findByEmail(email);
            if (!user) {
                throw new Error("Invalid email or password");
            }
            const isPasswordValid = yield (0, bcrypt_1.ComparePassword)(password, user.password);
            if (!isPasswordValid) {
                throw new Error("Invalid email or password");
            }
            if (!user.isActive) {
                throw new Error("User account is inactive");
            }
            return user;
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepo.getAll();
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepo.getById(id);
        });
    }
    updateUserById(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepo.update(id, data);
        });
    }
    deleteUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepo.delete(id);
        });
    }
    updatePassword(id, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield (0, bcrypt_1.hashPwd)(password);
            return this.userRepo.update(id, { password: hashedPassword });
        });
    }
    getUserRoles(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepo.getUserRoles(userId);
        });
    }
    assignRole(userId, roleName) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepo.assignRole(userId, roleName);
        });
    }
    removeRole(userId, roleName) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepo.removeRole(userId, roleName);
        });
    }
}
exports.UserService = UserService;
exports.userService = new UserService();
//# sourceMappingURL=user.service.js.map