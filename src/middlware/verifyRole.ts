import { NextFunction, Request, RequestHandler, Response } from "express";
import prisma from "../config/prisma-client";
import { AuthRequest } from "./auth.middleware";

export const verifyRole = (...allowRoles: string[]): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const authReq = req as AuthRequest;
    const userId = authReq.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: No userId found" });
    }
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        userRoles: {
          include: {
            role: true,
          },
        },
      },
    });

    const userRoles = user?.userRoles.map((ur) => ur.role.name) || [];

    if (
      !userRoles.length ||
      !userRoles.some((role) => allowRoles.includes(role))
    ) {
      return res.status(403).json({
        message: "Access denied: Insufficient privileges.",
      });
    }

    next();
  };
};
