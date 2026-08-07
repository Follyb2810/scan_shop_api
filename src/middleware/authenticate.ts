import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../shared/errors";
import {
  extractBearerToken,
  verifyAccessToken,
} from "../shared/utils/accessToken";

function ensureContext(req: Request): void {
  if (!req.context) {
    req.context = {
      requestId: "missing-request-context",
      permissions: [],
      actorMode: "anonymous",
    };
  }
}

/**
 * Optional auth: valid Bearer populates context; missing token → anonymous.
 * Invalid/expired token → 401.
 */
export function authenticateOptional(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  ensureContext(req);

  const token = extractBearerToken(req.header("Authorization") ?? undefined);
  if (!token) {
    req.context!.actorMode = req.context!.actorMode ?? "anonymous";
    next();
    return;
  }

  try {
    const claims = verifyAccessToken(token);
    const userId = claims.sub;
    if (!userId) {
      next(new UnauthorizedError("Invalid token subject"));
      return;
    }

    req.context!.userId = userId;
    if (!req.context!.actorMode || req.context!.actorMode === "anonymous") {
      req.context!.actorMode = "customer";
    }

    // Back-compat for legacy AuthRequest handlers
    (req as Request & { userId?: string }).userId = userId;

    next();
  } catch (err) {
    next(
      new UnauthorizedError(
        err instanceof Error ? err.message : "Authentication failed"
      )
    );
  }
}

/**
 * Requires a valid access token. Use on protected routes.
 */
export function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  authenticateOptional(req, res, (err?: unknown) => {
    if (err) {
      next(err);
      return;
    }
    if (!req.context?.userId) {
      next(new UnauthorizedError("Authentication required"));
      return;
    }
    next();
  });
}

/** Alias */
export const requireAuth = authenticate;
