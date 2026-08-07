export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly details?: unknown;
  public readonly isOperational: boolean;

  constructor(
    message: string,
    options: {
      statusCode?: number;
      code?: string;
      details?: unknown;
      isOperational?: boolean;
    } = {}
  ) {
    super(message);
    this.name = "AppError";
    this.statusCode = options.statusCode ?? 500;
    this.code = options.code ?? "INTERNAL_ERROR";
    this.details = options.details;
    this.isOperational = options.isOperational ?? true;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Resource not found", details?: unknown) {
    super(message, { statusCode: 404, code: "NOT_FOUND", details });
    this.name = "NotFoundError";
  }
}

export class ValidationError extends AppError {
  constructor(message = "Validation failed", details?: unknown) {
    super(message, { statusCode: 400, code: "VALIDATION_ERROR", details });
    this.name = "ValidationError";
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized", details?: unknown) {
    super(message, { statusCode: 401, code: "UNAUTHORIZED", details });
    this.name = "UnauthorizedError";
  }
}

export class ForbiddenError extends AppError {
  constructor(message = "Forbidden", details?: unknown) {
    super(message, { statusCode: 403, code: "FORBIDDEN", details });
    this.name = "ForbiddenError";
  }
}

export class ConflictError extends AppError {
  constructor(message = "Conflict", details?: unknown) {
    super(message, { statusCode: 409, code: "CONFLICT", details });
    this.name = "ConflictError";
  }
}

export class TenantIsolationError extends AppError {
  constructor(message = "Tenant isolation violation", details?: unknown) {
    super(message, {
      statusCode: 403,
      code: "TENANT_ISOLATION_VIOLATION",
      details,
    });
    this.name = "TenantIsolationError";
  }
}
