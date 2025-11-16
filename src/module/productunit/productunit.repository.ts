import prisma from "../../config/prisma-client";
import { Prisma, ProductUnit } from "@prisma/client";
import { TProductUnitUpdate } from "./productunit.type";

export class ProductUnitRepository {
  private readonly db = prisma;

  async create(data: Prisma.ProductUnitCreateInput): Promise<ProductUnit> {
    return this.db.productUnit.create({ data });
  }

  async getById(id: string) {
    return this.db.productUnit.findUnique({
      where: { id },
      include: { auditLogs: true, manufacturer: true, product: true },
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
