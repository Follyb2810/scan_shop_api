import { Request, Response } from "express";
import { ProductUnitService } from "./productunit.service";
import { AuthRequest } from "../../middlware/auth.middleware";

export class ProductUnitController {
  private readonly service = new ProductUnitService();

  create = async (req: AuthRequest, res: Response) => {
    try {
      const unit = await this.service.create(req.userId!, req.body);
      res.status(201).json(unit);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  };

  scan = async (req: AuthRequest, res: Response) => {
    try {
      const result = await this.service.scan(req.params.id, {
        ...req.body,
        ip: req.ip,
        userAgent: req.headers["user-agent"],
        userId: req.userId!,
      });
      res.json(result);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  };
}
