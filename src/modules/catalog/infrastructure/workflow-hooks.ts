import { eventBus } from "../../../infrastructure/events/event-bus";
import { logger } from "../../../config/logger";
import {
  WORKFLOW_EVENTS,
  WorkflowInstanceCompletedPayload,
} from "../../workflow/domain/definitions";
import { catalogRepository } from "./catalog.repository";

let registered = false;

/** Map product.approval workflow outcomes onto Medicine.status. */
export function registerCatalogWorkflowHandlers(): void {
  if (registered) return;
  registered = true;

  eventBus.on(
    WORKFLOW_EVENTS.INSTANCE_COMPLETED,
    async (payload: WorkflowInstanceCompletedPayload) => {
      if (payload.subjectType !== "product") return;
      if (!payload.organizationId) return;

      const statusMap: Record<
        WorkflowInstanceCompletedPayload["status"],
        string
      > = {
        approved: "approved",
        rejected: "rejected",
        cancelled: "draft",
      };

      const nextStatus = statusMap[payload.status];
      try {
        await catalogRepository.updateMedicine(
          payload.organizationId,
          payload.subjectId,
          { status: nextStatus }
        );
        logger.info(
          {
            medicineId: payload.subjectId,
            organizationId: payload.organizationId,
            status: nextStatus,
            instanceId: payload.instanceId,
          },
          "Medicine status updated from workflow"
        );
      } catch (err) {
        logger.error(
          { err, payload },
          "Failed to update medicine from workflow completion"
        );
      }
    }
  );
}
