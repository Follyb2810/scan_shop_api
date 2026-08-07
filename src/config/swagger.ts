import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import { env } from "./env";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Healthcare OS API",
      version: "1.0.0-rc.1",
      description:
        "Multi-tenant Healthcare Commerce, Supply Chain & Verification Platform (Steps 0–21).",
    },
    servers: [
      {
        url: env.APP_URL,
        description: "Current environment",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      parameters: {
        OrganizationIdHeader: {
          in: "header",
          name: "X-Organization-Id",
          schema: { type: "string", format: "uuid" },
          required: false,
          description: "Active tenant organization id",
        },
        BranchIdHeader: {
          in: "header",
          name: "X-Branch-Id",
          schema: { type: "string", format: "uuid" },
          required: false,
          description: "Optional active branch id",
        },
      },
      schemas: {
        ApiSuccess: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            data: {},
            meta: { type: "object" },
          },
        },
        ApiError: {
          type: "object",
          properties: {
            success: { type: "boolean", example: false },
            error: {
              type: "object",
              properties: {
                code: { type: "string" },
                message: { type: "string" },
                details: {},
              },
            },
          },
        },
      },
    },
    tags: [
      { name: "Auth" },
      { name: "Organizations" },
      { name: "Catalog" },
      { name: "Batch" },
      { name: "Warehouse" },
      { name: "Inventory" },
      { name: "Verification" },
      { name: "SupplyChain" },
      { name: "Marketplace" },
      { name: "Customer" },
      { name: "Payments" },
      { name: "Notifications" },
      { name: "Analytics" },
      { name: "Audit" },
      { name: "Workflows" },
      { name: "RBAC" },
      { name: "System" },
    ],
  },
  // Modular routes under src/modules
  apis: [
    "src/api/v1/**/*.ts",
    "src/modules/**/presentation/**/*.ts",
    "src/app.ts",
  ],
};

const specs = swaggerJsdoc(options);

export function setupSwagger(app: Express): void {
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, {
      customSiteTitle: "Healthcare OS API Docs",
      swaggerOptions: {
        persistAuthorization: true,
      },
    })
  );

  app.get("/api-docs.json", (_req, res) => {
    res.json(specs);
  });
}
