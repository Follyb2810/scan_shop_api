import { Router } from "express";
import {
  authenticate,
  requirePermission,
  requireTenant,
  validate,
} from "../../../middleware";
import { PaymentController } from "./payment.controller";
import { createIntentSchema, stubWebhookSchema } from "../application/validators";
import { z } from "zod";

/**
 * Mounted at /api/v1/payments
 *
 * @openapi
 * tags:
 *   - name: Payments
 *     description: Payment intents and webhooks
 * /api/v1/payments/intent:
 *   post:
 *     tags: [Payments]
 *     summary: Create payment intent for an order
 *     security: [{ bearerAuth: [] }]
 * /api/v1/payments/webhook/{provider}:
 *   post:
 *     tags: [Payments]
 *     summary: Provider webhook (stub supported)
 */
export const paymentsRouter = Router();

paymentsRouter.post(
  "/intent",
  authenticate,
  validate({ body: createIntentSchema }),
  PaymentController.createIntent
);

paymentsRouter.post(
  "/stub/pay",
  authenticate,
  validate({ body: z.object({ orderId: z.string().uuid() }) }),
  PaymentController.stubPay
);

paymentsRouter.post(
  "/webhook/:provider",
  validate({ body: stubWebhookSchema }),
  PaymentController.webhook
);

paymentsRouter.get("/:id", authenticate, PaymentController.getById);

/**
 * Org view of a payment — mount under /orders or org if needed.
 */
export const paymentsOrgRouter = Router({ mergeParams: true });

paymentsOrgRouter.get(
  "/payments/:id",
  requireTenant,
  requirePermission("payments.read"),
  PaymentController.getById
);
