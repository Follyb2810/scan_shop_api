import { Request, Response } from "express";
import { productUnitService } from "./productunit.service";
import { AuthRequest } from "../../middlware/auth.middleware";

export const ProductUnitController = {
  create: async (req: AuthRequest, res: Response) => {
    try {
      const unit = await productUnitService.create(req.userId!, req.body);
      res.status(201).json(unit);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  },

  getById: async (req: AuthRequest, res: Response) => {
    try {
      const unit = await productUnitService.getById(req.params.id);
      if (!unit) return res.status(404).json({ error: "Unit not found" });
      res.json(unit);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  },

  getByProduct: async (req: AuthRequest, res: Response) => {
    try {
      const units = await productUnitService.getByProduct(req.params.productId);
      res.json(units);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  },

  update: async (req: AuthRequest, res: Response) => {
    try {
      const updatedUnit = await productUnitService.update(
        req.params.id,
        req.body
      );
      res.json(updatedUnit);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  },

  delete: async (req: AuthRequest, res: Response) => {
    try {
      const deletedUnit = await productUnitService.delete(
        req.params.id,
        req.userId
      );
      res.json(deletedUnit);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  },

  scan: async (req: AuthRequest, res: Response) => {
    try {
      const result = await productUnitService.scan(req.params.id, {
        ...req.body,
        userId: req.userId!,
        ipAddress: req.ip,
        userAgent: req.headers["user-agent"] as string,
      });
      res.json(result);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  },

  markAsSold: async (req: AuthRequest, res: Response) => {
    try {
      const updatedUnit = await productUnitService.markAsSold(req.params.id, {
        ...req.body,
        soldBy: req.userId,
      });
      res.json(updatedUnit);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  },

  reportSuspicious: async (req: AuthRequest, res: Response) => {
    try {
      const updatedUnit = await productUnitService.reportSuspicious(
        req.params.id,
        {
          ...req.body,
          reportedBy: req.userId,
        }
      );
      res.json(updatedUnit);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  },
};
