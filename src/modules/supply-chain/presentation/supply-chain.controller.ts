import { Request, Response } from "express";
import { asyncHandler, sendSuccess } from "../../../shared/http";
import { supplyChainService } from "../application/supply-chain.service";
import { listTransfersQuerySchema } from "../application/validators";

function orgId(req: Request): string {
  return req.params.orgId ?? req.context!.organizationId!;
}

export const SupplyChainController = {
  list: asyncHandler(async (req: Request, res: Response) => {
    const query = listTransfersQuerySchema.parse(req.query);
    const transfers = await supplyChainService.list(orgId(req), query);
    sendSuccess(res, { transfers });
  }),

  getById: asyncHandler(async (req: Request, res: Response) => {
    const transfer = await supplyChainService.getById(
      orgId(req),
      req.params.transferId
    );
    sendSuccess(res, { transfer });
  }),

  create: asyncHandler(async (req: Request, res: Response) => {
    const transfer = await supplyChainService.create(
      orgId(req),
      req.context!.userId!,
      req.body
    );
    sendSuccess(res, { transfer }, 201);
  }),

  submit: asyncHandler(async (req: Request, res: Response) => {
    const result = await supplyChainService.submit(
      orgId(req),
      req.context!.userId!,
      req.params.transferId,
      req.body
    );
    sendSuccess(res, result);
  }),

  approve: asyncHandler(async (req: Request, res: Response) => {
    const transfer = await supplyChainService.approve(
      orgId(req),
      req.context!.userId!,
      req.params.transferId
    );
    sendSuccess(res, { transfer });
  }),

  ship: asyncHandler(async (req: Request, res: Response) => {
    const transfer = await supplyChainService.ship(
      orgId(req),
      req.context!.userId!,
      req.params.transferId
    );
    sendSuccess(res, { transfer });
  }),

  receive: asyncHandler(async (req: Request, res: Response) => {
    const transfer = await supplyChainService.receive(
      orgId(req),
      req.context!.userId!,
      req.params.transferId,
      req.body
    );
    sendSuccess(res, { transfer });
  }),

  reject: asyncHandler(async (req: Request, res: Response) => {
    const transfer = await supplyChainService.reject(
      orgId(req),
      req.context!.userId!,
      req.params.transferId,
      req.body.reason
    );
    sendSuccess(res, { transfer });
  }),

  cancel: asyncHandler(async (req: Request, res: Response) => {
    const transfer = await supplyChainService.cancel(
      orgId(req),
      req.context!.userId!,
      req.params.transferId
    );
    sendSuccess(res, { transfer });
  }),
};
