import { prisma } from "../../../infrastructure/database";
import { logger } from "../../../config/logger";
import {
  DOSAGE_FORMS,
  MEDICINE_CATEGORIES,
  PACKAGING_TYPES,
} from "../domain/reference-data";

/** Idempotent seed for categories, dosage forms, packaging types. */
export async function seedCatalogReferenceData(): Promise<void> {
  for (const cat of MEDICINE_CATEGORIES) {
    const existing = await prisma.medicineCategory.findUnique({
      where: { key: cat.key },
    });
    if (existing) {
      await prisma.medicineCategory.update({
        where: { id: existing.id },
        data: { name: cat.name },
      });
    } else {
      await prisma.medicineCategory.create({
        data: { key: cat.key, name: cat.name },
      });
    }
  }

  for (const form of DOSAGE_FORMS) {
    const existing = await prisma.dosageForm.findUnique({
      where: { key: form.key },
    });
    if (existing) {
      await prisma.dosageForm.update({
        where: { id: existing.id },
        data: { name: form.name },
      });
    } else {
      await prisma.dosageForm.create({
        data: { key: form.key, name: form.name },
      });
    }
  }

  for (const pack of PACKAGING_TYPES) {
    const existing = await prisma.packagingType.findUnique({
      where: { key: pack.key },
    });
    if (existing) {
      await prisma.packagingType.update({
        where: { id: existing.id },
        data: { name: pack.name, rank: pack.rank },
      });
    } else {
      await prisma.packagingType.create({
        data: { key: pack.key, name: pack.name, rank: pack.rank },
      });
    }
  }

  logger.info(
    {
      categories: MEDICINE_CATEGORIES.length,
      dosageForms: DOSAGE_FORMS.length,
      packagingTypes: PACKAGING_TYPES.length,
    },
    "Catalog reference data seeded"
  );
}
