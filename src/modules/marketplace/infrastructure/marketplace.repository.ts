import { prisma } from "../../../infrastructure/database";
import { BaseRepository } from "../../../infrastructure/database/base.repository";

const listingInclude = {
  category: { select: { id: true, key: true, name: true } },
  organization: { select: { id: true, name: true, slug: true } },
  packageDefinition: {
    select: {
      id: true,
      name: true,
      unitsPerPackage: true,
      variant: {
        select: {
          id: true,
          name: true,
          sku: true,
          medicine: { select: { id: true, name: true } },
        },
      },
    },
  },
  reviews: {
    select: { rating: true },
  },
} as const;

const cartInclude = {
  items: {
    include: {
      listing: {
        include: {
          organization: { select: { id: true, name: true, slug: true } },
          category: { select: { key: true, name: true } },
        },
      },
    },
  },
} as const;

const orderInclude = {
  lines: {
    include: {
      listing: {
        select: { id: true, title: true, status: true },
      },
    },
  },
  organization: { select: { id: true, name: true, slug: true } },
} as const;

export class MarketplaceRepository extends BaseRepository {
  listCategories() {
    return this.db.marketplaceCategory.findMany({ orderBy: { name: "asc" } });
  }

  findCategoryByKey(key: string) {
    return this.db.marketplaceCategory.findUnique({ where: { key } });
  }

  findOrgWithType(organizationId: string) {
    return this.db.organization.findFirst({
      where: { id: organizationId, deletedAt: null },
      include: { type: true },
    });
  }

  findPackage(organizationId: string, packageDefinitionId: string) {
    return this.db.packageDefinition.findFirst({
      where: { id: packageDefinitionId, organizationId, deletedAt: null },
    });
  }

  createListing(data: {
    organizationId: string;
    packageDefinitionId: string;
    categoryId?: string | null;
    title: string;
    description?: string | null;
    price: number;
    currency: string;
    stockHint?: number | null;
  }) {
    return this.db.listing.create({
      data: {
        organizationId: data.organizationId,
        packageDefinitionId: data.packageDefinitionId,
        categoryId: data.categoryId ?? null,
        title: data.title,
        description: data.description ?? null,
        price: data.price,
        currency: data.currency,
        stockHint: data.stockHint ?? null,
        status: "draft",
      },
      include: listingInclude,
    });
  }

  findListingById(id: string) {
    return this.db.listing.findFirst({
      where: { id, deletedAt: null },
      include: listingInclude,
    });
  }

  listListings(filters: {
    status?: string;
    categoryKey?: string;
    organizationId?: string;
    q?: string;
    take?: number;
    includeUnpublished?: boolean;
  }) {
    return this.db.listing.findMany({
      where: {
        deletedAt: null,
        status: filters.status
          ? filters.status
          : filters.includeUnpublished
            ? undefined
            : "published",
        organizationId: filters.organizationId,
        category: filters.categoryKey
          ? { key: filters.categoryKey }
          : undefined,
        OR: filters.q
          ? [
              { title: { contains: filters.q } },
              { description: { contains: filters.q } },
            ]
          : undefined,
      },
      include: listingInclude,
      orderBy: { createdAt: "desc" },
      take: filters.take ?? 50,
    });
  }

  updateListing(
    id: string,
    data: {
      status?: string;
      publishedAt?: Date | null;
      title?: string;
      description?: string | null;
      price?: number;
      stockHint?: number | null;
    }
  ) {
    return this.db.listing.update({
      where: { id },
      data,
      include: listingInclude,
    });
  }

  getOrCreateCart(customerId: string) {
    return this.db.cart.upsert({
      where: { customerId },
      create: { customerId },
      update: {},
      include: cartInclude,
    });
  }

  findCart(customerId: string) {
    return this.db.cart.findUnique({
      where: { customerId },
      include: cartInclude,
    });
  }

  upsertCartItem(cartId: string, listingId: string, quantity: number) {
    return this.db.cartItem.upsert({
      where: { cartId_listingId: { cartId, listingId } },
      create: { cartId, listingId, quantity },
      update: { quantity },
    });
  }

  removeCartItem(cartId: string, listingId: string) {
    return this.db.cartItem.deleteMany({ where: { cartId, listingId } });
  }

  clearCart(cartId: string) {
    return this.db.cartItem.deleteMany({ where: { cartId } });
  }

  createOrder(data: {
    customerId: string;
    organizationId: string;
    status: string;
    total: number;
    currency: string;
    discountAmount: number;
    couponCode?: string | null;
    shippingAddressJson?: string | null;
    notes?: string | null;
    trackingCode?: string | null;
    lines: Array<{
      listingId: string;
      titleSnapshot: string;
      quantity: number;
      unitPrice: number;
      currency: string;
    }>;
  }) {
    return this.db.order.create({
      data: {
        customerId: data.customerId,
        organizationId: data.organizationId,
        status: data.status,
        total: data.total,
        currency: data.currency,
        discountAmount: data.discountAmount,
        couponCode: data.couponCode ?? null,
        shippingAddressJson: data.shippingAddressJson ?? null,
        notes: data.notes ?? null,
        trackingCode: data.trackingCode ?? null,
        trackingStatus: "placed",
        lines: {
          create: data.lines,
        },
      },
      include: orderInclude,
    });
  }

  findOrderById(id: string) {
    return this.db.order.findUnique({
      where: { id },
      include: orderInclude,
    });
  }

  listCustomerOrders(customerId: string) {
    return this.db.order.findMany({
      where: { customerId },
      include: orderInclude,
      orderBy: { createdAt: "desc" },
      take: 50,
    });
  }

  listOrgOrders(organizationId: string) {
    return this.db.order.findMany({
      where: { organizationId },
      include: orderInclude,
      orderBy: { createdAt: "desc" },
      take: 100,
    });
  }

  updateOrder(
    id: string,
    data: {
      status?: string;
      trackingCode?: string | null;
      trackingStatus?: string | null;
      confirmedAt?: Date | null;
      shippedAt?: Date | null;
      deliveredAt?: Date | null;
      cancelledAt?: Date | null;
    }
  ) {
    return this.db.order.update({
      where: { id },
      data,
      include: orderInclude,
    });
  }

  addWishlist(customerId: string, listingId: string) {
    return this.db.wishlistItem.upsert({
      where: { customerId_listingId: { customerId, listingId } },
      create: { customerId, listingId },
      update: {},
      include: { listing: { include: listingInclude } },
    });
  }

  removeWishlist(customerId: string, listingId: string) {
    return this.db.wishlistItem.deleteMany({ where: { customerId, listingId } });
  }

  listWishlist(customerId: string) {
    return this.db.wishlistItem.findMany({
      where: { customerId },
      include: { listing: { include: listingInclude } },
      orderBy: { createdAt: "desc" },
    });
  }

  upsertReview(data: {
    listingId: string;
    customerId: string;
    rating: number;
    comment?: string | null;
  }) {
    return this.db.listingReview.upsert({
      where: {
        listingId_customerId: {
          listingId: data.listingId,
          customerId: data.customerId,
        },
      },
      create: {
        listingId: data.listingId,
        customerId: data.customerId,
        rating: data.rating,
        comment: data.comment ?? null,
      },
      update: {
        rating: data.rating,
        comment: data.comment ?? null,
      },
    });
  }

  findCouponByCode(code: string) {
    return this.db.coupon.findUnique({
      where: { code: code.toUpperCase() },
    });
  }

  async seedCategories(
    rows: Array<{ key: string; name: string; description?: string }>
  ) {
    for (const row of rows) {
      await this.db.marketplaceCategory.upsert({
        where: { key: row.key },
        create: {
          key: row.key,
          name: row.name,
          description: row.description ?? null,
        },
        update: { name: row.name, description: row.description ?? null },
      });
    }
  }

  async seedCoupons(
    rows: Array<{
      code: string;
      percentOff?: number;
      amountOff?: number;
      minOrderTotal?: number;
    }>
  ) {
    for (const row of rows) {
      await this.db.coupon.upsert({
        where: { code: row.code.toUpperCase() },
        create: {
          code: row.code.toUpperCase(),
          percentOff: row.percentOff ?? null,
          amountOff: row.amountOff ?? null,
          minOrderTotal: row.minOrderTotal ?? null,
          active: true,
        },
        update: {
          percentOff: row.percentOff ?? null,
          amountOff: row.amountOff ?? null,
          minOrderTotal: row.minOrderTotal ?? null,
          active: true,
        },
      });
    }
  }
}

export const marketplaceRepository = new MarketplaceRepository(prisma);
