import { AuditLogRepository } from "./auditlog.repository";
import { TAuditLogCreate, TAuditLogUpdateFields } from "./auditlog.type";
// import { AuditLog } from "@prisma/client";

export class AuditLogService {
  private readonly repo = new AuditLogRepository();

  async log(data: TAuditLogCreate): Promise<any> {
    return this.repo.create(data);
  }

  async getByProductUnit(productUnitId: string): Promise<any[]> {
    return this.repo.getByProductUnit(productUnitId);
  }

  async getByUser(userId: string): Promise<any[]> {
    return this.repo.getByUser(userId);
  }

  async getAll(): Promise<any[]> {
    return this.repo.getAll();
  }

  async update(id: string, data: TAuditLogUpdateFields): Promise<any> {
    return this.repo.update(id, data);
  }

  async delete(id: string): Promise<any> {
    return this.repo.delete(id);
  }
}

export const auditLogService = new AuditLogService();
