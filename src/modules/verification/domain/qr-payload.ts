import crypto from "crypto";
import { env } from "../../../config/env";

export type QrPayloadFields = {
  v: string;
  pid: string;
  oid: string;
  prd: string;
  bid: string;
  lvl: string;
  uid: string;
  ts: string;
  kid: string;
  sig?: string;
};

const FIELD_ORDER = ["v", "pid", "oid", "prd", "bid", "lvl", "uid", "ts", "kid"] as const;

/**
 * Canonical string for HMAC (never includes sig).
 * Format: v=1|pid=...|oid=...|prd=...|bid=...|lvl=...|uid=...|ts=...|kid=...
 */
export function canonicalPayload(fields: Omit<QrPayloadFields, "sig">): string {
  return FIELD_ORDER.map((k) => `${k}=${fields[k]}`).join("|");
}

export function signCanonical(canonical: string, secret = env.HMAC_SECRET): string {
  return crypto.createHmac("sha256", secret).update(canonical).digest("hex");
}

export function buildSignedPayload(input: {
  organizationId: string;
  packageDefinitionId: string;
  batchId: string;
  packagingLevel: string;
  unitId: string;
  issuedAt?: Date;
}): { payload: string; signature: string; fields: QrPayloadFields } {
  const fields: Omit<QrPayloadFields, "sig"> = {
    v: "1",
    pid: env.PLATFORM_ID,
    oid: input.organizationId,
    prd: input.packageDefinitionId,
    bid: input.batchId,
    lvl: input.packagingLevel.toUpperCase(),
    uid: input.unitId,
    ts: String(Math.floor((input.issuedAt ?? new Date()).getTime() / 1000)),
    kid: env.HMAC_KEY_ID,
  };

  const canonical = canonicalPayload(fields);
  const signature = signCanonical(canonical);
  const payload = `${canonical}|sig=${signature}`;

  return {
    payload,
    signature,
    fields: { ...fields, sig: signature },
  };
}

export function parsePayload(raw: string): QrPayloadFields | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;

  const parts = trimmed.includes("|")
    ? trimmed.split("|")
    : trimmed.split("&");

  const map: Record<string, string> = {};
  for (const part of parts) {
    const idx = part.indexOf("=");
    if (idx <= 0) continue;
    const key = part.slice(0, idx).trim();
    const value = part.slice(idx + 1).trim();
    if (key) map[key] = value;
  }

  const required = [...FIELD_ORDER, "sig"] as const;
  for (const key of required) {
    if (!map[key]) return null;
  }

  return {
    v: map.v!,
    pid: map.pid!,
    oid: map.oid!,
    prd: map.prd!,
    bid: map.bid!,
    lvl: map.lvl!,
    uid: map.uid!,
    ts: map.ts!,
    kid: map.kid!,
    sig: map.sig!,
  };
}

export function verifySignature(
  fields: QrPayloadFields,
  secret = env.HMAC_SECRET
): boolean {
  if (!fields.sig) return false;
  const { sig: _sig, ...rest } = fields;
  const expected = signCanonical(canonicalPayload(rest), secret);
  try {
    return crypto.timingSafeEqual(
      Buffer.from(expected, "hex"),
      Buffer.from(fields.sig, "hex")
    );
  } catch {
    return false;
  }
}
