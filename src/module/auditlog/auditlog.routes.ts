import { Router } from "express";
import { AuditLogController } from "./auditlog.controller";
import authMiddleware from "../../middlware/auth.middleware";

const router = Router();

router.use(authMiddleware);

/**
 * @openapi
 * /api/v1/appointment:
 *   post:
 *     tags:
 *       - AuditLog
 *     summary: Create a new audit log
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productUnitId:
 *                 type: string
 *               action:
 *                 type: string
 *               latitude:
 *                 type: number
 *               longitude:
 *                 type: number
 *               city:
 *                 type: string
 *               country:
 *                 type: string
 *               metadata:
 *                 type: string
 *               notes:
 *                 type: string
 *     responses:
 *       201:
 *         description: Audit log created successfully
 *       400:
 *         description: Invalid request
 */
router.post("/", AuditLogController.create);

/**
 * @openapi
 * /api/v1/appointment:
 *   get:
 *     tags:
 *       - AuditLog
 *     summary: Get all audit logs
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of audit logs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get("/", AuditLogController.getAll);

/**
 * @openapi
 * /api/v1/appointment/product-unit/{productUnitId}:
 *   get:
 *     tags:
 *       - AuditLog
 *     summary: Get audit logs for a specific product unit
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: productUnitId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of audit logs for the product unit
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get("/product-unit/:productUnitId", AuditLogController.getByProductUnit);

/**
 * @openapi
 * /api/v1/appointment/user/{userId}:
 *   get:
 *     tags:
 *       - AuditLog
 *     summary: Get audit logs created by a specific user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of audit logs for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get("/user/:userId", AuditLogController.getByUser);

/**
 * @openapi
 * /api/v1/appointment/{id}:
 *   delete:
 *     tags:
 *       - AuditLog
 *     summary: Delete an audit log by ID
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
 *         description: Audit log deleted
 *       404:
 *         description: Audit log not found
 */
router.delete("/:id", AuditLogController.delete);

export default router;

