/**
 * Request-scoped context. Fully wired in Steps 3–6.
 */
export type ActorMode = "platform" | "organization" | "customer" | "anonymous";

export type RequestContext = {
  requestId: string;
  userId?: string;
  /** Active tenant — same as organizationId */
  tenantId?: string;
  organizationId?: string;
  branchId?: string;
  warehouseId?: string;
  permissions: string[];
  /** Platform staff roles — filled in Steps 4–5 */
  platformRoles?: string[];
  actorMode?: ActorMode;
};

export function getTenantId(ctx?: RequestContext): string | undefined {
  return ctx?.organizationId ?? ctx?.tenantId;
}

export function setTenantOnContext(
  ctx: RequestContext,
  organizationId: string
): void {
  ctx.organizationId = organizationId;
  ctx.tenantId = organizationId;
}

declare global {
  namespace Express {
    interface Request {
      context?: RequestContext;
    }
  }
}

export {};
