import {
  ConflictError,
  NotFoundError,
  TenantIsolationError,
  ValidationError,
} from "../../../shared/errors";
import { seedWarehouseTypes } from "../infrastructure/seed";
import {
  warehouseRepository,
  WarehouseRepository,
} from "../infrastructure/warehouse.repository";

export class WarehouseService {
  constructor(
    private readonly repo: WarehouseRepository = warehouseRepository
  ) {}

  seedTypes() {
    return seedWarehouseTypes();
  }

  listTypes() {
    return this.repo.listTypes();
  }

  list(
    organizationId: string,
    filters?: { branchId?: string; status?: string }
  ) {
    return this.repo.list(organizationId, filters);
  }

  async getById(organizationId: string, warehouseId: string) {
    const warehouse = await this.repo.findById(organizationId, warehouseId);
    if (!warehouse) throw new NotFoundError("Warehouse not found");
    return warehouse;
  }

  async create(
    organizationId: string,
    input: {
      branchId: string;
      typeKey: string;
      name: string;
      code: string;
      status?: string;
      capacityUnits?: number;
      notes?: string;
    }
  ) {
    const branch = await this.repo.findBranch(organizationId, input.branchId);
    if (!branch) {
      throw new TenantIsolationError(
        "Branch not found in this organization"
      );
    }
    if (branch.status !== "active") {
      throw new ValidationError("Cannot create warehouse on inactive branch");
    }

    const type = await this.repo.findTypeByKey(input.typeKey.toUpperCase());
    if (!type) {
      throw new ValidationError(`Unknown warehouse type: ${input.typeKey}`);
    }

    const code = input.code.toUpperCase();
    const existing = await this.repo.findByCode(
      organizationId,
      input.branchId,
      code
    );
    if (existing) {
      throw new ConflictError(
        "Warehouse code already exists on this branch"
      );
    }

    return this.repo.create({
      organizationId,
      branchId: input.branchId,
      typeId: type.id,
      name: input.name,
      code,
      status: input.status,
      capacityUnits: input.capacityUnits,
      notes: input.notes,
    });
  }

  async update(
    organizationId: string,
    warehouseId: string,
    input: {
      name?: string;
      typeKey?: string;
      status?: string;
      capacityUnits?: number | null;
      notes?: string | null;
    }
  ) {
    const existing = await this.repo.findById(organizationId, warehouseId);
    if (!existing) throw new NotFoundError("Warehouse not found");

    let typeId: string | undefined;
    if (input.typeKey) {
      const type = await this.repo.findTypeByKey(input.typeKey.toUpperCase());
      if (!type) {
        throw new ValidationError(`Unknown warehouse type: ${input.typeKey}`);
      }
      typeId = type.id;
    }

    await this.repo.update(organizationId, warehouseId, {
      name: input.name,
      typeId,
      status: input.status,
      capacityUnits: input.capacityUnits,
      notes: input.notes,
    });

    return this.getById(organizationId, warehouseId);
  }

  async softDelete(organizationId: string, warehouseId: string) {
    const existing = await this.repo.findById(organizationId, warehouseId);
    if (!existing) throw new NotFoundError("Warehouse not found");

    await this.repo.softDelete(organizationId, warehouseId);
    return { id: warehouseId, deleted: true };
  }
}

export const warehouseService = new WarehouseService();
