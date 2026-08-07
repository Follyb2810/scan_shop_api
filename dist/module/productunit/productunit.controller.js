"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductUnitController = void 0;
const productunit_service_1 = require("./productunit.service");
exports.ProductUnitController = {
    create: async (req, res) => {
        try {
            const unit = await productunit_service_1.productUnitService.create(req.userId, req.body);
            res.status(201).json(unit);
        }
        catch (e) {
            res.status(400).json({ error: e.message });
        }
    },
    getById: async (req, res) => {
        try {
            const unit = await productunit_service_1.productUnitService.getById(req.params.id);
            if (!unit)
                return res.status(404).json({ error: "Unit not found" });
            res.json(unit);
        }
        catch (e) {
            res.status(400).json({ error: e.message });
        }
    },
    getByProduct: async (req, res) => {
        try {
            const units = await productunit_service_1.productUnitService.getByProduct(req.params.productId);
            res.json(units);
        }
        catch (e) {
            res.status(400).json({ error: e.message });
        }
    },
    update: async (req, res) => {
        try {
            const updatedUnit = await productunit_service_1.productUnitService.update(req.params.id, req.body);
            res.json(updatedUnit);
        }
        catch (e) {
            res.status(400).json({ error: e.message });
        }
    },
    delete: async (req, res) => {
        try {
            const deletedUnit = await productunit_service_1.productUnitService.delete(req.params.id, req.userId);
            res.json(deletedUnit);
        }
        catch (e) {
            res.status(400).json({ error: e.message });
        }
    },
    scan: async (req, res) => {
        try {
            const result = await productunit_service_1.productUnitService.scan(req.params.id, {
                ...req.body,
                userId: req.userId,
                ipAddress: req.ip,
                userAgent: req.headers["user-agent"],
            });
            res.json(result);
        }
        catch (e) {
            res.status(400).json({ error: e.message });
        }
    },
    markAsSold: async (req, res) => {
        try {
            const updatedUnit = await productunit_service_1.productUnitService.markAsSold(req.params.id, {
                ...req.body,
                soldBy: req.userId,
            });
            res.json(updatedUnit);
        }
        catch (e) {
            res.status(400).json({ error: e.message });
        }
    },
    reportSuspicious: async (req, res) => {
        try {
            const updatedUnit = await productunit_service_1.productUnitService.reportSuspicious(req.params.id, {
                ...req.body,
                reportedBy: req.userId,
            });
            res.json(updatedUnit);
        }
        catch (e) {
            res.status(400).json({ error: e.message });
        }
    },
};
//# sourceMappingURL=productunit.controller.js.map