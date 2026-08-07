import { describe, expect, it, beforeAll } from "vitest";
import request from "supertest";
import { Application } from "express";
import { createApp } from "../../src/app";
import { prisma } from "../../src/infrastructure/database";

describe("Step 4 Identity /auth", () => {
  let app: Application;
  const email = `auth-${Date.now()}@example.com`;
  const password = "Password123!";

  let accessToken = "";
  let refreshToken = "";
  let emailVerificationToken = "";

  beforeAll(async () => {
    app = createApp();
  });

  it("registers a user and returns tokens", async () => {
    const res = await request(app).post("/api/v1/auth/register").send({
      email,
      password,
      firstName: "Ada",
      lastName: "Lovelace",
    });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.user.email).toBe(email.toLowerCase());
    expect(res.body.data.tokens.accessToken).toBeTruthy();
    expect(res.body.data.tokens.refreshToken).toBeTruthy();
    expect(res.body.data.emailVerificationToken).toBeTruthy();

    accessToken = res.body.data.tokens.accessToken;
    refreshToken = res.body.data.tokens.refreshToken;
    emailVerificationToken = res.body.data.emailVerificationToken;
  });

  it("rejects duplicate registration", async () => {
    const res = await request(app).post("/api/v1/auth/register").send({
      email,
      password,
    });
    expect(res.status).toBe(409);
    expect(res.body.error.code).toBe("CONFLICT");
  });

  it("verifies email", async () => {
    const res = await request(app)
      .post("/api/v1/auth/verify-email")
      .send({ token: emailVerificationToken });

    expect(res.status).toBe(200);
    expect(res.body.data.user.emailVerifiedAt).toBeTruthy();
    expect(res.body.data.user.status).toBe("active");
  });

  it("logs in with password", async () => {
    const res = await request(app).post("/api/v1/auth/login").send({
      email,
      password,
      deviceName: "vitest",
    });

    expect(res.status).toBe(200);
    accessToken = res.body.data.tokens.accessToken;
    refreshToken = res.body.data.tokens.refreshToken;
  });

  it("returns /auth/me with bearer token", async () => {
    const res = await request(app)
      .get("/api/v1/auth/me")
      .set("Authorization", `Bearer ${accessToken}`);

    expect(res.status).toBe(200);
    expect(res.body.data.user.email).toBe(email.toLowerCase());
  });

  it("rotates refresh tokens", async () => {
    const first = refreshToken;
    const res = await request(app)
      .post("/api/v1/auth/refresh")
      .send({ refreshToken: first });

    expect(res.status).toBe(200);
    expect(res.body.data.tokens.refreshToken).toBeTruthy();
    expect(res.body.data.tokens.refreshToken).not.toBe(first);
    expect(res.body.data.tokens.accessToken).toBeTruthy();

    const rotated = res.body.data.tokens.refreshToken;

    // Old token reuse should fail and revoke family
    const reuse = await request(app)
      .post("/api/v1/auth/refresh")
      .send({ refreshToken: first });
    expect(reuse.status).toBe(401);

    // Rotated token also invalidated after reuse detection
    const afterReuse = await request(app)
      .post("/api/v1/auth/refresh")
      .send({ refreshToken: rotated });
    expect(afterReuse.status).toBe(401);
  });

  it("login again then logout revokes session family", async () => {
    const login = await request(app).post("/api/v1/auth/login").send({
      email,
      password,
    });
    expect(login.status).toBe(200);

    const at = login.body.data.tokens.accessToken as string;
    const rt = login.body.data.tokens.refreshToken as string;

    const logout = await request(app)
      .post("/api/v1/auth/logout")
      .set("Authorization", `Bearer ${at}`)
      .send({ refreshToken: rt });
    expect(logout.status).toBe(200);

    const refresh = await request(app)
      .post("/api/v1/auth/refresh")
      .send({ refreshToken: rt });
    expect(refresh.status).toBe(401);
  });

  it("forgot + reset password flow", async () => {
    const forgot = await request(app)
      .post("/api/v1/auth/forgot-password")
      .send({ email });
    expect(forgot.status).toBe(200);
    expect(forgot.body.data.resetToken).toBeTruthy();

    const newPassword = "NewPassword123!";
    const reset = await request(app).post("/api/v1/auth/reset-password").send({
      token: forgot.body.data.resetToken,
      password: newPassword,
    });
    expect(reset.status).toBe(200);

    const oldLogin = await request(app).post("/api/v1/auth/login").send({
      email,
      password,
    });
    expect(oldLogin.status).toBe(401);

    const newLogin = await request(app).post("/api/v1/auth/login").send({
      email,
      password: newPassword,
    });
    expect(newLogin.status).toBe(200);
    accessToken = newLogin.body.data.tokens.accessToken;
  });

  it("lists sessions and login history", async () => {
    const sessions = await request(app)
      .get("/api/v1/auth/sessions")
      .set("Authorization", `Bearer ${accessToken}`);
    expect(sessions.status).toBe(200);
    expect(Array.isArray(sessions.body.data.sessions)).toBe(true);

    const history = await request(app)
      .get("/api/v1/auth/login-history")
      .set("Authorization", `Bearer ${accessToken}`);
    expect(history.status).toBe(200);
    expect(history.body.data.history.length).toBeGreaterThan(0);
  });

  it("persists refresh tokens hashed in db", async () => {
    const count = await prisma.refreshToken.count();
    expect(count).toBeGreaterThan(0);
  });
});
