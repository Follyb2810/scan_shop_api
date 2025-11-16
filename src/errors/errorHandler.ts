import { Response, NextFunction } from "express";
import { BaseError } from "./BaseError";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";

export const errorHandler = (
  err: unknown,
  res: Response,
  _next?: NextFunction
) => {
  console.error(`[Error]`, err);

  if (err instanceof BaseError) {
    return res.status(err.statusCode).json({
      success: false,
      status: err.status,
      message: err.message,
    });
  }

  if (err instanceof Error) {
    return res.status(500).json({
      success: false,
      status: "Server Error",
      message: err.message,
    });
  }
  if (err instanceof TokenExpiredError) {
    return res.status(401).json({
      success: false,
      status: "Server Error",
      message: "Token expired",
    });
  } else if (err instanceof JsonWebTokenError) {
    return res.status(401).json({
      success: false,
      status: "Server Error",
      message: "Invalid token",
    });
  }

  return res.status(500).json({
    success: false,
    status: "Server Error",
    message: typeof err === "string" ? err : "Something went wrong.",
  });
};
