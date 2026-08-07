import { createApp } from "./app";
import { env } from "./config/env";
import { logger } from "./config/logger";
import {
  bootstrapInfrastructure,
  shutdownInfrastructure,
} from "./infrastructure";

async function main(): Promise<void> {
  await bootstrapInfrastructure();

  const app = createApp();

  const server = app.listen(env.PORT, () => {
    logger.info(
      {
        port: env.PORT,
        env: env.NODE_ENV,
        databaseProvider: env.DATABASE_PROVIDER,
        redisEnabled: env.REDIS_ENABLED,
        redisUrl: env.REDIS_URL,
      },
      `${env.APP_NAME} listening`
    );
    logger.info(`Health: ${env.APP_URL}/api/v1/health`);
    logger.info(`Docs:   ${env.APP_URL}/api-docs`);
  });

  const shutdown = async (signal: string) => {
    logger.info({ signal }, "Shutting down");
    server.close(async () => {
      await shutdownInfrastructure();
      process.exit(0);
    });
  };

  process.on("SIGINT", () => void shutdown("SIGINT"));
  process.on("SIGTERM", () => void shutdown("SIGTERM"));
}

main().catch(async (err) => {
  logger.fatal({ err }, "Failed to start server");
  await shutdownInfrastructure().catch(() => undefined);
  process.exit(1);
});
