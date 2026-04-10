import { Request, Response } from "express";
import { AuthRequest } from "../../middlware/auth.middleware";
export declare const ProductController: {
    create: (req: AuthRequest, res: Response) => Promise<void>;
    getAll: (_req: Request, res: Response) => Promise<void>;
    getById: (req: Request, res: Response) => Promise<void>;
    getMyProducts: (req: AuthRequest, res: Response) => Promise<void>;
    update: (req: Request, res: Response) => Promise<void>;
    disable: (req: Request, res: Response) => Promise<void>;
    delete: (req: Request, res: Response) => Promise<void>;
};
//# sourceMappingURL=product.controller.d.ts.map