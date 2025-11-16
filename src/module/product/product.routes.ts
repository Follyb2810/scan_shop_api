import { Router } from "express";
import { ProductController } from "./product.controller";
import authMiddleware from "../../middlware/auth.middleware";
// import { auth, manufacturerOnly } from "../middlewares/auth";

const router = Router();
const ctrl = new ProductController();

router.post("/", authMiddleware, authMiddleware, ctrl.create);
router.get("/", ctrl.getAll);
router.get("/my", authMiddleware, authMiddleware, ctrl.getMyProducts);
router.get("/:id", ctrl.getById);
router.patch("/:id", authMiddleware, authMiddleware, ctrl.update);
router.patch("/:id/disable", authMiddleware, authMiddleware, ctrl.disable);
router.delete("/:id", authMiddleware, authMiddleware, ctrl.delete);

export default router;
