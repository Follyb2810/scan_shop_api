import { Router } from "express";
import {
  authenticate,
  requireAnyPermission,
  requirePermission,
  requireTenant,
} from "../../../middleware";
import { AuditController } from "./audit.controller";
import { registerAuditEventHandlers } from "../infrastructure/event-hooks";

registerAuditEventHandlers();

/**
 * Org-scoped audit (X-Organization-Id or nested under /organizations/:orgId).
 * Mounted at /api/v1/audit
 *
 * @openapi
 * tags:
 *   - name: Audit
 *     description: Compliance audit log queries
 * /api/v1/audit:
 *   get:
 *     tags: [Audit]
 *     summary: List org-scoped audit logs
 *     security: [{ bearerAuth: [] }]
 * /api/v1/platform/audit:
 *   get:
 *     tags: [Audit]
 *     summary: Platform-wide audit logs
 *     security: [{ bearerAuth: [] }]
 */
export const auditRouter = Router({ mergeParams: true });

auditRouter.get(
  "/",
  authenticate,
  requireTenant,
  requirePermission("audit.view"),
  AuditController.listOrg
);

auditRouter.get(
  "/:id",
  authenticate,
  requireAnyPermission("audit.view", "platform.audit.view"),
  AuditController.getById
);

/**
 * Platform-wide audit.
 * Mounted at /api/v1/platform/audit
 */
export const platformAuditRouter = Router();

platformAuditRouter.get(
  "/",
  authenticate,
  requirePermission("platform.audit.view"),
  AuditController.listPlatform
);

platformAuditRouter.get(
  "/:id",
  authenticate,
  requirePermission("platform.audit.view"),
  AuditController.getById
);

/**
 * Nested under /api/v1/organizations/:orgId/audit
 */
export const auditOrgRouter = Router({ mergeParams: true });

auditOrgRouter.get(
  "/audit",
  requirePermission("audit.view"),
  AuditController.listOrg
);

auditOrgRouter.get(
  "/audit/:id",
  requirePermission("audit.view"),
  AuditController.getById
);
