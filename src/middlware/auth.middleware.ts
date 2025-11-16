import { Response, NextFunction, Request } from "express";
import { JwtService } from "../utils/jwt";

export interface AuthRequest extends Request {
  userId?: string;
}

const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      res.status(401).json({
        success: false,
        message: "No token provided",
      });
      return;
    }

    const decoded = JwtService.verifyToken(token);

    if (!decoded) {
      res.status(401).json({
        success: false,
        message: "Invalid token",
      });
      return;
    }

    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Authentication failed",
    });
  }
};

export default authMiddleware;
