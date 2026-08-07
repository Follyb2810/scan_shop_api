import { Request, Response } from "express";
import { asyncHandler, sendSuccess } from "../../../shared/http";
import { ValidationError } from "../../../shared/errors";
import { analyticsService } from "../application/analytics.service";

function requireOrg(req: Request): string {
  const orgId =
    req.params.orgId ??
    req.context?.organizationId ??
    req.context?.tenantId;
  if (!orgId) {
    throw new ValidationError(
      "Organization context required. Pass X-Organization-Id."
    );
  }
  return orgId;
}

export const AnalyticsController = {
  platformOverview: asyncHandler(async (_req: Request, res: Response) => {
    const overview = await analyticsService.platformOverview();
    sendSuccess(res, { overview });
  }),

  organizationOverview: asyncHandler(async (req: Request, res: Response) => {
    const overview = await analyticsService.organizationOverview(requireOrg(req));
    sendSuccess(res, { overview });
  }),

  branch: asyncHandler(async (req: Request, res: Response) => {
    const overview = await analyticsService.branchOverview(
      requireOrg(req),
      req.params.branchId
    );
    sendSuccess(res, { overview });
  }),

  warehouse: asyncHandler(async (req: Request, res: Response) => {
    const overview = await analyticsService.warehouseOverview(
      requireOrg(req),
      req.params.warehouseId
    );
    sendSuccess(res, { overview });
  }),

  verification: asyncHandler(async (req: Request, res: Response) => {
    const overview = await analyticsService.verification(requireOrg(req));
    sendSuccess(res, { overview });
  }),

  sales: asyncHandler(async (req: Request, res: Response) => {
    const overview = await analyticsService.sales(requireOrg(req));
    sendSuccess(res, { overview });
  }),

  inventory: asyncHandler(async (req: Request, res: Response) => {
    const overview = await analyticsService.inventory(requireOrg(req));
    sendSuccess(res, { overview });
  }),
};
