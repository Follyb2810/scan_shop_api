import { SignOptions, JwtPayload as JWT } from "jsonwebtoken";
export interface JwtPayload {
    id: string;
    email?: string;
    roles?: string[];
}
export declare class JwtService {
    private static secret;
    private constructor();
    private static getSecret;
    static signToken<T extends Record<string, any>>(payload: T, options?: SignOptions): string;
    static verifyToken<T extends JwtPayload = JwtPayload>(token: string): T;
    static generateAccessToken<T extends Record<string, any>>(payload: T, expiresIn?: SignOptions["expiresIn"]): string;
    static generateRefreshToken<T extends Record<string, any>>(payload: T, expiresIn?: SignOptions["expiresIn"]): string;
    static decodeToken<T = JwtPayload>(token: string): T & JWT;
}
export default JwtService;
//# sourceMappingURL=jwt.d.ts.map