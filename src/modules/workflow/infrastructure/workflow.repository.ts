import { prisma } from "../../../infrastructure/database";
import { BaseRepository } from "../../../infrastructure/database/base.repository";

const definitionInclude = {
  steps: { orderBy: { stepOrder: "asc" as const } },
} as const;

const instanceInclude = {
  definition: { include: definitionInclude },
  actions: {
    orderBy: { createdAt: "asc" as const },
    include: {
      actor: {
        select: { id: true, email: true, firstName: true, lastName: true },
      },
    },
  },
} as const;

export class WorkflowRepository extends BaseRepository {
  listDefinitions() {
    return this.db.workflowDefinition.findMany({
      where: { isActive: true },
      include: definitionInclude,
      orderBy: { key: "asc" },
    });
  }

  findDefinitionByKey(key: string) {
    return this.db.workflowDefinition.findFirst({
      where: { key, isActive: true },
      include: definitionInclude,
    });
  }

  findInstanceById(id: string) {
    return this.db.workflowInstance.findUnique({
      where: { id },
      include: instanceInclude,
    });
  }

  findOpenInstance(subjectType: string, subjectId: string, definitionKey?: string) {
    return this.db.workflowInstance.findFirst({
      where: {
        subjectType,
        subjectId,
        status: "pending",
        ...(definitionKey
          ? { definition: { key: definitionKey } }
          : {}),
      },
      include: instanceInclude,
      orderBy: { createdAt: "desc" },
    });
  }

  listInstances(filters: {
    status?: string;
    subjectType?: string;
    subjectId?: string;
    organizationId?: string;
    definitionKey?: string;
    take?: number;
  }) {
    return this.db.workflowInstance.findMany({
      where: {
        status: filters.status,
        subjectType: filters.subjectType,
        subjectId: filters.subjectId,
        organizationId: filters.organizationId,
        ...(filters.definitionKey
          ? { definition: { key: filters.definitionKey } }
          : {}),
      },
      include: instanceInclude,
      orderBy: { createdAt: "desc" },
      take: filters.take ?? 50,
    });
  }

  createInstance(data: {
    definitionId: string;
    subjectType: string;
    subjectId: string;
    organizationId?: string | null;
    startedByUserId?: string | null;
    currentStep?: number;
  }) {
    return this.db.workflowInstance.create({
      data: {
        definitionId: data.definitionId,
        subjectType: data.subjectType,
        subjectId: data.subjectId,
        organizationId: data.organizationId ?? null,
        startedByUserId: data.startedByUserId ?? null,
        status: "pending",
        currentStep: data.currentStep ?? 1,
      },
      include: instanceInclude,
    });
  }

  async recordActionAndUpdate(data: {
    instanceId: string;
    actorUserId: string;
    stepOrder: number;
    decision: string;
    comment?: string | null;
    nextStatus: string;
    nextStep: number;
    completedAt?: Date | null;
  }) {
    await this.db.workflowAction.create({
      data: {
        instanceId: data.instanceId,
        actorUserId: data.actorUserId,
        stepOrder: data.stepOrder,
        decision: data.decision,
        comment: data.comment ?? null,
      },
    });

    return this.db.workflowInstance.update({
      where: { id: data.instanceId },
      data: {
        status: data.nextStatus,
        currentStep: data.nextStep,
        completedAt: data.completedAt ?? undefined,
      },
      include: instanceInclude,
    });
  }
}

export const workflowRepository = new WorkflowRepository(prisma);
