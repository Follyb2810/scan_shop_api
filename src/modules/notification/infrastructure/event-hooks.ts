import { eventBus } from "../../../infrastructure/events/event-bus";
import { logger } from "../../../config/logger";
import { BATCH_EVENTS } from "../../batch/domain/statuses";
import { ORDER_EVENTS } from "../../marketplace/domain/statuses";
import { PAYMENT_EVENTS } from "../../payments/domain/types";
import { customerRepository } from "../../customer/infrastructure/customer.repository";
import { notificationService } from "../application/notification.service";

let registered = false;

export function registerNotificationEventHandlers(): void {
  if (registered) return;
  registered = true;

  const safe = (label: string, fn: () => Promise<unknown>) => {
    void fn().catch((err) =>
      logger.error({ err, label }, "Notification event handler failed")
    );
  };

  eventBus.on(BATCH_EVENTS.RECALL_UPDATED, (payload: any) => {
    const status = payload.recallStatus ?? payload.to;
    if (status !== "recalled" && status !== "pending") return;
    safe("batch.recall", () =>
      notificationService.notifyOrgMembers(payload.organizationId, {
        type:
          status === "recalled" ? "batch.recalled" : "batch.recall_requested",
        title:
          status === "recalled" ? "Batch recalled" : "Recall requested",
        body: `Batch ${payload.batchId} recall status: ${status}.`,
        data: {
          batchId: payload.batchId,
          recallStatus: status,
        },
        channels: ["in_app", "email", "webhook"],
      })
    );
  });

  eventBus.on(ORDER_EVENTS.PAID, (payload: any) => {
    safe("order.paid", async () => {
      if (!payload.customerId) return;
      const profile = await customerRepository.findById(payload.customerId);
      if (!profile) return;
      await notificationService.notifyUser({
        userId: profile.userId,
        type: "order.paid",
        title: "Payment received",
        body: `Your order ${payload.orderId} is paid.`,
        data: { orderId: payload.orderId, paymentId: payload.paymentId },
        channels: ["in_app", "email"],
      });
    });
  });

  eventBus.on(PAYMENT_EVENTS.FAILED, (payload: any) => {
    safe("payment.failed", async () => {
      // best-effort; customer lookup via payment not required for MVP
      logger.info({ payload }, "Payment failed notification skipped (no user)");
    });
  });

  logger.info("Notification domain event handlers registered");
}
