import { prisma } from "../../../infrastructure/database";
import { BaseRepository } from "../../../infrastructure/database/base.repository";

export class PaymentRepository extends BaseRepository {
  findOrder(orderId: string) {
    return this.db.order.findUnique({
      where: { id: orderId },
      include: {
        customer: { select: { id: true, userId: true } },
        payments: true,
      },
    });
  }

  findById(id: string) {
    return this.db.payment.findUnique({
      where: { id },
      include: {
        order: {
          select: {
            id: true,
            status: true,
            customerId: true,
            organizationId: true,
            total: true,
            currency: true,
          },
        },
      },
    });
  }

  findByExternalId(externalId: string) {
    return this.db.payment.findFirst({
      where: { externalId },
      include: { order: true },
    });
  }

  findByIdempotencyKey(key: string) {
    return this.db.payment.findUnique({ where: { idempotencyKey: key } });
  }

  create(data: {
    orderId: string;
    customerId?: string | null;
    organizationId?: string | null;
    provider: string;
    status: string;
    amount: number;
    currency: string;
    externalId?: string | null;
    idempotencyKey?: string | null;
    metadataJson?: string | null;
  }) {
    return this.db.payment.create({
      data: {
        orderId: data.orderId,
        customerId: data.customerId ?? null,
        organizationId: data.organizationId ?? null,
        provider: data.provider,
        status: data.status,
        amount: data.amount,
        currency: data.currency,
        externalId: data.externalId ?? null,
        idempotencyKey: data.idempotencyKey ?? null,
        metadataJson: data.metadataJson ?? null,
      },
    });
  }

  update(
    id: string,
    data: {
      status?: string;
      externalId?: string | null;
      failureReason?: string | null;
      paidAt?: Date | null;
      metadataJson?: string | null;
    }
  ) {
    return this.db.payment.update({ where: { id }, data });
  }

  markOrderPaid(orderId: string) {
    return this.db.order.update({
      where: { id: orderId },
      data: {
        status: "paid",
        paidAt: new Date(),
      },
    });
  }
}

export const paymentRepository = new PaymentRepository(prisma);
