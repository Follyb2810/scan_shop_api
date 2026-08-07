import { logger } from "../../../config/logger";
import { marketplaceRepository } from "./marketplace.repository";

const CATEGORIES = [
  { key: "OTC", name: "Over the counter", description: "Non-prescription medicines" },
  { key: "PRESCRIPTION", name: "Prescription", description: "Rx medicines" },
  { key: "WELLNESS", name: "Wellness", description: "Supplements & wellness" },
  { key: "DEVICES", name: "Medical devices", description: "Devices & supplies" },
  { key: "PERSONAL_CARE", name: "Personal care", description: "Hygiene & care" },
];

const COUPONS = [
  { code: "WELCOME10", percentOff: 10, minOrderTotal: 1000 },
  { code: "SAVE500", amountOff: 500, minOrderTotal: 5000 },
];

export async function seedMarketplaceReferenceData(): Promise<void> {
  await marketplaceRepository.seedCategories(CATEGORIES);
  await marketplaceRepository.seedCoupons(COUPONS);
  logger.info(
    { categories: CATEGORIES.length, coupons: COUPONS.length },
    "Marketplace reference data seeded"
  );
}
