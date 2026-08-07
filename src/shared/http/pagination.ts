import { z } from "zod";

export const paginationQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  cursor: z.string().optional(),
});

export type PaginationQuery = z.infer<typeof paginationQuerySchema>;

export type OffsetPageMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
};

export type CursorPageMeta = {
  limit: number;
  nextCursor: string | null;
  hasNext: boolean;
};

export function parsePagination(input: unknown): PaginationQuery {
  return paginationQuerySchema.parse(input);
}

export function getOffset(page: number, limit: number): number {
  return (page - 1) * limit;
}

export function buildOffsetMeta(
  page: number,
  limit: number,
  total: number
): OffsetPageMeta {
  const totalPages = total === 0 ? 0 : Math.ceil(total / limit);
  return {
    page,
    limit,
    total,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1 && totalPages > 0,
  };
}

export function buildCursorMeta(
  limit: number,
  nextCursor: string | null
): CursorPageMeta {
  return {
    limit,
    nextCursor,
    hasNext: Boolean(nextCursor),
  };
}
