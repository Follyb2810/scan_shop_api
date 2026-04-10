"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const manufacturer_controller_1 = require("./manufacturer.controller");
const auth_middleware_1 = __importDefault(require("../../middlware/auth.middleware"));
const verifyRole_1 = require("../../middlware/verifyRole");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.default);
/**
 * @openapi
 * /api/v1/manufacturer/apply:
 *   post:
 *     tags:
 *       - Manufacturer
 *     summary: Apply to become a manufacturer
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - companyName
 *               - companyEmail
 *               - companyPhone
 *               - address
 *               - city
 *               - state
 *               - country
 *             properties:
 *               companyName:
 *                 type: string
 *               companyEmail:
 *                 type: string
 *               companyPhone:
 *                 type: string
 *               website:
 *                 type: string
 *               address:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               country:
 *                 type: string
 *               postalCode:
 *                 type: string
 *               licenseNumber:
 *                 type: string
 *               registrationNumber:
 *                 type: string
 *               taxId:
 *                 type: string
 *               nafdacNumber:
 *                 type: string
 *               sonCertification:
 *                 type: string
 *               businessType:
 *                 type: string
 *               yearsInBusiness:
 *                 type: integer
 *               supportingDocuments:
 *                 type: string
 *     responses:
 *       201:
 *         description: Application submitted successfully
 *       400:
 *         description: Invalid input
 */
router.post("/apply", manufacturer_controller_1.ManufacturerController.apply);
/**
 * @openapi
 * /api/v1/manufacturer/admin/pending:
 *   get:
 *     tags:
 *       - Manufacturer
 *     summary: Get all pending manufacturer applications (Admin/Moderator only)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of pending manufacturer applications
 *       401:
 *         description: Unauthorized
 */
router.get("/admin/pending", (0, verifyRole_1.verifyRole)(verifyRole_1.TRole.ADMIN, verifyRole_1.TRole.MODERATOR), manufacturer_controller_1.ManufacturerController.getPending);
/**
 * @openapi
 * /api/v1/manufacturer/admin/{id}/approve:
 *   patch:
 *     tags:
 *       - Manufacturer
 *     summary: Approve a manufacturer application (Admin/Moderator only)
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
 *         description: Manufacturer approved
 *       401:
 *         description: Unauthorized
 */
router.patch("/admin/:id/approve", (0, verifyRole_1.verifyRole)(verifyRole_1.TRole.ADMIN, verifyRole_1.TRole.MODERATOR), manufacturer_controller_1.ManufacturerController.approve);
/**
 * @openapi
 * /api/v1/manufacturer/admin/{id}/reject:
 *   patch:
 *     tags:
 *       - Manufacturer
 *     summary: Reject a manufacturer application (Admin/Moderator only)
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
 *             properties:
 *               notes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Manufacturer rejected
 *       401:
 *         description: Unauthorized
 */
router.patch("/admin/:id/reject", (0, verifyRole_1.verifyRole)(verifyRole_1.TRole.ADMIN, verifyRole_1.TRole.MODERATOR), manufacturer_controller_1.ManufacturerController.reject);
exports.default = router;
//# sourceMappingURL=manufacturer.routes.js.map