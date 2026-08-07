import {
  ConflictError,
  ForbiddenError,
  NotFoundError,
  TenantIsolationError,
  ValidationError,
} from "../../../shared/errors";
import { seedOrganizationRoles } from "../../rbac/infrastructure/seed";
import { invalidateUserPermissions } from "../../rbac/infrastructure/permission-cache";
import { workflowService } from "../../workflow/application/workflow.service";
import {
  organizationRepository,
  OrganizationRepository,
} from "../infrastructure/organization.repository";
import { seedOrganizationTypes } from "../infrastructure/seed-types";

export class OrganizationService {
  constructor(
    private readonly repo: OrganizationRepository = organizationRepository
  ) {}

  seedTypes() {
    return seedOrganizationTypes();
  }

  listTypes() {
    return this.repo.listTypes();
  }

  async createOrganization(
    ownerUserId: string,
    input: {
      name: string;
      slug: string;
      typeKey: string;
      profile?: Record<string, string | undefined>;
      defaultBranch?: {
        name?: string;
        code?: string;
        city?: string;
        country?: string;
      };
    }
  ) {
    const type = await this.repo.findTypeByKey(input.typeKey.toUpperCase());
    if (!type) {
      throw new ValidationError(`Unknown organization type: ${input.typeKey}`);
    }

    const existing = await this.repo.findBySlug(input.slug);
    if (existing) {
      throw new ConflictError("Organization slug already in use");
    }

    // Avoid interactive transactions on SQLite (lock contention with seed helpers).
    // Status stays pending until the workflow engine completes approval (Step 7).
    const created = await this.repo.createOrganization({
      name: input.name,
      slug: input.slug,
      typeId: type.id,
      status: "pending",
      profile: input.profile,
    });

    await seedOrganizationRoles(created.id);

    const membership = await this.repo.createMembership(
      created.id,
      ownerUserId
    );
    const ownerRole = await this.repo.findOrgRoleByKey(created.id, "OWNER");
    if (ownerRole) {
      await this.repo.assignMembershipRole(membership.id, ownerRole.id);
    }

    const branchName = input.defaultBranch?.name ?? "Headquarters";
    const branchCode = (input.defaultBranch?.code ?? "HQ").toUpperCase();
    await this.repo.createBranch({
      organizationId: created.id,
      name: branchName,
      code: branchCode,
      city: input.defaultBranch?.city,
      country: input.defaultBranch?.country,
    });

    const definitionKey =
      type.key === "MANUFACTURER"
        ? "manufacturer.approval"
        : "organization.approval";

    const approvalWorkflow = await workflowService.startWorkflow({
      definitionKey,
      subjectType: "organization",
      subjectId: created.id,
      organizationId: created.id,
      startedByUserId: ownerUserId,
    });

    const org = await this.repo.findById(created.id);
    await invalidateUserPermissions(ownerUserId, org!.id);
    return { organization: org!, approvalWorkflow };
  }

  async listMine(userId: string) {
    const memberships = await this.repo.listMembershipsForUser(userId);
    return memberships.map((m) => ({
      membershipId: m.id,
      status: m.status,
      roles: m.roles.map((r) => r.role.key),
      organization: m.organization,
    }));
  }

  /**
   * Tenant-scoped read. Caller must be a member (or platform — checked by middleware).
   */
  async getOrganization(organizationId: string, actorUserId: string) {
    await this.assertMembership(organizationId, actorUserId);
    const org = await this.repo.findById(organizationId);
    if (!org) throw new NotFoundError("Organization not found");
    return org;
  }

  async updateOrganization(
    organizationId: string,
    actorUserId: string,
    input: { name?: string; profile?: Record<string, string | undefined> }
  ) {
    await this.assertMembership(organizationId, actorUserId);
    const org = await this.repo.findById(organizationId);
    if (!org) throw new NotFoundError("Organization not found");
    return this.repo.updateOrganization(organizationId, input);
  }

  async listBranches(organizationId: string, actorUserId: string) {
    await this.assertMembership(organizationId, actorUserId);
    return this.repo.listBranches(organizationId);
  }

  async createBranch(
    organizationId: string,
    actorUserId: string,
    input: {
      name: string;
      code: string;
      address?: string;
      city?: string;
      state?: string;
      country?: string;
    }
  ) {
    await this.assertMembership(organizationId, actorUserId);
    try {
      return await this.repo.createBranch({
        organizationId,
        name: input.name,
        code: input.code.toUpperCase(),
        address: input.address,
        city: input.city,
        state: input.state,
        country: input.country,
      });
    } catch (err) {
      if (
        typeof err === "object" &&
        err &&
        "code" in err &&
        (err as { code: string }).code === "P2002"
      ) {
        throw new ConflictError("Branch code already exists in this organization");
      }
      throw err;
    }
  }

  async updateBranch(
    organizationId: string,
    branchId: string,
    actorUserId: string,
    input: {
      name?: string;
      address?: string;
      city?: string;
      state?: string;
      country?: string;
      status?: string;
    }
  ) {
    await this.assertMembership(organizationId, actorUserId);
    const branch = await this.repo.findBranch(organizationId, branchId);
    if (!branch) {
      throw new TenantIsolationError("Branch not found in this organization");
    }
    return this.repo.updateBranch(branchId, input);
  }

  async deleteBranch(
    organizationId: string,
    branchId: string,
    actorUserId: string
  ) {
    await this.assertMembership(organizationId, actorUserId);
    const branch = await this.repo.findBranch(organizationId, branchId);
    if (!branch) {
      throw new TenantIsolationError("Branch not found in this organization");
    }
    return this.repo.softDeleteBranch(branchId);
  }

  async listMembers(organizationId: string, actorUserId: string) {
    await this.assertMembership(organizationId, actorUserId);
    const members = await this.repo.listMembers(organizationId);
    return members.map((m) => ({
      id: m.id,
      status: m.status,
      user: m.user,
      roles: m.roles.map((r) => r.role.key),
    }));
  }

  async inviteMember(
    organizationId: string,
    actorUserId: string,
    input: { email: string; roleKey: string }
  ) {
    await this.assertMembership(organizationId, actorUserId);

    const user = await this.repo.findUserByEmail(input.email);
    if (!user) {
      throw new NotFoundError("User not found. They must register first.");
    }

    const existing = await this.repo.findMembership(organizationId, user.id);
    if (existing) {
      throw new ConflictError("User is already a member");
    }

    const role = await this.repo.findOrgRoleByKey(
      organizationId,
      input.roleKey.toUpperCase()
    );
    if (!role || role.deletedAt) {
      throw new ValidationError(`Unknown role: ${input.roleKey}`);
    }

    const membership = await this.repo.createMembership(
      organizationId,
      user.id
    );
    await this.repo.assignMembershipRole(membership.id, role.id);
    await invalidateUserPermissions(user.id, organizationId);

    return {
      membershipId: membership.id,
      userId: user.id,
      roleKey: role.key,
    };
  }

  async updateMember(
    organizationId: string,
    membershipId: string,
    actorUserId: string,
    input: { status?: string; roleKey?: string }
  ) {
    await this.assertMembership(organizationId, actorUserId);

    const members = await this.repo.listMembers(organizationId);
    const membership = members.find((m) => m.id === membershipId);
    if (!membership) {
      throw new TenantIsolationError("Membership not found in this organization");
    }

    if (input.status) {
      await this.repo.updateMembershipStatus(membershipId, input.status);
    }

    if (input.roleKey) {
      const role = await this.repo.findOrgRoleByKey(
        organizationId,
        input.roleKey.toUpperCase()
      );
      if (!role || role.deletedAt) {
        throw new ValidationError(`Unknown role: ${input.roleKey}`);
      }
      await this.repo.assignMembershipRole(membershipId, role.id);
    }

    await invalidateUserPermissions(membership.userId, organizationId);
    return this.repo.findMembership(organizationId, membership.userId);
  }

  async assertMembership(organizationId: string, userId: string) {
    const membership = await this.repo.findMembership(organizationId, userId);
    if (!membership || membership.status !== "active") {
      throw new TenantIsolationError(
        "Access denied: not an active member of this organization"
      );
    }
    return membership;
  }

  async assertBranchInOrg(organizationId: string, branchId: string) {
    const branch = await this.repo.findBranch(organizationId, branchId);
    if (!branch) {
      throw new TenantIsolationError("Branch does not belong to this organization");
    }
    return branch;
  }
}

export const organizationService = new OrganizationService();
