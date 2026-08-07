import { describe, expect, it, beforeAll } from "vitest";
import request from "supertest";
import { Application } from "express";
import { createApp } from "../../src/app";
import { signAccessTokenForTests } from "../../src/shared/utils/accessToken";

describe("Step 3 API shell & middleware", () => {
  let app: Application;

  beforeAll(() => {
    app = createApp();
  });

  it("GET /api/v1/health works", async () => {
    const res = await request(app).get("/api/v1/health");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it("unknown route returns consistent NOT_FOUND envelope", async () => {
    const res = await request(app).get("/api/v1/does-not-exist");
    expect(res.status).toBe(404);
    expect(res.body).toMatchObject({
      success: false,
      error: { code: "NOT_FOUND" },
    });
  });

  it("protected route rejects missing auth", async () => {
    const res = await request(app).get("/api/v1/system/protected");
    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe("UNAUTHORIZED");
  });

  it("protected route accepts valid access token", async () => {
    const token = signAccessTokenForTests("user-step3");
    const res = await request(app)
      .get("/api/v1/system/protected")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.data.userId).toBe("user-step3");
  });

  it("invalid token returns 401", async () => {
    const res = await request(app)
      .get("/api/v1/system/context")
      .set("Authorization", "Bearer not-a-jwt");

    expect(res.status).toBe(401);
    expect(res.body.error.code).toBe("UNAUTHORIZED");
  });

  it("tenant-required rejects missing org header", async () => {
    const res = await request(app).get("/api/v1/system/tenant-required");
    expect(res.status).toBe(403);
    expect(res.body.error.code).toBe("FORBIDDEN");
  });

  it("tenant-required rejects unknown organization id", async () => {
    const res = await request(app)
      .get("/api/v1/system/tenant-required")
      .set("X-Organization-Id", "org-12345678");

    expect(res.status).toBe(403);
    expect(res.body.error.code).toBe("FORBIDDEN");
  });

  it("echo validates body with Zod", async () => {
    const bad = await request(app).post("/api/v1/system/echo").send({});
    expect(bad.status).toBe(400);
    expect(bad.body.error.code).toBe("VALIDATION_ERROR");

    const good = await request(app)
      .post("/api/v1/system/echo")
      .send({ message: "hello" });
    expect(good.status).toBe(200);
    expect(good.body.data.echo).toBe("hello");
  });

  it("permission middleware forbids without grants", async () => {
    const token = signAccessTokenForTests("user-step3");
    const res = await request(app)
      .get("/api/v1/system/permission-demo")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(403);
    expect(res.body.error.code).toBe("FORBIDDEN");
  });

  it("permission middleware allows when grants injected", async () => {
    const token = signAccessTokenForTests("user-step3");
    const res = await request(app)
      .get("/api/v1/system/__test_permission_ok")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.data.ok).toBe(true);
  });

  it("swagger UI is mounted", async () => {
    const res = await request(app).get("/api-docs.json");
    expect(res.status).toBe(200);
    expect(res.body.openapi).toBe("3.0.3");
    expect(res.body.info.title).toContain("Healthcare OS");
  });
});
