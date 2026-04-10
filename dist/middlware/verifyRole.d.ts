import { RequestHandler } from "express";
export declare enum TRole {
    ADMIN = "ADMIN",
    MODERATOR = "MODERATOR",
    MANUFACTURER = "MANUFACTURER",
    USER = "USER"
}
export declare const verifyRole: (...allowRoles: TRole[]) => RequestHandler;
//# sourceMappingURL=verifyRole.d.ts.map