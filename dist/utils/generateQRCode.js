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
exports.generateQRCode = generateQRCode;
const qrcode_1 = __importDefault(require("qrcode"));
function generateQRCode(barcodeValue) {
    return __awaiter(this, void 0, void 0, function* () {
        // Generate Data URL
        const qrDataUrl = yield qrcode_1.default.toDataURL(barcodeValue);
        // generate PNG for printing
        const qrBuffer = yield qrcode_1.default.toBuffer(barcodeValue);
        return { qrDataUrl, qrBuffer };
    });
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
//# sourceMappingURL=generateQRCode.js.map