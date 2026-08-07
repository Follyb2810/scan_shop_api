import { AuditLogWithResponse, TAuditLogCreate, TAuditLogUpdateFields } from "./auditlog.type";
/**
 * Legacy product-unit audit trail (ENABLE_LEGACY_MODULES).
 * General compliance audit lives in src/modules/audit (Step 18).
 */
export declare class AuditLogRepository {
    private readonly db;
    create(data: TAuditLogCreate): Promise<AuditLogWithResponse>;
    getByProductUnit(productUnitId: string): Promise<AuditLogWithResponse[]>;
    getLogsForUnit(unitId: string): Promise<AuditLogWithResponse[]>;
    getByUser(userId: string): Promise<AuditLogWithResponse[]>;
    getAll(): Promise<AuditLogWithResponse[]>;
    update(id: string, data: TAuditLogUpdateFields): Promise<AuditLogWithResponse>;
    delete(id: string): Promise<{
        id: string;
        productUnitId: string;
        userId: string | null;
        ipAddress: string | null;
        userAgent: string | null;
        action: string;
        isFirstScan: boolean;
        latitude: number | null;
        longitude: number | null;
        city: string | null;
        country: string | null;
        metadata: string | null;
        notes: string | null;
        oldStatus: string | null;
        newStatus: string | null;
        timestamp: Date;
    }>;
}
//# sourceMappingURL=auditlog.repository.d.ts.map