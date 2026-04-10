"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auditlog_controller_1 = require("./auditlog.controller");
const auth_middleware_1 = __importDefault(require("../../middlware/auth.middleware"));
const router = (0, express_1.Router)();
router.use(auth_middleware_1.default);
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
router.post("/", auditlog_controller_1.AuditLogController.create);
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
router.get("/", auditlog_controller_1.AuditLogController.getAll);
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
router.get("/product-unit/:productUnitId", auditlog_controller_1.AuditLogController.getByProductUnit);
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
router.get("/user/:userId", auditlog_controller_1.AuditLogController.getByUser);
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
router.delete("/:id", auditlog_controller_1.AuditLogController.delete);
exports.default = router;
//# sourceMappingURL=auditlog.routes.js.map