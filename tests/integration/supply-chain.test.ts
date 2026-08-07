import { describe, expect, it, beforeAll } from "vitest";
import request from "supertest";
import { Application } from "express";
import { createApp } from "../../src/app";
import { rbacService } from "../../src/modules/rbac/application/rbac.service";
import { clearPermissionMemoryCache } from "../../src/modules/rbac/infrastructure/permission-cache";

describe("Step 13 Supply chain custody transfers", () => {
  let app: Application;
  const password = "Password123!";

  let mfrToken = "";
  let distToken = "";
  let approverToken = "";
  let mfrOrgId = "";
  let distOrgId = "";
  let mfrWarehouseId = "";
  let distWarehouseId = "";
  let batchId = "";
  let transferId = "";
  const packagingLevel = "RETAIL_UNIT";
  const qty = 50;

  beforeAll(async () => {
    clearPermissionMemoryCache();
    app = createApp();

    const mfr = await request(app).post("/api/v1/auth/register").send({
      email: `sc-mfr-${Date.now()}@example.com`,
      password,
    });
    mfrToken = mfr.body.data.tokens.accessToken;

    const dist = await request(app).post("/api/v1/auth/register").send({
      email: `sc-dist-${Date.now()}@example.com`,
      password,
    });
    distToken = dist.body.data.tokens.accessToken;

    const approver = await request(app).post("/api/v1/auth/register").send({
      email: `sc-approver-${Date.now()}@example.com`,
      password,
    });
    approverToken = approver.body.data.tokens.accessToken;
    await rbacService.assignPlatformRole(
      approver.body.data.user.id,
      "SUPER_ADMIN"
    );

    const mfrOrg = await request(app)
      .post("/api/v1/organizations")
      .set("Authorization", `Bearer ${mfrToken}`)
      .send({
        name: "SC Manufacturer",
        slug: `sc-mfr-${Date.now()}`,
        typeKey: "MANUFACTURER",
      });
    mfrOrgId = mfrOrg.body.data.organization.id;
    const mfrBranchId = mfrOrg.body.data.organization.branches[0].id;

    await request(app)
      .post(
        `/api/v1/workflows/instances/${mfrOrg.body.data.approvalWorkflow.id}/actions`
      )
      .set("Authorization", `Bearer ${approverToken}`)
      .send({ decision: "approve" });

    const distOrg = await request(app)
      .post("/api/v1/organizations")
      .set("Authorization", `Bearer ${distToken}`)
      .send({
        name: "SC Distributor",
        slug: `sc-dist-${Date.now()}`,
        typeKey: "DISTRIBUTOR",
      });
    distOrgId = distOrg.body.data.organization.id;
    const distBranchId = distOrg.body.data.organization.branches[0].id;

    await request(app)
      .post(
        `/api/v1/workflows/instances/${distOrg.body.data.approvalWorkflow.id}/actions`
      )
      .set("Authorization", `Bearer ${approverToken}`)
      .send({ decision: "approve" });

    clearPermissionMemoryCache();

    const mfrWh = await request(app)
      .post(
        `/api/v1/organizations/${mfrOrgId}/branches/${mfrBranchId}/warehouses`
      )
      .set("Authorization", `Bearer ${mfrToken}`)
      .set("X-Organization-Id", mfrOrgId)
      .send({ typeKey: "MAIN", name: "Mfr Main", code: "MFR-MAIN" });
    mfrWarehouseId = mfrWh.body.data.warehouse.id;

    const distWh = await request(app)
      .post(
        `/api/v1/organizations/${distOrgId}/branches/${distBranchId}/warehouses`
      )
      .set("Authorization", `Bearer ${distToken}`)
      .set("X-Organization-Id", distOrgId)
      .send({ typeKey: "MAIN", name: "Dist Main", code: "DST-MAIN" });
    distWarehouseId = distWh.body.data.warehouse.id;

    const hierarchy = await request(app)
      .post(`/api/v1/organizations/${mfrOrgId}/hierarchy`)
      .set("Authorization", `Bearer ${mfrToken}`)
      .set("X-Organization-Id", mfrOrgId)
      .send({
        family: { name: "SC Family" },
        brand: { name: "SC Brand" },
        medicine: { name: "SC Med", categoryKey: "ANALGESIC" },
        variant: {
          name: "SC Med 200mg",
          strength: "200mg",
          sku: `SC-${Date.now()}`,
          dosageFormKey: "TABLET",
        },
        package: {
          name: "Retail pack",
          unitsPerPackage: 1,
          packagingTypeKey: "RETAIL_UNIT",
        },
      });

    const packageId = hierarchy.body.data.hierarchy.package.id;

    const batch = await request(app)
      .post(`/api/v1/organizations/${mfrOrgId}/batches`)
      .set("Authorization", `Bearer ${mfrToken}`)
      .set("X-Organization-Id", mfrOrgId)
      .send({
        packageDefinitionId: packageId,
        batchNumber: `SC-BN-${Date.now()}`,
        manufactureDate: "2026-01-01T00:00:00.000Z",
        expiryDate: "2028-01-01T00:00:00.000Z",
        productionQuantity: 1000,
      });
    batchId = batch.body.data.batch.id;

    await request(app)
      .post(`/api/v1/organizations/${mfrOrgId}/batches/${batchId}/qa`)
      .set("Authorization", `Bearer ${mfrToken}`)
      .set("X-Organization-Id", mfrOrgId)
      .send({ status: "passed" });

    await request(app)
      .post(`/api/v1/organizations/${mfrOrgId}/inventory/receive`)
      .set("Authorization", `Bearer ${mfrToken}`)
      .set("X-Organization-Id", mfrOrgId)
      .send({
        warehouseId: mfrWarehouseId,
        batchId,
        packagingLevel,
        quantity: 200,
      });
  });

  it("creates draft transfer manufacturer → distributor", async () => {
    clearPermissionMemoryCache();
    const res = await request(app)
      .post(`/api/v1/organizations/${mfrOrgId}/supply-chain/transfers`)
      .set("Authorization", `Bearer ${mfrToken}`)
      .set("X-Organization-Id", mfrOrgId)
      .send({
        toOrganizationId: distOrgId,
        fromWarehouseId: mfrWarehouseId,
        notes: "First shipment",
        documents: { waybill: "WB-1" },
        lines: [{ batchId, packagingLevel, quantity: qty }],
      });

    expect(res.status).toBe(201);
    expect(res.body.data.transfer.status).toBe("draft");
    expect(res.body.data.transfer.documents).toEqual({ waybill: "WB-1" });
    expect(res.body.data.transfer.lines).toHaveLength(1);
    transferId = res.body.data.transfer.id;
  });

  it("runs submit → approve → ship → receive and moves stock", async () => {
    clearPermissionMemoryCache();

    const submitted = await request(app)
      .post(
        `/api/v1/organizations/${mfrOrgId}/supply-chain/transfers/${transferId}/submit`
      )
      .set("Authorization", `Bearer ${mfrToken}`)
      .set("X-Organization-Id", mfrOrgId)
      .send({});

    expect(submitted.status).toBe(200);
    expect(submitted.body.data.transfer.status).toBe("submitted");

    const approved = await request(app)
      .post(
        `/api/v1/organizations/${mfrOrgId}/supply-chain/transfers/${transferId}/approve`
      )
      .set("Authorization", `Bearer ${mfrToken}`)
      .set("X-Organization-Id", mfrOrgId);

    expect(approved.status).toBe(200);
    expect(approved.body.data.transfer.status).toBe("approved");

    // After approve: 200-50 available, 50 reserved at mfr
    const mfrInvAfterApprove = await request(app)
      .get(`/api/v1/organizations/${mfrOrgId}/inventory`)
      .query({ warehouseId: mfrWarehouseId, batchId })
      .set("Authorization", `Bearer ${mfrToken}`)
      .set("X-Organization-Id", mfrOrgId);

    const mfrPos = mfrInvAfterApprove.body.data.positions.find(
      (p: { packagingLevel: string }) => p.packagingLevel === packagingLevel
    );
    expect(mfrPos.available).toBe(150);
    expect(mfrPos.reserved).toBe(50);

    const shipped = await request(app)
      .post(
        `/api/v1/organizations/${mfrOrgId}/supply-chain/transfers/${transferId}/ship`
      )
      .set("Authorization", `Bearer ${mfrToken}`)
      .set("X-Organization-Id", mfrOrgId);

    expect(shipped.status).toBe(200);
    expect(shipped.body.data.transfer.status).toBe("in_transit");

    const mfrInvAfterShip = await request(app)
      .get(`/api/v1/organizations/${mfrOrgId}/inventory`)
      .query({ warehouseId: mfrWarehouseId, batchId })
      .set("Authorization", `Bearer ${mfrToken}`)
      .set("X-Organization-Id", mfrOrgId);
    const afterShip = mfrInvAfterShip.body.data.positions.find(
      (p: { packagingLevel: string }) => p.packagingLevel === packagingLevel
    );
    expect(afterShip.available).toBe(150);
    expect(afterShip.reserved).toBe(0);

    const received = await request(app)
      .post(
        `/api/v1/organizations/${distOrgId}/supply-chain/transfers/${transferId}/receive`
      )
      .set("Authorization", `Bearer ${distToken}`)
      .set("X-Organization-Id", distOrgId)
      .send({ toWarehouseId: distWarehouseId });

    expect(received.status).toBe(200);
    expect(received.body.data.transfer.status).toBe("received");
    expect(received.body.data.transfer.toWarehouseId).toBe(distWarehouseId);

    const distInv = await request(app)
      .get(`/api/v1/organizations/${distOrgId}/inventory`)
      .query({ warehouseId: distWarehouseId, batchId })
      .set("Authorization", `Bearer ${distToken}`)
      .set("X-Organization-Id", distOrgId);

    expect(distInv.body.data.positions[0].available).toBe(qty);
  });

  it("lists sent and received transfers for each org", async () => {
    const sent = await request(app)
      .get(`/api/v1/organizations/${mfrOrgId}/supply-chain/transfers`)
      .query({ direction: "sent" })
      .set("Authorization", `Bearer ${mfrToken}`)
      .set("X-Organization-Id", mfrOrgId);

    expect(sent.status).toBe(200);
    expect(sent.body.data.transfers.some((t: { id: string }) => t.id === transferId)).toBe(
      true
    );

    const received = await request(app)
      .get(`/api/v1/organizations/${distOrgId}/supply-chain/transfers`)
      .query({ direction: "received", status: "received" })
      .set("Authorization", `Bearer ${distToken}`)
      .set("X-Organization-Id", distOrgId);

    expect(received.body.data.transfers.some((t: { id: string }) => t.id === transferId)).toBe(
      true
    );
  });

  it("blocks receiver from approving sender transfer", async () => {
    const draft = await request(app)
      .post(`/api/v1/organizations/${mfrOrgId}/supply-chain/transfers`)
      .set("Authorization", `Bearer ${mfrToken}`)
      .set("X-Organization-Id", mfrOrgId)
      .send({
        toOrganizationId: distOrgId,
        fromWarehouseId: mfrWarehouseId,
        lines: [{ batchId, packagingLevel, quantity: 5 }],
      });

    await request(app)
      .post(
        `/api/v1/organizations/${mfrOrgId}/supply-chain/transfers/${draft.body.data.transfer.id}/submit`
      )
      .set("Authorization", `Bearer ${mfrToken}`)
      .set("X-Organization-Id", mfrOrgId)
      .send({});

    const res = await request(app)
      .post(
        `/api/v1/organizations/${distOrgId}/supply-chain/transfers/${draft.body.data.transfer.id}/approve`
      )
      .set("Authorization", `Bearer ${distToken}`)
      .set("X-Organization-Id", distOrgId);

    expect(res.status).toBe(403);
  });
});
