import { Request, Response } from "express";
import { asyncHandler, sendSuccess } from "../../../shared/http";
import { ValidationError } from "../../../shared/errors";
import { marketplaceService } from "../application/marketplace.service";
import {
  listListingsQuerySchema,
  searchQuerySchema,
  validateCouponSchema,
} from "../application/validators";

function requireOrgId(req: Request): string {
  const orgId =
    req.params.orgId ??
    req.context?.organizationId ??
    req.context?.tenantId;
  if (!orgId) {
    throw new ValidationError(
      "Organization context required. Pass X-Organization-Id header."
    );
  }
  return orgId;
}

export const MarketplaceController = {
  listCategories: asyncHandler(async (_req: Request, res: Response) => {
    const categories = await marketplaceService.listCategories();
    sendSuccess(res, { categories });
  }),

  listListings: asyncHandler(async (req: Request, res: Response) => {
    const query = listListingsQuerySchema.parse(req.query);
    const listings = await marketplaceService.browseListings(query);
    sendSuccess(res, { listings });
  }),

  search: asyncHandler(async (req: Request, res: Response) => {
    const query = searchQuerySchema.parse(req.query);
    const listings = await marketplaceService.search(query.q, query.take);
    sendSuccess(res, { listings });
  }),

  getListing: asyncHandler(async (req: Request, res: Response) => {
    const listing = await marketplaceService.getListing(req.params.listingId, {
      organizationId: req.context?.organizationId,
    });
    sendSuccess(res, { listing });
  }),

  createListing: asyncHandler(async (req: Request, res: Response) => {
    const listing = await marketplaceService.createListing(
      requireOrgId(req),
      req.body
    );
    sendSuccess(res, { listing }, 201);
  }),

  publishListing: asyncHandler(async (req: Request, res: Response) => {
    const result = await marketplaceService.publishListing(
      requireOrgId(req),
      req.context!.userId!,
      req.params.listingId
    );
    sendSuccess(res, result);
  }),

  listOrgListings: asyncHandler(async (req: Request, res: Response) => {
    const listings = await marketplaceService.listOrgListings(
      requireOrgId(req),
      typeof req.query.status === "string" ? req.query.status : undefined
    );
    sendSuccess(res, { listings });
  }),

  getCart: asyncHandler(async (req: Request, res: Response) => {
    const cart = await marketplaceService.getCart(req.context!.userId!);
    sendSuccess(res, { cart });
  }),

  upsertCartItem: asyncHandler(async (req: Request, res: Response) => {
    const cart = await marketplaceService.upsertCartItem(
      req.context!.userId!,
      req.body
    );
    sendSuccess(res, { cart });
  }),

  removeCartItem: asyncHandler(async (req: Request, res: Response) => {
    const cart = await marketplaceService.removeCartItem(
      req.context!.userId!,
      req.params.listingId
    );
    sendSuccess(res, { cart });
  }),

  createOrder: asyncHandler(async (req: Request, res: Response) => {
    const order = await marketplaceService.createOrder(
      req.context!.userId!,
      req.body
    );
    sendSuccess(res, { order }, 201);
  }),

  listMyOrders: asyncHandler(async (req: Request, res: Response) => {
    const orders = await marketplaceService.listMyOrders(req.context!.userId!);
    sendSuccess(res, { orders });
  }),

  getMyOrder: asyncHandler(async (req: Request, res: Response) => {
    const order = await marketplaceService.getMyOrder(
      req.context!.userId!,
      req.params.orderId
    );
    sendSuccess(res, { order });
  }),

  listOrgOrders: asyncHandler(async (req: Request, res: Response) => {
    const orders = await marketplaceService.listOrgOrders(requireOrgId(req));
    sendSuccess(res, { orders });
  }),

  fulfillOrder: asyncHandler(async (req: Request, res: Response) => {
    const order = await marketplaceService.fulfillOrder(
      requireOrgId(req),
      req.params.orderId,
      req.body
    );
    sendSuccess(res, { order });
  }),

  addWishlist: asyncHandler(async (req: Request, res: Response) => {
    const item = await marketplaceService.addWishlist(
      req.context!.userId!,
      req.params.listingId
    );
    sendSuccess(res, { item }, 201);
  }),

  removeWishlist: asyncHandler(async (req: Request, res: Response) => {
    const result = await marketplaceService.removeWishlist(
      req.context!.userId!,
      req.params.listingId
    );
    sendSuccess(res, result);
  }),

  listWishlist: asyncHandler(async (req: Request, res: Response) => {
    const items = await marketplaceService.listWishlist(req.context!.userId!);
    sendSuccess(res, { items });
  }),

  createReview: asyncHandler(async (req: Request, res: Response) => {
    const review = await marketplaceService.createReview(
      req.context!.userId!,
      req.body
    );
    sendSuccess(res, { review }, 201);
  }),

  validateCoupon: asyncHandler(async (req: Request, res: Response) => {
    const query = validateCouponSchema.parse(req.query);
    const coupon = await marketplaceService.validateCoupon(
      query.code,
      query.orderTotal ?? 0
    );
    sendSuccess(res, { coupon });
  }),
};
