import { Response } from "express";
import { AuthRequest } from "../../middlware/auth.middleware";
export declare const ManufacturerController: {
    apply: (req: AuthRequest, res: Response) => Promise<void>;
    getPending: (req: AuthRequest, res: Response) => Promise<void>;
    approve: (req: AuthRequest, res: Response) => Promise<void>;
    reject: (req: AuthRequest, res: Response) => Promise<void>;
};
//# sourceMappingURL=manufacturer.controller.d.ts.map