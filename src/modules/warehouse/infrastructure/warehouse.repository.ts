import { prisma } from "../../../infrastructure/database";
import { BaseRepository } from "../../../infrastructure/database/base.repository";

const warehouseInclude = {
  type: true,
  branch: {
    select: {
      id: true,
      name: true,
      code: true,
      status: true,
      city: true,
      country: true,
    },
  },
} as const;

export class WarehouseRepository extends BaseRepository {
  listTypes() {
    return this.db.warehouseType.findMany({ orderBy: { name: "asc" } });
  }

  findTypeByKey(key: string) {
    return this.db.warehouseType.findUnique({ where: { key } });
  }

  findBranch(organizationId: string, branchId: string) {
    return this.db.branch.findFirst({
      where: { id: branchId, organizationId, deletedAt: null },
    });
  }

  list(organizationId: string, filters?: { branchId?: string; status?: string }) {
    return this.db.warehouse.findMany({
      where: {
        organizationId,
        deletedAt: null,
        branchId: filters?.branchId,
        status: filters?.status,
      },
      include: warehouseInclude,
      orderBy: [{ branchId: "asc" }, { name: "asc" }],
    });
  }

  findById(organizationId: string, id: string) {
    return this.db.warehouse.findFirst({
      where: { id, organizationId, deletedAt: null },
      include: warehouseInclude,
    });
  }

  findByCode(organizationId: string, branchId: string, code: string) {
    return this.db.warehouse.findFirst({
      where: {
        organizationId,
        branchId,
        code,
        deletedAt: null,
      },
    });
  }

  create(data: {
    organizationId: string;
    branchId: string;
    typeId: string;
    name: string;
    code: string;
    status?: string;
    capacityUnits?: number | null;
    notes?: string | null;
  }) {
    return this.db.warehouse.create({
      data: {
        organizationId: data.organizationId,
        branchId: data.branchId,
        typeId: data.typeId,
        name: data.name,
        code: data.code,
        status: data.status ?? "active",
        capacityUnits: data.capacityUnits ?? null,
        notes: data.notes ?? null,
      },
      include: warehouseInclude,
    });
  }

  update(
    organizationId: string,
    id: string,
    data: {
      name?: string;
      typeId?: string;
      status?: string;
      capacityUnits?: number | null;
      notes?: string | null;
    }
  ) {
    return this.db.warehouse.updateMany({
      where: { id, organizationId, deletedAt: null },
      data,
    });
  }

  softDelete(organizationId: string, id: string) {
    return this.db.warehouse.updateMany({
      where: { id, organizationId, deletedAt: null },
      data: { deletedAt: new Date(), status: "inactive" },
    });
  }
}

export const warehouseRepository = new WarehouseRepository(prisma);
