import { NextFunction, Request, Response } from "express";
import { ForbiddenError, ValidationError } from "../shared/errors";
import { setTenantOnContext } from "../shared/types/RequestContext";
import { prisma } from "../infrastructure/database";

const ORG_HEADER = "x-organization-id";
const BRANCH_HEADER = "x-branch-id";

/**
 * Tenant resolution (Step 6).
 * Sets org/branch on context and validates branch belongs to org when both present.
 * Membership enforcement runs in loadRbac / organization services.
 */
export async function resolveTenant(
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> {
  try {
    if (!req.context) {
      next();
      return;
    }

    const organizationId = req.header(ORG_HEADER)?.trim();
    const branchId = req.header(BRANCH_HEADER)?.trim();

    if (organizationId) {
      if (organizationId.length < 8) {
        next(new ValidationError("Invalid X-Organization-Id header"));
        return;
      }

      const org = await prisma.organization.findFirst({
        where: { id: organizationId, deletedAt: null },
        select: { id: true, status: true },
      });

      if (!org) {
        next(new ForbiddenError("Organization not found"));
        return;
      }

      setTenantOnContext(req.context, organizationId);

      if (req.context.userId) {
        req.context.actorMode = "organization";
      } else if (!req.context.actorMode || req.context.actorMode === "anonymous") {
        req.context.actorMode = "anonymous";
      }
    }

    if (branchId) {
      if (!req.context.organizationId) {
        next(
          new ValidationError(
            "X-Branch-Id requires X-Organization-Id (or org route context)"
          )
        );
        return;
      }

      const branch = await prisma.branch.findFirst({
        where: {
          id: branchId,
          organizationId: req.context.organizationId,
          deletedAt: null,
        },
        select: { id: true },
      });

      if (!branch) {
        next(
          new ForbiddenError("Branch does not belong to the active organization")
        );
        return;
      }

      req.context.branchId = branchId;
    }

    next();
  } catch (err) {
    next(err);
  }
}

/**
 * Requires an active tenant on the request (header or prior resolution).
 */
export function requireTenant(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  const orgId = req.context?.organizationId ?? req.context?.tenantId;
  if (!orgId) {
    next(
      new ForbiddenError(
        "Organization context required. Pass X-Organization-Id header."
      )
    );
    return;
  }
  next();
}
