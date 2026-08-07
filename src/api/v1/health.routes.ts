import { Router } from "express";
import { env } from "../../config/env";
import { prisma } from "../../infrastructure/database";
import { redisPing } from "../../infrastructure/cache";
import { asyncHandler, sendSuccess } from "../../shared/http";

export const healthRouter = Router();

/**
 * @openapi
 * /api/v1/health:
 *   get:
 *     tags: [System]
 *     summary: Liveness health check
 *     responses:
 *       200:
 *         description: Service is up
 */
healthRouter.get(
  "/",
  asyncHandler(async (_req, res) => {
    let database: "up" | "down" = "down";
    try {
      await prisma.$queryRaw`SELECT 1`;
      database = "up";
    } catch {
      database = "down";
    }

    const redis =
      !env.REDIS_ENABLED ? "disabled" : (await redisPing()) ? "up" : "down";

    sendSuccess(res, {
      status: "ok",
      service: env.APP_NAME,
      environment: env.NODE_ENV,
      databaseProvider: env.DATABASE_PROVIDER,
      checks: {
        database,
        redis,
      },
      timestamp: new Date().toISOString(),
    });
  })
);
