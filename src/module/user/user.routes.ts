import { Router } from "express";
import { UserController } from "./user.controller";
import authMiddleware from "../../middlware/auth.middleware";

const router = Router();
/**
 * @openapi
 * tags:
 *   name: Users
 *   description: User management endpoints
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     RegisterInput:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - name
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         name:
 *           type: string
 *
 *     LoginInput:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 *
 *     UserResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         email:
 *           type: string
 *         name:
 *           type: string
 */

/**
 * @openapi
 * /api/v1/user/register:
 *   post:
 *     tags:
 *       - Users
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterInput'
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 */

/**
 * @openapi
 * /api/v1/user/login:
 *   post:
 *     tags:
 *       - Users
 *     summary: Login user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginInput'
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */

/**
 * @openapi
 * /api/v1/user:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get all users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 */

/**
 * @openapi
 * /api/v1/user/me:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get the authenticated user's profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile
 */
/**
 * @openapi
 * /api/v1/user/me:
 *   put:
 *     tags:
 *       - Users
 *     summary: Update authenticated user info
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Update successful
 */
/**
 * @openapi
 * /api/v1/user/me/password:
 *   put:
 *     tags:
 *       - Users
 *     summary: Update your password
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Password updated
 */
/**
 * @openapi
 * /api/v1/user/me:
 *   delete:
 *     tags:
 *       - Users
 *     summary: Delete your account
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User deleted
 */

router.post("/register", UserController.create);
router.post("/login", UserController.login);

router.use(authMiddleware);

router.get("/", UserController.getAllUsers);
router.get("/me", UserController.getUserById);
router.put("/me", UserController.updateUserById);
router.put("/me/password", UserController.updatePassword);
router.delete("/me", UserController.deleteUserById);

export default router;
