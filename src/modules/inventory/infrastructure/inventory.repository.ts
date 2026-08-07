import { prisma } from "../../../infrastructure/database";
import { BaseRepository } from "../../../infrastructure/database/base.repository";
import { TransactionClient } from "../../../infrastructure/database/transaction";
import { StockState } from "../domain/states";

const positionInclude = {
  warehouse: {
    select: { id: true, name: true, code: true, branchId: true, status: true },
  },
  batch: {
    select: {
      id: true,
      batchNumber: true,
      lotNumber: true,
      expiryDate: true,
      qaStatus: true,
      recallStatus: true,
    },
  },
  branch: { select: { id: true, name: true, code: true } },
} as const;

export type DbClient = typeof prisma | TransactionClient;

export class InventoryRepository {
  constructor(private readonly db: DbClient = prisma) {}

  withClient(client: DbClient) {
    return new InventoryRepository(client);
  }

  findWarehouse(organizationId: string, warehouseId: string) {
    return this.db.warehouse.findFirst({
      where: { id: warehouseId, organizationId, deletedAt: null },
    });
  }

  findBatch(organizationId: string, batchId: string) {
    return this.db.batch.findFirst({
      where: { id: batchId, organizationId, deletedAt: null },
    });
  }

  /** Cross-org batch lookup (custody receive holds manufacturer batches). */
  findBatchById(batchId: string) {
    return this.db.batch.findFirst({
      where: { id: batchId, deletedAt: null },
    });
  }

  findPositionById(organizationId: string, id: string) {
    return this.db.inventoryPosition.findFirst({
      where: { id, organizationId },
      include: positionInclude,
    });
  }

  findPositionKey(
    organizationId: string,
    warehouseId: string,
    batchId: string,
    packagingLevel: string
  ) {
    return this.db.inventoryPosition.findFirst({
      where: {
        organizationId,
        warehouseId,
        batchId,
        packagingLevel,
      },
      include: positionInclude,
    });
  }

  listPositions(
    organizationId: string,
    filters?: {
      warehouseId?: string;
      branchId?: string;
      batchId?: string;
    }
  ) {
    return this.db.inventoryPosition.findMany({
      where: {
        organizationId,
        warehouseId: filters?.warehouseId,
        branchId: filters?.branchId,
        batchId: filters?.batchId,
      },
      include: positionInclude,
      orderBy: { updatedAt: "desc" },
    });
  }

  listMovements(
    organizationId: string,
    filters?: { positionId?: string; take?: number }
  ) {
    return this.db.inventoryMovement.findMany({
      where: {
        organizationId,
        positionId: filters?.positionId,
      },
      orderBy: { createdAt: "desc" },
      take: filters?.take ?? 100,
      include: {
        position: {
          select: {
            id: true,
            warehouseId: true,
            batchId: true,
            packagingLevel: true,
          },
        },
      },
    });
  }

  createPosition(data: {
    organizationId: string;
    branchId: string;
    warehouseId: string;
    batchId: string;
    packagingLevel: string;
  }) {
    return this.db.inventoryPosition.create({
      data: {
        organizationId: data.organizationId,
        branchId: data.branchId,
        warehouseId: data.warehouseId,
        batchId: data.batchId,
        packagingLevel: data.packagingLevel,
      },
      include: positionInclude,
    });
  }

  /**
   * Atomic state move: decrement fromState, increment toState when fromState >= qty.
   * Returns number of rows updated (0 = insufficient / version mismatch).
   */
  moveQuantity(args: {
    organizationId: string;
    positionId: string;
    fromState: StockState;
    toState: StockState;
    quantity: number;
    expectedVersion?: number;
  }) {
    const { organizationId, positionId, fromState, toState, quantity } = args;
    if (fromState === toState) {
      return Promise.resolve({ count: 0 });
    }

    return this.db.inventoryPosition.updateMany({
      where: {
        id: positionId,
        organizationId,
        [fromState]: { gte: quantity },
        ...(args.expectedVersion !== undefined
          ? { version: args.expectedVersion }
          : {}),
      },
      data: {
        [fromState]: { decrement: quantity },
        [toState]: { increment: quantity },
        version: { increment: 1 },
      },
    });
  }

  /**
   * Atomic increment of a single state (e.g. receive into available).
   */
  incrementState(args: {
    organizationId: string;
    positionId: string;
    state: StockState;
    quantity: number;
  }) {
    return this.db.inventoryPosition.updateMany({
      where: {
        id: args.positionId,
        organizationId: args.organizationId,
      },
      data: {
        [args.state]: { increment: args.quantity },
        version: { increment: 1 },
      },
    });
  }

  /** Atomic decrement of a single state when quantity is available. */
  decrementState(args: {
    organizationId: string;
    positionId: string;
    state: StockState;
    quantity: number;
  }) {
    return this.db.inventoryPosition.updateMany({
      where: {
        id: args.positionId,
        organizationId: args.organizationId,
        [args.state]: { gte: args.quantity },
      },
      data: {
        [args.state]: { decrement: args.quantity },
        version: { increment: 1 },
      },
    });
  }

  createMovement(data: {
    organizationId: string;
    positionId: string;
    type: string;
    quantity: number;
    fromState?: string | null;
    toState?: string | null;
    reason?: string | null;
    actorUserId?: string | null;
    referenceType?: string | null;
    referenceId?: string | null;
  }) {
    return this.db.inventoryMovement.create({
      data: {
        organizationId: data.organizationId,
        positionId: data.positionId,
        type: data.type,
        quantity: data.quantity,
        fromState: data.fromState ?? null,
        toState: data.toState ?? null,
        reason: data.reason ?? null,
        actorUserId: data.actorUserId ?? null,
        referenceType: data.referenceType ?? null,
        referenceId: data.referenceId ?? null,
      },
    });
  }
}

export const inventoryRepository = new InventoryRepository(prisma);
