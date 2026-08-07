import { Request, Response } from "express";
import { asyncHandler, sendSuccess } from "../../../shared/http";
import { organizationService } from "../application/organization.service";

export const OrganizationController = {
  listTypes: asyncHandler(async (_req: Request, res: Response) => {
    const types = await organizationService.listTypes();
    sendSuccess(res, { types });
  }),

  create: asyncHandler(async (req: Request, res: Response) => {
    const result = await organizationService.createOrganization(
      req.context!.userId!,
      req.body
    );
    sendSuccess(
      res,
      {
        organization: result.organization,
        approvalWorkflow: result.approvalWorkflow,
      },
      201
    );
  }),

  listMine: asyncHandler(async (req: Request, res: Response) => {
    const organizations = await organizationService.listMine(
      req.context!.userId!
    );
    sendSuccess(res, { organizations });
  }),

  getById: asyncHandler(async (req: Request, res: Response) => {
    const organization = await organizationService.getOrganization(
      req.params.orgId,
      req.context!.userId!
    );
    sendSuccess(res, { organization });
  }),

  update: asyncHandler(async (req: Request, res: Response) => {
    const organization = await organizationService.updateOrganization(
      req.params.orgId,
      req.context!.userId!,
      req.body
    );
    sendSuccess(res, { organization });
  }),

  listBranches: asyncHandler(async (req: Request, res: Response) => {
    const branches = await organizationService.listBranches(
      req.params.orgId,
      req.context!.userId!
    );
    sendSuccess(res, { branches });
  }),

  createBranch: asyncHandler(async (req: Request, res: Response) => {
    const branch = await organizationService.createBranch(
      req.params.orgId,
      req.context!.userId!,
      req.body
    );
    sendSuccess(res, { branch }, 201);
  }),

  updateBranch: asyncHandler(async (req: Request, res: Response) => {
    const branch = await organizationService.updateBranch(
      req.params.orgId,
      req.params.branchId,
      req.context!.userId!,
      req.body
    );
    sendSuccess(res, { branch });
  }),

  deleteBranch: asyncHandler(async (req: Request, res: Response) => {
    await organizationService.deleteBranch(
      req.params.orgId,
      req.params.branchId,
      req.context!.userId!
    );
    sendSuccess(res, { deleted: true });
  }),

  listMembers: asyncHandler(async (req: Request, res: Response) => {
    const members = await organizationService.listMembers(
      req.params.orgId,
      req.context!.userId!
    );
    sendSuccess(res, { members });
  }),

  inviteMember: asyncHandler(async (req: Request, res: Response) => {
    const result = await organizationService.inviteMember(
      req.params.orgId,
      req.context!.userId!,
      req.body
    );
    sendSuccess(res, result, 201);
  }),

  updateMember: asyncHandler(async (req: Request, res: Response) => {
    const member = await organizationService.updateMember(
      req.params.orgId,
      req.params.membershipId,
      req.context!.userId!,
      req.body
    );
    sendSuccess(res, { member });
  }),
};
