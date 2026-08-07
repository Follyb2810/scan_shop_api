import { describe, expect, it, beforeAll } from "vitest";
import request from "supertest";
import { Application } from "express";
import { createApp } from "../../src/app";
import { clearPermissionMemoryCache } from "../../src/modules/rbac/infrastructure/permission-cache";

describe("Step 6 Organization / tenant isolation", () => {
  let app: Application;
  const password = "Password123!";

  let ownerAToken = "";
  let ownerBToken = "";
  let memberBToken = "";
  let orgAId = "";
  let orgBId = "";
  let branchAId = "";

  beforeAll(async () => {
    clearPermissionMemoryCache();
    app = createApp();

    const a = await request(app).post("/api/v1/auth/register").send({
      email: `owner-a-${Date.now()}@example.com`,
      password,
    });
    ownerAToken = a.body.data.tokens.accessToken;

    const b = await request(app).post("/api/v1/auth/register").send({
      email: `owner-b-${Date.now()}@example.com`,
      password,
    });
    ownerBToken = b.body.data.tokens.accessToken;

    const member = await request(app).post("/api/v1/auth/register").send({
      email: `member-b-${Date.now()}@example.com`,
      password,
    });
    memberBToken = member.body.data.tokens.accessToken;
  });

  it("lists organization types", async () => {
    const res = await request(app).get("/api/v1/organizations/types");
    expect(res.status).toBe(200);
    const keys = res.body.data.types.map((t: { key: string }) => t.key);
    expect(keys).toContain("MANUFACTURER");
    expect(keys).toContain("PHARMACY");
    expect(keys).toContain("HOSPITAL");
  });

  it("creates org A with HQ branch and OWNER", async () => {
    const res = await request(app)
      .post("/api/v1/organizations")
      .set("Authorization", `Bearer ${ownerAToken}`)
      .send({
        name: "Pharmacy A",
        slug: `pharmacy-a-${Date.now()}`,
        typeKey: "PHARMACY",
        profile: { city: "Lagos", country: "NG" },
      });

    expect(res.status).toBe(201);
    orgAId = res.body.data.organization.id;
    expect(res.body.data.organization.type.key).toBe("PHARMACY");
    expect(res.body.data.organization.status).toBe("pending");
    expect(res.body.data.approvalWorkflow?.status).toBe("pending");
    expect(res.body.data.approvalWorkflow?.definition.key).toBe(
      "organization.approval"
    );
    expect(res.body.data.organization.branches.length).toBeGreaterThanOrEqual(1);
    branchAId = res.body.data.organization.branches[0].id;
  });

  it("creates org B for second owner", async () => {
    const res = await request(app)
      .post("/api/v1/organizations")
      .set("Authorization", `Bearer ${ownerBToken}`)
      .send({
        name: "Hospital B",
        slug: `hospital-b-${Date.now()}`,
        typeKey: "HOSPITAL",
      });

    expect(res.status).toBe(201);
    orgBId = res.body.data.organization.id;
  });

  it("owner A can read own org", async () => {
    clearPermissionMemoryCache();
    const res = await request(app)
      .get(`/api/v1/organizations/${orgAId}`)
      .set("Authorization", `Bearer ${ownerAToken}`)
      .set("X-Organization-Id", orgAId);

    expect(res.status).toBe(200);
    expect(res.body.data.organization.id).toBe(orgAId);
  });

  it("owner A cannot read org B (tenant isolation)", async () => {
    clearPermissionMemoryCache();
    const res = await request(app)
      .get(`/api/v1/organizations/${orgBId}`)
      .set("Authorization", `Bearer ${ownerAToken}`)
      .set("X-Organization-Id", orgBId);

    expect(res.status).toBe(403);
  });

  it("owner A cannot list org B branches", async () => {
    clearPermissionMemoryCache();
    const res = await request(app)
      .get(`/api/v1/organizations/${orgBId}/branches`)
      .set("Authorization", `Bearer ${ownerAToken}`)
      .set("X-Organization-Id", orgBId);

    expect(res.status).toBe(403);
  });

  it("rejects branch header from another org", async () => {
    clearPermissionMemoryCache();
    const res = await request(app)
      .get(`/api/v1/organizations/${orgBId}`)
      .set("Authorization", `Bearer ${ownerBToken}`)
      .set("X-Organization-Id", orgBId)
      .set("X-Branch-Id", branchAId);

    expect(res.status).toBe(403);
  });

  it("creates additional branch in org A", async () => {
    clearPermissionMemoryCache();
    const res = await request(app)
      .post(`/api/v1/organizations/${orgAId}/branches`)
      .set("Authorization", `Bearer ${ownerAToken}`)
      .set("X-Organization-Id", orgAId)
      .send({
        name: "Ikeja",
        code: "IKJ",
        city: "Lagos",
      });

    expect(res.status).toBe(201);
    expect(res.body.data.branch.code).toBe("IKJ");
  });

  it("invites member into org B and isolates from org A", async () => {
    clearPermissionMemoryCache();
    const memberEmail = (
      await request(app)
        .get("/api/v1/auth/me")
        .set("Authorization", `Bearer ${memberBToken}`)
    ).body.data.user.email as string;

    const invite = await request(app)
      .post(`/api/v1/organizations/${orgBId}/members`)
      .set("Authorization", `Bearer ${ownerBToken}`)
      .set("X-Organization-Id", orgBId)
      .send({ email: memberEmail, roleKey: "VIEWER" });

    expect(invite.status).toBe(201);

    clearPermissionMemoryCache();
    const ok = await request(app)
      .get(`/api/v1/organizations/${orgBId}`)
      .set("Authorization", `Bearer ${memberBToken}`)
      .set("X-Organization-Id", orgBId);
    expect(ok.status).toBe(200);

    clearPermissionMemoryCache();
    const denied = await request(app)
      .get(`/api/v1/organizations/${orgAId}`)
      .set("Authorization", `Bearer ${memberBToken}`)
      .set("X-Organization-Id", orgAId);
    expect(denied.status).toBe(403);
  });

  it("lists mine only includes memberships", async () => {
    const res = await request(app)
      .get("/api/v1/organizations/mine")
      .set("Authorization", `Bearer ${ownerAToken}`);

    expect(res.status).toBe(200);
    const ids = res.body.data.organizations.map(
      (o: { organization: { id: string } }) => o.organization.id
    );
    expect(ids).toContain(orgAId);
    expect(ids).not.toContain(orgBId);
  });
});
