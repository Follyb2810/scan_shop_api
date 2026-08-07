import { eventBus } from "../../../infrastructure/events/event-bus";
import { logger } from "../../../config/logger";
import { WORKFLOW_EVENTS } from "../../workflow/domain/definitions";
import { LISTING_EVENTS, ORDER_EVENTS } from "../../marketplace/domain/statuses";
import { TRANSFER_EVENTS } from "../../supply-chain/domain/statuses";
import { BATCH_EVENTS } from "../../batch/domain/statuses";
import { AUDIT_ACTIONS } from "../domain/types";
import { recordAudit } from "../application/audit.service";

let registered = false;

/**
 * Subscribe to domain events and append compliance audit rows.
 */
export function registerAuditEventHandlers(): void {
  if (registered) return;
  registered = true;

  const safe = (action: string, fn: () => Promise<unknown>) => {
    void fn().catch((err) =>
      logger.error({ err, action }, "Audit event handler failed")
    );
  };

  eventBus.on(WORKFLOW_EVENTS.INSTANCE_COMPLETED, (payload: any) => {
    safe(AUDIT_ACTIONS.WORKFLOW_COMPLETED, () =>
      recordAudit({
        action: AUDIT_ACTIONS.WORKFLOW_COMPLETED,
        actorUserId: payload.actorUserId,
        organizationId: payload.organizationId,
        entityType: "workflow_instance",
        entityId: payload.instanceId ?? payload.subjectId,
        newValue: {
          definitionKey: payload.definitionKey,
          subjectType: payload.subjectType,
          subjectId: payload.subjectId,
          status: payload.status,
        },
      })
    );
  });

  eventBus.on(LISTING_EVENTS.CREATED, (payload: any) => {
    safe(AUDIT_ACTIONS.LISTING_CREATED, () =>
      recordAudit({
        action: AUDIT_ACTIONS.LISTING_CREATED,
        organizationId: payload.organizationId,
        entityType: "listing",
        entityId: payload.listingId,
      })
    );
  });

  eventBus.on(LISTING_EVENTS.PUBLISHED, (payload: any) => {
    safe(AUDIT_ACTIONS.LISTING_PUBLISHED, () =>
      recordAudit({
        action: AUDIT_ACTIONS.LISTING_PUBLISHED,
        organizationId: payload.organizationId,
        entityType: "listing",
        entityId: payload.listingId,
        newValue: { status: "published" },
      })
    );
  });

  eventBus.on(LISTING_EVENTS.REJECTED, (payload: any) => {
    safe(AUDIT_ACTIONS.LISTING_REJECTED, () =>
      recordAudit({
        action: AUDIT_ACTIONS.LISTING_REJECTED,
        organizationId: payload.organizationId,
        entityType: "listing",
        entityId: payload.listingId,
        newValue: { status: "rejected" },
      })
    );
  });

  eventBus.on(ORDER_EVENTS.CREATED, (payload: any) => {
    safe(AUDIT_ACTIONS.ORDER_CREATED, () =>
      recordAudit({
        action: AUDIT_ACTIONS.ORDER_CREATED,
        organizationId: payload.organizationId,
        entityType: "order",
        entityId: payload.orderId,
        metadata: { customerId: payload.customerId },
      })
    );
  });

  eventBus.on(ORDER_EVENTS.FULFILLED, (payload: any) => {
    safe(AUDIT_ACTIONS.ORDER_FULFILLED, () =>
      recordAudit({
        action: AUDIT_ACTIONS.ORDER_FULFILLED,
        organizationId: payload.organizationId,
        entityType: "order",
        entityId: payload.orderId,
        newValue: { status: payload.status },
      })
    );
  });

  eventBus.on(TRANSFER_EVENTS.CREATED, (payload: any) => {
    safe(AUDIT_ACTIONS.CUSTODY_TRANSFER_CREATED, () =>
      recordAudit({
        action: AUDIT_ACTIONS.CUSTODY_TRANSFER_CREATED,
        organizationId: payload.fromOrganizationId,
        entityType: "custody_transfer",
        entityId: payload.transferId,
        newValue: {
          toOrganizationId: payload.toOrganizationId,
        },
      })
    );
  });

  eventBus.on(TRANSFER_EVENTS.APPROVED, (payload: any) => {
    safe(AUDIT_ACTIONS.CUSTODY_TRANSFER_APPROVED, () =>
      recordAudit({
        action: AUDIT_ACTIONS.CUSTODY_TRANSFER_APPROVED,
        actorUserId: payload.userId,
        organizationId: payload.organizationId,
        entityType: "custody_transfer",
        entityId: payload.transferId,
      })
    );
  });

  eventBus.on(TRANSFER_EVENTS.SHIPPED, (payload: any) => {
    safe(AUDIT_ACTIONS.CUSTODY_TRANSFER_SHIPPED, () =>
      recordAudit({
        action: AUDIT_ACTIONS.CUSTODY_TRANSFER_SHIPPED,
        actorUserId: payload.userId,
        organizationId: payload.organizationId,
        entityType: "custody_transfer",
        entityId: payload.transferId,
      })
    );
  });

  eventBus.on(TRANSFER_EVENTS.RECEIVED, (payload: any) => {
    safe(AUDIT_ACTIONS.CUSTODY_TRANSFER_RECEIVED, () =>
      recordAudit({
        action: AUDIT_ACTIONS.CUSTODY_TRANSFER_RECEIVED,
        actorUserId: payload.userId,
        organizationId: payload.organizationId,
        entityType: "custody_transfer",
        entityId: payload.transferId,
        newValue: { toWarehouseId: payload.toWarehouseId },
      })
    );
  });

  eventBus.on(BATCH_EVENTS.QA_UPDATED, (payload: any) => {
    safe(AUDIT_ACTIONS.BATCH_QA_CHANGED, () =>
      recordAudit({
        action: AUDIT_ACTIONS.BATCH_QA_CHANGED,
        actorUserId: payload.actorUserId ?? payload.userId,
        organizationId: payload.organizationId,
        entityType: "batch",
        entityId: payload.batchId,
        oldValue: payload.from ? { qaStatus: payload.from } : undefined,
        newValue: { qaStatus: payload.to ?? payload.qaStatus },
      })
    );
  });

  eventBus.on(BATCH_EVENTS.RECALL_UPDATED, (payload: any) => {
    safe(AUDIT_ACTIONS.BATCH_RECALL_CHANGED, () =>
      recordAudit({
        action: AUDIT_ACTIONS.BATCH_RECALL_CHANGED,
        actorUserId: payload.userId ?? payload.actorUserId,
        organizationId: payload.organizationId,
        entityType: "batch",
        entityId: payload.batchId,
        newValue: { recallStatus: payload.recallStatus },
      })
    );
  });

  logger.info("Audit domain event handlers registered");
}
