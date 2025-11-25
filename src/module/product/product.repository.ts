// import prisma from "../../config/prisma-client";
import { prisma } from "../../config/prisma-client";
import { Prisma, Product } from "../../generated/prisma/client";
import { TProductCreate, TProductUpdate } from "./product.type";

export class ProductRepository {
  private readonly db = prisma;

  async create(manufacturerId: string, data: TProductCreate): Promise<Product> {
    const payload: Prisma.ProductCreateInput = {
      ...data,
      manufacturer: { connect: { id: manufacturerId } }
    };

    return this.db.product.create({
      data: payload,
      include: {
        manufacturer: true,
        units: true,
      },
    });
  }

  async getAll() {
    return this.db.product.findMany({
      include: {
        manufacturer: true,
      },
    });
  }

  async getById(id: string) {
    return this.db.product.findUnique({
      where: { id },
      include: {
        manufacturer: true,
        units: true,
      },
    });
  }

  async getByManufacturer(manufacturerId: string) {
    return this.db.product.findMany({
      where: { manufacturerId },
      include: { units: true },
    });
  }

  async update(id: string, data: TProductUpdate) {
    return this.db.product.update({
      where: { id },
      data,
      include: {
        manufacturer: true,
        units: true,
      },
    });
  }

  async disable(id: string) {
    return this.db.product.update({
      where: { id },
      data: { isActive: false },
    });
  }

  async delete(id: string) {
    return this.db.product.delete({ where: { id } });
  }
}
