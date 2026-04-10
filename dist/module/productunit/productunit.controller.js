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
exports.ProductUnitController = void 0;
const productunit_service_1 = require("./productunit.service");
exports.ProductUnitController = {
    create: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const unit = yield productunit_service_1.productUnitService.create(req.userId, req.body);
            res.status(201).json(unit);
        }
        catch (e) {
            res.status(400).json({ error: e.message });
        }
    }),
    getById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const unit = yield productunit_service_1.productUnitService.getById(req.params.id);
            if (!unit)
                return res.status(404).json({ error: "Unit not found" });
            res.json(unit);
        }
        catch (e) {
            res.status(400).json({ error: e.message });
        }
    }),
    getByProduct: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const units = yield productunit_service_1.productUnitService.getByProduct(req.params.productId);
            res.json(units);
        }
        catch (e) {
            res.status(400).json({ error: e.message });
        }
    }),
    update: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const updatedUnit = yield productunit_service_1.productUnitService.update(req.params.id, req.body);
            res.json(updatedUnit);
        }
        catch (e) {
            res.status(400).json({ error: e.message });
        }
    }),
    delete: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const deletedUnit = yield productunit_service_1.productUnitService.delete(req.params.id, req.userId);
            res.json(deletedUnit);
        }
        catch (e) {
            res.status(400).json({ error: e.message });
        }
    }),
    scan: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield productunit_service_1.productUnitService.scan(req.params.id, Object.assign(Object.assign({}, req.body), { userId: req.userId, ipAddress: req.ip, userAgent: req.headers["user-agent"] }));
            res.json(result);
        }
        catch (e) {
            res.status(400).json({ error: e.message });
        }
    }),
    markAsSold: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const updatedUnit = yield productunit_service_1.productUnitService.markAsSold(req.params.id, Object.assign(Object.assign({}, req.body), { soldBy: req.userId }));
            res.json(updatedUnit);
        }
        catch (e) {
            res.status(400).json({ error: e.message });
        }
    }),
    reportSuspicious: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const updatedUnit = yield productunit_service_1.productUnitService.reportSuspicious(req.params.id, Object.assign(Object.assign({}, req.body), { reportedBy: req.userId }));
            res.json(updatedUnit);
        }
        catch (e) {
            res.status(400).json({ error: e.message });
        }
    }),
};
//# sourceMappingURL=productunit.controller.js.map