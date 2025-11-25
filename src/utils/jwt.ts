import {
  sign,
  verify,
  Secret,
  SignOptions,
  JwtPayload as JWT,
} from "jsonwebtoken";

export interface JwtPayload {
  id: string;
  email?: string;
  roles?: string[];
}

export class JwtService {
  private static secret: Secret | null = null;

  private constructor() {}

  private static getSecret(): Secret {
    if (!this.secret) {
      this.secret = process.env.JWT_SECRET!;
      if (!this.secret) {
        throw new Error(
          "JWT_SECRET is not defined. Make sure it is set in the environment variables."
        );
      }
    }
    return this.secret;
  }

  static signToken<T extends Record<string, any>>(
    payload: T,
    options?: SignOptions
  ): string {
    try {
      return sign(payload, this.getSecret(), {
        expiresIn: "1000h",
        ...options,
      });
    } catch (err) {
      throw new Error(`JWT signing failed: ${(err as Error).message}`);
    }
  }

  static verifyToken<T extends JwtPayload = JwtPayload>(token: string): T {
    try {
      return verify(token, this.getSecret()) as T;
    } catch (err) {
      const error = err as any;
      if (error.name === "TokenExpiredError") {
        throw new Error("JWT token has expired");
      }
      if (error.name === "JsonWebTokenError") {
        throw new Error("Invalid JWT token");
      }
      throw error;
    }
  }

  static generateAccessToken<T extends Record<string, any>>(
    payload: T,
    expiresIn: SignOptions["expiresIn"] = "1h"
  ): string {
    return this.signToken(payload, { expiresIn });
  }

  static generateRefreshToken<T extends Record<string, any>>(
    payload: T,
    expiresIn: SignOptions["expiresIn"] = "7d"
  ): string {
    return this.signToken(payload, { expiresIn });
  }

  static decodeToken<T = JwtPayload>(token: string): T & JWT {
    return verify(token, this.getSecret(), { ignoreExpiration: true }) as T &
      JWT;
  }
}

export default JwtService;
