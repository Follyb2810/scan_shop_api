import QRCode from "qrcode";

export async function generateQRCode(barcodeValue: string) {
  // Generate Data URL
  const qrDataUrl = await QRCode.toDataURL(barcodeValue);
  // generate PNG for printing
  const qrBuffer = await QRCode.toBuffer(barcodeValue);
  return { qrDataUrl, qrBuffer };
}

// import express, { Request, Response } from "express";
// import QRCode from "qrcode";

// const router = express.Router();

// router.get("/product-unit/:id/qr", async (req: Request, res: Response) => {
//   const { id } = req.params;

//   // 1. Fetch the ProductUnit barcode from DB
//   const productUnit = await prisma.productUnit.findUnique({
//     where: { id }
//   });

//   if (!productUnit) return res.status(404).json({ message: "Unit not found" });

//   // 2. Generate QR code
//   const qrDataUrl = await QRCode.toDataURL(productUnit.barcode);

//   // 3. Send QR as data URL
//   res.json({ qr: qrDataUrl });
// });

// export default router;
