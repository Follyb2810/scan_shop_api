import { Request, Response } from "express";
import { asyncHandler, sendSuccess } from "../../../shared/http";
import { rbacService } from "../application/rbac.service";

export const RbacController = {
  listPermissions: asyncHandler(async (_req: Request, res: Response) => {
    const permissions = await rbacService.listPermissions();
    sendSuccess(res, { permissions });
  }),

  listPlatformRoles: asyncHandler(async (_req: Request, res: Response) => {
    const roles = await rbacService.listPlatformRoles();
    sendSuccess(res, {
      roles: roles.map((r) => ({
        id: r.id,
        key: r.key,
        name: r.name,
        description: r.description,
        permissions: r.rolePermissions.map((rp) => rp.permission.key),
      })),
    });
  }),

  assignPlatformRole: asyncHandler(async (req: Request, res: Response) => {
    const result = await rbacService.assignPlatformRole(
      req.params.userId,
      req.body.roleKey
    );
    sendSuccess(res, result);
  }),

  removePlatformRole: asyncHandler(async (req: Request, res: Response) => {
    const result = await rbacService.removePlatformRole(
      req.params.userId,
      req.params.roleKey
    );
    sendSuccess(res, result);
  }),

  listOrgRoles: asyncHandler(async (req: Request, res: Response) => {
    const roles = await rbacService.listOrgRoles(req.params.orgId);
    sendSuccess(res, {
      roles: roles.map((r) => ({
        id: r.id,
        key: r.key,
        name: r.name,
        description: r.description,
        isSystem: r.isSystem,
        permissions: r.rolePermissions.map((rp) => rp.permission.key),
      })),
    });
  }),

  createOrgRole: asyncHandler(async (req: Request, res: Response) => {
    const role = await rbacService.createCustomOrgRole(
      req.params.orgId,
      req.body
    );
    sendSuccess(
      res,
      {
        id: role.id,
        key: role.key,
        name: role.name,
        isSystem: role.isSystem,
        permissions: role.rolePermissions.map((rp) => rp.permission.key),
      },
      201
    );
  }),

  updateOrgRolePermissions: asyncHandler(async (req: Request, res: Response) => {
    const role = await rbacService.updateCustomOrgRolePermissions(
      req.params.orgId,
      req.params.roleId,
      req.body.permissionKeys
    );
    sendSuccess(res, {
      id: role!.id,
      key: role!.key,
      permissions: role!.rolePermissions.map((rp) => rp.permission.key),
    });
  }),

  assignMemberRole: asyncHandler(async (req: Request, res: Response) => {
    const result = await rbacService.assignOrgRoleToMember(
      req.params.orgId,
      req.params.userId,
      req.body.roleKey
    );
    sendSuccess(res, result);
  }),

  bootstrapOrg: asyncHandler(async (req: Request, res: Response) => {
    const result = await rbacService.bootstrapOrganization({
      name: req.body.name,
      slug: req.body.slug,
      ownerUserId: req.context!.userId!,
      typeKey: req.body.typeKey,
    });
    sendSuccess(
      res,
      {
        organization: result.organization,
        approvalWorkflow: result.approvalWorkflow,
      },
      201
    );
  }),

  myAuthz: asyncHandler(async (req: Request, res: Response) => {
    sendSuccess(res, {
      userId: req.context?.userId,
      organizationId: req.context?.organizationId ?? null,
      actorMode: req.context?.actorMode,
      platformRoles: req.context?.platformRoles ?? [],
      permissions: req.context?.permissions ?? [],
    });
  }),
};
