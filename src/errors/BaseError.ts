export class BaseError extends Error {
  public status: string;
  public statusCode: number;

  constructor(
    message = "Unknown error",
    status = "Server Error",
    statusCode = 500
  ) {
    super(message);
    this.status = status;
    this.statusCode = statusCode;

    this.name = new.target.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
