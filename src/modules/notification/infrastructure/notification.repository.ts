import { prisma } from "../../../infrastructure/database";
import { BaseRepository } from "../../../infrastructure/database/base.repository";

export class NotificationRepository extends BaseRepository {
  create(data: {
    userId: string;
    channel: string;
    type: string;
    title: string;
    body?: string | null;
    dataJson?: string | null;
    status?: string;
  }) {
    return this.db.notification.create({
      data: {
        userId: data.userId,
        channel: data.channel,
        type: data.type,
        title: data.title,
        body: data.body ?? null,
        dataJson: data.dataJson ?? null,
        status: data.status ?? "pending",
      },
    });
  }

  update(
    id: string,
    data: {
      status?: string;
      sentAt?: Date | null;
      readAt?: Date | null;
    }
  ) {
    return this.db.notification.update({ where: { id }, data });
  }

  listForUser(userId: string, take = 50) {
    return this.db.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take,
    });
  }

  findForUser(userId: string, id: string) {
    return this.db.notification.findFirst({ where: { id, userId } });
  }

  markAllRead(userId: string) {
    return this.db.notification.updateMany({
      where: { userId, status: { not: "read" }, channel: "in_app" },
      data: { status: "read", readAt: new Date() },
    });
  }

  findUserIdsInOrg(organizationId: string) {
    return this.db.membership.findMany({
      where: { organizationId, status: "active" },
      select: { userId: true },
    });
  }
}

export const notificationRepository = new NotificationRepository(prisma);
