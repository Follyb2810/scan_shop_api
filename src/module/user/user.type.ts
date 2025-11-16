import { User } from "@prisma/client";

export type TUserID = User["id"];
export type TUserRead = Omit<User, "createdAt" | "updatedAt" | "password">;

export type TUserCreate = Omit<
  User,
  "id" | "createdAt" | "updatedAt" | "password" | "role" | "isActive"
>;

export type TUserUpdate = Partial<Omit<TUserCreate, "id">>;
