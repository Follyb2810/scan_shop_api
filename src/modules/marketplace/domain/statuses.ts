export const LISTING_STATUSES = [
  "draft",
  "pending_approval",
  "published",
  "rejected",
  "archived",
] as const;

export type ListingStatus = (typeof LISTING_STATUSES)[number];

export const ORDER_STATUSES = [
  "pending",
  "paid",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];

export const LISTING_EVENTS = {
  CREATED: "marketplace.listing.created",
  PUBLISH_REQUESTED: "marketplace.listing.publish_requested",
  PUBLISHED: "marketplace.listing.published",
  REJECTED: "marketplace.listing.rejected",
} as const;

export const ORDER_EVENTS = {
  CREATED: "marketplace.order.created",
  PAID: "marketplace.order.paid",
  FULFILLED: "marketplace.order.fulfilled",
  CANCELLED: "marketplace.order.cancelled",
} as const;

/** Org types allowed to sell on the marketplace. */
export const SELLER_ORG_TYPES = [
  "PHARMACY",
  "WHOLESALER",
  "DISTRIBUTOR",
  "MANUFACTURER",
] as const;
