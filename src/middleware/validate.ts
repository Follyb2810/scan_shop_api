import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

type RequestSchemas = {
  body?: ZodSchema;
  query?: ZodSchema;
  params?: ZodSchema;
};

/**
 * Zod validation middleware.
 * Replaces validated values onto req so handlers see coerced types.
 */
export function validate(schemas: RequestSchemas) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    try {
      if (schemas.body) {
        req.body = schemas.body.parse(req.body);
      }
      if (schemas.query) {
        const parsed = schemas.query.parse(req.query);
        // Express 5 query can be read-only-ish; assign safely
        Object.defineProperty(req, "query", {
          value: parsed,
          writable: true,
          configurable: true,
          enumerable: true,
        });
      }
      if (schemas.params) {
        const parsed = schemas.params.parse(req.params);
        Object.defineProperty(req, "params", {
          value: parsed,
          writable: true,
          configurable: true,
          enumerable: true,
        });
      }
      next();
    } catch (err) {
      next(err);
    }
  };
}

/** Convenience when only body schema is needed */
export function validateBody(schema: ZodSchema) {
  return validate({ body: schema });
}
