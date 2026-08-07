import { Router } from "express";
import { requirePermission, validate } from "../../../middleware";
import { SupplyChainController } from "./supply-chain.controller";
import {
  createTransferSchema,
  receiveTransferSchema,
  rejectTransferSchema,
  submitTransferSchema,
} from "../application/validators";
import { registerSupplyChainWorkflowHandlers } from "../infrastructure/workflow-hooks";

registerSupplyChainWorkflowHandlers();

/**
 * Tenant-scoped custody transfers.
 * Mounted at /api/v1/organizations/:orgId
 */
export const supplyChainOrgRouter = Router({ mergeParams: true });

/**
 * @openapi
 * tags:
 *   - name: SupplyChain
 *     description: Inter-organization custody transfers
 */

supplyChainOrgRouter.get(
  "/supply-chain/transfers",
  requirePermission("supply_chain.read"),
  SupplyChainController.list
);

supplyChainOrgRouter.post(
  "/supply-chain/transfers",
  requirePermission("supply_chain.create"),
  validate({ body: createTransferSchema }),
  SupplyChainController.create
);

supplyChainOrgRouter.get(
  "/supply-chain/transfers/:transferId",
  requirePermission("supply_chain.read"),
  SupplyChainController.getById
);

supplyChainOrgRouter.post(
  "/supply-chain/transfers/:transferId/submit",
  requirePermission("supply_chain.create"),
  validate({ body: submitTransferSchema }),
  SupplyChainController.submit
);

supplyChainOrgRouter.post(
  "/supply-chain/transfers/:transferId/approve",
  requirePermission("supply_chain.approve"),
  SupplyChainController.approve
);

supplyChainOrgRouter.post(
  "/supply-chain/transfers/:transferId/ship",
  requirePermission("supply_chain.create"),
  SupplyChainController.ship
);

supplyChainOrgRouter.post(
  "/supply-chain/transfers/:transferId/receive",
  requirePermission("supply_chain.receive"),
  validate({ body: receiveTransferSchema }),
  SupplyChainController.receive
);

supplyChainOrgRouter.post(
  "/supply-chain/transfers/:transferId/reject",
  requirePermission("supply_chain.approve"),
  validate({ body: rejectTransferSchema }),
  SupplyChainController.reject
);

supplyChainOrgRouter.post(
  "/supply-chain/transfers/:transferId/cancel",
  requirePermission("supply_chain.create"),
  SupplyChainController.cancel
);
