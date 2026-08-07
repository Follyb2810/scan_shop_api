"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = createApp;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const pino_http_1 = __importDefault(require("pino-http"));
const routes_1 = require("./api/v1/routes");
const env_1 = require("./config/env");
const logger_1 = require("./config/logger");
const swagger_1 = require("./config/swagger");
const middleware_1 = require("./middleware");
const module_1 = __importDefault(require("./module"));
function createApp() {
    const app = (0, express_1.default)();
    app.disable("x-powered-by");
    app.set("trust proxy", true);
    app.use((0, pino_http_1.default)({
        logger: logger_1.logger,
        autoLogging: env_1.env.NODE_ENV !== "test",
        customProps: (req) => ({
            requestId: req.context?.requestId,
            userId: req.context?.userId,
            organizationId: req.context?.organizationId,
        }),
    }));
    app.use((0, cors_1.default)({
        origin: env_1.corsOrigins,
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
    }));
    app.use((0, helmet_1.default)({
        // Disable CSP only for Swagger UI in non-production; enable baseline CSP in production.
        contentSecurityPolicy: env_1.env.NODE_ENV === "production" ? undefined : false,
        crossOriginEmbedderPolicy: false,
    }));
    app.use(express_1.default.json({ limit: "1mb" }));
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(middleware_1.rateLimitMiddleware);
    // Global request pipeline
    app.use(middleware_1.requestContext);
    app.use(middleware_1.authenticateOptional);
    app.use(middleware_1.resolveTenant);
    app.use(middleware_1.loadRbac);
    app.use(middleware_1.auditRequest);
    app.get("/", (_req, res) => res.redirect("/api-docs"));
    app.use("/api/v1", routes_1.v1Router);
    app.get("/health", (_req, res) => {
        res.json({
            success: true,
            data: { status: "ok", deprecatedPath: true, use: "/api/v1/health" },
        });
    });
    (0, swagger_1.setupSwagger)(app);
    if (env_1.env.ENABLE_LEGACY_MODULES) {
        (0, module_1.default)(app);
        logger_1.logger.info("Legacy feature modules mounted under /api/v1/*");
    }
    app.use(middleware_1.notFoundHandler);
    app.use(middleware_1.errorHandler);
    return app;
}
//# sourceMappingURL=app.js.map