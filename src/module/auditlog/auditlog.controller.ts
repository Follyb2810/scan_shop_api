import { Request, Response } from "express";
import { AuditLogService } from "./auditlog.service";

export class AuditLogController {
  private readonly service = new AuditLogService();

  // Create new audit log
  create = async (req: Request, res: Response) => {
    try {
      const log = await this.service.log(req.body);
      res.status(201).json({ message: "Audit log created", log });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  // Get logs for a product unit
  getByProductUnit = async (req: Request, res: Response) => {
    const { productUnitId } = req.params;
    const logs = await this.service.getByProductUnit(productUnitId);
    res.json(logs);
  };

  // Get logs for a user
  getByUser = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const logs = await this.service.getByUser(userId);
    res.json(logs);
  };

  // Get all logs
  getAll = async (_req: Request, res: Response) => {
    const logs = await this.service.getAll();
    res.json(logs);
  };

  // Delete log
  delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.service.delete(id);
    res.json({ message: "Audit log deleted", result });
  };
}
