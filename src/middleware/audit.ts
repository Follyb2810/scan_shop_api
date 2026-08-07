import { NextFunction, Request, Response } from "express";
import { logger } from "../config/logger";
import { AUDIT_ACTIONS } from "../modules/audit/domain/types";
import { auditService } from "../modules/audit/application/audit.service";

/**
 * Records mutating HTTP requests to the compliance audit log (append-only).
 * Also emits a lightweight pino trail for ops.
 */
export function auditRequest(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const start = Date.now();

  res.on("finish", () => {
    if (!["POST", "PUT", "PATCH", "DELETE"].includes(req.method)) return;

    const durationMs = Date.now() - start;
    const statusCode = res.statusCode;

    logger.info(
      {
        type: "audit.http",
        requestId: req.context?.requestId,
        userId: req.context?.userId,
        organizationId: req.context?.organizationId,
        method: req.method,
        path: req.originalUrl,
        statusCode,
        durationMs,
      },
      "Mutating request completed"
    );

    // Persist successful mutations only (2xx)
    if (statusCode < 200 || statusCode >= 300) return;

    const path = (req.originalUrl || req.path || "").split("?")[0];
    // Avoid recursive noise from audit reads (none are mutations) and health
    if (path.includes("/health")) return;

    void auditService.recordFromContext(req.context, {
      action: AUDIT_ACTIONS.HTTP_MUTATION,
      entityType: "http_request",
      entityId: path,
      ipAddress: req.ip ?? null,
      userAgent: req.get("user-agent") ?? null,
      newValue: {
        method: req.method,
        path,
        statusCode,
        durationMs,
      },
      metadata: {
        queryKeys: Object.keys(req.query ?? {}),
      },
    });
  });

  next();
}
