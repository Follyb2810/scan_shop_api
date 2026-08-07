import { describe, expect, it, beforeAll } from "vitest";
import request from "supertest";
import { Application } from "express";
import { createApp } from "../../src/app";
import { rbacService } from "../../src/modules/rbac/application/rbac.service";
import { clearPermissionMemoryCache } from "../../src/modules/rbac/infrastructure/permission-cache";

describe("Step 10 Warehouse module", () => {
  let app: Application;
  const password = "Password123!";

  let ownerToken = "";
  let otherToken = "";
  let approverToken = "";
  let orgId = "";
  let orgBId = "";
  let hqBranchId = "";
  let secondBranchId = "";
  let mainWarehouseId = "";

  beforeAll(async () => {
    clearPermissionMemoryCache();
    app = createApp();

    const owner = await request(app).post("/api/v1/auth/register").send({
      email: `wh-owner-${Date.now()}@example.com`,
      password,
    });
    ownerToken = owner.body.data.tokens.accessToken;

    const other = await request(app).post("/api/v1/auth/register").send({
      email: `wh-other-${Date.now()}@example.com`,
      password,
    });
    otherToken = other.body.data.tokens.accessToken;

    const approver = await request(app).post("/api/v1/auth/register").send({
      email: `wh-approver-${Date.now()}@example.com`,
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
        name: "Warehouse Pharma",
        slug: `wh-pharma-${Date.now()}`,
        typeKey: "DISTRIBUTOR",
      });
    orgId = org.body.data.organization.id;
    hqBranchId = org.body.data.organization.branches[0].id;

    await request(app)
      .post(
        `/api/v1/workflows/instances/${org.body.data.approvalWorkflow.id}/actions`
      )
      .set("Authorization", `Bearer ${approverToken}`)
      .send({ decision: "approve" });

    const orgB = await request(app)
      .post("/api/v1/organizations")
      .set("Authorization", `Bearer ${otherToken}`)
      .send({
        name: "Other Dist",
        slug: `wh-other-${Date.now()}`,
        typeKey: "PHARMACY",
      });
    orgBId = orgB.body.data.organization.id;

    await request(app)
      .post(
        `/api/v1/workflows/instances/${orgB.body.data.approvalWorkflow.id}/actions`
      )
      .set("Authorization", `Bearer ${approverToken}`)
      .send({ decision: "approve" });

    clearPermissionMemoryCache();

    const branch = await request(app)
      .post(`/api/v1/organizations/${orgId}/branches`)
      .set("Authorization", `Bearer ${ownerToken}`)
      .set("X-Organization-Id", orgId)
      .send({ name: "Ikeja Depot", code: "IKJ" });

    expect(branch.status).toBe(201);
    secondBranchId = branch.body.data.branch.id;
  });

  it("lists seeded warehouse types", async () => {
    const res = await request(app).get("/api/v1/warehouses/types");
    expect(res.status).toBe(200);
    const keys = res.body.data.types.map((t: { key: string }) => t.key);
    expect(keys).toEqual(
      expect.arrayContaining([
        "MAIN",
        "COLD_STORAGE",
        "RETURNS",
        "TRANSIT",
        "OVERFLOW",
      ])
    );
  });

  it("creates multiple warehouses under HQ branch", async () => {
    clearPermissionMemoryCache();
    const main = await request(app)
      .post(`/api/v1/organizations/${orgId}/branches/${hqBranchId}/warehouses`)
      .set("Authorization", `Bearer ${ownerToken}`)
      .set("X-Organization-Id", orgId)
      .send({
        typeKey: "MAIN",
        name: "HQ Main Store",
        code: "HQ-MAIN",
        capacityUnits: 50000,
      });

    expect(main.status).toBe(201);
    expect(main.body.data.warehouse.type.key).toBe("MAIN");
    expect(main.body.data.warehouse.branchId).toBe(hqBranchId);
    mainWarehouseId = main.body.data.warehouse.id;

    const cold = await request(app)
      .post(`/api/v1/organizations/${orgId}/warehouses`)
      .set("Authorization", `Bearer ${ownerToken}`)
      .set("X-Organization-Id", orgId)
      .send({
        branchId: hqBranchId,
        typeKey: "COLD_STORAGE",
        name: "HQ Cold Room",
        code: "HQ-COLD",
      });

    expect(cold.status).toBe(201);
    expect(cold.body.data.warehouse.type.key).toBe("COLD_STORAGE");
  });

  it("creates warehouse on second branch", async () => {
    const res = await request(app)
      .post(
        `/api/v1/organizations/${orgId}/branches/${secondBranchId}/warehouses`
      )
      .set("Authorization", `Bearer ${ownerToken}`)
      .set("X-Organization-Id", orgId)
      .send({
        typeKey: "TRANSIT",
        name: "Ikeja Transit",
        code: "IKJ-TRN",
      });

    expect(res.status).toBe(201);
    expect(res.body.data.warehouse.branchId).toBe(secondBranchId);
  });

  it("lists all org warehouses and filters by branch", async () => {
    const all = await request(app)
      .get(`/api/v1/organizations/${orgId}/warehouses`)
      .set("Authorization", `Bearer ${ownerToken}`)
      .set("X-Organization-Id", orgId);

    expect(all.status).toBe(200);
    expect(all.body.data.warehouses.length).toBeGreaterThanOrEqual(3);

    const hqOnly = await request(app)
      .get(`/api/v1/organizations/${orgId}/warehouses`)
      .query({ branchId: hqBranchId })
      .set("Authorization", `Bearer ${ownerToken}`)
      .set("X-Organization-Id", orgId);

    expect(hqOnly.body.data.warehouses.every(
      (w: { branchId: string }) => w.branchId === hqBranchId
    )).toBe(true);
    expect(hqOnly.body.data.warehouses.length).toBeGreaterThanOrEqual(2);
  });

  it("rejects duplicate code on same branch", async () => {
    const res = await request(app)
      .post(`/api/v1/organizations/${orgId}/warehouses`)
      .set("Authorization", `Bearer ${ownerToken}`)
      .set("X-Organization-Id", orgId)
      .send({
        branchId: hqBranchId,
        typeKey: "OVERFLOW",
        name: "Dup Code",
        code: "HQ-MAIN",
      });

    expect(res.status).toBe(409);
  });

  it("updates warehouse status", async () => {
    const res = await request(app)
      .patch(`/api/v1/organizations/${orgId}/warehouses/${mainWarehouseId}`)
      .set("Authorization", `Bearer ${ownerToken}`)
      .set("X-Organization-Id", orgId)
      .send({ status: "maintenance", notes: "Refrigeration check" });

    expect(res.status).toBe(200);
    expect(res.body.data.warehouse.status).toBe("maintenance");
  });

  it("blocks cross-tenant warehouse access", async () => {
    const res = await request(app)
      .get(`/api/v1/organizations/${orgId}/warehouses/${mainWarehouseId}`)
      .set("Authorization", `Bearer ${otherToken}`)
      .set("X-Organization-Id", orgBId);

    expect([403, 404]).toContain(res.status);
  });

  it("soft-deletes warehouse", async () => {
    const created = await request(app)
      .post(`/api/v1/organizations/${orgId}/warehouses`)
      .set("Authorization", `Bearer ${ownerToken}`)
      .set("X-Organization-Id", orgId)
      .send({
        branchId: hqBranchId,
        typeKey: "RETURNS",
        name: "Temp Returns",
        code: "HQ-RET-TMP",
      });

    const id = created.body.data.warehouse.id;
    const del = await request(app)
      .delete(`/api/v1/organizations/${orgId}/warehouses/${id}`)
      .set("Authorization", `Bearer ${ownerToken}`)
      .set("X-Organization-Id", orgId);

    expect(del.status).toBe(200);
    expect(del.body.data.deleted).toBe(true);

    const get = await request(app)
      .get(`/api/v1/organizations/${orgId}/warehouses/${id}`)
      .set("Authorization", `Bearer ${ownerToken}`)
      .set("X-Organization-Id", orgId);

    expect(get.status).toBe(404);
  });
});
