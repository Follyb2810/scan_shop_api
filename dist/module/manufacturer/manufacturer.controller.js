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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManufacturerController = void 0;
const manufacturer_service_1 = require("./manufacturer.service");
exports.ManufacturerController = {
    apply: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userId = req.userId;
            const data = req.body;
            const manufacturer = yield manufacturer_service_1.manufacturerService.apply(userId, data);
            res.status(201).json({ message: "Application submitted", manufacturer });
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }),
    // GET /admin/manufacturer/pending
    getPending: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const list = yield manufacturer_service_1.manufacturerService.getPending();
        res.json(list);
    }),
    // PATCH /admin/manufacturer/:id/approve
    approve: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const adminId = req.userId;
        const { id } = req.params;
        const result = yield manufacturer_service_1.manufacturerService.approve(id, adminId);
        res.json({ message: "Manufacturer approved", result });
    }),
    // PATCH /admin/manufacturer/:id/reject
    reject: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const adminId = req.userId;
        const { id } = req.params;
        const { notes } = req.body;
        const result = yield manufacturer_service_1.manufacturerService.reject(id, adminId, notes);
        res.json({ message: "Manufacturer rejected", result });
    }),
};
//# sourceMappingURL=manufacturer.controller.js.map