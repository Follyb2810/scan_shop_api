import { ConnectionOptions } from "bullmq";
import { env } from "../../config/env";

/**
 * BullMQ connection options derived from REDIS_URL.
 * Prefer this over passing a shared ioredis instance to workers
 * (BullMQ manages its own connections).
 */
export function getBullMqConnection(): ConnectionOptions {
  const url = new URL(env.REDIS_URL);

  return {
    host: url.hostname || "127.0.0.1",
    port: url.port ? Number(url.port) : 6379,
    username: url.username || undefined,
    password: url.password || undefined,
    db: url.pathname && url.pathname.length > 1
      ? Number(url.pathname.slice(1))
      : undefined,
    maxRetriesPerRequest: null,
  };
}
