import { AppPrismaClient, prisma } from "./prisma.client";
import { TransactionClient } from "./transaction";

/**
 * Thin base for repositories. Domain repos should prefer explicit methods
 * over generic CRUD god-objects.
 */
export abstract class BaseRepository {
  constructor(protected readonly db: AppPrismaClient | TransactionClient = prisma) {}

  protected requireTenantId(organizationId?: string): string {
    if (!organizationId) {
      throw new Error("organizationId (tenant) is required for this query");
    }
    return organizationId;
  }
}
