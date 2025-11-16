import bwipjs from "bwip-js";

async function generateBarcode(barcodeValue: string) {
  // Generate PNG buffer
  const pngBuffer = await bwipjs.toBuffer({
    bcid: "code128", // Barcode type
    text: barcodeValue, // Text to encode
    scale: 3, // 3x scaling
    height: 10, // Barcode height in mm
    includetext: true, // Show human-readable text
    textxalign: "center",
  });

  // Convert buffer to base64 data URL (optional, for frontend)
  const barcodeDataUrl = `data:image/png;base64,${pngBuffer.toString(
    "base64"
  )}`;

  return { pngBuffer, barcodeDataUrl };
}

// router.get("/product-unit/:id/barcode", async (req: Request, res: Response) => {
//   const { id } = req.params;

//   const productUnit = await prisma.productUnit.findUnique({
//     where: { id }
//   });

//   if (!productUnit) return res.status(404).json({ message: "Unit not found" });

//   const { barcodeDataUrl } = await generateBarcode(productUnit.barcode);

//   res.json({ barcode: barcodeDataUrl });
// });
