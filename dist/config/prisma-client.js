"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectPrisma = exports.prisma = void 0;
/** @deprecated Prefer `import { prisma } from "../infrastructure"` */
var prisma_client_1 = require("../infrastructure/database/prisma.client");
Object.defineProperty(exports, "prisma", { enumerable: true, get: function () { return prisma_client_1.prisma; } });
Object.defineProperty(exports, "disconnectPrisma", { enumerable: true, get: function () { return prisma_client_1.disconnectPrisma; } });
//# sourceMappingURL=prisma-client.js.map