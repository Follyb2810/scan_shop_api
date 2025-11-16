import { Router } from "express";
import { UserController } from "./user.controller";
import authMiddleware from "../../middlware/auth.middleware";

const router = Router();

router.post("/register", UserController.create);
router.post("/login", UserController.login);

router.get("/", authMiddleware, UserController.getAllUsers);
router.get("/me", authMiddleware, UserController.getUserById);
router.put("/me", authMiddleware, UserController.updateUserById);
router.put("/me/password", authMiddleware, UserController.updatePassword);
router.delete("/me", authMiddleware, UserController.deleteUserById);

export default router;
