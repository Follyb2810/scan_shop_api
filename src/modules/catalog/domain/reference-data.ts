export const MEDICINE_CATEGORIES = [
  { key: "ANTIBIOTIC", name: "Antibiotic" },
  { key: "ANALGESIC", name: "Analgesic" },
  { key: "ANTIMALARIAL", name: "Antimalarial" },
  { key: "VACCINE", name: "Vaccine" },
  { key: "VITAMIN", name: "Vitamin & Supplement" },
  { key: "CARDIOVASCULAR", name: "Cardiovascular" },
  { key: "ANTIDIABETIC", name: "Antidiabetic" },
  { key: "RESPIRATORY", name: "Respiratory" },
  { key: "DERMATOLOGY", name: "Dermatology" },
  { key: "OTHER", name: "Other" },
] as const;

export const DOSAGE_FORMS = [
  { key: "TABLET", name: "Tablet" },
  { key: "CAPSULE", name: "Capsule" },
  { key: "SYRUP", name: "Syrup" },
  { key: "INJECTION", name: "Injection" },
  { key: "CREAM", name: "Cream / Ointment" },
  { key: "DROPS", name: "Drops" },
  { key: "INHALER", name: "Inhaler" },
  { key: "POWDER", name: "Powder" },
  { key: "SUSPENSION", name: "Suspension" },
] as const;

export const PACKAGING_TYPES = [
  { key: "PALLET", name: "Pallet", rank: 1 },
  { key: "CARTON", name: "Carton", rank: 2 },
  { key: "INNER_PACK", name: "Inner pack", rank: 3 },
  { key: "BLISTER", name: "Blister pack", rank: 4 },
  { key: "RETAIL_UNIT", name: "Retail unit", rank: 5 },
] as const;

export const CATALOG_STATUSES = [
  "draft",
  "submitted",
  "approved",
  "rejected",
] as const;

export type CatalogStatus = (typeof CATALOG_STATUSES)[number];
