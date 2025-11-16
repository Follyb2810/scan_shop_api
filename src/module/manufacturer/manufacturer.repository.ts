import { Prisma, Manufacturer } from "@prisma/client";
import prisma from "../../config/prisma-client";
import { TManufacturerCreate, TManufacturerUpdate } from "./manufacturer.type";

export class ManufacturerRepository {
  private readonly db = prisma;

  async apply(
    userId: string,
    data: TManufacturerCreate
  ): Promise<Manufacturer> {
    const payload: Prisma.ManufacturerCreateInput = {
      ...data,
      user: { connect: { id: userId } },
      verificationStatus: "PENDING",
      isVerified: false,
    };

    return this.db.manufacturer.create({
      data: payload,
      include: { user: true, products: true, productUnits: true },
    });
  }

  async getByUserId(userId: string) {
    return this.db.manufacturer.findUnique({
      where: { userId },
      include: { user: true },
    });
  }

  async getPending() {
    return this.db.manufacturer.findMany({
      where: { verificationStatus: "PENDING" },
    });
  }

  async approve(id: string, adminId: string) {
    return this.db.manufacturer.update({
      where: { id },
      data: {
        verificationStatus: "APPROVED",
        isVerified: true,
        reviewedAt: new Date(),
        reviewedBy: adminId,
      },
    });
  }

  async reject(id: string, adminId: string, notes?: string) {
    return this.db.manufacturer.update({
      where: { id },
      data: {
        verificationStatus: "REJECTED",
        isVerified: false,
        verificationNotes: notes,
        reviewedAt: new Date(),
        reviewedBy: adminId,
      },
    });
  }
}
