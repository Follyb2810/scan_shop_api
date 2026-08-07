import { describe, expect, it, beforeAll } from "vitest";
import request from "supertest";
import { Application } from "express";
import { createApp } from "../../src/app";
import { rbacService } from "../../src/modules/rbac/application/rbac.service";
import { clearPermissionMemoryCache } from "../../src/modules/rbac/infrastructure/permission-cache";

describe("Step 7 Workflow engine", () => {
  let app: Application;
  const password = "Password123!";

  let ownerToken = "";
  let approverToken = "";
  let approverUserId = "";
  let orgId = "";
  let workflowId = "";

  beforeAll(async () => {
    clearPermissionMemoryCache();
    app = createApp();

    const owner = await request(app).post("/api/v1/auth/register").send({
      email: `wf-owner-${Date.now()}@example.com`,
      password,
    });
    ownerToken = owner.body.data.tokens.accessToken;

    const approver = await request(app).post("/api/v1/auth/register").send({
      email: `wf-approver-${Date.now()}@example.com`,
      password,
    });
    approverToken = approver.body.data.tokens.accessToken;
    approverUserId = approver.body.data.user.id;

    await rbacService.assignPlatformRole(approverUserId, "SUPER_ADMIN");
    clearPermissionMemoryCache();
  });

  it("lists seeded workflow definitions", async () => {
    const res = await request(app)
      .get("/api/v1/workflows/definitions")
      .set("Authorization", `Bearer ${ownerToken}`);

    expect(res.status).toBe(200);
    const keys = res.body.data.definitions.map((d: { key: string }) => d.key);
    expect(keys).toContain("organization.approval");
    expect(keys).toContain("manufacturer.approval");
    expect(keys).toContain("product.approval");
    expect(keys).toContain("marketplace.listing.approval");
    expect(keys).toContain("recall.approval");
    expect(keys).toContain("inventory.approval");
  });

  it("creates organization in pending with approval workflow", async () => {
    const res = await request(app)
      .post("/api/v1/organizations")
      .set("Authorization", `Bearer ${ownerToken}`)
      .send({
        name: "Pending Clinic",
        slug: `pending-clinic-${Date.now()}`,
        typeKey: "CLINIC",
      });

    expect(res.status).toBe(201);
    expect(res.body.data.organization.status).toBe("pending");
    orgId = res.body.data.organization.id;
    workflowId = res.body.data.approvalWorkflow.id;
    expect(res.body.data.approvalWorkflow.definition.key).toBe(
      "organization.approval"
    );
    expect(res.body.data.approvalWorkflow.status).toBe("pending");
  });

  it("uses manufacturer.approval for manufacturer orgs", async () => {
    const res = await request(app)
      .post("/api/v1/organizations")
      .set("Authorization", `Bearer ${ownerToken}`)
      .send({
        name: "Pending Mfr",
        slug: `pending-mfr-${Date.now()}`,
        typeKey: "MANUFACTURER",
      });

    expect(res.status).toBe(201);
    expect(res.body.data.organization.status).toBe("pending");
    expect(res.body.data.approvalWorkflow.definition.key).toBe(
      "manufacturer.approval"
    );
  });

  it("rejects approve without platform.organizations.approve", async () => {
    const res = await request(app)
      .post(`/api/v1/workflows/instances/${workflowId}/actions`)
      .set("Authorization", `Bearer ${ownerToken}`)
      .send({ decision: "approve" });

    expect(res.status).toBe(403);
  });

  it("approves via workflow engine and activates organization", async () => {
    clearPermissionMemoryCache();
    const res = await request(app)
      .post(`/api/v1/workflows/instances/${workflowId}/actions`)
      .set("Authorization", `Bearer ${approverToken}`)
      .send({ decision: "approve", comment: "Looks good" });

    expect(res.status).toBe(200);
    expect(res.body.data.instance.status).toBe("approved");
    expect(res.body.data.instance.actions.length).toBeGreaterThanOrEqual(1);
    expect(res.body.data.instance.actions[0].decision).toBe("approve");

    const org = await request(app)
      .get(`/api/v1/organizations/${orgId}`)
      .set("Authorization", `Bearer ${ownerToken}`)
      .set("X-Organization-Id", orgId);

    expect(org.status).toBe(200);
    expect(org.body.data.organization.status).toBe("active");
  });

  it("rejects a second org through workflow", async () => {
    clearPermissionMemoryCache();
    const created = await request(app)
      .post("/api/v1/organizations")
      .set("Authorization", `Bearer ${ownerToken}`)
      .send({
        name: "Reject Me",
        slug: `reject-me-${Date.now()}`,
        typeKey: "NGO",
      });

    expect(created.status).toBe(201);
    const instanceId = created.body.data.approvalWorkflow.id;
    const rejectOrgId = created.body.data.organization.id;

    const res = await request(app)
      .post(`/api/v1/workflows/instances/${instanceId}/actions`)
      .set("Authorization", `Bearer ${approverToken}`)
      .send({ decision: "reject", comment: "Incomplete docs" });

    expect(res.status).toBe(200);
    expect(res.body.data.instance.status).toBe("rejected");

    const org = await request(app)
      .get(`/api/v1/organizations/${rejectOrgId}`)
      .set("Authorization", `Bearer ${ownerToken}`)
      .set("X-Organization-Id", rejectOrgId);

    expect(org.body.data.organization.status).toBe("rejected");
  });

  it("allows starter to cancel pending workflow", async () => {
    const created = await request(app)
      .post("/api/v1/organizations")
      .set("Authorization", `Bearer ${ownerToken}`)
      .send({
        name: "Cancel Me",
        slug: `cancel-me-${Date.now()}`,
        typeKey: "LABORATORY",
      });

    const instanceId = created.body.data.approvalWorkflow.id;
    const cancelOrgId = created.body.data.organization.id;

    const res = await request(app)
      .post(`/api/v1/workflows/instances/${instanceId}/actions`)
      .set("Authorization", `Bearer ${ownerToken}`)
      .send({ decision: "cancel" });

    expect(res.status).toBe(200);
    expect(res.body.data.instance.status).toBe("cancelled");

    const org = await request(app)
      .get(`/api/v1/organizations/${cancelOrgId}`)
      .set("Authorization", `Bearer ${ownerToken}`)
      .set("X-Organization-Id", cancelOrgId);

    expect(org.body.data.organization.status).toBe("cancelled");
  });

  it("lists pending instances for platform reader", async () => {
    clearPermissionMemoryCache();
    const res = await request(app)
      .get("/api/v1/workflows/instances")
      .query({ status: "pending", subjectType: "organization" })
      .set("Authorization", `Bearer ${approverToken}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data.instances)).toBe(true);
  });
});
