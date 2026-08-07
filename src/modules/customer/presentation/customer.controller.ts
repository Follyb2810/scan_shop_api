import { Request, Response } from "express";
import { asyncHandler, sendSuccess } from "../../../shared/http";
import { customerService } from "../application/customer.service";

export const CustomerController = {
  ensureProfile: asyncHandler(async (req: Request, res: Response) => {
    const profile = await customerService.ensureProfile(
      req.context!.userId!,
      req.body
    );
    sendSuccess(res, { profile }, 201);
  }),

  getMe: asyncHandler(async (req: Request, res: Response) => {
    const profile = await customerService.getMe(req.context!.userId!);
    sendSuccess(res, { profile });
  }),

  updateMe: asyncHandler(async (req: Request, res: Response) => {
    const profile = await customerService.updateMe(
      req.context!.userId!,
      req.body
    );
    sendSuccess(res, { profile });
  }),

  listAddresses: asyncHandler(async (req: Request, res: Response) => {
    const addresses = await customerService.listAddresses(req.context!.userId!);
    sendSuccess(res, { addresses });
  }),

  createAddress: asyncHandler(async (req: Request, res: Response) => {
    const address = await customerService.createAddress(
      req.context!.userId!,
      req.body
    );
    sendSuccess(res, { address }, 201);
  }),

  updateAddress: asyncHandler(async (req: Request, res: Response) => {
    const address = await customerService.updateAddress(
      req.context!.userId!,
      req.params.addressId,
      req.body
    );
    sendSuccess(res, { address });
  }),

  deleteAddress: asyncHandler(async (req: Request, res: Response) => {
    const result = await customerService.deleteAddress(
      req.context!.userId!,
      req.params.addressId
    );
    sendSuccess(res, result);
  }),
};
