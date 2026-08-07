import { prisma, AppPrismaClient } from "./prisma.client";

export type TransactionClient = Omit<
  AppPrismaClient,
  "$connect" | "$disconnect" | "$on" | "$transaction" | "$extends" | "$use"
>;

/**
 * Run work inside a Prisma interactive transaction.
 */
export async function withTransaction<T>(
  fn: (tx: TransactionClient) => Promise<T>,
  options?: {
    maxWait?: number;
    timeout?: number;
  }
): Promise<T> {
  return prisma.$transaction(async (tx) => fn(tx as TransactionClient), {
    maxWait: options?.maxWait ?? 5_000,
    timeout: options?.timeout ?? 15_000,
  });
}
