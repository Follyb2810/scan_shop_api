/**
 * Idempotent demo users/orgs for local development.
 * Invoked from bootstrap when AUTO_SEED_DEMO is enabled (default in development).
 */
import { prisma } from "../infrastructure/database";
import { hashPwd } from "../utils/bcrypt";
import { rbacService } from "../modules/rbac/application/rbac.service";
import { organizationService } from "../modules/organization/application/organization.service";
import { logger } from "../config/logger";

const DEMOS = [
  {
    email: "demo.pfizer.owner@example.com",
    password: "Password123!",
    org: {
      name: "Demo Pfizer-like Mfr",
      slug: "demo-pfizer",
      typeKey: "MANUFACTURER",
    },
  },
  {
    email: "demo.pharmacy.a@example.com",
    password: "Password123!",
    org: {
      name: "Demo Pharmacy A",
      slug: "demo-pharmacy-a",
      typeKey: "PHARMACY",
    },
  },
  {
    email: "demo.distributor@example.com",
    password: "Password123!",
    org: {
      name: "Demo Distributor Hub",
      slug: "demo-distributor",
      typeKey: "DISTRIBUTOR",
    },
  },
] as const;

async function ensureUser(email: string, password: string) {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return existing;
  return prisma.user.create({
    data: {
      email,
      password: await hashPwd(password),
      firstName: "Demo",
      lastName: email.split("@")[0],
      isActive: true,
      status: "active",
      emailVerifiedAt: new Date(),
    },
  });
}

export async function seedDemoData(): Promise<void> {
  const adminEmail = "demo.platform.admin@example.com";
  const admin = await ensureUser(adminEmail, "Password123!");
  try {
    await rbacService.assignPlatformRole(admin.id, "SUPER_ADMIN");
  } catch {
    // already assigned
  }

  for (const demo of DEMOS) {
    const existingOrg = await prisma.organization.findUnique({
      where: { slug: demo.org.slug },
    });
    if (existingOrg) {
      continue;
    }

    const user = await ensureUser(demo.email, demo.password);
    const created = await organizationService.createOrganization(user.id, {
      name: demo.org.name,
      slug: demo.org.slug,
      typeKey: demo.org.typeKey,
    });

    await prisma.organization.update({
      where: { id: created.organization.id },
      data: { status: "active" },
    });

    logger.info(
      {
        email: demo.email,
        slug: demo.org.slug,
        orgId: created.organization.id,
      },
      "Demo org created (active)"
    );
  }

  logger.info(
    {
      platformAdmin: adminEmail,
      password: "Password123!",
      orgs: DEMOS.map((d) => d.org.slug),
    },
    "Demo seed complete"
  );
}
