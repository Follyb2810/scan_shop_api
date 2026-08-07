import rateLimit from "express-rate-limit";
import { env } from "../config/env";

const jsonMessage = {
  success: false,
  error: {
    code: "RATE_LIMIT_EXCEEDED",
    message: "Too many requests, please try again later.",
  },
};

/**
 * Global IP rate limiter. Redis store can replace the default memory store later.
 */
export const rateLimitMiddleware = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  max: env.RATE_LIMIT_MAX,
  standardHeaders: true,
  legacyHeaders: false,
  // Express trust proxy is enabled; disable library warning for test/dev.
  validate: { trustProxy: false },
  message: jsonMessage,
});

/**
 * Stricter limiter for credential endpoints (login/register/refresh/password reset).
 */
export const authRateLimitMiddleware = rateLimit({
  windowMs: env.AUTH_RATE_LIMIT_WINDOW_MS,
  max: env.AUTH_RATE_LIMIT_MAX,
  standardHeaders: true,
  legacyHeaders: false,
  validate: { trustProxy: false },
  message: {
    success: false,
    error: {
      code: "AUTH_RATE_LIMIT_EXCEEDED",
      message: "Too many authentication attempts, please try again later.",
    },
  },
});
