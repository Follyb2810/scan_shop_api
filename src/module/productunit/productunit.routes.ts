import { Router } from "express";
import { ProductUnitController } from "./productunit.controller";
import authMiddleware from "../../middlware/auth.middleware";

const router = Router();

router.use(authMiddleware);

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
router.post("/", ProductUnitController.create);

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
router.get("/product/:productId", ProductUnitController.getByProduct);

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
router.get("/:id", ProductUnitController.getById);

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
router.put("/:id", ProductUnitController.update);

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
router.delete("/:id", ProductUnitController.delete);

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
router.post("/:id/scan", ProductUnitController.scan);

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
router.post("/:id/mark-as-sold", ProductUnitController.markAsSold);

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
router.post("/:id/report-suspicious", ProductUnitController.reportSuspicious);

export default router;
