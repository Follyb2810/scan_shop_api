import { prisma } from "../../src/infrastructure/database";

export async function assertDatabaseReachable(): Promise<void> {
  await prisma.$queryRaw`SELECT 1`;
}

export { prisma };
