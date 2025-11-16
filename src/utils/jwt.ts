import jwt, { Secret, SignOptions } from "jsonwebtoken";

type TPayload = {
  id: string;
  sub: string;
  email?: string;
  name?: string;
  userId?: string;
};

export class JwtService {
  private static secret: Secret = process.env.JWT_SECRET!;
  private constructor() {}

  static generateToken(
    payload: TPayload,
    expiresIn: SignOptions["expiresIn"] = "60d"
  ): string {
    return jwt.sign(payload, JwtService.secret, { expiresIn });
  }

  static verifyToken(token: string): TPayload {
    return jwt.verify(token, JwtService.secret) as TPayload;
  }

  static decodeJwtBrowser(token: string): Partial<TPayload> | null {
    try {
      const b64 = token.split(".")[1];
      if (!b64) return null;

      const json = atob(b64.replace(/-/g, "+").replace(/_/g, "/"));
      // console.log(JSON.parse(json));
      return JSON.parse(json);
    } catch {
      return null;
    }
  }

  static decodeJwtServer(token: string): Partial<TPayload> | null {
    try {
      const b64 = token.split(".")[1];
      if (!b64) return null;

      const json = Buffer.from(
        b64.replace(/-/g, "+").replace(/_/g, "/"),
        "base64"
      ).toString("utf8");
      // console.log(JSON.parse(json));
      return JSON.parse(json);
    } catch {
      return null;
    }
  }
}
