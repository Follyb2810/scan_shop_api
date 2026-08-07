import { Request, Response } from "express";
import { asyncHandler, sendSuccess } from "../../../shared/http";
import { batchService } from "../application/batch.service";
import { listBatchesQuerySchema } from "../application/validators";

function orgId(req: Request): string {
  return req.params.orgId ?? req.context!.organizationId!;
}

export const BatchController = {
  list: asyncHandler(async (req: Request, res: Response) => {
    const query = listBatchesQuerySchema.parse(req.query);
    const batches = await batchService.list(orgId(req), query);
    sendSuccess(res, { batches });
  }),

  getById: asyncHandler(async (req: Request, res: Response) => {
    const batch = await batchService.getById(orgId(req), req.params.batchId);
    sendSuccess(res, { batch });
  }),

  create: asyncHandler(async (req: Request, res: Response) => {
    const batch = await batchService.create(
      orgId(req),
      req.context!.userId!,
      req.body
    );
    sendSuccess(res, { batch }, 201);
  }),

  update: asyncHandler(async (req: Request, res: Response) => {
    const batch = await batchService.update(
      orgId(req),
      req.params.batchId,
      req.body
    );
    sendSuccess(res, { batch });
  }),

  transitionQa: asyncHandler(async (req: Request, res: Response) => {
    const result = await batchService.transitionQa(
      orgId(req),
      req.params.batchId,
      req.context!.userId!,
      req.body
    );
    sendSuccess(res, result);
  }),

  manageRecall: asyncHandler(async (req: Request, res: Response) => {
    const result = await batchService.manageRecall(
      orgId(req),
      req.params.batchId,
      req.context!.userId!,
      req.body
    );
    sendSuccess(res, result);
  }),
};
