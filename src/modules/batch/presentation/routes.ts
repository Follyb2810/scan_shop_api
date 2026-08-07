import { Router } from "express";
import { requirePermission, validate } from "../../../middleware";
import { BatchController } from "./batch.controller";
import {
  createBatchSchema,
  qaTransitionSchema,
  recallSchema,
  updateBatchSchema,
} from "../application/validators";
import { registerBatchWorkflowHandlers } from "../infrastructure/workflow-hooks";

registerBatchWorkflowHandlers();

/**
 * Tenant-scoped batches. Mounted at /api/v1/organizations/:orgId
 */
export const batchOrgRouter = Router({ mergeParams: true });

/**
 * @openapi
 * tags:
 *   - name: Batches
 *     description: Manufacturing batches (QA, recall, package link)
 */

/**
 * @openapi
 * /api/v1/organizations/{orgId}/batches:
 *   get:
 *     tags: [Batches]
 *     security: [{ bearerAuth: [] }]
 *     summary: List batches for organization
 *   post:
 *     tags: [Batches]
 *     security: [{ bearerAuth: [] }]
 *     summary: Create a manufacturing batch
 */
batchOrgRouter.get(
  "/batches",
  requirePermission("batch.read"),
  BatchController.list
);

batchOrgRouter.post(
  "/batches",
  requirePermission("batch.create"),
  validate({ body: createBatchSchema }),
  BatchController.create
);

batchOrgRouter.get(
  "/batches/:batchId",
  requirePermission("batch.read"),
  BatchController.getById
);

batchOrgRouter.patch(
  "/batches/:batchId",
  requirePermission("batch.update"),
  validate({ body: updateBatchSchema }),
  BatchController.update
);

/**
 * @openapi
 * /api/v1/organizations/{orgId}/batches/{batchId}/qa:
 *   post:
 *     tags: [Batches]
 *     security: [{ bearerAuth: [] }]
 *     summary: Transition batch QA status
 */
batchOrgRouter.post(
  "/batches/:batchId/qa",
  requirePermission("batch.qa.manage"),
  validate({ body: qaTransitionSchema }),
  BatchController.transitionQa
);

/**
 * @openapi
 * /api/v1/organizations/{orgId}/batches/{batchId}/recall:
 *   post:
 *     tags: [Batches]
 *     security: [{ bearerAuth: [] }]
 *     summary: Request or clear a batch recall (approval via workflow)
 */
batchOrgRouter.post(
  "/batches/:batchId/recall",
  requirePermission("batch.recall.manage"),
  validate({ body: recallSchema }),
  BatchController.manageRecall
);
