import { z } from "zod";
import { STOCK_STATES } from "../domain/states";

const stockStateSchema = z.enum(STOCK_STATES);

export const listInventoryQuerySchema = z.object({
  warehouseId: z.string().uuid().optional(),
  branchId: z.string().uuid().optional(),
  batchId: z.string().uuid().optional(),
});

export const receiveStockSchema = z.object({
  warehouseId: z.string().uuid(),
  batchId: z.string().uuid(),
  packagingLevel: z.string().min(2).max(64),
  quantity: z.number().int().positive().max(100_000_000),
  reason: z.string().max(500).optional(),
});

export const reserveStockSchema = z.object({
  warehouseId: z.string().uuid(),
  batchId: z.string().uuid(),
  packagingLevel: z.string().min(2).max(64),
  quantity: z.number().int().positive().max(100_000_000),
  reason: z.string().max(500).optional(),
  referenceType: z.string().max(64).optional(),
  referenceId: z.string().max(64).optional(),
});

export const releaseStockSchema = reserveStockSchema;

export const adjustStockSchema = z.object({
  warehouseId: z.string().uuid(),
  batchId: z.string().uuid(),
  packagingLevel: z.string().min(2).max(64),
  fromState: stockStateSchema,
  toState: stockStateSchema,
  quantity: z.number().int().positive().max(100_000_000),
  reason: z.string().max(500).optional(),
});

export const transferStockSchema = z.object({
  fromWarehouseId: z.string().uuid(),
  toWarehouseId: z.string().uuid(),
  batchId: z.string().uuid(),
  packagingLevel: z.string().min(2).max(64),
  quantity: z.number().int().positive().max(100_000_000),
  reason: z.string().max(500).optional(),
});

export const listMovementsQuerySchema = z.object({
  positionId: z.string().uuid().optional(),
  take: z.coerce.number().int().positive().max(500).optional(),
});
