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
exports.manufacturerService = exports.ManufacturerService = void 0;
const manufacturer_repository_1 = require("./manufacturer.repository");
class ManufacturerService {
    constructor() {
        this.repo = new manufacturer_repository_1.ManufacturerRepository();
    }
    apply(userId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const existing = yield this.repo.getByUserId(userId);
            if (existing) {
                throw new Error("You have already submitted a manufacturer application.");
            }
            return this.repo.apply(userId, data);
        });
    }
    getPending() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repo.getPending();
        });
    }
    approve(id, adminId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repo.approve(id, adminId);
        });
    }
    reject(id, adminId, notes) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repo.reject(id, adminId, notes);
        });
    }
}
exports.ManufacturerService = ManufacturerService;
exports.manufacturerService = new ManufacturerService();
//# sourceMappingURL=manufacturer.service.js.map