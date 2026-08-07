export { batchService } from "./application/batch.service";
export { batchOrgRouter } from "./presentation/routes";
export { registerBatchWorkflowHandlers } from "./infrastructure/workflow-hooks";
export {
  BATCH_QA_STATUSES,
  BATCH_RECALL_STATUSES,
  BATCH_EVENTS,
} from "./domain/statuses";

import { registerBatchWorkflowHandlers } from "./infrastructure/workflow-hooks";

registerBatchWorkflowHandlers();
