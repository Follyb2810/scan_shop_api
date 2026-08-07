import { eventBus } from "../../../infrastructure/events/event-bus";
import { logger } from "../../../config/logger";
import {
  WORKFLOW_EVENTS,
  WorkflowInstanceCompletedPayload,
} from "../../workflow/domain/definitions";
import { marketplaceService } from "../application/marketplace.service";
import { marketplaceRepository } from "./marketplace.repository";

let registered = false;

export function registerMarketplaceWorkflowHandlers(): void {
  if (registered) return;
  registered = true;

  eventBus.on(
    WORKFLOW_EVENTS.INSTANCE_COMPLETED,
    async (payload: WorkflowInstanceCompletedPayload) => {
      if (payload.subjectType !== "listing") return;
      if (payload.definitionKey !== "marketplace.listing.approval") return;

      try {
        const listing = await marketplaceRepository.findListingById(
          payload.subjectId
        );
        if (!listing || listing.status !== "pending_approval") return;

        if (payload.status === "approved") {
          await marketplaceService.approveListing(payload.subjectId);
          logger.info(
            { listingId: payload.subjectId },
            "Listing published via workflow"
          );
        } else if (
          payload.status === "rejected" ||
          payload.status === "cancelled"
        ) {
          await marketplaceService.rejectListing(payload.subjectId);
          logger.info(
            { listingId: payload.subjectId, status: payload.status },
            "Listing rejected via workflow"
          );
        }
      } catch (err) {
        logger.error(
          { err, payload },
          "Failed to apply listing workflow result"
        );
      }
    }
  );
}
