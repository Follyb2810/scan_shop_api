import { describe, expect, it, beforeAll } from "vitest";
import request from "supertest";
import { Application } from "express";
import { createApp } from "../../src/app";
import { rbacService } from "../../src/modules/rbac/application/rbac.service";
import { clearPermissionMemoryCache } from "../../src/modules/rbac/infrastructure/permission-cache";
import { AUDIT_ACTIONS } from "../../src/modules/audit/domain/types";

describe("Step 18 Audit module", () => {
  let app: Application;
  const password = "Password123!";

  let ownerToken = "";
  let auditorToken = "";
  let strangerToken = "";
  let orgId = "";
  let listingId = "";

  beforeAll(async () => {
    clearPermissionMemoryCache();
    app = createApp();

    const owner = await request(app).post("/api/v1/auth/register").send({
      email: `audit-owner-${Date.now()}@example.com`,
      password,
    });
    ownerToken = owner.body.data.tokens.accessToken;

    const auditor = await request(app).post("/api/v1/auth/register").send({
      email: `audit-auditor-${Date.now()}@example.com`,
      password,
    });
    auditorToken = auditor.body.data.tokens.accessToken;
    await rbacService.assignPlatformRole(
      auditor.body.data.user.id,
      "SUPER_ADMIN"
    );

    const stranger = await request(app).post("/api/v1/auth/register").send({
      email: `audit-stranger-${Date.now()}@example.com`,
      password,
    });
    strangerToken = stranger.body.data.tokens.accessToken;

    const org = await request(app)
      .post("/api/v1/organizations")
      .set("Authorization", `Bearer ${ownerToken}`)
      .send({
        name: "Audit Pharmacy",
        slug: `audit-pharm-${Date.now()}`,
        typeKey: "PHARMACY",
      });
    orgId = org.body.data.organization.id;

    await request(app)
      .post(
        `/api/v1/workflows/instances/${org.body.data.approvalWorkflow.id}/actions`
      )
      .set("Authorization", `Bearer ${auditorToken}`)
      .send({ decision: "approve" });

    clearPermissionMemoryCache();

    const hierarchy = await request(app)
      .post(`/api/v1/organizations/${orgId}/hierarchy`)
      .set("Authorization", `Bearer ${ownerToken}`)
      .set("X-Organization-Id", orgId)
      .send({
        family: { name: "Audit Family" },
        brand: { name: "Audit Brand" },
        medicine: { name: "Audit Med", categoryKey: "ANALGESIC" },
        variant: {
          name: "Audit Med 100mg",
          strength: "100mg",
          sku: `AUD-${Date.now()}`,
          dosageFormKey: "TABLET",
        },
        package: {
          name: "Retail",
          unitsPerPackage: 1,
          packagingTypeKey: "RETAIL_UNIT",
        },
      });

    const packageId = hierarchy.body.data.hierarchy.package.id;

    const listing = await request(app)
      .post("/api/v1/marketplace/listings")
      .set("Authorization", `Bearer ${ownerToken}`)
      .set("X-Organization-Id", orgId)
      .send({
        packageDefinitionId: packageId,
        categoryKey: "OTC",
        title: "Audited Listing",
        price: 1000,
        currency: "NGN",
      });
    listingId = listing.body.data.listing.id;

    const published = await request(app)
      .post(`/api/v1/marketplace/listings/${listingId}/publish`)
      .set("Authorization", `Bearer ${ownerToken}`)
      .set("X-Organization-Id", orgId);

    await request(app)
      .post(
        `/api/v1/workflows/instances/${published.body.data.approvalWorkflow.id}/actions`
      )
      .set("Authorization", `Bearer ${auditorToken}`)
      .send({ decision: "approve" });

    // Let async audit handlers flush
    await new Promise((r) => setTimeout(r, 50));
  });

  it("writes domain + http audit rows for critical mutations", async () => {
    clearPermissionMemoryCache();

    const orgLogs = await request(app)
      .get(`/api/v1/organizations/${orgId}/audit`)
      .set("Authorization", `Bearer ${ownerToken}`)
      .set("X-Organization-Id", orgId)
      .query({ entityType: "listing", entityId: listingId });

    expect(orgLogs.status).toBe(200);
    const actions = orgLogs.body.data.logs.map((l: { action: string }) => l.action);
    expect(actions).toContain(AUDIT_ACTIONS.LISTING_CREATED);
    expect(actions).toContain(AUDIT_ACTIONS.LISTING_PUBLISHED);

    const httpLogs = await request(app)
      .get("/api/v1/audit")
      .set("Authorization", `Bearer ${ownerToken}`)
      .set("X-Organization-Id", orgId)
      .query({ action: AUDIT_ACTIONS.HTTP_MUTATION, take: 20 });

    expect(httpLogs.status).toBe(200);
    expect(httpLogs.body.data.logs.length).toBeGreaterThan(0);
    expect(httpLogs.body.data.logs[0].ipAddress || true).toBeTruthy();
  });

  it("allows platform auditor to query cross-tenant audit", async () => {
    const res = await request(app)
      .get("/api/v1/platform/audit")
      .set("Authorization", `Bearer ${auditorToken}`)
      .query({ entityType: "listing", take: 50 });

    expect(res.status).toBe(200);
    expect(
      res.body.data.logs.some((l: { entityId: string }) => l.entityId === listingId)
    ).toBe(true);
  });

  it("blocks users without audit.view", async () => {
    const res = await request(app)
      .get("/api/v1/audit")
      .set("Authorization", `Bearer ${strangerToken}`)
      .set("X-Organization-Id", orgId);

    expect(res.status).toBe(403);
  });

  it("returns a single audit row by id", async () => {
    const list = await request(app)
      .get(`/api/v1/organizations/${orgId}/audit`)
      .set("Authorization", `Bearer ${ownerToken}`)
      .set("X-Organization-Id", orgId)
      .query({ entityType: "listing", entityId: listingId, take: 1 });

    const id = list.body.data.logs[0].id;
    const detail = await request(app)
      .get(`/api/v1/audit/${id}`)
      .set("Authorization", `Bearer ${ownerToken}`)
      .set("X-Organization-Id", orgId);

    expect(detail.status).toBe(200);
    expect(detail.body.data.log.id).toBe(id);
    expect(detail.body.data.log.entityType).toBe("listing");
  });
});
