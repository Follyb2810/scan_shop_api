export { organizationService } from "./application/organization.service";
export { organizationRouter } from "./presentation/routes";
export { seedOrganizationTypes } from "./infrastructure/seed-types";
export { registerOrganizationWorkflowHandlers } from "./infrastructure/workflow-hooks";
export { ORGANIZATION_TYPES } from "./domain/organization-types";

import { registerOrganizationWorkflowHandlers } from "./infrastructure/workflow-hooks";

// Ensure org status flips when workflows complete (tests use createApp without full bootstrap).
registerOrganizationWorkflowHandlers();
