export type PublicUser = {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  phoneNumber: string | null;
  status: string;
  emailVerifiedAt: Date | null;
  isActive: boolean;
  createdAt: Date;
};

export function toPublicUser(user: {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  phoneNumber: string | null;
  status: string;
  emailVerifiedAt: Date | null;
  isActive: boolean;
  createdAt: Date;
}): PublicUser {
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    phoneNumber: user.phoneNumber,
    status: user.status,
    emailVerifiedAt: user.emailVerifiedAt,
    isActive: user.isActive,
    createdAt: user.createdAt,
  };
}

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
};
