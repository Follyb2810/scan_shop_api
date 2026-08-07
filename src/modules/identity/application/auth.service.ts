import { createHash, randomUUID } from "crypto";
import { env } from "../../../config/env";
import { logger } from "../../../config/logger";
import {
  ConflictError,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
  ValidationError,
} from "../../../shared/errors";
import { hashPwd, ComparePassword } from "../../../utils/bcrypt";
import { AuthTokens, PublicUser, toPublicUser } from "./dto/auth.dto";
import { identityRepository, IdentityRepository } from "../infrastructure/identity.repository";
import {
  generateOpaqueToken,
  hashToken,
  refreshExpiryDate,
  sessionExpiryDate,
  signAccessToken,
} from "../infrastructure/token.service";
import {
  buildOtpAuthUrl,
  generateTotpSecret,
  verifyTotp,
} from "../infrastructure/totp.service";

export type RequestMeta = {
  ipAddress?: string;
  userAgent?: string;
};

export class AuthService {
  constructor(private readonly repo: IdentityRepository = identityRepository) {}

  async register(
    input: {
      email: string;
      password: string;
      firstName?: string;
      lastName?: string;
      phoneNumber?: string;
    },
    meta: RequestMeta = {}
  ): Promise<{
    user: PublicUser;
    tokens: AuthTokens;
    emailVerificationToken?: string;
  }> {
    const existing = await this.repo.findByEmail(input.email);
    if (existing) {
      throw new ConflictError("Email already in use");
    }

    const passwordHash = await hashPwd(input.password);
    const user = await this.repo.createUser({
      email: input.email,
      password: passwordHash,
      firstName: input.firstName,
      lastName: input.lastName,
      phoneNumber: input.phoneNumber,
      status: "pending_verification",
    });

    const emailVerificationToken = await this.issueEmailVerification(user.id);
    const tokens = await this.issueSession(user.id, user.email, meta);

    await this.repo.addLoginHistory({
      userId: user.id,
      ipAddress: meta.ipAddress,
      userAgent: meta.userAgent,
      success: true,
      reason: "register",
    });

    return {
      user: toPublicUser(user),
      tokens,
      ...(this.exposeDevTokens()
        ? { emailVerificationToken }
        : {}),
    };
  }

  async login(
    input: {
      email: string;
      password: string;
      totpCode?: string;
      deviceName?: string;
      deviceFingerprint?: string;
    },
    meta: RequestMeta = {}
  ): Promise<{ user: PublicUser; tokens: AuthTokens }> {
    const user = await this.repo.findByEmail(input.email);
    if (!user || user.deletedAt) {
      await this.safeFailHistory(user?.id, meta, "invalid_credentials");
      throw new UnauthorizedError("Invalid email or password");
    }

    if (!user.isActive || user.status === "disabled") {
      await this.repo.addLoginHistory({
        userId: user.id,
        ...meta,
        success: false,
        reason: "disabled",
      });
      throw new ForbiddenError("User account is disabled");
    }

    const valid = await ComparePassword(input.password, user.password);
    if (!valid) {
      await this.repo.addLoginHistory({
        userId: user.id,
        ...meta,
        success: false,
        reason: "invalid_credentials",
      });
      throw new UnauthorizedError("Invalid email or password");
    }

    const twoFactor = await this.repo.getTwoFactor(user.id);
    if (twoFactor?.enabled) {
      if (!input.totpCode || !verifyTotp(input.totpCode, twoFactor.secret)) {
        await this.repo.addLoginHistory({
          userId: user.id,
          ...meta,
          success: false,
          reason: "invalid_2fa",
        });
        throw new UnauthorizedError("Invalid two-factor code");
      }
    }

    const tokens = await this.issueSession(user.id, user.email, meta, {
      deviceName: input.deviceName,
      deviceFingerprint: input.deviceFingerprint,
    });

    await this.repo.addLoginHistory({
      userId: user.id,
      ...meta,
      success: true,
      reason: "login",
    });

    return { user: toPublicUser(user), tokens };
  }

  async refresh(
    refreshTokenRaw: string,
    meta: RequestMeta = {}
  ): Promise<{ tokens: AuthTokens }> {
    const tokenHash = hashToken(refreshTokenRaw);
    const existing = await this.repo.findRefreshByHash(tokenHash);

    if (!existing) {
      throw new UnauthorizedError("Invalid refresh token");
    }

    // Reuse detection: revoked token presented again → revoke family
    if (existing.revokedAt) {
      await this.repo.revokeRefreshFamily(existing.familyId);
      logger.warn(
        { userId: existing.userId, familyId: existing.familyId },
        "Refresh token reuse detected — family revoked"
      );
      throw new UnauthorizedError("Refresh token reuse detected");
    }

    if (existing.expiresAt.getTime() < Date.now()) {
      await this.repo.revokeRefreshToken(existing.id);
      throw new UnauthorizedError("Refresh token expired");
    }

    if (!existing.user.isActive || existing.user.deletedAt) {
      await this.repo.revokeRefreshFamily(existing.familyId);
      throw new ForbiddenError("User account is not active");
    }

    const newRaw = generateOpaqueToken();
    const newHash = hashToken(newRaw);
    const expiresAt = refreshExpiryDate();

    const created = await this.repo.createRefreshToken({
      userId: existing.userId,
      sessionId: existing.sessionId ?? undefined,
      tokenHash: newHash,
      familyId: existing.familyId,
      expiresAt,
    });

    await this.repo.revokeRefreshToken(existing.id, created.id);

    const accessToken = signAccessToken(existing.userId, existing.user.email);

    void meta;

    return {
      tokens: {
        accessToken,
        refreshToken: newRaw,
        expiresIn: env.JWT_ACCESS_EXPIRES_IN,
      },
    };
  }

  async logout(
    userId: string,
    input: { refreshToken?: string; sessionId?: string }
  ): Promise<void> {
    if (input.refreshToken) {
      const existing = await this.repo.findRefreshByHash(
        hashToken(input.refreshToken)
      );
      if (existing && existing.userId === userId) {
        await this.repo.revokeRefreshFamily(existing.familyId);
        if (existing.sessionId) {
          await this.repo.revokeSession(existing.sessionId, userId);
        }
      }
    }

    if (input.sessionId) {
      await this.repo.revokeSession(input.sessionId, userId);
    }

    if (!input.refreshToken && !input.sessionId) {
      await this.repo.revokeAllUserRefresh(userId);
    }
  }

  async verifyEmail(tokenRaw: string): Promise<PublicUser> {
    const record = await this.repo.findEmailVerificationToken(
      hashToken(tokenRaw)
    );
    if (!record || record.usedAt || record.expiresAt.getTime() < Date.now()) {
      throw new ValidationError("Invalid or expired verification token");
    }

    await this.repo.markEmailTokenUsed(record.id);
    const user = await this.repo.markEmailVerified(record.userId);
    return toPublicUser(user);
  }

  async forgotPassword(email: string): Promise<{ resetToken?: string }> {
    const user = await this.repo.findByEmail(email);
    // Always succeed to avoid email enumeration
    if (!user) {
      return {};
    }

    const raw = generateOpaqueToken();
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
    await this.repo.createPasswordResetToken(user.id, hashToken(raw), expiresAt);

    logger.info({ userId: user.id }, "Password reset token issued");

    return this.exposeDevTokens() ? { resetToken: raw } : {};
  }

  async resetPassword(tokenRaw: string, password: string): Promise<void> {
    const record = await this.repo.findPasswordResetToken(hashToken(tokenRaw));
    if (!record || record.usedAt || record.expiresAt.getTime() < Date.now()) {
      throw new ValidationError("Invalid or expired reset token");
    }

    const passwordHash = await hashPwd(password);
    await this.repo.updatePassword(record.userId, passwordHash);
    await this.repo.markPasswordResetUsed(record.id);
    await this.repo.revokeAllUserRefresh(record.userId);
  }

  async me(userId: string): Promise<PublicUser> {
    const user = await this.repo.findById(userId);
    if (!user) throw new NotFoundError("User not found");
    return toPublicUser(user);
  }

  async listSessions(userId: string) {
    return this.repo.listSessions(userId);
  }

  async revokeSession(userId: string, sessionId: string) {
    const result = await this.repo.revokeSession(sessionId, userId);
    if (result.count === 0) {
      throw new NotFoundError("Session not found");
    }
  }

  async listDevices(userId: string) {
    return this.repo.listDevices(userId);
  }

  async loginHistory(userId: string) {
    return this.repo.listLoginHistory(userId);
  }

  async setup2fa(userId: string) {
    const user = await this.repo.findById(userId);
    if (!user) throw new NotFoundError("User not found");

    const secret = generateTotpSecret();
    await this.repo.upsertTwoFactorSecret(userId, secret);
    return {
      secret,
      otpauthUrl: buildOtpAuthUrl(user.email, secret),
    };
  }

  async enable2fa(userId: string, totpCode: string) {
    const record = await this.repo.getTwoFactor(userId);
    if (!record) {
      throw new ValidationError("Call 2FA setup first");
    }
    if (!verifyTotp(totpCode, record.secret)) {
      throw new UnauthorizedError("Invalid two-factor code");
    }
    await this.repo.enableTwoFactor(userId);
  }

  async disable2fa(userId: string, totpCode: string, password: string) {
    const user = await this.repo.findById(userId);
    if (!user) throw new NotFoundError("User not found");

    const valid = await ComparePassword(password, user.password);
    if (!valid) throw new UnauthorizedError("Invalid password");

    const record = await this.repo.getTwoFactor(userId);
    if (!record?.enabled) {
      throw new ValidationError("Two-factor authentication is not enabled");
    }
    if (!verifyTotp(totpCode, record.secret)) {
      throw new UnauthorizedError("Invalid two-factor code");
    }
    await this.repo.disableTwoFactor(userId);
  }

  private async issueEmailVerification(userId: string): Promise<string> {
    const raw = generateOpaqueToken();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
    await this.repo.createEmailVerificationToken(
      userId,
      hashToken(raw),
      expiresAt
    );
    return raw;
  }

  private async issueSession(
    userId: string,
    email: string,
    meta: RequestMeta,
    device?: { deviceName?: string; deviceFingerprint?: string }
  ): Promise<AuthTokens> {
    let deviceId: string | undefined;
    if (device?.deviceName || device?.deviceFingerprint) {
      const created = await this.repo.createDevice(
        userId,
        device.deviceName,
        device.deviceFingerprint
      );
      deviceId = created.id;
    }

    const session = await this.repo.createSession({
      userId,
      deviceId,
      ipAddress: meta.ipAddress,
      userAgent: meta.userAgent,
      expiresAt: sessionExpiryDate(),
    });

    const familyId = randomUUID();
    const refreshRaw = generateOpaqueToken();
    await this.repo.createRefreshToken({
      userId,
      sessionId: session.id,
      tokenHash: hashToken(refreshRaw),
      familyId,
      expiresAt: refreshExpiryDate(),
    });

    return {
      accessToken: signAccessToken(userId, email),
      refreshToken: refreshRaw,
      expiresIn: env.JWT_ACCESS_EXPIRES_IN,
    };
  }

  private exposeDevTokens(): boolean {
    return env.NODE_ENV !== "production";
  }

  private async safeFailHistory(
    userId: string | undefined,
    meta: RequestMeta,
    reason: string
  ) {
    if (!userId) return;
    await this.repo.addLoginHistory({
      userId,
      ...meta,
      success: false,
      reason,
    });
  }
}

export const authService = new AuthService();

/** Deterministic helper for tests that need hashed comparisons */
export function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}
