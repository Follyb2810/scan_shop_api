import { Request, Response } from "express";
import { asyncHandler, sendSuccess } from "../../../shared/http";
import { verificationService } from "../application/verification.service";
import { listUnitsQuerySchema } from "../application/validators";

function orgId(req: Request): string {
  return req.params.orgId ?? req.context!.organizationId!;
}

function scanContext(req: Request) {
  return {
    userId: req.context?.userId ?? null,
    ipAddress: req.ip ?? null,
    userAgent: req.get("user-agent") ?? null,
    latitude: req.body?.latitude ?? null,
    longitude: req.body?.longitude ?? null,
    city: req.body?.city ?? null,
    country: req.body?.country ?? null,
  };
}

export const VerificationController = {
  generateUnits: asyncHandler(async (req: Request, res: Response) => {
    const result = await verificationService.generateUnits(orgId(req), req.body);
    sendSuccess(res, result, 201);
  }),

  listUnits: asyncHandler(async (req: Request, res: Response) => {
    const query = listUnitsQuerySchema.parse(req.query);
    const units = await verificationService.listUnits(orgId(req), query);
    sendSuccess(res, { units });
  }),

  getUnit: asyncHandler(async (req: Request, res: Response) => {
    const unit = await verificationService.getUnit(
      orgId(req),
      req.params.unitId
    );
    sendSuccess(res, { unit });
  }),

  listUnitScans: asyncHandler(async (req: Request, res: Response) => {
    const scans = await verificationService.listUnitScans(
      orgId(req),
      req.params.unitId
    );
    sendSuccess(res, { scans });
  }),

  verify: asyncHandler(async (req: Request, res: Response) => {
    const result = verificationService.verifyPayload(req.body.payload);
    sendSuccess(res, result);
  }),

  scan: asyncHandler(async (req: Request, res: Response) => {
    const result = await verificationService.scan(
      req.body.payload,
      scanContext(req)
    );
    sendSuccess(res, result);
  }),

  myScans: asyncHandler(async (req: Request, res: Response) => {
    const scans = await verificationService.listMyScans(req.context!.userId!);
    sendSuccess(res, { scans });
  }),
};
