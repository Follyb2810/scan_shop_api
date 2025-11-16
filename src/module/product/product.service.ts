import { ProductRepository } from "./product.repository";
import { ManufacturerRepository } from "../manufacturer/manufacturer.repository";
import { TProductCreate, TProductUpdate } from "./product.type";

export class ProductService {
  private readonly repo = new ProductRepository();
  private readonly manufacturerRepo = new ManufacturerRepository();

  async create(userId: string, data: TProductCreate) {
    // Manufacturer must exist
    const manufacturer = await this.manufacturerRepo.getByUserId(userId);
    if (!manufacturer) {
      throw new Error("Only manufacturers can create products.");
    }

    // Manufacturer must be verified
    if (!manufacturer.isVerified) {
      throw new Error("Your manufacturer account is not verified.");
    }

    return this.repo.create(manufacturer.id, data);
  }

  async getAll() {
    return this.repo.getAll();
  }

  async getById(id: string) {
    return this.repo.getById(id);
  }

  async getMyProducts(userId: string) {
    const manufacturer = await this.manufacturerRepo.getByUserId(userId);
    if (!manufacturer) throw new Error("Not a manufacturer.");

    return this.repo.getByManufacturer(manufacturer.id);
  }

  async update(id: string, data: TProductUpdate) {
    return this.repo.update(id, data);
  }

  async disable(id: string) {
    return this.repo.disable(id);
  }

  async delete(id: string) {
    return this.repo.delete(id);
  }
}

export const productService = new ProductService();
