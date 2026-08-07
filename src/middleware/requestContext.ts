import { randomUUID } from "crypto";
import { Request, Response, NextFunction } from "express";
import { RequestContext } from "../shared/types/RequestContext";

export function requestContext(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  const context: RequestContext = {
    requestId: (req.headers["x-request-id"] as string) || randomUUID(),
    permissions: [],
    actorMode: "anonymous",
  };
  req.context = context;
  next();
}
