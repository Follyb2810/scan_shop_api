import { seedRbacCatalog } from "../modules/rbac/infrastructure/seed";
import { logger } from "../config/logger";

async function main() {
  await seedRbacCatalog();
  logger.info("RBAC seed complete");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
