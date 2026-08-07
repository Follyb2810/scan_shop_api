import {
  ConflictError,
  NotFoundError,
  TenantIsolationError,
  ValidationError,
} from "../../../shared/errors";
import { withTransaction } from "../../../infrastructure/database/transaction";
import { StockState } from "../domain/states";
import {
  inventoryRepository,
  InventoryRepository,
} from "../infrastructure/inventory.repository";

const MAX_RETRIES = 8;

function isRetryableConflict(err: unknown): boolean {
  if (
    err instanceof ConflictError &&
    typeof err.details === "object" &&
    !!err.details &&
    "retryable" in err.details
  ) {
    return true;
  }
  // Prisma interactive transaction / write conflict (common on SQLite under load)
  if (
    typeof err === "object" &&
    err &&
    "code" in err &&
    ["P2034", "P2028"].includes((err as { code: string }).code)
  ) {
    return true;
  }
  const msg = err instanceof Error ? err.message : String(err);
  return /deadlock|database is locked|write conflict|transaction/i.test(msg);
}

export class InventoryService {
  constructor(private readonly repo: InventoryRepository = inventoryRepository) {}

  list(
    organizationId: string,
    filters?: { warehouseId?: string; branchId?: string; batchId?: string }
  ) {
    return this.repo.listPositions(organizationId, filters);
  }

  listMovements(
    organizationId: string,
    filters?: { positionId?: string; take?: number }
  ) {
    return this.repo.listMovements(organizationId, filters);
  }

  async getPosition(organizationId: string, positionId: string) {
    const position = await this.repo.findPositionById(
      organizationId,
      positionId
    );
    if (!position) throw new NotFoundError("Inventory position not found");
    return position;
  }

  /** Receive stock into `available` (creates position if needed). */
  async receive(
    organizationId: string,
    actorUserId: string,
    input: {
      warehouseId: string;
      batchId: string;
      packagingLevel: string;
      quantity: number;
      reason?: string;
      /** Custody transfers may stock batches owned by the sender org. */
      allowForeignBatch?: boolean;
    }
  ) {
    const packagingLevel = input.packagingLevel.toUpperCase();
    const warehouse = await this.repo.findWarehouse(
      organizationId,
      input.warehouseId
    );
    if (!warehouse) {
      throw new TenantIsolationError("Warehouse not found in this organization");
    }
    if (warehouse.status !== "active") {
      throw new ValidationError("Cannot receive into inactive warehouse");
    }

    const batch = input.allowForeignBatch
      ? await this.repo.findBatchById(input.batchId)
      : await this.repo.findBatch(organizationId, input.batchId);
    if (!batch) {
      throw new TenantIsolationError(
        input.allowForeignBatch
          ? "Batch not found"
          : "Batch not found in this organization"
      );
    }
    if (batch.recallStatus === "recalled") {
      throw new ConflictError("Cannot receive recalled batch into inventory");
    }

    return withTransaction(async (tx) => {
      const r = this.repo.withClient(tx);
      const position = await this.ensurePosition(r, {
        organizationId,
        branchId: warehouse.branchId,
        warehouseId: input.warehouseId,
        batchId: input.batchId,
        packagingLevel,
      });

      await r.incrementState({
        organizationId,
        positionId: position.id,
        state: "available",
        quantity: input.quantity,
      });

      await r.createMovement({
        organizationId,
        positionId: position.id,
        type: "receive",
        quantity: input.quantity,
        fromState: null,
        toState: "available",
        reason: input.reason ?? "Stock receive",
        actorUserId,
      });

      return r.findPositionById(organizationId, position.id);
    });
  }

  async reserve(
    organizationId: string,
    actorUserId: string,
    input: {
      warehouseId: string;
      batchId: string;
      packagingLevel: string;
      quantity: number;
      reason?: string;
      referenceType?: string;
      referenceId?: string;
    }
  ) {
    return this.moveBetweenStates(organizationId, actorUserId, {
      warehouseId: input.warehouseId,
      batchId: input.batchId,
      packagingLevel: input.packagingLevel.toUpperCase(),
      quantity: input.quantity,
      fromState: "available",
      toState: "reserved",
      type: "reserve",
      reason: input.reason ?? "Reserve stock",
      referenceType: input.referenceType,
      referenceId: input.referenceId,
    });
  }

  async release(
    organizationId: string,
    actorUserId: string,
    input: {
      warehouseId: string;
      batchId: string;
      packagingLevel: string;
      quantity: number;
      reason?: string;
      referenceType?: string;
      referenceId?: string;
    }
  ) {
    return this.moveBetweenStates(organizationId, actorUserId, {
      warehouseId: input.warehouseId,
      batchId: input.batchId,
      packagingLevel: input.packagingLevel.toUpperCase(),
      quantity: input.quantity,
      fromState: "reserved",
      toState: "available",
      type: "release",
      reason: input.reason ?? "Release reservation",
      referenceType: input.referenceType,
      referenceId: input.referenceId,
    });
  }

  async adjust(
    organizationId: string,
    actorUserId: string,
    input: {
      warehouseId: string;
      batchId: string;
      packagingLevel: string;
      fromState: StockState;
      toState: StockState;
      quantity: number;
      reason?: string;
    }
  ) {
    if (input.fromState === input.toState) {
      throw new ValidationError("fromState and toState must differ");
    }

    return this.moveBetweenStates(organizationId, actorUserId, {
      warehouseId: input.warehouseId,
      batchId: input.batchId,
      packagingLevel: input.packagingLevel.toUpperCase(),
      quantity: input.quantity,
      fromState: input.fromState,
      toState: input.toState,
      type: "adjust",
      reason: input.reason ?? `Adjust ${input.fromState} → ${input.toState}`,
    });
  }

  /**
   * Remove quantity from a state without adding elsewhere (e.g. ship out).
   */
  async consume(
    organizationId: string,
    actorUserId: string,
    input: {
      warehouseId: string;
      batchId: string;
      packagingLevel: string;
      state: StockState;
      quantity: number;
      reason?: string;
      referenceType?: string;
      referenceId?: string;
    }
  ) {
    const packagingLevel = input.packagingLevel.toUpperCase();
    const warehouse = await this.repo.findWarehouse(
      organizationId,
      input.warehouseId
    );
    if (!warehouse) {
      throw new TenantIsolationError("Warehouse not found in this organization");
    }

    let lastError: unknown;
    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
      try {
        return await withTransaction(async (tx) => {
          const r = this.repo.withClient(tx);
          const position = await r.findPositionKey(
            organizationId,
            input.warehouseId,
            input.batchId,
            packagingLevel
          );
          if (!position) {
            throw new ConflictError(`Insufficient ${input.state} quantity`, {
              [input.state]: 0,
            });
          }

          const current =
            Number(
              (position as unknown as Record<string, unknown>)[input.state]
            ) || 0;
          if (current < input.quantity) {
            throw new ConflictError(`Insufficient ${input.state} quantity`, {
              [input.state]: current,
            });
          }

          const result = await r.decrementState({
            organizationId,
            positionId: position.id,
            state: input.state,
            quantity: input.quantity,
          });
          if (result.count === 0) {
            throw new ConflictError(`Insufficient ${input.state} quantity`, {
              retryable: true,
            });
          }

          await r.createMovement({
            organizationId,
            positionId: position.id,
            type: "transfer_out",
            quantity: input.quantity,
            fromState: input.state,
            toState: null,
            reason: input.reason ?? "Stock consumed / shipped",
            actorUserId,
            referenceType: input.referenceType,
            referenceId: input.referenceId,
          });

          return r.findPositionById(organizationId, position.id);
        });
      } catch (err) {
        lastError = err;
        if (isRetryableConflict(err)) continue;
        throw err;
      }
    }

    throw lastError instanceof Error
      ? lastError
      : new ConflictError(`Insufficient ${input.state} quantity`);
  }

  /**
   * Transfer available stock between warehouses in the same org.
   * Atomic: decrement source available, increment destination available.
   */
  async transfer(
    organizationId: string,
    actorUserId: string,
    input: {
      fromWarehouseId: string;
      toWarehouseId: string;
      batchId: string;
      packagingLevel: string;
      quantity: number;
      reason?: string;
    }
  ) {
    if (input.fromWarehouseId === input.toWarehouseId) {
      throw new ValidationError("Source and destination warehouses must differ");
    }

    const packagingLevel = input.packagingLevel.toUpperCase();
    const fromWh = await this.repo.findWarehouse(
      organizationId,
      input.fromWarehouseId
    );
    const toWh = await this.repo.findWarehouse(
      organizationId,
      input.toWarehouseId
    );
    if (!fromWh || !toWh) {
      throw new TenantIsolationError(
        "Warehouse not found in this organization"
      );
    }

    const batch = await this.repo.findBatch(organizationId, input.batchId);
    if (!batch) {
      throw new TenantIsolationError("Batch not found in this organization");
    }

    let lastError: unknown;
    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
      try {
        return await withTransaction(async (tx) => {
          const r = this.repo.withClient(tx);
          const source = await r.findPositionKey(
            organizationId,
            input.fromWarehouseId,
            input.batchId,
            packagingLevel
          );
          if (!source) {
            throw new ConflictError("Insufficient available stock to transfer", {
              available: 0,
            });
          }

          // Atomic: remove from available without parking in another bucket
          const deducted = await tx.inventoryPosition.updateMany({
            where: {
              id: source.id,
              organizationId,
              available: { gte: input.quantity },
            },
            data: {
              available: { decrement: input.quantity },
              version: { increment: 1 },
            },
          });
          if (deducted.count === 0) {
            throw new ConflictError("Insufficient available stock to transfer", {
              retryable: true,
            });
          }

          const dest = await this.ensurePosition(r, {
            organizationId,
            branchId: toWh.branchId,
            warehouseId: input.toWarehouseId,
            batchId: input.batchId,
            packagingLevel,
          });

          await r.incrementState({
            organizationId,
            positionId: dest.id,
            state: "available",
            quantity: input.quantity,
          });

          await r.createMovement({
            organizationId,
            positionId: source.id,
            type: "transfer_out",
            quantity: input.quantity,
            fromState: "available",
            toState: null,
            reason: input.reason ?? "Transfer out",
            actorUserId,
            referenceType: "warehouse",
            referenceId: input.toWarehouseId,
          });

          await r.createMovement({
            organizationId,
            positionId: dest.id,
            type: "transfer_in",
            quantity: input.quantity,
            fromState: null,
            toState: "available",
            reason: input.reason ?? "Transfer in",
            actorUserId,
            referenceType: "warehouse",
            referenceId: input.fromWarehouseId,
          });

          const [fromPosition, toPosition] = await Promise.all([
            r.findPositionById(organizationId, source.id),
            r.findPositionById(organizationId, dest.id),
          ]);

          return { from: fromPosition, to: toPosition };
        });
      } catch (err) {
        lastError = err;
        if (isRetryableConflict(err)) continue;
        throw err;
      }
    }

    throw lastError instanceof Error
      ? lastError
      : new ConflictError("Insufficient available stock to transfer");
  }

  private async moveBetweenStates(
    organizationId: string,
    actorUserId: string,
    input: {
      warehouseId: string;
      batchId: string;
      packagingLevel: string;
      quantity: number;
      fromState: StockState;
      toState: StockState;
      type: string;
      reason: string;
      referenceType?: string;
      referenceId?: string;
    }
  ) {
    const warehouse = await this.repo.findWarehouse(
      organizationId,
      input.warehouseId
    );
    if (!warehouse) {
      throw new TenantIsolationError("Warehouse not found in this organization");
    }

    let lastError: unknown;
    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
      try {
        return await withTransaction(async (tx) => {
          const r = this.repo.withClient(tx);
          const position = await r.findPositionKey(
            organizationId,
            input.warehouseId,
            input.batchId,
            input.packagingLevel
          );
          if (!position) {
            throw new ConflictError(
              `Insufficient ${input.fromState} quantity`,
              { available: 0 }
            );
          }

          const current =
            Number((position as unknown as Record<string, unknown>)[input.fromState]) ||
            0;
          if (current < input.quantity) {
            throw new ConflictError(
              `Insufficient ${input.fromState} quantity`,
              { [input.fromState]: current }
            );
          }

          const result = await r.moveQuantity({
            organizationId,
            positionId: position.id,
            fromState: input.fromState,
            toState: input.toState,
            quantity: input.quantity,
          });

          if (result.count === 0) {
            // Lost a race — retry
            throw new ConflictError(
              `Insufficient ${input.fromState} quantity`,
              { retryable: true }
            );
          }

          await r.createMovement({
            organizationId,
            positionId: position.id,
            type: input.type,
            quantity: input.quantity,
            fromState: input.fromState,
            toState: input.toState,
            reason: input.reason,
            actorUserId,
            referenceType: input.referenceType,
            referenceId: input.referenceId,
          });

          return r.findPositionById(organizationId, position.id);
        });
      } catch (err) {
        lastError = err;
        if (isRetryableConflict(err)) continue;
        throw err;
      }
    }

    throw lastError instanceof Error
      ? lastError
      : new ConflictError(`Insufficient ${input.fromState} quantity`);
  }

  private async ensurePosition(
    repo: InventoryRepository,
    data: {
      organizationId: string;
      branchId: string;
      warehouseId: string;
      batchId: string;
      packagingLevel: string;
    }
  ) {
    const existing = await repo.findPositionKey(
      data.organizationId,
      data.warehouseId,
      data.batchId,
      data.packagingLevel
    );
    if (existing) return existing;

    try {
      return await repo.createPosition(data);
    } catch (err: unknown) {
      if (
        typeof err === "object" &&
        err &&
        "code" in err &&
        (err as { code: string }).code === "P2002"
      ) {
        const again = await repo.findPositionKey(
          data.organizationId,
          data.warehouseId,
          data.batchId,
          data.packagingLevel
        );
        if (again) return again;
      }
      throw err;
    }
  }
}

export const inventoryService = new InventoryService();
