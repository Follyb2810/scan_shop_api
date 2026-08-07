import { z } from "zod";

export const createIntentSchema = z.object({
  orderId: z.string().uuid(),
  provider: z.string().min(2).max(32).optional(),
});

export const stubWebhookSchema = z.object({
  externalId: z.string().min(2),
  status: z.enum(["succeeded", "failed"]).optional(),
  failureReason: z.string().max(500).optional(),
});
