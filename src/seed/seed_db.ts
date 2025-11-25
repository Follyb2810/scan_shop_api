import bcrypt from "bcrypt";
import { prisma } from "../config/prisma-client";

async function main() {
  const userRole = await prisma.role.upsert({
    where: { name: "USER" },
    update: {},
    create: { name: "USER" },
  });
  const moderator = await prisma.role.upsert({
    where: { name: "MODERATOR" },
    update: {},
    create: { name: "MODERATOR" },
  });

  const manufacturerRole = await prisma.role.upsert({
    where: { name: "MANUFACTURER" },
    update: {},
    create: { name: "MANUFACTURER" },
  });

  const adminRole = await prisma.role.upsert({
    where: { name: "ADMIN" },
    update: {},
    create: { name: "ADMIN" },
  });

  const password1 = await bcrypt.hash("user123", 10);
  const password2 = await bcrypt.hash("user456", 10);

  const user1 = await prisma.user.create({
    data: {
      email: "follyb@dev.com",
      password: password1,
      firstName: "follyb",
      lastName: "babs",
      phoneNumber: "+1234567890",
      userRoles: {
        create: [{ roleId: userRole.id }, { roleId: manufacturerRole.id }],
      },
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: "follb@dev.com",
      password: password2,
      firstName: "folly",
      lastName: "babs",
      phoneNumber: "+0987654321",
      userRoles: {
        create: [{ roleId: userRole.id }],
      },
    },
  });

  const superAdminPassword = await bcrypt.hash("superadmin123", 10);

  const superAdmin = await prisma.user.create({
    data: {
      email: "superadmin@dev.com",
      password: superAdminPassword,
      firstName: "Super",
      lastName: "Admin",
      phoneNumber: "+1111111111",

      userRoles: {
        create: [
          { roleId: userRole.id },
          { roleId: manufacturerRole.id },
          { roleId: adminRole.id },
          { roleId: moderator.id },
        ],
      },
    },
  });

  const manufacturer = await prisma.manufacturer.create({
    data: {
      userId: user1.id,
      companyName: "follyb",
      companyEmail: "contact@follyb.com",
      companyPhone: "+111222333",
      website: "https://follyb.com",
      address: "123 Main Street",
      city: "Metropolis",
      state: "NY",
      country: "USA",
      licenseNumber: "LIC123456",
      verificationStatus: "PENDING",
    },
  });

  const product = await prisma.product.create({
    data: {
      manufacturerId: manufacturer.id,
      name: "follyb Super Widget",
      description: "High quality widget for testing",
      category: "Electronics",
      sku: "FOLLYB-001",
      batchNumber: "BATCH-001",
      manufactureDate: new Date("2025-11-01"),
      expiryDate: new Date("2026-11-01"),
    },
  });

  const productUnit = await prisma.productUnit.create({
    data: {
      productId: product.id,
      manufacturerId: manufacturer.id,
      barcode: "BARCODE-001",
      unitNumber: 1,
      status: "ACTIVE",
      isAuthentic: true,
    },
  });

  console.log("Seeded data:", {
    user1,
    user2,
    superAdmin,
    manufacturer,
    product,
    productUnit,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
