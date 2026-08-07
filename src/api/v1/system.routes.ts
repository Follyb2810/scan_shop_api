import { Router } from "express";
import { z } from "zod";
import {
  authenticate,
  requirePermission,
  requirePlatformRole,
  requireTenant,
  validate,
} from "../../middleware";
import { asyncHandler, sendSuccess } from "../../shared/http";

export const systemRouter = Router();

/**
 * @openapi
 * /api/v1/system/context:
 *   get:
 *     tags: [System]
 *     summary: Inspect request context (auth optional)
 *     parameters:
 *       - in: header
 *         name: X-Organization-Id
 *         schema: { type: string }
 *       - in: header
 *         name: Authorization
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Current request context
 */
systemRouter.get(
  "/context",
  asyncHandler(async (req, res) => {
    sendSuccess(res, {
      context: req.context ?? null,
      headers: {
        organizationId: req.header("x-organization-id") ?? null,
        branchId: req.header("x-branch-id") ?? null,
      },
    });
  })
);

/**
 * @openapi
 * /api/v1/system/protected:
 *   get:
 *     tags: [System]
 *     summary: Demo protected route (requires Bearer access token)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Authenticated
 *       401:
 *         description: Missing/invalid token
 */
systemRouter.get(
  "/protected",
  authenticate,
  asyncHandler(async (req, res) => {
    sendSuccess(res, {
      message: "Authenticated",
      userId: req.context?.userId,
    });
  })
);

/**
 * @openapi
 * /api/v1/system/tenant-required:
 *   get:
 *     tags: [System]
 *     summary: Demo tenant-scoped route (requires X-Organization-Id)
 *     parameters:
 *       - in: header
 *         name: X-Organization-Id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Tenant present
 *       403:
 *         description: Missing organization context
 */
systemRouter.get(
  "/tenant-required",
  requireTenant,
  asyncHandler(async (req, res) => {
    sendSuccess(res, {
      organizationId: req.context?.organizationId,
      branchId: req.context?.branchId ?? null,
    });
  })
);

const echoSchema = z.object({
  message: z.string().min(1).max(200),
});

/**
 * @openapi
 * /api/v1/system/echo:
 *   post:
 *     tags: [System]
 *     summary: Demo Zod validation
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [message]
 *             properties:
 *               message: { type: string }
 *     responses:
 *       200:
 *         description: Echoed message
 *       400:
 *         description: Validation error
 */
systemRouter.post(
  "/echo",
  validate({ body: echoSchema }),
  asyncHandler(async (req, res) => {
    sendSuccess(res, { echo: req.body.message });
  })
);

/**
 * Permission demo — will 403 until RBAC (Step 5) loads grants.
 * Tests inject permissions onto context.
 */
systemRouter.get(
  "/permission-demo",
  authenticate,
  requirePermission("system.ping"),
  asyncHandler(async (req, res) => {
    sendSuccess(res, { ok: true, permissions: req.context?.permissions });
  })
);

systemRouter.get(
  "/platform-demo",
  authenticate,
  requirePlatformRole("PLATFORM_ADMIN"),
  asyncHandler(async (req, res) => {
    sendSuccess(res, { ok: true, platformRoles: req.context?.platformRoles });
  })
);

/** Test-only: simulates RBAC having loaded permissions onto the context */
if (process.env.NODE_ENV === "test") {
  systemRouter.get(
    "/__test_permission_ok",
    authenticate,
    (req, _res, next) => {
      req.context!.permissions = ["system.ping"];
      next();
    },
    requirePermission("system.ping"),
    asyncHandler(async (req, res) => {
      sendSuccess(res, { ok: true, userId: req.context?.userId });
    })
  );
}
