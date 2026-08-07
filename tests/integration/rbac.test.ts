import { describe, expect, it, beforeAll } from "vitest";
import request from "supertest";
import { Application } from "express";
import { createApp } from "../../src/app";
import { rbacService } from "../../src/modules/rbac";
import { clearPermissionMemoryCache } from "../../src/modules/rbac/infrastructure/permission-cache";
import { PERMISSION_CATALOG } from "../../src/modules/rbac/domain/catalog";

describe("Step 5 RBAC", () => {
  let app: Application;
  const email = `rbac-${Date.now()}@example.com`;
  const password = "Password123!";
  let accessToken = "";
  let userId = "";
  let orgId = "";

  beforeAll(async () => {
    clearPermissionMemoryCache();
    app = createApp();

    const reg = await request(app).post("/api/v1/auth/register").send({
      email,
      password,
      firstName: "Rbac",
    });
    expect(reg.status).toBe(201);
    accessToken = reg.body.data.tokens.accessToken;
    userId = reg.body.data.user.id;
  });

  it("lists permission catalog", async () => {
    const res = await request(app)
      .get("/api/v1/rbac/permissions")
      .set("Authorization", `Bearer ${accessToken}`);

    expect(res.status).toBe(200);
    expect(res.body.data.permissions.length).toBeGreaterThanOrEqual(
      PERMISSION_CATALOG.length
    );
  });

  it("denies platform role assignment without platform.roles.manage", async () => {
    const res = await request(app)
      .post(`/api/v1/rbac/platform/users/${userId}/roles`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ roleKey: "PLATFORM_VIEWER" });

    expect(res.status).toBe(403);
  });

  it("assigns SUPER_ADMIN via service then enforces platform permission", async () => {
    await rbacService.assignPlatformRole(userId, "SUPER_ADMIN");
    clearPermissionMemoryCache();

    // new token not required — permissions loaded per request
    const res = await request(app)
      .post(`/api/v1/rbac/platform/users/${userId}/roles`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ roleKey: "PLATFORM_VIEWER" });

    expect(res.status).toBe(200);
    expect(res.body.data.roleKey).toBe("PLATFORM_VIEWER");
  });

  it("bootstraps organization with default roles and OWNER", async () => {
    clearPermissionMemoryCache();
    const res = await request(app)
      .post("/api/v1/organizations")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        name: "HealthPlus",
        slug: `healthplus-${Date.now()}`,
        typeKey: "PHARMACY",
      });

    expect(res.status).toBe(201);
    orgId = res.body.data.organization.id;
    expect(orgId).toBeTruthy();
  });

  it("loads org permissions via /rbac/me with X-Organization-Id", async () => {
    clearPermissionMemoryCache();
    const res = await request(app)
      .get("/api/v1/rbac/me")
      .set("Authorization", `Bearer ${accessToken}`)
      .set("X-Organization-Id", orgId);

    expect(res.status).toBe(200);
    expect(res.body.data.actorMode).toBe("organization");
    expect(res.body.data.permissions).toContain("roles.manage");
    expect(res.body.data.permissions).toContain("inventory.transfer");
    expect(res.body.data.permissions).not.toContain(
      "platform.roles.manage"
    );
  });

  it("lists seeded org roles", async () => {
    clearPermissionMemoryCache();
    const res = await request(app)
      .get(`/api/v1/organizations/${orgId}/roles`)
      .set("Authorization", `Bearer ${accessToken}`)
      .set("X-Organization-Id", orgId);

    expect(res.status).toBe(200);
    const keys = res.body.data.roles.map((r: { key: string }) => r.key);
    expect(keys).toContain("OWNER");
    expect(keys).toContain("PHARMACIST");
    expect(keys).toContain("USER");
  });

  it("creates custom org role with existing permissions only", async () => {
    clearPermissionMemoryCache();
    const res = await request(app)
      .post(`/api/v1/organizations/${orgId}/roles`)
      .set("Authorization", `Bearer ${accessToken}`)
      .set("X-Organization-Id", orgId)
      .send({
        name: "Scanner Ops",
        key: "SCANNER_OPS",
        permissionKeys: ["barcode.scan", "verification.read", "inventory.read"],
      });

    expect(res.status).toBe(201);
    expect(res.body.data.key).toBe("SCANNER_OPS");
    expect(res.body.data.isSystem).toBe(false);
    expect(res.body.data.permissions).toEqual(
      expect.arrayContaining(["barcode.scan", "verification.read"])
    );
  });

  it("rejects inventing permissions or platform permissions on custom roles", async () => {
    clearPermissionMemoryCache();
    const invented = await request(app)
      .post(`/api/v1/organizations/${orgId}/roles`)
      .set("Authorization", `Bearer ${accessToken}`)
      .set("X-Organization-Id", orgId)
      .send({
        name: "Bad",
        permissionKeys: ["totally.fake.permission"],
      });
    expect(invented.status).toBe(400);

    const platformEscalation = await request(app)
      .post(`/api/v1/organizations/${orgId}/roles`)
      .set("Authorization", `Bearer ${accessToken}`)
      .set("X-Organization-Id", orgId)
      .send({
        name: "Hack",
        permissionKeys: ["platform.roles.manage"],
      });
    expect(platformEscalation.status).toBe(400);
  });

  it("forbids non-members from org context", async () => {
    const other = await request(app).post("/api/v1/auth/register").send({
      email: `other-${Date.now()}@example.com`,
      password,
    });
    const otherToken = other.body.data.tokens.accessToken as string;

    const res = await request(app)
      .get("/api/v1/rbac/me")
      .set("Authorization", `Bearer ${otherToken}`)
      .set("X-Organization-Id", orgId);

    expect(res.status).toBe(403);
  });
});
