"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.manufacturerService = exports.ManufacturerService = void 0;
const manufacturer_repository_1 = require("./manufacturer.repository");
class ManufacturerService {
    constructor() {
        this.repo = new manufacturer_repository_1.ManufacturerRepository();
    }
    async apply(userId, data) {
        const existing = await this.repo.getByUserId(userId);
        if (existing) {
            throw new Error("You have already submitted a manufacturer application.");
        }
        return this.repo.apply(userId, data);
    }
    async getPending() {
        return this.repo.getPending();
    }
    async approve(id, adminId) {
        return this.repo.approve(id, adminId);
    }
    async reject(id, adminId, notes) {
        return this.repo.reject(id, adminId, notes);
    }
}
exports.ManufacturerService = ManufacturerService;
exports.manufacturerService = new ManufacturerService();
//# sourceMappingURL=manufacturer.service.js.map