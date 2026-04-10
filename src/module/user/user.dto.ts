import { User, Role, UserRole } from "../../generated/prisma/client";
import { UserWithRoles } from "./user.type";

export interface UserDto {}

export const userResponseDto = (user: UserWithRoles) => ({
  id: user.id,
  email: user.email,
  firstName: user.firstName,
  lastName: user.lastName,
  phoneNumber: user.phoneNumber,
  roles: user.userRoles.map((u) => u.role.name),
});
