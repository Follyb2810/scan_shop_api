import { prisma } from "../../../infrastructure/database";
import { BaseRepository } from "../../../infrastructure/database/base.repository";

export class AnalyticsRepository extends BaseRepository {
  countOrgs() {
    return this.db.organization.count({ where: { deletedAt: null } });
  }

  countActiveOrgs() {
    return this.db.organization.count({
      where: { deletedAt: null, status: "active" },
    });
  }

  countUsers() {
    return this.db.user.count({ where: { deletedAt: null } });
  }

  countOrders(organizationId?: string) {
    return this.db.order.count({
      where: organizationId ? { organizationId } : undefined,
    });
  }

  sumOrderSales(organizationId?: string) {
    return this.db.order.aggregate({
      where: {
        status: { in: ["paid", "confirmed", "processing", "shipped", "delivered"] },
        ...(organizationId ? { organizationId } : {}),
      },
      _sum: { total: true },
      _count: true,
    });
  }

  countListings(organizationId?: string, status?: string) {
    return this.db.listing.count({
      where: {
        deletedAt: null,
        ...(organizationId ? { organizationId } : {}),
        ...(status ? { status } : {}),
      },
    });
  }

  countBatches(organizationId?: string) {
    return this.db.batch.count({
      where: {
        deletedAt: null,
        ...(organizationId ? { organizationId } : {}),
      },
    });
  }

  countRecalledBatches(organizationId?: string) {
    return this.db.batch.count({
      where: {
        deletedAt: null,
        recallStatus: "recalled",
        ...(organizationId ? { organizationId } : {}),
      },
    });
  }

  countScans(organizationId?: string) {
    return this.db.scanEvent.count({
      where: organizationId ? { organizationId } : undefined,
    });
  }

  countScansByResult(organizationId?: string) {
    return this.db.scanEvent.groupBy({
      by: ["result"],
      where: organizationId ? { organizationId } : undefined,
      _count: { _all: true },
    });
  }

  inventoryTotals(filters: {
    organizationId: string;
    branchId?: string;
    warehouseId?: string;
  }) {
    return this.db.inventoryPosition.aggregate({
      where: {
        organizationId: filters.organizationId,
        ...(filters.branchId ? { branchId: filters.branchId } : {}),
        ...(filters.warehouseId ? { warehouseId: filters.warehouseId } : {}),
      },
      _sum: {
        available: true,
        reserved: true,
        damaged: true,
        expired: true,
        quarantined: true,
        inTransit: true,
        sold: true,
      },
      _count: true,
    });
  }

  countBranches(organizationId: string) {
    return this.db.branch.count({
      where: { organizationId, deletedAt: null },
    });
  }

  countWarehouses(organizationId: string, branchId?: string) {
    return this.db.warehouse.count({
      where: {
        organizationId,
        deletedAt: null,
        ...(branchId ? { branchId } : {}),
      },
    });
  }

  countPaymentsSucceeded(organizationId?: string) {
    return this.db.payment.count({
      where: {
        status: "succeeded",
        ...(organizationId ? { organizationId } : {}),
      },
    });
  }
}

export const analyticsRepository = new AnalyticsRepository(prisma);
