import { prisma } from "../../../infrastructure/database";
import { logger } from "../../../config/logger";
import { WAREHOUSE_TYPES } from "../domain/types";

/** Idempotent seed for warehouse types. */
export async function seedWarehouseTypes(): Promise<void> {
  for (const type of WAREHOUSE_TYPES) {
    const existing = await prisma.warehouseType.findUnique({
      where: { key: type.key },
    });
    if (existing) {
      await prisma.warehouseType.update({
        where: { id: existing.id },
        data: { name: type.name, description: type.description },
      });
    } else {
      await prisma.warehouseType.create({
        data: {
          key: type.key,
          name: type.name,
          description: type.description,
        },
      });
    }
  }

  logger.info(
    { count: WAREHOUSE_TYPES.length },
    "Warehouse types seeded"
  );
}
