export const STOCK_STATES = [
  "available",
  "reserved",
  "damaged",
  "expired",
  "quarantined",
  "returned",
  "inTransit",
  "sold",
  "destroyed",
] as const;

export type StockState = (typeof STOCK_STATES)[number];

export const MOVEMENT_TYPES = [
  "receive",
  "reserve",
  "release",
  "adjust",
  "transfer_out",
  "transfer_in",
] as const;

export type MovementType = (typeof MOVEMENT_TYPES)[number];

export function isStockState(value: string): value is StockState {
  return (STOCK_STATES as readonly string[]).includes(value);
}

/** Sum of all state buckets on a position. */
export function positionTotal(p: Record<StockState, number>): number {
  return STOCK_STATES.reduce((sum, key) => sum + (p[key] ?? 0), 0);
}
