import { describe, expect, it, beforeAll } from "vitest";
import request from "supertest";
import { Application } from "express";
import { createApp } from "../../src/app";
import { rbacService } from "../../src/modules/rbac/application/rbac.service";
import { clearPermissionMemoryCache } from "../../src/modules/rbac/infrastructure/permission-cache";

describe("Step 15 Payments", () => {
  let app: Application;
  const password = "Password123!";
  let sellerToken = "";
  let customerToken = "";
  let moderatorToken = "";
  let orgId = "";
  let listingId = "";
  let orderId = "";
  let addressId = "";

  beforeAll(async () => {
    clearPermissionMemoryCache();
    app = createApp();

    const seller = await request(app).post("/api/v1/auth/register").send({
      email: `pay-seller-${Date.now()}@example.com`,
      password,
    });
    sellerToken = seller.body.data.tokens.accessToken;

    const customer = await request(app).post("/api/v1/auth/register").send({
      email: `pay-customer-${Date.now()}@example.com`,
      password,
    });
    customerToken = customer.body.data.tokens.accessToken;

    const mod = await request(app).post("/api/v1/auth/register").send({
      email: `pay-mod-${Date.now()}@example.com`,
      password,
    });
    moderatorToken = mod.body.data.tokens.accessToken;
    await rbacService.assignPlatformRole(mod.body.data.user.id, "SUPER_ADMIN");

    const org = await request(app)
      .post("/api/v1/organizations")
      .set("Authorization", `Bearer ${sellerToken}`)
      .send({
        name: "Pay Pharmacy",
        slug: `pay-pharm-${Date.now()}`,
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

    await request(app)
      .post("/api/v1/customers/profile")
      .set("Authorization", `Bearer ${customerToken}`)
      .send({ displayName: "Payer" });
    const addr = await request(app)
      .post("/api/v1/customers/me/addresses")
      .set("Authorization", `Bearer ${customerToken}`)
      .send({
        line1: "1 Pay St",
        city: "Lagos",
        country: "NG",
        isDefault: true,
      });
    addressId = addr.body.data.address.id;

    const hierarchy = await request(app)
      .post(`/api/v1/organizations/${orgId}/hierarchy`)
      .set("Authorization", `Bearer ${sellerToken}`)
      .set("X-Organization-Id", orgId)
      .send({
        family: { name: "Pay Family" },
        brand: { name: "Pay Brand" },
        medicine: { name: "Pay Med", categoryKey: "ANALGESIC" },
        variant: {
          name: "Pay Med 10mg",
          strength: "10mg",
          sku: `PAY-${Date.now()}`,
          dosageFormKey: "TABLET",
        },
        package: {
          name: "Retail",
          unitsPerPackage: 1,
          packagingTypeKey: "RETAIL_UNIT",
        },
      });
    const packageId = hierarchy.body.data.hierarchy.package.id;

    const listing = await request(app)
      .post("/api/v1/marketplace/listings")
      .set("Authorization", `Bearer ${sellerToken}`)
      .set("X-Organization-Id", orgId)
      .send({
        packageDefinitionId: packageId,
        categoryKey: "OTC",
        title: "Payable Item",
        price: 2000,
        currency: "NGN",
      });
    listingId = listing.body.data.listing.id;

    const published = await request(app)
      .post(`/api/v1/marketplace/listings/${listingId}/publish`)
      .set("Authorization", `Bearer ${sellerToken}`)
      .set("X-Organization-Id", orgId);
    await request(app)
      .post(
        `/api/v1/workflows/instances/${published.body.data.approvalWorkflow.id}/actions`
      )
      .set("Authorization", `Bearer ${moderatorToken}`)
      .send({ decision: "approve" });

    await request(app)
      .post("/api/v1/marketplace/cart")
      .set("Authorization", `Bearer ${customerToken}`)
      .send({ listingId, quantity: 1 });

    const order = await request(app)
      .post("/api/v1/marketplace/orders")
      .set("Authorization", `Bearer ${customerToken}`)
      .send({ addressId });
    orderId = order.body.data.order.id;
  });

  it("creates payment intent and settles via stub webhook → order paid", async () => {
    const intent = await request(app)
      .post("/api/v1/payments/intent")
      .set("Authorization", `Bearer ${customerToken}`)
      .set("Idempotency-Key", `idem-${orderId}`)
      .send({ orderId, provider: "stub" });

    expect(intent.status).toBe(201);
    expect(intent.body.data.payment.status).toBe("requires_payment");
    expect(intent.body.data.payment.externalId).toBeTruthy();
    expect(intent.body.data.payment.clientSecret).toBeTruthy();

    const webhook = await request(app)
      .post("/api/v1/payments/webhook/stub")
      .send({
        externalId: intent.body.data.payment.externalId,
        status: "succeeded",
      });

    expect(webhook.status).toBe(200);
    expect(webhook.body.data.payment.status).toBe("succeeded");

    const order = await request(app)
      .get(`/api/v1/marketplace/orders/${orderId}`)
      .set("Authorization", `Bearer ${customerToken}`);
    expect(order.body.data.order.status).toBe("paid");
    expect(order.body.data.order.paidAt).toBeTruthy();

    await new Promise((r) => setTimeout(r, 30));

    const notes = await request(app)
      .get("/api/v1/notifications")
      .set("Authorization", `Bearer ${customerToken}`);
    expect(notes.status).toBe(200);
    expect(
      notes.body.data.notifications.some(
        (n: { type: string }) => n.type === "order.paid"
      )
    ).toBe(true);
  });

  it("supports sandbox stub pay shortcut", async () => {
    // new order
    await request(app)
      .post("/api/v1/marketplace/cart")
      .set("Authorization", `Bearer ${customerToken}`)
      .send({ listingId, quantity: 1 });
    const order = await request(app)
      .post("/api/v1/marketplace/orders")
      .set("Authorization", `Bearer ${customerToken}`)
      .send({ addressId });

    const paid = await request(app)
      .post("/api/v1/payments/stub/pay")
      .set("Authorization", `Bearer ${customerToken}`)
      .send({ orderId: order.body.data.order.id });

    expect(paid.status).toBe(200);
    expect(paid.body.data.payment.status).toBe("succeeded");
  });
});
