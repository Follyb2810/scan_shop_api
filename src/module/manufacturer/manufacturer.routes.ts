import { Router } from "express";
import { ManufacturerController } from "./manufacturer.controller";
import authMiddleware from "../../middlware/auth.middleware";
import { TRole, verifyRole } from "../../middlware/verifyRole";

const router = Router();

router.use(authMiddleware);

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
router.post("/apply", ManufacturerController.apply);

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
router.get(
  "/admin/pending",
  verifyRole(TRole.ADMIN, TRole.MODERATOR),
  ManufacturerController.getPending
);

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
router.patch(
  "/admin/:id/approve",
  verifyRole(TRole.ADMIN, TRole.MODERATOR),
  ManufacturerController.approve
);

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
router.patch(
  "/admin/:id/reject",
  verifyRole(TRole.ADMIN, TRole.MODERATOR),
  ManufacturerController.reject
);

export default router;
