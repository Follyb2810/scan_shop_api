"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
require("dotenv/config");
const adapter_better_sqlite3_1 = require("@prisma/adapter-better-sqlite3");
const client_1 = require("../generated/prisma/client");
// import { PrismaClient } from "@prisma/client";
// import { PrismaClient } from "@prisma/client";
// import { PrismaClient } from "./../../generated/prisma/client";
// import { } from "@prisma/client";
// import { PrismaClient } from "../prisma/client";
// import { PrismaClient } from "../generated/prisma/client";
// import { PrismaClient } from "@prisma/client";
// import { PrismaPg } from "@prisma/adapter-pg";
// import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
// import { config } from "../config";
const prismaClientSingleton = () => {
    const connectionString = process.env.DATABASE_URL;
    // const adapter = new PrismaPg({ connectionString });
    const adapter = new adapter_better_sqlite3_1.PrismaBetterSqlite3({ url: connectionString });
    return new client_1.PrismaClient({ adapter });
};
const prisma = (_a = globalThis.prismaGlobal) !== null && _a !== void 0 ? _a : prismaClientSingleton();
exports.prisma = prisma;
if (process.env.NODE_ENV !== "production")
    globalThis.prismaGlobal = prisma;
// import "dotenv/config";
// import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
// import { PrismaClient } from "../generated/prisma/client";
// const connectionString = `${process.env.DATABASE_URL}`;
// const adapter = new PrismaBetterSqlite3({ url: connectionString });
// const prisma = new PrismaClient({ adapter });
// export { prisma };
// import { PrismaClient } from "@prisma/client";
// // import { PrismaClient } from "@prisma/client/extension";
// const globalForPrisma = global as unknown as { prisma: PrismaClient };
// export const prisma =
//   globalForPrisma.prisma ||
//   new PrismaClient({
//     log:
//       process.env.NODE_ENV === "development"
//         ? [] //"query", "info", "warn", "error"
//         : ["warn", "error"],
//     datasources: {
//       db: {
//         url:
//           process.env.DATABASE_URL +
//           "?connection_limit=10&pool_timeout=20&connect_timeout=10",
//       },
//     },
//   });
// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
// export default prisma;
//# sourceMappingURL=prisma-client.js.map