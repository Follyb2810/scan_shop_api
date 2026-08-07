import { Response } from "express";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { ZodError } from "zod";
import { BaseError } from "./BaseError";
import { AppError } from "../shared/errors";
import { sendError } from "../shared/http";

/**
 * Legacy controller helper: `errorHandler(err, res)`.
 * Prefer `next(err)` + middleware `errorHandler` in new modules.
 */
export function errorHandler(err: unknown, res: Response): Response {
  if (err instanceof AppError) {
    return sendError(res, err.statusCode, err.code, err.message, err.details);
  }

  if (err instanceof BaseError) {
    return sendError(res, err.statusCode, err.status, err.message);
  }

  if (err instanceof ZodError) {
    return sendError(res, 400, "VALIDATION_ERROR", "Invalid request", err.flatten());
  }

  if (err instanceof TokenExpiredError) {
    return sendError(res, 401, "TOKEN_EXPIRED", "Token expired");
  }

  if (err instanceof JsonWebTokenError) {
    return sendError(res, 401, "INVALID_TOKEN", "Invalid token");
  }

  if (typeof err === "string") {
    return sendError(res, 400, err, err);
  }

  const message = err instanceof Error ? err.message : "Something went wrong.";
  return sendError(res, 500, "INTERNAL_ERROR", message);
}
