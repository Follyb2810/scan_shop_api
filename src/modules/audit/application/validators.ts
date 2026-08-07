import { z } from "zod";

export const listAuditQuerySchema = z.object({
  organizationId: z.string().uuid().optional(),
  actorUserId: z.string().uuid().optional(),
  action: z.string().max(120).optional(),
  entityType: z.string().max(64).optional(),
  entityId: z.string().max(64).optional(),
  from: z.coerce.date().optional(),
  to: z.coerce.date().optional(),
  take: z.coerce.number().int().positive().max(200).optional(),
  skip: z.coerce.number().int().nonnegative().optional(),
});
