export const AUDIT_ACTIONS = {
  HTTP_MUTATION: "http.mutation",
  ORGANIZATION_CREATED: "organization.created",
  ORGANIZATION_STATUS_CHANGED: "organization.status_changed",
  WORKFLOW_COMPLETED: "workflow.completed",
  LISTING_CREATED: "marketplace.listing.created",
  LISTING_PUBLISHED: "marketplace.listing.published",
  LISTING_REJECTED: "marketplace.listing.rejected",
  ORDER_CREATED: "marketplace.order.created",
  ORDER_FULFILLED: "marketplace.order.fulfilled",
  CUSTODY_TRANSFER_CREATED: "custody.transfer.created",
  CUSTODY_TRANSFER_APPROVED: "custody.transfer.approved",
  CUSTODY_TRANSFER_SHIPPED: "custody.transfer.shipped",
  CUSTODY_TRANSFER_RECEIVED: "custody.transfer.received",
  BATCH_QA_CHANGED: "batch.qa_changed",
  BATCH_RECALL_CHANGED: "batch.recall_changed",
} as const;

export type AuditAction =
  (typeof AUDIT_ACTIONS)[keyof typeof AUDIT_ACTIONS] | (string & {});

export type RecordAuditInput = {
  action: string;
  actorUserId?: string | null;
  organizationId?: string | null;
  branchId?: string | null;
  warehouseId?: string | null;
  entityType?: string | null;
  entityId?: string | null;
  oldValue?: unknown;
  newValue?: unknown;
  ipAddress?: string | null;
  userAgent?: string | null;
  city?: string | null;
  country?: string | null;
  requestId?: string | null;
  metadata?: Record<string, unknown> | null;
};
