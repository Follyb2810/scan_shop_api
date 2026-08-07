/** Identity domain vocabulary (Step 4) */
export type UserStatus = "active" | "disabled" | "pending_verification";

export type AuthSession = {
  id: string;
  userId: string;
  deviceId?: string | null;
  expiresAt: Date;
  revokedAt?: Date | null;
};
