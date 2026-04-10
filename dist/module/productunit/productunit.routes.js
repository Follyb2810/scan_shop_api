"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productunit_controller_1 = require("./productunit.controller");
const auth_middleware_1 = __importDefault(require("../../middlware/auth.middleware"));
const router = (0, express_1.Router)();
router.use(auth_middleware_1.default);
/**
 * @openapi
 * /api/v1/product_unit:
 *   post:
 *     tags:
 *       - ProductUnit
 *     summary: Create a product unit
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - unitNumber
 *               - barcode
 *             properties:
 *               productId:
 *                 type: string
 *               unitNumber:
 *                 type: integer
 *               barcode:
 *                 type: string
 *               qrCodeData:
 *                 type: string
 *               signature:
 *                 type: string
 *               status:
 *                 type: string
 *               isAuthentic:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Product unit created successfully
 *       400:
 *         description: Invalid request
 */
router.post("/", productunit_controller_1.ProductUnitController.create);
/**
 * @openapi
 * /api/v1/product_unit/product/{productId}:
 *   get:
 *     tags:
 *       - ProductUnit
 *     summary: Get all units for a specific product
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of product units
 */
router.get("/product/:productId", productunit_controller_1.ProductUnitController.getByProduct);
/**
 * @openapi
 * /api/v1/product_unit/{id}:
 *   get:
 *     tags:
 *       - ProductUnit
 *     summary: Get a product unit by ID
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
 *         description: Product unit retrieved successfully
 *       404:
 *         description: Product unit not found
 */
router.get("/:id", productunit_controller_1.ProductUnitController.getById);
/**
 * @openapi
 * /api/v1/product_unit/{id}:
 *   put:
 *     tags:
 *       - ProductUnit
 *     summary: Update a product unit
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Product unit updated successfully
 */
router.put("/:id", productunit_controller_1.ProductUnitController.update);
/**
 * @openapi
 * /api/v1/product_unit/{id}:
 *   delete:
 *     tags:
 *       - ProductUnit
 *     summary: Delete a product unit
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
 *         description: Product unit deleted successfully
 */
router.delete("/:id", productunit_controller_1.ProductUnitController.delete);
/**
 * @openapi
 * /api/v1/product_unit/{id}/scan:
 *   post:
 *     tags:
 *       - ProductUnit
 *     summary: Scan a product unit
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               additionalData:
 *                 type: object
 *     responses:
 *       200:
 *         description: Product unit scanned successfully
 */
router.post("/:id/scan", productunit_controller_1.ProductUnitController.scan);
/**
 * @openapi
 * /api/v1/product_unit/{id}/mark-as-sold:
 *   post:
 *     tags:
 *       - ProductUnit
 *     summary: Mark a product unit as sold
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               soldTo:
 *                 type: string
 *               soldAt:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Product unit marked as sold
 */
router.post("/:id/mark-as-sold", productunit_controller_1.ProductUnitController.markAsSold);
/**
 * @openapi
 * /api/v1/product_unit/{id}/report-suspicious:
 *   post:
 *     tags:
 *       - ProductUnit
 *     summary: Report a product unit as suspicious
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               notes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Product unit reported as suspicious
 */
router.post("/:id/report-suspicious", productunit_controller_1.ProductUnitController.reportSuspicious);
exports.default = router;
//# sourceMappingURL=productunit.routes.js.map