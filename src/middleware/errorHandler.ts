import { NextFunction, Request, Response } from "express";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { ZodError } from "zod";
import { env } from "../config/env";
import { logger } from "../config/logger";
import { AppError } from "../shared/errors";
import { sendError } from "../shared/http";
import { BaseError } from "../errors/BaseError";

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
): void {
  const requestId = req.context?.requestId;

  if (err instanceof AppError) {
    logger.warn(
      { err, requestId, code: err.code },
      err.message
    );
    sendError(res, err.statusCode, err.code, err.message, err.details);
    return;
  }

  // Legacy BaseError from existing modules
  if (err instanceof BaseError) {
    logger.warn({ err, requestId }, err.message);
    sendError(res, err.statusCode, err.status, err.message);
    return;
  }

  if (err instanceof ZodError) {
    sendError(res, 400, "VALIDATION_ERROR", "Invalid request", err.flatten());
    return;
  }

  if (err instanceof TokenExpiredError) {
    sendError(res, 401, "TOKEN_EXPIRED", "Token expired");
    return;
  }

  if (err instanceof JsonWebTokenError) {
    sendError(res, 401, "INVALID_TOKEN", "Invalid token");
    return;
  }

  logger.error({ err, requestId }, "Unhandled error");

  const message =
    env.NODE_ENV === "production"
      ? "Something went wrong."
      : err instanceof Error
        ? err.message
        : "Something went wrong.";

  sendError(res, 500, "INTERNAL_ERROR", message);
}
