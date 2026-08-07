import { z } from "zod";

export const createOrganizationSchema = z.object({
  name: z.string().min(2).max(200),
  slug: z
    .string()
    .min(2)
    .max(80)
    .regex(/^[a-z0-9-]+$/),
  typeKey: z.string().min(2),
  profile: z
    .object({
      companyEmail: z.string().email().optional(),
      companyPhone: z.string().optional(),
      website: z.string().optional(),
      address: z.string().optional(),
      city: z.string().optional(),
      state: z.string().optional(),
      country: z.string().optional(),
      postalCode: z.string().optional(),
      licenseNumber: z.string().optional(),
      registrationNumber: z.string().optional(),
      taxId: z.string().optional(),
      nafdacNumber: z.string().optional(),
      sonCertification: z.string().optional(),
    })
    .optional(),
  defaultBranch: z
    .object({
      name: z.string().min(1).default("Headquarters"),
      code: z.string().min(1).default("HQ"),
      city: z.string().optional(),
      country: z.string().optional(),
    })
    .optional(),
});

export const updateOrganizationSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  profile: createOrganizationSchema.shape.profile,
});

export const createBranchSchema = z.object({
  name: z.string().min(1).max(200),
  code: z
    .string()
    .min(1)
    .max(40)
    .regex(/^[A-Z0-9_-]+$/i),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
});

export const updateBranchSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  status: z.enum(["active", "inactive"]).optional(),
});

export const inviteMemberSchema = z.object({
  email: z.string().email(),
  roleKey: z.string().min(2).default("USER"),
});

export const updateMemberSchema = z.object({
  status: z.enum(["active", "suspended", "invited"]).optional(),
  roleKey: z.string().min(2).optional(),
});
