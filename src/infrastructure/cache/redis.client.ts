import Redis from "ioredis";
import { env } from "../../config/env";
import { logger } from "../../config/logger";

let redis: Redis | null = null;
let connectAttempted = false;

/**
 * Returns a shared ioredis client when Redis is enabled.
 * Lazy-connects so local SQLite-only development can boot without Docker.
 */
export function getRedis(): Redis | null {
  if (!env.REDIS_ENABLED) {
    return null;
  }

  if (!redis) {
    redis = new Redis(env.REDIS_URL, {
      maxRetriesPerRequest: null, // required by BullMQ
      enableReadyCheck: true,
      lazyConnect: true,
    });

    redis.on("error", (err) => {
      logger.warn({ err }, "Redis client error");
    });

    redis.on("connect", () => {
      logger.info("Redis connected");
    });
  }

  return redis;
}

export async function connectRedis(): Promise<boolean> {
  if (!env.REDIS_ENABLED) {
    logger.info("Redis disabled (REDIS_ENABLED=false)");
    return false;
  }

  const client = getRedis();
  if (!client) return false;

  if (connectAttempted && client.status === "ready") {
    return true;
  }

  connectAttempted = true;

  try {
    if (client.status === "wait" || client.status === "end") {
      await client.connect();
    }
    const pong = await client.ping();
    return pong === "PONG";
  } catch (err) {
    logger.warn(
      { err },
      "Redis unavailable — queues/cache will be limited until Redis is up"
    );
    return false;
  }
}

export async function disconnectRedis(): Promise<void> {
  if (!redis) return;
  try {
    await redis.quit();
  } catch {
    redis.disconnect();
  } finally {
    redis = null;
    connectAttempted = false;
  }
}

export async function redisPing(): Promise<boolean> {
  const client = getRedis();
  if (!client) return false;
  try {
    if (client.status !== "ready") {
      await connectRedis();
    }
    return (await client.ping()) === "PONG";
  } catch {
    return false;
  }
}
