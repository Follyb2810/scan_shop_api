import "dotenv/config";
declare const prismaClientSingleton: () => import("../generated/prisma/internal/class").PrismaClient<never, import("../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined, import("@prisma/client/runtime/client").DefaultArgs>;
declare global {
    var prismaGlobal: ReturnType<typeof prismaClientSingleton> | undefined;
}
declare const prisma: import("../generated/prisma/internal/class").PrismaClient<never, import("../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined, import("@prisma/client/runtime/client").DefaultArgs>;
export { prisma };
//# sourceMappingURL=prisma-client.d.ts.map