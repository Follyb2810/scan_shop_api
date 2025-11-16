import { Router } from "express";
import { ManufacturerController } from "./manufacturer.controller";
import authMiddleware from "../../middlware/auth.middleware";
import { TRole, verifyRole } from "../../middlware/verifyRole";

const router = Router();
router.post("/apply", authMiddleware, ManufacturerController.apply);

router.get(
  "/admin/pending",
  authMiddleware,
  verifyRole(TRole.ADMIN,TRole.MODERATOR),
  ManufacturerController.getPending
);
router.patch(
  "/admin/:id/approve",
  authMiddleware,
  verifyRole(TRole.ADMIN,TRole.MODERATOR),
  ManufacturerController.approve
);
router.patch(
  "/admin/:id/reject",
  authMiddleware,
  verifyRole(TRole.ADMIN,TRole.MODERATOR),
  ManufacturerController.reject
);

export default router;
