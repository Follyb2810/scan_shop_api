import { Router } from "express";
import { healthRouter } from "./health.routes";
import { systemRouter } from "./system.routes";
import { authRouter } from "../../modules/identity";
import { rbacRouter } from "../../modules/rbac";
import { organizationRouter } from "../../modules/organization";
import { workflowRouter } from "../../modules/workflow";
import { catalogRouter } from "../../modules/catalog";
import { warehouseRouter } from "../../modules/warehouse";
import {
  verificationRouter,
  scansRouter,
} from "../../modules/verification";
import { customerRouter } from "../../modules/customer";
import {
  marketplaceRouter,
  ordersRouter,
} from "../../modules/marketplace";
import {
  auditRouter,
  platformAuditRouter,
} from "../../modules/audit";
import { paymentsRouter } from "../../modules/payments";
import { notificationRouter } from "../../modules/notification";
import {
  analyticsRouter,
  platformAnalyticsRouter,
} from "../../modules/analytics";

/**
 * New Healthcare OS API surface.
 * Domain modules mount here from Step 4+.
 */
export const v1Router = Router();

v1Router.use("/health", healthRouter);
v1Router.use("/system", systemRouter);
v1Router.use("/auth", authRouter);
v1Router.use("/rbac", rbacRouter);
v1Router.use("/organizations", organizationRouter);
v1Router.use("/workflows", workflowRouter);
v1Router.use("/catalog", catalogRouter);
v1Router.use("/warehouses", warehouseRouter);
v1Router.use("/verification", verificationRouter);
v1Router.use("/scans", scansRouter);
v1Router.use("/customers", customerRouter);
v1Router.use("/marketplace", marketplaceRouter);
v1Router.use("/orders", ordersRouter);
v1Router.use("/payments", paymentsRouter);
v1Router.use("/notifications", notificationRouter);
v1Router.use("/analytics", analyticsRouter);
v1Router.use("/platform/analytics", platformAnalyticsRouter);
v1Router.use("/audit", auditRouter);
v1Router.use("/platform/audit", platformAuditRouter);
