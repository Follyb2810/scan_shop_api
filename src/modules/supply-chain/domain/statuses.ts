export const TRANSFER_STATUSES = [
  "draft",
  "submitted",
  "approved",
  "in_transit",
  "received",
  "rejected",
  "cancelled",
] as const;

export type TransferStatus = (typeof TRANSFER_STATUSES)[number];

export const TRANSFER_EVENTS = {
  CREATED: "custody.transfer.created",
  SUBMITTED: "custody.transfer.submitted",
  APPROVED: "custody.transfer.approved",
  SHIPPED: "custody.transfer.shipped",
  RECEIVED: "custody.transfer.received",
  REJECTED: "custody.transfer.rejected",
  CANCELLED: "custody.transfer.cancelled",
} as const;
