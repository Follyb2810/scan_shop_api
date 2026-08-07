import { describe, expect, it, beforeAll } from "vitest";
import request from "supertest";
import { Application } from "express";
import { createApp } from "../../src/app";
import { rbacService } from "../../src/modules/rbac/application/rbac.service";
import { clearPermissionMemoryCache } from "../../src/modules/rbac/infrastructure/permission-cache";
import { inventoryService } from "../../src/modules/inventory/application/inventory.service";
import { ConflictError } from "../../src/shared/errors";

describe("Step 11 Inventory module", () => {
  let app: Application;
  const password = "Password123!";

  let ownerToken = "";
  let approverToken = "";
  let orgId = "";
  let branchId = "";
  let warehouseAId = "";
  let warehouseBId = "";
  let batchId = "";
  const packagingLevel = "RETAIL_UNIT";

  beforeAll(async () => {
    clearPermissionMemoryCache();
    app = createApp();

    const owner = await request(app).post("/api/v1/auth/register").send({
      email: `inv-owner-${Date.now()}@example.com`,
      password,
    });
    ownerToken = owner.body.data.tokens.accessToken;

    const approver = await request(app).post("/api/v1/auth/register").send({
      email: `inv-approver-${Date.now()}@example.com`,
      password,
    });
    approverToken = approver.body.data.tokens.accessToken;
    await rbacService.assignPlatformRole(
      approver.body.data.user.id,
      "SUPER_ADMIN"
    );

    const org = await request(app)
      .post("/api/v1/organizations")
      .set("Authorization", `Bearer ${ownerToken}`)
      .send({
        name: "Inventory Co",
        slug: `inv-co-${Date.now()}`,
        typeKey: "DISTRIBUTOR",
      });
    orgId = org.body.data.organization.id;
    branchId = org.body.data.organization.branches[0].id;

    await request(app)
      .post(
        `/api/v1/workflows/instances/${org.body.data.approvalWorkflow.id}/actions`
      )
      .set("Authorization", `Bearer ${approverToken}`)
      .send({ decision: "approve" });

    clearPermissionMemoryCache();

    const whA = await request(app)
      .post(`/api/v1/organizations/${orgId}/branches/${branchId}/warehouses`)
      .set("Authorization", `Bearer ${ownerToken}`)
      .set("X-Organization-Id", orgId)
      .send({ typeKey: "MAIN", name: "Main WH", code: "INV-A" });
    warehouseAId = whA.body.data.warehouse.id;

    const whB = await request(app)
      .post(`/api/v1/organizations/${orgId}/branches/${branchId}/warehouses`)
      .set("Authorization", `Bearer ${ownerToken}`)
      .set("X-Organization-Id", orgId)
      .send({ typeKey: "TRANSIT", name: "Transit WH", code: "INV-B" });
    warehouseBId = whB.body.data.warehouse.id;

    const hierarchy = await request(app)
      .post(`/api/v1/organizations/${orgId}/hierarchy`)
      .set("Authorization", `Bearer ${ownerToken}`)
      .set("X-Organization-Id", orgId)
      .send({
        family: { name: "Vitamins" },
        brand: { name: "Vita" },
        medicine: { name: "Vitamin C", categoryKey: "VITAMIN" },
        variant: {
          name: "Vitamin C 1000mg",
          strength: "1000mg",
          sku: `VITC-${Date.now()}`,
          dosageFormKey: "TABLET",
        },
        package: {
          name: "Bottle 30",
          unitsPerPackage: 30,
          packagingTypeKey: "RETAIL_UNIT",
        },
      });

    const packageId = hierarchy.body.data.hierarchy.package.id;

    const batch = await request(app)
      .post(`/api/v1/organizations/${orgId}/batches`)
      .set("Authorization", `Bearer ${ownerToken}`)
      .set("X-Organization-Id", orgId)
      .send({
        packageDefinitionId: packageId,
        batchNumber: `INV-BN-${Date.now()}`,
        manufactureDate: "2026-01-01T00:00:00.000Z",
        expiryDate: "2028-01-01T00:00:00.000Z",
        productionQuantity: 100000,
      });
    batchId = batch.body.data.batch.id;

    await request(app)
      .post(`/api/v1/organizations/${orgId}/batches/${batchId}/qa`)
      .set("Authorization", `Bearer ${ownerToken}`)
      .set("X-Organization-Id", orgId)
      .send({ status: "passed" });
  });

  it("receives stock into available", async () => {
    clearPermissionMemoryCache();
    const res = await request(app)
      .post(`/api/v1/organizations/${orgId}/inventory/receive`)
      .set("Authorization", `Bearer ${ownerToken}`)
      .set("X-Organization-Id", orgId)
      .send({
        warehouseId: warehouseAId,
        batchId,
        packagingLevel,
        quantity: 1000,
      });

    expect(res.status).toBe(201);
    expect(res.body.data.position.available).toBe(1000);
    expect(res.body.data.position.reserved).toBe(0);
    expect(res.body.data.position.packagingLevel).toBe(packagingLevel);
  });

  it("reserves and releases stock", async () => {
    const reserve = await request(app)
      .post(`/api/v1/organizations/${orgId}/inventory/reserve`)
      .set("Authorization", `Bearer ${ownerToken}`)
      .set("X-Organization-Id", orgId)
      .send({
        warehouseId: warehouseAId,
        batchId,
        packagingLevel,
        quantity: 200,
      });

    expect(reserve.status).toBe(200);
    expect(reserve.body.data.position.available).toBe(800);
    expect(reserve.body.data.position.reserved).toBe(200);

    const release = await request(app)
      .post(`/api/v1/organizations/${orgId}/inventory/release`)
      .set("Authorization", `Bearer ${ownerToken}`)
      .set("X-Organization-Id", orgId)
      .send({
        warehouseId: warehouseAId,
        batchId,
        packagingLevel,
        quantity: 50,
      });

    expect(release.status).toBe(200);
    expect(release.body.data.position.available).toBe(850);
    expect(release.body.data.position.reserved).toBe(150);
  });

  it("adjusts available → damaged", async () => {
    const res = await request(app)
      .post(`/api/v1/organizations/${orgId}/inventory/adjust`)
      .set("Authorization", `Bearer ${ownerToken}`)
      .set("X-Organization-Id", orgId)
      .send({
        warehouseId: warehouseAId,
        batchId,
        packagingLevel,
        fromState: "available",
        toState: "damaged",
        quantity: 25,
        reason: "Broken seals",
      });

    expect(res.status).toBe(200);
    expect(res.body.data.position.available).toBe(825);
    expect(res.body.data.position.damaged).toBe(25);
  });

  it("transfers within org between warehouses", async () => {
    const res = await request(app)
      .post(`/api/v1/organizations/${orgId}/inventory/transfer`)
      .set("Authorization", `Bearer ${ownerToken}`)
      .set("X-Organization-Id", orgId)
      .send({
        fromWarehouseId: warehouseAId,
        toWarehouseId: warehouseBId,
        batchId,
        packagingLevel,
        quantity: 100,
      });

    expect(res.status).toBe(200);
    expect(res.body.data.from.available).toBe(725);
    expect(res.body.data.to.available).toBe(100);
    expect(res.body.data.to.warehouseId).toBe(warehouseBId);
  });

  it("rejects oversell reserve", async () => {
    const res = await request(app)
      .post(`/api/v1/organizations/${orgId}/inventory/reserve`)
      .set("Authorization", `Bearer ${ownerToken}`)
      .set("X-Organization-Id", orgId)
      .send({
        warehouseId: warehouseAId,
        batchId,
        packagingLevel,
        quantity: 999999,
      });

    expect(res.status).toBe(409);
  });

  it("lists positions and movements", async () => {
    const positions = await request(app)
      .get(`/api/v1/organizations/${orgId}/inventory`)
      .set("Authorization", `Bearer ${ownerToken}`)
      .set("X-Organization-Id", orgId);

    expect(positions.status).toBe(200);
    expect(positions.body.data.positions.length).toBeGreaterThanOrEqual(2);

    const movements = await request(app)
      .get(`/api/v1/organizations/${orgId}/inventory/movements`)
      .set("Authorization", `Bearer ${ownerToken}`)
      .set("X-Organization-Id", orgId);

    expect(movements.status).toBe(200);
    expect(movements.body.data.movements.length).toBeGreaterThanOrEqual(4);
  });

  it("keeps totals consistent under concurrent-style reserves", async () => {
    // Seed a fresh bucket with exactly 100 available
    await inventoryService.receive(orgId, "concurrent-test", {
      warehouseId: warehouseAId,
      batchId,
      packagingLevel: "BLISTER",
      quantity: 100,
    });

    const qtyEach = 10;
    const attempts = 20; // 20 * 10 = 200 requested against 100 available

    const results = await Promise.allSettled(
      Array.from({ length: attempts }, () =>
        inventoryService.reserve(orgId, "concurrent-test", {
          warehouseId: warehouseAId,
          batchId,
          packagingLevel: "BLISTER",
          quantity: qtyEach,
        })
      )
    );

    const succeeded = results.filter((r) => r.status === "fulfilled").length;
    const failed = results.filter((r) => r.status === "rejected").length;

    expect(succeeded).toBe(10); // exactly 100 / 10
    expect(failed).toBe(10);

    for (const r of results) {
      if (r.status === "rejected") {
        expect(r.reason).toBeInstanceOf(ConflictError);
      }
    }

    const positions = await inventoryService.list(orgId, {
      warehouseId: warehouseAId,
      batchId,
    });
    const blister = positions.find((p) => p.packagingLevel === "BLISTER");
    expect(blister).toBeTruthy();
    expect(blister!.available).toBe(0);
    expect(blister!.reserved).toBe(100);
    expect(
      blister!.available +
        blister!.reserved +
        blister!.damaged +
        blister!.expired +
        blister!.quarantined +
        blister!.returned +
        blister!.inTransit +
        blister!.sold +
        blister!.destroyed
    ).toBe(100);
  });
});
