"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userResponseDto = void 0;
const userResponseDto = (user) => ({
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    phoneNumber: user.phoneNumber,
    roles: user.userRoles.map((u) => u.role.name),
});
exports.userResponseDto = userResponseDto;
//# sourceMappingURL=user.dto.js.map