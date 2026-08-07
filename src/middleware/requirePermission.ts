import { NextFunction, Request, Response } from "express";
import { ForbiddenError, UnauthorizedError } from "../shared/errors";

function hasPermission(granted: Set<string>, required: string): boolean {
  if (granted.has("*")) return true;
  if (granted.has(required)) return true;
  // namespace wildcards e.g. inventory.*
  const parts = required.split(".");
  for (let i = parts.length - 1; i > 0; i--) {
    const wildcard = `${parts.slice(0, i).join(".")}.*`;
    if (granted.has(wildcard)) return true;
  }
  return false;
}

/**
 * Permission gate — uses grants loaded by `loadRbac` (Step 5).
 * All listed permissions are required (AND).
 */
export function requirePermission(...required: string[]) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.context?.userId) {
      next(new UnauthorizedError("Authentication required"));
      return;
    }

    const granted = new Set(req.context.permissions ?? []);
    const missing = required.filter((p) => !hasPermission(granted, p));

    if (missing.length > 0) {
      next(
        new ForbiddenError("Missing required permission(s)", {
          required,
          missing,
        })
      );
      return;
    }

    next();
  };
}

/**
 * At least one of the listed permissions is required (OR).
 */
export function requireAnyPermission(...required: string[]) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.context?.userId) {
      next(new UnauthorizedError("Authentication required"));
      return;
    }

    const granted = new Set(req.context.permissions ?? []);
    const ok = required.some((p) => hasPermission(granted, p));

    if (!ok) {
      next(
        new ForbiddenError("Missing required permission(s)", {
          required,
          missing: required,
        })
      );
      return;
    }

    next();
  };
}

/**
 * Platform role gate — uses `context.platformRoles` from `loadRbac`.
 */
export function requirePlatformRole(...roles: string[]) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.context?.userId) {
      next(new UnauthorizedError("Authentication required"));
      return;
    }

    const have = new Set(req.context.platformRoles ?? []);
    const ok = roles.some((r) => have.has(r));

    if (!ok) {
      next(
        new ForbiddenError("Missing required platform role", {
          required: roles,
        })
      );
      return;
    }

    req.context.actorMode = "platform";
    next();
  };
}
