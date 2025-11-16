import { BaseError } from "./BaseError";

export class NotFoundError extends BaseError {
  constructor(message = "Resource not found") {
    super(message, "Not Found", 404);
  }
}

export class ValidationError extends BaseError {
  constructor(message = "Invalid input") {
    super(message, "Bad Request", 400);
  }
}

export class UnauthorizedError extends BaseError {
  constructor(message = "Unauthorized") {
    super(message, "Unauthorized", 401);
  }
}
