import {
  NotFoundError,
  UnauthorizedError,
} from "../../../shared/errors";
import {
  customerRepository,
  CustomerRepository,
} from "../infrastructure/customer.repository";

export class CustomerService {
  constructor(private readonly repo: CustomerRepository = customerRepository) {}

  async ensureProfile(userId: string, input?: { displayName?: string; phone?: string }) {
    const existing = await this.repo.findByUserId(userId);
    if (existing) return existing;

    const user = await this.repo.findUser(userId);
    if (!user) throw new UnauthorizedError("User not found");

    const fromName = [user.firstName, user.lastName].filter(Boolean).join(" ");
    const displayName =
      input?.displayName ?? (fromName || user.email.split("@")[0]);

    return this.repo.createProfile({
      userId,
      displayName,
      phone: input?.phone ?? user.phoneNumber ?? null,
    });
  }

  async getMe(userId: string) {
    return this.ensureProfile(userId);
  }

  async updateMe(
    userId: string,
    input: { displayName?: string; phone?: string }
  ) {
    const profile = await this.ensureProfile(userId);
    return this.repo.updateProfile(profile.id, input);
  }

  async listAddresses(userId: string) {
    const profile = await this.ensureProfile(userId);
    return this.repo.listAddresses(profile.id);
  }

  async createAddress(
    userId: string,
    input: {
      label?: string;
      line1: string;
      line2?: string;
      city: string;
      state?: string;
      country: string;
      postalCode?: string;
      isDefault?: boolean;
    }
  ) {
    const profile = await this.ensureProfile(userId);
    if (input.isDefault) {
      await this.repo.clearDefaultAddresses(profile.id);
    }
    return this.repo.createAddress({
      customerId: profile.id,
      ...input,
      isDefault: input.isDefault ?? false,
    });
  }

  async updateAddress(
    userId: string,
    addressId: string,
    input: {
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
    const profile = await this.ensureProfile(userId);
    const address = await this.repo.findAddress(profile.id, addressId);
    if (!address) throw new NotFoundError("Address not found");
    if (input.isDefault) {
      await this.repo.clearDefaultAddresses(profile.id);
    }
    return this.repo.updateAddress(addressId, input);
  }

  async deleteAddress(userId: string, addressId: string) {
    const profile = await this.ensureProfile(userId);
    const address = await this.repo.findAddress(profile.id, addressId);
    if (!address) throw new NotFoundError("Address not found");
    await this.repo.deleteAddress(addressId);
    return { deleted: true };
  }

  async requireProfileId(userId: string): Promise<string> {
    const profile = await this.ensureProfile(userId);
    return profile.id;
  }
}

export const customerService = new CustomerService();
