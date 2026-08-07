import { describe, expect, it, beforeAll } from "vitest";
import request from "supertest";
import { Application } from "express";
import { createApp } from "../../src/app";
import { rbacService } from "../../src/modules/rbac/application/rbac.service";
import { clearPermissionMemoryCache } from "../../src/modules/rbac/infrastructure/permission-cache";

describe("Step 14 Marketplace + customer", () => {
  let app: Application;
  const password = "Password123!";

  let sellerToken = "";
  let customerToken = "";
  let moderatorToken = "";
  let orgId = "";
  let packageId = "";
  let listingId = "";
  let orderId = "";
  let trackingCode = "";

  beforeAll(async () => {
    clearPermissionMemoryCache();
    app = createApp();

    const seller = await request(app).post("/api/v1/auth/register").send({
      email: `mp-seller-${Date.now()}@example.com`,
      password,
    });
    sellerToken = seller.body.data.tokens.accessToken;

    const customer = await request(app).post("/api/v1/auth/register").send({
      email: `mp-customer-${Date.now()}@example.com`,
      password,
    });
    customerToken = customer.body.data.tokens.accessToken;

    const moderator = await request(app).post("/api/v1/auth/register").send({
      email: `mp-mod-${Date.now()}@example.com`,
      password,
    });
    moderatorToken = moderator.body.data.tokens.accessToken;
    await rbacService.assignPlatformRole(
      moderator.body.data.user.id,
      "SUPER_ADMIN"
    );

    const org = await request(app)
      .post("/api/v1/organizations")
      .set("Authorization", `Bearer ${sellerToken}`)
      .send({
        name: "Marketplace Pharmacy",
        slug: `mp-pharm-${Date.now()}`,
        typeKey: "PHARMACY",
      });
    orgId = org.body.data.organization.id;

    await request(app)
      .post(
        `/api/v1/workflows/instances/${org.body.data.approvalWorkflow.id}/actions`
      )
      .set("Authorization", `Bearer ${moderatorToken}`)
      .send({ decision: "approve" });

    clearPermissionMemoryCache();

    const hierarchy = await request(app)
      .post(`/api/v1/organizations/${orgId}/hierarchy`)
      .set("Authorization", `Bearer ${sellerToken}`)
      .set("X-Organization-Id", orgId)
      .send({
        family: { name: "MP Family" },
        brand: { name: "MP Brand" },
        medicine: { name: "MP Med", categoryKey: "ANALGESIC" },
        variant: {
          name: "MP Med 500mg",
          strength: "500mg",
          sku: `MP-${Date.now()}`,
          dosageFormKey: "TABLET",
        },
        package: {
          name: "Retail pack",
          unitsPerPackage: 1,
          packagingTypeKey: "RETAIL_UNIT",
        },
      });
    packageId = hierarchy.body.data.hierarchy.package.id;
  });

  it("ensures customer profile and address", async () => {
    const profile = await request(app)
      .post("/api/v1/customers/profile")
      .set("Authorization", `Bearer ${customerToken}`)
      .send({ displayName: "Test Buyer" });

    expect(profile.status).toBe(201);
    expect(profile.body.data.profile.displayName).toBe("Test Buyer");

    const address = await request(app)
      .post("/api/v1/customers/me/addresses")
      .set("Authorization", `Bearer ${customerToken}`)
      .send({
        label: "Home",
        line1: "12 Market Street",
        city: "Lagos",
        country: "NG",
        isDefault: true,
      });

    expect(address.status).toBe(201);
    expect(address.body.data.address.city).toBe("Lagos");
  });

  it("lists marketplace categories", async () => {
    const res = await request(app).get("/api/v1/marketplace/categories");
    expect(res.status).toBe(200);
    expect(res.body.data.categories.map((c: { key: string }) => c.key)).toContain(
      "OTC"
    );
  });

  it("creates listing, publishes via workflow, then browses", async () => {
    clearPermissionMemoryCache();

    const created = await request(app)
      .post("/api/v1/marketplace/listings")
      .set("Authorization", `Bearer ${sellerToken}`)
      .set("X-Organization-Id", orgId)
      .send({
        packageDefinitionId: packageId,
        categoryKey: "OTC",
        title: "Pain Relief Pack",
        description: "Fast acting tablets",
        price: 2500,
        currency: "NGN",
        stockHint: 40,
      });

    expect(created.status).toBe(201);
    expect(created.body.data.listing.status).toBe("draft");
    listingId = created.body.data.listing.id;

    const published = await request(app)
      .post(`/api/v1/marketplace/listings/${listingId}/publish`)
      .set("Authorization", `Bearer ${sellerToken}`)
      .set("X-Organization-Id", orgId);

    expect(published.status).toBe(200);
    expect(published.body.data.listing.status).toBe("pending_approval");
    expect(published.body.data.approvalWorkflow?.id).toBeTruthy();

    await request(app)
      .post(
        `/api/v1/workflows/instances/${published.body.data.approvalWorkflow.id}/actions`
      )
      .set("Authorization", `Bearer ${moderatorToken}`)
      .send({ decision: "approve" });

    const detail = await request(app).get(
      `/api/v1/marketplace/listings/${listingId}`
    );
    expect(detail.status).toBe(200);
    expect(detail.body.data.listing.status).toBe("published");

    const browse = await request(app)
      .get("/api/v1/marketplace/listings")
      .query({ q: "Pain Relief" });
    expect(
      browse.body.data.listings.some((l: { id: string }) => l.id === listingId)
    ).toBe(true);

    const search = await request(app)
      .get("/api/v1/marketplace/search")
      .query({ q: "Pain" });
    expect(search.body.data.listings.length).toBeGreaterThan(0);
  });

  it("customer carts, orders, and tracks fulfillment", async () => {
    clearPermissionMemoryCache();

    const cartAdd = await request(app)
      .post("/api/v1/marketplace/cart")
      .set("Authorization", `Bearer ${customerToken}`)
      .send({ listingId, quantity: 2 });
    expect(cartAdd.status).toBe(200);
    expect(cartAdd.body.data.cart.items).toHaveLength(1);

    const coupon = await request(app)
      .get("/api/v1/marketplace/coupons/validate")
      .query({ code: "WELCOME10", orderTotal: 5000 })
      .set("Authorization", `Bearer ${customerToken}`);
    expect(coupon.status).toBe(200);
    expect(coupon.body.data.coupon.discountAmount).toBe(500);

    const me = await request(app)
      .get("/api/v1/customers/me")
      .set("Authorization", `Bearer ${customerToken}`);
    const addressId = me.body.data.profile.addresses[0].id;

    const order = await request(app)
      .post("/api/v1/marketplace/orders")
      .set("Authorization", `Bearer ${customerToken}`)
      .send({
        addressId,
        couponCode: "WELCOME10",
        notes: "Leave at gate",
      });

    expect(order.status).toBe(201);
    expect(order.body.data.order.status).toBe("pending");
    expect(order.body.data.order.total).toBe(4500); // 5000 - 10%
    expect(order.body.data.order.trackingCode).toBeTruthy();
    orderId = order.body.data.order.id;
    trackingCode = order.body.data.order.trackingCode;

    const mine = await request(app)
      .get(`/api/v1/marketplace/orders/${orderId}`)
      .set("Authorization", `Bearer ${customerToken}`);
    expect(mine.status).toBe(200);
    expect(mine.body.data.order.trackingCode).toBe(trackingCode);

    const fulfill = await request(app)
      .patch(`/api/v1/orders/${orderId}/fulfill`)
      .set("Authorization", `Bearer ${sellerToken}`)
      .set("X-Organization-Id", orgId)
      .send({ status: "shipped", trackingStatus: "out_for_delivery" });

    expect(fulfill.status).toBe(200);
    expect(fulfill.body.data.order.status).toBe("shipped");
    expect(fulfill.body.data.order.trackingStatus).toBe("out_for_delivery");

    const tracked = await request(app)
      .get(`/api/v1/marketplace/orders/${orderId}`)
      .set("Authorization", `Bearer ${customerToken}`);
    expect(tracked.body.data.order.status).toBe("shipped");
  });

  it("supports wishlist and reviews", async () => {
    const wish = await request(app)
      .post(`/api/v1/marketplace/wishlist/${listingId}`)
      .set("Authorization", `Bearer ${customerToken}`);
    expect(wish.status).toBe(201);

    const review = await request(app)
      .post("/api/v1/marketplace/reviews")
      .set("Authorization", `Bearer ${customerToken}`)
      .send({ listingId, rating: 5, comment: "Great pack" });
    expect(review.status).toBe(201);
    expect(review.body.data.review.rating).toBe(5);

    const detail = await request(app).get(
      `/api/v1/marketplace/listings/${listingId}`
    );
    expect(detail.body.data.listing.ratingAvg).toBe(5);
    expect(detail.body.data.listing.ratingCount).toBe(1);
  });
});
