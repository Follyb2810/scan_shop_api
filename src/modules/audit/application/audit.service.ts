import { logger } from "../../../config/logger";
import { ForbiddenError, NotFoundError } from "../../../shared/errors";
import { RequestContext } from "../../../shared/types/RequestContext";
import { RecordAuditInput } from "../domain/types";
import {
  auditRepository,
  AuditRepository,
} from "../infrastructure/audit.repository";

function parseJson(raw: string | null | undefined) {
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return raw;
  }
}

function serialize<
  T extends {
    oldValueJson?: string | null;
    newValueJson?: string | null;
    metadataJson?: string | null;
  },
>(row: T) {
  const { oldValueJson, newValueJson, metadataJson, ...rest } = row;
  return {
    ...rest,
    oldValue: parseJson(oldValueJson),
    newValue: parseJson(newValueJson),
    metadata: parseJson(metadataJson),
  };
}

export class AuditService {
  constructor(private readonly repo: AuditRepository = auditRepository) {}

  /**
   * Append-only write. Never throws to callers — audit must not break business flows.
   */
  async record(input: RecordAuditInput) {
    try {
      return await this.repo.create(input);
    } catch (err) {
      logger.error({ err, action: input.action }, "Failed to write audit log");
      return null;
    }
  }

  /** Convenience: capture from Express request context + extras. */
  async recordFromContext(
    ctx: RequestContext | undefined,
    input: Omit<
      RecordAuditInput,
      "actorUserId" | "organizationId" | "branchId" | "warehouseId" | "requestId"
    > &
      Partial<
        Pick<
          RecordAuditInput,
          | "actorUserId"
          | "organizationId"
          | "branchId"
          | "warehouseId"
          | "requestId"
        >
      >
  ) {
    return this.record({
      actorUserId: input.actorUserId ?? ctx?.userId ?? null,
      organizationId:
        input.organizationId ?? ctx?.organizationId ?? ctx?.tenantId ?? null,
      branchId: input.branchId ?? ctx?.branchId ?? null,
      warehouseId: input.warehouseId ?? ctx?.warehouseId ?? null,
      requestId: input.requestId ?? ctx?.requestId ?? null,
      ...input,
    });
  }

  async getById(
    id: string,
    opts: { organizationId?: string; platformWide?: boolean }
  ) {
    const row = await this.repo.findById(id);
    if (!row) throw new NotFoundError("Audit log not found");
    if (!opts.platformWide) {
      if (!opts.organizationId || row.organizationId !== opts.organizationId) {
        throw new ForbiddenError("Audit log not visible in this organization");
      }
    }
    return serialize(row);
  }

  async list(
    filters: {
      organizationId?: string;
      actorUserId?: string;
      action?: string;
      entityType?: string;
      entityId?: string;
      from?: Date;
      to?: Date;
      take?: number;
      skip?: number;
    },
    opts: { platformWide?: boolean }
  ) {
    if (!opts.platformWide && !filters.organizationId) {
      throw new ForbiddenError("Organization scope required for org audit view");
    }
    const rows = await this.repo.list(filters);
    return rows.map(serialize);
  }
}

export const auditService = new AuditService();

/** Module-facing helper used by other domains. */
export async function recordAudit(input: RecordAuditInput) {
  return auditService.record(input);
}
