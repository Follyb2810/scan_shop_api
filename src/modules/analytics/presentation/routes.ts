import { Router } from "express";
import {
  authenticate,
  requirePermission,
  requireTenant,
} from "../../../middleware";
import { AnalyticsController } from "./analytics.controller";

/**
 * Mounted at /api/v1/analytics
 *
 * @openapi
 * tags:
 *   - name: Analytics
 *     description: Dashboard aggregates
 * /api/v1/analytics/organization/overview:
 *   get:
 *     tags: [Analytics]
 *     summary: Organization dashboard overview
 *     security: [{ bearerAuth: [] }]
 * /api/v1/analytics/platform/overview:
 *   get:
 *     tags: [Analytics]
 *     summary: Platform dashboard overview
 *     security: [{ bearerAuth: [] }]
 */
export const analyticsRouter = Router();

analyticsRouter.get(
  "/platform/overview",
  authenticate,
  requirePermission("platform.analytics.view"),
  AnalyticsController.platformOverview
);

analyticsRouter.get(
  "/organization/overview",
  authenticate,
  requireTenant,
  requirePermission("analytics.view"),
  AnalyticsController.organizationOverview
);

analyticsRouter.get(
  "/branch/:branchId",
  authenticate,
  requireTenant,
  requirePermission("analytics.view"),
  AnalyticsController.branch
);

analyticsRouter.get(
  "/warehouse/:warehouseId",
  authenticate,
  requireTenant,
  requirePermission("analytics.view"),
  AnalyticsController.warehouse
);

analyticsRouter.get(
  "/verification",
  authenticate,
  requireTenant,
  requirePermission("analytics.view"),
  AnalyticsController.verification
);

analyticsRouter.get(
  "/sales",
  authenticate,
  requireTenant,
  requirePermission("analytics.view"),
  AnalyticsController.sales
);

analyticsRouter.get(
  "/inventory",
  authenticate,
  requireTenant,
  requirePermission("analytics.view"),
  AnalyticsController.inventory
);

/** Alias for API outline: /platform/analytics/overview */
export const platformAnalyticsRouter = Router();
platformAnalyticsRouter.get(
  "/overview",
  authenticate,
  requirePermission("platform.analytics.view"),
  AnalyticsController.platformOverview
);
