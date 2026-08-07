import { describe, expect, it, beforeAll } from "vitest";
import request from "supertest";
import { Application } from "express";
import { createApp } from "../../src/app";
import { rbacService } from "../../src/modules/rbac/application/rbac.service";
import { clearPermissionMemoryCache } from "../../src/modules/rbac/infrastructure/permission-cache";

describe("Step 17 Analytics", () => {
  let app: Application;
  const password = "Password123!";
  let ownerToken = "";
  let platformToken = "";
  let orgId = "";
  let branchId = "";
  let warehouseId = "";

  beforeAll(async () => {
    clearPermissionMemoryCache();
    app = createApp();

    const owner = await request(app).post("/api/v1/auth/register").send({
      email: `an-owner-${Date.now()}@example.com`,
      password,
    });
    ownerToken = owner.body.data.tokens.accessToken;

    const platform = await request(app).post("/api/v1/auth/register").send({
      email: `an-plat-${Date.now()}@example.com`,
      password,
    });
    platformToken = platform.body.data.tokens.accessToken;
    await rbacService.assignPlatformRole(
      platform.body.data.user.id,
      "SUPER_ADMIN"
    );

    const org = await request(app)
      .post("/api/v1/organizations")
      .set("Authorization", `Bearer ${ownerToken}`)
      .send({
        name: "Analytics Org",
        slug: `an-org-${Date.now()}`,
        typeKey: "PHARMACY",
      });
    orgId = org.body.data.organization.id;
    branchId = org.body.data.organization.branches[0].id;

    await request(app)
      .post(
        `/api/v1/workflows/instances/${org.body.data.approvalWorkflow.id}/actions`
      )
      .set("Authorization", `Bearer ${platformToken}`)
      .send({ decision: "approve" });

    clearPermissionMemoryCache();

    const wh = await request(app)
      .post(
        `/api/v1/organizations/${orgId}/branches/${branchId}/warehouses`
      )
      .set("Authorization", `Bearer ${ownerToken}`)
      .set("X-Organization-Id", orgId)
      .send({ typeKey: "MAIN", name: "Main WH", code: "AN-MAIN" });
    warehouseId = wh.body.data.warehouse.id;

    const hierarchy = await request(app)
      .post(`/api/v1/organizations/${orgId}/hierarchy`)
      .set("Authorization", `Bearer ${ownerToken}`)
      .set("X-Organization-Id", orgId)
      .send({
        family: { name: "AN Family" },
        brand: { name: "AN Brand" },
        medicine: { name: "AN Med", categoryKey: "ANALGESIC" },
        variant: {
          name: "AN Med 5mg",
          strength: "5mg",
          sku: `AN-${Date.now()}`,
          dosageFormKey: "TABLET",
        },
        package: {
          name: "Retail",
          unitsPerPackage: 1,
          packagingTypeKey: "RETAIL_UNIT",
        },
      });

    const batch = await request(app)
      .post(`/api/v1/organizations/${orgId}/batches`)
      .set("Authorization", `Bearer ${ownerToken}`)
      .set("X-Organization-Id", orgId)
      .send({
        packageDefinitionId: hierarchy.body.data.hierarchy.package.id,
        batchNumber: `ANB-${Date.now()}`,
        manufactureDate: "2026-01-01T00:00:00.000Z",
        expiryDate: "2028-01-01T00:00:00.000Z",
        productionQuantity: 50,
      });

    await request(app)
      .post(
        `/api/v1/organizations/${orgId}/batches/${batch.body.data.batch.id}/qa`
      )
      .set("Authorization", `Bearer ${ownerToken}`)
      .set("X-Organization-Id", orgId)
      .send({ status: "passed" });

    await request(app)
      .post(`/api/v1/organizations/${orgId}/inventory/receive`)
      .set("Authorization", `Bearer ${ownerToken}`)
      .set("X-Organization-Id", orgId)
      .send({
        warehouseId,
        batchId: batch.body.data.batch.id,
        packagingLevel: "RETAIL_UNIT",
        quantity: 25,
      });
  });

  it("returns platform overview for platform analytics role", async () => {
    const res = await request(app)
      .get("/api/v1/analytics/platform/overview")
      .set("Authorization", `Bearer ${platformToken}`);

    expect(res.status).toBe(200);
    expect(res.body.data.overview.organizations).toBeGreaterThan(0);
    expect(res.body.data.overview.users).toBeGreaterThan(0);
  });

  it("returns org / branch / warehouse / inventory / sales aggregates", async () => {
    clearPermissionMemoryCache();

    const orgOverview = await request(app)
      .get("/api/v1/analytics/organization/overview")
      .set("Authorization", `Bearer ${ownerToken}`)
      .set("X-Organization-Id", orgId);

    expect(orgOverview.status).toBe(200);
    expect(orgOverview.body.data.overview.organizationId).toBe(orgId);
    expect(orgOverview.body.data.overview.batches).toBeGreaterThanOrEqual(1);
    expect(orgOverview.body.data.overview.inventory.available).toBe(25);
    expect(orgOverview.body.data.overview.warehouses).toBeGreaterThanOrEqual(1);

    const branch = await request(app)
      .get(`/api/v1/analytics/branch/${branchId}`)
      .set("Authorization", `Bearer ${ownerToken}`)
      .set("X-Organization-Id", orgId);
    expect(branch.status).toBe(200);
    expect(branch.body.data.overview.inventory.available).toBe(25);

    const warehouse = await request(app)
      .get(`/api/v1/analytics/warehouse/${warehouseId}`)
      .set("Authorization", `Bearer ${ownerToken}`)
      .set("X-Organization-Id", orgId);
    expect(warehouse.status).toBe(200);
    expect(warehouse.body.data.overview.inventory.available).toBe(25);

    const inventory = await request(app)
      .get("/api/v1/analytics/inventory")
      .set("Authorization", `Bearer ${ownerToken}`)
      .set("X-Organization-Id", orgId);
    expect(inventory.body.data.overview.available).toBe(25);

    const sales = await request(app)
      .get("/api/v1/analytics/sales")
      .set("Authorization", `Bearer ${ownerToken}`)
      .set("X-Organization-Id", orgId);
    expect(sales.status).toBe(200);
    expect(sales.body.data.overview.orders).toBeGreaterThanOrEqual(0);

    const platformAlias = await request(app)
      .get("/api/v1/platform/analytics/overview")
      .set("Authorization", `Bearer ${platformToken}`);
    expect(platformAlias.status).toBe(200);
  });
});
