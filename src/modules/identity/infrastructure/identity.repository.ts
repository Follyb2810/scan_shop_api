import { prisma } from "../../../infrastructure/database";
import { BaseRepository } from "../../../infrastructure/database/base.repository";

export class IdentityRepository extends BaseRepository {
  findByEmail(email: string) {
    return this.db.user.findFirst({
      where: { email: email.toLowerCase(), deletedAt: null },
    });
  }

  findById(id: string) {
    return this.db.user.findFirst({
      where: { id, deletedAt: null },
    });
  }

  createUser(data: {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    status?: string;
  }) {
    return this.db.user.create({
      data: {
        email: data.email.toLowerCase(),
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        status: data.status ?? "pending_verification",
        isActive: true,
      },
    });
  }

  markEmailVerified(userId: string) {
    return this.db.user.update({
      where: { id: userId },
      data: {
        emailVerifiedAt: new Date(),
        status: "active",
      },
    });
  }

  updatePassword(userId: string, passwordHash: string) {
    return this.db.user.update({
      where: { id: userId },
      data: { password: passwordHash },
    });
  }

  createDevice(userId: string, name?: string, fingerprint?: string) {
    return this.db.device.create({
      data: {
        userId,
        name,
        fingerprint,
        lastSeenAt: new Date(),
      },
    });
  }

  listDevices(userId: string) {
    return this.db.device.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  }

  touchDevice(deviceId: string) {
    return this.db.device.update({
      where: { id: deviceId },
      data: { lastSeenAt: new Date() },
    });
  }

  createSession(data: {
    userId: string;
    deviceId?: string;
    ipAddress?: string;
    userAgent?: string;
    expiresAt: Date;
  }) {
    return this.db.session.create({ data });
  }

  listSessions(userId: string) {
    return this.db.session.findMany({
      where: { userId, revokedAt: null },
      orderBy: { createdAt: "desc" },
    });
  }

  revokeSession(sessionId: string, userId: string) {
    return this.db.session.updateMany({
      where: { id: sessionId, userId, revokedAt: null },
      data: { revokedAt: new Date() },
    });
  }

  createRefreshToken(data: {
    userId: string;
    sessionId?: string;
    tokenHash: string;
    familyId: string;
    expiresAt: Date;
  }) {
    return this.db.refreshToken.create({ data });
  }

  findRefreshByHash(tokenHash: string) {
    return this.db.refreshToken.findUnique({
      where: { tokenHash },
      include: { user: true, session: true },
    });
  }

  revokeRefreshFamily(familyId: string) {
    return this.db.refreshToken.updateMany({
      where: { familyId, revokedAt: null },
      data: { revokedAt: new Date() },
    });
  }

  revokeRefreshToken(id: string, replacedByToken?: string) {
    return this.db.refreshToken.update({
      where: { id },
      data: {
        revokedAt: new Date(),
        replacedByToken,
      },
    });
  }

  revokeAllUserRefresh(userId: string) {
    return this.db.refreshToken.updateMany({
      where: { userId, revokedAt: null },
      data: { revokedAt: new Date() },
    });
  }

  addLoginHistory(data: {
    userId: string;
    ipAddress?: string;
    userAgent?: string;
    success: boolean;
    reason?: string;
  }) {
    return this.db.loginHistory.create({ data });
  }

  listLoginHistory(userId: string, take = 50) {
    return this.db.loginHistory.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take,
    });
  }

  createEmailVerificationToken(userId: string, tokenHash: string, expiresAt: Date) {
    return this.db.emailVerificationToken.create({
      data: { userId, tokenHash, expiresAt },
    });
  }

  findEmailVerificationToken(tokenHash: string) {
    return this.db.emailVerificationToken.findUnique({
      where: { tokenHash },
    });
  }

  markEmailTokenUsed(id: string) {
    return this.db.emailVerificationToken.update({
      where: { id },
      data: { usedAt: new Date() },
    });
  }

  createPasswordResetToken(userId: string, tokenHash: string, expiresAt: Date) {
    return this.db.passwordResetToken.create({
      data: { userId, tokenHash, expiresAt },
    });
  }

  findPasswordResetToken(tokenHash: string) {
    return this.db.passwordResetToken.findUnique({
      where: { tokenHash },
    });
  }

  markPasswordResetUsed(id: string) {
    return this.db.passwordResetToken.update({
      where: { id },
      data: { usedAt: new Date() },
    });
  }

  upsertTwoFactorSecret(userId: string, secret: string) {
    return this.db.twoFactorSecret.upsert({
      where: { userId },
      create: { userId, secret, enabled: false },
      update: { secret, enabled: false },
    });
  }

  getTwoFactor(userId: string) {
    return this.db.twoFactorSecret.findUnique({ where: { userId } });
  }

  enableTwoFactor(userId: string) {
    return this.db.twoFactorSecret.update({
      where: { userId },
      data: { enabled: true },
    });
  }

  disableTwoFactor(userId: string) {
    return this.db.twoFactorSecret.deleteMany({ where: { userId } });
  }
}

export const identityRepository = new IdentityRepository(prisma);
