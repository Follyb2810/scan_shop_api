"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const product_service_1 = require("./product.service");
exports.ProductController = {
    create: async (req, res) => {
        try {
            const userId = req.userId;
            const data = req.body;
            const product = await product_service_1.productService.create(userId, data);
            res.status(201).json({ message: "Product created", product });
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    getAll: async (_req, res) => {
        const products = await product_service_1.productService.getAll();
        res.json(products);
    },
    getById: async (req, res) => {
        const product = await product_service_1.productService.getById(req.params.id);
        res.json(product);
    },
    getMyProducts: async (req, res) => {
        const userId = req.userId;
        const products = await product_service_1.productService.getMyProducts(userId);
        res.json(products);
    },
    update: async (req, res) => {
        const product = await product_service_1.productService.update(req.params.id, req.body);
        res.json({ message: "Product updated", product });
    },
    disable: async (req, res) => {
        const result = await product_service_1.productService.disable(req.params.id);
        res.json({ message: "Product disabled", result });
    },
    delete: async (req, res) => {
        const result = await product_service_1.productService.delete(req.params.id);
        res.json({ message: "Product deleted", result });
    },
};
//# sourceMappingURL=product.controller.js.map