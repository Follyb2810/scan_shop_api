import { NextFunction, Request, Response } from "express";
import { rbacService } from "../modules/rbac/application/rbac.service";
import { logger } from "../config/logger";

/**
 * Loads platform / org permissions into RequestContext after auth + tenant resolve.
 */
export async function loadRbac(
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> {
  try {
    if (!req.context?.userId) {
      next();
      return;
    }

    const organizationId = req.context.organizationId ?? req.context.tenantId;

    if (organizationId) {
      const authz = await rbacService.resolveAuthz(
        req.context.userId,
        organizationId
      );
      req.context.permissions = authz.permissions;
      req.context.platformRoles = authz.platformRoles;
      req.context.actorMode = authz.actorMode;
      next();
      return;
    }

    const authz = await rbacService.resolveAuthz(req.context.userId);
    req.context.permissions = authz.permissions;
    req.context.platformRoles = authz.platformRoles;
    if (authz.platformRoles.length > 0) {
      req.context.actorMode = "platform";
    } else if (!req.context.actorMode || req.context.actorMode === "anonymous") {
      req.context.actorMode = "customer";
    }
    next();
  } catch (err) {
    if (req.context?.organizationId || req.context?.tenantId) {
      next(err);
      return;
    }
    logger.warn({ err }, "RBAC load failed; continuing with empty permissions");
    req.context!.permissions = [];
    req.context!.platformRoles = [];
    next();
  }
}

/**
 * Re-resolve permissions after org id is set from route params.
 */
export async function reloadOrgRbac(
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> {
  try {
    if (!req.context?.userId || !req.context.organizationId) {
      next();
      return;
    }
    const authz = await rbacService.resolveAuthz(
      req.context.userId,
      req.context.organizationId
    );
    req.context.permissions = authz.permissions;
    req.context.platformRoles = authz.platformRoles;
    req.context.actorMode = "organization";
    next();
  } catch (err) {
    next(err);
  }
}
