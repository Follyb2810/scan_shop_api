"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManufacturerController = void 0;
const manufacturer_service_1 = require("./manufacturer.service");
exports.ManufacturerController = {
    apply: async (req, res) => {
        try {
            const userId = req.userId;
            const data = req.body;
            const manufacturer = await manufacturer_service_1.manufacturerService.apply(userId, data);
            res.status(201).json({ message: "Application submitted", manufacturer });
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    // GET /admin/manufacturer/pending
    getPending: async (req, res) => {
        const list = await manufacturer_service_1.manufacturerService.getPending();
        res.json(list);
    },
    // PATCH /admin/manufacturer/:id/approve
    approve: async (req, res) => {
        const adminId = req.userId;
        const { id } = req.params;
        const result = await manufacturer_service_1.manufacturerService.approve(id, adminId);
        res.json({ message: "Manufacturer approved", result });
    },
    // PATCH /admin/manufacturer/:id/reject
    reject: async (req, res) => {
        const adminId = req.userId;
        const { id } = req.params;
        const { notes } = req.body;
        const result = await manufacturer_service_1.manufacturerService.reject(id, adminId, notes);
        res.json({ message: "Manufacturer rejected", result });
    },
};
//# sourceMappingURL=manufacturer.controller.js.map