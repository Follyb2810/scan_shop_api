import { NextFunction, Request, Response } from "express";
import { sendError } from "../shared/http";

export function notFoundHandler(
  req: Request,
  res: Response,
  _next: NextFunction
): void {
  sendError(
    res,
    404,
    "NOT_FOUND",
    `Route ${req.method} ${req.originalUrl} not found`
  );
}
