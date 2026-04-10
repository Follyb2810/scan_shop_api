import { Response } from "express";
import { AuthRequest } from "../../middlware/auth.middleware";
export declare const ProductUnitController: {
    create: (req: AuthRequest, res: Response) => Promise<void>;
    getById: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    getByProduct: (req: AuthRequest, res: Response) => Promise<void>;
    update: (req: AuthRequest, res: Response) => Promise<void>;
    delete: (req: AuthRequest, res: Response) => Promise<void>;
    scan: (req: AuthRequest, res: Response) => Promise<void>;
    markAsSold: (req: AuthRequest, res: Response) => Promise<void>;
    reportSuspicious: (req: AuthRequest, res: Response) => Promise<void>;
};
//# sourceMappingURL=productunit.controller.d.ts.map