import { z } from "zod";

export const assignPlatformRoleSchema = z.object({
  roleKey: z.string().min(2),
});

export const createOrgRoleSchema = z.object({
  name: z.string().min(2).max(100),
  key: z
    .string()
    .min(2)
    .max(64)
    .regex(/^[A-Z0-9_]+$/)
    .optional(),
  description: z.string().max(500).optional(),
  permissionKeys: z.array(z.string().min(3)).min(1),
});

export const updateOrgRolePermissionsSchema = z.object({
  permissionKeys: z.array(z.string().min(3)).min(1),
});

export const assignOrgRoleSchema = z.object({
  roleKey: z.string().min(2),
});

export const bootstrapOrgSchema = z.object({
  name: z.string().min(2).max(200),
  slug: z
    .string()
    .min(2)
    .max(80)
    .regex(/^[a-z0-9-]+$/),
});
