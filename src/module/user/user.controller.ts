import { Request, Response } from "express";
import { AuthRequest } from "../../middlware/auth.middleware";
import { userService } from "./user.service";
import { successHandler } from "../../errors/successHandler";

export const UserController = {
  async create(req: AuthRequest, res: Response) {
    const { password, email } = req.body;
    const result = await userService.createUser(email, password);
    successHandler(res, result, "User Created Successfully", 201);
  },

  async login(req: AuthRequest, res: Response) {
    const { email, password } = req.body;
    const result = await userService.login(email, password);
    successHandler(res, result, "User Login Successfully", 200);
  },
  async getAllUsers(req: AuthRequest, res: Response) {
    const { email, password } = req.body;
    const result = await userService.getAllUsers();
    successHandler(res, result, "All User Successfully", 200);
  },
  async getUserById(req: AuthRequest, res: Response) {
    const userId = req.userId!;
    const result = await userService.getUserById(userId);
    successHandler(res, result, "Single User Successfully", 200);
  },
  async updateUserById(req: AuthRequest, res: Response) {
    const userId = req.userId!;
    const data = req.body;
    const result = await userService.updateUserById(userId, { ...data });
    successHandler(res, result, "Single User Successfully", 200);
  },
  async updatePassword(req: AuthRequest, res: Response) {
    const userId = req.userId!;
    const { password } = req.body;
    const result = await userService.updatePassword(userId, password);
    successHandler(res, result, "Single User Successfully", 200);
  },
  async deleteUserById(req: AuthRequest, res: Response) {
    const userId = req.userId!;
    const result = await userService.deleteUserById(userId);
    successHandler(res, result, "User Delete Successfully  Successfully", 200);
  },
};
