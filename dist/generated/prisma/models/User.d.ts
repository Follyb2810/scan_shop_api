import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model User
 *
 */
export type UserModel = runtime.Types.Result.DefaultSelection<Prisma.$UserPayload>;
export type AggregateUser = {
    _count: UserCountAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
};
export type UserMinAggregateOutputType = {
    id: string | null;
    email: string | null;
    password: string | null;
    firstName: string | null;
    lastName: string | null;
    phoneNumber: string | null;
    isActive: boolean | null;
    status: string | null;
    emailVerifiedAt: Date | null;
    deletedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type UserMaxAggregateOutputType = {
    id: string | null;
    email: string | null;
    password: string | null;
    firstName: string | null;
    lastName: string | null;
    phoneNumber: string | null;
    isActive: boolean | null;
    status: string | null;
    emailVerifiedAt: Date | null;
    deletedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type UserCountAggregateOutputType = {
    id: number;
    email: number;
    password: number;
    firstName: number;
    lastName: number;
    phoneNumber: number;
    isActive: number;
    status: number;
    emailVerifiedAt: number;
    deletedAt: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type UserMinAggregateInputType = {
    id?: true;
    email?: true;
    password?: true;
    firstName?: true;
    lastName?: true;
    phoneNumber?: true;
    isActive?: true;
    status?: true;
    emailVerifiedAt?: true;
    deletedAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type UserMaxAggregateInputType = {
    id?: true;
    email?: true;
    password?: true;
    firstName?: true;
    lastName?: true;
    phoneNumber?: true;
    isActive?: true;
    status?: true;
    emailVerifiedAt?: true;
    deletedAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type UserCountAggregateInputType = {
    id?: true;
    email?: true;
    password?: true;
    firstName?: true;
    lastName?: true;
    phoneNumber?: true;
    isActive?: true;
    status?: true;
    emailVerifiedAt?: true;
    deletedAt?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type UserAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: Prisma.UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType;
};
export type GetUserAggregateType<T extends UserAggregateArgs> = {
    [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateUser[P]> : Prisma.GetScalarType<T[P], AggregateUser[P]>;
};
export type UserGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithAggregationInput | Prisma.UserOrderByWithAggregationInput[];
    by: Prisma.UserScalarFieldEnum[] | Prisma.UserScalarFieldEnum;
    having?: Prisma.UserScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UserCountAggregateInputType | true;
    _min?: UserMinAggregateInputType;
    _max?: UserMaxAggregateInputType;
};
export type UserGroupByOutputType = {
    id: string;
    email: string;
    password: string;
    firstName: string | null;
    lastName: string | null;
    phoneNumber: string | null;
    isActive: boolean;
    status: string;
    emailVerifiedAt: Date | null;
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    _count: UserCountAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
};
type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<UserGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], UserGroupByOutputType[P]> : Prisma.GetScalarType<T[P], UserGroupByOutputType[P]>;
}>>;
export type UserWhereInput = {
    AND?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    OR?: Prisma.UserWhereInput[];
    NOT?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    id?: Prisma.StringFilter<"User"> | string;
    email?: Prisma.StringFilter<"User"> | string;
    password?: Prisma.StringFilter<"User"> | string;
    firstName?: Prisma.StringNullableFilter<"User"> | string | null;
    lastName?: Prisma.StringNullableFilter<"User"> | string | null;
    phoneNumber?: Prisma.StringNullableFilter<"User"> | string | null;
    isActive?: Prisma.BoolFilter<"User"> | boolean;
    status?: Prisma.StringFilter<"User"> | string;
    emailVerifiedAt?: Prisma.DateTimeNullableFilter<"User"> | Date | string | null;
    deletedAt?: Prisma.DateTimeNullableFilter<"User"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    manufacturer?: Prisma.XOR<Prisma.ManufacturerNullableScalarRelationFilter, Prisma.ManufacturerWhereInput> | null;
    productUnitAuditLogs?: Prisma.ProductUnitAuditLogListRelationFilter;
    auditActorLogs?: Prisma.AuditLogListRelationFilter;
    userRoles?: Prisma.UserRoleListRelationFilter;
    sessions?: Prisma.SessionListRelationFilter;
    refreshTokens?: Prisma.RefreshTokenListRelationFilter;
    devices?: Prisma.DeviceListRelationFilter;
    loginHistories?: Prisma.LoginHistoryListRelationFilter;
    twoFactorSecret?: Prisma.XOR<Prisma.TwoFactorSecretNullableScalarRelationFilter, Prisma.TwoFactorSecretWhereInput> | null;
    emailVerificationTokens?: Prisma.EmailVerificationTokenListRelationFilter;
    passwordResetTokens?: Prisma.PasswordResetTokenListRelationFilter;
    platformUserRoles?: Prisma.PlatformUserRoleListRelationFilter;
    memberships?: Prisma.MembershipListRelationFilter;
    workflowActions?: Prisma.WorkflowActionListRelationFilter;
    workflowInstancesStarted?: Prisma.WorkflowInstanceListRelationFilter;
    customerProfile?: Prisma.XOR<Prisma.CustomerProfileNullableScalarRelationFilter, Prisma.CustomerProfileWhereInput> | null;
    notifications?: Prisma.NotificationListRelationFilter;
};
export type UserOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    firstName?: Prisma.SortOrderInput | Prisma.SortOrder;
    lastName?: Prisma.SortOrderInput | Prisma.SortOrder;
    phoneNumber?: Prisma.SortOrderInput | Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    emailVerifiedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    deletedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    manufacturer?: Prisma.ManufacturerOrderByWithRelationInput;
    productUnitAuditLogs?: Prisma.ProductUnitAuditLogOrderByRelationAggregateInput;
    auditActorLogs?: Prisma.AuditLogOrderByRelationAggregateInput;
    userRoles?: Prisma.UserRoleOrderByRelationAggregateInput;
    sessions?: Prisma.SessionOrderByRelationAggregateInput;
    refreshTokens?: Prisma.RefreshTokenOrderByRelationAggregateInput;
    devices?: Prisma.DeviceOrderByRelationAggregateInput;
    loginHistories?: Prisma.LoginHistoryOrderByRelationAggregateInput;
    twoFactorSecret?: Prisma.TwoFactorSecretOrderByWithRelationInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenOrderByRelationAggregateInput;
    passwordResetTokens?: Prisma.PasswordResetTokenOrderByRelationAggregateInput;
    platformUserRoles?: Prisma.PlatformUserRoleOrderByRelationAggregateInput;
    memberships?: Prisma.MembershipOrderByRelationAggregateInput;
    workflowActions?: Prisma.WorkflowActionOrderByRelationAggregateInput;
    workflowInstancesStarted?: Prisma.WorkflowInstanceOrderByRelationAggregateInput;
    customerProfile?: Prisma.CustomerProfileOrderByWithRelationInput;
    notifications?: Prisma.NotificationOrderByRelationAggregateInput;
};
export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    email?: string;
    AND?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    OR?: Prisma.UserWhereInput[];
    NOT?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    password?: Prisma.StringFilter<"User"> | string;
    firstName?: Prisma.StringNullableFilter<"User"> | string | null;
    lastName?: Prisma.StringNullableFilter<"User"> | string | null;
    phoneNumber?: Prisma.StringNullableFilter<"User"> | string | null;
    isActive?: Prisma.BoolFilter<"User"> | boolean;
    status?: Prisma.StringFilter<"User"> | string;
    emailVerifiedAt?: Prisma.DateTimeNullableFilter<"User"> | Date | string | null;
    deletedAt?: Prisma.DateTimeNullableFilter<"User"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    manufacturer?: Prisma.XOR<Prisma.ManufacturerNullableScalarRelationFilter, Prisma.ManufacturerWhereInput> | null;
    productUnitAuditLogs?: Prisma.ProductUnitAuditLogListRelationFilter;
    auditActorLogs?: Prisma.AuditLogListRelationFilter;
    userRoles?: Prisma.UserRoleListRelationFilter;
    sessions?: Prisma.SessionListRelationFilter;
    refreshTokens?: Prisma.RefreshTokenListRelationFilter;
    devices?: Prisma.DeviceListRelationFilter;
    loginHistories?: Prisma.LoginHistoryListRelationFilter;
    twoFactorSecret?: Prisma.XOR<Prisma.TwoFactorSecretNullableScalarRelationFilter, Prisma.TwoFactorSecretWhereInput> | null;
    emailVerificationTokens?: Prisma.EmailVerificationTokenListRelationFilter;
    passwordResetTokens?: Prisma.PasswordResetTokenListRelationFilter;
    platformUserRoles?: Prisma.PlatformUserRoleListRelationFilter;
    memberships?: Prisma.MembershipListRelationFilter;
    workflowActions?: Prisma.WorkflowActionListRelationFilter;
    workflowInstancesStarted?: Prisma.WorkflowInstanceListRelationFilter;
    customerProfile?: Prisma.XOR<Prisma.CustomerProfileNullableScalarRelationFilter, Prisma.CustomerProfileWhereInput> | null;
    notifications?: Prisma.NotificationListRelationFilter;
}, "id" | "email">;
export type UserOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    firstName?: Prisma.SortOrderInput | Prisma.SortOrder;
    lastName?: Prisma.SortOrderInput | Prisma.SortOrder;
    phoneNumber?: Prisma.SortOrderInput | Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    emailVerifiedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    deletedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.UserCountOrderByAggregateInput;
    _max?: Prisma.UserMaxOrderByAggregateInput;
    _min?: Prisma.UserMinOrderByAggregateInput;
};
export type UserScalarWhereWithAggregatesInput = {
    AND?: Prisma.UserScalarWhereWithAggregatesInput | Prisma.UserScalarWhereWithAggregatesInput[];
    OR?: Prisma.UserScalarWhereWithAggregatesInput[];
    NOT?: Prisma.UserScalarWhereWithAggregatesInput | Prisma.UserScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"User"> | string;
    email?: Prisma.StringWithAggregatesFilter<"User"> | string;
    password?: Prisma.StringWithAggregatesFilter<"User"> | string;
    firstName?: Prisma.StringNullableWithAggregatesFilter<"User"> | string | null;
    lastName?: Prisma.StringNullableWithAggregatesFilter<"User"> | string | null;
    phoneNumber?: Prisma.StringNullableWithAggregatesFilter<"User"> | string | null;
    isActive?: Prisma.BoolWithAggregatesFilter<"User"> | boolean;
    status?: Prisma.StringWithAggregatesFilter<"User"> | string;
    emailVerifiedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null;
    deletedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"User"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"User"> | Date | string;
};
export type UserCreateInput = {
    id?: string;
    email: string;
    password: string;
    firstName?: string | null;
    lastName?: string | null;
    phoneNumber?: string | null;
    isActive?: boolean;
    status?: string;
    emailVerifiedAt?: Date | string | null;
    deletedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    manufacturer?: Prisma.ManufacturerCreateNestedOneWithoutUserInput;
    productUnitAuditLogs?: Prisma.ProductUnitAuditLogCreateNestedManyWithoutUserInput;
    auditActorLogs?: Prisma.AuditLogCreateNestedManyWithoutActorInput;
    userRoles?: Prisma.UserRoleCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionCreateNestedManyWithoutUserInput;
    refreshTokens?: Prisma.RefreshTokenCreateNestedManyWithoutUserInput;
    devices?: Prisma.DeviceCreateNestedManyWithoutUserInput;
    loginHistories?: Prisma.LoginHistoryCreateNestedManyWithoutUserInput;
    twoFactorSecret?: Prisma.TwoFactorSecretCreateNestedOneWithoutUserInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenCreateNestedManyWithoutUserInput;
    passwordResetTokens?: Prisma.PasswordResetTokenCreateNestedManyWithoutUserInput;
    platformUserRoles?: Prisma.PlatformUserRoleCreateNestedManyWithoutUserInput;
    memberships?: Prisma.MembershipCreateNestedManyWithoutUserInput;
    workflowActions?: Prisma.WorkflowActionCreateNestedManyWithoutActorInput;
    workflowInstancesStarted?: Prisma.WorkflowInstanceCreateNestedManyWithoutStartedByInput;
    customerProfile?: Prisma.CustomerProfileCreateNestedOneWithoutUserInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateInput = {
    id?: string;
    email: string;
    password: string;
    firstName?: string | null;
    lastName?: string | null;
    phoneNumber?: string | null;
    isActive?: boolean;
    status?: string;
    emailVerifiedAt?: Date | string | null;
    deletedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    manufacturer?: Prisma.ManufacturerUncheckedCreateNestedOneWithoutUserInput;
    productUnitAuditLogs?: Prisma.ProductUnitAuditLogUncheckedCreateNestedManyWithoutUserInput;
    auditActorLogs?: Prisma.AuditLogUncheckedCreateNestedManyWithoutActorInput;
    userRoles?: Prisma.UserRoleUncheckedCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionUncheckedCreateNestedManyWithoutUserInput;
    refreshTokens?: Prisma.RefreshTokenUncheckedCreateNestedManyWithoutUserInput;
    devices?: Prisma.DeviceUncheckedCreateNestedManyWithoutUserInput;
    loginHistories?: Prisma.LoginHistoryUncheckedCreateNestedManyWithoutUserInput;
    twoFactorSecret?: Prisma.TwoFactorSecretUncheckedCreateNestedOneWithoutUserInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenUncheckedCreateNestedManyWithoutUserInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput;
    platformUserRoles?: Prisma.PlatformUserRoleUncheckedCreateNestedManyWithoutUserInput;
    memberships?: Prisma.MembershipUncheckedCreateNestedManyWithoutUserInput;
    workflowActions?: Prisma.WorkflowActionUncheckedCreateNestedManyWithoutActorInput;
    workflowInstancesStarted?: Prisma.WorkflowInstanceUncheckedCreateNestedManyWithoutStartedByInput;
    customerProfile?: Prisma.CustomerProfileUncheckedCreateNestedOneWithoutUserInput;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutUserInput;
};
export type UserUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    firstName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    emailVerifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    manufacturer?: Prisma.ManufacturerUpdateOneWithoutUserNestedInput;
    productUnitAuditLogs?: Prisma.ProductUnitAuditLogUpdateManyWithoutUserNestedInput;
    auditActorLogs?: Prisma.AuditLogUpdateManyWithoutActorNestedInput;
    userRoles?: Prisma.UserRoleUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.SessionUpdateManyWithoutUserNestedInput;
    refreshTokens?: Prisma.RefreshTokenUpdateManyWithoutUserNestedInput;
    devices?: Prisma.DeviceUpdateManyWithoutUserNestedInput;
    loginHistories?: Prisma.LoginHistoryUpdateManyWithoutUserNestedInput;
    twoFactorSecret?: Prisma.TwoFactorSecretUpdateOneWithoutUserNestedInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenUpdateManyWithoutUserNestedInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUpdateManyWithoutUserNestedInput;
    platformUserRoles?: Prisma.PlatformUserRoleUpdateManyWithoutUserNestedInput;
    memberships?: Prisma.MembershipUpdateManyWithoutUserNestedInput;
    workflowActions?: Prisma.WorkflowActionUpdateManyWithoutActorNestedInput;
    workflowInstancesStarted?: Prisma.WorkflowInstanceUpdateManyWithoutStartedByNestedInput;
    customerProfile?: Prisma.CustomerProfileUpdateOneWithoutUserNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    firstName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    emailVerifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    manufacturer?: Prisma.ManufacturerUncheckedUpdateOneWithoutUserNestedInput;
    productUnitAuditLogs?: Prisma.ProductUnitAuditLogUncheckedUpdateManyWithoutUserNestedInput;
    auditActorLogs?: Prisma.AuditLogUncheckedUpdateManyWithoutActorNestedInput;
    userRoles?: Prisma.UserRoleUncheckedUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput;
    refreshTokens?: Prisma.RefreshTokenUncheckedUpdateManyWithoutUserNestedInput;
    devices?: Prisma.DeviceUncheckedUpdateManyWithoutUserNestedInput;
    loginHistories?: Prisma.LoginHistoryUncheckedUpdateManyWithoutUserNestedInput;
    twoFactorSecret?: Prisma.TwoFactorSecretUncheckedUpdateOneWithoutUserNestedInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenUncheckedUpdateManyWithoutUserNestedInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInput;
    platformUserRoles?: Prisma.PlatformUserRoleUncheckedUpdateManyWithoutUserNestedInput;
    memberships?: Prisma.MembershipUncheckedUpdateManyWithoutUserNestedInput;
    workflowActions?: Prisma.WorkflowActionUncheckedUpdateManyWithoutActorNestedInput;
    workflowInstancesStarted?: Prisma.WorkflowInstanceUncheckedUpdateManyWithoutStartedByNestedInput;
    customerProfile?: Prisma.CustomerProfileUncheckedUpdateOneWithoutUserNestedInput;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateManyInput = {
    id?: string;
    email: string;
    password: string;
    firstName?: string | null;
    lastName?: string | null;
    phoneNumber?: string | null;
    isActive?: boolean;
    status?: string;
    emailVerifiedAt?: Date | string | null;
    deletedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type UserUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    firstName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    emailVerifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    firstName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    emailVerifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    firstName?: Prisma.SortOrder;
    lastName?: Prisma.SortOrder;
    phoneNumber?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    emailVerifiedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    firstName?: Prisma.SortOrder;
    lastName?: Prisma.SortOrder;
    phoneNumber?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    emailVerifiedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    firstName?: Prisma.SortOrder;
    lastName?: Prisma.SortOrder;
    phoneNumber?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    emailVerifiedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserScalarRelationFilter = {
    is?: Prisma.UserWhereInput;
    isNot?: Prisma.UserWhereInput;
};
export type UserNullableScalarRelationFilter = {
    is?: Prisma.UserWhereInput | null;
    isNot?: Prisma.UserWhereInput | null;
};
export type StringFieldUpdateOperationsInput = {
    set?: string;
};
export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
};
export type BoolFieldUpdateOperationsInput = {
    set?: boolean;
};
export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
};
export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
};
export type UserCreateNestedOneWithoutSessionsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutSessionsInput, Prisma.UserUncheckedCreateWithoutSessionsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutSessionsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutSessionsInput, Prisma.UserUncheckedCreateWithoutSessionsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutSessionsInput;
    upsert?: Prisma.UserUpsertWithoutSessionsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutSessionsInput, Prisma.UserUpdateWithoutSessionsInput>, Prisma.UserUncheckedUpdateWithoutSessionsInput>;
};
export type UserCreateNestedOneWithoutRefreshTokensInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutRefreshTokensInput, Prisma.UserUncheckedCreateWithoutRefreshTokensInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutRefreshTokensInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutRefreshTokensNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutRefreshTokensInput, Prisma.UserUncheckedCreateWithoutRefreshTokensInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutRefreshTokensInput;
    upsert?: Prisma.UserUpsertWithoutRefreshTokensInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutRefreshTokensInput, Prisma.UserUpdateWithoutRefreshTokensInput>, Prisma.UserUncheckedUpdateWithoutRefreshTokensInput>;
};
export type UserCreateNestedOneWithoutDevicesInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutDevicesInput, Prisma.UserUncheckedCreateWithoutDevicesInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutDevicesInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutDevicesNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutDevicesInput, Prisma.UserUncheckedCreateWithoutDevicesInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutDevicesInput;
    upsert?: Prisma.UserUpsertWithoutDevicesInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutDevicesInput, Prisma.UserUpdateWithoutDevicesInput>, Prisma.UserUncheckedUpdateWithoutDevicesInput>;
};
export type UserCreateNestedOneWithoutLoginHistoriesInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutLoginHistoriesInput, Prisma.UserUncheckedCreateWithoutLoginHistoriesInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutLoginHistoriesInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutLoginHistoriesNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutLoginHistoriesInput, Prisma.UserUncheckedCreateWithoutLoginHistoriesInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutLoginHistoriesInput;
    upsert?: Prisma.UserUpsertWithoutLoginHistoriesInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutLoginHistoriesInput, Prisma.UserUpdateWithoutLoginHistoriesInput>, Prisma.UserUncheckedUpdateWithoutLoginHistoriesInput>;
};
export type UserCreateNestedOneWithoutTwoFactorSecretInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutTwoFactorSecretInput, Prisma.UserUncheckedCreateWithoutTwoFactorSecretInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutTwoFactorSecretInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutTwoFactorSecretNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutTwoFactorSecretInput, Prisma.UserUncheckedCreateWithoutTwoFactorSecretInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutTwoFactorSecretInput;
    upsert?: Prisma.UserUpsertWithoutTwoFactorSecretInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutTwoFactorSecretInput, Prisma.UserUpdateWithoutTwoFactorSecretInput>, Prisma.UserUncheckedUpdateWithoutTwoFactorSecretInput>;
};
export type UserCreateNestedOneWithoutEmailVerificationTokensInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutEmailVerificationTokensInput, Prisma.UserUncheckedCreateWithoutEmailVerificationTokensInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutEmailVerificationTokensInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutEmailVerificationTokensNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutEmailVerificationTokensInput, Prisma.UserUncheckedCreateWithoutEmailVerificationTokensInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutEmailVerificationTokensInput;
    upsert?: Prisma.UserUpsertWithoutEmailVerificationTokensInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutEmailVerificationTokensInput, Prisma.UserUpdateWithoutEmailVerificationTokensInput>, Prisma.UserUncheckedUpdateWithoutEmailVerificationTokensInput>;
};
export type UserCreateNestedOneWithoutPasswordResetTokensInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutPasswordResetTokensInput, Prisma.UserUncheckedCreateWithoutPasswordResetTokensInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutPasswordResetTokensInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutPasswordResetTokensNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutPasswordResetTokensInput, Prisma.UserUncheckedCreateWithoutPasswordResetTokensInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutPasswordResetTokensInput;
    upsert?: Prisma.UserUpsertWithoutPasswordResetTokensInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutPasswordResetTokensInput, Prisma.UserUpdateWithoutPasswordResetTokensInput>, Prisma.UserUncheckedUpdateWithoutPasswordResetTokensInput>;
};
export type UserCreateNestedOneWithoutPlatformUserRolesInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutPlatformUserRolesInput, Prisma.UserUncheckedCreateWithoutPlatformUserRolesInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutPlatformUserRolesInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutPlatformUserRolesNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutPlatformUserRolesInput, Prisma.UserUncheckedCreateWithoutPlatformUserRolesInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutPlatformUserRolesInput;
    upsert?: Prisma.UserUpsertWithoutPlatformUserRolesInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutPlatformUserRolesInput, Prisma.UserUpdateWithoutPlatformUserRolesInput>, Prisma.UserUncheckedUpdateWithoutPlatformUserRolesInput>;
};
export type UserCreateNestedOneWithoutMembershipsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutMembershipsInput, Prisma.UserUncheckedCreateWithoutMembershipsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutMembershipsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutMembershipsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutMembershipsInput, Prisma.UserUncheckedCreateWithoutMembershipsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutMembershipsInput;
    upsert?: Prisma.UserUpsertWithoutMembershipsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutMembershipsInput, Prisma.UserUpdateWithoutMembershipsInput>, Prisma.UserUncheckedUpdateWithoutMembershipsInput>;
};
export type UserCreateNestedOneWithoutUserRolesInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutUserRolesInput, Prisma.UserUncheckedCreateWithoutUserRolesInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutUserRolesInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutUserRolesNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutUserRolesInput, Prisma.UserUncheckedCreateWithoutUserRolesInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutUserRolesInput;
    upsert?: Prisma.UserUpsertWithoutUserRolesInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutUserRolesInput, Prisma.UserUpdateWithoutUserRolesInput>, Prisma.UserUncheckedUpdateWithoutUserRolesInput>;
};
export type UserCreateNestedOneWithoutManufacturerInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutManufacturerInput, Prisma.UserUncheckedCreateWithoutManufacturerInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutManufacturerInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutManufacturerNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutManufacturerInput, Prisma.UserUncheckedCreateWithoutManufacturerInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutManufacturerInput;
    upsert?: Prisma.UserUpsertWithoutManufacturerInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutManufacturerInput, Prisma.UserUpdateWithoutManufacturerInput>, Prisma.UserUncheckedUpdateWithoutManufacturerInput>;
};
export type UserCreateNestedOneWithoutProductUnitAuditLogsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutProductUnitAuditLogsInput, Prisma.UserUncheckedCreateWithoutProductUnitAuditLogsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutProductUnitAuditLogsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneWithoutProductUnitAuditLogsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutProductUnitAuditLogsInput, Prisma.UserUncheckedCreateWithoutProductUnitAuditLogsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutProductUnitAuditLogsInput;
    upsert?: Prisma.UserUpsertWithoutProductUnitAuditLogsInput;
    disconnect?: Prisma.UserWhereInput | boolean;
    delete?: Prisma.UserWhereInput | boolean;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutProductUnitAuditLogsInput, Prisma.UserUpdateWithoutProductUnitAuditLogsInput>, Prisma.UserUncheckedUpdateWithoutProductUnitAuditLogsInput>;
};
export type UserCreateNestedOneWithoutAuditActorLogsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutAuditActorLogsInput, Prisma.UserUncheckedCreateWithoutAuditActorLogsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutAuditActorLogsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneWithoutAuditActorLogsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutAuditActorLogsInput, Prisma.UserUncheckedCreateWithoutAuditActorLogsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutAuditActorLogsInput;
    upsert?: Prisma.UserUpsertWithoutAuditActorLogsInput;
    disconnect?: Prisma.UserWhereInput | boolean;
    delete?: Prisma.UserWhereInput | boolean;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutAuditActorLogsInput, Prisma.UserUpdateWithoutAuditActorLogsInput>, Prisma.UserUncheckedUpdateWithoutAuditActorLogsInput>;
};
export type UserCreateNestedOneWithoutCustomerProfileInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutCustomerProfileInput, Prisma.UserUncheckedCreateWithoutCustomerProfileInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutCustomerProfileInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutCustomerProfileNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutCustomerProfileInput, Prisma.UserUncheckedCreateWithoutCustomerProfileInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutCustomerProfileInput;
    upsert?: Prisma.UserUpsertWithoutCustomerProfileInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutCustomerProfileInput, Prisma.UserUpdateWithoutCustomerProfileInput>, Prisma.UserUncheckedUpdateWithoutCustomerProfileInput>;
};
export type UserCreateNestedOneWithoutNotificationsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutNotificationsInput, Prisma.UserUncheckedCreateWithoutNotificationsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutNotificationsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutNotificationsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutNotificationsInput, Prisma.UserUncheckedCreateWithoutNotificationsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutNotificationsInput;
    upsert?: Prisma.UserUpsertWithoutNotificationsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutNotificationsInput, Prisma.UserUpdateWithoutNotificationsInput>, Prisma.UserUncheckedUpdateWithoutNotificationsInput>;
};
export type UserCreateNestedOneWithoutWorkflowInstancesStartedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutWorkflowInstancesStartedInput, Prisma.UserUncheckedCreateWithoutWorkflowInstancesStartedInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutWorkflowInstancesStartedInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneWithoutWorkflowInstancesStartedNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutWorkflowInstancesStartedInput, Prisma.UserUncheckedCreateWithoutWorkflowInstancesStartedInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutWorkflowInstancesStartedInput;
    upsert?: Prisma.UserUpsertWithoutWorkflowInstancesStartedInput;
    disconnect?: Prisma.UserWhereInput | boolean;
    delete?: Prisma.UserWhereInput | boolean;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutWorkflowInstancesStartedInput, Prisma.UserUpdateWithoutWorkflowInstancesStartedInput>, Prisma.UserUncheckedUpdateWithoutWorkflowInstancesStartedInput>;
};
export type UserCreateNestedOneWithoutWorkflowActionsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutWorkflowActionsInput, Prisma.UserUncheckedCreateWithoutWorkflowActionsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutWorkflowActionsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutWorkflowActionsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutWorkflowActionsInput, Prisma.UserUncheckedCreateWithoutWorkflowActionsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutWorkflowActionsInput;
    upsert?: Prisma.UserUpsertWithoutWorkflowActionsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutWorkflowActionsInput, Prisma.UserUpdateWithoutWorkflowActionsInput>, Prisma.UserUncheckedUpdateWithoutWorkflowActionsInput>;
};
export type UserCreateWithoutSessionsInput = {
    id?: string;
    email: string;
    password: string;
    firstName?: string | null;
    lastName?: string | null;
    phoneNumber?: string | null;
    isActive?: boolean;
    status?: string;
    emailVerifiedAt?: Date | string | null;
    deletedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    manufacturer?: Prisma.ManufacturerCreateNestedOneWithoutUserInput;
    productUnitAuditLogs?: Prisma.ProductUnitAuditLogCreateNestedManyWithoutUserInput;
    auditActorLogs?: Prisma.AuditLogCreateNestedManyWithoutActorInput;
    userRoles?: Prisma.UserRoleCreateNestedManyWithoutUserInput;
    refreshTokens?: Prisma.RefreshTokenCreateNestedManyWithoutUserInput;
    devices?: Prisma.DeviceCreateNestedManyWithoutUserInput;
    loginHistories?: Prisma.LoginHistoryCreateNestedManyWithoutUserInput;
    twoFactorSecret?: Prisma.TwoFactorSecretCreateNestedOneWithoutUserInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenCreateNestedManyWithoutUserInput;
    passwordResetTokens?: Prisma.PasswordResetTokenCreateNestedManyWithoutUserInput;
    platformUserRoles?: Prisma.PlatformUserRoleCreateNestedManyWithoutUserInput;
    memberships?: Prisma.MembershipCreateNestedManyWithoutUserInput;
    workflowActions?: Prisma.WorkflowActionCreateNestedManyWithoutActorInput;
    workflowInstancesStarted?: Prisma.WorkflowInstanceCreateNestedManyWithoutStartedByInput;
    customerProfile?: Prisma.CustomerProfileCreateNestedOneWithoutUserInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutSessionsInput = {
    id?: string;
    email: string;
    password: string;
    firstName?: string | null;
    lastName?: string | null;
    phoneNumber?: string | null;
    isActive?: boolean;
    status?: string;
    emailVerifiedAt?: Date | string | null;
    deletedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    manufacturer?: Prisma.ManufacturerUncheckedCreateNestedOneWithoutUserInput;
    productUnitAuditLogs?: Prisma.ProductUnitAuditLogUncheckedCreateNestedManyWithoutUserInput;
    auditActorLogs?: Prisma.AuditLogUncheckedCreateNestedManyWithoutActorInput;
    userRoles?: Prisma.UserRoleUncheckedCreateNestedManyWithoutUserInput;
    refreshTokens?: Prisma.RefreshTokenUncheckedCreateNestedManyWithoutUserInput;
    devices?: Prisma.DeviceUncheckedCreateNestedManyWithoutUserInput;
    loginHistories?: Prisma.LoginHistoryUncheckedCreateNestedManyWithoutUserInput;
    twoFactorSecret?: Prisma.TwoFactorSecretUncheckedCreateNestedOneWithoutUserInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenUncheckedCreateNestedManyWithoutUserInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput;
    platformUserRoles?: Prisma.PlatformUserRoleUncheckedCreateNestedManyWithoutUserInput;
    memberships?: Prisma.MembershipUncheckedCreateNestedManyWithoutUserInput;
    workflowActions?: Prisma.WorkflowActionUncheckedCreateNestedManyWithoutActorInput;
    workflowInstancesStarted?: Prisma.WorkflowInstanceUncheckedCreateNestedManyWithoutStartedByInput;
    customerProfile?: Prisma.CustomerProfileUncheckedCreateNestedOneWithoutUserInput;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutSessionsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutSessionsInput, Prisma.UserUncheckedCreateWithoutSessionsInput>;
};
export type UserUpsertWithoutSessionsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutSessionsInput, Prisma.UserUncheckedUpdateWithoutSessionsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutSessionsInput, Prisma.UserUncheckedCreateWithoutSessionsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutSessionsInput, Prisma.UserUncheckedUpdateWithoutSessionsInput>;
};
export type UserUpdateWithoutSessionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    firstName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    emailVerifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    manufacturer?: Prisma.ManufacturerUpdateOneWithoutUserNestedInput;
    productUnitAuditLogs?: Prisma.ProductUnitAuditLogUpdateManyWithoutUserNestedInput;
    auditActorLogs?: Prisma.AuditLogUpdateManyWithoutActorNestedInput;
    userRoles?: Prisma.UserRoleUpdateManyWithoutUserNestedInput;
    refreshTokens?: Prisma.RefreshTokenUpdateManyWithoutUserNestedInput;
    devices?: Prisma.DeviceUpdateManyWithoutUserNestedInput;
    loginHistories?: Prisma.LoginHistoryUpdateManyWithoutUserNestedInput;
    twoFactorSecret?: Prisma.TwoFactorSecretUpdateOneWithoutUserNestedInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenUpdateManyWithoutUserNestedInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUpdateManyWithoutUserNestedInput;
    platformUserRoles?: Prisma.PlatformUserRoleUpdateManyWithoutUserNestedInput;
    memberships?: Prisma.MembershipUpdateManyWithoutUserNestedInput;
    workflowActions?: Prisma.WorkflowActionUpdateManyWithoutActorNestedInput;
    workflowInstancesStarted?: Prisma.WorkflowInstanceUpdateManyWithoutStartedByNestedInput;
    customerProfile?: Prisma.CustomerProfileUpdateOneWithoutUserNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    firstName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    emailVerifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    manufacturer?: Prisma.ManufacturerUncheckedUpdateOneWithoutUserNestedInput;
    productUnitAuditLogs?: Prisma.ProductUnitAuditLogUncheckedUpdateManyWithoutUserNestedInput;
    auditActorLogs?: Prisma.AuditLogUncheckedUpdateManyWithoutActorNestedInput;
    userRoles?: Prisma.UserRoleUncheckedUpdateManyWithoutUserNestedInput;
    refreshTokens?: Prisma.RefreshTokenUncheckedUpdateManyWithoutUserNestedInput;
    devices?: Prisma.DeviceUncheckedUpdateManyWithoutUserNestedInput;
    loginHistories?: Prisma.LoginHistoryUncheckedUpdateManyWithoutUserNestedInput;
    twoFactorSecret?: Prisma.TwoFactorSecretUncheckedUpdateOneWithoutUserNestedInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenUncheckedUpdateManyWithoutUserNestedInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInput;
    platformUserRoles?: Prisma.PlatformUserRoleUncheckedUpdateManyWithoutUserNestedInput;
    memberships?: Prisma.MembershipUncheckedUpdateManyWithoutUserNestedInput;
    workflowActions?: Prisma.WorkflowActionUncheckedUpdateManyWithoutActorNestedInput;
    workflowInstancesStarted?: Prisma.WorkflowInstanceUncheckedUpdateManyWithoutStartedByNestedInput;
    customerProfile?: Prisma.CustomerProfileUncheckedUpdateOneWithoutUserNestedInput;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateWithoutRefreshTokensInput = {
    id?: string;
    email: string;
    password: string;
    firstName?: string | null;
    lastName?: string | null;
    phoneNumber?: string | null;
    isActive?: boolean;
    status?: string;
    emailVerifiedAt?: Date | string | null;
    deletedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    manufacturer?: Prisma.ManufacturerCreateNestedOneWithoutUserInput;
    productUnitAuditLogs?: Prisma.ProductUnitAuditLogCreateNestedManyWithoutUserInput;
    auditActorLogs?: Prisma.AuditLogCreateNestedManyWithoutActorInput;
    userRoles?: Prisma.UserRoleCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionCreateNestedManyWithoutUserInput;
    devices?: Prisma.DeviceCreateNestedManyWithoutUserInput;
    loginHistories?: Prisma.LoginHistoryCreateNestedManyWithoutUserInput;
    twoFactorSecret?: Prisma.TwoFactorSecretCreateNestedOneWithoutUserInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenCreateNestedManyWithoutUserInput;
    passwordResetTokens?: Prisma.PasswordResetTokenCreateNestedManyWithoutUserInput;
    platformUserRoles?: Prisma.PlatformUserRoleCreateNestedManyWithoutUserInput;
    memberships?: Prisma.MembershipCreateNestedManyWithoutUserInput;
    workflowActions?: Prisma.WorkflowActionCreateNestedManyWithoutActorInput;
    workflowInstancesStarted?: Prisma.WorkflowInstanceCreateNestedManyWithoutStartedByInput;
    customerProfile?: Prisma.CustomerProfileCreateNestedOneWithoutUserInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutRefreshTokensInput = {
    id?: string;
    email: string;
    password: string;
    firstName?: string | null;
    lastName?: string | null;
    phoneNumber?: string | null;
    isActive?: boolean;
    status?: string;
    emailVerifiedAt?: Date | string | null;
    deletedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    manufacturer?: Prisma.ManufacturerUncheckedCreateNestedOneWithoutUserInput;
    productUnitAuditLogs?: Prisma.ProductUnitAuditLogUncheckedCreateNestedManyWithoutUserInput;
    auditActorLogs?: Prisma.AuditLogUncheckedCreateNestedManyWithoutActorInput;
    userRoles?: Prisma.UserRoleUncheckedCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionUncheckedCreateNestedManyWithoutUserInput;
    devices?: Prisma.DeviceUncheckedCreateNestedManyWithoutUserInput;
    loginHistories?: Prisma.LoginHistoryUncheckedCreateNestedManyWithoutUserInput;
    twoFactorSecret?: Prisma.TwoFactorSecretUncheckedCreateNestedOneWithoutUserInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenUncheckedCreateNestedManyWithoutUserInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput;
    platformUserRoles?: Prisma.PlatformUserRoleUncheckedCreateNestedManyWithoutUserInput;
    memberships?: Prisma.MembershipUncheckedCreateNestedManyWithoutUserInput;
    workflowActions?: Prisma.WorkflowActionUncheckedCreateNestedManyWithoutActorInput;
    workflowInstancesStarted?: Prisma.WorkflowInstanceUncheckedCreateNestedManyWithoutStartedByInput;
    customerProfile?: Prisma.CustomerProfileUncheckedCreateNestedOneWithoutUserInput;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutRefreshTokensInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutRefreshTokensInput, Prisma.UserUncheckedCreateWithoutRefreshTokensInput>;
};
export type UserUpsertWithoutRefreshTokensInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutRefreshTokensInput, Prisma.UserUncheckedUpdateWithoutRefreshTokensInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutRefreshTokensInput, Prisma.UserUncheckedCreateWithoutRefreshTokensInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutRefreshTokensInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutRefreshTokensInput, Prisma.UserUncheckedUpdateWithoutRefreshTokensInput>;
};
export type UserUpdateWithoutRefreshTokensInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    firstName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    emailVerifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    manufacturer?: Prisma.ManufacturerUpdateOneWithoutUserNestedInput;
    productUnitAuditLogs?: Prisma.ProductUnitAuditLogUpdateManyWithoutUserNestedInput;
    auditActorLogs?: Prisma.AuditLogUpdateManyWithoutActorNestedInput;
    userRoles?: Prisma.UserRoleUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.SessionUpdateManyWithoutUserNestedInput;
    devices?: Prisma.DeviceUpdateManyWithoutUserNestedInput;
    loginHistories?: Prisma.LoginHistoryUpdateManyWithoutUserNestedInput;
    twoFactorSecret?: Prisma.TwoFactorSecretUpdateOneWithoutUserNestedInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenUpdateManyWithoutUserNestedInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUpdateManyWithoutUserNestedInput;
    platformUserRoles?: Prisma.PlatformUserRoleUpdateManyWithoutUserNestedInput;
    memberships?: Prisma.MembershipUpdateManyWithoutUserNestedInput;
    workflowActions?: Prisma.WorkflowActionUpdateManyWithoutActorNestedInput;
    workflowInstancesStarted?: Prisma.WorkflowInstanceUpdateManyWithoutStartedByNestedInput;
    customerProfile?: Prisma.CustomerProfileUpdateOneWithoutUserNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutRefreshTokensInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    firstName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    emailVerifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    manufacturer?: Prisma.ManufacturerUncheckedUpdateOneWithoutUserNestedInput;
    productUnitAuditLogs?: Prisma.ProductUnitAuditLogUncheckedUpdateManyWithoutUserNestedInput;
    auditActorLogs?: Prisma.AuditLogUncheckedUpdateManyWithoutActorNestedInput;
    userRoles?: Prisma.UserRoleUncheckedUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput;
    devices?: Prisma.DeviceUncheckedUpdateManyWithoutUserNestedInput;
    loginHistories?: Prisma.LoginHistoryUncheckedUpdateManyWithoutUserNestedInput;
    twoFactorSecret?: Prisma.TwoFactorSecretUncheckedUpdateOneWithoutUserNestedInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenUncheckedUpdateManyWithoutUserNestedInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInput;
    platformUserRoles?: Prisma.PlatformUserRoleUncheckedUpdateManyWithoutUserNestedInput;
    memberships?: Prisma.MembershipUncheckedUpdateManyWithoutUserNestedInput;
    workflowActions?: Prisma.WorkflowActionUncheckedUpdateManyWithoutActorNestedInput;
    workflowInstancesStarted?: Prisma.WorkflowInstanceUncheckedUpdateManyWithoutStartedByNestedInput;
    customerProfile?: Prisma.CustomerProfileUncheckedUpdateOneWithoutUserNestedInput;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateWithoutDevicesInput = {
    id?: string;
    email: string;
    password: string;
    firstName?: string | null;
    lastName?: string | null;
    phoneNumber?: string | null;
    isActive?: boolean;
    status?: string;
    emailVerifiedAt?: Date | string | null;
    deletedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    manufacturer?: Prisma.ManufacturerCreateNestedOneWithoutUserInput;
    productUnitAuditLogs?: Prisma.ProductUnitAuditLogCreateNestedManyWithoutUserInput;
    auditActorLogs?: Prisma.AuditLogCreateNestedManyWithoutActorInput;
    userRoles?: Prisma.UserRoleCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionCreateNestedManyWithoutUserInput;
    refreshTokens?: Prisma.RefreshTokenCreateNestedManyWithoutUserInput;
    loginHistories?: Prisma.LoginHistoryCreateNestedManyWithoutUserInput;
    twoFactorSecret?: Prisma.TwoFactorSecretCreateNestedOneWithoutUserInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenCreateNestedManyWithoutUserInput;
    passwordResetTokens?: Prisma.PasswordResetTokenCreateNestedManyWithoutUserInput;
    platformUserRoles?: Prisma.PlatformUserRoleCreateNestedManyWithoutUserInput;
    memberships?: Prisma.MembershipCreateNestedManyWithoutUserInput;
    workflowActions?: Prisma.WorkflowActionCreateNestedManyWithoutActorInput;
    workflowInstancesStarted?: Prisma.WorkflowInstanceCreateNestedManyWithoutStartedByInput;
    customerProfile?: Prisma.CustomerProfileCreateNestedOneWithoutUserInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutDevicesInput = {
    id?: string;
    email: string;
    password: string;
    firstName?: string | null;
    lastName?: string | null;
    phoneNumber?: string | null;
    isActive?: boolean;
    status?: string;
    emailVerifiedAt?: Date | string | null;
    deletedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    manufacturer?: Prisma.ManufacturerUncheckedCreateNestedOneWithoutUserInput;
    productUnitAuditLogs?: Prisma.ProductUnitAuditLogUncheckedCreateNestedManyWithoutUserInput;
    auditActorLogs?: Prisma.AuditLogUncheckedCreateNestedManyWithoutActorInput;
    userRoles?: Prisma.UserRoleUncheckedCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionUncheckedCreateNestedManyWithoutUserInput;
    refreshTokens?: Prisma.RefreshTokenUncheckedCreateNestedManyWithoutUserInput;
    loginHistories?: Prisma.LoginHistoryUncheckedCreateNestedManyWithoutUserInput;
    twoFactorSecret?: Prisma.TwoFactorSecretUncheckedCreateNestedOneWithoutUserInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenUncheckedCreateNestedManyWithoutUserInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput;
    platformUserRoles?: Prisma.PlatformUserRoleUncheckedCreateNestedManyWithoutUserInput;
    memberships?: Prisma.MembershipUncheckedCreateNestedManyWithoutUserInput;
    workflowActions?: Prisma.WorkflowActionUncheckedCreateNestedManyWithoutActorInput;
    workflowInstancesStarted?: Prisma.WorkflowInstanceUncheckedCreateNestedManyWithoutStartedByInput;
    customerProfile?: Prisma.CustomerProfileUncheckedCreateNestedOneWithoutUserInput;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutDevicesInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutDevicesInput, Prisma.UserUncheckedCreateWithoutDevicesInput>;
};
export type UserUpsertWithoutDevicesInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutDevicesInput, Prisma.UserUncheckedUpdateWithoutDevicesInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutDevicesInput, Prisma.UserUncheckedCreateWithoutDevicesInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutDevicesInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutDevicesInput, Prisma.UserUncheckedUpdateWithoutDevicesInput>;
};
export type UserUpdateWithoutDevicesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    firstName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    emailVerifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    manufacturer?: Prisma.ManufacturerUpdateOneWithoutUserNestedInput;
    productUnitAuditLogs?: Prisma.ProductUnitAuditLogUpdateManyWithoutUserNestedInput;
    auditActorLogs?: Prisma.AuditLogUpdateManyWithoutActorNestedInput;
    userRoles?: Prisma.UserRoleUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.SessionUpdateManyWithoutUserNestedInput;
    refreshTokens?: Prisma.RefreshTokenUpdateManyWithoutUserNestedInput;
    loginHistories?: Prisma.LoginHistoryUpdateManyWithoutUserNestedInput;
    twoFactorSecret?: Prisma.TwoFactorSecretUpdateOneWithoutUserNestedInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenUpdateManyWithoutUserNestedInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUpdateManyWithoutUserNestedInput;
    platformUserRoles?: Prisma.PlatformUserRoleUpdateManyWithoutUserNestedInput;
    memberships?: Prisma.MembershipUpdateManyWithoutUserNestedInput;
    workflowActions?: Prisma.WorkflowActionUpdateManyWithoutActorNestedInput;
    workflowInstancesStarted?: Prisma.WorkflowInstanceUpdateManyWithoutStartedByNestedInput;
    customerProfile?: Prisma.CustomerProfileUpdateOneWithoutUserNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutDevicesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    firstName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    emailVerifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    manufacturer?: Prisma.ManufacturerUncheckedUpdateOneWithoutUserNestedInput;
    productUnitAuditLogs?: Prisma.ProductUnitAuditLogUncheckedUpdateManyWithoutUserNestedInput;
    auditActorLogs?: Prisma.AuditLogUncheckedUpdateManyWithoutActorNestedInput;
    userRoles?: Prisma.UserRoleUncheckedUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput;
    refreshTokens?: Prisma.RefreshTokenUncheckedUpdateManyWithoutUserNestedInput;
    loginHistories?: Prisma.LoginHistoryUncheckedUpdateManyWithoutUserNestedInput;
    twoFactorSecret?: Prisma.TwoFactorSecretUncheckedUpdateOneWithoutUserNestedInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenUncheckedUpdateManyWithoutUserNestedInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInput;
    platformUserRoles?: Prisma.PlatformUserRoleUncheckedUpdateManyWithoutUserNestedInput;
    memberships?: Prisma.MembershipUncheckedUpdateManyWithoutUserNestedInput;
    workflowActions?: Prisma.WorkflowActionUncheckedUpdateManyWithoutActorNestedInput;
    workflowInstancesStarted?: Prisma.WorkflowInstanceUncheckedUpdateManyWithoutStartedByNestedInput;
    customerProfile?: Prisma.CustomerProfileUncheckedUpdateOneWithoutUserNestedInput;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateWithoutLoginHistoriesInput = {
    id?: string;
    email: string;
    password: string;
    firstName?: string | null;
    lastName?: string | null;
    phoneNumber?: string | null;
    isActive?: boolean;
    status?: string;
    emailVerifiedAt?: Date | string | null;
    deletedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    manufacturer?: Prisma.ManufacturerCreateNestedOneWithoutUserInput;
    productUnitAuditLogs?: Prisma.ProductUnitAuditLogCreateNestedManyWithoutUserInput;
    auditActorLogs?: Prisma.AuditLogCreateNestedManyWithoutActorInput;
    userRoles?: Prisma.UserRoleCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionCreateNestedManyWithoutUserInput;
    refreshTokens?: Prisma.RefreshTokenCreateNestedManyWithoutUserInput;
    devices?: Prisma.DeviceCreateNestedManyWithoutUserInput;
    twoFactorSecret?: Prisma.TwoFactorSecretCreateNestedOneWithoutUserInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenCreateNestedManyWithoutUserInput;
    passwordResetTokens?: Prisma.PasswordResetTokenCreateNestedManyWithoutUserInput;
    platformUserRoles?: Prisma.PlatformUserRoleCreateNestedManyWithoutUserInput;
    memberships?: Prisma.MembershipCreateNestedManyWithoutUserInput;
    workflowActions?: Prisma.WorkflowActionCreateNestedManyWithoutActorInput;
    workflowInstancesStarted?: Prisma.WorkflowInstanceCreateNestedManyWithoutStartedByInput;
    customerProfile?: Prisma.CustomerProfileCreateNestedOneWithoutUserInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutLoginHistoriesInput = {
    id?: string;
    email: string;
    password: string;
    firstName?: string | null;
    lastName?: string | null;
    phoneNumber?: string | null;
    isActive?: boolean;
    status?: string;
    emailVerifiedAt?: Date | string | null;
    deletedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    manufacturer?: Prisma.ManufacturerUncheckedCreateNestedOneWithoutUserInput;
    productUnitAuditLogs?: Prisma.ProductUnitAuditLogUncheckedCreateNestedManyWithoutUserInput;
    auditActorLogs?: Prisma.AuditLogUncheckedCreateNestedManyWithoutActorInput;
    userRoles?: Prisma.UserRoleUncheckedCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionUncheckedCreateNestedManyWithoutUserInput;
    refreshTokens?: Prisma.RefreshTokenUncheckedCreateNestedManyWithoutUserInput;
    devices?: Prisma.DeviceUncheckedCreateNestedManyWithoutUserInput;
    twoFactorSecret?: Prisma.TwoFactorSecretUncheckedCreateNestedOneWithoutUserInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenUncheckedCreateNestedManyWithoutUserInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput;
    platformUserRoles?: Prisma.PlatformUserRoleUncheckedCreateNestedManyWithoutUserInput;
    memberships?: Prisma.MembershipUncheckedCreateNestedManyWithoutUserInput;
    workflowActions?: Prisma.WorkflowActionUncheckedCreateNestedManyWithoutActorInput;
    workflowInstancesStarted?: Prisma.WorkflowInstanceUncheckedCreateNestedManyWithoutStartedByInput;
    customerProfile?: Prisma.CustomerProfileUncheckedCreateNestedOneWithoutUserInput;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutLoginHistoriesInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutLoginHistoriesInput, Prisma.UserUncheckedCreateWithoutLoginHistoriesInput>;
};
export type UserUpsertWithoutLoginHistoriesInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutLoginHistoriesInput, Prisma.UserUncheckedUpdateWithoutLoginHistoriesInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutLoginHistoriesInput, Prisma.UserUncheckedCreateWithoutLoginHistoriesInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutLoginHistoriesInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutLoginHistoriesInput, Prisma.UserUncheckedUpdateWithoutLoginHistoriesInput>;
};
export type UserUpdateWithoutLoginHistoriesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    firstName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    emailVerifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    manufacturer?: Prisma.ManufacturerUpdateOneWithoutUserNestedInput;
    productUnitAuditLogs?: Prisma.ProductUnitAuditLogUpdateManyWithoutUserNestedInput;
    auditActorLogs?: Prisma.AuditLogUpdateManyWithoutActorNestedInput;
    userRoles?: Prisma.UserRoleUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.SessionUpdateManyWithoutUserNestedInput;
    refreshTokens?: Prisma.RefreshTokenUpdateManyWithoutUserNestedInput;
    devices?: Prisma.DeviceUpdateManyWithoutUserNestedInput;
    twoFactorSecret?: Prisma.TwoFactorSecretUpdateOneWithoutUserNestedInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenUpdateManyWithoutUserNestedInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUpdateManyWithoutUserNestedInput;
    platformUserRoles?: Prisma.PlatformUserRoleUpdateManyWithoutUserNestedInput;
    memberships?: Prisma.MembershipUpdateManyWithoutUserNestedInput;
    workflowActions?: Prisma.WorkflowActionUpdateManyWithoutActorNestedInput;
    workflowInstancesStarted?: Prisma.WorkflowInstanceUpdateManyWithoutStartedByNestedInput;
    customerProfile?: Prisma.CustomerProfileUpdateOneWithoutUserNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutLoginHistoriesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    firstName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    emailVerifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    manufacturer?: Prisma.ManufacturerUncheckedUpdateOneWithoutUserNestedInput;
    productUnitAuditLogs?: Prisma.ProductUnitAuditLogUncheckedUpdateManyWithoutUserNestedInput;
    auditActorLogs?: Prisma.AuditLogUncheckedUpdateManyWithoutActorNestedInput;
    userRoles?: Prisma.UserRoleUncheckedUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput;
    refreshTokens?: Prisma.RefreshTokenUncheckedUpdateManyWithoutUserNestedInput;
    devices?: Prisma.DeviceUncheckedUpdateManyWithoutUserNestedInput;
    twoFactorSecret?: Prisma.TwoFactorSecretUncheckedUpdateOneWithoutUserNestedInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenUncheckedUpdateManyWithoutUserNestedInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInput;
    platformUserRoles?: Prisma.PlatformUserRoleUncheckedUpdateManyWithoutUserNestedInput;
    memberships?: Prisma.MembershipUncheckedUpdateManyWithoutUserNestedInput;
    workflowActions?: Prisma.WorkflowActionUncheckedUpdateManyWithoutActorNestedInput;
    workflowInstancesStarted?: Prisma.WorkflowInstanceUncheckedUpdateManyWithoutStartedByNestedInput;
    customerProfile?: Prisma.CustomerProfileUncheckedUpdateOneWithoutUserNestedInput;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateWithoutTwoFactorSecretInput = {
    id?: string;
    email: string;
    password: string;
    firstName?: string | null;
    lastName?: string | null;
    phoneNumber?: string | null;
    isActive?: boolean;
    status?: string;
    emailVerifiedAt?: Date | string | null;
    deletedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    manufacturer?: Prisma.ManufacturerCreateNestedOneWithoutUserInput;
    productUnitAuditLogs?: Prisma.ProductUnitAuditLogCreateNestedManyWithoutUserInput;
    auditActorLogs?: Prisma.AuditLogCreateNestedManyWithoutActorInput;
    userRoles?: Prisma.UserRoleCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionCreateNestedManyWithoutUserInput;
    refreshTokens?: Prisma.RefreshTokenCreateNestedManyWithoutUserInput;
    devices?: Prisma.DeviceCreateNestedManyWithoutUserInput;
    loginHistories?: Prisma.LoginHistoryCreateNestedManyWithoutUserInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenCreateNestedManyWithoutUserInput;
    passwordResetTokens?: Prisma.PasswordResetTokenCreateNestedManyWithoutUserInput;
    platformUserRoles?: Prisma.PlatformUserRoleCreateNestedManyWithoutUserInput;
    memberships?: Prisma.MembershipCreateNestedManyWithoutUserInput;
    workflowActions?: Prisma.WorkflowActionCreateNestedManyWithoutActorInput;
    workflowInstancesStarted?: Prisma.WorkflowInstanceCreateNestedManyWithoutStartedByInput;
    customerProfile?: Prisma.CustomerProfileCreateNestedOneWithoutUserInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutTwoFactorSecretInput = {
    id?: string;
    email: string;
    password: string;
    firstName?: string | null;
    lastName?: string | null;
    phoneNumber?: string | null;
    isActive?: boolean;
    status?: string;
    emailVerifiedAt?: Date | string | null;
    deletedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    manufacturer?: Prisma.ManufacturerUncheckedCreateNestedOneWithoutUserInput;
    productUnitAuditLogs?: Prisma.ProductUnitAuditLogUncheckedCreateNestedManyWithoutUserInput;
    auditActorLogs?: Prisma.AuditLogUncheckedCreateNestedManyWithoutActorInput;
    userRoles?: Prisma.UserRoleUncheckedCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionUncheckedCreateNestedManyWithoutUserInput;
    refreshTokens?: Prisma.RefreshTokenUncheckedCreateNestedManyWithoutUserInput;
    devices?: Prisma.DeviceUncheckedCreateNestedManyWithoutUserInput;
    loginHistories?: Prisma.LoginHistoryUncheckedCreateNestedManyWithoutUserInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenUncheckedCreateNestedManyWithoutUserInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput;
    platformUserRoles?: Prisma.PlatformUserRoleUncheckedCreateNestedManyWithoutUserInput;
    memberships?: Prisma.MembershipUncheckedCreateNestedManyWithoutUserInput;
    workflowActions?: Prisma.WorkflowActionUncheckedCreateNestedManyWithoutActorInput;
    workflowInstancesStarted?: Prisma.WorkflowInstanceUncheckedCreateNestedManyWithoutStartedByInput;
    customerProfile?: Prisma.CustomerProfileUncheckedCreateNestedOneWithoutUserInput;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutTwoFactorSecretInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutTwoFactorSecretInput, Prisma.UserUncheckedCreateWithoutTwoFactorSecretInput>;
};
export type UserUpsertWithoutTwoFactorSecretInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutTwoFactorSecretInput, Prisma.UserUncheckedUpdateWithoutTwoFactorSecretInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutTwoFactorSecretInput, Prisma.UserUncheckedCreateWithoutTwoFactorSecretInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutTwoFactorSecretInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutTwoFactorSecretInput, Prisma.UserUncheckedUpdateWithoutTwoFactorSecretInput>;
};
export type UserUpdateWithoutTwoFactorSecretInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    firstName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    emailVerifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    manufacturer?: Prisma.ManufacturerUpdateOneWithoutUserNestedInput;
    productUnitAuditLogs?: Prisma.ProductUnitAuditLogUpdateManyWithoutUserNestedInput;
    auditActorLogs?: Prisma.AuditLogUpdateManyWithoutActorNestedInput;
    userRoles?: Prisma.UserRoleUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.SessionUpdateManyWithoutUserNestedInput;
    refreshTokens?: Prisma.RefreshTokenUpdateManyWithoutUserNestedInput;
    devices?: Prisma.DeviceUpdateManyWithoutUserNestedInput;
    loginHistories?: Prisma.LoginHistoryUpdateManyWithoutUserNestedInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenUpdateManyWithoutUserNestedInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUpdateManyWithoutUserNestedInput;
    platformUserRoles?: Prisma.PlatformUserRoleUpdateManyWithoutUserNestedInput;
    memberships?: Prisma.MembershipUpdateManyWithoutUserNestedInput;
    workflowActions?: Prisma.WorkflowActionUpdateManyWithoutActorNestedInput;
    workflowInstancesStarted?: Prisma.WorkflowInstanceUpdateManyWithoutStartedByNestedInput;
    customerProfile?: Prisma.CustomerProfileUpdateOneWithoutUserNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutTwoFactorSecretInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    firstName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    emailVerifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    manufacturer?: Prisma.ManufacturerUncheckedUpdateOneWithoutUserNestedInput;
    productUnitAuditLogs?: Prisma.ProductUnitAuditLogUncheckedUpdateManyWithoutUserNestedInput;
    auditActorLogs?: Prisma.AuditLogUncheckedUpdateManyWithoutActorNestedInput;
    userRoles?: Prisma.UserRoleUncheckedUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput;
    refreshTokens?: Prisma.RefreshTokenUncheckedUpdateManyWithoutUserNestedInput;
    devices?: Prisma.DeviceUncheckedUpdateManyWithoutUserNestedInput;
    loginHistories?: Prisma.LoginHistoryUncheckedUpdateManyWithoutUserNestedInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenUncheckedUpdateManyWithoutUserNestedInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInput;
    platformUserRoles?: Prisma.PlatformUserRoleUncheckedUpdateManyWithoutUserNestedInput;
    memberships?: Prisma.MembershipUncheckedUpdateManyWithoutUserNestedInput;
    workflowActions?: Prisma.WorkflowActionUncheckedUpdateManyWithoutActorNestedInput;
    workflowInstancesStarted?: Prisma.WorkflowInstanceUncheckedUpdateManyWithoutStartedByNestedInput;
    customerProfile?: Prisma.CustomerProfileUncheckedUpdateOneWithoutUserNestedInput;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateWithoutEmailVerificationTokensInput = {
    id?: string;
    email: string;
    password: string;
    firstName?: string | null;
    lastName?: string | null;
    phoneNumber?: string | null;
    isActive?: boolean;
    status?: string;
    emailVerifiedAt?: Date | string | null;
    deletedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    manufacturer?: Prisma.ManufacturerCreateNestedOneWithoutUserInput;
    productUnitAuditLogs?: Prisma.ProductUnitAuditLogCreateNestedManyWithoutUserInput;
    auditActorLogs?: Prisma.AuditLogCreateNestedManyWithoutActorInput;
    userRoles?: Prisma.UserRoleCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionCreateNestedManyWithoutUserInput;
    refreshTokens?: Prisma.RefreshTokenCreateNestedManyWithoutUserInput;
    devices?: Prisma.DeviceCreateNestedManyWithoutUserInput;
    loginHistories?: Prisma.LoginHistoryCreateNestedManyWithoutUserInput;
    twoFactorSecret?: Prisma.TwoFactorSecretCreateNestedOneWithoutUserInput;
    passwordResetTokens?: Prisma.PasswordResetTokenCreateNestedManyWithoutUserInput;
    platformUserRoles?: Prisma.PlatformUserRoleCreateNestedManyWithoutUserInput;
    memberships?: Prisma.MembershipCreateNestedManyWithoutUserInput;
    workflowActions?: Prisma.WorkflowActionCreateNestedManyWithoutActorInput;
    workflowInstancesStarted?: Prisma.WorkflowInstanceCreateNestedManyWithoutStartedByInput;
    customerProfile?: Prisma.CustomerProfileCreateNestedOneWithoutUserInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutEmailVerificationTokensInput = {
    id?: string;
    email: string;
    password: string;
    firstName?: string | null;
    lastName?: string | null;
    phoneNumber?: string | null;
    isActive?: boolean;
    status?: string;
    emailVerifiedAt?: Date | string | null;
    deletedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    manufacturer?: Prisma.ManufacturerUncheckedCreateNestedOneWithoutUserInput;
    productUnitAuditLogs?: Prisma.ProductUnitAuditLogUncheckedCreateNestedManyWithoutUserInput;
    auditActorLogs?: Prisma.AuditLogUncheckedCreateNestedManyWithoutActorInput;
    userRoles?: Prisma.UserRoleUncheckedCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionUncheckedCreateNestedManyWithoutUserInput;
    refreshTokens?: Prisma.RefreshTokenUncheckedCreateNestedManyWithoutUserInput;
    devices?: Prisma.DeviceUncheckedCreateNestedManyWithoutUserInput;
    loginHistories?: Prisma.LoginHistoryUncheckedCreateNestedManyWithoutUserInput;
    twoFactorSecret?: Prisma.TwoFactorSecretUncheckedCreateNestedOneWithoutUserInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput;
    platformUserRoles?: Prisma.PlatformUserRoleUncheckedCreateNestedManyWithoutUserInput;
    memberships?: Prisma.MembershipUncheckedCreateNestedManyWithoutUserInput;
    workflowActions?: Prisma.WorkflowActionUncheckedCreateNestedManyWithoutActorInput;
    workflowInstancesStarted?: Prisma.WorkflowInstanceUncheckedCreateNestedManyWithoutStartedByInput;
    customerProfile?: Prisma.CustomerProfileUncheckedCreateNestedOneWithoutUserInput;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutEmailVerificationTokensInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutEmailVerificationTokensInput, Prisma.UserUncheckedCreateWithoutEmailVerificationTokensInput>;
};
export type UserUpsertWithoutEmailVerificationTokensInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutEmailVerificationTokensInput, Prisma.UserUncheckedUpdateWithoutEmailVerificationTokensInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutEmailVerificationTokensInput, Prisma.UserUncheckedCreateWithoutEmailVerificationTokensInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutEmailVerificationTokensInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutEmailVerificationTokensInput, Prisma.UserUncheckedUpdateWithoutEmailVerificationTokensInput>;
};
export type UserUpdateWithoutEmailVerificationTokensInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    firstName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    emailVerifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    manufacturer?: Prisma.ManufacturerUpdateOneWithoutUserNestedInput;
    productUnitAuditLogs?: Prisma.ProductUnitAuditLogUpdateManyWithoutUserNestedInput;
    auditActorLogs?: Prisma.AuditLogUpdateManyWithoutActorNestedInput;
    userRoles?: Prisma.UserRoleUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.SessionUpdateManyWithoutUserNestedInput;
    refreshTokens?: Prisma.RefreshTokenUpdateManyWithoutUserNestedInput;
    devices?: Prisma.DeviceUpdateManyWithoutUserNestedInput;
    loginHistories?: Prisma.LoginHistoryUpdateManyWithoutUserNestedInput;
    twoFactorSecret?: Prisma.TwoFactorSecretUpdateOneWithoutUserNestedInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUpdateManyWithoutUserNestedInput;
    platformUserRoles?: Prisma.PlatformUserRoleUpdateManyWithoutUserNestedInput;
    memberships?: Prisma.MembershipUpdateManyWithoutUserNestedInput;
    workflowActions?: Prisma.WorkflowActionUpdateManyWithoutActorNestedInput;
    workflowInstancesStarted?: Prisma.WorkflowInstanceUpdateManyWithoutStartedByNestedInput;
    customerProfile?: Prisma.CustomerProfileUpdateOneWithoutUserNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutEmailVerificationTokensInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    firstName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    emailVerifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    manufacturer?: Prisma.ManufacturerUncheckedUpdateOneWithoutUserNestedInput;
    productUnitAuditLogs?: Prisma.ProductUnitAuditLogUncheckedUpdateManyWithoutUserNestedInput;
    auditActorLogs?: Prisma.AuditLogUncheckedUpdateManyWithoutActorNestedInput;
    userRoles?: Prisma.UserRoleUncheckedUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput;
    refreshTokens?: Prisma.RefreshTokenUncheckedUpdateManyWithoutUserNestedInput;
    devices?: Prisma.DeviceUncheckedUpdateManyWithoutUserNestedInput;
    loginHistories?: Prisma.LoginHistoryUncheckedUpdateManyWithoutUserNestedInput;
    twoFactorSecret?: Prisma.TwoFactorSecretUncheckedUpdateOneWithoutUserNestedInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInput;
    platformUserRoles?: Prisma.PlatformUserRoleUncheckedUpdateManyWithoutUserNestedInput;
    memberships?: Prisma.MembershipUncheckedUpdateManyWithoutUserNestedInput;
    workflowActions?: Prisma.WorkflowActionUncheckedUpdateManyWithoutActorNestedInput;
    workflowInstancesStarted?: Prisma.WorkflowInstanceUncheckedUpdateManyWithoutStartedByNestedInput;
    customerProfile?: Prisma.CustomerProfileUncheckedUpdateOneWithoutUserNestedInput;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateWithoutPasswordResetTokensInput = {
    id?: string;
    email: string;
    password: string;
    firstName?: string | null;
    lastName?: string | null;
    phoneNumber?: string | null;
    isActive?: boolean;
    status?: string;
    emailVerifiedAt?: Date | string | null;
    deletedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    manufacturer?: Prisma.ManufacturerCreateNestedOneWithoutUserInput;
    productUnitAuditLogs?: Prisma.ProductUnitAuditLogCreateNestedManyWithoutUserInput;
    auditActorLogs?: Prisma.AuditLogCreateNestedManyWithoutActorInput;
    userRoles?: Prisma.UserRoleCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionCreateNestedManyWithoutUserInput;
    refreshTokens?: Prisma.RefreshTokenCreateNestedManyWithoutUserInput;
    devices?: Prisma.DeviceCreateNestedManyWithoutUserInput;
    loginHistories?: Prisma.LoginHistoryCreateNestedManyWithoutUserInput;
    twoFactorSecret?: Prisma.TwoFactorSecretCreateNestedOneWithoutUserInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenCreateNestedManyWithoutUserInput;
    platformUserRoles?: Prisma.PlatformUserRoleCreateNestedManyWithoutUserInput;
    memberships?: Prisma.MembershipCreateNestedManyWithoutUserInput;
    workflowActions?: Prisma.WorkflowActionCreateNestedManyWithoutActorInput;
    workflowInstancesStarted?: Prisma.WorkflowInstanceCreateNestedManyWithoutStartedByInput;
    customerProfile?: Prisma.CustomerProfileCreateNestedOneWithoutUserInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutPasswordResetTokensInput = {
    id?: string;
    email: string;
    password: string;
    firstName?: string | null;
    lastName?: string | null;
    phoneNumber?: string | null;
    isActive?: boolean;
    status?: string;
    emailVerifiedAt?: Date | string | null;
    deletedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    manufacturer?: Prisma.ManufacturerUncheckedCreateNestedOneWithoutUserInput;
    productUnitAuditLogs?: Prisma.ProductUnitAuditLogUncheckedCreateNestedManyWithoutUserInput;
    auditActorLogs?: Prisma.AuditLogUncheckedCreateNestedManyWithoutActorInput;
    userRoles?: Prisma.UserRoleUncheckedCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionUncheckedCreateNestedManyWithoutUserInput;
    refreshTokens?: Prisma.RefreshTokenUncheckedCreateNestedManyWithoutUserInput;
    devices?: Prisma.DeviceUncheckedCreateNestedManyWithoutUserInput;
    loginHistories?: Prisma.LoginHistoryUncheckedCreateNestedManyWithoutUserInput;
    twoFactorSecret?: Prisma.TwoFactorSecretUncheckedCreateNestedOneWithoutUserInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenUncheckedCreateNestedManyWithoutUserInput;
    platformUserRoles?: Prisma.PlatformUserRoleUncheckedCreateNestedManyWithoutUserInput;
    memberships?: Prisma.MembershipUncheckedCreateNestedManyWithoutUserInput;
    workflowActions?: Prisma.WorkflowActionUncheckedCreateNestedManyWithoutActorInput;
    workflowInstancesStarted?: Prisma.WorkflowInstanceUncheckedCreateNestedManyWithoutStartedByInput;
    customerProfile?: Prisma.CustomerProfileUncheckedCreateNestedOneWithoutUserInput;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutPasswordResetTokensInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutPasswordResetTokensInput, Prisma.UserUncheckedCreateWithoutPasswordResetTokensInput>;
};
export type UserUpsertWithoutPasswordResetTokensInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutPasswordResetTokensInput, Prisma.UserUncheckedUpdateWithoutPasswordResetTokensInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutPasswordResetTokensInput, Prisma.UserUncheckedCreateWithoutPasswordResetTokensInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutPasswordResetTokensInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutPasswordResetTokensInput, Prisma.UserUncheckedUpdateWithoutPasswordResetTokensInput>;
};
export type UserUpdateWithoutPasswordResetTokensInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    firstName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    emailVerifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    manufacturer?: Prisma.ManufacturerUpdateOneWithoutUserNestedInput;
    productUnitAuditLogs?: Prisma.ProductUnitAuditLogUpdateManyWithoutUserNestedInput;
    auditActorLogs?: Prisma.AuditLogUpdateManyWithoutActorNestedInput;
    userRoles?: Prisma.UserRoleUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.SessionUpdateManyWithoutUserNestedInput;
    refreshTokens?: Prisma.RefreshTokenUpdateManyWithoutUserNestedInput;
    devices?: Prisma.DeviceUpdateManyWithoutUserNestedInput;
    loginHistories?: Prisma.LoginHistoryUpdateManyWithoutUserNestedInput;
    twoFactorSecret?: Prisma.TwoFactorSecretUpdateOneWithoutUserNestedInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenUpdateManyWithoutUserNestedInput;
    platformUserRoles?: Prisma.PlatformUserRoleUpdateManyWithoutUserNestedInput;
    memberships?: Prisma.MembershipUpdateManyWithoutUserNestedInput;
    workflowActions?: Prisma.WorkflowActionUpdateManyWithoutActorNestedInput;
    workflowInstancesStarted?: Prisma.WorkflowInstanceUpdateManyWithoutStartedByNestedInput;
    customerProfile?: Prisma.CustomerProfileUpdateOneWithoutUserNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutPasswordResetTokensInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    firstName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    emailVerifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    manufacturer?: Prisma.ManufacturerUncheckedUpdateOneWithoutUserNestedInput;
    productUnitAuditLogs?: Prisma.ProductUnitAuditLogUncheckedUpdateManyWithoutUserNestedInput;
    auditActorLogs?: Prisma.AuditLogUncheckedUpdateManyWithoutActorNestedInput;
    userRoles?: Prisma.UserRoleUncheckedUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput;
    refreshTokens?: Prisma.RefreshTokenUncheckedUpdateManyWithoutUserNestedInput;
    devices?: Prisma.DeviceUncheckedUpdateManyWithoutUserNestedInput;
    loginHistories?: Prisma.LoginHistoryUncheckedUpdateManyWithoutUserNestedInput;
    twoFactorSecret?: Prisma.TwoFactorSecretUncheckedUpdateOneWithoutUserNestedInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenUncheckedUpdateManyWithoutUserNestedInput;
    platformUserRoles?: Prisma.PlatformUserRoleUncheckedUpdateManyWithoutUserNestedInput;
    memberships?: Prisma.MembershipUncheckedUpdateManyWithoutUserNestedInput;
    workflowActions?: Prisma.WorkflowActionUncheckedUpdateManyWithoutActorNestedInput;
    workflowInstancesStarted?: Prisma.WorkflowInstanceUncheckedUpdateManyWithoutStartedByNestedInput;
    customerProfile?: Prisma.CustomerProfileUncheckedUpdateOneWithoutUserNestedInput;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateWithoutPlatformUserRolesInput = {
    id?: string;
    email: string;
    password: string;
    firstName?: string | null;
    lastName?: string | null;
    phoneNumber?: string | null;
    isActive?: boolean;
    status?: string;
    emailVerifiedAt?: Date | string | null;
    deletedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    manufacturer?: Prisma.ManufacturerCreateNestedOneWithoutUserInput;
    productUnitAuditLogs?: Prisma.ProductUnitAuditLogCreateNestedManyWithoutUserInput;
    auditActorLogs?: Prisma.AuditLogCreateNestedManyWithoutActorInput;
    userRoles?: Prisma.UserRoleCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionCreateNestedManyWithoutUserInput;
    refreshTokens?: Prisma.RefreshTokenCreateNestedManyWithoutUserInput;
    devices?: Prisma.DeviceCreateNestedManyWithoutUserInput;
    loginHistories?: Prisma.LoginHistoryCreateNestedManyWithoutUserInput;
    twoFactorSecret?: Prisma.TwoFactorSecretCreateNestedOneWithoutUserInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenCreateNestedManyWithoutUserInput;
    passwordResetTokens?: Prisma.PasswordResetTokenCreateNestedManyWithoutUserInput;
    memberships?: Prisma.MembershipCreateNestedManyWithoutUserInput;
    workflowActions?: Prisma.WorkflowActionCreateNestedManyWithoutActorInput;
    workflowInstancesStarted?: Prisma.WorkflowInstanceCreateNestedManyWithoutStartedByInput;
    customerProfile?: Prisma.CustomerProfileCreateNestedOneWithoutUserInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutPlatformUserRolesInput = {
    id?: string;
    email: string;
    password: string;
    firstName?: string | null;
    lastName?: string | null;
    phoneNumber?: string | null;
    isActive?: boolean;
    status?: string;
    emailVerifiedAt?: Date | string | null;
    deletedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    manufacturer?: Prisma.ManufacturerUncheckedCreateNestedOneWithoutUserInput;
    productUnitAuditLogs?: Prisma.ProductUnitAuditLogUncheckedCreateNestedManyWithoutUserInput;
    auditActorLogs?: Prisma.AuditLogUncheckedCreateNestedManyWithoutActorInput;
    userRoles?: Prisma.UserRoleUncheckedCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionUncheckedCreateNestedManyWithoutUserInput;
    refreshTokens?: Prisma.RefreshTokenUncheckedCreateNestedManyWithoutUserInput;
    devices?: Prisma.DeviceUncheckedCreateNestedManyWithoutUserInput;
    loginHistories?: Prisma.LoginHistoryUncheckedCreateNestedManyWithoutUserInput;
    twoFactorSecret?: Prisma.TwoFactorSecretUncheckedCreateNestedOneWithoutUserInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenUncheckedCreateNestedManyWithoutUserInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput;
    memberships?: Prisma.MembershipUncheckedCreateNestedManyWithoutUserInput;
    workflowActions?: Prisma.WorkflowActionUncheckedCreateNestedManyWithoutActorInput;
    workflowInstancesStarted?: Prisma.WorkflowInstanceUncheckedCreateNestedManyWithoutStartedByInput;
    customerProfile?: Prisma.CustomerProfileUncheckedCreateNestedOneWithoutUserInput;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutPlatformUserRolesInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutPlatformUserRolesInput, Prisma.UserUncheckedCreateWithoutPlatformUserRolesInput>;
};
export type UserUpsertWithoutPlatformUserRolesInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutPlatformUserRolesInput, Prisma.UserUncheckedUpdateWithoutPlatformUserRolesInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutPlatformUserRolesInput, Prisma.UserUncheckedCreateWithoutPlatformUserRolesInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutPlatformUserRolesInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutPlatformUserRolesInput, Prisma.UserUncheckedUpdateWithoutPlatformUserRolesInput>;
};
export type UserUpdateWithoutPlatformUserRolesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    firstName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    emailVerifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    manufacturer?: Prisma.ManufacturerUpdateOneWithoutUserNestedInput;
    productUnitAuditLogs?: Prisma.ProductUnitAuditLogUpdateManyWithoutUserNestedInput;
    auditActorLogs?: Prisma.AuditLogUpdateManyWithoutActorNestedInput;
    userRoles?: Prisma.UserRoleUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.SessionUpdateManyWithoutUserNestedInput;
    refreshTokens?: Prisma.RefreshTokenUpdateManyWithoutUserNestedInput;
    devices?: Prisma.DeviceUpdateManyWithoutUserNestedInput;
    loginHistories?: Prisma.LoginHistoryUpdateManyWithoutUserNestedInput;
    twoFactorSecret?: Prisma.TwoFactorSecretUpdateOneWithoutUserNestedInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenUpdateManyWithoutUserNestedInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUpdateManyWithoutUserNestedInput;
    memberships?: Prisma.MembershipUpdateManyWithoutUserNestedInput;
    workflowActions?: Prisma.WorkflowActionUpdateManyWithoutActorNestedInput;
    workflowInstancesStarted?: Prisma.WorkflowInstanceUpdateManyWithoutStartedByNestedInput;
    customerProfile?: Prisma.CustomerProfileUpdateOneWithoutUserNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutPlatformUserRolesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    firstName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    emailVerifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    manufacturer?: Prisma.ManufacturerUncheckedUpdateOneWithoutUserNestedInput;
    productUnitAuditLogs?: Prisma.ProductUnitAuditLogUncheckedUpdateManyWithoutUserNestedInput;
    auditActorLogs?: Prisma.AuditLogUncheckedUpdateManyWithoutActorNestedInput;
    userRoles?: Prisma.UserRoleUncheckedUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput;
    refreshTokens?: Prisma.RefreshTokenUncheckedUpdateManyWithoutUserNestedInput;
    devices?: Prisma.DeviceUncheckedUpdateManyWithoutUserNestedInput;
    loginHistories?: Prisma.LoginHistoryUncheckedUpdateManyWithoutUserNestedInput;
    twoFactorSecret?: Prisma.TwoFactorSecretUncheckedUpdateOneWithoutUserNestedInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenUncheckedUpdateManyWithoutUserNestedInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInput;
    memberships?: Prisma.MembershipUncheckedUpdateManyWithoutUserNestedInput;
    workflowActions?: Prisma.WorkflowActionUncheckedUpdateManyWithoutActorNestedInput;
    workflowInstancesStarted?: Prisma.WorkflowInstanceUncheckedUpdateManyWithoutStartedByNestedInput;
    customerProfile?: Prisma.CustomerProfileUncheckedUpdateOneWithoutUserNestedInput;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateWithoutMembershipsInput = {
    id?: string;
    email: string;
    password: string;
    firstName?: string | null;
    lastName?: string | null;
    phoneNumber?: string | null;
    isActive?: boolean;
    status?: string;
    emailVerifiedAt?: Date | string | null;
    deletedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    manufacturer?: Prisma.ManufacturerCreateNestedOneWithoutUserInput;
    productUnitAuditLogs?: Prisma.ProductUnitAuditLogCreateNestedManyWithoutUserInput;
    auditActorLogs?: Prisma.AuditLogCreateNestedManyWithoutActorInput;
    userRoles?: Prisma.UserRoleCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionCreateNestedManyWithoutUserInput;
    refreshTokens?: Prisma.RefreshTokenCreateNestedManyWithoutUserInput;
    devices?: Prisma.DeviceCreateNestedManyWithoutUserInput;
    loginHistories?: Prisma.LoginHistoryCreateNestedManyWithoutUserInput;
    twoFactorSecret?: Prisma.TwoFactorSecretCreateNestedOneWithoutUserInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenCreateNestedManyWithoutUserInput;
    passwordResetTokens?: Prisma.PasswordResetTokenCreateNestedManyWithoutUserInput;
    platformUserRoles?: Prisma.PlatformUserRoleCreateNestedManyWithoutUserInput;
    workflowActions?: Prisma.WorkflowActionCreateNestedManyWithoutActorInput;
    workflowInstancesStarted?: Prisma.WorkflowInstanceCreateNestedManyWithoutStartedByInput;
    customerProfile?: Prisma.CustomerProfileCreateNestedOneWithoutUserInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutMembershipsInput = {
    id?: string;
    email: string;
    password: string;
    firstName?: string | null;
    lastName?: string | null;
    phoneNumber?: string | null;
    isActive?: boolean;
    status?: string;
    emailVerifiedAt?: Date | string | null;
    deletedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    manufacturer?: Prisma.ManufacturerUncheckedCreateNestedOneWithoutUserInput;
    productUnitAuditLogs?: Prisma.ProductUnitAuditLogUncheckedCreateNestedManyWithoutUserInput;
    auditActorLogs?: Prisma.AuditLogUncheckedCreateNestedManyWithoutActorInput;
    userRoles?: Prisma.UserRoleUncheckedCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionUncheckedCreateNestedManyWithoutUserInput;
    refreshTokens?: Prisma.RefreshTokenUncheckedCreateNestedManyWithoutUserInput;
    devices?: Prisma.DeviceUncheckedCreateNestedManyWithoutUserInput;
    loginHistories?: Prisma.LoginHistoryUncheckedCreateNestedManyWithoutUserInput;
    twoFactorSecret?: Prisma.TwoFactorSecretUncheckedCreateNestedOneWithoutUserInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenUncheckedCreateNestedManyWithoutUserInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput;
    platformUserRoles?: Prisma.PlatformUserRoleUncheckedCreateNestedManyWithoutUserInput;
    workflowActions?: Prisma.WorkflowActionUncheckedCreateNestedManyWithoutActorInput;
    workflowInstancesStarted?: Prisma.WorkflowInstanceUncheckedCreateNestedManyWithoutStartedByInput;
    customerProfile?: Prisma.CustomerProfileUncheckedCreateNestedOneWithoutUserInput;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutMembershipsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutMembershipsInput, Prisma.UserUncheckedCreateWithoutMembershipsInput>;
};
export type UserUpsertWithoutMembershipsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutMembershipsInput, Prisma.UserUncheckedUpdateWithoutMembershipsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutMembershipsInput, Prisma.UserUncheckedCreateWithoutMembershipsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutMembershipsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutMembershipsInput, Prisma.UserUncheckedUpdateWithoutMembershipsInput>;
};
export type UserUpdateWithoutMembershipsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    firstName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    emailVerifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    manufacturer?: Prisma.ManufacturerUpdateOneWithoutUserNestedInput;
    productUnitAuditLogs?: Prisma.ProductUnitAuditLogUpdateManyWithoutUserNestedInput;
    auditActorLogs?: Prisma.AuditLogUpdateManyWithoutActorNestedInput;
    userRoles?: Prisma.UserRoleUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.SessionUpdateManyWithoutUserNestedInput;
    refreshTokens?: Prisma.RefreshTokenUpdateManyWithoutUserNestedInput;
    devices?: Prisma.DeviceUpdateManyWithoutUserNestedInput;
    loginHistories?: Prisma.LoginHistoryUpdateManyWithoutUserNestedInput;
    twoFactorSecret?: Prisma.TwoFactorSecretUpdateOneWithoutUserNestedInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenUpdateManyWithoutUserNestedInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUpdateManyWithoutUserNestedInput;
    platformUserRoles?: Prisma.PlatformUserRoleUpdateManyWithoutUserNestedInput;
    workflowActions?: Prisma.WorkflowActionUpdateManyWithoutActorNestedInput;
    workflowInstancesStarted?: Prisma.WorkflowInstanceUpdateManyWithoutStartedByNestedInput;
    customerProfile?: Prisma.CustomerProfileUpdateOneWithoutUserNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutMembershipsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    firstName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    emailVerifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    manufacturer?: Prisma.ManufacturerUncheckedUpdateOneWithoutUserNestedInput;
    productUnitAuditLogs?: Prisma.ProductUnitAuditLogUncheckedUpdateManyWithoutUserNestedInput;
    auditActorLogs?: Prisma.AuditLogUncheckedUpdateManyWithoutActorNestedInput;
    userRoles?: Prisma.UserRoleUncheckedUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput;
    refreshTokens?: Prisma.RefreshTokenUncheckedUpdateManyWithoutUserNestedInput;
    devices?: Prisma.DeviceUncheckedUpdateManyWithoutUserNestedInput;
    loginHistories?: Prisma.LoginHistoryUncheckedUpdateManyWithoutUserNestedInput;
    twoFactorSecret?: Prisma.TwoFactorSecretUncheckedUpdateOneWithoutUserNestedInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenUncheckedUpdateManyWithoutUserNestedInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInput;
    platformUserRoles?: Prisma.PlatformUserRoleUncheckedUpdateManyWithoutUserNestedInput;
    workflowActions?: Prisma.WorkflowActionUncheckedUpdateManyWithoutActorNestedInput;
    workflowInstancesStarted?: Prisma.WorkflowInstanceUncheckedUpdateManyWithoutStartedByNestedInput;
    customerProfile?: Prisma.CustomerProfileUncheckedUpdateOneWithoutUserNestedInput;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateWithoutUserRolesInput = {
    id?: string;
    email: string;
    password: string;
    firstName?: string | null;
    lastName?: string | null;
    phoneNumber?: string | null;
    isActive?: boolean;
    status?: string;
    emailVerifiedAt?: Date | string | null;
    deletedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    manufacturer?: Prisma.ManufacturerCreateNestedOneWithoutUserInput;
    productUnitAuditLogs?: Prisma.ProductUnitAuditLogCreateNestedManyWithoutUserInput;
    auditActorLogs?: Prisma.AuditLogCreateNestedManyWithoutActorInput;
    sessions?: Prisma.SessionCreateNestedManyWithoutUserInput;
    refreshTokens?: Prisma.RefreshTokenCreateNestedManyWithoutUserInput;
    devices?: Prisma.DeviceCreateNestedManyWithoutUserInput;
    loginHistories?: Prisma.LoginHistoryCreateNestedManyWithoutUserInput;
    twoFactorSecret?: Prisma.TwoFactorSecretCreateNestedOneWithoutUserInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenCreateNestedManyWithoutUserInput;
    passwordResetTokens?: Prisma.PasswordResetTokenCreateNestedManyWithoutUserInput;
    platformUserRoles?: Prisma.PlatformUserRoleCreateNestedManyWithoutUserInput;
    memberships?: Prisma.MembershipCreateNestedManyWithoutUserInput;
    workflowActions?: Prisma.WorkflowActionCreateNestedManyWithoutActorInput;
    workflowInstancesStarted?: Prisma.WorkflowInstanceCreateNestedManyWithoutStartedByInput;
    customerProfile?: Prisma.CustomerProfileCreateNestedOneWithoutUserInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutUserRolesInput = {
    id?: string;
    email: string;
    password: string;
    firstName?: string | null;
    lastName?: string | null;
    phoneNumber?: string | null;
    isActive?: boolean;
    status?: string;
    emailVerifiedAt?: Date | string | null;
    deletedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    manufacturer?: Prisma.ManufacturerUncheckedCreateNestedOneWithoutUserInput;
    productUnitAuditLogs?: Prisma.ProductUnitAuditLogUncheckedCreateNestedManyWithoutUserInput;
    auditActorLogs?: Prisma.AuditLogUncheckedCreateNestedManyWithoutActorInput;
    sessions?: Prisma.SessionUncheckedCreateNestedManyWithoutUserInput;
    refreshTokens?: Prisma.RefreshTokenUncheckedCreateNestedManyWithoutUserInput;
    devices?: Prisma.DeviceUncheckedCreateNestedManyWithoutUserInput;
    loginHistories?: Prisma.LoginHistoryUncheckedCreateNestedManyWithoutUserInput;
    twoFactorSecret?: Prisma.TwoFactorSecretUncheckedCreateNestedOneWithoutUserInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenUncheckedCreateNestedManyWithoutUserInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput;
    platformUserRoles?: Prisma.PlatformUserRoleUncheckedCreateNestedManyWithoutUserInput;
    memberships?: Prisma.MembershipUncheckedCreateNestedManyWithoutUserInput;
    workflowActions?: Prisma.WorkflowActionUncheckedCreateNestedManyWithoutActorInput;
    workflowInstancesStarted?: Prisma.WorkflowInstanceUncheckedCreateNestedManyWithoutStartedByInput;
    customerProfile?: Prisma.CustomerProfileUncheckedCreateNestedOneWithoutUserInput;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutUserRolesInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutUserRolesInput, Prisma.UserUncheckedCreateWithoutUserRolesInput>;
};
export type UserUpsertWithoutUserRolesInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutUserRolesInput, Prisma.UserUncheckedUpdateWithoutUserRolesInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutUserRolesInput, Prisma.UserUncheckedCreateWithoutUserRolesInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutUserRolesInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutUserRolesInput, Prisma.UserUncheckedUpdateWithoutUserRolesInput>;
};
export type UserUpdateWithoutUserRolesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    firstName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    emailVerifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    manufacturer?: Prisma.ManufacturerUpdateOneWithoutUserNestedInput;
    productUnitAuditLogs?: Prisma.ProductUnitAuditLogUpdateManyWithoutUserNestedInput;
    auditActorLogs?: Prisma.AuditLogUpdateManyWithoutActorNestedInput;
    sessions?: Prisma.SessionUpdateManyWithoutUserNestedInput;
    refreshTokens?: Prisma.RefreshTokenUpdateManyWithoutUserNestedInput;
    devices?: Prisma.DeviceUpdateManyWithoutUserNestedInput;
    loginHistories?: Prisma.LoginHistoryUpdateManyWithoutUserNestedInput;
    twoFactorSecret?: Prisma.TwoFactorSecretUpdateOneWithoutUserNestedInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenUpdateManyWithoutUserNestedInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUpdateManyWithoutUserNestedInput;
    platformUserRoles?: Prisma.PlatformUserRoleUpdateManyWithoutUserNestedInput;
    memberships?: Prisma.MembershipUpdateManyWithoutUserNestedInput;
    workflowActions?: Prisma.WorkflowActionUpdateManyWithoutActorNestedInput;
    workflowInstancesStarted?: Prisma.WorkflowInstanceUpdateManyWithoutStartedByNestedInput;
    customerProfile?: Prisma.CustomerProfileUpdateOneWithoutUserNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutUserRolesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    firstName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    emailVerifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    manufacturer?: Prisma.ManufacturerUncheckedUpdateOneWithoutUserNestedInput;
    productUnitAuditLogs?: Prisma.ProductUnitAuditLogUncheckedUpdateManyWithoutUserNestedInput;
    auditActorLogs?: Prisma.AuditLogUncheckedUpdateManyWithoutActorNestedInput;
    sessions?: Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput;
    refreshTokens?: Prisma.RefreshTokenUncheckedUpdateManyWithoutUserNestedInput;
    devices?: Prisma.DeviceUncheckedUpdateManyWithoutUserNestedInput;
    loginHistories?: Prisma.LoginHistoryUncheckedUpdateManyWithoutUserNestedInput;
    twoFactorSecret?: Prisma.TwoFactorSecretUncheckedUpdateOneWithoutUserNestedInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenUncheckedUpdateManyWithoutUserNestedInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInput;
    platformUserRoles?: Prisma.PlatformUserRoleUncheckedUpdateManyWithoutUserNestedInput;
    memberships?: Prisma.MembershipUncheckedUpdateManyWithoutUserNestedInput;
    workflowActions?: Prisma.WorkflowActionUncheckedUpdateManyWithoutActorNestedInput;
    workflowInstancesStarted?: Prisma.WorkflowInstanceUncheckedUpdateManyWithoutStartedByNestedInput;
    customerProfile?: Prisma.CustomerProfileUncheckedUpdateOneWithoutUserNestedInput;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateWithoutManufacturerInput = {
    id?: string;
    email: string;
    password: string;
    firstName?: string | null;
    lastName?: string | null;
    phoneNumber?: string | null;
    isActive?: boolean;
    status?: string;
    emailVerifiedAt?: Date | string | null;
    deletedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    productUnitAuditLogs?: Prisma.ProductUnitAuditLogCreateNestedManyWithoutUserInput;
    auditActorLogs?: Prisma.AuditLogCreateNestedManyWithoutActorInput;
    userRoles?: Prisma.UserRoleCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionCreateNestedManyWithoutUserInput;
    refreshTokens?: Prisma.RefreshTokenCreateNestedManyWithoutUserInput;
    devices?: Prisma.DeviceCreateNestedManyWithoutUserInput;
    loginHistories?: Prisma.LoginHistoryCreateNestedManyWithoutUserInput;
    twoFactorSecret?: Prisma.TwoFactorSecretCreateNestedOneWithoutUserInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenCreateNestedManyWithoutUserInput;
    passwordResetTokens?: Prisma.PasswordResetTokenCreateNestedManyWithoutUserInput;
    platformUserRoles?: Prisma.PlatformUserRoleCreateNestedManyWithoutUserInput;
    memberships?: Prisma.MembershipCreateNestedManyWithoutUserInput;
    workflowActions?: Prisma.WorkflowActionCreateNestedManyWithoutActorInput;
    workflowInstancesStarted?: Prisma.WorkflowInstanceCreateNestedManyWithoutStartedByInput;
    customerProfile?: Prisma.CustomerProfileCreateNestedOneWithoutUserInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutManufacturerInput = {
    id?: string;
    email: string;
    password: string;
    firstName?: string | null;
    lastName?: string | null;
    phoneNumber?: string | null;
    isActive?: boolean;
    status?: string;
    emailVerifiedAt?: Date | string | null;
    deletedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    productUnitAuditLogs?: Prisma.ProductUnitAuditLogUncheckedCreateNestedManyWithoutUserInput;
    auditActorLogs?: Prisma.AuditLogUncheckedCreateNestedManyWithoutActorInput;
    userRoles?: Prisma.UserRoleUncheckedCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionUncheckedCreateNestedManyWithoutUserInput;
    refreshTokens?: Prisma.RefreshTokenUncheckedCreateNestedManyWithoutUserInput;
    devices?: Prisma.DeviceUncheckedCreateNestedManyWithoutUserInput;
    loginHistories?: Prisma.LoginHistoryUncheckedCreateNestedManyWithoutUserInput;
    twoFactorSecret?: Prisma.TwoFactorSecretUncheckedCreateNestedOneWithoutUserInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenUncheckedCreateNestedManyWithoutUserInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput;
    platformUserRoles?: Prisma.PlatformUserRoleUncheckedCreateNestedManyWithoutUserInput;
    memberships?: Prisma.MembershipUncheckedCreateNestedManyWithoutUserInput;
    workflowActions?: Prisma.WorkflowActionUncheckedCreateNestedManyWithoutActorInput;
    workflowInstancesStarted?: Prisma.WorkflowInstanceUncheckedCreateNestedManyWithoutStartedByInput;
    customerProfile?: Prisma.CustomerProfileUncheckedCreateNestedOneWithoutUserInput;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutManufacturerInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutManufacturerInput, Prisma.UserUncheckedCreateWithoutManufacturerInput>;
};
export type UserUpsertWithoutManufacturerInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutManufacturerInput, Prisma.UserUncheckedUpdateWithoutManufacturerInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutManufacturerInput, Prisma.UserUncheckedCreateWithoutManufacturerInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutManufacturerInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutManufacturerInput, Prisma.UserUncheckedUpdateWithoutManufacturerInput>;
};
export type UserUpdateWithoutManufacturerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    firstName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    emailVerifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    productUnitAuditLogs?: Prisma.ProductUnitAuditLogUpdateManyWithoutUserNestedInput;
    auditActorLogs?: Prisma.AuditLogUpdateManyWithoutActorNestedInput;
    userRoles?: Prisma.UserRoleUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.SessionUpdateManyWithoutUserNestedInput;
    refreshTokens?: Prisma.RefreshTokenUpdateManyWithoutUserNestedInput;
    devices?: Prisma.DeviceUpdateManyWithoutUserNestedInput;
    loginHistories?: Prisma.LoginHistoryUpdateManyWithoutUserNestedInput;
    twoFactorSecret?: Prisma.TwoFactorSecretUpdateOneWithoutUserNestedInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenUpdateManyWithoutUserNestedInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUpdateManyWithoutUserNestedInput;
    platformUserRoles?: Prisma.PlatformUserRoleUpdateManyWithoutUserNestedInput;
    memberships?: Prisma.MembershipUpdateManyWithoutUserNestedInput;
    workflowActions?: Prisma.WorkflowActionUpdateManyWithoutActorNestedInput;
    workflowInstancesStarted?: Prisma.WorkflowInstanceUpdateManyWithoutStartedByNestedInput;
    customerProfile?: Prisma.CustomerProfileUpdateOneWithoutUserNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutManufacturerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    firstName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    emailVerifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    productUnitAuditLogs?: Prisma.ProductUnitAuditLogUncheckedUpdateManyWithoutUserNestedInput;
    auditActorLogs?: Prisma.AuditLogUncheckedUpdateManyWithoutActorNestedInput;
    userRoles?: Prisma.UserRoleUncheckedUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput;
    refreshTokens?: Prisma.RefreshTokenUncheckedUpdateManyWithoutUserNestedInput;
    devices?: Prisma.DeviceUncheckedUpdateManyWithoutUserNestedInput;
    loginHistories?: Prisma.LoginHistoryUncheckedUpdateManyWithoutUserNestedInput;
    twoFactorSecret?: Prisma.TwoFactorSecretUncheckedUpdateOneWithoutUserNestedInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenUncheckedUpdateManyWithoutUserNestedInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInput;
    platformUserRoles?: Prisma.PlatformUserRoleUncheckedUpdateManyWithoutUserNestedInput;
    memberships?: Prisma.MembershipUncheckedUpdateManyWithoutUserNestedInput;
    workflowActions?: Prisma.WorkflowActionUncheckedUpdateManyWithoutActorNestedInput;
    workflowInstancesStarted?: Prisma.WorkflowInstanceUncheckedUpdateManyWithoutStartedByNestedInput;
    customerProfile?: Prisma.CustomerProfileUncheckedUpdateOneWithoutUserNestedInput;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateWithoutProductUnitAuditLogsInput = {
    id?: string;
    email: string;
    password: string;
    firstName?: string | null;
    lastName?: string | null;
    phoneNumber?: string | null;
    isActive?: boolean;
    status?: string;
    emailVerifiedAt?: Date | string | null;
    deletedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    manufacturer?: Prisma.ManufacturerCreateNestedOneWithoutUserInput;
    auditActorLogs?: Prisma.AuditLogCreateNestedManyWithoutActorInput;
    userRoles?: Prisma.UserRoleCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionCreateNestedManyWithoutUserInput;
    refreshTokens?: Prisma.RefreshTokenCreateNestedManyWithoutUserInput;
    devices?: Prisma.DeviceCreateNestedManyWithoutUserInput;
    loginHistories?: Prisma.LoginHistoryCreateNestedManyWithoutUserInput;
    twoFactorSecret?: Prisma.TwoFactorSecretCreateNestedOneWithoutUserInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenCreateNestedManyWithoutUserInput;
    passwordResetTokens?: Prisma.PasswordResetTokenCreateNestedManyWithoutUserInput;
    platformUserRoles?: Prisma.PlatformUserRoleCreateNestedManyWithoutUserInput;
    memberships?: Prisma.MembershipCreateNestedManyWithoutUserInput;
    workflowActions?: Prisma.WorkflowActionCreateNestedManyWithoutActorInput;
    workflowInstancesStarted?: Prisma.WorkflowInstanceCreateNestedManyWithoutStartedByInput;
    customerProfile?: Prisma.CustomerProfileCreateNestedOneWithoutUserInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutProductUnitAuditLogsInput = {
    id?: string;
    email: string;
    password: string;
    firstName?: string | null;
    lastName?: string | null;
    phoneNumber?: string | null;
    isActive?: boolean;
    status?: string;
    emailVerifiedAt?: Date | string | null;
    deletedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    manufacturer?: Prisma.ManufacturerUncheckedCreateNestedOneWithoutUserInput;
    auditActorLogs?: Prisma.AuditLogUncheckedCreateNestedManyWithoutActorInput;
    userRoles?: Prisma.UserRoleUncheckedCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionUncheckedCreateNestedManyWithoutUserInput;
    refreshTokens?: Prisma.RefreshTokenUncheckedCreateNestedManyWithoutUserInput;
    devices?: Prisma.DeviceUncheckedCreateNestedManyWithoutUserInput;
    loginHistories?: Prisma.LoginHistoryUncheckedCreateNestedManyWithoutUserInput;
    twoFactorSecret?: Prisma.TwoFactorSecretUncheckedCreateNestedOneWithoutUserInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenUncheckedCreateNestedManyWithoutUserInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput;
    platformUserRoles?: Prisma.PlatformUserRoleUncheckedCreateNestedManyWithoutUserInput;
    memberships?: Prisma.MembershipUncheckedCreateNestedManyWithoutUserInput;
    workflowActions?: Prisma.WorkflowActionUncheckedCreateNestedManyWithoutActorInput;
    workflowInstancesStarted?: Prisma.WorkflowInstanceUncheckedCreateNestedManyWithoutStartedByInput;
    customerProfile?: Prisma.CustomerProfileUncheckedCreateNestedOneWithoutUserInput;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutProductUnitAuditLogsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutProductUnitAuditLogsInput, Prisma.UserUncheckedCreateWithoutProductUnitAuditLogsInput>;
};
export type UserUpsertWithoutProductUnitAuditLogsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutProductUnitAuditLogsInput, Prisma.UserUncheckedUpdateWithoutProductUnitAuditLogsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutProductUnitAuditLogsInput, Prisma.UserUncheckedCreateWithoutProductUnitAuditLogsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutProductUnitAuditLogsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutProductUnitAuditLogsInput, Prisma.UserUncheckedUpdateWithoutProductUnitAuditLogsInput>;
};
export type UserUpdateWithoutProductUnitAuditLogsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    firstName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    emailVerifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    manufacturer?: Prisma.ManufacturerUpdateOneWithoutUserNestedInput;
    auditActorLogs?: Prisma.AuditLogUpdateManyWithoutActorNestedInput;
    userRoles?: Prisma.UserRoleUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.SessionUpdateManyWithoutUserNestedInput;
    refreshTokens?: Prisma.RefreshTokenUpdateManyWithoutUserNestedInput;
    devices?: Prisma.DeviceUpdateManyWithoutUserNestedInput;
    loginHistories?: Prisma.LoginHistoryUpdateManyWithoutUserNestedInput;
    twoFactorSecret?: Prisma.TwoFactorSecretUpdateOneWithoutUserNestedInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenUpdateManyWithoutUserNestedInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUpdateManyWithoutUserNestedInput;
    platformUserRoles?: Prisma.PlatformUserRoleUpdateManyWithoutUserNestedInput;
    memberships?: Prisma.MembershipUpdateManyWithoutUserNestedInput;
    workflowActions?: Prisma.WorkflowActionUpdateManyWithoutActorNestedInput;
    workflowInstancesStarted?: Prisma.WorkflowInstanceUpdateManyWithoutStartedByNestedInput;
    customerProfile?: Prisma.CustomerProfileUpdateOneWithoutUserNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutProductUnitAuditLogsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    firstName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    emailVerifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    manufacturer?: Prisma.ManufacturerUncheckedUpdateOneWithoutUserNestedInput;
    auditActorLogs?: Prisma.AuditLogUncheckedUpdateManyWithoutActorNestedInput;
    userRoles?: Prisma.UserRoleUncheckedUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput;
    refreshTokens?: Prisma.RefreshTokenUncheckedUpdateManyWithoutUserNestedInput;
    devices?: Prisma.DeviceUncheckedUpdateManyWithoutUserNestedInput;
    loginHistories?: Prisma.LoginHistoryUncheckedUpdateManyWithoutUserNestedInput;
    twoFactorSecret?: Prisma.TwoFactorSecretUncheckedUpdateOneWithoutUserNestedInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenUncheckedUpdateManyWithoutUserNestedInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInput;
    platformUserRoles?: Prisma.PlatformUserRoleUncheckedUpdateManyWithoutUserNestedInput;
    memberships?: Prisma.MembershipUncheckedUpdateManyWithoutUserNestedInput;
    workflowActions?: Prisma.WorkflowActionUncheckedUpdateManyWithoutActorNestedInput;
    workflowInstancesStarted?: Prisma.WorkflowInstanceUncheckedUpdateManyWithoutStartedByNestedInput;
    customerProfile?: Prisma.CustomerProfileUncheckedUpdateOneWithoutUserNestedInput;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateWithoutAuditActorLogsInput = {
    id?: string;
    email: string;
    password: string;
    firstName?: string | null;
    lastName?: string | null;
    phoneNumber?: string | null;
    isActive?: boolean;
    status?: string;
    emailVerifiedAt?: Date | string | null;
    deletedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    manufacturer?: Prisma.ManufacturerCreateNestedOneWithoutUserInput;
    productUnitAuditLogs?: Prisma.ProductUnitAuditLogCreateNestedManyWithoutUserInput;
    userRoles?: Prisma.UserRoleCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionCreateNestedManyWithoutUserInput;
    refreshTokens?: Prisma.RefreshTokenCreateNestedManyWithoutUserInput;
    devices?: Prisma.DeviceCreateNestedManyWithoutUserInput;
    loginHistories?: Prisma.LoginHistoryCreateNestedManyWithoutUserInput;
    twoFactorSecret?: Prisma.TwoFactorSecretCreateNestedOneWithoutUserInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenCreateNestedManyWithoutUserInput;
    passwordResetTokens?: Prisma.PasswordResetTokenCreateNestedManyWithoutUserInput;
    platformUserRoles?: Prisma.PlatformUserRoleCreateNestedManyWithoutUserInput;
    memberships?: Prisma.MembershipCreateNestedManyWithoutUserInput;
    workflowActions?: Prisma.WorkflowActionCreateNestedManyWithoutActorInput;
    workflowInstancesStarted?: Prisma.WorkflowInstanceCreateNestedManyWithoutStartedByInput;
    customerProfile?: Prisma.CustomerProfileCreateNestedOneWithoutUserInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutAuditActorLogsInput = {
    id?: string;
    email: string;
    password: string;
    firstName?: string | null;
    lastName?: string | null;
    phoneNumber?: string | null;
    isActive?: boolean;
    status?: string;
    emailVerifiedAt?: Date | string | null;
    deletedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    manufacturer?: Prisma.ManufacturerUncheckedCreateNestedOneWithoutUserInput;
    productUnitAuditLogs?: Prisma.ProductUnitAuditLogUncheckedCreateNestedManyWithoutUserInput;
    userRoles?: Prisma.UserRoleUncheckedCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionUncheckedCreateNestedManyWithoutUserInput;
    refreshTokens?: Prisma.RefreshTokenUncheckedCreateNestedManyWithoutUserInput;
    devices?: Prisma.DeviceUncheckedCreateNestedManyWithoutUserInput;
    loginHistories?: Prisma.LoginHistoryUncheckedCreateNestedManyWithoutUserInput;
    twoFactorSecret?: Prisma.TwoFactorSecretUncheckedCreateNestedOneWithoutUserInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenUncheckedCreateNestedManyWithoutUserInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput;
    platformUserRoles?: Prisma.PlatformUserRoleUncheckedCreateNestedManyWithoutUserInput;
    memberships?: Prisma.MembershipUncheckedCreateNestedManyWithoutUserInput;
    workflowActions?: Prisma.WorkflowActionUncheckedCreateNestedManyWithoutActorInput;
    workflowInstancesStarted?: Prisma.WorkflowInstanceUncheckedCreateNestedManyWithoutStartedByInput;
    customerProfile?: Prisma.CustomerProfileUncheckedCreateNestedOneWithoutUserInput;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutAuditActorLogsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutAuditActorLogsInput, Prisma.UserUncheckedCreateWithoutAuditActorLogsInput>;
};
export type UserUpsertWithoutAuditActorLogsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutAuditActorLogsInput, Prisma.UserUncheckedUpdateWithoutAuditActorLogsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutAuditActorLogsInput, Prisma.UserUncheckedCreateWithoutAuditActorLogsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutAuditActorLogsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutAuditActorLogsInput, Prisma.UserUncheckedUpdateWithoutAuditActorLogsInput>;
};
export type UserUpdateWithoutAuditActorLogsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    firstName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    emailVerifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    manufacturer?: Prisma.ManufacturerUpdateOneWithoutUserNestedInput;
    productUnitAuditLogs?: Prisma.ProductUnitAuditLogUpdateManyWithoutUserNestedInput;
    userRoles?: Prisma.UserRoleUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.SessionUpdateManyWithoutUserNestedInput;
    refreshTokens?: Prisma.RefreshTokenUpdateManyWithoutUserNestedInput;
    devices?: Prisma.DeviceUpdateManyWithoutUserNestedInput;
    loginHistories?: Prisma.LoginHistoryUpdateManyWithoutUserNestedInput;
    twoFactorSecret?: Prisma.TwoFactorSecretUpdateOneWithoutUserNestedInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenUpdateManyWithoutUserNestedInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUpdateManyWithoutUserNestedInput;
    platformUserRoles?: Prisma.PlatformUserRoleUpdateManyWithoutUserNestedInput;
    memberships?: Prisma.MembershipUpdateManyWithoutUserNestedInput;
    workflowActions?: Prisma.WorkflowActionUpdateManyWithoutActorNestedInput;
    workflowInstancesStarted?: Prisma.WorkflowInstanceUpdateManyWithoutStartedByNestedInput;
    customerProfile?: Prisma.CustomerProfileUpdateOneWithoutUserNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutAuditActorLogsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    firstName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    emailVerifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    manufacturer?: Prisma.ManufacturerUncheckedUpdateOneWithoutUserNestedInput;
    productUnitAuditLogs?: Prisma.ProductUnitAuditLogUncheckedUpdateManyWithoutUserNestedInput;
    userRoles?: Prisma.UserRoleUncheckedUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput;
    refreshTokens?: Prisma.RefreshTokenUncheckedUpdateManyWithoutUserNestedInput;
    devices?: Prisma.DeviceUncheckedUpdateManyWithoutUserNestedInput;
    loginHistories?: Prisma.LoginHistoryUncheckedUpdateManyWithoutUserNestedInput;
    twoFactorSecret?: Prisma.TwoFactorSecretUncheckedUpdateOneWithoutUserNestedInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenUncheckedUpdateManyWithoutUserNestedInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInput;
    platformUserRoles?: Prisma.PlatformUserRoleUncheckedUpdateManyWithoutUserNestedInput;
    memberships?: Prisma.MembershipUncheckedUpdateManyWithoutUserNestedInput;
    workflowActions?: Prisma.WorkflowActionUncheckedUpdateManyWithoutActorNestedInput;
    workflowInstancesStarted?: Prisma.WorkflowInstanceUncheckedUpdateManyWithoutStartedByNestedInput;
    customerProfile?: Prisma.CustomerProfileUncheckedUpdateOneWithoutUserNestedInput;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateWithoutCustomerProfileInput = {
    id?: string;
    email: string;
    password: string;
    firstName?: string | null;
    lastName?: string | null;
    phoneNumber?: string | null;
    isActive?: boolean;
    status?: string;
    emailVerifiedAt?: Date | string | null;
    deletedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    manufacturer?: Prisma.ManufacturerCreateNestedOneWithoutUserInput;
    productUnitAuditLogs?: Prisma.ProductUnitAuditLogCreateNestedManyWithoutUserInput;
    auditActorLogs?: Prisma.AuditLogCreateNestedManyWithoutActorInput;
    userRoles?: Prisma.UserRoleCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionCreateNestedManyWithoutUserInput;
    refreshTokens?: Prisma.RefreshTokenCreateNestedManyWithoutUserInput;
    devices?: Prisma.DeviceCreateNestedManyWithoutUserInput;
    loginHistories?: Prisma.LoginHistoryCreateNestedManyWithoutUserInput;
    twoFactorSecret?: Prisma.TwoFactorSecretCreateNestedOneWithoutUserInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenCreateNestedManyWithoutUserInput;
    passwordResetTokens?: Prisma.PasswordResetTokenCreateNestedManyWithoutUserInput;
    platformUserRoles?: Prisma.PlatformUserRoleCreateNestedManyWithoutUserInput;
    memberships?: Prisma.MembershipCreateNestedManyWithoutUserInput;
    workflowActions?: Prisma.WorkflowActionCreateNestedManyWithoutActorInput;
    workflowInstancesStarted?: Prisma.WorkflowInstanceCreateNestedManyWithoutStartedByInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutCustomerProfileInput = {
    id?: string;
    email: string;
    password: string;
    firstName?: string | null;
    lastName?: string | null;
    phoneNumber?: string | null;
    isActive?: boolean;
    status?: string;
    emailVerifiedAt?: Date | string | null;
    deletedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    manufacturer?: Prisma.ManufacturerUncheckedCreateNestedOneWithoutUserInput;
    productUnitAuditLogs?: Prisma.ProductUnitAuditLogUncheckedCreateNestedManyWithoutUserInput;
    auditActorLogs?: Prisma.AuditLogUncheckedCreateNestedManyWithoutActorInput;
    userRoles?: Prisma.UserRoleUncheckedCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionUncheckedCreateNestedManyWithoutUserInput;
    refreshTokens?: Prisma.RefreshTokenUncheckedCreateNestedManyWithoutUserInput;
    devices?: Prisma.DeviceUncheckedCreateNestedManyWithoutUserInput;
    loginHistories?: Prisma.LoginHistoryUncheckedCreateNestedManyWithoutUserInput;
    twoFactorSecret?: Prisma.TwoFactorSecretUncheckedCreateNestedOneWithoutUserInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenUncheckedCreateNestedManyWithoutUserInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput;
    platformUserRoles?: Prisma.PlatformUserRoleUncheckedCreateNestedManyWithoutUserInput;
    memberships?: Prisma.MembershipUncheckedCreateNestedManyWithoutUserInput;
    workflowActions?: Prisma.WorkflowActionUncheckedCreateNestedManyWithoutActorInput;
    workflowInstancesStarted?: Prisma.WorkflowInstanceUncheckedCreateNestedManyWithoutStartedByInput;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutCustomerProfileInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutCustomerProfileInput, Prisma.UserUncheckedCreateWithoutCustomerProfileInput>;
};
export type UserUpsertWithoutCustomerProfileInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutCustomerProfileInput, Prisma.UserUncheckedUpdateWithoutCustomerProfileInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutCustomerProfileInput, Prisma.UserUncheckedCreateWithoutCustomerProfileInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutCustomerProfileInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutCustomerProfileInput, Prisma.UserUncheckedUpdateWithoutCustomerProfileInput>;
};
export type UserUpdateWithoutCustomerProfileInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    firstName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    emailVerifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    manufacturer?: Prisma.ManufacturerUpdateOneWithoutUserNestedInput;
    productUnitAuditLogs?: Prisma.ProductUnitAuditLogUpdateManyWithoutUserNestedInput;
    auditActorLogs?: Prisma.AuditLogUpdateManyWithoutActorNestedInput;
    userRoles?: Prisma.UserRoleUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.SessionUpdateManyWithoutUserNestedInput;
    refreshTokens?: Prisma.RefreshTokenUpdateManyWithoutUserNestedInput;
    devices?: Prisma.DeviceUpdateManyWithoutUserNestedInput;
    loginHistories?: Prisma.LoginHistoryUpdateManyWithoutUserNestedInput;
    twoFactorSecret?: Prisma.TwoFactorSecretUpdateOneWithoutUserNestedInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenUpdateManyWithoutUserNestedInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUpdateManyWithoutUserNestedInput;
    platformUserRoles?: Prisma.PlatformUserRoleUpdateManyWithoutUserNestedInput;
    memberships?: Prisma.MembershipUpdateManyWithoutUserNestedInput;
    workflowActions?: Prisma.WorkflowActionUpdateManyWithoutActorNestedInput;
    workflowInstancesStarted?: Prisma.WorkflowInstanceUpdateManyWithoutStartedByNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutCustomerProfileInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    firstName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    emailVerifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    manufacturer?: Prisma.ManufacturerUncheckedUpdateOneWithoutUserNestedInput;
    productUnitAuditLogs?: Prisma.ProductUnitAuditLogUncheckedUpdateManyWithoutUserNestedInput;
    auditActorLogs?: Prisma.AuditLogUncheckedUpdateManyWithoutActorNestedInput;
    userRoles?: Prisma.UserRoleUncheckedUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput;
    refreshTokens?: Prisma.RefreshTokenUncheckedUpdateManyWithoutUserNestedInput;
    devices?: Prisma.DeviceUncheckedUpdateManyWithoutUserNestedInput;
    loginHistories?: Prisma.LoginHistoryUncheckedUpdateManyWithoutUserNestedInput;
    twoFactorSecret?: Prisma.TwoFactorSecretUncheckedUpdateOneWithoutUserNestedInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenUncheckedUpdateManyWithoutUserNestedInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInput;
    platformUserRoles?: Prisma.PlatformUserRoleUncheckedUpdateManyWithoutUserNestedInput;
    memberships?: Prisma.MembershipUncheckedUpdateManyWithoutUserNestedInput;
    workflowActions?: Prisma.WorkflowActionUncheckedUpdateManyWithoutActorNestedInput;
    workflowInstancesStarted?: Prisma.WorkflowInstanceUncheckedUpdateManyWithoutStartedByNestedInput;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateWithoutNotificationsInput = {
    id?: string;
    email: string;
    password: string;
    firstName?: string | null;
    lastName?: string | null;
    phoneNumber?: string | null;
    isActive?: boolean;
    status?: string;
    emailVerifiedAt?: Date | string | null;
    deletedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    manufacturer?: Prisma.ManufacturerCreateNestedOneWithoutUserInput;
    productUnitAuditLogs?: Prisma.ProductUnitAuditLogCreateNestedManyWithoutUserInput;
    auditActorLogs?: Prisma.AuditLogCreateNestedManyWithoutActorInput;
    userRoles?: Prisma.UserRoleCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionCreateNestedManyWithoutUserInput;
    refreshTokens?: Prisma.RefreshTokenCreateNestedManyWithoutUserInput;
    devices?: Prisma.DeviceCreateNestedManyWithoutUserInput;
    loginHistories?: Prisma.LoginHistoryCreateNestedManyWithoutUserInput;
    twoFactorSecret?: Prisma.TwoFactorSecretCreateNestedOneWithoutUserInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenCreateNestedManyWithoutUserInput;
    passwordResetTokens?: Prisma.PasswordResetTokenCreateNestedManyWithoutUserInput;
    platformUserRoles?: Prisma.PlatformUserRoleCreateNestedManyWithoutUserInput;
    memberships?: Prisma.MembershipCreateNestedManyWithoutUserInput;
    workflowActions?: Prisma.WorkflowActionCreateNestedManyWithoutActorInput;
    workflowInstancesStarted?: Prisma.WorkflowInstanceCreateNestedManyWithoutStartedByInput;
    customerProfile?: Prisma.CustomerProfileCreateNestedOneWithoutUserInput;
};
export type UserUncheckedCreateWithoutNotificationsInput = {
    id?: string;
    email: string;
    password: string;
    firstName?: string | null;
    lastName?: string | null;
    phoneNumber?: string | null;
    isActive?: boolean;
    status?: string;
    emailVerifiedAt?: Date | string | null;
    deletedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    manufacturer?: Prisma.ManufacturerUncheckedCreateNestedOneWithoutUserInput;
    productUnitAuditLogs?: Prisma.ProductUnitAuditLogUncheckedCreateNestedManyWithoutUserInput;
    auditActorLogs?: Prisma.AuditLogUncheckedCreateNestedManyWithoutActorInput;
    userRoles?: Prisma.UserRoleUncheckedCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionUncheckedCreateNestedManyWithoutUserInput;
    refreshTokens?: Prisma.RefreshTokenUncheckedCreateNestedManyWithoutUserInput;
    devices?: Prisma.DeviceUncheckedCreateNestedManyWithoutUserInput;
    loginHistories?: Prisma.LoginHistoryUncheckedCreateNestedManyWithoutUserInput;
    twoFactorSecret?: Prisma.TwoFactorSecretUncheckedCreateNestedOneWithoutUserInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenUncheckedCreateNestedManyWithoutUserInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput;
    platformUserRoles?: Prisma.PlatformUserRoleUncheckedCreateNestedManyWithoutUserInput;
    memberships?: Prisma.MembershipUncheckedCreateNestedManyWithoutUserInput;
    workflowActions?: Prisma.WorkflowActionUncheckedCreateNestedManyWithoutActorInput;
    workflowInstancesStarted?: Prisma.WorkflowInstanceUncheckedCreateNestedManyWithoutStartedByInput;
    customerProfile?: Prisma.CustomerProfileUncheckedCreateNestedOneWithoutUserInput;
};
export type UserCreateOrConnectWithoutNotificationsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutNotificationsInput, Prisma.UserUncheckedCreateWithoutNotificationsInput>;
};
export type UserUpsertWithoutNotificationsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutNotificationsInput, Prisma.UserUncheckedUpdateWithoutNotificationsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutNotificationsInput, Prisma.UserUncheckedCreateWithoutNotificationsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutNotificationsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutNotificationsInput, Prisma.UserUncheckedUpdateWithoutNotificationsInput>;
};
export type UserUpdateWithoutNotificationsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    firstName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    emailVerifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    manufacturer?: Prisma.ManufacturerUpdateOneWithoutUserNestedInput;
    productUnitAuditLogs?: Prisma.ProductUnitAuditLogUpdateManyWithoutUserNestedInput;
    auditActorLogs?: Prisma.AuditLogUpdateManyWithoutActorNestedInput;
    userRoles?: Prisma.UserRoleUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.SessionUpdateManyWithoutUserNestedInput;
    refreshTokens?: Prisma.RefreshTokenUpdateManyWithoutUserNestedInput;
    devices?: Prisma.DeviceUpdateManyWithoutUserNestedInput;
    loginHistories?: Prisma.LoginHistoryUpdateManyWithoutUserNestedInput;
    twoFactorSecret?: Prisma.TwoFactorSecretUpdateOneWithoutUserNestedInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenUpdateManyWithoutUserNestedInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUpdateManyWithoutUserNestedInput;
    platformUserRoles?: Prisma.PlatformUserRoleUpdateManyWithoutUserNestedInput;
    memberships?: Prisma.MembershipUpdateManyWithoutUserNestedInput;
    workflowActions?: Prisma.WorkflowActionUpdateManyWithoutActorNestedInput;
    workflowInstancesStarted?: Prisma.WorkflowInstanceUpdateManyWithoutStartedByNestedInput;
    customerProfile?: Prisma.CustomerProfileUpdateOneWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutNotificationsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    firstName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    emailVerifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    manufacturer?: Prisma.ManufacturerUncheckedUpdateOneWithoutUserNestedInput;
    productUnitAuditLogs?: Prisma.ProductUnitAuditLogUncheckedUpdateManyWithoutUserNestedInput;
    auditActorLogs?: Prisma.AuditLogUncheckedUpdateManyWithoutActorNestedInput;
    userRoles?: Prisma.UserRoleUncheckedUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput;
    refreshTokens?: Prisma.RefreshTokenUncheckedUpdateManyWithoutUserNestedInput;
    devices?: Prisma.DeviceUncheckedUpdateManyWithoutUserNestedInput;
    loginHistories?: Prisma.LoginHistoryUncheckedUpdateManyWithoutUserNestedInput;
    twoFactorSecret?: Prisma.TwoFactorSecretUncheckedUpdateOneWithoutUserNestedInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenUncheckedUpdateManyWithoutUserNestedInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInput;
    platformUserRoles?: Prisma.PlatformUserRoleUncheckedUpdateManyWithoutUserNestedInput;
    memberships?: Prisma.MembershipUncheckedUpdateManyWithoutUserNestedInput;
    workflowActions?: Prisma.WorkflowActionUncheckedUpdateManyWithoutActorNestedInput;
    workflowInstancesStarted?: Prisma.WorkflowInstanceUncheckedUpdateManyWithoutStartedByNestedInput;
    customerProfile?: Prisma.CustomerProfileUncheckedUpdateOneWithoutUserNestedInput;
};
export type UserCreateWithoutWorkflowInstancesStartedInput = {
    id?: string;
    email: string;
    password: string;
    firstName?: string | null;
    lastName?: string | null;
    phoneNumber?: string | null;
    isActive?: boolean;
    status?: string;
    emailVerifiedAt?: Date | string | null;
    deletedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    manufacturer?: Prisma.ManufacturerCreateNestedOneWithoutUserInput;
    productUnitAuditLogs?: Prisma.ProductUnitAuditLogCreateNestedManyWithoutUserInput;
    auditActorLogs?: Prisma.AuditLogCreateNestedManyWithoutActorInput;
    userRoles?: Prisma.UserRoleCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionCreateNestedManyWithoutUserInput;
    refreshTokens?: Prisma.RefreshTokenCreateNestedManyWithoutUserInput;
    devices?: Prisma.DeviceCreateNestedManyWithoutUserInput;
    loginHistories?: Prisma.LoginHistoryCreateNestedManyWithoutUserInput;
    twoFactorSecret?: Prisma.TwoFactorSecretCreateNestedOneWithoutUserInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenCreateNestedManyWithoutUserInput;
    passwordResetTokens?: Prisma.PasswordResetTokenCreateNestedManyWithoutUserInput;
    platformUserRoles?: Prisma.PlatformUserRoleCreateNestedManyWithoutUserInput;
    memberships?: Prisma.MembershipCreateNestedManyWithoutUserInput;
    workflowActions?: Prisma.WorkflowActionCreateNestedManyWithoutActorInput;
    customerProfile?: Prisma.CustomerProfileCreateNestedOneWithoutUserInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutWorkflowInstancesStartedInput = {
    id?: string;
    email: string;
    password: string;
    firstName?: string | null;
    lastName?: string | null;
    phoneNumber?: string | null;
    isActive?: boolean;
    status?: string;
    emailVerifiedAt?: Date | string | null;
    deletedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    manufacturer?: Prisma.ManufacturerUncheckedCreateNestedOneWithoutUserInput;
    productUnitAuditLogs?: Prisma.ProductUnitAuditLogUncheckedCreateNestedManyWithoutUserInput;
    auditActorLogs?: Prisma.AuditLogUncheckedCreateNestedManyWithoutActorInput;
    userRoles?: Prisma.UserRoleUncheckedCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionUncheckedCreateNestedManyWithoutUserInput;
    refreshTokens?: Prisma.RefreshTokenUncheckedCreateNestedManyWithoutUserInput;
    devices?: Prisma.DeviceUncheckedCreateNestedManyWithoutUserInput;
    loginHistories?: Prisma.LoginHistoryUncheckedCreateNestedManyWithoutUserInput;
    twoFactorSecret?: Prisma.TwoFactorSecretUncheckedCreateNestedOneWithoutUserInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenUncheckedCreateNestedManyWithoutUserInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput;
    platformUserRoles?: Prisma.PlatformUserRoleUncheckedCreateNestedManyWithoutUserInput;
    memberships?: Prisma.MembershipUncheckedCreateNestedManyWithoutUserInput;
    workflowActions?: Prisma.WorkflowActionUncheckedCreateNestedManyWithoutActorInput;
    customerProfile?: Prisma.CustomerProfileUncheckedCreateNestedOneWithoutUserInput;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutWorkflowInstancesStartedInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutWorkflowInstancesStartedInput, Prisma.UserUncheckedCreateWithoutWorkflowInstancesStartedInput>;
};
export type UserUpsertWithoutWorkflowInstancesStartedInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutWorkflowInstancesStartedInput, Prisma.UserUncheckedUpdateWithoutWorkflowInstancesStartedInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutWorkflowInstancesStartedInput, Prisma.UserUncheckedCreateWithoutWorkflowInstancesStartedInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutWorkflowInstancesStartedInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutWorkflowInstancesStartedInput, Prisma.UserUncheckedUpdateWithoutWorkflowInstancesStartedInput>;
};
export type UserUpdateWithoutWorkflowInstancesStartedInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    firstName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    emailVerifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    manufacturer?: Prisma.ManufacturerUpdateOneWithoutUserNestedInput;
    productUnitAuditLogs?: Prisma.ProductUnitAuditLogUpdateManyWithoutUserNestedInput;
    auditActorLogs?: Prisma.AuditLogUpdateManyWithoutActorNestedInput;
    userRoles?: Prisma.UserRoleUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.SessionUpdateManyWithoutUserNestedInput;
    refreshTokens?: Prisma.RefreshTokenUpdateManyWithoutUserNestedInput;
    devices?: Prisma.DeviceUpdateManyWithoutUserNestedInput;
    loginHistories?: Prisma.LoginHistoryUpdateManyWithoutUserNestedInput;
    twoFactorSecret?: Prisma.TwoFactorSecretUpdateOneWithoutUserNestedInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenUpdateManyWithoutUserNestedInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUpdateManyWithoutUserNestedInput;
    platformUserRoles?: Prisma.PlatformUserRoleUpdateManyWithoutUserNestedInput;
    memberships?: Prisma.MembershipUpdateManyWithoutUserNestedInput;
    workflowActions?: Prisma.WorkflowActionUpdateManyWithoutActorNestedInput;
    customerProfile?: Prisma.CustomerProfileUpdateOneWithoutUserNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutWorkflowInstancesStartedInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    firstName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    emailVerifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    manufacturer?: Prisma.ManufacturerUncheckedUpdateOneWithoutUserNestedInput;
    productUnitAuditLogs?: Prisma.ProductUnitAuditLogUncheckedUpdateManyWithoutUserNestedInput;
    auditActorLogs?: Prisma.AuditLogUncheckedUpdateManyWithoutActorNestedInput;
    userRoles?: Prisma.UserRoleUncheckedUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput;
    refreshTokens?: Prisma.RefreshTokenUncheckedUpdateManyWithoutUserNestedInput;
    devices?: Prisma.DeviceUncheckedUpdateManyWithoutUserNestedInput;
    loginHistories?: Prisma.LoginHistoryUncheckedUpdateManyWithoutUserNestedInput;
    twoFactorSecret?: Prisma.TwoFactorSecretUncheckedUpdateOneWithoutUserNestedInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenUncheckedUpdateManyWithoutUserNestedInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInput;
    platformUserRoles?: Prisma.PlatformUserRoleUncheckedUpdateManyWithoutUserNestedInput;
    memberships?: Prisma.MembershipUncheckedUpdateManyWithoutUserNestedInput;
    workflowActions?: Prisma.WorkflowActionUncheckedUpdateManyWithoutActorNestedInput;
    customerProfile?: Prisma.CustomerProfileUncheckedUpdateOneWithoutUserNestedInput;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateWithoutWorkflowActionsInput = {
    id?: string;
    email: string;
    password: string;
    firstName?: string | null;
    lastName?: string | null;
    phoneNumber?: string | null;
    isActive?: boolean;
    status?: string;
    emailVerifiedAt?: Date | string | null;
    deletedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    manufacturer?: Prisma.ManufacturerCreateNestedOneWithoutUserInput;
    productUnitAuditLogs?: Prisma.ProductUnitAuditLogCreateNestedManyWithoutUserInput;
    auditActorLogs?: Prisma.AuditLogCreateNestedManyWithoutActorInput;
    userRoles?: Prisma.UserRoleCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionCreateNestedManyWithoutUserInput;
    refreshTokens?: Prisma.RefreshTokenCreateNestedManyWithoutUserInput;
    devices?: Prisma.DeviceCreateNestedManyWithoutUserInput;
    loginHistories?: Prisma.LoginHistoryCreateNestedManyWithoutUserInput;
    twoFactorSecret?: Prisma.TwoFactorSecretCreateNestedOneWithoutUserInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenCreateNestedManyWithoutUserInput;
    passwordResetTokens?: Prisma.PasswordResetTokenCreateNestedManyWithoutUserInput;
    platformUserRoles?: Prisma.PlatformUserRoleCreateNestedManyWithoutUserInput;
    memberships?: Prisma.MembershipCreateNestedManyWithoutUserInput;
    workflowInstancesStarted?: Prisma.WorkflowInstanceCreateNestedManyWithoutStartedByInput;
    customerProfile?: Prisma.CustomerProfileCreateNestedOneWithoutUserInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutWorkflowActionsInput = {
    id?: string;
    email: string;
    password: string;
    firstName?: string | null;
    lastName?: string | null;
    phoneNumber?: string | null;
    isActive?: boolean;
    status?: string;
    emailVerifiedAt?: Date | string | null;
    deletedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    manufacturer?: Prisma.ManufacturerUncheckedCreateNestedOneWithoutUserInput;
    productUnitAuditLogs?: Prisma.ProductUnitAuditLogUncheckedCreateNestedManyWithoutUserInput;
    auditActorLogs?: Prisma.AuditLogUncheckedCreateNestedManyWithoutActorInput;
    userRoles?: Prisma.UserRoleUncheckedCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionUncheckedCreateNestedManyWithoutUserInput;
    refreshTokens?: Prisma.RefreshTokenUncheckedCreateNestedManyWithoutUserInput;
    devices?: Prisma.DeviceUncheckedCreateNestedManyWithoutUserInput;
    loginHistories?: Prisma.LoginHistoryUncheckedCreateNestedManyWithoutUserInput;
    twoFactorSecret?: Prisma.TwoFactorSecretUncheckedCreateNestedOneWithoutUserInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenUncheckedCreateNestedManyWithoutUserInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput;
    platformUserRoles?: Prisma.PlatformUserRoleUncheckedCreateNestedManyWithoutUserInput;
    memberships?: Prisma.MembershipUncheckedCreateNestedManyWithoutUserInput;
    workflowInstancesStarted?: Prisma.WorkflowInstanceUncheckedCreateNestedManyWithoutStartedByInput;
    customerProfile?: Prisma.CustomerProfileUncheckedCreateNestedOneWithoutUserInput;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutWorkflowActionsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutWorkflowActionsInput, Prisma.UserUncheckedCreateWithoutWorkflowActionsInput>;
};
export type UserUpsertWithoutWorkflowActionsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutWorkflowActionsInput, Prisma.UserUncheckedUpdateWithoutWorkflowActionsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutWorkflowActionsInput, Prisma.UserUncheckedCreateWithoutWorkflowActionsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutWorkflowActionsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutWorkflowActionsInput, Prisma.UserUncheckedUpdateWithoutWorkflowActionsInput>;
};
export type UserUpdateWithoutWorkflowActionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    firstName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    emailVerifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    manufacturer?: Prisma.ManufacturerUpdateOneWithoutUserNestedInput;
    productUnitAuditLogs?: Prisma.ProductUnitAuditLogUpdateManyWithoutUserNestedInput;
    auditActorLogs?: Prisma.AuditLogUpdateManyWithoutActorNestedInput;
    userRoles?: Prisma.UserRoleUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.SessionUpdateManyWithoutUserNestedInput;
    refreshTokens?: Prisma.RefreshTokenUpdateManyWithoutUserNestedInput;
    devices?: Prisma.DeviceUpdateManyWithoutUserNestedInput;
    loginHistories?: Prisma.LoginHistoryUpdateManyWithoutUserNestedInput;
    twoFactorSecret?: Prisma.TwoFactorSecretUpdateOneWithoutUserNestedInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenUpdateManyWithoutUserNestedInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUpdateManyWithoutUserNestedInput;
    platformUserRoles?: Prisma.PlatformUserRoleUpdateManyWithoutUserNestedInput;
    memberships?: Prisma.MembershipUpdateManyWithoutUserNestedInput;
    workflowInstancesStarted?: Prisma.WorkflowInstanceUpdateManyWithoutStartedByNestedInput;
    customerProfile?: Prisma.CustomerProfileUpdateOneWithoutUserNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutWorkflowActionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    firstName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    emailVerifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    manufacturer?: Prisma.ManufacturerUncheckedUpdateOneWithoutUserNestedInput;
    productUnitAuditLogs?: Prisma.ProductUnitAuditLogUncheckedUpdateManyWithoutUserNestedInput;
    auditActorLogs?: Prisma.AuditLogUncheckedUpdateManyWithoutActorNestedInput;
    userRoles?: Prisma.UserRoleUncheckedUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput;
    refreshTokens?: Prisma.RefreshTokenUncheckedUpdateManyWithoutUserNestedInput;
    devices?: Prisma.DeviceUncheckedUpdateManyWithoutUserNestedInput;
    loginHistories?: Prisma.LoginHistoryUncheckedUpdateManyWithoutUserNestedInput;
    twoFactorSecret?: Prisma.TwoFactorSecretUncheckedUpdateOneWithoutUserNestedInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenUncheckedUpdateManyWithoutUserNestedInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInput;
    platformUserRoles?: Prisma.PlatformUserRoleUncheckedUpdateManyWithoutUserNestedInput;
    memberships?: Prisma.MembershipUncheckedUpdateManyWithoutUserNestedInput;
    workflowInstancesStarted?: Prisma.WorkflowInstanceUncheckedUpdateManyWithoutStartedByNestedInput;
    customerProfile?: Prisma.CustomerProfileUncheckedUpdateOneWithoutUserNestedInput;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutUserNestedInput;
};
/**
 * Count Type UserCountOutputType
 */
export type UserCountOutputType = {
    productUnitAuditLogs: number;
    auditActorLogs: number;
    userRoles: number;
    sessions: number;
    refreshTokens: number;
    devices: number;
    loginHistories: number;
    emailVerificationTokens: number;
    passwordResetTokens: number;
    platformUserRoles: number;
    memberships: number;
    workflowActions: number;
    workflowInstancesStarted: number;
    notifications: number;
};
export type UserCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    productUnitAuditLogs?: boolean | UserCountOutputTypeCountProductUnitAuditLogsArgs;
    auditActorLogs?: boolean | UserCountOutputTypeCountAuditActorLogsArgs;
    userRoles?: boolean | UserCountOutputTypeCountUserRolesArgs;
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs;
    refreshTokens?: boolean | UserCountOutputTypeCountRefreshTokensArgs;
    devices?: boolean | UserCountOutputTypeCountDevicesArgs;
    loginHistories?: boolean | UserCountOutputTypeCountLoginHistoriesArgs;
    emailVerificationTokens?: boolean | UserCountOutputTypeCountEmailVerificationTokensArgs;
    passwordResetTokens?: boolean | UserCountOutputTypeCountPasswordResetTokensArgs;
    platformUserRoles?: boolean | UserCountOutputTypeCountPlatformUserRolesArgs;
    memberships?: boolean | UserCountOutputTypeCountMembershipsArgs;
    workflowActions?: boolean | UserCountOutputTypeCountWorkflowActionsArgs;
    workflowInstancesStarted?: boolean | UserCountOutputTypeCountWorkflowInstancesStartedArgs;
    notifications?: boolean | UserCountOutputTypeCountNotificationsArgs;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: Prisma.UserCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountProductUnitAuditLogsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductUnitAuditLogWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountAuditActorLogsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AuditLogWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountUserRolesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserRoleWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountSessionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SessionWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountRefreshTokensArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RefreshTokenWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountDevicesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DeviceWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountLoginHistoriesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.LoginHistoryWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountEmailVerificationTokensArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EmailVerificationTokenWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountPasswordResetTokensArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PasswordResetTokenWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountPlatformUserRolesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PlatformUserRoleWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountMembershipsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MembershipWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountWorkflowActionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WorkflowActionWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountWorkflowInstancesStartedArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WorkflowInstanceWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountNotificationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.NotificationWhereInput;
};
export type UserSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    email?: boolean;
    password?: boolean;
    firstName?: boolean;
    lastName?: boolean;
    phoneNumber?: boolean;
    isActive?: boolean;
    status?: boolean;
    emailVerifiedAt?: boolean;
    deletedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    manufacturer?: boolean | Prisma.User$manufacturerArgs<ExtArgs>;
    productUnitAuditLogs?: boolean | Prisma.User$productUnitAuditLogsArgs<ExtArgs>;
    auditActorLogs?: boolean | Prisma.User$auditActorLogsArgs<ExtArgs>;
    userRoles?: boolean | Prisma.User$userRolesArgs<ExtArgs>;
    sessions?: boolean | Prisma.User$sessionsArgs<ExtArgs>;
    refreshTokens?: boolean | Prisma.User$refreshTokensArgs<ExtArgs>;
    devices?: boolean | Prisma.User$devicesArgs<ExtArgs>;
    loginHistories?: boolean | Prisma.User$loginHistoriesArgs<ExtArgs>;
    twoFactorSecret?: boolean | Prisma.User$twoFactorSecretArgs<ExtArgs>;
    emailVerificationTokens?: boolean | Prisma.User$emailVerificationTokensArgs<ExtArgs>;
    passwordResetTokens?: boolean | Prisma.User$passwordResetTokensArgs<ExtArgs>;
    platformUserRoles?: boolean | Prisma.User$platformUserRolesArgs<ExtArgs>;
    memberships?: boolean | Prisma.User$membershipsArgs<ExtArgs>;
    workflowActions?: boolean | Prisma.User$workflowActionsArgs<ExtArgs>;
    workflowInstancesStarted?: boolean | Prisma.User$workflowInstancesStartedArgs<ExtArgs>;
    customerProfile?: boolean | Prisma.User$customerProfileArgs<ExtArgs>;
    notifications?: boolean | Prisma.User$notificationsArgs<ExtArgs>;
    _count?: boolean | Prisma.UserCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["user"]>;
export type UserSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    email?: boolean;
    password?: boolean;
    firstName?: boolean;
    lastName?: boolean;
    phoneNumber?: boolean;
    isActive?: boolean;
    status?: boolean;
    emailVerifiedAt?: boolean;
    deletedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["user"]>;
export type UserSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    email?: boolean;
    password?: boolean;
    firstName?: boolean;
    lastName?: boolean;
    phoneNumber?: boolean;
    isActive?: boolean;
    status?: boolean;
    emailVerifiedAt?: boolean;
    deletedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["user"]>;
export type UserSelectScalar = {
    id?: boolean;
    email?: boolean;
    password?: boolean;
    firstName?: boolean;
    lastName?: boolean;
    phoneNumber?: boolean;
    isActive?: boolean;
    status?: boolean;
    emailVerifiedAt?: boolean;
    deletedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type UserOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "email" | "password" | "firstName" | "lastName" | "phoneNumber" | "isActive" | "status" | "emailVerifiedAt" | "deletedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>;
export type UserInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    manufacturer?: boolean | Prisma.User$manufacturerArgs<ExtArgs>;
    productUnitAuditLogs?: boolean | Prisma.User$productUnitAuditLogsArgs<ExtArgs>;
    auditActorLogs?: boolean | Prisma.User$auditActorLogsArgs<ExtArgs>;
    userRoles?: boolean | Prisma.User$userRolesArgs<ExtArgs>;
    sessions?: boolean | Prisma.User$sessionsArgs<ExtArgs>;
    refreshTokens?: boolean | Prisma.User$refreshTokensArgs<ExtArgs>;
    devices?: boolean | Prisma.User$devicesArgs<ExtArgs>;
    loginHistories?: boolean | Prisma.User$loginHistoriesArgs<ExtArgs>;
    twoFactorSecret?: boolean | Prisma.User$twoFactorSecretArgs<ExtArgs>;
    emailVerificationTokens?: boolean | Prisma.User$emailVerificationTokensArgs<ExtArgs>;
    passwordResetTokens?: boolean | Prisma.User$passwordResetTokensArgs<ExtArgs>;
    platformUserRoles?: boolean | Prisma.User$platformUserRolesArgs<ExtArgs>;
    memberships?: boolean | Prisma.User$membershipsArgs<ExtArgs>;
    workflowActions?: boolean | Prisma.User$workflowActionsArgs<ExtArgs>;
    workflowInstancesStarted?: boolean | Prisma.User$workflowInstancesStartedArgs<ExtArgs>;
    customerProfile?: boolean | Prisma.User$customerProfileArgs<ExtArgs>;
    notifications?: boolean | Prisma.User$notificationsArgs<ExtArgs>;
    _count?: boolean | Prisma.UserCountOutputTypeDefaultArgs<ExtArgs>;
};
export type UserIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type UserIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $UserPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "User";
    objects: {
        manufacturer: Prisma.$ManufacturerPayload<ExtArgs> | null;
        productUnitAuditLogs: Prisma.$ProductUnitAuditLogPayload<ExtArgs>[];
        auditActorLogs: Prisma.$AuditLogPayload<ExtArgs>[];
        userRoles: Prisma.$UserRolePayload<ExtArgs>[];
        sessions: Prisma.$SessionPayload<ExtArgs>[];
        refreshTokens: Prisma.$RefreshTokenPayload<ExtArgs>[];
        devices: Prisma.$DevicePayload<ExtArgs>[];
        loginHistories: Prisma.$LoginHistoryPayload<ExtArgs>[];
        twoFactorSecret: Prisma.$TwoFactorSecretPayload<ExtArgs> | null;
        emailVerificationTokens: Prisma.$EmailVerificationTokenPayload<ExtArgs>[];
        passwordResetTokens: Prisma.$PasswordResetTokenPayload<ExtArgs>[];
        platformUserRoles: Prisma.$PlatformUserRolePayload<ExtArgs>[];
        memberships: Prisma.$MembershipPayload<ExtArgs>[];
        workflowActions: Prisma.$WorkflowActionPayload<ExtArgs>[];
        workflowInstancesStarted: Prisma.$WorkflowInstancePayload<ExtArgs>[];
        customerProfile: Prisma.$CustomerProfilePayload<ExtArgs> | null;
        notifications: Prisma.$NotificationPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        email: string;
        password: string;
        firstName: string | null;
        lastName: string | null;
        phoneNumber: string | null;
        isActive: boolean;
        status: string;
        emailVerifiedAt: Date | null;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["user"]>;
    composites: {};
};
export type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$UserPayload, S>;
export type UserCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: UserCountAggregateInputType | true;
};
export interface UserDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['User'];
        meta: {
            name: 'User';
        };
    };
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: Prisma.SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: Prisma.SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     *
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     *
     */
    findMany<T extends UserFindManyArgs>(args?: Prisma.SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     *
     */
    create<T extends UserCreateArgs>(args: Prisma.SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends UserCreateManyArgs>(args?: Prisma.SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     *
     */
    delete<T extends UserDeleteArgs>(args: Prisma.SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends UserUpdateArgs>(args: Prisma.SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: Prisma.SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends UserUpdateManyArgs>(args: Prisma.SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: Prisma.SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(args?: Prisma.Subset<T, UserCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], UserCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Prisma.Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>;
    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
    **/
    groupBy<T extends UserGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: UserGroupByArgs['orderBy'];
    } : {
        orderBy?: UserGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the User model
     */
    readonly fields: UserFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for User.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__UserClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    manufacturer<T extends Prisma.User$manufacturerArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$manufacturerArgs<ExtArgs>>): Prisma.Prisma__ManufacturerClient<runtime.Types.Result.GetResult<Prisma.$ManufacturerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    productUnitAuditLogs<T extends Prisma.User$productUnitAuditLogsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$productUnitAuditLogsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductUnitAuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    auditActorLogs<T extends Prisma.User$auditActorLogsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$auditActorLogsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    userRoles<T extends Prisma.User$userRolesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$userRolesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserRolePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    sessions<T extends Prisma.User$sessionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    refreshTokens<T extends Prisma.User$refreshTokensArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$refreshTokensArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    devices<T extends Prisma.User$devicesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$devicesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    loginHistories<T extends Prisma.User$loginHistoriesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$loginHistoriesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LoginHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    twoFactorSecret<T extends Prisma.User$twoFactorSecretArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$twoFactorSecretArgs<ExtArgs>>): Prisma.Prisma__TwoFactorSecretClient<runtime.Types.Result.GetResult<Prisma.$TwoFactorSecretPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    emailVerificationTokens<T extends Prisma.User$emailVerificationTokensArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$emailVerificationTokensArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EmailVerificationTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    passwordResetTokens<T extends Prisma.User$passwordResetTokensArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$passwordResetTokensArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    platformUserRoles<T extends Prisma.User$platformUserRolesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$platformUserRolesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PlatformUserRolePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    memberships<T extends Prisma.User$membershipsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$membershipsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MembershipPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    workflowActions<T extends Prisma.User$workflowActionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$workflowActionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WorkflowActionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    workflowInstancesStarted<T extends Prisma.User$workflowInstancesStartedArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$workflowInstancesStartedArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WorkflowInstancePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    customerProfile<T extends Prisma.User$customerProfileArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$customerProfileArgs<ExtArgs>>): Prisma.Prisma__CustomerProfileClient<runtime.Types.Result.GetResult<Prisma.$CustomerProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    notifications<T extends Prisma.User$notificationsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$notificationsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
/**
 * Fields of the User model
 */
export interface UserFieldRefs {
    readonly id: Prisma.FieldRef<"User", 'String'>;
    readonly email: Prisma.FieldRef<"User", 'String'>;
    readonly password: Prisma.FieldRef<"User", 'String'>;
    readonly firstName: Prisma.FieldRef<"User", 'String'>;
    readonly lastName: Prisma.FieldRef<"User", 'String'>;
    readonly phoneNumber: Prisma.FieldRef<"User", 'String'>;
    readonly isActive: Prisma.FieldRef<"User", 'Boolean'>;
    readonly status: Prisma.FieldRef<"User", 'String'>;
    readonly emailVerifiedAt: Prisma.FieldRef<"User", 'DateTime'>;
    readonly deletedAt: Prisma.FieldRef<"User", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"User", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"User", 'DateTime'>;
}
/**
 * User findUnique
 */
export type UserFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where: Prisma.UserWhereUniqueInput;
};
/**
 * User findUniqueOrThrow
 */
export type UserFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where: Prisma.UserWhereUniqueInput;
};
/**
 * User findFirst
 */
export type UserFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where?: Prisma.UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Users.
     */
    cursor?: Prisma.UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Users.
     */
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
/**
 * User findFirstOrThrow
 */
export type UserFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where?: Prisma.UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Users.
     */
    cursor?: Prisma.UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Users.
     */
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
/**
 * User findMany
 */
export type UserFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * Filter, which Users to fetch.
     */
    where?: Prisma.UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Users.
     */
    cursor?: Prisma.UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
/**
 * User create
 */
export type UserCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * The data needed to create a User.
     */
    data: Prisma.XOR<Prisma.UserCreateInput, Prisma.UserUncheckedCreateInput>;
};
/**
 * User createMany
 */
export type UserCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: Prisma.UserCreateManyInput | Prisma.UserCreateManyInput[];
};
/**
 * User createManyAndReturn
 */
export type UserCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * The data used to create many Users.
     */
    data: Prisma.UserCreateManyInput | Prisma.UserCreateManyInput[];
};
/**
 * User update
 */
export type UserUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * The data needed to update a User.
     */
    data: Prisma.XOR<Prisma.UserUpdateInput, Prisma.UserUncheckedUpdateInput>;
    /**
     * Choose, which User to update.
     */
    where: Prisma.UserWhereUniqueInput;
};
/**
 * User updateMany
 */
export type UserUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: Prisma.XOR<Prisma.UserUpdateManyMutationInput, Prisma.UserUncheckedUpdateManyInput>;
    /**
     * Filter which Users to update
     */
    where?: Prisma.UserWhereInput;
    /**
     * Limit how many Users to update.
     */
    limit?: number;
};
/**
 * User updateManyAndReturn
 */
export type UserUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * The data used to update Users.
     */
    data: Prisma.XOR<Prisma.UserUpdateManyMutationInput, Prisma.UserUncheckedUpdateManyInput>;
    /**
     * Filter which Users to update
     */
    where?: Prisma.UserWhereInput;
    /**
     * Limit how many Users to update.
     */
    limit?: number;
};
/**
 * User upsert
 */
export type UserUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: Prisma.UserWhereUniqueInput;
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: Prisma.XOR<Prisma.UserCreateInput, Prisma.UserUncheckedCreateInput>;
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.UserUpdateInput, Prisma.UserUncheckedUpdateInput>;
};
/**
 * User delete
 */
export type UserDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * Filter which User to delete.
     */
    where: Prisma.UserWhereUniqueInput;
};
/**
 * User deleteMany
 */
export type UserDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: Prisma.UserWhereInput;
    /**
     * Limit how many Users to delete.
     */
    limit?: number;
};
/**
 * User.manufacturer
 */
export type User$manufacturerArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Manufacturer
     */
    select?: Prisma.ManufacturerSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Manufacturer
     */
    omit?: Prisma.ManufacturerOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ManufacturerInclude<ExtArgs> | null;
    where?: Prisma.ManufacturerWhereInput;
};
/**
 * User.productUnitAuditLogs
 */
export type User$productUnitAuditLogsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductUnitAuditLog
     */
    select?: Prisma.ProductUnitAuditLogSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductUnitAuditLog
     */
    omit?: Prisma.ProductUnitAuditLogOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ProductUnitAuditLogInclude<ExtArgs> | null;
    where?: Prisma.ProductUnitAuditLogWhereInput;
    orderBy?: Prisma.ProductUnitAuditLogOrderByWithRelationInput | Prisma.ProductUnitAuditLogOrderByWithRelationInput[];
    cursor?: Prisma.ProductUnitAuditLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProductUnitAuditLogScalarFieldEnum | Prisma.ProductUnitAuditLogScalarFieldEnum[];
};
/**
 * User.auditActorLogs
 */
export type User$auditActorLogsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: Prisma.AuditLogSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: Prisma.AuditLogOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AuditLogInclude<ExtArgs> | null;
    where?: Prisma.AuditLogWhereInput;
    orderBy?: Prisma.AuditLogOrderByWithRelationInput | Prisma.AuditLogOrderByWithRelationInput[];
    cursor?: Prisma.AuditLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AuditLogScalarFieldEnum | Prisma.AuditLogScalarFieldEnum[];
};
/**
 * User.userRoles
 */
export type User$userRolesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: Prisma.UserRoleSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UserRole
     */
    omit?: Prisma.UserRoleOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserRoleInclude<ExtArgs> | null;
    where?: Prisma.UserRoleWhereInput;
    orderBy?: Prisma.UserRoleOrderByWithRelationInput | Prisma.UserRoleOrderByWithRelationInput[];
    cursor?: Prisma.UserRoleWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserRoleScalarFieldEnum | Prisma.UserRoleScalarFieldEnum[];
};
/**
 * User.sessions
 */
export type User$sessionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: Prisma.SessionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Session
     */
    omit?: Prisma.SessionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SessionInclude<ExtArgs> | null;
    where?: Prisma.SessionWhereInput;
    orderBy?: Prisma.SessionOrderByWithRelationInput | Prisma.SessionOrderByWithRelationInput[];
    cursor?: Prisma.SessionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SessionScalarFieldEnum | Prisma.SessionScalarFieldEnum[];
};
/**
 * User.refreshTokens
 */
export type User$refreshTokensArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: Prisma.RefreshTokenSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: Prisma.RefreshTokenOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RefreshTokenInclude<ExtArgs> | null;
    where?: Prisma.RefreshTokenWhereInput;
    orderBy?: Prisma.RefreshTokenOrderByWithRelationInput | Prisma.RefreshTokenOrderByWithRelationInput[];
    cursor?: Prisma.RefreshTokenWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RefreshTokenScalarFieldEnum | Prisma.RefreshTokenScalarFieldEnum[];
};
/**
 * User.devices
 */
export type User$devicesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: Prisma.DeviceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Device
     */
    omit?: Prisma.DeviceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DeviceInclude<ExtArgs> | null;
    where?: Prisma.DeviceWhereInput;
    orderBy?: Prisma.DeviceOrderByWithRelationInput | Prisma.DeviceOrderByWithRelationInput[];
    cursor?: Prisma.DeviceWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DeviceScalarFieldEnum | Prisma.DeviceScalarFieldEnum[];
};
/**
 * User.loginHistories
 */
export type User$loginHistoriesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoginHistory
     */
    select?: Prisma.LoginHistorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the LoginHistory
     */
    omit?: Prisma.LoginHistoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.LoginHistoryInclude<ExtArgs> | null;
    where?: Prisma.LoginHistoryWhereInput;
    orderBy?: Prisma.LoginHistoryOrderByWithRelationInput | Prisma.LoginHistoryOrderByWithRelationInput[];
    cursor?: Prisma.LoginHistoryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.LoginHistoryScalarFieldEnum | Prisma.LoginHistoryScalarFieldEnum[];
};
/**
 * User.twoFactorSecret
 */
export type User$twoFactorSecretArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TwoFactorSecret
     */
    select?: Prisma.TwoFactorSecretSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the TwoFactorSecret
     */
    omit?: Prisma.TwoFactorSecretOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.TwoFactorSecretInclude<ExtArgs> | null;
    where?: Prisma.TwoFactorSecretWhereInput;
};
/**
 * User.emailVerificationTokens
 */
export type User$emailVerificationTokensArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailVerificationToken
     */
    select?: Prisma.EmailVerificationTokenSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the EmailVerificationToken
     */
    omit?: Prisma.EmailVerificationTokenOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EmailVerificationTokenInclude<ExtArgs> | null;
    where?: Prisma.EmailVerificationTokenWhereInput;
    orderBy?: Prisma.EmailVerificationTokenOrderByWithRelationInput | Prisma.EmailVerificationTokenOrderByWithRelationInput[];
    cursor?: Prisma.EmailVerificationTokenWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.EmailVerificationTokenScalarFieldEnum | Prisma.EmailVerificationTokenScalarFieldEnum[];
};
/**
 * User.passwordResetTokens
 */
export type User$passwordResetTokensArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: Prisma.PasswordResetTokenSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: Prisma.PasswordResetTokenOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PasswordResetTokenInclude<ExtArgs> | null;
    where?: Prisma.PasswordResetTokenWhereInput;
    orderBy?: Prisma.PasswordResetTokenOrderByWithRelationInput | Prisma.PasswordResetTokenOrderByWithRelationInput[];
    cursor?: Prisma.PasswordResetTokenWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PasswordResetTokenScalarFieldEnum | Prisma.PasswordResetTokenScalarFieldEnum[];
};
/**
 * User.platformUserRoles
 */
export type User$platformUserRolesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformUserRole
     */
    select?: Prisma.PlatformUserRoleSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PlatformUserRole
     */
    omit?: Prisma.PlatformUserRoleOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PlatformUserRoleInclude<ExtArgs> | null;
    where?: Prisma.PlatformUserRoleWhereInput;
    orderBy?: Prisma.PlatformUserRoleOrderByWithRelationInput | Prisma.PlatformUserRoleOrderByWithRelationInput[];
    cursor?: Prisma.PlatformUserRoleWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PlatformUserRoleScalarFieldEnum | Prisma.PlatformUserRoleScalarFieldEnum[];
};
/**
 * User.memberships
 */
export type User$membershipsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Membership
     */
    select?: Prisma.MembershipSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Membership
     */
    omit?: Prisma.MembershipOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MembershipInclude<ExtArgs> | null;
    where?: Prisma.MembershipWhereInput;
    orderBy?: Prisma.MembershipOrderByWithRelationInput | Prisma.MembershipOrderByWithRelationInput[];
    cursor?: Prisma.MembershipWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MembershipScalarFieldEnum | Prisma.MembershipScalarFieldEnum[];
};
/**
 * User.workflowActions
 */
export type User$workflowActionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowAction
     */
    select?: Prisma.WorkflowActionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkflowAction
     */
    omit?: Prisma.WorkflowActionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.WorkflowActionInclude<ExtArgs> | null;
    where?: Prisma.WorkflowActionWhereInput;
    orderBy?: Prisma.WorkflowActionOrderByWithRelationInput | Prisma.WorkflowActionOrderByWithRelationInput[];
    cursor?: Prisma.WorkflowActionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WorkflowActionScalarFieldEnum | Prisma.WorkflowActionScalarFieldEnum[];
};
/**
 * User.workflowInstancesStarted
 */
export type User$workflowInstancesStartedArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowInstance
     */
    select?: Prisma.WorkflowInstanceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkflowInstance
     */
    omit?: Prisma.WorkflowInstanceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.WorkflowInstanceInclude<ExtArgs> | null;
    where?: Prisma.WorkflowInstanceWhereInput;
    orderBy?: Prisma.WorkflowInstanceOrderByWithRelationInput | Prisma.WorkflowInstanceOrderByWithRelationInput[];
    cursor?: Prisma.WorkflowInstanceWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WorkflowInstanceScalarFieldEnum | Prisma.WorkflowInstanceScalarFieldEnum[];
};
/**
 * User.customerProfile
 */
export type User$customerProfileArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerProfile
     */
    select?: Prisma.CustomerProfileSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the CustomerProfile
     */
    omit?: Prisma.CustomerProfileOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.CustomerProfileInclude<ExtArgs> | null;
    where?: Prisma.CustomerProfileWhereInput;
};
/**
 * User.notifications
 */
export type User$notificationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: Prisma.NotificationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Notification
     */
    omit?: Prisma.NotificationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.NotificationInclude<ExtArgs> | null;
    where?: Prisma.NotificationWhereInput;
    orderBy?: Prisma.NotificationOrderByWithRelationInput | Prisma.NotificationOrderByWithRelationInput[];
    cursor?: Prisma.NotificationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.NotificationScalarFieldEnum | Prisma.NotificationScalarFieldEnum[];
};
/**
 * User without action
 */
export type UserDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=User.d.ts.map