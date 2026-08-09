import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const DEV_SECRET_MARKERS = [
  "dev-access-secret",
  "dev-refresh-secret",
  "dev-hmac-secret",
  "change-me",
];

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  PORT: z.coerce.number().int().positive().default(5000),
  APP_NAME: z.string().default("healthcare-os-api"),
  APP_URL: z.string().default("http://localhost:5000"),

  /**
   * Default: Docker Postgres.
   * postgresql://postgres:postgres@localhost:5432/healthcare_os?schema=public
   * SQLite fallback: DATABASE_PROVIDER=sqlite + DATABASE_URL=file:./dev.db
   */
  DATABASE_URL: z.string().min(1),
  DATABASE_PROVIDER: z.enum(["sqlite", "postgresql"]).default("postgresql"),

  /** Redis — used for cache / BullMQ when REDIS_ENABLED=true. */
  REDIS_URL: z.string().default("redis://localhost:6379"),
  REDIS_ENABLED: z
    .enum(["true", "false"])
    .default("false")
    .transform((v) => v === "true"),

  /**
   * Idempotent catalog + demo seed on every boot.
   * Defaults on in development; off in test/production unless overridden.
   */
  AUTO_SEED_DEMO: z
    .enum(["true", "false"])
    .optional()
    .transform((v) => {
      if (v === "true") return true;
      if (v === "false") return false;
      return process.env.NODE_ENV === "development";
    }),

  JWT_ACCESS_SECRET: z.string().min(16).default("dev-access-secret-change-me"),
  JWT_REFRESH_SECRET: z
    .string()
    .min(16)
    .default("dev-refresh-secret-change-me"),
  JWT_ACCESS_EXPIRES_IN: z.string().default("15m"),
  JWT_REFRESH_EXPIRES_IN: z.string().default("7d"),

  HMAC_SECRET: z.string().min(16).default("dev-hmac-secret-change-me"),
  HMAC_KEY_ID: z.string().min(1).default("v1"),
  PLATFORM_ID: z.string().min(1).default("healthcare-os"),

  /** bcrypt cost factor (password hashing policy). */
  BCRYPT_ROUNDS: z.coerce.number().int().min(10).max(15).default(10),

  CORS_ORIGINS: z
    .string()
    .default(
      "http://localhost:3000,http://localhost:5173,http://localhost:5174,http://localhost:8081,http://localhost:4173"
    ),

  RATE_LIMIT_WINDOW_MS: z.coerce.number().int().positive().default(60_000),
  RATE_LIMIT_MAX: z.coerce.number().int().positive().default(100),
  /** Stricter limiter for auth endpoints (login/register/refresh/reset). */
  AUTH_RATE_LIMIT_WINDOW_MS: z.coerce.number().int().positive().default(15 * 60_000),
  AUTH_RATE_LIMIT_MAX: z.coerce.number().int().positive().default(30),

  LOG_LEVEL: z
    .enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"])
    .default("info"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid environment variables:");
  console.error(parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsed.data;

function looksLikeDevSecret(value: string): boolean {
  const lower = value.toLowerCase();
  return DEV_SECRET_MARKERS.some((m) => lower.includes(m));
}

if (env.NODE_ENV === "production") {
  const secretErrors: string[] = [];
  if (env.JWT_ACCESS_SECRET.length < 32 || looksLikeDevSecret(env.JWT_ACCESS_SECRET)) {
    secretErrors.push("JWT_ACCESS_SECRET must be a unique secret (≥32 chars), not a dev default");
  }
  if (env.JWT_REFRESH_SECRET.length < 32 || looksLikeDevSecret(env.JWT_REFRESH_SECRET)) {
    secretErrors.push("JWT_REFRESH_SECRET must be a unique secret (≥32 chars), not a dev default");
  }
  if (env.HMAC_SECRET.length < 32 || looksLikeDevSecret(env.HMAC_SECRET)) {
    secretErrors.push("HMAC_SECRET must be a unique secret (≥32 chars), not a dev default");
  }
  if (secretErrors.length > 0) {
    console.error("Production security configuration rejected:");
    for (const e of secretErrors) console.error(` - ${e}`);
    process.exit(1);
  }
}

export const corsOrigins = env.CORS_ORIGINS.split(",")
  .map((o) => o.trim())
  .filter(Boolean);
