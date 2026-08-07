import { UserRepository } from "./user.repository";
import { CreateUserBody, TUserUpdate, UserWithRoles } from "./user.type";
export declare class UserService {
    private readonly userRepo;
    constructor(userRepo?: UserRepository);
    createUser({ email, password, }: CreateUserBody): Promise<UserWithRoles>;
    login(email: string, password: string): Promise<UserWithRoles>;
    getAllUsers(): Promise<UserWithRoles[]>;
    getUserById(id: string): Promise<UserWithRoles | null>;
    updateUserById(id: string, data: TUserUpdate): Promise<UserWithRoles>;
    deleteUserById(id: string): Promise<{
        status: string;
        id: string;
        email: string;
        password: string;
        firstName: string | null;
        lastName: string | null;
        phoneNumber: string | null;
        isActive: boolean;
        emailVerifiedAt: Date | null;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updatePassword(id: string, password: string): Promise<UserWithRoles>;
    getUserRoles(userId: string): Promise<{
        name: string;
        id: string;
    }[]>;
    assignRole(userId: string, roleName: string): Promise<{
        userId: string;
        roleId: string;
    }>;
    removeRole(userId: string, roleName: string): Promise<void>;
}
export declare const userService: UserService;
//# sourceMappingURL=user.service.d.ts.map