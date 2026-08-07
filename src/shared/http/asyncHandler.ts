import expressAsyncHandler from "express-async-handler";

/**
 * Wrap async Express handlers so rejected promises reach the error middleware.
 * Uses the `express-async-handler` package.
 */
export const asyncHandler = expressAsyncHandler;
