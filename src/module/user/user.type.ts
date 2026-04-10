import { Prisma, Role, User, UserRole } from "../../generated/prisma/client";

export type TUserID = User["id"];
export type TUserRead = Omit<User, "createdAt" | "updatedAt" | "password">;

export type TUserCreate = Omit<
  User,
  "id" | "createdAt" | "updatedAt" | "password" | "role" | "isActive"
>;
export type TUserUpdate = Partial<Omit<TUserCreate, "id">>;

export type TUserResponse = { user: User; refreshToken: string };
export interface CreateUserBody {
  email: string;
  password: string;
}

export type UserWithRoles = User & {
  userRoles: Array<
    UserRole & {
      role: Role;
    }
  >;
};

export type UserWithRolesP = Prisma.UserGetPayload<{
  include: { userRoles: { include: { role: true } } };
}>;
