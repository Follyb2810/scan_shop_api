import dotenv from "dotenv";
import { seedRbacCatalog } from "../src/modules/rbac/infrastructure/seed";
import { seedOrganizationTypes } from "../src/modules/organization/infrastructure/seed-types";
import { seedWorkflowDefinitions } from "../src/modules/workflow/infrastructure/seed";
import { seedCatalogReferenceData } from "../src/modules/catalog/infrastructure/seed";
import { seedWarehouseTypes } from "../src/modules/warehouse/infrastructure/seed";
import { seedMarketplaceReferenceData } from "../src/modules/marketplace/infrastructure/seed";

export default async function globalSetup(): Promise<void> {
  dotenv.config();
  process.env.NODE_ENV = process.env.NODE_ENV || "test";
  process.env.DATABASE_PROVIDER = process.env.DATABASE_PROVIDER || "sqlite";
  process.env.DATABASE_URL = process.env.DATABASE_URL || "file:./dev.db";
  process.env.REDIS_ENABLED = process.env.REDIS_ENABLED || "false";
  process.env.LOG_LEVEL = process.env.LOG_LEVEL || "silent";

  await seedOrganizationTypes();
  await seedRbacCatalog();
  await seedWorkflowDefinitions();
  await seedCatalogReferenceData();
  await seedWarehouseTypes();
  await seedMarketplaceReferenceData();
}
