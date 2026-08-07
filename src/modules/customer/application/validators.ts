import { z } from "zod";

export const ensureProfileSchema = z.object({
  displayName: z.string().min(1).max(120).optional(),
  phone: z.string().min(5).max(32).optional(),
});

export const updateProfileSchema = z.object({
  displayName: z.string().min(1).max(120).optional(),
  phone: z.string().min(5).max(32).optional(),
});

export const createAddressSchema = z.object({
  label: z.string().max(64).optional(),
  line1: z.string().min(2).max(200),
  line2: z.string().max(200).optional(),
  city: z.string().min(1).max(100),
  state: z.string().max(100).optional(),
  country: z.string().min(2).max(100),
  postalCode: z.string().max(32).optional(),
  isDefault: z.boolean().optional(),
});

export const updateAddressSchema = createAddressSchema.partial();
