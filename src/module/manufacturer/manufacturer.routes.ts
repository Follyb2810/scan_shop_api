import { Router } from "express";
import { ManufacturerController } from "./manufacturer.controller";
import authMiddleware from "../../middlware/auth.middleware";
// import { auth, admin } from "../middlewares/auth";

const router = Router();
router.post("/apply", authMiddleware, ManufacturerController.apply);

// admin routes
router.get(
  "/admin/pending",
  authMiddleware,
  admin,
  ManufacturerController.getPending
);
router.patch(
  "/admin/:id/approve",
  authMiddleware,
  admin,
  ManufacturerController.approve
);
router.patch(
  "/admin/:id/reject",
  authMiddleware,
  admin,
  ManufacturerController.reject
);

export default router;
