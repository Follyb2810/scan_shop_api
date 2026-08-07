import { eventBus } from "../../../infrastructure/events/event-bus";
import { logger } from "../../../config/logger";
import {
  WORKFLOW_EVENTS,
  WorkflowInstanceCompletedPayload,
} from "../../workflow/domain/definitions";
import { BATCH_EVENTS } from "../domain/statuses";
import { batchRepository } from "./batch.repository";

let registered = false;

/**
 * Workflow completion → batch QA / recall status.
 * - batch.qa.approval (subjectType=batch) → passed / failed / in_review→pending on cancel
 * - recall.approval (subjectType=recall) → recalled / none
 */
export function registerBatchWorkflowHandlers(): void {
  if (registered) return;
  registered = true;

  eventBus.on(
    WORKFLOW_EVENTS.INSTANCE_COMPLETED,
    async (payload: WorkflowInstanceCompletedPayload) => {
      if (!payload.organizationId) return;

      try {
        if (
          payload.subjectType === "batch" &&
          payload.definitionKey === "batch.qa.approval"
        ) {
          const statusMap = {
            approved: "passed",
            rejected: "failed",
            cancelled: "pending",
          } as const;
          const next = statusMap[payload.status];
          await batchRepository.update(
            payload.organizationId,
            payload.subjectId,
            { qaStatus: next }
          );
          await eventBus.emit(BATCH_EVENTS.QA_UPDATED, {
            batchId: payload.subjectId,
            organizationId: payload.organizationId,
            to: next,
            via: "workflow",
            instanceId: payload.instanceId,
            actorUserId: payload.actorUserId,
          });
          logger.info(
            { batchId: payload.subjectId, qaStatus: next },
            "Batch QA updated from workflow"
          );
          return;
        }

        if (payload.subjectType === "recall") {
          const statusMap = {
            approved: "recalled",
            rejected: "none",
            cancelled: "none",
          } as const;
          const next = statusMap[payload.status];
          await batchRepository.update(
            payload.organizationId,
            payload.subjectId,
            { recallStatus: next }
          );
          await eventBus.emit(BATCH_EVENTS.RECALL_UPDATED, {
            batchId: payload.subjectId,
            organizationId: payload.organizationId,
            to: next,
            via: "workflow",
            instanceId: payload.instanceId,
            actorUserId: payload.actorUserId,
          });
          logger.info(
            { batchId: payload.subjectId, recallStatus: next },
            "Batch recall updated from workflow"
          );
        }
      } catch (err) {
        logger.error(
          { err, payload },
          "Failed to update batch from workflow completion"
        );
      }
    }
  );
}
