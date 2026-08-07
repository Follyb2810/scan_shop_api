export const BATCH_QA_STATUSES = [
  "pending",
  "in_review",
  "passed",
  "failed",
] as const;

export type BatchQaStatus = (typeof BATCH_QA_STATUSES)[number];

export const BATCH_RECALL_STATUSES = ["none", "pending", "recalled"] as const;

export type BatchRecallStatus = (typeof BATCH_RECALL_STATUSES)[number];

/** Allowed direct QA transitions (permission-gated). */
export const QA_TRANSITIONS: Record<BatchQaStatus, BatchQaStatus[]> = {
  pending: ["in_review", "passed", "failed"],
  in_review: ["passed", "failed", "pending"],
  passed: ["failed"], // can reverse to failed if issue found
  failed: ["in_review", "pending"],
};

export const BATCH_EVENTS = {
  CREATED: "batch.created",
  QA_UPDATED: "batch.qa.updated",
  RECALL_UPDATED: "batch.recall.updated",
} as const;
