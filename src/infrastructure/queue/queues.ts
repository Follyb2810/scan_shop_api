import { Queue, QueueEvents } from "bullmq";
import { env } from "../../config/env";
import { logger } from "../../config/logger";
import { getBullMqConnection } from "./bullmq.connection";

export const QueueNames = {
  notifications: "notifications",
  webhooks: "webhooks",
  analytics: "analytics",
  email: "email",
} as const;

export type QueueName = (typeof QueueNames)[keyof typeof QueueNames];

type QueueRegistry = {
  [K in QueueName]?: Queue;
};

const queues: QueueRegistry = {};
const queueEvents: Partial<Record<QueueName, QueueEvents>> = {};

function assertRedisEnabled(): void {
  if (!env.REDIS_ENABLED) {
    throw new Error(
      "Redis/BullMQ is disabled. Set REDIS_ENABLED=true and start Redis (npm run docker:up)."
    );
  }
}

export function getQueue(name: QueueName): Queue {
  assertRedisEnabled();

  if (!queues[name]) {
    queues[name] = new Queue(name, {
      connection: getBullMqConnection(),
      defaultJobOptions: {
        removeOnComplete: 1000,
        removeOnFail: 5000,
        attempts: 3,
        backoff: { type: "exponential", delay: 2000 },
      },
    });
    logger.info({ queue: name }, "BullMQ queue initialized");
  }

  return queues[name]!;
}

export function getQueueEvents(name: QueueName): QueueEvents {
  assertRedisEnabled();

  if (!queueEvents[name]) {
    queueEvents[name] = new QueueEvents(name, {
      connection: getBullMqConnection(),
    });
  }

  return queueEvents[name]!;
}

export async function enqueueJob<T extends Record<string, unknown>>(
  name: QueueName,
  jobName: string,
  data: T,
  opts?: Parameters<Queue["add"]>[2]
): Promise<string> {
  const queue = getQueue(name);
  const job = await queue.add(jobName, data, opts);
  return job.id ?? "";
}

type InlineHandler = (jobName: string, data: Record<string, unknown>) => Promise<void>;
const inlineHandlers = new Map<QueueName, InlineHandler>();

/** Register an in-process handler used when Redis is disabled (tests/dev). */
export function registerInlineQueueHandler(
  name: QueueName,
  handler: InlineHandler
): void {
  inlineHandlers.set(name, handler);
}

/**
 * Enqueue via BullMQ when Redis is on; otherwise run the inline handler immediately.
 */
export async function enqueueOrRun<T extends Record<string, unknown>>(
  name: QueueName,
  jobName: string,
  data: T,
  opts?: Parameters<Queue["add"]>[2]
): Promise<{ jobId: string; mode: "bullmq" | "inline" }> {
  if (env.REDIS_ENABLED) {
    const jobId = await enqueueJob(name, jobName, data, opts);
    return { jobId, mode: "bullmq" };
  }

  const handler = inlineHandlers.get(name);
  if (!handler) {
    logger.warn(
      { queue: name, jobName },
      "No inline queue handler; dropping job (Redis disabled)"
    );
    return { jobId: `dropped-${Date.now()}`, mode: "inline" };
  }

  await handler(jobName, data);
  return { jobId: `inline-${Date.now()}`, mode: "inline" };
}

export async function closeQueues(): Promise<void> {
  const closers: Promise<unknown>[] = [];

  for (const q of Object.values(queues)) {
    if (q) closers.push(q.close());
  }
  for (const e of Object.values(queueEvents)) {
    if (e) closers.push(e.close());
  }

  await Promise.allSettled(closers);

  for (const key of Object.keys(queues) as QueueName[]) {
    delete queues[key];
  }
  for (const key of Object.keys(queueEvents) as QueueName[]) {
    delete queueEvents[key];
  }
}
