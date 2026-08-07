import { z } from "zod";

const lineSchema = z.object({
  batchId: z.string().uuid(),
  packagingLevel: z.string().min(2).max(64),
  quantity: z.number().int().positive().max(100_000_000),
});

export const createTransferSchema = z.object({
  toOrganizationId: z.string().uuid(),
  fromWarehouseId: z.string().uuid(),
  notes: z.string().max(2000).optional(),
  documents: z.record(z.string(), z.unknown()).optional(),
  lines: z.array(lineSchema).min(1).max(50),
});

export const submitTransferSchema = z.object({
  useWorkflow: z.boolean().optional(),
});

export const receiveTransferSchema = z.object({
  toWarehouseId: z.string().uuid(),
  notes: z.string().max(2000).optional(),
});

export const rejectTransferSchema = z.object({
  reason: z.string().min(2).max(2000),
});

export const listTransfersQuerySchema = z.object({
  status: z
    .enum([
      "draft",
      "submitted",
      "approved",
      "in_transit",
      "received",
      "rejected",
      "cancelled",
    ])
    .optional(),
  direction: z.enum(["sent", "received"]).optional(),
});
