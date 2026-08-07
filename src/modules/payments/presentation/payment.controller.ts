import { Request, Response } from "express";
import { asyncHandler, sendSuccess } from "../../../shared/http";
import { paymentService } from "../application/payment.service";

export const PaymentController = {
  createIntent: asyncHandler(async (req: Request, res: Response) => {
    const payment = await paymentService.createIntent(
      req.context!.userId!,
      req.body,
      req.header("Idempotency-Key") ?? undefined
    );
    sendSuccess(res, { payment }, 201);
  }),

  getById: asyncHandler(async (req: Request, res: Response) => {
    const orgId = req.context?.organizationId;
    const payment = await paymentService.getById(
      req.context!.userId!,
      req.params.id,
      orgId ? { orgId } : undefined
    );
    sendSuccess(res, { payment });
  }),

  webhook: asyncHandler(async (req: Request, res: Response) => {
    const payment = await paymentService.handleWebhook(
      req.params.provider,
      req.body
    );
    sendSuccess(res, { payment });
  }),

  /** Sandbox: intent + succeed in one call */
  stubPay: asyncHandler(async (req: Request, res: Response) => {
    const payment = await paymentService.payWithStub(
      req.context!.userId!,
      req.body.orderId
    );
    sendSuccess(res, { payment });
  }),
};
