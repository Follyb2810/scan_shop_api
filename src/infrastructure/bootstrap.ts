import { container, tokens } from "../shared/di";
import { logger } from "../config/logger";
import { env } from "../config/env";
import { connectRedis, disconnectRedis, getRedis } from "./cache/redis.client";
import { prisma, disconnectPrisma } from "./database/prisma.client";
import { eventBus } from "./events/event-bus";
import { closeQueues } from "./queue/queues";
import { seedRbacCatalog } from "../modules/rbac/infrastructure/seed";
import { seedOrganizationTypes } from "../modules/organization/infrastructure/seed-types";
import { registerOrganizationWorkflowHandlers } from "../modules/organization/infrastructure/workflow-hooks";
import { seedWorkflowDefinitions } from "../modules/workflow/infrastructure/seed";
import { seedCatalogReferenceData } from "../modules/catalog/infrastructure/seed";
import { registerCatalogWorkflowHandlers } from "../modules/catalog/infrastructure/workflow-hooks";
import { registerBatchWorkflowHandlers } from "../modules/batch/infrastructure/workflow-hooks";
import { seedWarehouseTypes } from "../modules/warehouse/infrastructure/seed";
import { registerSupplyChainWorkflowHandlers } from "../modules/supply-chain/infrastructure/workflow-hooks";
import {
  registerMarketplaceWorkflowHandlers,
  seedMarketplaceReferenceData,
} from "../modules/marketplace";
import { registerAuditEventHandlers } from "../modules/audit";
import { registerNotificationEventHandlers } from "../modules/notification";
import { startNotificationWorkers } from "../modules/notification";

let bootstrapped = false;

/**
 * Register shared infrastructure in the DI container and warm connections.
 */
export async function bootstrapInfrastructure(): Promise<void> {
  if (bootstrapped) return;

  container.registerValue(tokens.prisma, prisma);
  container.registerValue(tokens.logger, logger);
  container.registerValue(tokens.eventBus, eventBus);

  const redisOk = await connectRedis();
  if (redisOk) {
    container.registerValue(tokens.redis, getRedis());
  }

  registerOrganizationWorkflowHandlers();
  registerCatalogWorkflowHandlers();
  registerBatchWorkflowHandlers();
  registerSupplyChainWorkflowHandlers();
  registerMarketplaceWorkflowHandlers();
  registerAuditEventHandlers();
  registerNotificationEventHandlers();
  startNotificationWorkers();

  try {
    await seedOrganizationTypes();
    await seedRbacCatalog();
    await seedWorkflowDefinitions();
    await seedCatalogReferenceData();
    await seedWarehouseTypes();
    await seedMarketplaceReferenceData();
  } catch (err) {
    logger.warn({ err }, "Catalog seed skipped/failed (will retry on next boot)");
  }

  bootstrapped = true;
  logger.info(
    {
      databaseProvider: env.DATABASE_PROVIDER,
      redisEnabled: env.REDIS_ENABLED,
      redisReady: redisOk,
    },
    "Infrastructure bootstrapped"
  );
}

export async function shutdownInfrastructure(): Promise<void> {
  await closeQueues().catch(() => undefined);
  await disconnectRedis().catch(() => undefined);
  await disconnectPrisma().catch(() => undefined);
  container.clear();
  eventBus.clear();
  bootstrapped = false;
  logger.info("Infrastructure shut down");
}
