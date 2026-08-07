import { ValidationError } from "../../../shared/errors";
import {
  analyticsRepository,
  AnalyticsRepository,
} from "../infrastructure/analytics.repository";

export class AnalyticsService {
  constructor(
    private readonly repo: AnalyticsRepository = analyticsRepository
  ) {}

  async platformOverview() {
    const [
      organizations,
      activeOrganizations,
      users,
      orders,
      sales,
      publishedListings,
      scans,
      paymentsSucceeded,
    ] = await Promise.all([
      this.repo.countOrgs(),
      this.repo.countActiveOrgs(),
      this.repo.countUsers(),
      this.repo.countOrders(),
      this.repo.sumOrderSales(),
      this.repo.countListings(undefined, "published"),
      this.repo.countScans(),
      this.repo.countPaymentsSucceeded(),
    ]);

    return {
      organizations,
      activeOrganizations,
      users,
      orders,
      orderRevenue: sales._sum.total ?? 0,
      paidOrderCount: sales._count,
      publishedListings,
      scans,
      paymentsSucceeded,
    };
  }

  async organizationOverview(organizationId: string) {
    if (!organizationId) throw new ValidationError("organizationId required");

    const [
      orders,
      sales,
      listings,
      publishedListings,
      batches,
      recalledBatches,
      scans,
      scanBreakdown,
      inventory,
      branches,
      warehouses,
      paymentsSucceeded,
    ] = await Promise.all([
      this.repo.countOrders(organizationId),
      this.repo.sumOrderSales(organizationId),
      this.repo.countListings(organizationId),
      this.repo.countListings(organizationId, "published"),
      this.repo.countBatches(organizationId),
      this.repo.countRecalledBatches(organizationId),
      this.repo.countScans(organizationId),
      this.repo.countScansByResult(organizationId),
      this.repo.inventoryTotals({ organizationId }),
      this.repo.countBranches(organizationId),
      this.repo.countWarehouses(organizationId),
      this.repo.countPaymentsSucceeded(organizationId),
    ]);

    return {
      organizationId,
      orders,
      orderRevenue: sales._sum.total ?? 0,
      paidOrderCount: sales._count,
      listings,
      publishedListings,
      batches,
      recalledBatches,
      scans,
      scansByResult: Object.fromEntries(
        scanBreakdown.map((r) => [r.result, r._count._all])
      ),
      inventory: {
        positions: inventory._count,
        available: inventory._sum.available ?? 0,
        reserved: inventory._sum.reserved ?? 0,
        damaged: inventory._sum.damaged ?? 0,
        expired: inventory._sum.expired ?? 0,
        sold: inventory._sum.sold ?? 0,
        inTransit: inventory._sum.inTransit ?? 0,
      },
      branches,
      warehouses,
      paymentsSucceeded,
    };
  }

  async branchOverview(organizationId: string, branchId: string) {
    const [inventory, warehouses] = await Promise.all([
      this.repo.inventoryTotals({ organizationId, branchId }),
      this.repo.countWarehouses(organizationId, branchId),
    ]);
    return {
      organizationId,
      branchId,
      warehouses,
      inventory: {
        positions: inventory._count,
        available: inventory._sum.available ?? 0,
        reserved: inventory._sum.reserved ?? 0,
      },
    };
  }

  async warehouseOverview(organizationId: string, warehouseId: string) {
    const inventory = await this.repo.inventoryTotals({
      organizationId,
      warehouseId,
    });
    return {
      organizationId,
      warehouseId,
      inventory: {
        positions: inventory._count,
        available: inventory._sum.available ?? 0,
        reserved: inventory._sum.reserved ?? 0,
        damaged: inventory._sum.damaged ?? 0,
        expired: inventory._sum.expired ?? 0,
        sold: inventory._sum.sold ?? 0,
      },
    };
  }

  async verification(organizationId: string) {
    const [scans, byResult] = await Promise.all([
      this.repo.countScans(organizationId),
      this.repo.countScansByResult(organizationId),
    ]);
    return {
      organizationId,
      scans,
      byResult: Object.fromEntries(
        byResult.map((r) => [r.result, r._count._all])
      ),
    };
  }

  async sales(organizationId: string) {
    const sales = await this.repo.sumOrderSales(organizationId);
    const orders = await this.repo.countOrders(organizationId);
    return {
      organizationId,
      orders,
      revenue: sales._sum.total ?? 0,
      paidOrders: sales._count,
    };
  }

  async inventory(organizationId: string) {
    const inventory = await this.repo.inventoryTotals({ organizationId });
    return {
      organizationId,
      positions: inventory._count,
      ...Object.fromEntries(
        Object.entries(inventory._sum).map(([k, v]) => [k, v ?? 0])
      ),
    };
  }
}

export const analyticsService = new AnalyticsService();
