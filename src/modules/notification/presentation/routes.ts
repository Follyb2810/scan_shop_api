import { Router } from "express";
import { authenticate } from "../../../middleware";
import { NotificationController } from "./notification.controller";
import { registerNotificationEventHandlers } from "../infrastructure/event-hooks";
import { startNotificationWorkers } from "../application/notification.service";

registerNotificationEventHandlers();
startNotificationWorkers();

/**
 * Mounted at /api/v1/notifications
 *
 * @openapi
 * tags:
 *   - name: Notifications
 *     description: In-app notifications
 * /api/v1/notifications:
 *   get:
 *     tags: [Notifications]
 *     summary: List my notifications
 *     security: [{ bearerAuth: [] }]
 */
export const notificationRouter = Router();

notificationRouter.use(authenticate);

notificationRouter.get("/", NotificationController.listMine);
notificationRouter.post("/read-all", NotificationController.markAllRead);
notificationRouter.post("/:id/read", NotificationController.markRead);
