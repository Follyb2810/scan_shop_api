import { Request, Response } from "express";
import { asyncHandler, sendSuccess } from "../../../shared/http";
import { notificationService } from "../application/notification.service";

export const NotificationController = {
  listMine: asyncHandler(async (req: Request, res: Response) => {
    const notifications = await notificationService.listMine(
      req.context!.userId!
    );
    sendSuccess(res, { notifications });
  }),

  markRead: asyncHandler(async (req: Request, res: Response) => {
    const notification = await notificationService.markRead(
      req.context!.userId!,
      req.params.id
    );
    sendSuccess(res, { notification });
  }),

  markAllRead: asyncHandler(async (req: Request, res: Response) => {
    const result = await notificationService.markAllRead(req.context!.userId!);
    sendSuccess(res, result);
  }),
};
