import { z } from "zod";

export const createFamilySchema = z.object({
  name: z.string().min(2).max(200),
  description: z.string().max(2000).optional(),
});

export const createBrandSchema = z.object({
  familyId: z.string().uuid(),
  name: z.string().min(1).max(200),
});

export const createMedicineSchema = z.object({
  brandId: z.string().uuid(),
  name: z.string().min(2).max(200),
  description: z.string().max(2000).optional(),
  categoryKey: z.string().min(2).max(64).optional(),
});

export const updateMedicineSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  description: z.string().max(2000).nullable().optional(),
  categoryKey: z.string().min(2).max(64).nullable().optional(),
});

export const createVariantSchema = z.object({
  medicineId: z.string().uuid(),
  name: z.string().min(1).max(200),
  strength: z.string().max(100).optional(),
  sku: z
    .string()
    .min(2)
    .max(64)
    .regex(/^[A-Za-z0-9_-]+$/),
  gtin: z.string().max(32).optional(),
  dosageFormKey: z.string().min(2).max(64).optional(),
  color: z.string().max(64).optional(),
  size: z.string().max(64).optional(),
  weight: z.string().max(64).optional(),
  attributes: z.record(z.string(), z.unknown()).optional(),
});

export const createPackageSchema = z.object({
  variantId: z.string().uuid(),
  name: z.string().min(1).max(200),
  unitsPerPackage: z.number().int().positive().max(1_000_000),
  packagingTypeKey: z.string().min(2).max(64).optional(),
  barcodeTemplate: z.string().max(200).optional(),
});

export const createHierarchySchema = z.object({
  family: createFamilySchema,
  brand: z.object({ name: z.string().min(1).max(200) }),
  medicine: z.object({
    name: z.string().min(2).max(200),
    description: z.string().max(2000).optional(),
    categoryKey: z.string().min(2).max(64).optional(),
  }),
  variant: z.object({
    name: z.string().min(1).max(200),
    strength: z.string().max(100).optional(),
    sku: z
      .string()
      .min(2)
      .max(64)
      .regex(/^[A-Za-z0-9_-]+$/),
    gtin: z.string().max(32).optional(),
    dosageFormKey: z.string().min(2).max(64).optional(),
    color: z.string().max(64).optional(),
    size: z.string().max(64).optional(),
    weight: z.string().max(64).optional(),
  }),
  package: z.object({
    name: z.string().min(1).max(200),
    unitsPerPackage: z.number().int().positive().max(1_000_000),
    packagingTypeKey: z.string().min(2).max(64).optional(),
    barcodeTemplate: z.string().max(200).optional(),
  }),
});
