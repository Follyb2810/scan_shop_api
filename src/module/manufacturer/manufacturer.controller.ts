import { Request, Response } from "express";
import { manufacturerService } from "./manufacturer.service";
import { AuthRequest } from "../../middlware/auth.middleware";

export const ManufacturerController = {
  // POST /manufacturer/apply
  apply: async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.userId!; 
      const data = req.body;

      const manufacturer = await manufacturerService.apply(userId, data);
      res.status(201).json({ message: "Application submitted", manufacturer });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  // GET /admin/manufacturer/pending
  getPending: async (req: AuthRequest, res: Response) => {
    const list = await manufacturerService.getPending();
    res.json(list);
  },

  // PATCH /admin/manufacturer/:id/approve
  approve: async (req: AuthRequest, res: Response) => {
    const adminId = req.userId!;
    const { id } = req.params;

    const result = await manufacturerService.approve(id, adminId);
    res.json({ message: "Manufacturer approved", result });
  },

  // PATCH /admin/manufacturer/:id/reject
  reject: async (req: AuthRequest, res: Response) => {
    const adminId = req.userId!;
    const { id } = req.params;
    const { notes } = req.body;

    const result = await manufacturerService.reject(id, adminId, notes);
    res.json({ message: "Manufacturer rejected", result });
  },
};
