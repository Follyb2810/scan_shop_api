import { Router } from "express";
import { authenticate, authRateLimitMiddleware, validate } from "../../../middleware";
import { AuthController } from "./auth.controller";
import {
  disable2faSchema,
  enable2faSchema,
  forgotPasswordSchema,
  loginSchema,
  logoutSchema,
  refreshSchema,
  registerSchema,
  resetPasswordSchema,
  verifyEmailSchema,
} from "../application/validators/auth.validators";

export const authRouter = Router();

/**
 * @openapi
 * tags:
 *   - name: Auth
 *     description: Identity — register, login, refresh, sessions, 2FA
 */

authRouter.use(authRateLimitMiddleware);

/**
 * @openapi
 * /api/v1/auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: { type: string, format: email }
 *               password: { type: string, minLength: 8 }
 *               firstName: { type: string }
 *               lastName: { type: string }
 *               phoneNumber: { type: string }
 *     responses:
 *       201:
 *         description: Registered
 *       409:
 *         description: Email in use
 */
authRouter.post("/register", validate({ body: registerSchema }), AuthController.register);

/**
 * @openapi
 * /api/v1/auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: { type: string }
 *               password: { type: string }
 *               totpCode: { type: string }
 *               deviceName: { type: string }
 *               deviceFingerprint: { type: string }
 *     responses:
 *       200:
 *         description: Logged in
 *       401:
 *         description: Invalid credentials
 */
authRouter.post("/login", validate({ body: loginSchema }), AuthController.login);

/**
 * @openapi
 * /api/v1/auth/refresh:
 *   post:
 *     tags: [Auth]
 *     summary: Rotate refresh token and issue new access token
 */
authRouter.post("/refresh", validate({ body: refreshSchema }), AuthController.refresh);

/**
 * @openapi
 * /api/v1/auth/logout:
 *   post:
 *     tags: [Auth]
 *     security: [{ bearerAuth: [] }]
 *     summary: Logout / revoke refresh family or session
 */
authRouter.post(
  "/logout",
  authenticate,
  validate({ body: logoutSchema }),
  AuthController.logout
);

/**
 * @openapi
 * /api/v1/auth/verify-email:
 *   post:
 *     tags: [Auth]
 *     summary: Verify email with token
 */
authRouter.post(
  "/verify-email",
  validate({ body: verifyEmailSchema }),
  AuthController.verifyEmail
);

/**
 * @openapi
 * /api/v1/auth/forgot-password:
 *   post:
 *     tags: [Auth]
 *     summary: Request password reset
 */
authRouter.post(
  "/forgot-password",
  validate({ body: forgotPasswordSchema }),
  AuthController.forgotPassword
);

/**
 * @openapi
 * /api/v1/auth/reset-password:
 *   post:
 *     tags: [Auth]
 *     summary: Reset password with token
 */
authRouter.post(
  "/reset-password",
  validate({ body: resetPasswordSchema }),
  AuthController.resetPassword
);

/**
 * @openapi
 * /api/v1/auth/me:
 *   get:
 *     tags: [Auth]
 *     security: [{ bearerAuth: [] }]
 *     summary: Current user profile + context
 */
authRouter.get("/me", authenticate, AuthController.me);

/**
 * @openapi
 * /api/v1/auth/sessions:
 *   get:
 *     tags: [Auth]
 *     security: [{ bearerAuth: [] }]
 *     summary: List active sessions
 */
authRouter.get("/sessions", authenticate, AuthController.sessions);

/**
 * @openapi
 * /api/v1/auth/sessions/{id}:
 *   delete:
 *     tags: [Auth]
 *     security: [{ bearerAuth: [] }]
 *     summary: Revoke a session
 */
authRouter.delete("/sessions/:id", authenticate, AuthController.revokeSession);

/**
 * @openapi
 * /api/v1/auth/devices:
 *   get:
 *     tags: [Auth]
 *     security: [{ bearerAuth: [] }]
 *     summary: List devices
 */
authRouter.get("/devices", authenticate, AuthController.devices);

/**
 * @openapi
 * /api/v1/auth/login-history:
 *   get:
 *     tags: [Auth]
 *     security: [{ bearerAuth: [] }]
 *     summary: Login history
 */
authRouter.get("/login-history", authenticate, AuthController.loginHistory);

/**
 * @openapi
 * /api/v1/auth/2fa/setup:
 *   post:
 *     tags: [Auth]
 *     security: [{ bearerAuth: [] }]
 *     summary: Begin TOTP 2FA setup
 */
authRouter.post("/2fa/setup", authenticate, AuthController.setup2fa);

/**
 * @openapi
 * /api/v1/auth/2fa/enable:
 *   post:
 *     tags: [Auth]
 *     security: [{ bearerAuth: [] }]
 *     summary: Enable 2FA after verifying TOTP
 */
authRouter.post(
  "/2fa/enable",
  authenticate,
  validate({ body: enable2faSchema }),
  AuthController.enable2fa
);

/**
 * @openapi
 * /api/v1/auth/2fa/disable:
 *   post:
 *     tags: [Auth]
 *     security: [{ bearerAuth: [] }]
 *     summary: Disable 2FA
 */
authRouter.post(
  "/2fa/disable",
  authenticate,
  validate({ body: disable2faSchema }),
  AuthController.disable2fa
);
