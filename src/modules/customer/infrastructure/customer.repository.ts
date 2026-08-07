import { prisma } from "../../../infrastructure/database";
import { BaseRepository } from "../../../infrastructure/database/base.repository";

export class CustomerRepository extends BaseRepository {
  findUser(userId: string) {
    return this.db.user.findFirst({
      where: { id: userId, deletedAt: null },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phoneNumber: true,
      },
    });
  }

  findByUserId(userId: string) {
    return this.db.customerProfile.findUnique({
      where: { userId },
      include: {
        addresses: { orderBy: [{ isDefault: "desc" }, { createdAt: "desc" }] },
      },
    });
  }

  findById(id: string) {
    return this.db.customerProfile.findUnique({ where: { id } });
  }

  createProfile(data: {
    userId: string;
    displayName?: string | null;
    phone?: string | null;
  }) {
    return this.db.customerProfile.create({
      data: {
        userId: data.userId,
        displayName: data.displayName ?? null,
        phone: data.phone ?? null,
      },
      include: { addresses: true },
    });
  }

  updateProfile(
    id: string,
    data: { displayName?: string; phone?: string }
  ) {
    return this.db.customerProfile.update({
      where: { id },
      data,
      include: {
        addresses: { orderBy: [{ isDefault: "desc" }, { createdAt: "desc" }] },
      },
    });
  }

  listAddresses(customerId: string) {
    return this.db.address.findMany({
      where: { customerId },
      orderBy: [{ isDefault: "desc" }, { createdAt: "desc" }],
    });
  }

  findAddress(customerId: string, addressId: string) {
    return this.db.address.findFirst({
      where: { id: addressId, customerId },
    });
  }

  createAddress(data: {
    customerId: string;
    label?: string;
    line1: string;
    line2?: string;
    city: string;
    state?: string;
    country: string;
    postalCode?: string;
    isDefault?: boolean;
  }) {
    return this.db.address.create({
      data: {
        customerId: data.customerId,
        label: data.label ?? null,
        line1: data.line1,
        line2: data.line2 ?? null,
        city: data.city,
        state: data.state ?? null,
        country: data.country,
        postalCode: data.postalCode ?? null,
        isDefault: data.isDefault ?? false,
      },
    });
  }

  updateAddress(
    id: string,
    data: {
      label?: string;
      line1?: string;
      line2?: string;
      city?: string;
      state?: string;
      country?: string;
      postalCode?: string;
      isDefault?: boolean;
    }
  ) {
    return this.db.address.update({ where: { id }, data });
  }

  deleteAddress(id: string) {
    return this.db.address.delete({ where: { id } });
  }

  clearDefaultAddresses(customerId: string) {
    return this.db.address.updateMany({
      where: { customerId, isDefault: true },
      data: { isDefault: false },
    });
  }
}

export const customerRepository = new CustomerRepository(prisma);
