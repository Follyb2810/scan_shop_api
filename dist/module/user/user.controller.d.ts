import { Response } from "express";
import { AuthRequest } from "../../middlware/auth.middleware";
export declare const UserController: {
    create(req: AuthRequest, res: Response): Promise<void>;
    login(req: AuthRequest, res: Response): Promise<void>;
    refreshToken(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    getAllUsers(req: AuthRequest, res: Response): Promise<void>;
    getUserById(req: AuthRequest, res: Response): Promise<void>;
    updateUserById(req: AuthRequest, res: Response): Promise<void>;
    updatePassword(req: AuthRequest, res: Response): Promise<void>;
    deleteUserById(req: AuthRequest, res: Response): Promise<void>;
};
//# sourceMappingURL=user.controller.d.ts.map