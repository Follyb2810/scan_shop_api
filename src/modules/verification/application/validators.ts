import { z } from "zod";

export const generateUnitsSchema = z.object({
  batchId: z.string().uuid(),
  packagingLevel: z.string().min(2).max(64).default("RETAIL_UNIT"),
  quantity: z.number().int().positive().max(500),
});

export const scanSchema = z.object({
  payload: z.string().min(10).max(4000),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  city: z.string().max(100).optional(),
  country: z.string().max(100).optional(),
});

export const verifySchema = z.object({
  payload: z.string().min(10).max(4000),
});

export const listUnitsQuerySchema = z.object({
  batchId: z.string().uuid().optional(),
  take: z.coerce.number().int().positive().max(500).optional(),
});
