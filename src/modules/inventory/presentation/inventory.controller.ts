import { Request, Response } from "express";
import { asyncHandler, sendSuccess } from "../../../shared/http";
import { inventoryService } from "../application/inventory.service";
import {
  listInventoryQuerySchema,
  listMovementsQuerySchema,
} from "../application/validators";

function orgId(req: Request): string {
  return req.params.orgId ?? req.context!.organizationId!;
}

export const InventoryController = {
  list: asyncHandler(async (req: Request, res: Response) => {
    const query = listInventoryQuerySchema.parse(req.query);
    const positions = await inventoryService.list(orgId(req), query);
    sendSuccess(res, { positions });
  }),

  getPosition: asyncHandler(async (req: Request, res: Response) => {
    const position = await inventoryService.getPosition(
      orgId(req),
      req.params.positionId
    );
    sendSuccess(res, { position });
  }),

  listMovements: asyncHandler(async (req: Request, res: Response) => {
    const query = listMovementsQuerySchema.parse(req.query);
    const movements = await inventoryService.listMovements(orgId(req), query);
    sendSuccess(res, { movements });
  }),

  receive: asyncHandler(async (req: Request, res: Response) => {
    const position = await inventoryService.receive(
      orgId(req),
      req.context!.userId!,
      req.body
    );
    sendSuccess(res, { position }, 201);
  }),

  reserve: asyncHandler(async (req: Request, res: Response) => {
    const position = await inventoryService.reserve(
      orgId(req),
      req.context!.userId!,
      req.body
    );
    sendSuccess(res, { position });
  }),

  release: asyncHandler(async (req: Request, res: Response) => {
    const position = await inventoryService.release(
      orgId(req),
      req.context!.userId!,
      req.body
    );
    sendSuccess(res, { position });
  }),

  adjust: asyncHandler(async (req: Request, res: Response) => {
    const position = await inventoryService.adjust(
      orgId(req),
      req.context!.userId!,
      req.body
    );
    sendSuccess(res, { position });
  }),

  transfer: asyncHandler(async (req: Request, res: Response) => {
    const result = await inventoryService.transfer(
      orgId(req),
      req.context!.userId!,
      req.body
    );
    sendSuccess(res, result);
  }),
};
