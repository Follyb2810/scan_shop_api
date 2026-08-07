import {
  ConflictError,
  NotFoundError,
  TenantIsolationError,
  ValidationError,
} from "../../../shared/errors";
import { eventBus } from "../../../infrastructure/events/event-bus";
import { workflowService } from "../../workflow/application/workflow.service";
import {
  BATCH_EVENTS,
  BatchQaStatus,
  QA_TRANSITIONS,
} from "../domain/statuses";
import {
  batchRepository,
  BatchRepository,
} from "../infrastructure/batch.repository";

function parseJson(value: string | null | undefined): unknown {
  if (!value) return null;
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

function serializeBatch<T extends {
  certificatesJson?: string | null;
  documentsJson?: string | null;
}>(batch: T) {
  const { certificatesJson, documentsJson, ...rest } = batch;
  return {
    ...rest,
    certificates: parseJson(certificatesJson),
    documents: parseJson(documentsJson),
  };
}

export class BatchService {
  constructor(private readonly repo: BatchRepository = batchRepository) {}

  async list(
    organizationId: string,
    filters?: { qaStatus?: string; recallStatus?: string }
  ) {
    const rows = await this.repo.list(organizationId, filters);
    return rows.map(serializeBatch);
  }

  async getById(organizationId: string, batchId: string) {
    const batch = await this.repo.findById(organizationId, batchId);
    if (!batch) throw new NotFoundError("Batch not found");
    return serializeBatch(batch);
  }

  async create(
    organizationId: string,
    userId: string,
    input: {
      packageDefinitionId: string;
      batchNumber: string;
      lotNumber?: string;
      manufactureDate: Date;
      expiryDate: Date;
      productionQuantity: number;
      currentQuantity?: number;
      nafdacRegistration?: string;
      notes?: string;
      certificates?: Record<string, unknown>;
      documents?: Record<string, unknown>;
    }
  ) {
    const pkg = await this.repo.findPackage(
      organizationId,
      input.packageDefinitionId
    );
    if (!pkg) {
      throw new TenantIsolationError(
        "Package definition not found in this organization"
      );
    }

    if (input.expiryDate.getTime() < input.manufactureDate.getTime()) {
      throw new ValidationError("expiryDate must be on or after manufactureDate");
    }

    const batchNumber = input.batchNumber.toUpperCase();
    const existing = await this.repo.findByBatchNumber(
      organizationId,
      batchNumber
    );
    if (existing) {
      throw new ConflictError("Batch number already exists in this organization");
    }

    const currentQuantity = input.currentQuantity ?? input.productionQuantity;
    if (currentQuantity > input.productionQuantity) {
      throw new ValidationError(
        "currentQuantity cannot exceed productionQuantity"
      );
    }

    const batch = await this.repo.create({
      organizationId,
      packageDefinitionId: input.packageDefinitionId,
      batchNumber,
      lotNumber: input.lotNumber,
      manufactureDate: input.manufactureDate,
      expiryDate: input.expiryDate,
      productionQuantity: input.productionQuantity,
      currentQuantity,
      nafdacRegistration: input.nafdacRegistration,
      notes: input.notes,
      certificatesJson: input.certificates
        ? JSON.stringify(input.certificates)
        : null,
      documentsJson: input.documents
        ? JSON.stringify(input.documents)
        : null,
    });

    await eventBus.emit(BATCH_EVENTS.CREATED, {
      batchId: batch.id,
      organizationId,
      batchNumber,
      createdByUserId: userId,
    });

    return serializeBatch(batch);
  }

  async update(
    organizationId: string,
    batchId: string,
    input: {
      lotNumber?: string | null;
      notes?: string | null;
      nafdacRegistration?: string | null;
      certificates?: Record<string, unknown> | null;
      documents?: Record<string, unknown> | null;
    }
  ) {
    const existing = await this.repo.findById(organizationId, batchId);
    if (!existing) throw new NotFoundError("Batch not found");

    await this.repo.update(organizationId, batchId, {
      lotNumber: input.lotNumber,
      notes: input.notes,
      nafdacRegistration: input.nafdacRegistration,
      certificatesJson:
        input.certificates === undefined
          ? undefined
          : input.certificates === null
            ? null
            : JSON.stringify(input.certificates),
      documentsJson:
        input.documents === undefined
          ? undefined
          : input.documents === null
            ? null
            : JSON.stringify(input.documents),
    });

    return this.getById(organizationId, batchId);
  }

  /**
   * Direct QA status transition (permission-gated by route).
   * Optionally starts batch.qa.approval when moving to in_review with useWorkflow.
   */
  async transitionQa(
    organizationId: string,
    batchId: string,
    userId: string,
    input: {
      status: BatchQaStatus;
      comment?: string;
      useWorkflow?: boolean;
    }
  ) {
    const batch = await this.repo.findById(organizationId, batchId);
    if (!batch) throw new NotFoundError("Batch not found");

    const current = batch.qaStatus as BatchQaStatus;
    const allowed = QA_TRANSITIONS[current] ?? [];
    if (!allowed.includes(input.status)) {
      throw new ConflictError(
        `Cannot transition QA from ${current} to ${input.status}`,
        { current, target: input.status, allowed }
      );
    }

    if (batch.recallStatus === "recalled" && input.status === "passed") {
      throw new ConflictError("Recalled batches cannot be marked QA passed");
    }

    await this.repo.update(organizationId, batchId, {
      qaStatus: input.status,
    });

    let approvalWorkflow = null;
    if (input.status === "in_review" && input.useWorkflow) {
      try {
        approvalWorkflow = await workflowService.startWorkflow({
          definitionKey: "batch.qa.approval",
          subjectType: "batch",
          subjectId: batchId,
          organizationId,
          startedByUserId: userId,
        });
      } catch (err) {
        if (!(err instanceof ConflictError)) throw err;
      }
    }

    await eventBus.emit(BATCH_EVENTS.QA_UPDATED, {
      batchId,
      organizationId,
      from: current,
      to: input.status,
      actorUserId: userId,
      comment: input.comment ?? null,
    });

    const updated = await this.getById(organizationId, batchId);
    return { batch: updated, approvalWorkflow };
  }

  /**
   * request → recallStatus pending + recall.approval workflow
   * clear → only from pending (cancel request) if no open workflow needed
   */
  async manageRecall(
    organizationId: string,
    batchId: string,
    userId: string,
    input: { action: "request" | "clear"; comment?: string }
  ) {
    const batch = await this.repo.findById(organizationId, batchId);
    if (!batch) throw new NotFoundError("Batch not found");

    if (input.action === "request") {
      if (batch.recallStatus === "recalled") {
        throw new ConflictError("Batch is already recalled");
      }
      if (batch.recallStatus === "pending") {
        throw new ConflictError("Recall already pending approval");
      }

      await this.repo.update(organizationId, batchId, {
        recallStatus: "pending",
      });

      const approvalWorkflow = await workflowService.startWorkflow({
        definitionKey: "recall.approval",
        subjectType: "recall",
        subjectId: batchId,
        organizationId,
        startedByUserId: userId,
      });

      await eventBus.emit(BATCH_EVENTS.RECALL_UPDATED, {
        batchId,
        organizationId,
        from: "none",
        to: "pending",
        actorUserId: userId,
        comment: input.comment ?? null,
      });

      return {
        batch: await this.getById(organizationId, batchId),
        approvalWorkflow,
      };
    }

    // clear pending request (before approval)
    if (batch.recallStatus !== "pending") {
      throw new ConflictError("Only pending recall requests can be cleared");
    }

    await this.repo.update(organizationId, batchId, { recallStatus: "none" });

    // Cancel open recall workflow if present
    const open = await workflowService.listInstances({
      subjectType: "recall",
      subjectId: batchId,
      status: "pending",
    });
    for (const instance of open) {
      try {
        await workflowService.submitAction(
          instance.id,
          userId,
          ["batch.recall.manage"],
          { decision: "cancel", comment: input.comment ?? "Recall cleared" }
        );
      } catch {
        // ignore if already closed
      }
    }

    await eventBus.emit(BATCH_EVENTS.RECALL_UPDATED, {
      batchId,
      organizationId,
      from: "pending",
      to: "none",
      actorUserId: userId,
      comment: input.comment ?? null,
    });

    return {
      batch: await this.getById(organizationId, batchId),
      approvalWorkflow: null,
    };
  }
}

export const batchService = new BatchService();
