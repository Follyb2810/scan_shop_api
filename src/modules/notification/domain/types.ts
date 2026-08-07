export const NOTIFICATION_CHANNELS = [
  "in_app",
  "email",
  "sms",
  "push",
  "webhook",
] as const;

export type NotificationChannel = (typeof NOTIFICATION_CHANNELS)[number];

export const NOTIFICATION_JOB = "deliver_notification";

export type NotificationJobPayload = {
  userId: string;
  channel: NotificationChannel;
  type: string;
  title: string;
  body?: string;
  data?: Record<string, unknown>;
};
