import { Request, Response } from "express";
import { asyncHandler, sendSuccess } from "../../../shared/http";
import { catalogService } from "../application/catalog.service";

function orgId(req: Request): string {
  return req.params.orgId ?? req.context!.organizationId!;
}

export const CatalogController = {
  listCategories: asyncHandler(async (_req: Request, res: Response) => {
    const categories = await catalogService.listCategories();
    sendSuccess(res, { categories });
  }),

  listDosageForms: asyncHandler(async (_req: Request, res: Response) => {
    const dosageForms = await catalogService.listDosageForms();
    sendSuccess(res, { dosageForms });
  }),

  listPackagingTypes: asyncHandler(async (_req: Request, res: Response) => {
    const packagingTypes = await catalogService.listPackagingTypes();
    sendSuccess(res, { packagingTypes });
  }),

  listFamilies: asyncHandler(async (req: Request, res: Response) => {
    const families = await catalogService.listFamilies(orgId(req));
    sendSuccess(res, { families });
  }),

  getFamily: asyncHandler(async (req: Request, res: Response) => {
    const family = await catalogService.getFamily(orgId(req), req.params.familyId);
    sendSuccess(res, { family });
  }),

  createFamily: asyncHandler(async (req: Request, res: Response) => {
    const family = await catalogService.createFamily(orgId(req), req.body);
    sendSuccess(res, { family }, 201);
  }),

  createBrand: asyncHandler(async (req: Request, res: Response) => {
    const brand = await catalogService.createBrand(orgId(req), req.body);
    sendSuccess(res, { brand }, 201);
  }),

  listMedicines: asyncHandler(async (req: Request, res: Response) => {
    const medicines = await catalogService.listMedicines(orgId(req));
    sendSuccess(res, { medicines });
  }),

  getMedicine: asyncHandler(async (req: Request, res: Response) => {
    const medicine = await catalogService.getMedicine(
      orgId(req),
      req.params.medicineId
    );
    sendSuccess(res, { medicine });
  }),

  createMedicine: asyncHandler(async (req: Request, res: Response) => {
    const medicine = await catalogService.createMedicine(orgId(req), req.body);
    sendSuccess(res, { medicine }, 201);
  }),

  updateMedicine: asyncHandler(async (req: Request, res: Response) => {
    const medicine = await catalogService.updateMedicine(
      orgId(req),
      req.params.medicineId,
      req.body
    );
    sendSuccess(res, { medicine });
  }),

  submitMedicine: asyncHandler(async (req: Request, res: Response) => {
    const result = await catalogService.submitMedicine(
      orgId(req),
      req.params.medicineId,
      req.context!.userId!
    );
    sendSuccess(res, result);
  }),

  createVariant: asyncHandler(async (req: Request, res: Response) => {
    const variant = await catalogService.createVariant(orgId(req), req.body);
    sendSuccess(res, { variant }, 201);
  }),

  createPackage: asyncHandler(async (req: Request, res: Response) => {
    const pkg = await catalogService.createPackage(orgId(req), req.body);
    sendSuccess(res, { package: pkg }, 201);
  }),

  listPackages: asyncHandler(async (req: Request, res: Response) => {
    const packages = await catalogService.listPackages(
      orgId(req),
      typeof req.query.variantId === "string" ? req.query.variantId : undefined
    );
    sendSuccess(res, { packages });
  }),

  createHierarchy: asyncHandler(async (req: Request, res: Response) => {
    const hierarchy = await catalogService.createHierarchy(orgId(req), req.body);
    sendSuccess(res, { hierarchy }, 201);
  }),
};
