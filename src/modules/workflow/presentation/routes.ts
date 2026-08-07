import { Router } from "express";
import { authenticate, requirePermission, validate } from "../../../middleware";
import { WorkflowController } from "./workflow.controller";
import {
  startWorkflowSchema,
  workflowActionSchema,
} from "../application/validators";

export const workflowRouter = Router();

/**
 * @openapi
 * tags:
 *   - name: Workflows
 *     description: Reusable approval workflows (org, product, marketplace, recall, inventory)
 */

/**
 * @openapi
 * /api/v1/workflows/definitions:
 *   get:
 *     tags: [Workflows]
 *     security: [{ bearerAuth: [] }]
 *     summary: List active workflow definitions
 */
workflowRouter.get(
  "/definitions",
  authenticate,
  WorkflowController.listDefinitions
);

/**
 * @openapi
 * /api/v1/workflows/instances:
 *   get:
 *     tags: [Workflows]
 *     security: [{ bearerAuth: [] }]
 *     summary: List workflow instances (filter by status, subject, definition)
 *     parameters:
 *       - in: query
 *         name: status
 *         schema: { type: string, enum: [pending, approved, rejected, cancelled] }
 *       - in: query
 *         name: subjectType
 *         schema: { type: string }
 *       - in: query
 *         name: subjectId
 *         schema: { type: string, format: uuid }
 *       - in: query
 *         name: organizationId
 *         schema: { type: string, format: uuid }
 *       - in: query
 *         name: definitionKey
 *         schema: { type: string }
 */
workflowRouter.get(
  "/instances",
  authenticate,
  requirePermission("platform.organizations.read"),
  WorkflowController.listInstances
);

/**
 * @openapi
 * /api/v1/workflows/instances/{id}:
 *   get:
 *     tags: [Workflows]
 *     security: [{ bearerAuth: [] }]
 *     summary: Get a workflow instance with actions
 */
workflowRouter.get(
  "/instances/:id",
  authenticate,
  WorkflowController.getInstance
);

/**
 * @openapi
 * /api/v1/workflows/start:
 *   post:
 *     tags: [Workflows]
 *     security: [{ bearerAuth: [] }]
 *     summary: Start a workflow instance (module hook / manual start)
 */
workflowRouter.post(
  "/start",
  authenticate,
  requirePermission("platform.organizations.manage"),
  validate({ body: startWorkflowSchema }),
  WorkflowController.start
);

/**
 * @openapi
 * /api/v1/workflows/instances/{id}/actions:
 *   post:
 *     tags: [Workflows]
 *     security: [{ bearerAuth: [] }]
 *     summary: Approve, reject, or cancel the current workflow step
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [decision]
 *             properties:
 *               decision:
 *                 type: string
 *                 enum: [approve, reject, cancel]
 *               comment:
 *                 type: string
 */
workflowRouter.post(
  "/instances/:id/actions",
  authenticate,
  validate({ body: workflowActionSchema }),
  WorkflowController.submitAction
);
