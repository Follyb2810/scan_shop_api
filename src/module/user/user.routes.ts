import { Router } from "express";
import { UserController } from "./user.controller";
import authMiddleware from "../../middlware/auth.middleware";

const router = Router();
/**
 * @openapi
 * tags:
 *   - name: Users
 *     description: User management endpoints
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
 *       properties:
 *         email:
 *           type: string
 *         password:
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
 *     UserDto:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         email:
 *           type: string
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         phoneNumber:
 *           type: string
 *           nullable: true
 *         roles:
 *           type: array
 *           items:
 *             type: string
 *
 *     UserResponse:
 *       type: object
 *       properties:
 *         user:
 *           $ref: '#/components/schemas/UserDto'
 *         refreshToken:
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
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
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserDto'
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserDto'
 *   put:
 *     tags:
 *       - Users
 *     summary: Update authenticated user info
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Update successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserDto'
 *   delete:
 *     tags:
 *       - Users
 *     summary: Delete your account
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserDto'
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
 * /api/v1/user/refresh:
 *   post:
 *     summary: Refresh access token
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *             properties:
 *               token:
 *                 type: string
 *     responses:
 *       200:
 *         description: New access and refresh tokens
 */


router.post("/register", UserController.create);
router.post("/login", UserController.login);

router.use(authMiddleware);

router.get("/", UserController.getAllUsers);
router.get("/me", UserController.getUserById);
router.put("/me", UserController.updateUserById);
router.put("/me/password", UserController.updatePassword);
router.delete("/me", UserController.deleteUserById);
router.post("/refresh", UserController.refreshToken);

export default router;
