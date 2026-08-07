import {
  ConflictError,
  ForbiddenError,
  NotFoundError,
  ValidationError,
} from "../../../shared/errors";
import { eventBus } from "../../../infrastructure/events/event-bus";
import { ORDER_EVENTS } from "../../marketplace/domain/statuses";
import { customerService } from "../../customer/application/customer.service";
import { PAYMENT_EVENTS } from "../domain/types";
import { getPaymentProvider } from "../infrastructure/providers/stub.provider";
import {
  paymentRepository,
  PaymentRepository,
} from "../infrastructure/payment.repository";

function parseMeta(json: string | null | undefined) {
  if (!json) return null;
  try {
    return JSON.parse(json);
  } catch {
    return json;
  }
}

function serializePayment<T extends { metadataJson?: string | null }>(p: T) {
  const { metadataJson, ...rest } = p;
  return { ...rest, metadata: parseMeta(metadataJson) };
}

export class PaymentService {
  constructor(private readonly repo: PaymentRepository = paymentRepository) {}

  async createIntent(
    userId: string,
    input: { orderId: string; provider?: string },
    idempotencyKey?: string
  ) {
    if (idempotencyKey) {
      const existing = await this.repo.findByIdempotencyKey(idempotencyKey);
      if (existing) return serializePayment(existing);
    }

    const customerId = await customerService.requireProfileId(userId);
    const order = await this.repo.findOrder(input.orderId);
    if (!order) throw new NotFoundError("Order not found");
    if (order.customerId !== customerId) {
      throw new ForbiddenError("Order does not belong to this customer");
    }
    if (order.status === "cancelled") {
      throw new ConflictError("Cannot pay a cancelled order");
    }
    if (order.status === "paid" || order.payments.some((p) => p.status === "succeeded")) {
      throw new ConflictError("Order is already paid");
    }

    const provider = getPaymentProvider(input.provider ?? "stub");
    const intent = await provider.createIntent({
      amount: order.total,
      currency: order.currency,
      orderId: order.id,
    });

    const payment = await this.repo.create({
      orderId: order.id,
      customerId,
      organizationId: order.organizationId,
      provider: provider.name,
      status: "requires_payment",
      amount: order.total,
      currency: order.currency,
      externalId: intent.externalId,
      idempotencyKey: idempotencyKey ?? null,
      metadataJson: JSON.stringify({ clientSecret: intent.clientSecret }),
    });

    await eventBus.emit(PAYMENT_EVENTS.INTENT_CREATED, {
      paymentId: payment.id,
      orderId: order.id,
      customerId,
      organizationId: order.organizationId,
    });

    return {
      ...serializePayment(payment),
      clientSecret: intent.clientSecret,
    };
  }

  async getById(userId: string, paymentId: string, opts?: { orgId?: string }) {
    const payment = await this.repo.findById(paymentId);
    if (!payment) throw new NotFoundError("Payment not found");

    if (opts?.orgId) {
      if (payment.organizationId !== opts.orgId) {
        throw new ForbiddenError("Payment not in this organization");
      }
      return serializePayment(payment);
    }

    const customerId = await customerService.requireProfileId(userId);
    if (payment.customerId !== customerId) {
      throw new ForbiddenError("Payment not visible to this customer");
    }
    return serializePayment(payment);
  }

  async handleWebhook(providerName: string, raw: unknown) {
    const provider = getPaymentProvider(providerName);
    let parsed: {
      externalId: string;
      status: "succeeded" | "failed";
      failureReason?: string;
    };
    try {
      parsed = provider.parseWebhook(raw);
    } catch {
      throw new ValidationError("Invalid webhook payload");
    }

    const payment = await this.repo.findByExternalId(parsed.externalId);
    if (!payment) throw new NotFoundError("Payment not found for webhook");

    if (payment.status === "succeeded") {
      return serializePayment(payment);
    }

    if (parsed.status === "failed") {
      const updated = await this.repo.update(payment.id, {
        status: "failed",
        failureReason: parsed.failureReason ?? "Payment failed",
      });
      await eventBus.emit(PAYMENT_EVENTS.FAILED, {
        paymentId: payment.id,
        orderId: payment.orderId,
      });
      return serializePayment(updated);
    }

    const updated = await this.repo.update(payment.id, {
      status: "succeeded",
      paidAt: new Date(),
    });

    if (payment.order.status !== "paid") {
      await this.repo.markOrderPaid(payment.orderId);
      await eventBus.emit(ORDER_EVENTS.PAID, {
        orderId: payment.orderId,
        paymentId: payment.id,
        organizationId: payment.organizationId,
        customerId: payment.customerId,
      });
    }

    await eventBus.emit(PAYMENT_EVENTS.SUCCEEDED, {
      paymentId: payment.id,
      orderId: payment.orderId,
      organizationId: payment.organizationId,
    });

    return serializePayment(updated);
  }

  /**
   * Stub convenience: create intent + immediately succeed (tests / sandbox).
   */
  async payWithStub(userId: string, orderId: string) {
    const intent = await this.createIntent(userId, {
      orderId,
      provider: "stub",
    });
    return this.handleWebhook("stub", {
      externalId: intent.externalId,
      status: "succeeded",
    });
  }
}

export const paymentService = new PaymentService();
