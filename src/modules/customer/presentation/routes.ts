import { Router } from "express";
import { authenticate, validate } from "../../../middleware";
import { CustomerController } from "./customer.controller";
import {
  createAddressSchema,
  ensureProfileSchema,
  updateAddressSchema,
  updateProfileSchema,
} from "../application/validators";

/**
 * Customer profile & addresses (non-tenant platform users).
 * Mounted at /api/v1/customers
 *
 * @openapi
 * tags:
 *   - name: Customer
 *     description: Customer profile and addresses
 * /api/v1/customers/me:
 *   get:
 *     tags: [Customer]
 *     summary: Get my customer profile
 *     security: [{ bearerAuth: [] }]
 */
export const customerRouter = Router();

customerRouter.use(authenticate);

customerRouter.post(
  "/profile",
  validate({ body: ensureProfileSchema }),
  CustomerController.ensureProfile
);

customerRouter.get("/me", CustomerController.getMe);
customerRouter.patch(
  "/me",
  validate({ body: updateProfileSchema }),
  CustomerController.updateMe
);

customerRouter.get("/me/addresses", CustomerController.listAddresses);
customerRouter.post(
  "/me/addresses",
  validate({ body: createAddressSchema }),
  CustomerController.createAddress
);
customerRouter.patch(
  "/me/addresses/:addressId",
  validate({ body: updateAddressSchema }),
  CustomerController.updateAddress
);
customerRouter.delete(
  "/me/addresses/:addressId",
  CustomerController.deleteAddress
);
