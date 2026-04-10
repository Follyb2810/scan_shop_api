import { prisma } from "../../config/prisma-client";
import { User, Prisma, Role, UserRole } from "../../generated/prisma/client";
import { CreateUserBody, UserWithRoles } from "./user.type";
// import prisma from "../../config/prisma-client";

export function connectIf(id?: string) {
  return id ? { connect: { id } } : undefined;
}

export class UserRepository {
  private readonly db = prisma;

  async create({ email, password }: CreateUserBody): Promise<UserWithRoles> {
    let userRole = await this.db.role.findUnique({ where: { name: "USER" } });
    if (!userRole) {
      userRole = await this.db.role.create({ data: { name: "USER" } });
    }
    const payload: Prisma.UserCreateInput = {
      email,
      password,
      isActive: true,
    };
    return this.db.user.create({
      data: {
        ...payload,

        userRoles: {
          create: [{ roleId: userRole.id }],
        },
      },
      include: {
        manufacturer: true,
        auditLogs: true,
        userRoles: { include: { role: true } },
      },
    });
  }

  async findByEmail(email: string): Promise<UserWithRoles | null> {
    return this.db.user.findUnique({
      where: { email },
      include: {
        manufacturer: true,
        auditLogs: true,
        userRoles: { include: { role: true } },
      },
    });
  }

  async getAll(): Promise<UserWithRoles[]> {
    return this.db.user.findMany({
      include: {
        manufacturer: true,
        auditLogs: true,
        userRoles: { include: { role: true } },
      },
    });
  }

  async getById(id: string): Promise<UserWithRoles | null> {
    return this.db.user.findUnique({
      where: { id },
      include: {
        manufacturer: true,
        auditLogs: true,
        userRoles: { include: { role: true } },
      },
    });
  }

  async update(
    id: string,
    data: Prisma.UserUpdateInput
  ): Promise<UserWithRoles> {
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
