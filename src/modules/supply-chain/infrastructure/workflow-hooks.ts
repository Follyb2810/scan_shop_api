import { eventBus } from "../../../infrastructure/events/event-bus";
import { logger } from "../../../config/logger";
import {
  WORKFLOW_EVENTS,
  WorkflowInstanceCompletedPayload,
} from "../../workflow/domain/definitions";
import { supplyChainService } from "../application/supply-chain.service";
import { supplyChainRepository } from "./supply-chain.repository";

let registered = false;

/**
 * custody.transfer.approval completion → approve or reject transfer.
 */
export function registerSupplyChainWorkflowHandlers(): void {
  if (registered) return;
  registered = true;

  eventBus.on(
    WORKFLOW_EVENTS.INSTANCE_COMPLETED,
    async (payload: WorkflowInstanceCompletedPayload) => {
      if (payload.subjectType !== "custody_transfer") return;
      if (payload.definitionKey !== "custody.transfer.approval") return;
      if (!payload.organizationId) return;

      try {
        const transfer = await supplyChainRepository.findById(payload.subjectId);
        if (!transfer || transfer.status !== "submitted") return;

        if (payload.status === "approved") {
          await supplyChainService.approve(
            payload.organizationId,
            payload.actorUserId,
            payload.subjectId
          );
          logger.info(
            { transferId: payload.subjectId },
            "Custody transfer approved via workflow"
          );
        } else if (
          payload.status === "rejected" ||
          payload.status === "cancelled"
        ) {
          await supplyChainService.reject(
            payload.organizationId,
            payload.actorUserId,
            payload.subjectId,
            `Workflow ${payload.status}`
          );
          logger.info(
            { transferId: payload.subjectId, status: payload.status },
            "Custody transfer rejected via workflow"
          );
        }
      } catch (err) {
        logger.error(
          { err, payload },
          "Failed to apply custody transfer workflow result"
        );
      }
    }
  );
}
