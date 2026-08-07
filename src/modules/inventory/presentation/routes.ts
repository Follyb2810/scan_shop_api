import { Router } from "express";
import { requirePermission, validate } from "../../../middleware";
import { InventoryController } from "./inventory.controller";
import {
  adjustStockSchema,
  receiveStockSchema,
  releaseStockSchema,
  reserveStockSchema,
  transferStockSchema,
} from "../application/validators";

/**
 * Tenant-scoped inventory. Mounted at /api/v1/organizations/:orgId
 */
export const inventoryOrgRouter = Router({ mergeParams: true });

/**
 * @openapi
 * tags:
 *   - name: Inventory
 *     description: Stock by warehouse, batch, and packaging level
 */

/**
 * @openapi
 * /api/v1/organizations/{orgId}/inventory:
 *   get:
 *     tags: [Inventory]
 *     security: [{ bearerAuth: [] }]
 *     summary: List inventory positions
 */
inventoryOrgRouter.get(
  "/inventory",
  requirePermission("inventory.read"),
  InventoryController.list
);

inventoryOrgRouter.get(
  "/inventory/movements",
  requirePermission("inventory.read"),
  InventoryController.listMovements
);

inventoryOrgRouter.get(
  "/inventory/positions/:positionId",
  requirePermission("inventory.read"),
  InventoryController.getPosition
);

/**
 * @openapi
 * /api/v1/organizations/{orgId}/inventory/receive:
 *   post:
 *     tags: [Inventory]
 *     security: [{ bearerAuth: [] }]
 *     summary: Receive stock into available
 */
inventoryOrgRouter.post(
  "/inventory/receive",
  requirePermission("inventory.adjust"),
  validate({ body: receiveStockSchema }),
  InventoryController.receive
);

inventoryOrgRouter.post(
  "/inventory/reserve",
  requirePermission("inventory.reserve"),
  validate({ body: reserveStockSchema }),
  InventoryController.reserve
);

inventoryOrgRouter.post(
  "/inventory/release",
  requirePermission("inventory.reserve"),
  validate({ body: releaseStockSchema }),
  InventoryController.release
);

inventoryOrgRouter.post(
  "/inventory/adjust",
  requirePermission("inventory.adjust"),
  validate({ body: adjustStockSchema }),
  InventoryController.adjust
);

inventoryOrgRouter.post(
  "/inventory/transfer",
  requirePermission("inventory.transfer"),
  validate({ body: transferStockSchema }),
  InventoryController.transfer
);
