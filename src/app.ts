import cors from "cors";
import express, { Application } from "express";
import helmet from "helmet";
import pinoHttp from "pino-http";
import { v1Router } from "./api/v1/routes";
import { corsOrigins, env } from "./config/env";
import { logger } from "./config/logger";
import { setupSwagger } from "./config/swagger";
import {
  auditRequest,
  authenticateOptional,
  errorHandler,
  loadRbac,
  notFoundHandler,
  rateLimitMiddleware,
  requestContext,
  resolveTenant,
} from "./middleware";

export function createApp(): Application {
  const app = express();

  app.disable("x-powered-by");
  app.set("trust proxy", true);

  app.use(
    pinoHttp({
      logger,
      autoLogging: env.NODE_ENV !== "test",
      customProps: (req) => ({
        requestId: req.context?.requestId,
        userId: req.context?.userId,
        organizationId: req.context?.organizationId,
      }),
    })
  );

  app.use(
    cors({
      origin: corsOrigins,
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
      allowedHeaders: [
        "Content-Type",
        "Authorization",
        "X-Organization-Id",
        "X-Branch-Id",
        "X-Request-Id",
        "Idempotency-Key",
      ],
    })
  );
  app.use(helmet({ contentSecurityPolicy: false })); // Swagger UI compatibility
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true }));
  app.use(rateLimitMiddleware);

  // Global request pipeline
  app.use(requestContext);
  app.use(authenticateOptional);
  app.use(resolveTenant);
  app.use(loadRbac);
  app.use(auditRequest);

  app.get("/", (_req, res) => res.redirect("/api-docs"));

  app.use("/api/v1", v1Router);

  app.get("/health", (_req, res) => {
    res.json({
      success: true,
      data: { status: "ok", deprecatedPath: true, use: "/api/v1/health" },
    });
  });

  setupSwagger(app);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
