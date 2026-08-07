import { z } from "zod";

export const startWorkflowSchema = z.object({
  definitionKey: z.string().min(3).max(100),
  subjectType: z.string().min(2).max(64),
  subjectId: z.string().uuid(),
  organizationId: z.string().uuid().optional().nullable(),
});

export const workflowActionSchema = z.object({
  decision: z.enum(["approve", "reject", "cancel"]),
  comment: z.string().max(2000).optional(),
});

export const listInstancesQuerySchema = z.object({
  status: z.enum(["pending", "approved", "rejected", "cancelled"]).optional(),
  subjectType: z.string().min(2).max(64).optional(),
  subjectId: z.string().uuid().optional(),
  organizationId: z.string().uuid().optional(),
  definitionKey: z.string().min(3).max(100).optional(),
});
