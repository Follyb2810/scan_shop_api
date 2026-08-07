import {
  ConflictError,
  ForbiddenError,
  NotFoundError,
  ValidationError,
} from "../../../shared/errors";
import { eventBus } from "../../../infrastructure/events/event-bus";
import {
  WORKFLOW_EVENTS,
  WorkflowInstanceCompletedPayload,
} from "../domain/definitions";
import { seedWorkflowDefinitions } from "../infrastructure/seed";
import {
  workflowRepository,
  WorkflowRepository,
} from "../infrastructure/workflow.repository";

function permissionGranted(granted: string[], required: string | null): boolean {
  if (!required) return true;
  const set = new Set(granted);
  if (set.has("*")) return true;
  if (set.has(required)) return true;
  const parts = required.split(".");
  for (let i = parts.length - 1; i > 0; i--) {
    const wildcard = `${parts.slice(0, i).join(".")}.*`;
    if (set.has(wildcard)) return true;
  }
  return false;
}

export class WorkflowService {
  constructor(
    private readonly repo: WorkflowRepository = workflowRepository
  ) {}

  seedDefinitions() {
    return seedWorkflowDefinitions();
  }

  listDefinitions() {
    return this.repo.listDefinitions();
  }

  /**
   * Hook for other modules: start a workflow instance by definition key.
   * Rejects if an open (pending) instance already exists for the same subject
   * under the same definition.
   */
  async startWorkflow(input: {
    definitionKey: string;
    subjectType: string;
    subjectId: string;
    organizationId?: string | null;
    startedByUserId?: string | null;
  }) {
    const definition = await this.repo.findDefinitionByKey(input.definitionKey);
    if (!definition) {
      throw new NotFoundError(`Unknown workflow definition: ${input.definitionKey}`);
    }

    if (definition.subjectType !== input.subjectType) {
      throw new ValidationError(
        `Workflow ${input.definitionKey} expects subjectType=${definition.subjectType}`
      );
    }

    if (!definition.steps.length) {
      throw new ValidationError(
        `Workflow ${input.definitionKey} has no steps configured`
      );
    }

    const open = await this.repo.findOpenInstance(
      input.subjectType,
      input.subjectId,
      input.definitionKey
    );
    if (open) {
      throw new ConflictError("A pending workflow already exists for this subject", {
        instanceId: open.id,
      });
    }

    const instance = await this.repo.createInstance({
      definitionId: definition.id,
      subjectType: input.subjectType,
      subjectId: input.subjectId,
      organizationId: input.organizationId,
      startedByUserId: input.startedByUserId,
      currentStep: definition.steps[0]!.stepOrder,
    });

    await eventBus.emit(WORKFLOW_EVENTS.INSTANCE_STARTED, {
      instanceId: instance.id,
      definitionKey: definition.key,
      subjectType: instance.subjectType,
      subjectId: instance.subjectId,
      organizationId: instance.organizationId,
      startedByUserId: input.startedByUserId ?? null,
    });

    return instance;
  }

  getInstance(id: string) {
    return this.repo.findInstanceById(id);
  }

  listInstances(filters: {
    status?: string;
    subjectType?: string;
    subjectId?: string;
    organizationId?: string;
    definitionKey?: string;
  }) {
    return this.repo.listInstances(filters);
  }

  async submitAction(
    instanceId: string,
    actorUserId: string,
    actorPermissions: string[],
    input: { decision: "approve" | "reject" | "cancel"; comment?: string }
  ) {
    const instance = await this.repo.findInstanceById(instanceId);
    if (!instance) {
      throw new NotFoundError("Workflow instance not found");
    }

    if (instance.status !== "pending") {
      throw new ConflictError("Workflow instance is already closed", {
        status: instance.status,
      });
    }

    const step = instance.definition.steps.find(
      (s) => s.stepOrder === instance.currentStep
    );
    if (!step) {
      throw new ValidationError("Current workflow step is misconfigured");
    }

    if (input.decision === "cancel") {
      const isStarter = instance.startedByUserId === actorUserId;
      const canApproveStep = permissionGranted(
        actorPermissions,
        step.requiredPermissionKey
      );
      if (!isStarter && !canApproveStep) {
        throw new ForbiddenError(
          "Only the starter or an authorized approver can cancel this workflow"
        );
      }

      const updated = await this.repo.recordActionAndUpdate({
        instanceId,
        actorUserId,
        stepOrder: step.stepOrder,
        decision: "cancel",
        comment: input.comment,
        nextStatus: "cancelled",
        nextStep: step.stepOrder,
        completedAt: new Date(),
      });

      await this.emitCompleted(updated, "cancelled", actorUserId);
      return updated;
    }

    if (
      !permissionGranted(actorPermissions, step.requiredPermissionKey)
    ) {
      throw new ForbiddenError("Missing permission for this workflow step", {
        required: step.requiredPermissionKey,
      });
    }

    if (input.decision === "reject") {
      const updated = await this.repo.recordActionAndUpdate({
        instanceId,
        actorUserId,
        stepOrder: step.stepOrder,
        decision: "reject",
        comment: input.comment,
        nextStatus: "rejected",
        nextStep: step.stepOrder,
        completedAt: new Date(),
      });

      await this.emitCompleted(updated, "rejected", actorUserId);
      return updated;
    }

    // approve — advance or complete
    const ordered = [...instance.definition.steps].sort(
      (a, b) => a.stepOrder - b.stepOrder
    );
    const idx = ordered.findIndex((s) => s.stepOrder === step.stepOrder);
    const next = ordered[idx + 1];

    if (!next) {
      const updated = await this.repo.recordActionAndUpdate({
        instanceId,
        actorUserId,
        stepOrder: step.stepOrder,
        decision: "approve",
        comment: input.comment,
        nextStatus: "approved",
        nextStep: step.stepOrder,
        completedAt: new Date(),
      });

      await this.emitCompleted(updated, "approved", actorUserId);
      return updated;
    }

    const updated = await this.repo.recordActionAndUpdate({
      instanceId,
      actorUserId,
      stepOrder: step.stepOrder,
      decision: "approve",
      comment: input.comment,
      nextStatus: "pending",
      nextStep: next.stepOrder,
    });

    await eventBus.emit(WORKFLOW_EVENTS.ACTION_RECORDED, {
      instanceId: updated.id,
      decision: "approve",
      stepOrder: step.stepOrder,
      actorUserId,
    });

    return updated;
  }

  private async emitCompleted(
    instance: {
      id: string;
      subjectType: string;
      subjectId: string;
      organizationId: string | null;
      definition: { key: string };
    },
    status: WorkflowInstanceCompletedPayload["status"],
    actorUserId: string
  ) {
    const payload: WorkflowInstanceCompletedPayload = {
      instanceId: instance.id,
      definitionKey: instance.definition.key,
      subjectType: instance.subjectType,
      subjectId: instance.subjectId,
      organizationId: instance.organizationId,
      status,
      actorUserId,
    };

    await eventBus.emit(WORKFLOW_EVENTS.ACTION_RECORDED, {
      ...payload,
      decision: status === "approved" ? "approve" : status === "rejected" ? "reject" : "cancel",
    });
    await eventBus.emit(WORKFLOW_EVENTS.INSTANCE_COMPLETED, payload);
  }
}

export const workflowService = new WorkflowService();
