import {
  ConflictError,
  ForbiddenError,
  NotFoundError,
  TenantIsolationError,
  ValidationError,
} from "../../../shared/errors";
import { eventBus } from "../../../infrastructure/events/event-bus";
import { inventoryService } from "../../inventory/application/inventory.service";
import { workflowService } from "../../workflow/application/workflow.service";
import { TRANSFER_EVENTS } from "../domain/statuses";
import {
  supplyChainRepository,
  SupplyChainRepository,
} from "../infrastructure/supply-chain.repository";

function parseDocs(json: string | null | undefined) {
  if (!json) return null;
  try {
    return JSON.parse(json);
  } catch {
    return json;
  }
}

function serialize<T extends { documentsJson?: string | null }>(t: T) {
  const { documentsJson, ...rest } = t;
  return { ...rest, documents: parseDocs(documentsJson) };
}

export class SupplyChainService {
  constructor(
    private readonly repo: SupplyChainRepository = supplyChainRepository
  ) {}

  async list(
    organizationId: string,
    filters?: { status?: string; direction?: "sent" | "received" }
  ) {
    const rows = await this.repo.listForOrg(organizationId, filters);
    return rows.map(serialize);
  }

  async getById(organizationId: string, transferId: string) {
    const transfer = await this.repo.findById(transferId);
    if (!transfer) throw new NotFoundError("Transfer not found");
    if (
      transfer.fromOrganizationId !== organizationId &&
      transfer.toOrganizationId !== organizationId
    ) {
      throw new TenantIsolationError("Transfer not visible to this organization");
    }
    return serialize(transfer);
  }

  async create(
    fromOrganizationId: string,
    userId: string,
    input: {
      toOrganizationId: string;
      fromWarehouseId: string;
      notes?: string;
      documents?: Record<string, unknown>;
      lines: Array<{
        batchId: string;
        packagingLevel: string;
        quantity: number;
      }>;
    }
  ) {
    if (input.toOrganizationId === fromOrganizationId) {
      throw new ValidationError("Cannot transfer to the same organization");
    }

    const toOrg = await this.repo.findOrg(input.toOrganizationId);
    if (!toOrg || toOrg.status !== "active") {
      throw new ValidationError("Receiver organization not found or not active");
    }

    const fromWh = await this.repo.findWarehouse(
      fromOrganizationId,
      input.fromWarehouseId
    );
    if (!fromWh) {
      throw new TenantIsolationError(
        "Source warehouse not found in this organization"
      );
    }

    for (const line of input.lines) {
      const batch = await this.repo.findBatch(line.batchId);
      if (!batch) throw new ValidationError(`Unknown batch: ${line.batchId}`);
      if (batch.recallStatus === "recalled") {
        throw new ConflictError(`Batch ${batch.batchNumber} is recalled`);
      }
    }

    const transfer = await this.repo.create({
      fromOrganizationId,
      toOrganizationId: input.toOrganizationId,
      fromWarehouseId: input.fromWarehouseId,
      notes: input.notes,
      documentsJson: input.documents
        ? JSON.stringify(input.documents)
        : null,
      createdByUserId: userId,
      lines: input.lines.map((l) => ({
        batchId: l.batchId,
        packagingLevel: l.packagingLevel.toUpperCase(),
        quantity: l.quantity,
      })),
    });

    await eventBus.emit(TRANSFER_EVENTS.CREATED, {
      transferId: transfer.id,
      fromOrganizationId,
      toOrganizationId: input.toOrganizationId,
    });

    return serialize(transfer);
  }

  async submit(
    organizationId: string,
    userId: string,
    transferId: string,
    opts?: { useWorkflow?: boolean }
  ) {
    const transfer = await this.requireSender(organizationId, transferId);
    if (transfer.status !== "draft") {
      throw new ConflictError("Only draft transfers can be submitted");
    }

    const updated = await this.repo.update(transferId, {
      status: "submitted",
      submittedAt: new Date(),
    });

    let approvalWorkflow = null;
    if (opts?.useWorkflow) {
      try {
        approvalWorkflow = await workflowService.startWorkflow({
          definitionKey: "custody.transfer.approval",
          subjectType: "custody_transfer",
          subjectId: transferId,
          organizationId,
          startedByUserId: userId,
        });
      } catch (err) {
        if (!(err instanceof ConflictError)) throw err;
      }
    }

    await eventBus.emit(TRANSFER_EVENTS.SUBMITTED, {
      transferId,
      organizationId,
      userId,
    });

    return { transfer: serialize(updated), approvalWorkflow };
  }

  async approve(organizationId: string, userId: string, transferId: string) {
    const transfer = await this.requireSender(organizationId, transferId);
    if (transfer.status !== "submitted") {
      throw new ConflictError("Only submitted transfers can be approved");
    }

    // Reserve stock for each line at source warehouse
    for (const line of transfer.lines) {
      await inventoryService.reserve(organizationId, userId, {
        warehouseId: transfer.fromWarehouseId,
        batchId: line.batchId,
        packagingLevel: line.packagingLevel,
        quantity: line.quantity,
        reason: `Custody transfer ${transferId} approved`,
        referenceType: "custody_transfer",
        referenceId: transferId,
      });
    }

    const updated = await this.repo.update(transferId, {
      status: "approved",
      approvedByUserId: userId,
      approvedAt: new Date(),
    });

    await eventBus.emit(TRANSFER_EVENTS.APPROVED, {
      transferId,
      organizationId,
      userId,
    });

    return serialize(updated);
  }

  async ship(organizationId: string, userId: string, transferId: string) {
    const transfer = await this.requireSender(organizationId, transferId);
    if (transfer.status !== "approved") {
      throw new ConflictError("Only approved transfers can be shipped");
    }

    for (const line of transfer.lines) {
      await inventoryService.consume(organizationId, userId, {
        warehouseId: transfer.fromWarehouseId,
        batchId: line.batchId,
        packagingLevel: line.packagingLevel,
        state: "reserved",
        quantity: line.quantity,
        reason: `Custody transfer ${transferId} shipped`,
        referenceType: "custody_transfer",
        referenceId: transferId,
      });
    }

    const updated = await this.repo.update(transferId, {
      status: "in_transit",
      shippedAt: new Date(),
    });

    await eventBus.emit(TRANSFER_EVENTS.SHIPPED, {
      transferId,
      organizationId,
      userId,
    });

    return serialize(updated);
  }

  async receive(
    organizationId: string,
    userId: string,
    transferId: string,
    input: { toWarehouseId: string; notes?: string }
  ) {
    const transfer = await this.requireReceiver(organizationId, transferId);
    if (transfer.status !== "in_transit") {
      throw new ConflictError("Only in-transit transfers can be received");
    }

    const toWh = await this.repo.findWarehouse(
      organizationId,
      input.toWarehouseId
    );
    if (!toWh) {
      throw new TenantIsolationError(
        "Destination warehouse not found in this organization"
      );
    }

    for (const line of transfer.lines) {
      await inventoryService.receive(organizationId, userId, {
        warehouseId: input.toWarehouseId,
        batchId: line.batchId,
        packagingLevel: line.packagingLevel,
        quantity: line.quantity,
        reason: `Custody transfer ${transferId} received`,
        allowForeignBatch: true,
      });
    }

    const updated = await this.repo.update(transferId, {
      status: "received",
      toWarehouseId: input.toWarehouseId,
      receivedByUserId: userId,
      receivedAt: new Date(),
      notes: input.notes ?? transfer.notes,
    });

    await eventBus.emit(TRANSFER_EVENTS.RECEIVED, {
      transferId,
      organizationId,
      userId,
      toWarehouseId: input.toWarehouseId,
    });

    return serialize(updated);
  }

  async reject(
    organizationId: string,
    userId: string,
    transferId: string,
    reason: string
  ) {
    const transfer = await this.requireSender(organizationId, transferId);
    if (transfer.status !== "submitted" && transfer.status !== "approved") {
      throw new ConflictError("Transfer cannot be rejected in current status");
    }

    // Release reservations if already approved
    if (transfer.status === "approved") {
      for (const line of transfer.lines) {
        await inventoryService.release(organizationId, userId, {
          warehouseId: transfer.fromWarehouseId,
          batchId: line.batchId,
          packagingLevel: line.packagingLevel,
          quantity: line.quantity,
          reason: `Custody transfer ${transferId} rejected`,
          referenceType: "custody_transfer",
          referenceId: transferId,
        });
      }
    }

    const updated = await this.repo.update(transferId, {
      status: "rejected",
      rejectedByUserId: userId,
      rejectReason: reason,
      rejectedAt: new Date(),
    });

    await eventBus.emit(TRANSFER_EVENTS.REJECTED, {
      transferId,
      organizationId,
      userId,
      reason,
    });

    return serialize(updated);
  }

  async cancel(organizationId: string, userId: string, transferId: string) {
    const transfer = await this.requireSender(organizationId, transferId);
    if (transfer.status !== "draft" && transfer.status !== "submitted") {
      throw new ConflictError("Only draft/submitted transfers can be cancelled");
    }

    const updated = await this.repo.update(transferId, {
      status: "cancelled",
    });

    await eventBus.emit(TRANSFER_EVENTS.CANCELLED, {
      transferId,
      organizationId,
      userId,
    });

    return serialize(updated);
  }

  private async requireSender(organizationId: string, transferId: string) {
    const transfer = await this.repo.findById(transferId);
    if (!transfer) throw new NotFoundError("Transfer not found");
    if (transfer.fromOrganizationId !== organizationId) {
      throw new ForbiddenError("Only the sending organization can perform this action");
    }
    return transfer;
  }

  private async requireReceiver(organizationId: string, transferId: string) {
    const transfer = await this.repo.findById(transferId);
    if (!transfer) throw new NotFoundError("Transfer not found");
    if (transfer.toOrganizationId !== organizationId) {
      throw new ForbiddenError(
        "Only the receiving organization can perform this action"
      );
    }
    return transfer;
  }
}

export const supplyChainService = new SupplyChainService();
