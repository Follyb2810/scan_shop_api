import { NextFunction, Request, Response, Router } from "express";
import {
  authenticate,
  reloadOrgRbac,
  requirePermission,
  requireTenant,
  validate,
} from "../../../middleware";
import { setTenantOnContext } from "../../../shared/types/RequestContext";
import { OrganizationController } from "./organization.controller";
import {
  createBranchSchema,
  createOrganizationSchema,
  inviteMemberSchema,
  updateBranchSchema,
  updateMemberSchema,
  updateOrganizationSchema,
} from "../application/validators";
import { orgRolesRouter } from "../../rbac/presentation/routes";
import { catalogOrgRouter } from "../../catalog/presentation/routes";
import { batchOrgRouter } from "../../batch/presentation/routes";
import { warehouseOrgRouter } from "../../warehouse/presentation/routes";
import { inventoryOrgRouter } from "../../inventory/presentation/routes";
import { verificationOrgRouter } from "../../verification/presentation/routes";
import { supplyChainOrgRouter } from "../../supply-chain/presentation/routes";
import { marketplaceOrgRouter } from "../../marketplace/presentation/routes";
import { auditOrgRouter } from "../../audit/presentation/routes";

function syncOrgIdFromParams(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  if (req.params.orgId && req.context) {
    setTenantOnContext(req.context, req.params.orgId);
  }
  next();
}

export const organizationRouter = Router();

/**
 * @openapi
 * tags:
 *   - name: Organizations
 *     description: Multi-tenant organizations, branches, members
 */

/**
 * @openapi
 * /api/v1/organizations/types:
 *   get:
 *     tags: [Organizations]
 *     summary: List organization types
 */
organizationRouter.get("/types", OrganizationController.listTypes);

/**
 * @openapi
 * /api/v1/organizations:
 *   post:
 *     tags: [Organizations]
 *     security: [{ bearerAuth: [] }]
 *     summary: Create organization (pending until workflow approval)
 */
organizationRouter.post(
  "/",
  authenticate,
  validate({ body: createOrganizationSchema }),
  OrganizationController.create
);

/**
 * @openapi
 * /api/v1/organizations/mine:
 *   get:
 *     tags: [Organizations]
 *     security: [{ bearerAuth: [] }]
 *     summary: List organizations for the current user
 */
organizationRouter.get("/mine", authenticate, OrganizationController.listMine);

const orgScoped = Router({ mergeParams: true });
orgScoped.use(authenticate, syncOrgIdFromParams, reloadOrgRbac, requireTenant);

orgScoped.get(
  "/",
  requirePermission("organization.read"),
  OrganizationController.getById
);

orgScoped.patch(
  "/",
  requirePermission("organization.update"),
  validate({ body: updateOrganizationSchema }),
  OrganizationController.update
);

orgScoped.get(
  "/branches",
  requirePermission("organization.read"),
  OrganizationController.listBranches
);

orgScoped.post(
  "/branches",
  requirePermission("organization.branches.manage"),
  validate({ body: createBranchSchema }),
  OrganizationController.createBranch
);

orgScoped.patch(
  "/branches/:branchId",
  requirePermission("organization.branches.manage"),
  validate({ body: updateBranchSchema }),
  OrganizationController.updateBranch
);

orgScoped.delete(
  "/branches/:branchId",
  requirePermission("organization.branches.manage"),
  OrganizationController.deleteBranch
);

orgScoped.get(
  "/members",
  requirePermission("users.read"),
  OrganizationController.listMembers
);

orgScoped.post(
  "/members",
  requirePermission("users.manage"),
  validate({ body: inviteMemberSchema }),
  OrganizationController.inviteMember
);

orgScoped.patch(
  "/members/:membershipId",
  requirePermission("users.manage"),
  validate({ body: updateMemberSchema }),
  OrganizationController.updateMember
);

// RBAC custom/system roles under the same tenant scope
orgScoped.use("/roles", orgRolesRouter);

// Catalog hierarchy (families, brands, medicines, variants, packages)
orgScoped.use(catalogOrgRouter);

// Manufacturing batches
orgScoped.use(batchOrgRouter);

// Warehouses (org-wide + nested under branch)
orgScoped.use(warehouseOrgRouter);

// Inventory positions and movements
orgScoped.use(inventoryOrgRouter);

// Verification unit generation / read
orgScoped.use(verificationOrgRouter);

// Inter-org custody transfers
orgScoped.use(supplyChainOrgRouter);

// Marketplace seller listings + org orders
orgScoped.use(marketplaceOrgRouter);

// Org-scoped compliance audit
orgScoped.use(auditOrgRouter);

organizationRouter.use("/:orgId", orgScoped);
