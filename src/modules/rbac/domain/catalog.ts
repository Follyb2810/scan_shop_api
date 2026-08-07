export type PermissionDef = {
  key: string;
  description: string;
  group: string;
};

/** Platform-owned permission catalog (orgs cannot invent keys). */
export const PERMISSION_CATALOG: PermissionDef[] = [
  // Platform
  { key: "platform.organizations.read", description: "View any organization", group: "platform" },
  { key: "platform.organizations.manage", description: "Create/update/suspend orgs", group: "platform" },
  { key: "platform.organizations.approve", description: "Approve org onboarding", group: "platform" },
  { key: "platform.users.manage", description: "Manage platform staff users", group: "platform" },
  { key: "platform.roles.manage", description: "Manage platform roles", group: "platform" },
  { key: "platform.settings.manage", description: "Platform settings", group: "platform" },
  { key: "platform.analytics.view", description: "Platform-wide analytics", group: "platform" },
  { key: "platform.audit.view", description: "Platform-wide audit", group: "platform" },
  { key: "platform.moderation.manage", description: "Moderate listings/content", group: "platform" },
  { key: "platform.support.manage", description: "Support tooling", group: "platform" },
  { key: "platform.finance.view", description: "Finance/revenue views", group: "platform" },
  { key: "platform.marketing.manage", description: "Marketing tools", group: "platform" },
  { key: "platform.pr.manage", description: "PR/comms tools", group: "platform" },

  // Organization
  { key: "organization.read", description: "View org profile", group: "organization" },
  { key: "organization.update", description: "Update org profile/settings", group: "organization" },
  { key: "organization.branches.manage", description: "Manage branches", group: "organization" },
  { key: "users.read", description: "List org members", group: "organization" },
  { key: "users.manage", description: "Invite/remove/update members", group: "organization" },
  { key: "roles.read", description: "View org roles", group: "organization" },
  { key: "roles.manage", description: "Create custom roles / assign permissions", group: "organization" },
  { key: "settings.update", description: "Org settings", group: "organization" },

  // Catalog & batch
  { key: "product.create", description: "Create catalog entities", group: "catalog" },
  { key: "product.read", description: "View catalog", group: "catalog" },
  { key: "product.update", description: "Update catalog", group: "catalog" },
  { key: "product.delete", description: "Soft-delete catalog", group: "catalog" },
  { key: "product.publish", description: "Submit/publish catalog", group: "catalog" },
  { key: "product.approve", description: "Approve products", group: "catalog" },
  { key: "batch.create", description: "Create batches", group: "batch" },
  { key: "batch.read", description: "View batches", group: "batch" },
  { key: "batch.update", description: "Update batch metadata", group: "batch" },
  { key: "batch.qa.manage", description: "QA transitions", group: "batch" },
  { key: "batch.recall.manage", description: "Manage recalls", group: "batch" },

  // Warehouse & inventory
  { key: "warehouse.manage", description: "CRUD warehouses", group: "warehouse" },
  { key: "warehouse.read", description: "View warehouses", group: "warehouse" },
  { key: "inventory.read", description: "View stock", group: "inventory" },
  { key: "inventory.adjust", description: "Adjust quantities", group: "inventory" },
  { key: "inventory.transfer", description: "Transfer within org", group: "inventory" },
  { key: "inventory.reserve", description: "Reserve stock", group: "inventory" },
  { key: "inventory.approve", description: "Approve inventory workflows", group: "inventory" },

  // Verification
  { key: "barcode.generate", description: "Generate signed unit identities", group: "verification" },
  { key: "barcode.scan", description: "Authenticated staff scans", group: "verification" },
  { key: "verification.read", description: "View verification/scan data", group: "verification" },

  // Supply chain
  { key: "supply_chain.read", description: "View transfers", group: "supply_chain" },
  { key: "supply_chain.create", description: "Create transfers", group: "supply_chain" },
  { key: "supply_chain.approve", description: "Approve transfers", group: "supply_chain" },
  { key: "supply_chain.receive", description: "Receive transfers", group: "supply_chain" },

  // Marketplace
  { key: "marketplace.listing.manage", description: "Create/update listings", group: "marketplace" },
  { key: "marketplace.listing.publish", description: "Submit listing for approval", group: "marketplace" },
  { key: "orders.read", description: "View org orders", group: "marketplace" },
  { key: "orders.manage", description: "Fulfill/manage orders", group: "marketplace" },
  { key: "payments.read", description: "View payment status", group: "marketplace" },

  // Analytics / audit
  { key: "analytics.view", description: "Org analytics", group: "analytics" },
  { key: "reports.export", description: "Export reports", group: "analytics" },
  { key: "audit.view", description: "View org audit logs", group: "audit" },
];

export const PLATFORM_PERMISSION_KEYS = PERMISSION_CATALOG.filter((p) =>
  p.key.startsWith("platform.")
).map((p) => p.key);

export const ORG_PERMISSION_KEYS = PERMISSION_CATALOG.filter(
  (p) => !p.key.startsWith("platform.")
).map((p) => p.key);

export type PlatformRoleDef = {
  key: string;
  name: string;
  description: string;
  /** empty = all permissions (SUPER_ADMIN) */
  permissions: string[] | "*";
};

export const PLATFORM_ROLES: PlatformRoleDef[] = [
  {
    key: "SUPER_ADMIN",
    name: "Super Admin",
    description: "Full SaaS control",
    permissions: "*",
  },
  {
    key: "PLATFORM_ADMIN",
    name: "Platform Admin",
    description: "Operations admin",
    permissions: [...PLATFORM_PERMISSION_KEYS, "organization.read", "audit.view", "analytics.view"],
  },
  {
    key: "PLATFORM_SUPPORT",
    name: "Platform Support",
    description: "Support tooling",
    permissions: [
      "platform.support.manage",
      "platform.organizations.read",
      "platform.users.manage",
      "platform.audit.view",
    ],
  },
  {
    key: "PLATFORM_MODERATOR",
    name: "Platform Moderator",
    description: "Content moderation",
    permissions: ["platform.moderation.manage", "platform.organizations.read"],
  },
  {
    key: "PLATFORM_ACCOUNTANT",
    name: "Platform Accountant",
    description: "Finance views",
    permissions: ["platform.finance.view", "platform.analytics.view"],
  },
  {
    key: "PLATFORM_ANALYST",
    name: "Platform Analyst",
    description: "Analytics",
    permissions: ["platform.analytics.view", "reports.export"],
  },
  {
    key: "PLATFORM_AUDITOR",
    name: "Platform Auditor",
    description: "Compliance read-only",
    permissions: [
      "platform.audit.view",
      "platform.organizations.read",
      "platform.analytics.view",
    ],
  },
  {
    key: "PLATFORM_MARKETING",
    name: "Platform Marketing",
    description: "Growth tools",
    permissions: ["platform.marketing.manage", "platform.analytics.view"],
  },
  {
    key: "PLATFORM_PR",
    name: "Platform PR",
    description: "Comms tools",
    permissions: ["platform.pr.manage"],
  },
  {
    key: "PLATFORM_VIEWER",
    name: "Platform Viewer",
    description: "Read-only staff",
    permissions: ["platform.organizations.read", "platform.analytics.view"],
  },
];

export type OrgRoleTemplateDef = {
  key: string;
  name: string;
  description: string;
  permissions: string[] | "*org";
};

const READ_SET = ORG_PERMISSION_KEYS.filter(
  (k) => k.endsWith(".read") || k === "analytics.view" || k === "verification.read"
);

export const ORG_ROLE_TEMPLATES: OrgRoleTemplateDef[] = [
  {
    key: "OWNER",
    name: "Owner",
    description: "Full organization control",
    permissions: "*org",
  },
  {
    key: "ADMIN",
    name: "Admin",
    description: "Organization administrator",
    permissions: "*org",
  },
  {
    key: "MODERATOR",
    name: "Moderator",
    description: "Content moderation",
    permissions: [
      "product.read",
      "product.update",
      "marketplace.listing.manage",
      "organization.read",
    ],
  },
  {
    key: "TEAM_MANAGER",
    name: "Team Manager",
    description: "People and branches",
    permissions: [
      "users.read",
      "users.manage",
      "organization.branches.manage",
      "roles.read",
      "organization.read",
    ],
  },
  {
    key: "ACCOUNTANT",
    name: "Accountant",
    description: "Orders and finance reads",
    permissions: [
      "orders.read",
      "payments.read",
      "analytics.view",
      "reports.export",
      "organization.read",
    ],
  },
  {
    key: "WAREHOUSE_MANAGER",
    name: "Warehouse Manager",
    description: "Warehouses and stock movements",
    permissions: [
      "warehouse.manage",
      "warehouse.read",
      "inventory.read",
      "inventory.adjust",
      "inventory.transfer",
      "inventory.reserve",
      "inventory.approve",
      "supply_chain.read",
      "supply_chain.receive",
      "barcode.scan",
      "analytics.view",
      "organization.read",
    ],
  },
  {
    key: "INVENTORY_MANAGER",
    name: "Inventory Manager",
    description: "Inventory operations",
    permissions: [
      "inventory.read",
      "inventory.adjust",
      "inventory.transfer",
      "inventory.reserve",
      "inventory.approve",
      "warehouse.read",
      "batch.read",
      "barcode.scan",
      "analytics.view",
      "organization.read",
    ],
  },
  {
    key: "QUALITY_ASSURANCE",
    name: "Quality Assurance",
    description: "QA and recalls",
    permissions: [
      "batch.read",
      "batch.qa.manage",
      "batch.recall.manage",
      "product.read",
      "audit.view",
      "barcode.scan",
      "analytics.view",
      "organization.read",
    ],
  },
  {
    key: "PRODUCTION_MANAGER",
    name: "Production Manager",
    description: "Catalog and batch production",
    permissions: [
      "product.create",
      "product.read",
      "product.update",
      "product.delete",
      "product.publish",
      "batch.create",
      "batch.read",
      "batch.update",
      "barcode.generate",
      "barcode.scan",
      "analytics.view",
      "organization.read",
    ],
  },
  {
    key: "SALES_MANAGER",
    name: "Sales Manager",
    description: "Listings and orders",
    permissions: [
      "marketplace.listing.manage",
      "marketplace.listing.publish",
      "orders.read",
      "orders.manage",
      "analytics.view",
      "organization.read",
    ],
  },
  {
    key: "CUSTOMER_SUPPORT",
    name: "Customer Support",
    description: "Order and verification support",
    permissions: [
      "orders.read",
      "users.read",
      "verification.read",
      "organization.read",
    ],
  },
  {
    key: "MARKETING",
    name: "Marketing",
    description: "Listings and analytics",
    permissions: [
      "marketplace.listing.manage",
      "analytics.view",
      "organization.read",
    ],
  },
  {
    key: "PHARMACIST",
    name: "Pharmacist",
    description: "Dispense and verify",
    permissions: [
      "product.read",
      "inventory.read",
      "orders.manage",
      "barcode.scan",
      "verification.read",
      "organization.read",
    ],
  },
  {
    key: "CASHIER",
    name: "Cashier",
    description: "Checkout scans",
    permissions: [
      "orders.manage",
      "barcode.scan",
      "inventory.read",
      "organization.read",
    ],
  },
  {
    key: "VIEWER",
    name: "Viewer",
    description: "Read-only org access",
    permissions: READ_SET,
  },
  {
    key: "USER",
    name: "User",
    description: "Minimal member access",
    permissions: ["organization.read", "product.read", "inventory.read"],
  },
];

export function resolveOrgTemplatePermissions(
  def: OrgRoleTemplateDef
): string[] {
  if (def.permissions === "*org") return [...ORG_PERMISSION_KEYS];
  return def.permissions;
}

export function resolvePlatformRolePermissions(
  def: PlatformRoleDef
): string[] {
  if (def.permissions === "*") {
    return PERMISSION_CATALOG.map((p) => p.key);
  }
  return def.permissions;
}
