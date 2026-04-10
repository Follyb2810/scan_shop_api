import { TAuditLogCreate, TAuditLogUpdateFields } from "./auditlog.type";
export declare class AuditLogService {
    private readonly repo;
    log(data: TAuditLogCreate): Promise<any>;
    getByProductUnit(productUnitId: string): Promise<any[]>;
    getByUser(userId: string): Promise<any[]>;
    getAll(): Promise<any[]>;
    update(id: string, data: TAuditLogUpdateFields): Promise<any>;
    delete(id: string): Promise<any>;
}
export declare const auditLogService: AuditLogService;
//# sourceMappingURL=auditlog.service.d.ts.map