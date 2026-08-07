import { prisma } from "../../../infrastructure/database";
import { logger } from "../../../config/logger";
import { ORGANIZATION_TYPES } from "../domain/organization-types";

export async function seedOrganizationTypes(): Promise<void> {
  for (const t of ORGANIZATION_TYPES) {
    await prisma.organizationType.upsert({
      where: { key: t.key },
      create: {
        key: t.key,
        name: t.name,
        description: t.description,
      },
      update: {
        name: t.name,
        description: t.description,
      },
    });
  }
  logger.info(
    { count: ORGANIZATION_TYPES.length },
    "Organization types seeded"
  );
}
