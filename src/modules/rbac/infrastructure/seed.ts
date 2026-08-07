import { prisma } from "../../../infrastructure/database";
import { logger } from "../../../config/logger";
import {
  ORG_ROLE_TEMPLATES,
  PERMISSION_CATALOG,
  PLATFORM_ROLES,
  resolveOrgTemplatePermissions,
  resolvePlatformRolePermissions,
} from "../domain/catalog";

function isUniqueViolation(err: unknown): boolean {
  return (
    typeof err === "object" &&
    err !== null &&
    "code" in err &&
    (err as { code?: string }).code === "P2002"
  );
}

async function ensureRolePermission(data: {
  permissionId: string;
  platformRoleId?: string;
  organizationRoleId?: string;
}): Promise<void> {
  const existing = await prisma.rolePermission.findFirst({
    where: {
      permissionId: data.permissionId,
      platformRoleId: data.platformRoleId ?? null,
      organizationRoleId: data.organizationRoleId ?? null,
    },
  });
  if (existing) return;
  try {
    await prisma.rolePermission.create({ data });
  } catch (err) {
    if (!isUniqueViolation(err)) throw err;
  }
}

/**
 * Idempotent RBAC seed: permissions, platform roles, org role templates.
 */
export async function seedRbacCatalog(): Promise<void> {
  for (const p of PERMISSION_CATALOG) {
    await prisma.permission.upsert({
      where: { key: p.key },
      create: {
        key: p.key,
        description: p.description,
        group: p.group,
      },
      update: {
        description: p.description,
        group: p.group,
      },
    });
  }

  const permissions = await prisma.permission.findMany();
  const byKey = new Map(permissions.map((p) => [p.key, p.id]));

  for (const role of PLATFORM_ROLES) {
    const platformRole = await prisma.platformRole.upsert({
      where: { key: role.key },
      create: {
        key: role.key,
        name: role.name,
        description: role.description,
      },
      update: {
        name: role.name,
        description: role.description,
      },
    });

    const desired = resolvePlatformRolePermissions(role);
    for (const key of desired) {
      const permissionId = byKey.get(key);
      if (!permissionId) continue;
      await ensureRolePermission({
        platformRoleId: platformRole.id,
        permissionId,
      });
    }
  }

  for (const tmpl of ORG_ROLE_TEMPLATES) {
    const template = await prisma.orgRoleTemplate.upsert({
      where: { key: tmpl.key },
      create: {
        key: tmpl.key,
        name: tmpl.name,
        description: tmpl.description,
      },
      update: {
        name: tmpl.name,
        description: tmpl.description,
      },
    });

    const desired = resolveOrgTemplatePermissions(tmpl);
    for (const key of desired) {
      const permissionId = byKey.get(key);
      if (!permissionId) continue;
      try {
        await prisma.orgRoleTemplatePermission.upsert({
          where: {
            templateId_permissionId: {
              templateId: template.id,
              permissionId,
            },
          },
          create: {
            templateId: template.id,
            permissionId,
          },
          update: {},
        });
      } catch (err) {
        if (!isUniqueViolation(err)) throw err;
      }
    }
  }

  logger.info(
    {
      permissions: PERMISSION_CATALOG.length,
      platformRoles: PLATFORM_ROLES.length,
      orgTemplates: ORG_ROLE_TEMPLATES.length,
    },
    "RBAC catalog seeded"
  );
}

/**
 * Copy org role templates onto an organization (idempotent by role key).
 */
export async function seedOrganizationRoles(
  organizationId: string
): Promise<void> {
  const templates = await prisma.orgRoleTemplate.findMany({
    include: { permissions: { include: { permission: true } } },
  });

  for (const tmpl of templates) {
    const role = await prisma.organizationRole.upsert({
      where: {
        organizationId_key: {
          organizationId,
          key: tmpl.key,
        },
      },
      create: {
        organizationId,
        key: tmpl.key,
        name: tmpl.name,
        description: tmpl.description,
        isSystem: true,
      },
      update: {
        name: tmpl.name,
        description: tmpl.description,
        isSystem: true,
      },
    });

    for (const link of tmpl.permissions) {
      await ensureRolePermission({
        organizationRoleId: role.id,
        permissionId: link.permissionId,
      });
    }
  }
}
