import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Shop_Scan_Api",
      version: "1.0.0",
      description: "API",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Local server",
      },
    ],
    security: [
      {
        bearerAuth: [],
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
    },
    schemas: {
      User: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" },
          email: { type: "string" },
          password: { type: "string" },
          firstName: { type: "string" },
          lastName: { type: "string" },
          phoneNumber: { type: "string", nullable: true },
          isActive: { type: "boolean" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },

      Role: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" },
          name: { type: "string" },
        },
      },

      UserRole: {
        type: "object",
        properties: {
          userId: { type: "string" },
          roleId: { type: "string" },
        },
      },

      Manufacturer: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" },
          userId: { type: "string" },
          companyName: { type: "string" },
          companyEmail: { type: "string" },
          companyPhone: { type: "string" },
          website: { type: "string", nullable: true },
          address: { type: "string" },
          city: { type: "string" },
          state: { type: "string" },
          country: { type: "string" },
          postalCode: { type: "string", nullable: true },
          licenseNumber: { type: "string" },
          registrationNumber: { type: "string", nullable: true },
          taxId: { type: "string", nullable: true },
          nafdacNumber: { type: "string", nullable: true },
          sonCertification: { type: "string", nullable: true },
          businessType: { type: "string", nullable: true },
          yearsInBusiness: { type: "number", nullable: true },
          supportingDocuments: { type: "string", nullable: true },
          verificationStatus: { type: "string" },
          verificationNotes: { type: "string", nullable: true },
          applicationDate: { type: "string", format: "date-time" },
          reviewedAt: { type: "string", format: "date-time", nullable: true },
          reviewedBy: { type: "string", nullable: true },
          isVerified: { type: "boolean" },
          verifiedAt: { type: "string", format: "date-time", nullable: true },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },

      Product: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" },
          manufacturerId: { type: "string" },
          name: { type: "string" },
          description: { type: "string", nullable: true },
          category: { type: "string" },
          sku: { type: "string" },
          imageUrl: { type: "string", nullable: true },
          weight: { type: "string", nullable: true },
          dimensions: { type: "string", nullable: true },
          ingredients: { type: "string", nullable: true },
          batchNumber: { type: "string" },
          manufactureDate: { type: "string", format: "date-time" },
          expiryDate: { type: "string", format: "date-time", nullable: true },
          isActive: { type: "boolean" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },

      ProductUnit: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" },
          productId: { type: "string" },
          manufacturerId: { type: "string" },
          barcode: { type: "string" },
          unitNumber: { type: "number" },
          qrCodeData: { type: "string", nullable: true },
          signature: { type: "string", nullable: true },
          status: { type: "string" },
          isAuthentic: { type: "boolean" },
          firstScannedAt: {
            type: "string",
            format: "date-time",
            nullable: true,
          },
          firstScannedBy: { type: "string", nullable: true },
          scannedCount: { type: "number" },
          lastScannedAt: {
            type: "string",
            format: "date-time",
            nullable: true,
          },
          currentOwnerId: { type: "string", nullable: true },
          soldAt: { type: "string", format: "date-time", nullable: true },
          soldTo: { type: "string", nullable: true },
          lastLatitude: { type: "number", nullable: true },
          lastLongitude: { type: "number", nullable: true },
          geoAccuracy: { type: "number", nullable: true },
          lastCity: { type: "string", nullable: true },
          lastCountry: { type: "string", nullable: true },
          reportedCount: { type: "number" },
          isSuspicious: { type: "boolean" },
          suspiciousNotes: { type: "string", nullable: true },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },

      AuditLog: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" },
          productUnitId: { type: "string" },
          userId: { type: "string", nullable: true },
          ipAddress: { type: "string", nullable: true },
          userAgent: { type: "string", nullable: true },
          action: { type: "string" },
          isFirstScan: { type: "boolean" },
          latitude: { type: "number", nullable: true },
          longitude: { type: "number", nullable: true },
          city: { type: "string", nullable: true },
          country: { type: "string", nullable: true },
          metadata: { type: "string", nullable: true },
          notes: { type: "string", nullable: true },
          oldStatus: { type: "string", nullable: true },
          newStatus: { type: "string", nullable: true },
          timestamp: { type: "string", format: "date-time" },
        },
      },
    },
  },
  // apis: ["src/module/**/*.ts"],
  apis: ["src/module/**/*.ts", "src/app.ts"],
};

const specs = swaggerJsdoc(options);

export function setupSwagger(app: Express) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
}
