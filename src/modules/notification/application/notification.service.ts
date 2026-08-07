import { NotFoundError } from "../../../shared/errors";
import {
  enqueueOrRun,
  QueueNames,
  registerInlineQueueHandler,
} from "../../../infrastructure/queue";
import { getBullMqConnection } from "../../../infrastructure/queue/bullmq.connection";
import { env } from "../../../config/env";
import { logger } from "../../../config/logger";
import {
  NOTIFICATION_JOB,
  NotificationChannel,
  NotificationJobPayload,
} from "../domain/types";
import { getChannelAdapter } from "../infrastructure/adapters";
import {
  notificationRepository,
  NotificationRepository,
} from "../infrastructure/notification.repository";

function parseData(json: string | null | undefined) {
  if (!json) return null;
  try {
    return JSON.parse(json);
  } catch {
    return json;
  }
}

function serialize<T extends { dataJson?: string | null }>(n: T) {
  const { dataJson, ...rest } = n;
  return { ...rest, data: parseData(dataJson) };
}

export class NotificationService {
  constructor(
    private readonly repo: NotificationRepository = notificationRepository
  ) {}

  /** Queue a notification delivery job (BullMQ or inline). */
  async enqueue(payload: NotificationJobPayload) {
    const result = await enqueueOrRun(
      QueueNames.notifications,
      NOTIFICATION_JOB,
      payload as unknown as Record<string, unknown>
    );
    return result;
  }

  /** Process one job: persist + deliver via channel adapter. */
  async deliver(payload: NotificationJobPayload) {
    const row = await this.repo.create({
      userId: payload.userId,
      channel: payload.channel,
      type: payload.type,
      title: payload.title,
      body: payload.body ?? null,
      dataJson: payload.data ? JSON.stringify(payload.data) : null,
      status: "pending",
    });

    const adapter = getChannelAdapter(payload.channel);
    const result = await adapter.send({
      userId: payload.userId,
      title: payload.title,
      body: payload.body,
      data: payload.data,
    });

    const updated = await this.repo.update(row.id, {
      status: result.ok ? (payload.channel === "in_app" ? "sent" : "sent") : "failed",
      sentAt: result.ok ? new Date() : null,
    });

    logger.info(
      {
        notificationId: updated.id,
        channel: payload.channel,
        type: payload.type,
        ok: result.ok,
      },
      "Notification delivered"
    );

    return serialize(updated);
  }

  async notifyUser(input: {
    userId: string;
    channels?: NotificationChannel[];
    type: string;
    title: string;
    body?: string;
    data?: Record<string, unknown>;
  }) {
    const channels = input.channels ?? ["in_app", "email"];
    const jobs = [];
    for (const channel of channels) {
      jobs.push(
        this.enqueue({
          userId: input.userId,
          channel,
          type: input.type,
          title: input.title,
          body: input.body,
          data: input.data,
        })
      );
    }
    return Promise.all(jobs);
  }

  async listMine(userId: string) {
    const rows = await this.repo.listForUser(userId);
    return rows.map(serialize);
  }

  async markRead(userId: string, id: string) {
    const row = await this.repo.findForUser(userId, id);
    if (!row) throw new NotFoundError("Notification not found");
    const updated = await this.repo.update(id, {
      status: "read",
      readAt: new Date(),
    });
    return serialize(updated);
  }

  async markAllRead(userId: string) {
    const result = await this.repo.markAllRead(userId);
    return { updated: result.count };
  }

  async notifyOrgMembers(
    organizationId: string,
    input: {
      type: string;
      title: string;
      body?: string;
      data?: Record<string, unknown>;
      channels?: NotificationChannel[];
    }
  ) {
    const members = await this.repo.findUserIdsInOrg(organizationId);
    for (const m of members) {
      await this.notifyUser({
        userId: m.userId,
        ...input,
      });
    }
    return { recipients: members.length };
  }
}

export const notificationService = new NotificationService();

let workersStarted = false;

/**
 * Register inline handler (Redis off) and optionally BullMQ Worker (Redis on).
 */
export function startNotificationWorkers(): void {
  if (workersStarted) return;
  workersStarted = true;

  registerInlineQueueHandler(QueueNames.notifications, async (jobName, data) => {
    if (jobName !== NOTIFICATION_JOB) return;
    await notificationService.deliver(data as unknown as NotificationJobPayload);
  });

  if (!env.REDIS_ENABLED) return;

  void (async () => {
    try {
      const { Worker } = await import("bullmq");
      const worker = new Worker(
        QueueNames.notifications,
        async (job) => {
          if (job.name !== NOTIFICATION_JOB) return;
          await notificationService.deliver(
            job.data as NotificationJobPayload
          );
        },
        { connection: getBullMqConnection() }
      );
      worker.on("failed", (job, err) => {
        logger.error(
          { err, jobId: job?.id },
          "Notification worker job failed"
        );
      });
      logger.info("BullMQ notification worker started");
    } catch (err) {
      logger.warn({ err }, "Failed to start BullMQ notification worker");
    }
  })();
}
