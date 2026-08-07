import { prisma } from "../../../infrastructure/database";
import { logger } from "../../../config/logger";
import { WORKFLOW_DEFINITIONS } from "../domain/definitions";

/**
 * Idempotent seed of workflow definitions + steps.
 * Avoids interactive transactions (SQLite lock safety).
 */
export async function seedWorkflowDefinitions(): Promise<void> {
  for (const def of WORKFLOW_DEFINITIONS) {
    const existing = await prisma.workflowDefinition.findUnique({
      where: { key: def.key },
      include: { steps: true },
    });

    if (!existing) {
      const created = await prisma.workflowDefinition.create({
        data: {
          key: def.key,
          name: def.name,
          description: def.description,
          subjectType: def.subjectType,
          isActive: true,
        },
      });

      for (const step of def.steps) {
        await prisma.workflowStepDefinition.create({
          data: {
            definitionId: created.id,
            stepOrder: step.stepOrder,
            name: step.name,
            requiredPermissionKey: step.requiredPermissionKey,
          },
        });
      }
      continue;
    }

    await prisma.workflowDefinition.update({
      where: { id: existing.id },
      data: {
        name: def.name,
        description: def.description,
        subjectType: def.subjectType,
        isActive: true,
      },
    });

    for (const step of def.steps) {
      const found = existing.steps.find((s) => s.stepOrder === step.stepOrder);
      if (found) {
        await prisma.workflowStepDefinition.update({
          where: { id: found.id },
          data: {
            name: step.name,
            requiredPermissionKey: step.requiredPermissionKey,
          },
        });
      } else {
        await prisma.workflowStepDefinition.create({
          data: {
            definitionId: existing.id,
            stepOrder: step.stepOrder,
            name: step.name,
            requiredPermissionKey: step.requiredPermissionKey,
          },
        });
      }
    }
  }

  logger.info(
    { count: WORKFLOW_DEFINITIONS.length },
    "Workflow definitions seeded"
  );
}
