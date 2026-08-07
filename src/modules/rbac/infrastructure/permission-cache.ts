import { getRedis } from "../../../infrastructure/cache";
import { env } from "../../../config/env";

const memory = new Map<string, { value: string[]; expiresAt: number }>();
const TTL_MS = 60_000;

function cacheKey(userId: string, organizationId?: string): string {
  return `rbac:perms:${userId}:${organizationId ?? "platform"}`;
}

export async function getCachedPermissions(
  userId: string,
  organizationId?: string
): Promise<string[] | null> {
  const key = cacheKey(userId, organizationId);
  const redis = getRedis();

  if (redis && env.REDIS_ENABLED) {
    try {
      const raw = await redis.get(key);
      if (raw) return JSON.parse(raw) as string[];
    } catch {
      // fall through
    }
  }

  const hit = memory.get(key);
  if (hit && hit.expiresAt > Date.now()) {
    return hit.value;
  }
  return null;
}

export async function setCachedPermissions(
  userId: string,
  permissions: string[],
  organizationId?: string
): Promise<void> {
  const key = cacheKey(userId, organizationId);
  memory.set(key, { value: permissions, expiresAt: Date.now() + TTL_MS });

  const redis = getRedis();
  if (redis && env.REDIS_ENABLED) {
    try {
      await redis.set(key, JSON.stringify(permissions), "PX", TTL_MS);
    } catch {
      // ignore
    }
  }
}

export async function invalidateUserPermissions(
  userId: string,
  organizationId?: string
): Promise<void> {
  const key = cacheKey(userId, organizationId);
  memory.delete(key);

  const redis = getRedis();
  if (redis && env.REDIS_ENABLED) {
    try {
      await redis.del(key);
    } catch {
      // ignore
    }
  }
}

export function clearPermissionMemoryCache(): void {
  memory.clear();
}
