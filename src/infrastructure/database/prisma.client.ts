import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client";
import { env } from "../../config/env";
import { logger } from "../../config/logger";

export type AppPrismaClient = PrismaClient;

const createPrismaClient = (): AppPrismaClient => {
  if (env.DATABASE_PROVIDER === "postgresql") {
    logger.info("Initializing Prisma with PostgreSQL adapter");
    const adapter = new PrismaPg({ connectionString: env.DATABASE_URL });
    return new PrismaClient({ adapter });
  }

  logger.info("Initializing Prisma with SQLite adapter");
  const adapter = new PrismaBetterSqlite3({ url: env.DATABASE_URL });
  return new PrismaClient({ adapter });
};

declare global {
  // eslint-disable-next-line no-var
  var __prismaGlobal: AppPrismaClient | undefined;
}

export const prisma: AppPrismaClient =
  globalThis.__prismaGlobal ?? createPrismaClient();

if (env.NODE_ENV !== "production") {
  globalThis.__prismaGlobal = prisma;
}

export async function disconnectPrisma(): Promise<void> {
  await prisma.$disconnect();
}
