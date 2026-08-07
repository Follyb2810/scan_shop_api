import {
  ConflictError,
  ForbiddenError,
  NotFoundError,
  ValidationError,
} from "../../../shared/errors";
import { organizationService } from "../../organization/application/organization.service";
import {
  getCachedPermissions,
  invalidateUserPermissions,
  setCachedPermissions,
} from "../infrastructure/permission-cache";
import {
  rbacRepository,
  RbacRepository,
} from "../infrastructure/rbac.repository";
import {
  seedOrganizationRoles,
  seedRbacCatalog,
} from "../infrastructure/seed";

export class RbacService {
  constructor(private readonly repo: RbacRepository = rbacRepository) {}

  seedCatalog() {
    return seedRbacCatalog();
  }

  seedOrgRoles(organizationId: string) {
    return seedOrganizationRoles(organizationId);
  }

  listPermissions() {
    return this.repo.listPermissions();
  }

  listPlatformRoles() {
    return this.repo.listPlatformRoles();
  }

  async assignPlatformRole(userId: string, roleKey: string) {
    const role = await this.repo.findPlatformRoleByKey(roleKey);
    if (!role) throw new NotFoundError(`Platform role not found: ${roleKey}`);
    await this.repo.assignPlatformRole(userId, role.id);
    await invalidateUserPermissions(userId);
    return { userId, roleKey };
  }

  async removePlatformRole(userId: string, roleKey: string) {
    const role = await this.repo.findPlatformRoleByKey(roleKey);
    if (!role) throw new NotFoundError(`Platform role not found: ${roleKey}`);
    await this.repo.removePlatformRole(userId, role.id);
    await invalidateUserPermissions(userId);
    return { userId, roleKey };
  }

  async resolveAuthz(userId: string, organizationId?: string): Promise<{
    platformRoles: string[];
    permissions: string[];
    actorMode: "platform" | "organization" | "customer";
  }> {
    const platformRoles = await this.repo.getPlatformRoleKeys(userId);

    if (organizationId) {
      const cached = await getCachedPermissions(userId, organizationId);
      if (cached) {
        return {
          platformRoles,
          permissions: cached,
          actorMode: "organization",
        };
      }

      const membership = await this.repo.findMembership(
        organizationId,
        userId
      );
      if (!membership || membership.status !== "active") {
        throw new ForbiddenError("Not a member of this organization");
      }

      const permissions = await this.repo.getOrgPermissions(
        userId,
        organizationId
      );
      await setCachedPermissions(userId, permissions, organizationId);
      return { platformRoles, permissions, actorMode: "organization" };
    }

    const cached = await getCachedPermissions(userId);
    if (cached) {
      return {
        platformRoles,
        permissions: cached,
        actorMode: platformRoles.length ? "platform" : "customer",
      };
    }

    const permissions = await this.repo.getPlatformPermissions(userId);
    await setCachedPermissions(userId, permissions);
    return {
      platformRoles,
      permissions,
      actorMode: platformRoles.length ? "platform" : "customer",
    };
  }

  listOrgRoles(organizationId: string) {
    return this.repo.listOrgRoles(organizationId);
  }

  async createCustomOrgRole(
    organizationId: string,
    input: {
      name: string;
      key?: string;
      description?: string;
      permissionKeys: string[];
    }
  ) {
    const org = await this.repo.findOrganization(organizationId);
    if (!org) throw new NotFoundError("Organization not found");

    if (!input.permissionKeys?.length) {
      throw new ValidationError("permissionKeys required");
    }

    for (const key of input.permissionKeys) {
      if (!this.repo.isOrgAssignablePermission(key)) {
        throw new ValidationError(
          `Permission not assignable to organization roles: ${key}`,
          { key }
        );
      }
    }

    const permissions = await this.repo.findPermissionsByKeys(
      input.permissionKeys
    );
    if (permissions.length !== input.permissionKeys.length) {
      const found = new Set(permissions.map((p) => p.key));
      const missing = input.permissionKeys.filter((k) => !found.has(k));
      throw new ValidationError("Unknown permission keys", { missing });
    }

    const key =
      input.key?.toUpperCase().replace(/[^A-Z0-9_]/g, "_") ||
      `CUSTOM_${Date.now()}`;

    const existing = await this.repo.findOrgRoleByKey(organizationId, key);
    if (existing && !existing.deletedAt) {
      throw new ConflictError(`Role key already exists: ${key}`);
    }

    const role = await this.repo.createCustomOrgRole({
      organizationId,
      key,
      name: input.name,
      description: input.description,
      permissionIds: permissions.map((p) => p.id),
    });

    return role;
  }

  async updateCustomOrgRolePermissions(
    organizationId: string,
    roleId: string,
    permissionKeys: string[]
  ) {
    const role = await this.repo.findOrgRole(organizationId, roleId);
    if (!role) throw new NotFoundError("Role not found");
    if (role.isSystem) {
      throw new ForbiddenError("Cannot modify system role permissions");
    }

    for (const key of permissionKeys) {
      if (!this.repo.isOrgAssignablePermission(key)) {
        throw new ValidationError(
          `Permission not assignable to organization roles: ${key}`
        );
      }
    }

    const permissions = await this.repo.findPermissionsByKeys(permissionKeys);
    if (permissions.length !== permissionKeys.length) {
      throw new ValidationError("Unknown permission keys");
    }

    await this.repo.replaceOrgRolePermissions(
      roleId,
      permissions.map((p) => p.id)
    );

    return this.repo.findOrgRole(organizationId, roleId);
  }

  async assignOrgRoleToMember(
    organizationId: string,
    userId: string,
    roleKey: string
  ) {
    const membership = await this.repo.findMembership(organizationId, userId);
    if (!membership || membership.status !== "active") {
      throw new NotFoundError("Membership not found");
    }
    const role = await this.repo.findOrgRoleByKey(organizationId, roleKey);
    if (!role || role.deletedAt) {
      throw new NotFoundError(`Org role not found: ${roleKey}`);
    }

    await this.repo.assignMembershipRole(membership.id, role.id);
    await invalidateUserPermissions(userId, organizationId);
    return { organizationId, userId, roleKey };
  }

  /** @deprecated Prefer organizationService.createOrganization */
  async bootstrapOrganization(input: {
    name: string;
    slug: string;
    ownerUserId: string;
    typeKey?: string;
  }) {
    return organizationService.createOrganization(input.ownerUserId, {
      name: input.name,
      slug: input.slug,
      typeKey: input.typeKey ?? "PHARMACY",
    });
  }
}

export const rbacService = new RbacService();
