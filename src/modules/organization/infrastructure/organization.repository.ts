import { prisma } from "../../../infrastructure/database";
import { BaseRepository } from "../../../infrastructure/database/base.repository";

const orgInclude = {
  type: true,
  profile: true,
  branches: { where: { deletedAt: null } },
} as const;

export class OrganizationRepository extends BaseRepository {
  listTypes() {
    return this.db.organizationType.findMany({ orderBy: { name: "asc" } });
  }

  findTypeByKey(key: string) {
    return this.db.organizationType.findUnique({ where: { key } });
  }

  findById(id: string) {
    return this.db.organization.findFirst({
      where: { id, deletedAt: null },
      include: orgInclude,
    });
  }

  findBySlug(slug: string) {
    return this.db.organization.findFirst({
      where: { slug, deletedAt: null },
    });
  }

  createOrganization(data: {
    name: string;
    slug: string;
    typeId: string;
    status?: string;
    profile?: {
      companyEmail?: string;
      companyPhone?: string;
      website?: string;
      address?: string;
      city?: string;
      state?: string;
      country?: string;
      postalCode?: string;
      licenseNumber?: string;
      registrationNumber?: string;
      taxId?: string;
      nafdacNumber?: string;
      sonCertification?: string;
    };
  }) {
    return this.db.organization.create({
      data: {
        name: data.name,
        slug: data.slug,
        typeId: data.typeId,
        status: data.status ?? "active",
        profile: data.profile
          ? { create: data.profile }
          : undefined,
      },
      include: orgInclude,
    });
  }

  updateOrganization(
    id: string,
    data: {
      name?: string;
      status?: string;
      profile?: Record<string, string | null | undefined>;
    }
  ) {
    return this.db.organization.update({
      where: { id },
      data: {
        name: data.name,
        status: data.status,
        profile: data.profile
          ? {
              upsert: {
                create: data.profile,
                update: data.profile,
              },
            }
          : undefined,
      },
      include: orgInclude,
    });
  }

  listMembershipsForUser(userId: string) {
    return this.db.membership.findMany({
      where: { userId, status: "active" },
      include: {
        organization: { include: orgInclude },
        roles: { include: { role: true } },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  findMembership(organizationId: string, userId: string) {
    return this.db.membership.findUnique({
      where: {
        organizationId_userId: { organizationId, userId },
      },
      include: {
        roles: { include: { role: true } },
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            status: true,
          },
        },
      },
    });
  }

  createMembership(organizationId: string, userId: string, status = "active") {
    return this.db.membership.create({
      data: { organizationId, userId, status },
    });
  }

  listMembers(organizationId: string) {
    return this.db.membership.findMany({
      where: { organizationId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            status: true,
          },
        },
        roles: { include: { role: true } },
      },
      orderBy: { createdAt: "asc" },
    });
  }

  updateMembershipStatus(membershipId: string, status: string) {
    return this.db.membership.update({
      where: { id: membershipId },
      data: { status },
    });
  }

  findUserByEmail(email: string) {
    return this.db.user.findFirst({
      where: { email: email.toLowerCase(), deletedAt: null },
    });
  }

  findOrgRoleByKey(organizationId: string, key: string) {
    return this.db.organizationRole.findUnique({
      where: {
        organizationId_key: { organizationId, key },
      },
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

  listBranches(organizationId: string) {
    return this.db.branch.findMany({
      where: { organizationId, deletedAt: null },
      orderBy: { name: "asc" },
    });
  }

  findBranch(organizationId: string, branchId: string) {
    return this.db.branch.findFirst({
      where: { id: branchId, organizationId, deletedAt: null },
    });
  }

  createBranch(data: {
    organizationId: string;
    name: string;
    code: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
  }) {
    return this.db.branch.create({ data });
  }

  updateBranch(
    branchId: string,
    data: {
      name?: string;
      address?: string;
      city?: string;
      state?: string;
      country?: string;
      status?: string;
    }
  ) {
    return this.db.branch.update({
      where: { id: branchId },
      data,
    });
  }

  softDeleteBranch(branchId: string) {
    return this.db.branch.update({
      where: { id: branchId },
      data: { deletedAt: new Date(), status: "inactive" },
    });
  }
}

export const organizationRepository = new OrganizationRepository(prisma);
