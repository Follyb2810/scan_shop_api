import { AuditLogRepository } from "./auditlog.repository";
import { TAuditLogCreate, TAuditLogUpdateFields } from "./auditlog.type";
import { AuditLog } from "@prisma/client";

export class AuditLogService {
  private readonly repo = new AuditLogRepository();

  async log(data: TAuditLogCreate): Promise<AuditLog> {
    return this.repo.create(data);
  }

  async getByProductUnit(productUnitId: string): Promise<AuditLog[]> {
    return this.repo.getByProductUnit(productUnitId);
  }

  async getByUser(userId: string): Promise<AuditLog[]> {
    return this.repo.getByUser(userId);
  }

  async getAll(): Promise<AuditLog[]> {
    return this.repo.getAll();
  }

  async update(id: string, data: TAuditLogUpdateFields): Promise<AuditLog> {
    return this.repo.update(id, data);
  }

  async delete(id: string): Promise<AuditLog> {
    return this.repo.delete(id);
  }
}
