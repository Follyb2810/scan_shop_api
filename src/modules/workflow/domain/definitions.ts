export type WorkflowDefinitionSeed = {
  key: string;
  name: string;
  description: string;
  subjectType: string;
  steps: Array<{
    stepOrder: number;
    name: string;
    requiredPermissionKey: string | null;
  }>;
};

/**
 * Reusable approval definitions. Other modules start instances by key —
 * they do not hardcode approve/reject status flips.
 */
export const WORKFLOW_DEFINITIONS: WorkflowDefinitionSeed[] = [
  {
    key: "organization.approval",
    name: "Organization onboarding approval",
    description: "Platform review before an organization becomes active",
    subjectType: "organization",
    steps: [
      {
        stepOrder: 1,
        name: "Platform approval",
        requiredPermissionKey: "platform.organizations.approve",
      },
    ],
  },
  {
    key: "manufacturer.approval",
    name: "Manufacturer onboarding approval",
    description: "Platform review for manufacturer organizations",
    subjectType: "organization",
    steps: [
      {
        stepOrder: 1,
        name: "Platform manufacturer approval",
        requiredPermissionKey: "platform.organizations.approve",
      },
    ],
  },
  {
    key: "product.approval",
    name: "Product catalog approval",
    description: "Approve submitted catalog products",
    subjectType: "product",
    steps: [
      {
        stepOrder: 1,
        name: "Product review",
        requiredPermissionKey: "product.approve",
      },
    ],
  },
  {
    key: "marketplace.listing.approval",
    name: "Marketplace listing approval",
    description: "Moderate marketplace listings before publish",
    subjectType: "listing",
    steps: [
      {
        stepOrder: 1,
        name: "Listing moderation",
        requiredPermissionKey: "platform.moderation.manage",
      },
    ],
  },
  {
    key: "batch.qa.approval",
    name: "Batch QA approval",
    description: "Approve manufacturing batch QA release",
    subjectType: "batch",
    steps: [
      {
        stepOrder: 1,
        name: "QA review",
        requiredPermissionKey: "batch.qa.manage",
      },
    ],
  },
  {
    key: "recall.approval",
    name: "Recall approval",
    description: "Approve batch recall workflows",
    subjectType: "recall",
    steps: [
      {
        stepOrder: 1,
        name: "Recall authorization",
        requiredPermissionKey: "batch.recall.manage",
      },
    ],
  },
  {
    key: "custody.transfer.approval",
    name: "Custody transfer approval",
    description: "Approve inter-org custody transfers before shipping",
    subjectType: "custody_transfer",
    steps: [
      {
        stepOrder: 1,
        name: "Sender approval",
        requiredPermissionKey: "supply_chain.approve",
      },
    ],
  },
  {
    key: "inventory.approval",
    name: "Inventory adjustment approval",
    description: "Approve sensitive inventory adjustments",
    subjectType: "inventory",
    steps: [
      {
        stepOrder: 1,
        name: "Inventory approval",
        requiredPermissionKey: "inventory.approve",
      },
    ],
  },
];

export const WORKFLOW_EVENTS = {
  INSTANCE_STARTED: "workflow.instance.started",
  INSTANCE_COMPLETED: "workflow.instance.completed",
  ACTION_RECORDED: "workflow.action.recorded",
} as const;

export type WorkflowInstanceCompletedPayload = {
  instanceId: string;
  definitionKey: string;
  subjectType: string;
  subjectId: string;
  organizationId: string | null;
  status: "approved" | "rejected" | "cancelled";
  actorUserId: string;
};
