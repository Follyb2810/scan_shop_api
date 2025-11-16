import { ManufacturerRepository } from "./manufacturer.repository";
import { TManufacturerCreate } from "./manufacturer.type";

export class ManufacturerService {
  private readonly repo = new ManufacturerRepository();

  async apply(userId: string, data: TManufacturerCreate) {
    const existing = await this.repo.getByUserId(userId);
    if (existing) {
      throw new Error("You have already submitted a manufacturer application.");
    }

    return this.repo.apply(userId, data);
  }

  async getPending() {
    return this.repo.getPending();
  }

  async approve(id: string, adminId: string) {
    return this.repo.approve(id, adminId);
  }

  async reject(id: string, adminId: string, notes?: string) {
    return this.repo.reject(id, adminId, notes);
  }
}

export const manufacturerService = new ManufacturerService();
