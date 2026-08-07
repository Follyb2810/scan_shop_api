import { z } from "zod";

export const createListingSchema = z.object({
  packageDefinitionId: z.string().uuid(),
  categoryKey: z.string().min(2).max(64).optional(),
  title: z.string().min(2).max(200),
  description: z.string().max(5000).optional(),
  price: z.number().positive().max(1_000_000_000),
  currency: z.string().length(3).default("NGN"),
  stockHint: z.number().int().nonnegative().optional(),
});

export const listListingsQuerySchema = z.object({
  q: z.string().max(200).optional(),
  categoryKey: z.string().max(64).optional(),
  organizationId: z.string().uuid().optional(),
  status: z
    .enum(["draft", "pending_approval", "published", "rejected", "archived"])
    .optional(),
  take: z.coerce.number().int().positive().max(100).optional(),
});

export const searchQuerySchema = z.object({
  q: z.string().min(1).max(200),
  take: z.coerce.number().int().positive().max(100).optional(),
});

export const upsertCartItemSchema = z.object({
  listingId: z.string().uuid(),
  quantity: z.number().int().positive().max(1000),
});

export const createOrderSchema = z.object({
  addressId: z.string().uuid().optional(),
  shippingAddress: z
    .object({
      line1: z.string().min(2).max(200),
      line2: z.string().max(200).optional(),
      city: z.string().min(1).max(100),
      state: z.string().max(100).optional(),
      country: z.string().min(2).max(100),
      postalCode: z.string().max(32).optional(),
    })
    .optional(),
  couponCode: z.string().min(2).max(64).optional(),
  notes: z.string().max(2000).optional(),
});

export const fulfillOrderSchema = z.object({
  status: z.enum(["confirmed", "processing", "shipped", "delivered"]),
  trackingCode: z.string().min(2).max(64).optional(),
  trackingStatus: z.string().max(120).optional(),
});

export const createReviewSchema = z.object({
  listingId: z.string().uuid(),
  rating: z.number().int().min(1).max(5),
  comment: z.string().max(2000).optional(),
});

export const validateCouponSchema = z.object({
  code: z.string().min(2).max(64),
  orderTotal: z.coerce.number().nonnegative().optional(),
});
