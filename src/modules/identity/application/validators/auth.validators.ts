import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(128),
  firstName: z.string().min(1).max(100).optional(),
  lastName: z.string().min(1).max(100).optional(),
  phoneNumber: z.string().min(5).max(30).optional(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  totpCode: z.string().length(6).optional(),
  deviceName: z.string().max(100).optional(),
  deviceFingerprint: z.string().max(200).optional(),
});

export const refreshSchema = z.object({
  refreshToken: z.string().min(20),
});

export const logoutSchema = z.object({
  refreshToken: z.string().min(20).optional(),
  sessionId: z.string().uuid().optional(),
});

export const verifyEmailSchema = z.object({
  token: z.string().min(20),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(20),
  password: z.string().min(8).max(128),
});

export const enable2faSchema = z.object({
  totpCode: z.string().length(6),
});

export const disable2faSchema = z.object({
  totpCode: z.string().length(6),
  password: z.string().min(1),
});
