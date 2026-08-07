import { describe, expect, it, beforeAll } from "vitest";
import request from "supertest";
import { Application } from "express";
import { createApp } from "../../src/app";
import { rbacService } from "../../src/modules/rbac/application/rbac.service";
import { clearPermissionMemoryCache } from "../../src/modules/rbac/infrastructure/permission-cache";

describe("Step 9 Batch module", () => {
  let app: Application;
  const password = "Password123!";

  let ownerToken = "";
  let approverToken = "";
  let orgId = "";
  let packageId = "";
  let batchId = "";

  beforeAll(async () => {
    clearPermissionMemoryCache();
    app = createApp();

    const owner = await request(app).post("/api/v1/auth/register").send({
      email: `batch-owner-${Date.now()}@example.com`,
      password,
    });
    ownerToken = owner.body.data.tokens.accessToken;

    const approver = await request(app).post("/api/v1/auth/register").send({
      email: `batch-approver-${Date.now()}@example.com`,
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
        name: "Batch Mfr",
        slug: `batch-mfr-${Date.now()}`,
        typeKey: "MANUFACTURER",
      });
    orgId = org.body.data.organization.id;

    await request(app)
      .post(
        `/api/v1/workflows/instances/${org.body.data.approvalWorkflow.id}/actions`
      )
      .set("Authorization", `Bearer ${approverToken}`)
      .send({ decision: "approve" });

    clearPermissionMemoryCache();

    const hierarchy = await request(app)
      .post(`/api/v1/organizations/${orgId}/hierarchy`)
      .set("Authorization", `Bearer ${ownerToken}`)
      .set("X-Organization-Id", orgId)
      .send({
        family: { name: "Analgesics" },
        brand: { name: "PainAway" },
        medicine: { name: "Paracetamol", categoryKey: "ANALGESIC" },
        variant: {
          name: "Paracetamol 500mg Tablet",
          strength: "500mg",
          sku: `PARA-500-${Date.now()}`,
          dosageFormKey: "TABLET",
        },
        package: {
          name: "Carton 10x10",
          unitsPerPackage: 100,
          packagingTypeKey: "CARTON",
        },
      });

    expect(hierarchy.status).toBe(201);
    packageId = hierarchy.body.data.hierarchy.package.id;
  });

  it("creates batch linked to package with pending QA", async () => {
    clearPermissionMemoryCache();
    const mfg = new Date("2026-01-15T00:00:00.000Z");
    const exp = new Date("2028-01-15T00:00:00.000Z");

    const res = await request(app)
      .post(`/api/v1/organizations/${orgId}/batches`)
      .set("Authorization", `Bearer ${ownerToken}`)
      .set("X-Organization-Id", orgId)
      .send({
        packageDefinitionId: packageId,
        batchNumber: `BN-${Date.now()}`,
        lotNumber: "LOT-A1",
        manufactureDate: mfg.toISOString(),
        expiryDate: exp.toISOString(),
        productionQuantity: 10000,
        nafdacRegistration: "NAFDAC-TEST-001",
        certificates: { gmp: "CERT-1" },
        documents: { coa: "coa.pdf" },
      });

    expect(res.status).toBe(201);
    expect(res.body.data.batch.qaStatus).toBe("pending");
    expect(res.body.data.batch.recallStatus).toBe("none");
    expect(res.body.data.batch.currentQuantity).toBe(10000);
    expect(res.body.data.batch.nafdacRegistration).toBe("NAFDAC-TEST-001");
    expect(res.body.data.batch.certificates).toEqual({ gmp: "CERT-1" });
    expect(res.body.data.batch.packageDefinition.id).toBe(packageId);
    batchId = res.body.data.batch.id;
  });

  it("rejects expiry before manufacture", async () => {
    const res = await request(app)
      .post(`/api/v1/organizations/${orgId}/batches`)
      .set("Authorization", `Bearer ${ownerToken}`)
      .set("X-Organization-Id", orgId)
      .send({
        packageDefinitionId: packageId,
        batchNumber: `BN-BAD-${Date.now()}`,
        manufactureDate: "2028-01-01T00:00:00.000Z",
        expiryDate: "2026-01-01T00:00:00.000Z",
        productionQuantity: 100,
      });

    expect(res.status).toBe(400);
  });

  it("transitions QA pending → in_review → passed", async () => {
    clearPermissionMemoryCache();
    const review = await request(app)
      .post(`/api/v1/organizations/${orgId}/batches/${batchId}/qa`)
      .set("Authorization", `Bearer ${ownerToken}`)
      .set("X-Organization-Id", orgId)
      .send({ status: "in_review", comment: "Lab testing" });

    expect(review.status).toBe(200);
    expect(review.body.data.batch.qaStatus).toBe("in_review");

    const passed = await request(app)
      .post(`/api/v1/organizations/${orgId}/batches/${batchId}/qa`)
      .set("Authorization", `Bearer ${ownerToken}`)
      .set("X-Organization-Id", orgId)
      .send({ status: "passed" });

    expect(passed.status).toBe(200);
    expect(passed.body.data.batch.qaStatus).toBe("passed");
  });

  it("rejects invalid QA transition from passed to pending", async () => {
    const res = await request(app)
      .post(`/api/v1/organizations/${orgId}/batches/${batchId}/qa`)
      .set("Authorization", `Bearer ${ownerToken}`)
      .set("X-Organization-Id", orgId)
      .send({ status: "pending" });

    expect(res.status).toBe(409);
  });

  it("requests recall via workflow and completes to recalled", async () => {
    clearPermissionMemoryCache();
    const reqRecall = await request(app)
      .post(`/api/v1/organizations/${orgId}/batches/${batchId}/recall`)
      .set("Authorization", `Bearer ${ownerToken}`)
      .set("X-Organization-Id", orgId)
      .send({ action: "request", comment: "Contamination risk" });

    expect(reqRecall.status).toBe(200);
    expect(reqRecall.body.data.batch.recallStatus).toBe("pending");
    expect(reqRecall.body.data.approvalWorkflow.definition.key).toBe(
      "recall.approval"
    );

    const instanceId = reqRecall.body.data.approvalWorkflow.id;
    const approve = await request(app)
      .post(`/api/v1/workflows/instances/${instanceId}/actions`)
      .set("Authorization", `Bearer ${approverToken}`)
      .send({ decision: "approve" });

    // SUPER_ADMIN has batch.recall.manage via *
    expect(approve.status).toBe(200);

    const batch = await request(app)
      .get(`/api/v1/organizations/${orgId}/batches/${batchId}`)
      .set("Authorization", `Bearer ${ownerToken}`)
      .set("X-Organization-Id", orgId);

    expect(batch.body.data.batch.recallStatus).toBe("recalled");
  });

  it("lists batches filtered by recall status", async () => {
    const res = await request(app)
      .get(`/api/v1/organizations/${orgId}/batches`)
      .query({ recallStatus: "recalled" })
      .set("Authorization", `Bearer ${ownerToken}`)
      .set("X-Organization-Id", orgId);

    expect(res.status).toBe(200);
    expect(res.body.data.batches.length).toBeGreaterThanOrEqual(1);
    expect(res.body.data.batches[0].id).toBe(batchId);
  });

  it("supports QA via batch.qa.approval workflow", async () => {
    clearPermissionMemoryCache();
    const created = await request(app)
      .post(`/api/v1/organizations/${orgId}/batches`)
      .set("Authorization", `Bearer ${ownerToken}`)
      .set("X-Organization-Id", orgId)
      .send({
        packageDefinitionId: packageId,
        batchNumber: `BN-WF-${Date.now()}`,
        manufactureDate: "2026-02-01T00:00:00.000Z",
        expiryDate: "2028-02-01T00:00:00.000Z",
        productionQuantity: 500,
      });

    const id = created.body.data.batch.id;

    const review = await request(app)
      .post(`/api/v1/organizations/${orgId}/batches/${id}/qa`)
      .set("Authorization", `Bearer ${ownerToken}`)
      .set("X-Organization-Id", orgId)
      .send({ status: "in_review", useWorkflow: true });

    expect(review.status).toBe(200);
    expect(review.body.data.approvalWorkflow?.definition?.key).toBe(
      "batch.qa.approval"
    );

    const approve = await request(app)
      .post(
        `/api/v1/workflows/instances/${review.body.data.approvalWorkflow.id}/actions`
      )
      .set("Authorization", `Bearer ${approverToken}`)
      .send({ decision: "approve" });

    expect(approve.status).toBe(200);

    const batch = await request(app)
      .get(`/api/v1/organizations/${orgId}/batches/${id}`)
      .set("Authorization", `Bearer ${ownerToken}`)
      .set("X-Organization-Id", orgId);

    expect(batch.body.data.batch.qaStatus).toBe("passed");
  });
});
