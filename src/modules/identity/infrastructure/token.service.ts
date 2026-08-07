import { createHash, randomBytes } from "crypto";
import { sign, SignOptions, verify } from "jsonwebtoken";
import { env } from "../../../config/env";

export type AccessTokenClaims = {
  sub: string;
  email?: string;
  typ: "access";
};

export function hashToken(raw: string): string {
  return createHash("sha256").update(raw).digest("hex");
}

export function generateOpaqueToken(bytes = 48): string {
  return randomBytes(bytes).toString("base64url");
}

export function signAccessToken(
  userId: string,
  email?: string,
  expiresIn: SignOptions["expiresIn"] = env.JWT_ACCESS_EXPIRES_IN as SignOptions["expiresIn"]
): string {
  const payload: AccessTokenClaims = {
    sub: userId,
    email,
    typ: "access",
  };
  return sign(payload, env.JWT_ACCESS_SECRET, { expiresIn });
}

export function verifyAccessToken(token: string): AccessTokenClaims {
  const payload = verify(token, env.JWT_ACCESS_SECRET) as AccessTokenClaims;
  if (payload.typ !== "access") {
    throw new Error("Invalid token type");
  }
  return payload;
}

export function parseDurationToMs(duration: string): number {
  const match = /^(\d+)([smhd])$/.exec(duration.trim());
  if (!match) {
    // fallback 7 days
    return 7 * 24 * 60 * 60 * 1000;
  }
  const amount = Number(match[1]);
  const unit = match[2];
  const mult =
    unit === "s"
      ? 1000
      : unit === "m"
        ? 60_000
        : unit === "h"
          ? 3_600_000
          : 86_400_000;
  return amount * mult;
}

export function refreshExpiryDate(): Date {
  return new Date(Date.now() + parseDurationToMs(env.JWT_REFRESH_EXPIRES_IN));
}

export function sessionExpiryDate(): Date {
  // Sessions track refresh lifetime
  return refreshExpiryDate();
}
