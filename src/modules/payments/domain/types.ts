export const PAYMENT_STATUSES = [
  "requires_payment",
  "processing",
  "succeeded",
  "failed",
  "cancelled",
] as const;

export type PaymentStatus = (typeof PAYMENT_STATUSES)[number];

export const PAYMENT_EVENTS = {
  INTENT_CREATED: "payment.intent.created",
  SUCCEEDED: "payment.succeeded",
  FAILED: "payment.failed",
} as const;

export type PaymentProvider = {
  name: string;
  createIntent(input: {
    amount: number;
    currency: string;
    orderId: string;
    metadata?: Record<string, unknown>;
  }): Promise<{ externalId: string; clientSecret?: string }>;
  /**
   * Simulate / verify webhook payload. Stub auto-succeeds.
   */
  parseWebhook(raw: unknown): {
    externalId: string;
    status: "succeeded" | "failed";
    failureReason?: string;
  };
};
