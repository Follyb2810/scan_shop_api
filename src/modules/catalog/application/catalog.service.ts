import {
  ConflictError,
  NotFoundError,
  TenantIsolationError,
  ValidationError,
} from "../../../shared/errors";
import { workflowService } from "../../workflow/application/workflow.service";
import {
  catalogRepository,
  CatalogRepository,
} from "../infrastructure/catalog.repository";
import { seedCatalogReferenceData } from "../infrastructure/seed";

export class CatalogService {
  constructor(private readonly repo: CatalogRepository = catalogRepository) {}

  seedReferenceData() {
    return seedCatalogReferenceData();
  }

  listCategories() {
    return this.repo.listCategories();
  }

  listDosageForms() {
    return this.repo.listDosageForms();
  }

  listPackagingTypes() {
    return this.repo.listPackagingTypes();
  }

  listFamilies(organizationId: string) {
    return this.repo.listFamilies(organizationId);
  }

  async getFamily(organizationId: string, familyId: string) {
    const family = await this.repo.findFamily(organizationId, familyId);
    if (!family) {
      throw new NotFoundError("Product family not found");
    }
    return family;
  }

  createFamily(
    organizationId: string,
    input: { name: string; description?: string }
  ) {
    return this.repo.createFamily({
      organizationId,
      name: input.name,
      description: input.description,
    });
  }

  async createBrand(
    organizationId: string,
    input: { familyId: string; name: string }
  ) {
    const family = await this.repo.findFamily(organizationId, input.familyId);
    if (!family) {
      throw new TenantIsolationError("Family not found in this organization");
    }
    try {
      return await this.repo.createBrand({
        organizationId,
        familyId: input.familyId,
        name: input.name,
      });
    } catch (err: unknown) {
      if (
        typeof err === "object" &&
        err &&
        "code" in err &&
        (err as { code: string }).code === "P2002"
      ) {
        throw new ConflictError("Brand name already exists in this family");
      }
      throw err;
    }
  }

  listMedicines(organizationId: string) {
    return this.repo.listMedicines(organizationId);
  }

  async getMedicine(organizationId: string, medicineId: string) {
    const medicine = await this.repo.findMedicine(organizationId, medicineId);
    if (!medicine) {
      throw new NotFoundError("Medicine not found");
    }
    return medicine;
  }

  async createMedicine(
    organizationId: string,
    input: {
      brandId: string;
      name: string;
      description?: string;
      categoryKey?: string;
    }
  ) {
    const brand = await this.repo.findBrand(organizationId, input.brandId);
    if (!brand) {
      throw new TenantIsolationError("Brand not found in this organization");
    }

    let categoryId: string | null = null;
    if (input.categoryKey) {
      const category = await this.repo.findCategoryByKey(
        input.categoryKey.toUpperCase()
      );
      if (!category) {
        throw new ValidationError(`Unknown category: ${input.categoryKey}`);
      }
      categoryId = category.id;
    }

    return this.repo.createMedicine({
      organizationId,
      brandId: input.brandId,
      categoryId,
      name: input.name,
      description: input.description,
    });
  }

  async updateMedicine(
    organizationId: string,
    medicineId: string,
    input: {
      name?: string;
      description?: string | null;
      categoryKey?: string | null;
    }
  ) {
    const existing = await this.repo.findMedicine(organizationId, medicineId);
    if (!existing) {
      throw new NotFoundError("Medicine not found");
    }

    let categoryId: string | null | undefined = undefined;
    if (input.categoryKey === null) {
      categoryId = null;
    } else if (input.categoryKey) {
      const category = await this.repo.findCategoryByKey(
        input.categoryKey.toUpperCase()
      );
      if (!category) {
        throw new ValidationError(`Unknown category: ${input.categoryKey}`);
      }
      categoryId = category.id;
    }

    await this.repo.updateMedicine(organizationId, medicineId, {
      name: input.name,
      description: input.description,
      categoryId,
    });

    return this.getMedicine(organizationId, medicineId);
  }

  async createVariant(
    organizationId: string,
    input: {
      medicineId: string;
      name: string;
      strength?: string;
      sku: string;
      gtin?: string;
      dosageFormKey?: string;
      color?: string;
      size?: string;
      weight?: string;
      attributes?: Record<string, unknown>;
    }
  ) {
    const medicine = await this.repo.findMedicine(
      organizationId,
      input.medicineId
    );
    if (!medicine) {
      throw new TenantIsolationError("Medicine not found in this organization");
    }

    const sku = input.sku.toUpperCase();
    const existingSku = await this.repo.findVariantBySku(organizationId, sku);
    if (existingSku) {
      throw new ConflictError("SKU already exists in this organization");
    }

    let dosageFormId: string | null = null;
    if (input.dosageFormKey) {
      const form = await this.repo.findDosageFormByKey(
        input.dosageFormKey.toUpperCase()
      );
      if (!form) {
        throw new ValidationError(
          `Unknown dosage form: ${input.dosageFormKey}`
        );
      }
      dosageFormId = form.id;
    }

    return this.repo.createVariant({
      organizationId,
      medicineId: input.medicineId,
      dosageFormId,
      name: input.name,
      strength: input.strength,
      sku,
      gtin: input.gtin,
      color: input.color,
      size: input.size,
      weight: input.weight,
      attributesJson: input.attributes
        ? JSON.stringify(input.attributes)
        : null,
    });
  }

  async createPackage(
    organizationId: string,
    input: {
      variantId: string;
      name: string;
      unitsPerPackage: number;
      packagingTypeKey?: string;
      barcodeTemplate?: string;
    }
  ) {
    const variant = await this.repo.findVariant(organizationId, input.variantId);
    if (!variant) {
      throw new TenantIsolationError("Variant not found in this organization");
    }

    let packagingTypeId: string | null = null;
    if (input.packagingTypeKey) {
      const type = await this.repo.findPackagingTypeByKey(
        input.packagingTypeKey.toUpperCase()
      );
      if (!type) {
        throw new ValidationError(
          `Unknown packaging type: ${input.packagingTypeKey}`
        );
      }
      packagingTypeId = type.id;
    }

    return this.repo.createPackage({
      organizationId,
      variantId: input.variantId,
      packagingTypeId,
      name: input.name,
      unitsPerPackage: input.unitsPerPackage,
      barcodeTemplate: input.barcodeTemplate,
    });
  }

  listPackages(organizationId: string, variantId?: string) {
    return this.repo.listPackages(organizationId, variantId);
  }

  /**
   * Create Family → Brand → Medicine → Variant → Package in one call.
   */
  async createHierarchy(
    organizationId: string,
    input: {
      family: { name: string; description?: string };
      brand: { name: string };
      medicine: {
        name: string;
        description?: string;
        categoryKey?: string;
      };
      variant: {
        name: string;
        strength?: string;
        sku: string;
        gtin?: string;
        dosageFormKey?: string;
        color?: string;
        size?: string;
        weight?: string;
      };
      package: {
        name: string;
        unitsPerPackage: number;
        packagingTypeKey?: string;
        barcodeTemplate?: string;
      };
    }
  ) {
    const family = await this.createFamily(organizationId, input.family);
    const brand = await this.createBrand(organizationId, {
      familyId: family.id,
      name: input.brand.name,
    });
    const medicine = await this.createMedicine(organizationId, {
      brandId: brand.id,
      ...input.medicine,
    });
    const variant = await this.createVariant(organizationId, {
      medicineId: medicine.id,
      ...input.variant,
    });
    const pkg = await this.createPackage(organizationId, {
      variantId: variant.id,
      ...input.package,
    });

    const full = await this.getMedicine(organizationId, medicine.id);
    return { family, brand, medicine: full, variant, package: pkg };
  }

  /**
   * Draft → Submitted. Starts product.approval workflow.
   */
  async submitMedicine(
    organizationId: string,
    medicineId: string,
    userId: string
  ) {
    const medicine = await this.repo.findMedicine(organizationId, medicineId);
    if (!medicine) {
      throw new NotFoundError("Medicine not found");
    }

    if (medicine.status !== "draft") {
      throw new ConflictError("Only draft medicines can be submitted", {
        status: medicine.status,
      });
    }

    if (!medicine.variants.length) {
      throw new ValidationError(
        "Medicine must have at least one variant before submit"
      );
    }

    const hasPackage = medicine.variants.some((v) => v.packages.length > 0);
    if (!hasPackage) {
      throw new ValidationError(
        "Medicine must have at least one package definition before submit"
      );
    }

    await this.repo.updateMedicine(organizationId, medicineId, {
      status: "submitted",
    });

    let approvalWorkflow = null;
    try {
      approvalWorkflow = await workflowService.startWorkflow({
        definitionKey: "product.approval",
        subjectType: "product",
        subjectId: medicineId,
        organizationId,
        startedByUserId: userId,
      });
    } catch (err) {
      if (!(err instanceof ConflictError)) {
        throw err;
      }
      approvalWorkflow = await workflowService.listInstances({
        subjectType: "product",
        subjectId: medicineId,
        status: "pending",
      }).then((rows) => rows[0] ?? null);
    }

    const updated = await this.getMedicine(organizationId, medicineId);
    return { medicine: updated, approvalWorkflow };
  }
}

export const catalogService = new CatalogService();
