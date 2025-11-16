import { Router } from "express";
import { AuditLogController } from "./auditlog.controller";
import authMiddleware from "../../middlware/auth.middleware";

const router = Router();
const ctrl = new AuditLogController();

// create log
router.post("/", authMiddleware, ctrl.create);

// get logs
router.get("/", authMiddleware, ctrl.getAll);
router.get(
  "/product-unit/:productUnitId",
  authMiddleware,
  ctrl.getByProductUnit
);
router.get("/user/:userId", authMiddleware, ctrl.getByUser);

// delete log
router.delete("/:id", authMiddleware, ctrl.delete);

export default router;
