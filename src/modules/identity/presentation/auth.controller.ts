import { Request, Response } from "express";
import { asyncHandler, sendSuccess } from "../../../shared/http";
import { authService } from "../application/auth.service";

function metaFrom(req: Request) {
  return {
    ipAddress: req.ip,
    userAgent: req.get("user-agent") ?? undefined,
  };
}

export const AuthController = {
  register: asyncHandler(async (req: Request, res: Response) => {
    const result = await authService.register(req.body, metaFrom(req));
    sendSuccess(res, result, 201);
  }),

  login: asyncHandler(async (req: Request, res: Response) => {
    const result = await authService.login(req.body, metaFrom(req));
    sendSuccess(res, result);
  }),

  refresh: asyncHandler(async (req: Request, res: Response) => {
    const result = await authService.refresh(req.body.refreshToken, metaFrom(req));
    sendSuccess(res, result);
  }),

  logout: asyncHandler(async (req: Request, res: Response) => {
    await authService.logout(req.context!.userId!, req.body ?? {});
    sendSuccess(res, { loggedOut: true });
  }),

  verifyEmail: asyncHandler(async (req: Request, res: Response) => {
    const user = await authService.verifyEmail(req.body.token);
    sendSuccess(res, { user });
  }),

  forgotPassword: asyncHandler(async (req: Request, res: Response) => {
    const result = await authService.forgotPassword(req.body.email);
    sendSuccess(res, {
      message: "If that email exists, a reset link has been sent.",
      ...result,
    });
  }),

  resetPassword: asyncHandler(async (req: Request, res: Response) => {
    await authService.resetPassword(req.body.token, req.body.password);
    sendSuccess(res, { reset: true });
  }),

  me: asyncHandler(async (req: Request, res: Response) => {
    const user = await authService.me(req.context!.userId!);
    sendSuccess(res, {
      user,
      context: {
        actorMode: req.context?.actorMode,
        organizationId: req.context?.organizationId,
        permissions: req.context?.permissions,
        platformRoles: req.context?.platformRoles,
      },
    });
  }),

  sessions: asyncHandler(async (req: Request, res: Response) => {
    const sessions = await authService.listSessions(req.context!.userId!);
    sendSuccess(res, { sessions });
  }),

  revokeSession: asyncHandler(async (req: Request, res: Response) => {
    await authService.revokeSession(req.context!.userId!, req.params.id);
    sendSuccess(res, { revoked: true });
  }),

  devices: asyncHandler(async (req: Request, res: Response) => {
    const devices = await authService.listDevices(req.context!.userId!);
    sendSuccess(res, { devices });
  }),

  loginHistory: asyncHandler(async (req: Request, res: Response) => {
    const history = await authService.loginHistory(req.context!.userId!);
    sendSuccess(res, { history });
  }),

  setup2fa: asyncHandler(async (req: Request, res: Response) => {
    const result = await authService.setup2fa(req.context!.userId!);
    sendSuccess(res, result);
  }),

  enable2fa: asyncHandler(async (req: Request, res: Response) => {
    await authService.enable2fa(req.context!.userId!, req.body.totpCode);
    sendSuccess(res, { enabled: true });
  }),

  disable2fa: asyncHandler(async (req: Request, res: Response) => {
    await authService.disable2fa(
      req.context!.userId!,
      req.body.totpCode,
      req.body.password
    );
    sendSuccess(res, { disabled: true });
  }),
};
