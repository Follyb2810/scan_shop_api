import { Router } from "express";
import { requirePermission, validate } from "../../../middleware";
import { WarehouseController } from "./warehouse.controller";
import {
  createWarehouseSchema,
  updateWarehouseSchema,
} from "../application/validators";

/**
 * Global warehouse reference data.
 * Mounted at /api/v1/warehouses
 */
export const warehouseRouter = Router();

/**
 * @openapi
 * tags:
 *   - name: Warehouses
 *     description: Branch warehouses and warehouse types
 */

/**
 * @openapi
 * /api/v1/warehouses/types:
 *   get:
 *     tags: [Warehouses]
 *     summary: List warehouse types
 */
warehouseRouter.get("/types", WarehouseController.listTypes);

/**
 * Tenant-scoped warehouses under /api/v1/organizations/:orgId
 */
export const warehouseOrgRouter = Router({ mergeParams: true });

const createUnderBranchSchema = createWarehouseSchema.omit({ branchId: true });

/**
 * @openapi
 * /api/v1/organizations/{orgId}/warehouses:
 *   get:
 *     tags: [Warehouses]
 *     security: [{ bearerAuth: [] }]
 *     summary: List warehouses (optional branchId filter)
 *   post:
 *     tags: [Warehouses]
 *     security: [{ bearerAuth: [] }]
 *     summary: Create warehouse under a branch
 */
warehouseOrgRouter.get(
  "/warehouses",
  requirePermission("warehouse.read"),
  WarehouseController.list
);

warehouseOrgRouter.post(
  "/warehouses",
  requirePermission("warehouse.manage"),
  validate({ body: createWarehouseSchema }),
  WarehouseController.create
);

warehouseOrgRouter.get(
  "/warehouses/:warehouseId",
  requirePermission("warehouse.read"),
  WarehouseController.getById
);

warehouseOrgRouter.patch(
  "/warehouses/:warehouseId",
  requirePermission("warehouse.manage"),
  validate({ body: updateWarehouseSchema }),
  WarehouseController.update
);

warehouseOrgRouter.delete(
  "/warehouses/:warehouseId",
  requirePermission("warehouse.manage"),
  WarehouseController.softDelete
);

/**
 * Nested under branch: /branches/:branchId/warehouses
 */
warehouseOrgRouter.get(
  "/branches/:branchId/warehouses",
  requirePermission("warehouse.read"),
  WarehouseController.list
);

warehouseOrgRouter.post(
  "/branches/:branchId/warehouses",
  requirePermission("warehouse.manage"),
  validate({ body: createUnderBranchSchema }),
  WarehouseController.create
);
