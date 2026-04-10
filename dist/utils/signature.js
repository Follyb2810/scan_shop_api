"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSignature = generateSignature;
exports.verifySignature = verifySignature;
const crypto_1 = __importDefault(require("crypto"));
const secret = process.env.PRODUCT_SIGNING_SECRET;
function generateSignature(payload) {
    return crypto_1.default.createHmac("sha256", secret).update(payload).digest("hex");
}
function verifySignature(payload, signature) {
    const hash = crypto_1.default
        .createHmac("sha256", secret)
        .update(payload)
        .digest("hex");
    return crypto_1.default.timingSafeEqual(Buffer.from(hash), Buffer.from(signature));
}
// import { generateSignature } from "../utils/signature";
// import { v4 as uuidv4 } from "uuid";
// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();
// export async function generateProductUnits(productId: string, manufacturerId: string, quantity: number) {
//   const lastUnit = await prisma.productUnit.findFirst({
//     where: { productId },
//     orderBy: { unitNumber: "desc" },
//   });
//   const startNumber = lastUnit ? lastUnit.unitNumber + 1 : 1;
//   const units = [];
//   for (let i = 0; i < quantity; i++) {
//     const unitUUID = uuidv4();
//     const unitNumber = startNumber + i;
//     const timestamp = Date.now();
//     const rawPayload = `MSC.v1|${unitUUID}|${timestamp}|${manufacturerId}|${productId}|${unitNumber}`;
//     const signature = generateSignature(rawPayload);
//     const securePayload = `${rawPayload}|${signature}`;
//     const productUnit = await prisma.productUnit.create({
//       data: {
//         productId,
//         unitNumber,
//         barcode: securePayload,
//       },
//     });
//     units.push(productUnit);
//   }
//   return units;
// }
//# sourceMappingURL=signature.js.map