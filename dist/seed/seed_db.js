"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_client_1 = require("../config/prisma-client");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const userRole = yield prisma_client_1.prisma.role.upsert({
            where: { name: "USER" },
            update: {},
            create: { name: "USER" },
        });
        const moderator = yield prisma_client_1.prisma.role.upsert({
            where: { name: "MODERATOR" },
            update: {},
            create: { name: "MODERATOR" },
        });
        const manufacturerRole = yield prisma_client_1.prisma.role.upsert({
            where: { name: "MANUFACTURER" },
            update: {},
            create: { name: "MANUFACTURER" },
        });
        const adminRole = yield prisma_client_1.prisma.role.upsert({
            where: { name: "ADMIN" },
            update: {},
            create: { name: "ADMIN" },
        });
        const password1 = yield bcrypt_1.default.hash("user123", 10);
        const password2 = yield bcrypt_1.default.hash("user456", 10);
        const user1 = yield prisma_client_1.prisma.user.create({
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
        const user2 = yield prisma_client_1.prisma.user.create({
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
        const superAdminPassword = yield bcrypt_1.default.hash("superadmin123", 10);
        const superAdmin = yield prisma_client_1.prisma.user.create({
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
        const manufacturer = yield prisma_client_1.prisma.manufacturer.create({
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
        const product = yield prisma_client_1.prisma.product.create({
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
        const productUnit = yield prisma_client_1.prisma.productUnit.create({
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
    });
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_client_1.prisma.$disconnect();
}));
//# sourceMappingURL=seed_db.js.map