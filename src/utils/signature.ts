import crypto from "crypto";

const secret = process.env.PRODUCT_SIGNING_SECRET!;

export function generateSignature(payload: string): string {
  return crypto.createHmac("sha256", secret).update(payload).digest("hex");
}

export function verifySignature(payload: string, signature: string): boolean {
  const hash = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("hex");
  return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(signature));
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
