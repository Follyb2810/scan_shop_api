import { Request, Response } from "express";
import { auditLogService, AuditLogService } from "./auditlog.service";

export const AuditLogController = {
  create: async (req: Request, res: Response) => {
    try {
      const log = await auditLogService.log(req.body);
      res.status(201).json({ message: "Audit log created", log });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  getByProductUnit: async (req: Request, res: Response) => {
    const { productUnitId } = req.params;
    const logs = await auditLogService.getByProductUnit(productUnitId);
    res.json(logs);
  },

  getByUser: async (req: Request, res: Response) => {
    const { userId } = req.params;
    const logs = await auditLogService.getByUser(userId);
    res.json(logs);
  },

  getAll: async (_req: Request, res: Response) => {
    const logs = await auditLogService.getAll();
    res.json(logs);
  },

  delete: async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await auditLogService.delete(id);
    res.json({ message: "Audit log deleted", result });
  },
};
