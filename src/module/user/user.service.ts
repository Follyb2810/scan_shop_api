import { hashPwd, ComparePassword } from "../../utils/bcrypt";
import { UserRepository } from "./user.repository";
import { TUserCreate, TUserResponse, TUserUpdate } from "./user.type";
import { Prisma, User } from "../../generated/prisma/client";
import { JwtService } from "../../utils/jwt";

export class UserService {
  constructor(private readonly userRepo = new UserRepository()) {}

  async createUser(
    data: TUserCreate,
    password: string
  ): Promise<TUserResponse> {
    const existingUser = await this.userRepo.findByEmail(data.email);
    if (existingUser) {
      throw new Error("Email already in use");
    }

    const hashedPassword = await hashPwd(password);

    const payload: Prisma.UserCreateInput = {
      ...data,
      password: hashedPassword,
      isActive: true,
    };

    const user = await this.userRepo.create(payload);
    // await this.userRepo.assignRole(user.id, "USER");

    const refreshToken = JwtService.generateRefreshToken({
      id: user.id,
      email: user.email,
      // roles: user.role,
    });
    return { user, refreshToken };
  }

  async login(email: string, password: string): Promise<TUserResponse> {
    const user = await this.userRepo.findByEmail(email);
    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isPasswordValid = await ComparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    if (!user.isActive) {
      throw new Error("User account is inactive");
    }

    // TODO: Generate JWT token if needed
    const refreshToken = JwtService.generateRefreshToken({
      id: user.id,
      email: user.email,
      // roles: user.role,
    });
    return { user, refreshToken };
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepo.getAll();
  }

  async getUserById(id: string): Promise<User | null> {
    return this.userRepo.getById(id);
  }

  async updateUserById(id: string, data: TUserUpdate): Promise<User> {
    return this.userRepo.update(id, data);
  }

  async deleteUserById(id: string): Promise<User> {
    return this.userRepo.delete(id);
  }

  async updatePassword(id: string, password: string): Promise<User> {
    const hashedPassword = await hashPwd(password);
    return this.userRepo.update(id, { password: hashedPassword });
  }

  async getUserRoles(userId: string) {
    return this.userRepo.getUserRoles(userId);
  }

  async assignRole(userId: string, roleName: string) {
    return this.userRepo.assignRole(userId, roleName);
  }

  async removeRole(userId: string, roleName: string) {
    return this.userRepo.removeRole(userId, roleName);
  }
}

export const userService = new UserService();
