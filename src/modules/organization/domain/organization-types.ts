export const ORGANIZATION_TYPES = [
  { key: "MANUFACTURER", name: "Manufacturer", description: "Drug/product manufacturer" },
  { key: "PHARMACY", name: "Pharmacy", description: "Retail pharmacy" },
  { key: "DISTRIBUTOR", name: "Distributor", description: "Distribution company" },
  { key: "WHOLESALER", name: "Wholesaler", description: "Wholesale supplier" },
  { key: "HOSPITAL", name: "Hospital", description: "Hospital organization" },
  { key: "CLINIC", name: "Clinic", description: "Clinic organization" },
  { key: "LABORATORY", name: "Laboratory", description: "Laboratory / diagnostics" },
  { key: "IMPORTER", name: "Importer", description: "Importer of medical products" },
  { key: "NGO", name: "NGO", description: "Non-governmental organization" },
  { key: "GOVERNMENT", name: "Government", description: "Government agency" },
] as const;

export type OrganizationTypeKey = (typeof ORGANIZATION_TYPES)[number]["key"];
