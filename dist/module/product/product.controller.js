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
exports.ProductController = void 0;
const product_service_1 = require("./product.service");
exports.ProductController = {
    create: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userId = req.userId;
            const data = req.body;
            const product = yield product_service_1.productService.create(userId, data);
            res.status(201).json({ message: "Product created", product });
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }),
    getAll: (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const products = yield product_service_1.productService.getAll();
        res.json(products);
    }),
    getById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const product = yield product_service_1.productService.getById(req.params.id);
        res.json(product);
    }),
    getMyProducts: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userId = req.userId;
        const products = yield product_service_1.productService.getMyProducts(userId);
        res.json(products);
    }),
    update: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const product = yield product_service_1.productService.update(req.params.id, req.body);
        res.json({ message: "Product updated", product });
    }),
    disable: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield product_service_1.productService.disable(req.params.id);
        res.json({ message: "Product disabled", result });
    }),
    delete: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield product_service_1.productService.delete(req.params.id);
        res.json({ message: "Product deleted", result });
    }),
};
//# sourceMappingURL=product.controller.js.map