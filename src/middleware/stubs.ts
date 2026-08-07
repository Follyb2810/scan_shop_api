/**
 * @deprecated Prefer named middleware from `src/middleware`.
 * Kept so older imports do not break mid-migration.
 */
export { rateLimitMiddleware } from "./rateLimit";
export {
  authenticate as authenticateStub,
  authenticateOptional,
} from "./authenticate";
export { resolveTenant as resolveTenantStub } from "./resolveTenant";
