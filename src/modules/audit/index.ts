export { auditService, recordAudit } from "./application/audit.service";
export {
  auditRouter,
  platformAuditRouter,
  auditOrgRouter,
} from "./presentation/routes";
export { registerAuditEventHandlers } from "./infrastructure/event-hooks";
export { AUDIT_ACTIONS } from "./domain/types";
export type { RecordAuditInput } from "./domain/types";
