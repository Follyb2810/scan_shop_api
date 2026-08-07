import {
  ConflictError,
  ForbiddenError,
  NotFoundError,
  TenantIsolationError,
  ValidationError,
} from "../../../shared/errors";
import { eventBus } from "../../../infrastructure/events/event-bus";
import { workflowService } from "../../workflow/application/workflow.service";
import { customerService } from "../../customer/application/customer.service";
import {
  LISTING_EVENTS,
  ORDER_EVENTS,
  SELLER_ORG_TYPES,
} from "../domain/statuses";
import {
  marketplaceRepository,
  MarketplaceRepository,
} from "../infrastructure/marketplace.repository";

function avgRating(reviews: Array<{ rating: number }>) {
  if (!reviews.length) return null;
  const sum = reviews.reduce((a, r) => a + r.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
}

function serializeListing<
  T extends { reviews?: Array<{ rating: number }>; shippingAddressJson?: never },
>(listing: T) {
  const { reviews, ...rest } = listing;
  return {
    ...rest,
    ratingAvg: reviews ? avgRating(reviews) : null,
    ratingCount: reviews?.length ?? 0,
  };
}

function parseShipping(json: string | null | undefined) {
  if (!json) return null;
  try {
    return JSON.parse(json);
  } catch {
    return json;
  }
}

function serializeOrder<T extends { shippingAddressJson?: string | null }>(
  order: T
) {
  const { shippingAddressJson, ...rest } = order;
  return {
    ...rest,
    shippingAddress: parseShipping(shippingAddressJson),
  };
}

export class MarketplaceService {
  constructor(
    private readonly repo: MarketplaceRepository = marketplaceRepository
  ) {}

  listCategories() {
    return this.repo.listCategories();
  }

  async browseListings(filters: {
    q?: string;
    categoryKey?: string;
    organizationId?: string;
    take?: number;
  }) {
    const rows = await this.repo.listListings({
      ...filters,
      status: "published",
    });
    return rows.map(serializeListing);
  }

  async search(q: string, take?: number) {
    const rows = await this.repo.listListings({ q, take, status: "published" });
    return rows.map(serializeListing);
  }

  async getListing(listingId: string, opts?: { organizationId?: string }) {
    const listing = await this.repo.findListingById(listingId);
    if (!listing) throw new NotFoundError("Listing not found");
    if (
      listing.status !== "published" &&
      opts?.organizationId !== listing.organizationId
    ) {
      throw new NotFoundError("Listing not found");
    }
    return serializeListing(listing);
  }

  async listOrgListings(organizationId: string, status?: string) {
    const rows = await this.repo.listListings({
      organizationId,
      status,
      includeUnpublished: true,
    });
    return rows.map(serializeListing);
  }

  async createListing(
    organizationId: string,
    input: {
      packageDefinitionId: string;
      categoryKey?: string;
      title: string;
      description?: string;
      price: number;
      currency: string;
      stockHint?: number;
    }
  ) {
    const org = await this.repo.findOrgWithType(organizationId);
    if (!org || org.status !== "active") {
      throw new ValidationError("Organization must be active to list products");
    }
    const typeKey = org.type?.key;
    if (!typeKey || !(SELLER_ORG_TYPES as readonly string[]).includes(typeKey)) {
      throw new ForbiddenError(
        `Organization type ${typeKey ?? "unknown"} cannot sell on marketplace`,
        { allowed: SELLER_ORG_TYPES }
      );
    }

    const pkg = await this.repo.findPackage(
      organizationId,
      input.packageDefinitionId
    );
    if (!pkg) {
      throw new TenantIsolationError(
        "Package definition not found in this organization"
      );
    }

    let categoryId: string | null = null;
    if (input.categoryKey) {
      const cat = await this.repo.findCategoryByKey(input.categoryKey.toUpperCase());
      if (!cat) throw new ValidationError("Unknown marketplace category");
      categoryId = cat.id;
    }

    const listing = await this.repo.createListing({
      organizationId,
      packageDefinitionId: input.packageDefinitionId,
      categoryId,
      title: input.title,
      description: input.description,
      price: input.price,
      currency: input.currency.toUpperCase(),
      stockHint: input.stockHint,
    });

    await eventBus.emit(LISTING_EVENTS.CREATED, {
      listingId: listing.id,
      organizationId,
    });

    return serializeListing(listing);
  }

  async publishListing(
    organizationId: string,
    userId: string,
    listingId: string
  ) {
    const listing = await this.repo.findListingById(listingId);
    if (!listing) throw new NotFoundError("Listing not found");
    if (listing.organizationId !== organizationId) {
      throw new TenantIsolationError("Listing not in this organization");
    }
    if (listing.status !== "draft" && listing.status !== "rejected") {
      throw new ConflictError("Only draft/rejected listings can be published");
    }

    const updated = await this.repo.updateListing(listingId, {
      status: "pending_approval",
    });

    let approvalWorkflow = null;
    try {
      approvalWorkflow = await workflowService.startWorkflow({
        definitionKey: "marketplace.listing.approval",
        subjectType: "listing",
        subjectId: listingId,
        organizationId,
        startedByUserId: userId,
      });
    } catch (err) {
      if (!(err instanceof ConflictError)) throw err;
    }

    await eventBus.emit(LISTING_EVENTS.PUBLISH_REQUESTED, {
      listingId,
      organizationId,
      userId,
    });

    return { listing: serializeListing(updated), approvalWorkflow };
  }

  /** Called by workflow hook or direct platform approve. */
  async approveListing(listingId: string) {
    const listing = await this.repo.findListingById(listingId);
    if (!listing) throw new NotFoundError("Listing not found");
    if (listing.status !== "pending_approval") {
      throw new ConflictError("Listing is not pending approval");
    }
    const updated = await this.repo.updateListing(listingId, {
      status: "published",
      publishedAt: new Date(),
    });
    await eventBus.emit(LISTING_EVENTS.PUBLISHED, {
      listingId,
      organizationId: listing.organizationId,
    });
    return serializeListing(updated);
  }

  async rejectListing(listingId: string) {
    const listing = await this.repo.findListingById(listingId);
    if (!listing) throw new NotFoundError("Listing not found");
    if (listing.status !== "pending_approval") {
      throw new ConflictError("Listing is not pending approval");
    }
    const updated = await this.repo.updateListing(listingId, {
      status: "rejected",
    });
    await eventBus.emit(LISTING_EVENTS.REJECTED, {
      listingId,
      organizationId: listing.organizationId,
    });
    return serializeListing(updated);
  }

  async getCart(userId: string) {
    const customerId = await customerService.requireProfileId(userId);
    return this.repo.getOrCreateCart(customerId);
  }

  async upsertCartItem(
    userId: string,
    input: { listingId: string; quantity: number }
  ) {
    const customerId = await customerService.requireProfileId(userId);
    const listing = await this.repo.findListingById(input.listingId);
    if (!listing || listing.status !== "published") {
      throw new ValidationError("Listing is not available for purchase");
    }
    const cart = await this.repo.getOrCreateCart(customerId);

    // MVP: single-seller cart
    const otherSeller = cart.items.find(
      (i) => i.listing.organizationId !== listing.organizationId
    );
    if (otherSeller) {
      throw new ConflictError(
        "Cart may only contain listings from one seller organization. Clear cart first."
      );
    }

    await this.repo.upsertCartItem(cart.id, input.listingId, input.quantity);
    return this.repo.findCart(customerId);
  }

  async removeCartItem(userId: string, listingId: string) {
    const customerId = await customerService.requireProfileId(userId);
    const cart = await this.repo.getOrCreateCart(customerId);
    await this.repo.removeCartItem(cart.id, listingId);
    return this.repo.findCart(customerId);
  }

  async createOrder(
    userId: string,
    input: {
      addressId?: string;
      shippingAddress?: {
        line1: string;
        line2?: string;
        city: string;
        state?: string;
        country: string;
        postalCode?: string;
      };
      couponCode?: string;
      notes?: string;
    }
  ) {
    const customerId = await customerService.requireProfileId(userId);
    const cart = await this.repo.findCart(customerId);
    if (!cart || cart.items.length === 0) {
      throw new ValidationError("Cart is empty");
    }

    for (const item of cart.items) {
      if (item.listing.status !== "published") {
        throw new ConflictError(`Listing ${item.listingId} is no longer available`);
      }
    }

    const organizationId = cart.items[0].listing.organizationId;
    const mixed = cart.items.some(
      (i) => i.listing.organizationId !== organizationId
    );
    if (mixed) {
      throw new ConflictError("Cart contains multiple sellers");
    }

    let shippingAddress = input.shippingAddress ?? null;
    if (input.addressId) {
      const addresses = await customerService.listAddresses(userId);
      const addr = addresses.find((a) => a.id === input.addressId);
      if (!addr) throw new NotFoundError("Address not found");
      shippingAddress = {
        line1: addr.line1,
        line2: addr.line2 ?? undefined,
        city: addr.city,
        state: addr.state ?? undefined,
        country: addr.country,
        postalCode: addr.postalCode ?? undefined,
      };
    }
    if (!shippingAddress) {
      throw new ValidationError("Shipping address is required");
    }

    const currency = cart.items[0].listing.currency;
    let subtotal = cart.items.reduce(
      (sum, i) => sum + i.listing.price * i.quantity,
      0
    );
    let discountAmount = 0;
    let couponCode: string | null = null;

    if (input.couponCode) {
      const coupon = await this.validateCoupon(input.couponCode, subtotal);
      discountAmount = coupon.discountAmount;
      couponCode = coupon.code;
      subtotal = Math.max(0, subtotal - discountAmount);
    }

    const trackingCode = `TRK-${Date.now().toString(36).toUpperCase()}`;

    const order = await this.repo.createOrder({
      customerId,
      organizationId,
      status: "pending",
      total: Math.round(subtotal * 100) / 100,
      currency,
      discountAmount,
      couponCode,
      shippingAddressJson: JSON.stringify(shippingAddress),
      notes: input.notes,
      trackingCode,
      lines: cart.items.map((i) => ({
        listingId: i.listingId,
        titleSnapshot: i.listing.title,
        quantity: i.quantity,
        unitPrice: i.listing.price,
        currency: i.listing.currency,
      })),
    });

    await this.repo.clearCart(cart.id);

    await eventBus.emit(ORDER_EVENTS.CREATED, {
      orderId: order.id,
      customerId,
      organizationId,
    });

    return serializeOrder(order);
  }

  async listMyOrders(userId: string) {
    const customerId = await customerService.requireProfileId(userId);
    const rows = await this.repo.listCustomerOrders(customerId);
    return rows.map(serializeOrder);
  }

  async getMyOrder(userId: string, orderId: string) {
    const customerId = await customerService.requireProfileId(userId);
    const order = await this.repo.findOrderById(orderId);
    if (!order || order.customerId !== customerId) {
      throw new NotFoundError("Order not found");
    }
    return serializeOrder(order);
  }

  async listOrgOrders(organizationId: string) {
    const rows = await this.repo.listOrgOrders(organizationId);
    return rows.map(serializeOrder);
  }

  async fulfillOrder(
    organizationId: string,
    orderId: string,
    input: {
      status: "confirmed" | "processing" | "shipped" | "delivered";
      trackingCode?: string;
      trackingStatus?: string;
    }
  ) {
    const order = await this.repo.findOrderById(orderId);
    if (!order) throw new NotFoundError("Order not found");
    if (order.organizationId !== organizationId) {
      throw new TenantIsolationError("Order not in this organization");
    }
    if (order.status === "cancelled") {
      throw new ConflictError("Cannot fulfill a cancelled order");
    }

    const patch: {
      status: string;
      trackingCode?: string;
      trackingStatus?: string;
      confirmedAt?: Date;
      shippedAt?: Date;
      deliveredAt?: Date;
    } = {
      status: input.status,
      trackingCode: input.trackingCode ?? order.trackingCode ?? undefined,
      trackingStatus: input.trackingStatus ?? input.status,
    };
    if (input.status === "confirmed") patch.confirmedAt = new Date();
    if (input.status === "shipped") patch.shippedAt = new Date();
    if (input.status === "delivered") patch.deliveredAt = new Date();

    const updated = await this.repo.updateOrder(orderId, patch);
    await eventBus.emit(ORDER_EVENTS.FULFILLED, {
      orderId,
      organizationId,
      status: input.status,
    });
    return serializeOrder(updated);
  }

  async addWishlist(userId: string, listingId: string) {
    const customerId = await customerService.requireProfileId(userId);
    const listing = await this.repo.findListingById(listingId);
    if (!listing || listing.status !== "published") {
      throw new ValidationError("Listing not available");
    }
    return this.repo.addWishlist(customerId, listingId);
  }

  async removeWishlist(userId: string, listingId: string) {
    const customerId = await customerService.requireProfileId(userId);
    await this.repo.removeWishlist(customerId, listingId);
    return { removed: true };
  }

  async listWishlist(userId: string) {
    const customerId = await customerService.requireProfileId(userId);
    return this.repo.listWishlist(customerId);
  }

  async createReview(
    userId: string,
    input: { listingId: string; rating: number; comment?: string }
  ) {
    const customerId = await customerService.requireProfileId(userId);
    const listing = await this.repo.findListingById(input.listingId);
    if (!listing || listing.status !== "published") {
      throw new ValidationError("Listing not available");
    }
    return this.repo.upsertReview({
      listingId: input.listingId,
      customerId,
      rating: input.rating,
      comment: input.comment,
    });
  }

  async validateCoupon(code: string, orderTotal = 0) {
    const coupon = await this.repo.findCouponByCode(code);
    if (!coupon || !coupon.active) {
      throw new ValidationError("Invalid coupon code");
    }
    const now = new Date();
    if (coupon.startsAt && coupon.startsAt > now) {
      throw new ValidationError("Coupon is not active yet");
    }
    if (coupon.endsAt && coupon.endsAt < now) {
      throw new ValidationError("Coupon has expired");
    }
    if (coupon.minOrderTotal != null && orderTotal < coupon.minOrderTotal) {
      throw new ValidationError("Order total below coupon minimum", {
        minOrderTotal: coupon.minOrderTotal,
      });
    }

    let discountAmount = 0;
    if (coupon.percentOff != null) {
      discountAmount = (orderTotal * coupon.percentOff) / 100;
    } else if (coupon.amountOff != null) {
      discountAmount = coupon.amountOff;
    }
    discountAmount = Math.min(orderTotal, Math.round(discountAmount * 100) / 100);

    return {
      code: coupon.code,
      percentOff: coupon.percentOff,
      amountOff: coupon.amountOff,
      discountAmount,
      currency: coupon.currency,
    };
  }
}

export const marketplaceService = new MarketplaceService();
