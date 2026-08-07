import { Request, Response } from "express";
import { asyncHandler, sendSuccess } from "../../../shared/http";
import { ForbiddenError } from "../../../shared/errors";
import { auditService } from "../application/audit.service";
import { listAuditQuerySchema } from "../application/validators";

function hasPermission(granted: string[], required: string): boolean {
  const set = new Set(granted);
  if (set.has("*") || set.has(required)) return true;
  const parts = required.split(".");
  for (let i = parts.length - 1; i > 0; i--) {
    if (set.has(`${parts.slice(0, i).join(".")}.*`)) return true;
  }
  return false;
}

export const AuditController = {
  listOrg: asyncHandler(async (req: Request, res: Response) => {
    const query = listAuditQuerySchema.parse(req.query);
    const orgId =
      req.params.orgId ??
      req.context?.organizationId ??
      req.context?.tenantId ??
      query.organizationId;

    if (!orgId) {
      throw new ForbiddenError(
        "Organization context required. Pass X-Organization-Id or use /organizations/:orgId/audit"
      );
    }

    const logs = await auditService.list(
      { ...query, organizationId: orgId },
      { platformWide: false }
    );
    sendSuccess(res, { logs });
  }),

  listPlatform: asyncHandler(async (req: Request, res: Response) => {
    const query = listAuditQuerySchema.parse(req.query);
    const logs = await auditService.list(query, { platformWide: true });
    sendSuccess(res, { logs });
  }),

  getById: asyncHandler(async (req: Request, res: Response) => {
    const permissions = req.context?.permissions ?? [];
    const platformWide = hasPermission(permissions, "platform.audit.view");
    const orgId =
      req.params.orgId ??
      req.context?.organizationId ??
      req.context?.tenantId;

    const log = await auditService.getById(req.params.id, {
      platformWide,
      organizationId: orgId,
    });
    sendSuccess(res, { log });
  }),
};
