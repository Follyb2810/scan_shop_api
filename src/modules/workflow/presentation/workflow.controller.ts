import { Request, Response } from "express";
import { asyncHandler, sendSuccess } from "../../../shared/http";
import { NotFoundError } from "../../../shared/errors";
import { rbacService } from "../../rbac/application/rbac.service";
import { workflowService } from "../application/workflow.service";
import { listInstancesQuerySchema } from "../application/validators";

async function resolveActorPermissions(userId: string, organizationId?: string | null) {
  const platform = await rbacService.resolveAuthz(userId);
  const permissions = new Set(platform.permissions);

  if (organizationId) {
    try {
      const org = await rbacService.resolveAuthz(userId, organizationId);
      for (const p of org.permissions) permissions.add(p);
    } catch {
      // Non-members still act with platform grants (e.g. org approval).
    }
  }

  return [...permissions];
}

export const WorkflowController = {
  listDefinitions: asyncHandler(async (_req: Request, res: Response) => {
    const definitions = await workflowService.listDefinitions();
    sendSuccess(res, { definitions });
  }),

  listInstances: asyncHandler(async (req: Request, res: Response) => {
    const query = listInstancesQuerySchema.parse(req.query);
    const instances = await workflowService.listInstances(query);
    sendSuccess(res, { instances });
  }),

  getInstance: asyncHandler(async (req: Request, res: Response) => {
    const instance = await workflowService.getInstance(req.params.id);
    if (!instance) {
      throw new NotFoundError("Workflow instance not found");
    }
    sendSuccess(res, { instance });
  }),

  start: asyncHandler(async (req: Request, res: Response) => {
    const instance = await workflowService.startWorkflow({
      ...req.body,
      startedByUserId: req.context!.userId!,
    });
    sendSuccess(res, { instance }, 201);
  }),

  submitAction: asyncHandler(async (req: Request, res: Response) => {
    const existing = await workflowService.getInstance(req.params.id);
    if (!existing) {
      throw new NotFoundError("Workflow instance not found");
    }

    const permissions = await resolveActorPermissions(
      req.context!.userId!,
      existing.organizationId
    );

    const instance = await workflowService.submitAction(
      req.params.id,
      req.context!.userId!,
      permissions,
      req.body
    );
    sendSuccess(res, { instance });
  }),
};
