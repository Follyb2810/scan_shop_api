import { SignOptions, sign, JwtPayload } from "jsonwebtoken";
import { env } from "../../config/env";
import {
  signAccessToken as identitySignAccessToken,
  verifyAccessToken as identityVerifyAccessToken,
} from "../../modules/identity/infrastructure/token.service";

export type AccessTokenClaims = JwtPayload & {
  sub: string;
  email?: string;
  typ?: "access" | "refresh";
};

export function verifyAccessToken(token: string): AccessTokenClaims {
  return identityVerifyAccessToken(token) as AccessTokenClaims;
}

export function signAccessTokenForTests(
  userId: string,
  extra: Record<string, unknown> = {},
  expiresIn: SignOptions["expiresIn"] = "1h"
): string {
  if (Object.keys(extra).length === 0) {
    return identitySignAccessToken(userId, undefined, expiresIn);
  }
  return sign(
    { sub: userId, typ: "access", ...extra },
    env.JWT_ACCESS_SECRET,
    { expiresIn }
  );
}

export function extractBearerToken(
  authorizationHeader?: string
): string | undefined {
  if (!authorizationHeader) return undefined;
  const [scheme, token] = authorizationHeader.split(" ");
  if (!scheme || scheme.toLowerCase() !== "bearer" || !token) {
    return undefined;
  }
  return token;
}
