import { Response } from "express";
/**
 * Legacy controller helper: `errorHandler(err, res)`.
 * Prefer `next(err)` + middleware `errorHandler` in new modules.
 */
export declare function errorHandler(err: unknown, res: Response): Response;
//# sourceMappingURL=errorHandler.d.ts.map