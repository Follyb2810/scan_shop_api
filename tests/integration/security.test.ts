import { describe, expect, it, beforeAll } from "vitest";
import request from "supertest";
import { Application } from "express";
import { createApp } from "../../src/app";
import { rbacService } from "../../src/modules/rbac/application/rbac.service";
import { clearPermissionMemoryCache } from "../../src/modules/rbac/infrastructure/permission-cache";

/**
 * Step 19 — Tenant isolation + permission fuzz regression suite.
 */
describe("Step 19 Security — tenant isolation & permission fuzz", () => {
  let app: Application;
  const password = "Password123!";

  let ownerAToken = "";
  let ownerBToken = "";
  let strangerToken = "";
  let approverToken = "";
  let orgAId = "";
  let orgBId = "";
  let packageAId = "";
  let branchAId = "";
  let warehouseAId = "";
  let batchAId = "";

  beforeAll(async () => {
    clearPermissionMemoryCache();
    app = createApp();

    const ownerA = await request(app).post("/api/v1/auth/register").send({
      email: `sec-a-${Date.now()}@example.com`,
      password,
    });
    ownerAToken = ownerA.body.data.tokens.accessToken;

    const ownerB = await request(app).post("/api/v1/auth/register").send({
      email: `sec-b-${Date.now()}@example.com`,
      password,
    });
    ownerBToken = ownerB.body.data.tokens.accessToken;

    const stranger = await request(app).post("/api/v1/auth/register").send({
      email: `sec-stranger-${Date.now()}@example.com`,
      password,
    });
    strangerToken = stranger.body.data.tokens.accessToken;

    const approver = await request(app).post("/api/v1/auth/register").send({
      email: `sec-approver-${Date.now()}@example.com`,
      password,
    });
    approverToken = approver.body.data.tokens.accessToken;
    await rbacService.assignPlatformRole(
      approver.body.data.user.id,
      "SUPER_ADMIN"
    );

    const orgA = await request(app)
      .post("/api/v1/organizations")
      .set("Authorization", `Bearer ${ownerAToken}`)
      .send({
        name: "Sec Org A",
        slug: `sec-a-${Date.now()}`,
        typeKey: "PHARMACY",
      });
    orgAId = orgA.body.data.organization.id;
    branchAId = orgA.body.data.organization.branches[0].id;

    await request(app)
      .post(
        `/api/v1/workflows/instances/${orgA.body.data.approvalWorkflow.id}/actions`
      )
      .set("Authorization", `Bearer ${approverToken}`)
      .send({ decision: "approve" });

    const orgB = await request(app)
      .post("/api/v1/organizations")
      .set("Authorization", `Bearer ${ownerBToken}`)
      .send({
        name: "Sec Org B",
        slug: `sec-b-${Date.now()}`,
        typeKey: "DISTRIBUTOR",
      });
    orgBId = orgB.body.data.organization.id;

    await request(app)
      .post(
        `/api/v1/workflows/instances/${orgB.body.data.approvalWorkflow.id}/actions`
      )
      .set("Authorization", `Bearer ${approverToken}`)
      .send({ decision: "approve" });

    clearPermissionMemoryCache();

    const wh = await request(app)
      .post(
        `/api/v1/organizations/${orgAId}/branches/${branchAId}/warehouses`
      )
      .set("Authorization", `Bearer ${ownerAToken}`)
      .set("X-Organization-Id", orgAId)
      .send({ typeKey: "MAIN", name: "A Main", code: "SEC-A" });
    warehouseAId = wh.body.data.warehouse.id;

    const hierarchy = await request(app)
      .post(`/api/v1/organizations/${orgAId}/hierarchy`)
      .set("Authorization", `Bearer ${ownerAToken}`)
      .set("X-Organization-Id", orgAId)
      .send({
        family: { name: "Sec Family" },
        brand: { name: "Sec Brand" },
        medicine: { name: "Sec Med", categoryKey: "ANALGESIC" },
        variant: {
          name: "Sec Med 1mg",
          strength: "1mg",
          sku: `SEC-${Date.now()}`,
          dosageFormKey: "TABLET",
        },
        package: {
          name: "Retail",
          unitsPerPackage: 1,
          packagingTypeKey: "RETAIL_UNIT",
        },
      });
    packageAId = hierarchy.body.data.hierarchy.package.id;

    const batch = await request(app)
      .post(`/api/v1/organizations/${orgAId}/batches`)
      .set("Authorization", `Bearer ${ownerAToken}`)
      .set("X-Organization-Id", orgAId)
      .send({
        packageDefinitionId: packageAId,
        batchNumber: `SEC-BN-${Date.now()}`,
        manufactureDate: "2026-01-01T00:00:00.000Z",
        expiryDate: "2028-01-01T00:00:00.000Z",
        productionQuantity: 100,
      });
    batchAId = batch.body.data.batch.id;

    await request(app)
      .post(`/api/v1/organizations/${orgAId}/batches/${batchAId}/qa`)
      .set("Authorization", `Bearer ${ownerAToken}`)
      .set("X-Organization-Id", orgAId)
      .send({ status: "passed" });

    await request(app)
      .post(`/api/v1/organizations/${orgAId}/inventory/receive`)
      .set("Authorization", `Bearer ${ownerAToken}`)
      .set("X-Organization-Id", orgAId)
      .send({
        warehouseId: warehouseAId,
        batchId: batchAId,
        packagingLevel: "RETAIL_UNIT",
        quantity: 40,
      });
  });

  it("blocks cross-tenant org read", async () => {
    const res = await request(app)
      .get(`/api/v1/organizations/${orgAId}`)
      .set("Authorization", `Bearer ${ownerBToken}`)
      .set("X-Organization-Id", orgAId);
    expect([403, 404]).toContain(res.status);
  });

  it("blocks cross-tenant batch access", async () => {
    const res = await request(app)
      .get(`/api/v1/organizations/${orgAId}/batches/${batchAId}`)
      .set("Authorization", `Bearer ${ownerBToken}`)
      .set("X-Organization-Id", orgBId);
    expect([403, 404]).toContain(res.status);
  });

  it("blocks cross-tenant inventory list via wrong org header", async () => {
    const res = await request(app)
      .get(`/api/v1/organizations/${orgAId}/inventory`)
      .set("Authorization", `Bearer ${ownerBToken}`)
      .set("X-Organization-Id", orgAId);
    expect(res.status).toBe(403);
  });

  it("blocks cross-tenant warehouse receive into org A as org B member", async () => {
    const res = await request(app)
      .post(`/api/v1/organizations/${orgAId}/inventory/receive`)
      .set("Authorization", `Bearer ${ownerBToken}`)
      .set("X-Organization-Id", orgBId)
      .send({
        warehouseId: warehouseAId,
        batchId: batchAId,
        packagingLevel: "RETAIL_UNIT",
        quantity: 1,
      });
    expect([403, 404]).toContain(res.status);
  });

  it("permission fuzz: stranger cannot manage listings or payments.read org routes", async () => {
    const listing = await request(app)
      .post("/api/v1/marketplace/listings")
      .set("Authorization", `Bearer ${strangerToken}`)
      .set("X-Organization-Id", orgAId)
      .send({
        packageDefinitionId: packageAId,
        title: "Nope",
        price: 10,
        currency: "NGN",
      });
    expect(listing.status).toBe(403);

    const audit = await request(app)
      .get("/api/v1/audit")
      .set("Authorization", `Bearer ${strangerToken}`)
      .set("X-Organization-Id", orgAId);
    expect(audit.status).toBe(403);

    const analytics = await request(app)
      .get("/api/v1/analytics/organization/overview")
      .set("Authorization", `Bearer ${strangerToken}`)
      .set("X-Organization-Id", orgAId);
    expect(analytics.status).toBe(403);

    const fulfill = await request(app)
      .patch(`/api/v1/orders/00000000-0000-0000-0000-000000000001/fulfill`)
      .set("Authorization", `Bearer ${strangerToken}`)
      .set("X-Organization-Id", orgAId)
      .send({ status: "shipped" });
    expect(fulfill.status).toBe(403);
  });

  it("permission fuzz: customer cannot call platform analytics", async () => {
    const res = await request(app)
      .get("/api/v1/analytics/platform/overview")
      .set("Authorization", `Bearer ${strangerToken}`);
    expect(res.status).toBe(403);
  });

  it("blocks supply-chain create into foreign org path", async () => {
    const res = await request(app)
      .post(`/api/v1/organizations/${orgAId}/supply-chain/transfers`)
      .set("Authorization", `Bearer ${ownerBToken}`)
      .set("X-Organization-Id", orgAId)
      .send({
        toOrganizationId: orgBId,
        fromWarehouseId: warehouseAId,
        lines: [
          {
            batchId: batchAId,
            packagingLevel: "RETAIL_UNIT",
            quantity: 1,
          },
        ],
      });
    expect(res.status).toBe(403);
  });
});
