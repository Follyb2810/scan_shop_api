export { catalogService } from "./application/catalog.service";
export { catalogRouter, catalogOrgRouter } from "./presentation/routes";
export { seedCatalogReferenceData } from "./infrastructure/seed";
export { registerCatalogWorkflowHandlers } from "./infrastructure/workflow-hooks";
export {
  MEDICINE_CATEGORIES,
  DOSAGE_FORMS,
  PACKAGING_TYPES,
} from "./domain/reference-data";

import { registerCatalogWorkflowHandlers } from "./infrastructure/workflow-hooks";

registerCatalogWorkflowHandlers();
