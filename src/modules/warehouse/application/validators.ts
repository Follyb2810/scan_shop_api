import { z } from "zod";

export const createWarehouseSchema = z.object({
  branchId: z.string().uuid(),
  typeKey: z.string().min(2).max(64),
  name: z.string().min(2).max(200),
  code: z
    .string()
    .min(1)
    .max(32)
    .regex(/^[A-Za-z0-9_-]+$/),
  status: z.enum(["active", "inactive", "maintenance"]).optional(),
  capacityUnits: z.number().int().positive().max(1_000_000_000).optional(),
  notes: z.string().max(2000).optional(),
});

export const updateWarehouseSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  typeKey: z.string().min(2).max(64).optional(),
  status: z.enum(["active", "inactive", "maintenance"]).optional(),
  capacityUnits: z.number().int().positive().max(1_000_000_000).nullable().optional(),
  notes: z.string().max(2000).nullable().optional(),
});

export const listWarehousesQuerySchema = z.object({
  branchId: z.string().uuid().optional(),
  status: z.enum(["active", "inactive", "maintenance"]).optional(),
});
