import { Router } from "express";
import authMiddleware from "../../middlware/auth.middleware";
import { TRole, verifyRole } from "../../middlware/verifyRole";
import { ProductController } from "./product.controller";

const router = Router();

router.post(
  "/",
  authMiddleware,
  verifyRole(TRole.MANUFACTURER),
  ProductController.create
);
router.get("/", verifyRole(TRole.MANUFACTURER), ProductController.getAll);
router.get(
  "/my",
  authMiddleware,
  verifyRole(TRole.MANUFACTURER),
  ProductController.getMyProducts
);
router.get("/:id", ProductController.getById);
router.patch(
  "/:id",
  authMiddleware,
  verifyRole(TRole.ADMIN, TRole.MODERATOR, TRole.MANUFACTURER),
  ProductController.update
);
router.patch(
  "/:id/disable",
  authMiddleware,
  verifyRole(TRole.ADMIN, TRole.MODERATOR, TRole.MANUFACTURER),
  ProductController.disable
);
router.delete(
  "/:id",
  authMiddleware,
  verifyRole(TRole.ADMIN, TRole.MODERATOR, TRole.MANUFACTURER),
  ProductController.delete
);

export default router;
