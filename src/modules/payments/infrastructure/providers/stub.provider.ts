import { PaymentProvider } from "../../domain/types";

/** Dev/test provider — creates intents and treats webhooks as success by default. */
export const stubPaymentProvider: PaymentProvider = {
  name: "stub",

  async createIntent(input) {
    return {
      externalId: `stub_${input.orderId}_${Date.now()}`,
      clientSecret: `secret_stub_${input.orderId}`,
    };
  },

  parseWebhook(raw: unknown) {
    const body = (raw ?? {}) as {
      externalId?: string;
      status?: string;
      failureReason?: string;
    };
    if (!body.externalId) {
      throw new Error("Webhook missing externalId");
    }
    const status = body.status === "failed" ? "failed" : "succeeded";
    return {
      externalId: body.externalId,
      status,
      failureReason: body.failureReason,
    };
  },
};

export function getPaymentProvider(name = "stub"): PaymentProvider {
  if (name === "stub") return stubPaymentProvider;
  // Future: stripe, paystack, etc.
  return stubPaymentProvider;
}
