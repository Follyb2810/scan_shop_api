import { generateSecret, generateURI, verifySync } from "otplib";
import { env } from "../../../config/env";

export function generateTotpSecret(): string {
  return generateSecret();
}

export function buildOtpAuthUrl(email: string, secret: string): string {
  return generateURI({
    issuer: env.APP_NAME,
    label: email,
    secret,
  });
}

export function verifyTotp(token: string, secret: string): boolean {
  const result = verifySync({ token, secret });
  return Boolean(result && result.valid);
}
