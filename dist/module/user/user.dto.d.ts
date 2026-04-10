import { UserWithRoles } from "./user.type";
export interface UserDto {
}
export declare const userResponseDto: (user: UserWithRoles) => {
    id: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
    phoneNumber: string | null;
    roles: string[];
};
//# sourceMappingURL=user.dto.d.ts.map