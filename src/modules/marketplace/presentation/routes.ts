import { Router } from "express";
import {
  authenticate,
  requirePermission,
  requireTenant,
  validate,
} from "../../../middleware";
import { MarketplaceController } from "./marketplace.controller";
import {
  createListingSchema,
  createOrderSchema,
  createReviewSchema,
  fulfillOrderSchema,
  upsertCartItemSchema,
} from "../application/validators";
import { registerMarketplaceWorkflowHandlers } from "../infrastructure/workflow-hooks";

registerMarketplaceWorkflowHandlers();

/**
 * Public + customer marketplace surface.
 * Mounted at /api/v1/marketplace
 *
 * @openapi
 * tags:
 *   - name: Marketplace
 *     description: Listings, cart, orders, wishlist, reviews, coupons
 */

/**
 * @openapi
 * /api/v1/marketplace/listings:
 *   get:
 *     tags: [Marketplace]
 *     summary: Browse published listings
 *   post:
 *     tags: [Marketplace]
 *     summary: Create listing (seller)
 *     security: [{ bearerAuth: [] }]
 * /api/v1/marketplace/orders:
 *   post:
 *     tags: [Marketplace]
 *     summary: Checkout cart
 *     security: [{ bearerAuth: [] }]
 *   get:
 *     tags: [Marketplace]
 *     summary: List my orders
 *     security: [{ bearerAuth: [] }]
 */
export const marketplaceRouter = Router();

marketplaceRouter.get("/categories", MarketplaceController.listCategories);
marketplaceRouter.get("/listings", MarketplaceController.listListings);
marketplaceRouter.get("/listings/:listingId", MarketplaceController.getListing);
marketplaceRouter.get("/search", MarketplaceController.search);

marketplaceRouter.post(
  "/listings",
  authenticate,
  requireTenant,
  requirePermission("marketplace.listing.manage"),
  validate({ body: createListingSchema }),
  MarketplaceController.createListing
);

marketplaceRouter.post(
  "/listings/:listingId/publish",
  authenticate,
  requireTenant,
  requirePermission("marketplace.listing.publish"),
  MarketplaceController.publishListing
);

marketplaceRouter.get(
  "/seller/listings",
  authenticate,
  requireTenant,
  requirePermission("marketplace.listing.manage"),
  MarketplaceController.listOrgListings
);

marketplaceRouter.get("/cart", authenticate, MarketplaceController.getCart);
marketplaceRouter.post(
  "/cart",
  authenticate,
  validate({ body: upsertCartItemSchema }),
  MarketplaceController.upsertCartItem
);
marketplaceRouter.delete(
  "/cart/:listingId",
  authenticate,
  MarketplaceController.removeCartItem
);

marketplaceRouter.post(
  "/orders",
  authenticate,
  validate({ body: createOrderSchema }),
  MarketplaceController.createOrder
);
marketplaceRouter.get("/orders", authenticate, MarketplaceController.listMyOrders);
marketplaceRouter.get(
  "/orders/:orderId",
  authenticate,
  MarketplaceController.getMyOrder
);

marketplaceRouter.get(
  "/wishlist",
  authenticate,
  MarketplaceController.listWishlist
);
marketplaceRouter.post(
  "/wishlist/:listingId",
  authenticate,
  MarketplaceController.addWishlist
);
marketplaceRouter.delete(
  "/wishlist/:listingId",
  authenticate,
  MarketplaceController.removeWishlist
);

marketplaceRouter.post(
  "/reviews",
  authenticate,
  validate({ body: createReviewSchema }),
  MarketplaceController.createReview
);

marketplaceRouter.get(
  "/coupons/validate",
  authenticate,
  MarketplaceController.validateCoupon
);

/**
 * Org order fulfillment.
 * Mounted at /api/v1/orders (with X-Organization-Id) and under org routes.
 */
export const ordersRouter = Router({ mergeParams: true });

ordersRouter.get(
  "/",
  authenticate,
  requireTenant,
  requirePermission("orders.read"),
  MarketplaceController.listOrgOrders
);

ordersRouter.patch(
  "/:orderId/fulfill",
  authenticate,
  requireTenant,
  requirePermission("orders.manage"),
  validate({ body: fulfillOrderSchema }),
  MarketplaceController.fulfillOrder
);

/**
 * Org-scoped marketplace seller helpers.
 * Mounted at /api/v1/organizations/:orgId
 */
export const marketplaceOrgRouter = Router({ mergeParams: true });

marketplaceOrgRouter.get(
  "/marketplace/listings",
  requirePermission("marketplace.listing.manage"),
  MarketplaceController.listOrgListings
);

marketplaceOrgRouter.post(
  "/marketplace/listings",
  requirePermission("marketplace.listing.manage"),
  validate({ body: createListingSchema }),
  MarketplaceController.createListing
);

marketplaceOrgRouter.post(
  "/marketplace/listings/:listingId/publish",
  requirePermission("marketplace.listing.publish"),
  MarketplaceController.publishListing
);

marketplaceOrgRouter.get(
  "/orders",
  requirePermission("orders.read"),
  MarketplaceController.listOrgOrders
);

marketplaceOrgRouter.patch(
  "/orders/:orderId/fulfill",
  requirePermission("orders.manage"),
  validate({ body: fulfillOrderSchema }),
  MarketplaceController.fulfillOrder
);
