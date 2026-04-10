import { User, Prisma, Role, UserRole } from "../../generated/prisma/client";
import { CreateUserBody, UserWithRoles } from "./user.type";
export declare function connectIf(id?: string): {
    connect: {
        id: string;
    };
} | undefined;
export declare class UserRepository {
    private readonly db;
    create({ email, password }: CreateUserBody): Promise<UserWithRoles>;
    findByEmail(email: string): Promise<UserWithRoles | null>;
    getAll(): Promise<UserWithRoles[]>;
    getById(id: string): Promise<UserWithRoles | null>;
    update(id: string, data: Prisma.UserUpdateInput): Promise<UserWithRoles>;
    delete(id: string): Promise<User>;
    createRole(data: Prisma.RoleCreateInput): Promise<Role>;
    assignRole(userId: string, roleName: string): Promise<UserRole>;
    removeRole(userId: string, roleName: string): Promise<void>;
    getUserRoles(userId: string): Promise<Role[]>;
}
//# sourceMappingURL=user.repository.d.ts.map