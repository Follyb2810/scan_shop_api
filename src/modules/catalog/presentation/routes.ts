import { Router } from "express";
import { requirePermission, validate } from "../../../middleware";
import { CatalogController } from "./catalog.controller";
import {
  createBrandSchema,
  createFamilySchema,
  createHierarchySchema,
  createMedicineSchema,
  createPackageSchema,
  createVariantSchema,
  updateMedicineSchema,
} from "../application/validators";

/**
 * Global catalog reference data (seeded).
 * Mounted at /api/v1/catalog
 */
export const catalogRouter = Router();

/**
 * @openapi
 * tags:
 *   - name: Catalog
 *     description: Product hierarchy and reference data (categories, dosage forms, packaging)
 */

/**
 * @openapi
 * /api/v1/catalog/categories:
 *   get:
 *     tags: [Catalog]
 *     summary: List medicine categories
 */
catalogRouter.get("/categories", CatalogController.listCategories);

/**
 * @openapi
 * /api/v1/catalog/dosage-forms:
 *   get:
 *     tags: [Catalog]
 *     summary: List dosage forms
 */
catalogRouter.get("/dosage-forms", CatalogController.listDosageForms);

/**
 * @openapi
 * /api/v1/catalog/packaging-types:
 *   get:
 *     tags: [Catalog]
 *     summary: List packaging types
 */
catalogRouter.get("/packaging-types", CatalogController.listPackagingTypes);

/**
 * Tenant-scoped catalog CRUD.
 * Mounted at /api/v1/organizations/:orgId (mergeParams)
 */
export const catalogOrgRouter = Router({ mergeParams: true });

catalogOrgRouter.get(
  "/families",
  requirePermission("product.read"),
  CatalogController.listFamilies
);

catalogOrgRouter.get(
  "/families/:familyId",
  requirePermission("product.read"),
  CatalogController.getFamily
);

catalogOrgRouter.post(
  "/families",
  requirePermission("product.create"),
  validate({ body: createFamilySchema }),
  CatalogController.createFamily
);

catalogOrgRouter.post(
  "/brands",
  requirePermission("product.create"),
  validate({ body: createBrandSchema }),
  CatalogController.createBrand
);

catalogOrgRouter.get(
  "/medicines",
  requirePermission("product.read"),
  CatalogController.listMedicines
);

catalogOrgRouter.get(
  "/medicines/:medicineId",
  requirePermission("product.read"),
  CatalogController.getMedicine
);

catalogOrgRouter.post(
  "/medicines",
  requirePermission("product.create"),
  validate({ body: createMedicineSchema }),
  CatalogController.createMedicine
);

catalogOrgRouter.patch(
  "/medicines/:medicineId",
  requirePermission("product.update"),
  validate({ body: updateMedicineSchema }),
  CatalogController.updateMedicine
);

catalogOrgRouter.post(
  "/medicines/:medicineId/submit",
  requirePermission("product.publish"),
  CatalogController.submitMedicine
);

catalogOrgRouter.post(
  "/variants",
  requirePermission("product.create"),
  validate({ body: createVariantSchema }),
  CatalogController.createVariant
);

catalogOrgRouter.get(
  "/packages",
  requirePermission("product.read"),
  CatalogController.listPackages
);

catalogOrgRouter.post(
  "/packages",
  requirePermission("product.create"),
  validate({ body: createPackageSchema }),
  CatalogController.createPackage
);

/**
 * Convenience: create Family → Brand → Medicine → Variant → Package at once.
 */
catalogOrgRouter.post(
  "/hierarchy",
  requirePermission("product.create"),
  validate({ body: createHierarchySchema }),
  CatalogController.createHierarchy
);
