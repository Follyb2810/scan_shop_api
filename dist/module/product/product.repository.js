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
exports.ProductRepository = void 0;
// import prisma from "../../config/prisma-client";
const prisma_client_1 = require("../../config/prisma-client");
class ProductRepository {
    constructor() {
        this.db = prisma_client_1.prisma;
    }
    create(manufacturerId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = Object.assign(Object.assign({}, data), { manufacturer: { connect: { id: manufacturerId } } });
            return this.db.product.create({
                data: payload,
                include: {
                    manufacturer: true,
                    units: true,
                },
            });
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.product.findMany({
                include: {
                    manufacturer: true,
                },
            });
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.product.findUnique({
                where: { id },
                include: {
                    manufacturer: true,
                    units: true,
                },
            });
        });
    }
    getByManufacturer(manufacturerId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.product.findMany({
                where: { manufacturerId },
                include: { units: true },
            });
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.product.update({
                where: { id },
                data,
                include: {
                    manufacturer: true,
                    units: true,
                },
            });
        });
    }
    disable(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.product.update({
                where: { id },
                data: { isActive: false },
            });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.product.delete({ where: { id } });
        });
    }
}
exports.ProductRepository = ProductRepository;
//# sourceMappingURL=product.repository.js.map