import { prisma } from "../../../infrastructure/database";
import { BaseRepository } from "../../../infrastructure/database/base.repository";

const medicineInclude = {
  brand: { include: { family: true } },
  category: true,
  variants: {
    where: { deletedAt: null },
    include: {
      dosageForm: true,
      packages: {
        where: { deletedAt: null },
        include: { packagingType: true },
      },
    },
  },
} as const;

export class CatalogRepository extends BaseRepository {
  listCategories() {
    return this.db.medicineCategory.findMany({ orderBy: { name: "asc" } });
  }

  listDosageForms() {
    return this.db.dosageForm.findMany({ orderBy: { name: "asc" } });
  }

  listPackagingTypes() {
    return this.db.packagingType.findMany({ orderBy: { rank: "asc" } });
  }

  findCategoryByKey(key: string) {
    return this.db.medicineCategory.findUnique({ where: { key } });
  }

  findDosageFormByKey(key: string) {
    return this.db.dosageForm.findUnique({ where: { key } });
  }

  findPackagingTypeByKey(key: string) {
    return this.db.packagingType.findUnique({ where: { key } });
  }

  listFamilies(organizationId: string) {
    return this.db.productFamily.findMany({
      where: { organizationId, deletedAt: null },
      include: {
        brands: {
          where: { deletedAt: null },
          include: {
            medicines: {
              where: { deletedAt: null },
              select: { id: true, name: true, status: true },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  findFamily(organizationId: string, id: string) {
    return this.db.productFamily.findFirst({
      where: { id, organizationId, deletedAt: null },
      include: {
        brands: { where: { deletedAt: null } },
      },
    });
  }

  createFamily(data: {
    organizationId: string;
    name: string;
    description?: string;
  }) {
    return this.db.productFamily.create({
      data: {
        organizationId: data.organizationId,
        name: data.name,
        description: data.description,
        status: "draft",
      },
    });
  }

  findBrand(organizationId: string, id: string) {
    return this.db.brand.findFirst({
      where: { id, organizationId, deletedAt: null },
      include: { family: true },
    });
  }

  createBrand(data: {
    organizationId: string;
    familyId: string;
    name: string;
  }) {
    return this.db.brand.create({
      data: {
        organizationId: data.organizationId,
        familyId: data.familyId,
        name: data.name,
      },
      include: { family: true },
    });
  }

  listMedicines(organizationId: string) {
    return this.db.medicine.findMany({
      where: { organizationId, deletedAt: null },
      include: medicineInclude,
      orderBy: { createdAt: "desc" },
    });
  }

  findMedicine(organizationId: string, id: string) {
    return this.db.medicine.findFirst({
      where: { id, organizationId, deletedAt: null },
      include: medicineInclude,
    });
  }

  createMedicine(data: {
    organizationId: string;
    brandId: string;
    categoryId?: string | null;
    name: string;
    description?: string;
  }) {
    return this.db.medicine.create({
      data: {
        organizationId: data.organizationId,
        brandId: data.brandId,
        categoryId: data.categoryId ?? null,
        name: data.name,
        description: data.description,
        status: "draft",
      },
      include: medicineInclude,
    });
  }

  updateMedicine(
    organizationId: string,
    id: string,
    data: {
      name?: string;
      description?: string | null;
      categoryId?: string | null;
      status?: string;
    }
  ) {
    return this.db.medicine.updateMany({
      where: { id, organizationId, deletedAt: null },
      data: {
        name: data.name,
        description: data.description,
        categoryId: data.categoryId,
        status: data.status,
      },
    });
  }

  findVariantBySku(organizationId: string, sku: string) {
    return this.db.variant.findFirst({
      where: { organizationId, sku, deletedAt: null },
    });
  }

  findVariant(organizationId: string, id: string) {
    return this.db.variant.findFirst({
      where: { id, organizationId, deletedAt: null },
      include: {
        dosageForm: true,
        packages: {
          where: { deletedAt: null },
          include: { packagingType: true },
        },
        medicine: true,
      },
    });
  }

  createVariant(data: {
    organizationId: string;
    medicineId: string;
    dosageFormId?: string | null;
    name: string;
    strength?: string;
    sku: string;
    gtin?: string;
    color?: string;
    size?: string;
    weight?: string;
    attributesJson?: string | null;
  }) {
    return this.db.variant.create({
      data: {
        organizationId: data.organizationId,
        medicineId: data.medicineId,
        dosageFormId: data.dosageFormId ?? null,
        name: data.name,
        strength: data.strength,
        sku: data.sku,
        gtin: data.gtin,
        color: data.color,
        size: data.size,
        weight: data.weight,
        attributesJson: data.attributesJson ?? null,
        status: "draft",
      },
      include: {
        dosageForm: true,
        packages: true,
      },
    });
  }

  createPackage(data: {
    organizationId: string;
    variantId: string;
    packagingTypeId?: string | null;
    name: string;
    unitsPerPackage: number;
    barcodeTemplate?: string;
  }) {
    return this.db.packageDefinition.create({
      data: {
        organizationId: data.organizationId,
        variantId: data.variantId,
        packagingTypeId: data.packagingTypeId ?? null,
        name: data.name,
        unitsPerPackage: data.unitsPerPackage,
        barcodeTemplate: data.barcodeTemplate,
        status: "draft",
      },
      include: { packagingType: true },
    });
  }

  findPackage(organizationId: string, id: string) {
    return this.db.packageDefinition.findFirst({
      where: { id, organizationId, deletedAt: null },
      include: { packagingType: true, variant: true },
    });
  }

  listPackages(organizationId: string, variantId?: string) {
    return this.db.packageDefinition.findMany({
      where: {
        organizationId,
        deletedAt: null,
        ...(variantId ? { variantId } : {}),
      },
      include: { packagingType: true },
      orderBy: { createdAt: "desc" },
    });
  }
}

export const catalogRepository = new CatalogRepository(prisma);
