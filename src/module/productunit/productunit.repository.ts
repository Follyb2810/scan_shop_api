import prisma from "../../config/prisma-client";
import { Prisma, ProductUnit } from "@prisma/client";
import { TProductUnitCreate, TProductUnitUpdate } from "./productunit.type";

export class ProductUnitRepository {
  private readonly db = prisma;

  async create(data: TProductUnitCreate): Promise<ProductUnit> {
    const { manufacturerId, productId, ...rest } = data;
    const payload: Prisma.ProductUnitCreateInput = {
      ...rest,
      manufacturer: { connect: { id: manufacturerId } },
      product: { connect: { id: productId } },
    };
    return this.db.productUnit.create({ data: payload });
  }

  async getById(id: string) {
    return this.db.productUnit.findUnique({
      where: { id },
      include: { auditLogs: true, manufacturer: true, product: true },
    });
  }
  async countByProduct(productId: string): Promise<number> {
    return this.db.productUnit.count({
      where: { productId },
    });
  }
  async getByProduct(productId: string) {
    return this.db.productUnit.findMany({
      where: { productId },
      include: { auditLogs: true, manufacturer: true, product: true },
    });
  }

  async update(id: string, data: TProductUnitUpdate) {
    return this.db.productUnit.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.db.productUnit.delete({ where: { id } });
  }
}
