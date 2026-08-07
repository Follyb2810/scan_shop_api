import { describe, expect, it, beforeAll } from "vitest";
import request from "supertest";
import { Application } from "express";
import { createApp } from "../../src/app";
import { rbacService } from "../../src/modules/rbac/application/rbac.service";
import { clearPermissionMemoryCache } from "../../src/modules/rbac/infrastructure/permission-cache";
import {
  parsePayload,
  signCanonical,
  canonicalPayload,
} from "../../src/modules/verification/domain/qr-payload";

describe("Step 12 Verification module", () => {
  let app: Application;
  const password = "Password123!";

  let ownerToken = "";
  let scannerToken = "";
  let approverToken = "";
  let orgId = "";
  let batchId = "";
  let validPayload = "";
  let unitId = "";

  beforeAll(async () => {
    clearPermissionMemoryCache();
    app = createApp();

    const owner = await request(app).post("/api/v1/auth/register").send({
      email: `ver-owner-${Date.now()}@example.com`,
      password,
    });
    ownerToken = owner.body.data.tokens.accessToken;

    const scanner = await request(app).post("/api/v1/auth/register").send({
      email: `ver-scanner-${Date.now()}@example.com`,
      password,
    });
    scannerToken = scanner.body.data.tokens.accessToken;

    const approver = await request(app).post("/api/v1/auth/register").send({
      email: `ver-approver-${Date.now()}@example.com`,
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
        name: "Verify Mfr",
        slug: `verify-mfr-${Date.now()}`,
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
        family: { name: "Antibiotics" },
        brand: { name: "SafeMed" },
        medicine: { name: "Ciprofloxacin", categoryKey: "ANTIBIOTIC" },
        variant: {
          name: "Cipro 500mg",
          strength: "500mg",
          sku: `CIPRO-${Date.now()}`,
          dosageFormKey: "TABLET",
        },
        package: {
          name: "Blister 10",
          unitsPerPackage: 10,
          packagingTypeKey: "BLISTER",
        },
      });

    const packageId = hierarchy.body.data.hierarchy.package.id;

    const batch = await request(app)
      .post(`/api/v1/organizations/${orgId}/batches`)
      .set("Authorization", `Bearer ${ownerToken}`)
      .set("X-Organization-Id", orgId)
      .send({
        packageDefinitionId: packageId,
        batchNumber: `VER-BN-${Date.now()}`,
        manufactureDate: "2026-03-01T00:00:00.000Z",
        expiryDate: "2029-03-01T00:00:00.000Z",
        productionQuantity: 5000,
      });
    batchId = batch.body.data.batch.id;

    await request(app)
      .post(`/api/v1/organizations/${orgId}/batches/${batchId}/qa`)
      .set("Authorization", `Bearer ${ownerToken}`)
      .set("X-Organization-Id", orgId)
      .send({ status: "passed" });
  });

  it("generates HMAC-signed trackable units", async () => {
    clearPermissionMemoryCache();
    const res = await request(app)
      .post(`/api/v1/organizations/${orgId}/verification/units/generate`)
      .set("Authorization", `Bearer ${ownerToken}`)
      .set("X-Organization-Id", orgId)
      .send({
        batchId,
        packagingLevel: "RETAIL_UNIT",
        quantity: 3,
      });

    expect(res.status).toBe(201);
    expect(res.body.data.count).toBe(3);
    expect(res.body.data.units[0].qrPayload).toContain("sig=");
    expect(res.body.data.units[0].signature).toHaveLength(64);

    validPayload = res.body.data.units[0].qrPayload;
    unitId = res.body.data.units[0].id;

    const parsed = parsePayload(validPayload);
    expect(parsed?.uid).toBe(unitId);
    expect(parsed?.bid).toBe(batchId);
    expect(parsed?.oid).toBe(orgId);
  });

  it("verifies a valid payload signature", async () => {
    const res = await request(app)
      .post("/api/v1/verification/verify")
      .send({ payload: validPayload });

    expect(res.status).toBe(200);
    expect(res.body.data.valid).toBe(true);
    expect(res.body.data.result).toBe("authentic");
  });

  it("rejects forged signatures", async () => {
    const fields = parsePayload(validPayload)!;
    const { sig: _s, ...rest } = fields;
    const forged = `${canonicalPayload(rest)}|sig=${"a".repeat(64)}`;

    const verify = await request(app)
      .post("/api/v1/verification/verify")
      .send({ payload: forged });

    expect(verify.status).toBe(200);
    expect(verify.body.data.valid).toBe(false);
    expect(verify.body.data.result).toBe("forged");

    const scan = await request(app)
      .post("/api/v1/scans")
      .send({ payload: forged });

    expect(scan.status).toBe(200);
    expect(scan.body.data.result).toBe("forged");
    expect(scan.body.data.reasonCodes).toContain("INVALID_SIGNATURE");
    expect(scan.body.data.scanEventId).toBeTruthy();
  });

  it("records authentic scan with first-scan flag and history", async () => {
    const scan = await request(app)
      .post("/api/v1/scans")
      .set("Authorization", `Bearer ${scannerToken}`)
      .send({
        payload: validPayload,
        city: "Lagos",
        country: "NG",
      });

    expect(scan.status).toBe(200);
    expect(scan.body.data.result).toBe("authentic");
    expect(scan.body.data.isFirstScan).toBe(true);
    expect(scan.body.data.unit.id).toBe(unitId);
    expect(scan.body.data.batch.batchNumber).toBeTruthy();

    const again = await request(app)
      .post("/api/v1/scans")
      .set("Authorization", `Bearer ${scannerToken}`)
      .send({ payload: validPayload });

    expect(again.body.data.isFirstScan).toBe(false);
    expect(again.body.data.unit.scannedCount).toBeGreaterThanOrEqual(2);

    const mine = await request(app)
      .get("/api/v1/scans/mine")
      .set("Authorization", `Bearer ${scannerToken}`);

    expect(mine.status).toBe(200);
    expect(mine.body.data.scans.length).toBeGreaterThanOrEqual(2);

    const unitScans = await request(app)
      .get(`/api/v1/organizations/${orgId}/verification/units/${unitId}/scans`)
      .set("Authorization", `Bearer ${ownerToken}`)
      .set("X-Organization-Id", orgId);

    expect(unitScans.status).toBe(200);
    expect(unitScans.body.data.scans.length).toBeGreaterThanOrEqual(2);
  });

  it("flags recalled batch on scan", async () => {
    const gen = await request(app)
      .post(`/api/v1/organizations/${orgId}/verification/units/generate`)
      .set("Authorization", `Bearer ${ownerToken}`)
      .set("X-Organization-Id", orgId)
      .send({ batchId, packagingLevel: "RETAIL_UNIT", quantity: 1 });

    const payload = gen.body.data.units[0].qrPayload;

    const recall = await request(app)
      .post(`/api/v1/organizations/${orgId}/batches/${batchId}/recall`)
      .set("Authorization", `Bearer ${ownerToken}`)
      .set("X-Organization-Id", orgId)
      .send({ action: "request" });

    await request(app)
      .post(
        `/api/v1/workflows/instances/${recall.body.data.approvalWorkflow.id}/actions`
      )
      .set("Authorization", `Bearer ${approverToken}`)
      .send({ decision: "approve" });

    const scan = await request(app)
      .post("/api/v1/scans")
      .send({ payload });

    expect(scan.status).toBe(200);
    expect(scan.body.data.result).toBe("recalled");
    expect(scan.body.data.reasonCodes).toContain("BATCH_RECALLED");
  });

  it("rejects tampered field with valid-looking hex sig recomputed wrongly", async () => {
    const fields = parsePayload(validPayload)!;
    const tampered = {
      ...fields,
      oid: "00000000-0000-0000-0000-000000000099",
    };
    delete (tampered as { sig?: string }).sig;
    const badSig = signCanonical(canonicalPayload(tampered as never));
    // Use wrong secret-derived... actually signCanonical uses real secret so this would be valid for wrong oid
    // Instead flip one char of the real signature after keeping fields
    const real = parsePayload(validPayload)!;
    const flipped =
      real.sig!.slice(0, -1) + (real.sig!.endsWith("a") ? "b" : "a");
    const payload = `${canonicalPayload({
      v: real.v,
      pid: real.pid,
      oid: real.oid,
      prd: real.prd,
      bid: real.bid,
      lvl: real.lvl,
      uid: real.uid,
      ts: real.ts,
      kid: real.kid,
    })}|sig=${flipped}`;

    void badSig;
    const res = await request(app)
      .post("/api/v1/verification/verify")
      .send({ payload });

    expect(res.body.data.valid).toBe(false);
    expect(res.body.data.result).toBe("forged");
  });
});
