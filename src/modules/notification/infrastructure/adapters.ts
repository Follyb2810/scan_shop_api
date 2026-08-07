import { logger } from "../../../config/logger";
import { NotificationChannel } from "../domain/types";

export type DeliveryResult = { ok: boolean; detail?: string };

export interface NotificationChannelAdapter {
  channel: NotificationChannel;
  send(input: {
    userId: string;
    title: string;
    body?: string;
    data?: Record<string, unknown>;
  }): Promise<DeliveryResult>;
}

/** Console/email stub — always succeeds and logs. */
export const consoleEmailAdapter: NotificationChannelAdapter = {
  channel: "email",
  async send(input) {
    logger.info(
      {
        type: "notification.email",
        userId: input.userId,
        title: input.title,
        body: input.body,
      },
      "Email notification (console adapter)"
    );
    return { ok: true, detail: "console" };
  },
};

export const inAppAdapter: NotificationChannelAdapter = {
  channel: "in_app",
  async send() {
    // Persistence handled by notification service before/after send
    return { ok: true, detail: "in_app" };
  },
};

export const webhookAdapter: NotificationChannelAdapter = {
  channel: "webhook",
  async send(input) {
    logger.info(
      {
        type: "notification.webhook",
        userId: input.userId,
        title: input.title,
        data: input.data,
      },
      "Webhook notification emitted"
    );
    return { ok: true, detail: "webhook_emitted" };
  },
};

const adapters: Record<string, NotificationChannelAdapter> = {
  email: consoleEmailAdapter,
  in_app: inAppAdapter,
  webhook: webhookAdapter,
};

export function getChannelAdapter(
  channel: NotificationChannel
): NotificationChannelAdapter {
  return adapters[channel] ?? consoleEmailAdapter;
}
