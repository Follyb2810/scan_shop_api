"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../../middlware/auth.middleware"));
const verifyRole_1 = require("../../middlware/verifyRole");
const product_controller_1 = require("./product.controller");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.default);
/**
 * @openapi
 * /api/v1/product:
 *   post:
 *     tags:
 *       - Product
 *     summary: Create a product (Manufacturer only)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - category
 *               - sku
 *               - batchNumber
 *               - manufactureDate
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *               sku:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *               weight:
 *                 type: string
 *               dimensions:
 *                 type: string
 *               ingredients:
 *                 type: string
 *               batchNumber:
 *                 type: string
 *               manufactureDate:
 *                 type: string
 *                 format: date-time
 *               expiryDate:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Invalid request
 */
router.post("/", (0, verifyRole_1.verifyRole)(verifyRole_1.TRole.MANUFACTURER), product_controller_1.ProductController.create);
/**
 * @openapi
 * /api/v1/product:
 *   get:
 *     tags:
 *       - Product
 *     summary: Get all products (Manufacturer only)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get("/", (0, verifyRole_1.verifyRole)(verifyRole_1.TRole.MANUFACTURER), product_controller_1.ProductController.getAll);
/**
 * @openapi
 * /api/v1/product/my:
 *   get:
 *     tags:
 *       - Product
 *     summary: Get products created by authenticated user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's products
 */
router.get("/my", (0, verifyRole_1.verifyRole)(verifyRole_1.TRole.MANUFACTURER), product_controller_1.ProductController.getMyProducts);
/**
 * @openapi
 * /api/v1/product/{id}:
 *   get:
 *     tags:
 *       - Product
 *     summary: Get a product by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product retrieved successfully
 *       404:
 *         description: Product not found
 */
router.get("/:id", product_controller_1.ProductController.getById);
/**
 * @openapi
 * /api/v1/product/{id}:
 *   patch:
 *     tags:
 *       - Product
 *     summary: Update a product (Admin/Moderator/Manufacturer)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Product updated successfully
 */
router.patch("/:id", (0, verifyRole_1.verifyRole)(verifyRole_1.TRole.ADMIN, verifyRole_1.TRole.MODERATOR, verifyRole_1.TRole.MANUFACTURER), product_controller_1.ProductController.update);
/**
 * @openapi
 * /api/v1/product/{id}/disable:
 *   patch:
 *     tags:
 *       - Product
 *     summary: Disable a product (Admin/Moderator/Manufacturer)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product disabled successfully
 */
router.patch("/:id/disable", (0, verifyRole_1.verifyRole)(verifyRole_1.TRole.ADMIN, verifyRole_1.TRole.MODERATOR, verifyRole_1.TRole.MANUFACTURER), product_controller_1.ProductController.disable);
/**
 * @openapi
 * /api/v1/product/{id}:
 *   delete:
 *     tags:
 *       - Product
 *     summary: Delete a product (Admin/Moderator/Manufacturer)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully
 */
router.delete("/:id", (0, verifyRole_1.verifyRole)(verifyRole_1.TRole.ADMIN, verifyRole_1.TRole.MODERATOR, verifyRole_1.TRole.MANUFACTURER), product_controller_1.ProductController.delete);
exports.default = router;
//# sourceMappingURL=product.routes.js.map