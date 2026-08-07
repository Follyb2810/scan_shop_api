import { Router, Request, Response, NextFunction } from "express";
import {
  authenticate,
  requirePermission,
  requirePlatformRole,
  requireTenant,
  validate,
  reloadOrgRbac,
} from "../../../middleware";
import { setTenantOnContext } from "../../../shared/types/RequestContext";
import { RbacController } from "./rbac.controller";
import {
  assignOrgRoleSchema,
  assignPlatformRoleSchema,
  bootstrapOrgSchema,
  createOrgRoleSchema,
  updateOrgRolePermissionsSchema,
} from "../application/validators";

function syncOrgIdFromParams(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  const orgId = req.params.orgId;
  if (orgId && req.context) {
    setTenantOnContext(req.context, orgId);
  }
  next();
}

export const rbacRouter = Router();

/**
 * @openapi
 * tags:
 *   - name: RBAC
 *     description: Permissions, platform roles, organization roles
 */

/**
 * @openapi
 * /api/v1/rbac/permissions:
 *   get:
 *     tags: [RBAC]
 *     security: [{ bearerAuth: [] }]
 *     summary: List platform permission catalog
 */
rbacRouter.get("/permissions", authenticate, RbacController.listPermissions);

/**
 * @openapi
 * /api/v1/rbac/platform/roles:
 *   get:
 *     tags: [RBAC]
 *     security: [{ bearerAuth: [] }]
 *     summary: List platform roles and their permissions
 */
rbacRouter.get("/platform/roles", authenticate, RbacController.listPlatformRoles);

/**
 * @openapi
 * /api/v1/rbac/platform/users/{userId}/roles:
 *   post:
 *     tags: [RBAC]
 *     security: [{ bearerAuth: [] }]
 *     summary: Assign a platform role to a user
 */
rbacRouter.post(
  "/platform/users/:userId/roles",
  authenticate,
  requirePermission("platform.roles.manage"),
  validate({ body: assignPlatformRoleSchema }),
  RbacController.assignPlatformRole
);

rbacRouter.delete(
  "/platform/users/:userId/roles/:roleKey",
  authenticate,
  requirePermission("platform.roles.manage"),
  RbacController.removePlatformRole
);

/**
 * @openapi
 * /api/v1/rbac/me:
 *   get:
 *     tags: [RBAC]
 *     security: [{ bearerAuth: [] }]
 *     summary: Current authz snapshot (respects X-Organization-Id)
 */
rbacRouter.get("/me", authenticate, RbacController.myAuthz);

/**
 * Temporary bootstrap until Step 6 organization module owns create-org.
 * Creates org, seeds default roles, assigns OWNER to caller.
 */
rbacRouter.post(
  "/organizations/bootstrap",
  authenticate,
  validate({ body: bootstrapOrgSchema }),
  RbacController.bootstrapOrg
);

/** Super-admin convenience: also allow SUPER_ADMIN role without permission list race */
rbacRouter.post(
  "/platform/users/:userId/roles/super",
  authenticate,
  requirePlatformRole("SUPER_ADMIN"),
  validate({ body: assignPlatformRoleSchema }),
  RbacController.assignPlatformRole
);

export const orgRolesRouter = Router({ mergeParams: true });

/**
 * Mounted at /api/v1/organizations/:orgId/roles
 */
orgRolesRouter.use(
  authenticate,
  syncOrgIdFromParams,
  reloadOrgRbac,
  requireTenant
);

orgRolesRouter.get("/", requirePermission("roles.read"), RbacController.listOrgRoles);

orgRolesRouter.post(
  "/",
  requirePermission("roles.manage"),
  validate({ body: createOrgRoleSchema }),
  RbacController.createOrgRole
);

orgRolesRouter.patch(
  "/:roleId/permissions",
  requirePermission("roles.manage"),
  validate({ body: updateOrgRolePermissionsSchema }),
  RbacController.updateOrgRolePermissions
);

orgRolesRouter.post(
  "/members/:userId/assign",
  requirePermission("users.manage"),
  validate({ body: assignOrgRoleSchema }),
  RbacController.assignMemberRole
);
