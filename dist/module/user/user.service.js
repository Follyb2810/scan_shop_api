"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = exports.UserService = void 0;
const bcrypt_1 = require("../../utils/bcrypt");
const user_repository_1 = require("./user.repository");
class UserService {
    constructor(userRepo = new user_repository_1.UserRepository()) {
        this.userRepo = userRepo;
    }
    async createUser({ email, password, }) {
        const existingUser = await this.userRepo.findByEmail(email);
        if (existingUser) {
            throw new Error("Email already in use");
        }
        const hashedPassword = await (0, bcrypt_1.hashPwd)(password);
        const user = await this.userRepo.create({
            email,
            password: hashedPassword,
        });
        // await this.userRepo.assignRole(user.id, "USER");
        return user;
    }
    async login(email, password) {
        const user = await this.userRepo.findByEmail(email);
        if (!user) {
            throw new Error("Invalid email or password");
        }
        const isPasswordValid = await (0, bcrypt_1.ComparePassword)(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid email or password");
        }
        if (!user.isActive) {
            throw new Error("User account is inactive");
        }
        return user;
    }
    async getAllUsers() {
        return this.userRepo.getAll();
    }
    async getUserById(id) {
        return this.userRepo.getById(id);
    }
    async updateUserById(id, data) {
        return this.userRepo.update(id, data);
    }
    async deleteUserById(id) {
        return this.userRepo.delete(id);
    }
    async updatePassword(id, password) {
        const hashedPassword = await (0, bcrypt_1.hashPwd)(password);
        return this.userRepo.update(id, { password: hashedPassword });
    }
    async getUserRoles(userId) {
        return this.userRepo.getUserRoles(userId);
    }
    async assignRole(userId, roleName) {
        return this.userRepo.assignRole(userId, roleName);
    }
    async removeRole(userId, roleName) {
        return this.userRepo.removeRole(userId, roleName);
    }
}
exports.UserService = UserService;
exports.userService = new UserService();
//# sourceMappingURL=user.service.js.map