import { AuditLogRepository } from "./auditlog.repository";
import { TAuditLogCreate } from "./auditlog.type";


export class AuditLogService {
  private readonly repo = new AuditLogRepository();

  async log(data: TAuditLogCreate) {
    return this.repo.create(data);
  }

  async getByProductUnit(productUnitId: string) {
    return this.repo.getByProductUnit(productUnitId);
  }

  async getByUser(userId: string) {
    return this.repo.getByUser(userId);
  }

  async getAll() {
    return this.repo.getAll();
  }

  async delete(id: string) {
    return this.repo.delete(id);
  }
}
