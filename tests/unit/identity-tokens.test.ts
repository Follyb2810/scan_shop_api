import { describe, expect, it } from "vitest";
import {
  generateOpaqueToken,
  hashToken,
  parseDurationToMs,
  signAccessToken,
  verifyAccessToken,
} from "../../src/modules/identity/infrastructure/token.service";

describe("identity token helpers", () => {
  it("hashes tokens stably", () => {
    const raw = "abc";
    expect(hashToken(raw)).toBe(hashToken(raw));
    expect(hashToken(raw)).not.toBe(raw);
  });

  it("signs and verifies access tokens", () => {
    const token = signAccessToken("user-1", "a@b.com");
    const claims = verifyAccessToken(token);
    expect(claims.sub).toBe("user-1");
    expect(claims.email).toBe("a@b.com");
    expect(claims.typ).toBe("access");
  });

  it("generates opaque refresh tokens", () => {
    expect(generateOpaqueToken().length).toBeGreaterThan(20);
  });

  it("parses duration strings", () => {
    expect(parseDurationToMs("15m")).toBe(15 * 60 * 1000);
    expect(parseDurationToMs("7d")).toBe(7 * 24 * 60 * 60 * 1000);
  });
});
