import { eventBus } from "../../../infrastructure/events/event-bus";
import { logger } from "../../../config/logger";
import {
  WORKFLOW_EVENTS,
  WorkflowInstanceCompletedPayload,
} from "../../workflow/domain/definitions";
import { organizationRepository } from "./organization.repository";

let registered = false;

/**
 * Apply org status changes when onboarding workflows complete.
 * Status flips happen only via the workflow engine completion event.
 */
export function registerOrganizationWorkflowHandlers(): void {
  if (registered) return;
  registered = true;

  eventBus.on(
    WORKFLOW_EVENTS.INSTANCE_COMPLETED,
    async (payload: WorkflowInstanceCompletedPayload) => {
      if (payload.subjectType !== "organization") return;

      const statusMap: Record<
        WorkflowInstanceCompletedPayload["status"],
        string
      > = {
        approved: "active",
        rejected: "rejected",
        cancelled: "cancelled",
      };

      const nextStatus = statusMap[payload.status];
      try {
        await organizationRepository.updateOrganization(payload.subjectId, {
          status: nextStatus,
        });
        logger.info(
          {
            organizationId: payload.subjectId,
            workflowStatus: payload.status,
            organizationStatus: nextStatus,
            instanceId: payload.instanceId,
          },
          "Organization status updated from workflow"
        );
      } catch (err) {
        logger.error(
          { err, payload },
          "Failed to update organization from workflow completion"
        );
      }
    }
  );
}
