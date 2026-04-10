import { hashPwd, ComparePassword } from "../../utils/bcrypt";
import { UserRepository } from "./user.repository";
import { CreateUserBody, TUserUpdate, UserWithRoles } from "./user.type";

export class UserService {
  constructor(private readonly userRepo = new UserRepository()) {}

  async createUser({
    email,
    password,
  }: CreateUserBody): Promise<UserWithRoles> {
    const existingUser = await this.userRepo.findByEmail(email);
    if (existingUser) {
      throw new Error("Email already in use");
    }

    const hashedPassword = await hashPwd(password);

    const user = await this.userRepo.create({
      email,
      password: hashedPassword,
    });
    // await this.userRepo.assignRole(user.id, "USER");

    return user;
  }

  async login(email: string, password: string): Promise<UserWithRoles> {
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

    return user;
  }

  async getAllUsers(): Promise<UserWithRoles[]> {
    return this.userRepo.getAll();
  }

  async getUserById(id: string): Promise<UserWithRoles | null> {
    return this.userRepo.getById(id);
  }

  async updateUserById(id: string, data: TUserUpdate): Promise<UserWithRoles> {
    return this.userRepo.update(id, data);
  }

  async deleteUserById(id: string) {
    return this.userRepo.delete(id);
  }

  async updatePassword(id: string, password: string): Promise<UserWithRoles> {
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
