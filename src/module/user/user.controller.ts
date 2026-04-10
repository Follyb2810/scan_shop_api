import { Request, Response } from "express";
import { AuthRequest } from "../../middlware/auth.middleware";
import { userService } from "./user.service";
import { successHandler } from "../../errors/successHandler";
import { userResponseDto } from "./user.dto";
import JwtService from "../../utils/jwt";
import { CreateUserBody } from "./user.type";
import { errorHandler } from "../../errors/errorHandler";

export const UserController = {
  async create(req: AuthRequest, res: Response) {
    const { password, email } = req.body as CreateUserBody;
    const result = await userService.createUser({ email, password });
    const accessToken = JwtService.generateAccessToken({
      id: result.id,
      email: result.email,
    });
    const refreshToken = JwtService.generateRefreshToken({
      id: result.id,
      email: result.email,
    });
    successHandler(
      res,
      { data: userResponseDto(result), accessToken, refreshToken },
      "User Created Successfully",
      201
    );
  },

  async login(req: AuthRequest, res: Response) {
    const { email, password } = req.body;
    const result = await userService.login(email, password);
    const refreshToken = JwtService.generateRefreshToken({
      id: result.id,
      email: result.email,
    });
    const accessToken = JwtService.generateAccessToken({
      id: result.id,
      email: result.email,
    });
    successHandler(
      res,
      { data: userResponseDto(result), accessToken, refreshToken },
      "User Login Successfully",
      200
    );
  },
  async refreshToken(req: AuthRequest, res: Response) {
    const { token } = req.body;
    if (!token) {
      return errorHandler("REFRESH_TOKEN_REQUIRED", res);
    }
    console.log({ token });
    const decoded = JwtService.verifyToken(token);
    const result = await userService.getUserById(decoded.id);
    if (!result) {
      return errorHandler("INVALID_USER", res);
    }

    const refreshToken = JwtService.generateRefreshToken({
      id: result.id,
      email: result.email,
    });
    const accessToken = JwtService.generateAccessToken({
      id: result.id,
      email: result.email,
    });
    successHandler(
      res,
      { accessToken, refreshToken },
      "New Refresh token sent",
      200
    );
  },
  async getAllUsers(req: AuthRequest, res: Response) {
    const result = await userService.getAllUsers();
    const data = result.map(userResponseDto);
    successHandler(res, data, "All User Successfully", 200);
  },
  async getUserById(req: AuthRequest, res: Response) {
    const userId = req.userId!;
    const result = await userService.getUserById(userId);
    successHandler(
      res,
      { data: result ? userResponseDto(result) : result },
      "Single User Successfully",
      200
    );
  },
  async updateUserById(req: AuthRequest, res: Response) {
    const userId = req.userId!;
    const data = req.body;
    const result = await userService.updateUserById(userId, { ...data });
    successHandler(
      res,
      { data: result ? userResponseDto(result) : result },
      "Single User Successfully",
      200
    );
  },
  async updatePassword(req: AuthRequest, res: Response) {
    const userId = req.userId!;
    const { password } = req.body;
    const result = await userService.updatePassword(userId, password);
    successHandler(
      res,
      { data: result ? userResponseDto(result) : result },
      "Single User Successfully",
      200
    );
  },
  async deleteUserById(req: AuthRequest, res: Response) {
    const userId = req.userId!;
    await userService.deleteUserById(userId);
    successHandler(
      res,
      { data: null },
      "User Delete Successfully  Successfully",
      200
    );
  },
};
