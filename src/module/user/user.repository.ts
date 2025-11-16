import { User, Prisma, Role, UserRole } from "@prisma/client";
import prisma from "../../config/prisma-client";

export function connectIf(id?: string) {
  return id ? { connect: { id } } : undefined;
}

export class UserRepository {
  private readonly db = prisma;

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.db.user.create({
      data,
      include: {
        manufacturer: true,
        auditLogs: true,
        userRoles: { include: { role: true } },
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.db.user.findUnique({
      where: { email },
      include: {
        manufacturer: true,
        auditLogs: true,
        userRoles: { include: { role: true } },
      },
    });
  }

  async getAll(): Promise<User[]> {
    return this.db.user.findMany({
      include: {
        manufacturer: true,
        auditLogs: true,
        userRoles: { include: { role: true } },
      },
    });
  }

  async getById(id: string): Promise<User | null> {
    return this.db.user.findUnique({
      where: { id },
      include: {
        manufacturer: true,
        auditLogs: true,
        userRoles: { include: { role: true } },
      },
    });
  }

  async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    return this.db.user.update({
      where: { id },
      data,
      include: {
        manufacturer: true,
        auditLogs: true,
        userRoles: { include: { role: true } },
      },
    });
  }

  async delete(id: string): Promise<User> {
    return this.db.user.delete({
      where: { id },
    });
  }

  async createRole(data: Prisma.RoleCreateInput): Promise<Role> {
    return this.db.role.create({ data });
  }

  async assignRole(userId: string, roleName: string): Promise<UserRole> {
    let role = await this.db.role.findUnique({ where: { name: roleName } });

    if (!role) {
      role = await this.db.role.create({ data: { name: roleName } });
    }

    return this.db.userRole.create({
      data: {
        userId,
        roleId: role.id,
      },
    });
  }

  async removeRole(userId: string, roleName: string): Promise<void> {
    const role = await this.db.role.findUnique({ where: { name: roleName } });
    if (!role) return;

    await this.db.userRole.delete({
      where: {
        userId_roleId: {
          userId,
          roleId: role.id,
        },
      },
    });
  }

  async getUserRoles(userId: string): Promise<Role[]> {
    const user = await this.db.user.findUnique({
      where: { id: userId },
      include: { userRoles: { include: { role: true } } },
    });
    if (!user) return [];
    return user.userRoles.map((ur) => ur.role);
  }
}
