import { Request, Response } from "express";
import { asyncHandler, sendSuccess } from "../../../shared/http";
import { warehouseService } from "../application/warehouse.service";
import { listWarehousesQuerySchema } from "../application/validators";

function orgId(req: Request): string {
  return req.params.orgId ?? req.context!.organizationId!;
}

export const WarehouseController = {
  listTypes: asyncHandler(async (_req: Request, res: Response) => {
    const types = await warehouseService.listTypes();
    sendSuccess(res, { types });
  }),

  list: asyncHandler(async (req: Request, res: Response) => {
    const query = listWarehousesQuerySchema.parse(req.query);
    // Prefer path branchId when nested under /branches/:branchId/warehouses
    const branchId = req.params.branchId ?? query.branchId;
    const warehouses = await warehouseService.list(orgId(req), {
      branchId,
      status: query.status,
    });
    sendSuccess(res, { warehouses });
  }),

  getById: asyncHandler(async (req: Request, res: Response) => {
    const warehouse = await warehouseService.getById(
      orgId(req),
      req.params.warehouseId
    );
    sendSuccess(res, { warehouse });
  }),

  create: asyncHandler(async (req: Request, res: Response) => {
    const branchId = req.params.branchId ?? req.body.branchId;
    const warehouse = await warehouseService.create(orgId(req), {
      ...req.body,
      branchId,
    });
    sendSuccess(res, { warehouse }, 201);
  }),

  update: asyncHandler(async (req: Request, res: Response) => {
    const warehouse = await warehouseService.update(
      orgId(req),
      req.params.warehouseId,
      req.body
    );
    sendSuccess(res, { warehouse });
  }),

  softDelete: asyncHandler(async (req: Request, res: Response) => {
    const result = await warehouseService.softDelete(
      orgId(req),
      req.params.warehouseId
    );
    sendSuccess(res, result);
  }),
};
