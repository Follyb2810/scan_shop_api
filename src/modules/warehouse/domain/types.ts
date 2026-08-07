export const WAREHOUSE_TYPES = [
  {
    key: "MAIN",
    name: "Main",
    description: "Primary storage warehouse",
  },
  {
    key: "COLD_STORAGE",
    name: "Cold Storage",
    description: "Temperature-controlled storage",
  },
  {
    key: "RETURNS",
    name: "Returns",
    description: "Returned goods holding",
  },
  {
    key: "TRANSIT",
    name: "Transit",
    description: "In-transit / staging warehouse",
  },
  {
    key: "OVERFLOW",
    name: "Overflow",
    description: "Overflow / secondary capacity",
  },
] as const;

export const WAREHOUSE_STATUSES = ["active", "inactive", "maintenance"] as const;

export type WarehouseStatus = (typeof WAREHOUSE_STATUSES)[number];
