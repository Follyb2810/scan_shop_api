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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductUnitRepository = void 0;
// import prisma from "../../config/prisma-client";
const prisma_client_1 = require("../../config/prisma-client");
class ProductUnitRepository {
    constructor() {
        this.db = prisma_client_1.prisma;
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { productId, manufacturerId } = data, rest = __rest(data, ["productId", "manufacturerId"]);
            const payload = Object.assign({ product: { connect: { id: productId } }, manufacturer: { connect: { id: manufacturerId } } }, rest);
            return this.db.productUnit.create({ data: payload });
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.productUnit.findUnique({
                where: { id },
                include: { auditLogs: true, manufacturer: true, product: true },
            });
        });
    }
    countByProduct(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.productUnit.count({ where: { productId } });
        });
    }
    getByProduct(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.productUnit.findMany({
                where: { productId },
                include: { auditLogs: true, manufacturer: true, product: true },
            });
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.productUnit.update({
                where: { id },
                data,
            });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.productUnit.delete({ where: { id } });
        });
    }
}
exports.ProductUnitRepository = ProductUnitRepository;
//# sourceMappingURL=productunit.repository.js.map