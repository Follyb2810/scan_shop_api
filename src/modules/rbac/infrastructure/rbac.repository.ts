import { prisma } from "../../../infrastructure/database";
import { BaseRepository } from "../../../infrastructure/database/base.repository";
import { ORG_PERMISSION_KEYS } from "../domain/catalog";

export class RbacRepository extends BaseRepository {
  listPermissions() {
    return this.db.permission.findMany({ orderBy: [{ group: "asc" }, { key: "asc" }] });
  }

  findPermissionsByKeys(keys: string[]) {
    return this.db.permission.findMany({ where: { key: { in: keys } } });
  }

  listPlatformRoles() {
    return this.db.platformRole.findMany({
      include: {
        rolePermissions: { include: { permission: true } },
      },
      orderBy: { key: "asc" },
    });
  }

  findPlatformRoleByKey(key: string) {
    return this.db.platformRole.findUnique({ where: { key } });
  }

  async getPlatformRoleKeys(userId: string): Promise<string[]> {
    const rows = await this.db.platformUserRole.findMany({
      where: { userId },
      include: { role: true },
    });
    return rows.map((r) => r.role.key);
  }

  async getPlatformPermissions(userId: string): Promise<string[]> {
    const rows = await this.db.platformUserRole.findMany({
      where: { userId },
      include: {
        role: {
          include: {
            rolePermissions: { include: { permission: true } },
          },
        },
      },
    });

    const set = new Set<string>();
    for (const row of rows) {
      for (const rp of row.role.rolePermissions) {
        set.add(rp.permission.key);
      }
    }
    return [...set];
  }

  assignPlatformRole(userId: string, roleId: string) {
    return this.db.platformUserRole.upsert({
      where: {
        userId_roleId: { userId, roleId },
      },
      create: { userId, roleId },
      update: {},
    });
  }

  removePlatformRole(userId: string, roleId: string) {
    return this.db.platformUserRole.deleteMany({
      where: { userId, roleId },
    });
  }

  findOrganization(id: string) {
    return this.db.organization.findFirst({
      where: { id, deletedAt: null },
    });
  }

  createOrganization(name: string, slug: string) {
    return this.db.organization.create({
      data: { name, slug, status: "active" },
    });
  }

  findMembership(organizationId: string, userId: string) {
    return this.db.membership.findUnique({
      where: {
        organizationId_userId: { organizationId, userId },
      },
    });
  }

  createMembership(organizationId: string, userId: string) {
    return this.db.membership.create({
      data: { organizationId, userId, status: "active" },
    });
  }

  async getOrgPermissions(
    userId: string,
    organizationId: string
  ): Promise<string[]> {
    const membership = await this.db.membership.findFirst({
      where: {
        userId,
        organizationId,
        status: "active",
      },
      include: {
        roles: {
          include: {
            role: {
              include: {
                rolePermissions: { include: { permission: true } },
              },
            },
          },
        },
      },
    });

    if (!membership) return [];

    const set = new Set<string>();
    for (const mr of membership.roles) {
      if (mr.role.deletedAt) continue;
      for (const rp of mr.role.rolePermissions) {
        set.add(rp.permission.key);
      }
    }
    return [...set];
  }

  listOrgRoles(organizationId: string) {
    return this.db.organizationRole.findMany({
      where: { organizationId, deletedAt: null },
      include: {
        rolePermissions: { include: { permission: true } },
      },
      orderBy: { key: "asc" },
    });
  }

  findOrgRole(organizationId: string, roleId: string) {
    return this.db.organizationRole.findFirst({
      where: { id: roleId, organizationId, deletedAt: null },
      include: {
        rolePermissions: { include: { permission: true } },
      },
    });
  }

  findOrgRoleByKey(organizationId: string, key: string) {
    return this.db.organizationRole.findUnique({
      where: {
        organizationId_key: { organizationId, key },
      },
    });
  }

  async createCustomOrgRole(data: {
    organizationId: string;
    key: string;
    name: string;
    description?: string;
    permissionIds: string[];
  }) {
    return this.db.organizationRole.create({
      data: {
        organizationId: data.organizationId,
        key: data.key,
        name: data.name,
        description: data.description,
        isSystem: false,
        rolePermissions: {
          create: data.permissionIds.map((permissionId) => ({ permissionId })),
        },
      },
      include: {
        rolePermissions: { include: { permission: true } },
      },
    });
  }

  async replaceOrgRolePermissions(roleId: string, permissionIds: string[]) {
    await this.db.rolePermission.deleteMany({
      where: { organizationRoleId: roleId },
    });
    if (permissionIds.length === 0) return;
    await this.db.rolePermission.createMany({
      data: permissionIds.map((permissionId) => ({
        organizationRoleId: roleId,
        permissionId,
      })),
    });
  }

  assignMembershipRole(membershipId: string, roleId: string) {
    return this.db.membershipRole.upsert({
      where: {
        membershipId_roleId: { membershipId, roleId },
      },
      create: { membershipId, roleId },
      update: {},
    });
  }

  isOrgAssignablePermission(key: string): boolean {
    return ORG_PERMISSION_KEYS.includes(key);
  }
}

export const rbacRepository = new RbacRepository(prisma);
