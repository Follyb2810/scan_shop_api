import { NextFunction, Request, RequestHandler, Response } from "express";
import { AuthRequest } from "./auth.middleware";
import { prisma } from "../config/prisma-client";

export enum TRole {
  ADMIN = "ADMIN",
  MODERATOR = "MODERATOR",
  MANUFACTURER = "MANUFACTURER",
  USER = "USER",
}

export const verifyRole = (...allowRoles: TRole[]): RequestHandler => {
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

    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    const userRoles = user.userRoles.map((ur) => ur.role.name);

    const hasRole = userRoles.some((role) =>
      allowRoles.includes(role as TRole)
    );

    if (!hasRole) {
      return res.status(403).json({
        message: "Access denied: Insufficient privileges.",
      });
    }

    next();
  };
};
