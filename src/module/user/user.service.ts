import { hashPwd, ComparePassword } from "../../utils/bcrypt";
import { UserRepository } from "./user.repository";
import { TUserCreate, TUserUpdate } from "./user.type";
import { Prisma, User } from "@prisma/client";

export class UserService {
  constructor(private readonly userRepo = new UserRepository()) {}

  async createUser(data: TUserCreate, password: string): Promise<User> {
    const existingUser = await this.userRepo.findByEmail(data.email);
    if (existingUser) {
      throw new Error("Email already in use");
    }

    const hashedPassword = await hashPwd(password);

    const payload: Prisma.UserCreateInput = {
      ...data,
      password: hashedPassword,
      role: "USER",
      isActive: true,
    };

    return this.userRepo.create(payload);
  }

  async login(email: string, password: string): Promise<User> {
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

    // TODO: Generate JWT token here if needed
    return user;
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
}

export const userService = new UserService();
