import { User, Prisma } from "@prisma/client";
import prisma from "../../config/prisma-client";

export function connectIf(id?: string) {
  return id ? { connect: { id } } : undefined;
}

export class UserRepository {
  private readonly db = prisma;

  // Create a new user
  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.db.user.create({
      data,
      include: {
        manufacturer: true,
        auditLogs: true,
      },
    });
  }

  // Find user by email
  async findByEmail(email: string): Promise<User | null> {
    return this.db.user.findUnique({
      where: { email },
      include: {
        manufacturer: true,
        auditLogs: true,
      },
    });
  }

  // Get all users
  async getAll(): Promise<User[]> {
    return this.db.user.findMany({
      include: { manufacturer: true, auditLogs: true },
    });
  }

  // Get user by ID
  async getById(id: string): Promise<User | null> {
    return this.db.user.findUnique({
      where: { id },
      include: { manufacturer: true, auditLogs: true },
    });
  }

  // Update user
  async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    return this.db.user.update({
      where: { id },
      data,
      include: { manufacturer: true, auditLogs: true },
    });
  }

  // Delete user
  async delete(id: string): Promise<User> {
    return this.db.user.delete({
      where: { id },
    });
  }
}
