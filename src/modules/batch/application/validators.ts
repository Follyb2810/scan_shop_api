import { z } from "zod";

const dateInput = z.union([z.string().datetime(), z.coerce.date()]).transform((v) =>
  v instanceof Date ? v : new Date(v)
);

export const createBatchSchema = z.object({
  packageDefinitionId: z.string().uuid(),
  batchNumber: z
    .string()
    .min(2)
    .max(64)
    .regex(/^[A-Za-z0-9_-]+$/),
  lotNumber: z.string().max(64).optional(),
  manufactureDate: dateInput,
  expiryDate: dateInput,
  productionQuantity: z.number().int().positive().max(100_000_000),
  currentQuantity: z.number().int().nonnegative().max(100_000_000).optional(),
  nafdacRegistration: z.string().max(100).optional(),
  notes: z.string().max(2000).optional(),
  certificates: z.record(z.string(), z.unknown()).optional(),
  documents: z.record(z.string(), z.unknown()).optional(),
});

export const updateBatchSchema = z.object({
  lotNumber: z.string().max(64).nullable().optional(),
  notes: z.string().max(2000).nullable().optional(),
  nafdacRegistration: z.string().max(100).nullable().optional(),
  certificates: z.record(z.string(), z.unknown()).nullable().optional(),
  documents: z.record(z.string(), z.unknown()).nullable().optional(),
});

export const qaTransitionSchema = z.object({
  status: z.enum(["pending", "in_review", "passed", "failed"]),
  comment: z.string().max(2000).optional(),
  /** When true and status=in_review, start batch.qa.approval workflow */
  useWorkflow: z.boolean().optional(),
});

export const recallSchema = z.object({
  action: z.enum(["request", "clear"]),
  comment: z.string().max(2000).optional(),
});

export const listBatchesQuerySchema = z.object({
  qaStatus: z.enum(["pending", "in_review", "passed", "failed"]).optional(),
  recallStatus: z.enum(["none", "pending", "recalled"]).optional(),
});
