import { Router } from "express";
import {
  authenticate,
  authenticateOptional,
  requirePermission,
  validate,
} from "../../../middleware";
import { VerificationController } from "./verification.controller";
import {
  generateUnitsSchema,
  scanSchema,
  verifySchema,
} from "../application/validators";

/**
 * Public / lightly-auth verification endpoints.
 * Mounted at /api/v1/verification and /api/v1/scans
 */
export const verificationRouter = Router();
export const scansRouter = Router();

/**
 * @openapi
 * tags:
 *   - name: Verification
 *     description: Signed unit identity and scan authenticity
 */

/**
 * @openapi
 * /api/v1/verification/verify:
 *   post:
 *     tags: [Verification]
 *     summary: Verify QR payload signature (no scan history)
 */
verificationRouter.post(
  "/verify",
  validate({ body: verifySchema }),
  VerificationController.verify
);

/**
 * @openapi
 * /api/v1/scans:
 *   post:
 *     tags: [Verification]
 *     summary: Scan a unit payload and record history
 */
scansRouter.post(
  "/",
  authenticateOptional,
  validate({ body: scanSchema }),
  VerificationController.scan
);

/**
 * @openapi
 * /api/v1/scans/mine:
 *   get:
 *     tags: [Verification]
 *     security: [{ bearerAuth: [] }]
 *     summary: Current user's scan history
 */
scansRouter.get("/mine", authenticate, VerificationController.myScans);

/**
 * Tenant-scoped unit generation. Mounted under /organizations/:orgId
 */
export const verificationOrgRouter = Router({ mergeParams: true });

verificationOrgRouter.post(
  "/verification/units/generate",
  requirePermission("barcode.generate"),
  validate({ body: generateUnitsSchema }),
  VerificationController.generateUnits
);

verificationOrgRouter.get(
  "/verification/units",
  requirePermission("verification.read"),
  VerificationController.listUnits
);

verificationOrgRouter.get(
  "/verification/units/:unitId",
  requirePermission("verification.read"),
  VerificationController.getUnit
);

verificationOrgRouter.get(
  "/verification/units/:unitId/scans",
  requirePermission("verification.read"),
  VerificationController.listUnitScans
);
