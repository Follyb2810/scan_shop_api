import * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../models";
import { type PrismaClient } from "./class";
export type * from '../models';
export type DMMF = typeof runtime.DMMF;
export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>;
/**
 * Prisma Errors
 */
export declare const PrismaClientKnownRequestError: typeof runtime.PrismaClientKnownRequestError;
export type PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
export declare const PrismaClientUnknownRequestError: typeof runtime.PrismaClientUnknownRequestError;
export type PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
export declare const PrismaClientRustPanicError: typeof runtime.PrismaClientRustPanicError;
export type PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
export declare const PrismaClientInitializationError: typeof runtime.PrismaClientInitializationError;
export type PrismaClientInitializationError = runtime.PrismaClientInitializationError;
export declare const PrismaClientValidationError: typeof runtime.PrismaClientValidationError;
export type PrismaClientValidationError = runtime.PrismaClientValidationError;
/**
 * Re-export of sql-template-tag
 */
export declare const sql: typeof runtime.sqltag;
export declare const empty: runtime.Sql;
export declare const join: typeof runtime.join;
export declare const raw: typeof runtime.raw;
export declare const Sql: typeof runtime.Sql;
export type Sql = runtime.Sql;
/**
 * Decimal.js
 */
export declare const Decimal: typeof runtime.Decimal;
export type Decimal = runtime.Decimal;
export type DecimalJsLike = runtime.DecimalJsLike;
/**
* Extensions
*/
export type Extension = runtime.Types.Extensions.UserArgs;
export declare const getExtensionContext: typeof runtime.Extensions.getExtensionContext;
export type Args<T, F extends runtime.Operation> = runtime.Types.Public.Args<T, F>;
export type Payload<T, F extends runtime.Operation = never> = runtime.Types.Public.Payload<T, F>;
export type Result<T, A, F extends runtime.Operation> = runtime.Types.Public.Result<T, A, F>;
export type Exact<A, W> = runtime.Types.Public.Exact<A, W>;
export type PrismaVersion = {
    client: string;
    engine: string;
};
/**
 * Prisma Client JS version: 7.0.0
 * Query Engine version: 0c19ccc313cf9911a90d99d2ac2eb0280c76c513
 */
export declare const prismaVersion: PrismaVersion;
/**
 * Utility Types
 */
export type Bytes = runtime.Bytes;
export type JsonObject = runtime.JsonObject;
export type JsonArray = runtime.JsonArray;
export type JsonValue = runtime.JsonValue;
export type InputJsonObject = runtime.InputJsonObject;
export type InputJsonArray = runtime.InputJsonArray;
export type InputJsonValue = runtime.InputJsonValue;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
/**
 * Helper for filtering JSON entries that have `null` on the database (empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const DbNull: import("@prisma/client-runtime-utils").DbNullClass;
/**
 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
/**
 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
type SelectAndInclude = {
    select: any;
    include: any;
};
type SelectAndOmit = {
    select: any;
    omit: any;
};
/**
 * From T, pick a set of properties whose keys are in the union K
 */
type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
export type Enumerable<T> = T | Array<T>;
/**
 * Subset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
 */
export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
};
/**
 * SelectSubset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
 * Additionally, it validates, if both select and include are present. If the case, it errors.
 */
export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & (T extends SelectAndInclude ? 'Please either choose `select` or `include`.' : T extends SelectAndOmit ? 'Please either choose `select` or `omit`.' : {});
/**
 * Subset + Intersection
 * @desc From `T` pick properties that exist in `U` and intersect `K`
 */
export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & K;
type Without<T, U> = {
    [P in Exclude<keyof T, keyof U>]?: never;
};
/**
 * XOR is needed to have a real mutually exclusive union type
 * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
 */
export type XOR<T, U> = T extends object ? U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : U : T;
/**
 * Is T a Record?
 */
type IsObject<T extends any> = T extends Array<any> ? False : T extends Date ? False : T extends Uint8Array ? False : T extends BigInt ? False : T extends object ? True : False;
/**
 * If it's T[], return T
 */
export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;
/**
 * From ts-toolbelt
 */
type __Either<O extends object, K extends Key> = Omit<O, K> & {
    [P in K]: Prisma__Pick<O, P & keyof O>;
}[K];
type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;
type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>;
type _Either<O extends object, K extends Key, strict extends Boolean> = {
    1: EitherStrict<O, K>;
    0: EitherLoose<O, K>;
}[strict];
export type Either<O extends object, K extends Key, strict extends Boolean = 1> = O extends unknown ? _Either<O, K, strict> : never;
export type Union = any;
export type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
} & {};
/** Helper Types for "Merge" **/
export type IntersectOf<U extends Union> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
} & {};
type _Merge<U extends object> = IntersectOf<Overwrite<U, {
    [K in keyof U]-?: At<U, K>;
}>>;
type Key = string | number | symbol;
type AtStrict<O extends object, K extends Key> = O[K & keyof O];
type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
}[strict];
export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
} & {};
export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
} & {};
type _Record<K extends keyof any, T> = {
    [P in K]: T;
};
type NoExpand<T> = T extends unknown ? T : never;
export type AtLeast<O extends object, K extends string> = NoExpand<O extends unknown ? (K extends keyof O ? {
    [P in K]: O[P];
} & O : O) | {
    [P in keyof O as P extends K ? P : never]-?: O[P];
} & O : never>;
type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;
export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
/** End Helper Types for "Merge" **/
export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;
export type Boolean = True | False;
export type True = 1;
export type False = 0;
export type Not<B extends Boolean> = {
    0: 1;
    1: 0;
}[B];
export type Extends<A1 extends any, A2 extends any> = [A1] extends [never] ? 0 : A1 extends A2 ? 1 : 0;
export type Has<U extends Union, U1 extends Union> = Not<Extends<Exclude<U1, U>, U1>>;
export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
        0: 0;
        1: 1;
    };
    1: {
        0: 1;
        1: 1;
    };
}[B1][B2];
export type Keys<U extends Union> = U extends unknown ? keyof U : never;
export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O ? O[P] : never;
} : never;
type FieldPaths<T, U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>> = IsObject<T> extends True ? U : T;
export type GetHavingFields<T> = {
    [K in keyof T]: Or<Or<Extends<'OR', K>, Extends<'AND', K>>, Extends<'NOT', K>> extends True ? T[K] extends infer TK ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never> : never : {} extends FieldPaths<T[K]> ? never : K;
}[keyof T];
/**
 * Convert tuple to union
 */
type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
export type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;
/**
 * Like `Pick`, but additionally can also accept an array of keys
 */
export type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>;
/**
 * Exclude all keys with underscores
 */
export type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T;
export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;
type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>;
export declare const ModelName: {
    readonly User: "User";
    readonly Session: "Session";
    readonly RefreshToken: "RefreshToken";
    readonly Device: "Device";
    readonly LoginHistory: "LoginHistory";
    readonly TwoFactorSecret: "TwoFactorSecret";
    readonly EmailVerificationToken: "EmailVerificationToken";
    readonly PasswordResetToken: "PasswordResetToken";
    readonly Permission: "Permission";
    readonly PlatformRole: "PlatformRole";
    readonly PlatformUserRole: "PlatformUserRole";
    readonly OrganizationType: "OrganizationType";
    readonly Organization: "Organization";
    readonly OrganizationProfile: "OrganizationProfile";
    readonly Branch: "Branch";
    readonly OrganizationRole: "OrganizationRole";
    readonly RolePermission: "RolePermission";
    readonly Membership: "Membership";
    readonly MembershipRole: "MembershipRole";
    readonly OrgRoleTemplate: "OrgRoleTemplate";
    readonly OrgRoleTemplatePermission: "OrgRoleTemplatePermission";
    readonly Role: "Role";
    readonly UserRole: "UserRole";
    readonly Manufacturer: "Manufacturer";
    readonly Product: "Product";
    readonly ProductUnit: "ProductUnit";
    readonly ProductUnitAuditLog: "ProductUnitAuditLog";
    readonly AuditLog: "AuditLog";
    readonly MedicineCategory: "MedicineCategory";
    readonly DosageForm: "DosageForm";
    readonly PackagingType: "PackagingType";
    readonly ProductFamily: "ProductFamily";
    readonly Brand: "Brand";
    readonly Medicine: "Medicine";
    readonly Variant: "Variant";
    readonly PackageDefinition: "PackageDefinition";
    readonly Batch: "Batch";
    readonly WarehouseType: "WarehouseType";
    readonly Warehouse: "Warehouse";
    readonly InventoryPosition: "InventoryPosition";
    readonly InventoryMovement: "InventoryMovement";
    readonly PackagingInstance: "PackagingInstance";
    readonly TrackableUnit: "TrackableUnit";
    readonly ScanEvent: "ScanEvent";
    readonly CustodyTransfer: "CustodyTransfer";
    readonly CustodyTransferLine: "CustodyTransferLine";
    readonly CustomerProfile: "CustomerProfile";
    readonly Address: "Address";
    readonly MarketplaceCategory: "MarketplaceCategory";
    readonly Listing: "Listing";
    readonly Cart: "Cart";
    readonly CartItem: "CartItem";
    readonly Order: "Order";
    readonly OrderLine: "OrderLine";
    readonly WishlistItem: "WishlistItem";
    readonly ListingReview: "ListingReview";
    readonly Coupon: "Coupon";
    readonly Payment: "Payment";
    readonly Notification: "Notification";
    readonly WorkflowDefinition: "WorkflowDefinition";
    readonly WorkflowStepDefinition: "WorkflowStepDefinition";
    readonly WorkflowInstance: "WorkflowInstance";
    readonly WorkflowAction: "WorkflowAction";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export interface TypeMapCb<GlobalOmitOptions = {}> extends runtime.Types.Utils.Fn<{
    extArgs: runtime.Types.Extensions.InternalArgs;
}, runtime.Types.Utils.Record<string, any>> {
    returns: TypeMap<this['params']['extArgs'], GlobalOmitOptions>;
}
export type TypeMap<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
        omit: GlobalOmitOptions;
    };
    meta: {
        modelProps: "user" | "session" | "refreshToken" | "device" | "loginHistory" | "twoFactorSecret" | "emailVerificationToken" | "passwordResetToken" | "permission" | "platformRole" | "platformUserRole" | "organizationType" | "organization" | "organizationProfile" | "branch" | "organizationRole" | "rolePermission" | "membership" | "membershipRole" | "orgRoleTemplate" | "orgRoleTemplatePermission" | "role" | "userRole" | "manufacturer" | "product" | "productUnit" | "productUnitAuditLog" | "auditLog" | "medicineCategory" | "dosageForm" | "packagingType" | "productFamily" | "brand" | "medicine" | "variant" | "packageDefinition" | "batch" | "warehouseType" | "warehouse" | "inventoryPosition" | "inventoryMovement" | "packagingInstance" | "trackableUnit" | "scanEvent" | "custodyTransfer" | "custodyTransferLine" | "customerProfile" | "address" | "marketplaceCategory" | "listing" | "cart" | "cartItem" | "order" | "orderLine" | "wishlistItem" | "listingReview" | "coupon" | "payment" | "notification" | "workflowDefinition" | "workflowStepDefinition" | "workflowInstance" | "workflowAction";
        txIsolationLevel: TransactionIsolationLevel;
    };
    model: {
        User: {
            payload: Prisma.$UserPayload<ExtArgs>;
            fields: Prisma.UserFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.UserFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                findFirst: {
                    args: Prisma.UserFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                findMany: {
                    args: Prisma.UserFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
                };
                create: {
                    args: Prisma.UserCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                createMany: {
                    args: Prisma.UserCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
                };
                delete: {
                    args: Prisma.UserDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                update: {
                    args: Prisma.UserUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                deleteMany: {
                    args: Prisma.UserDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.UserUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
                };
                upsert: {
                    args: Prisma.UserUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                aggregate: {
                    args: Prisma.UserAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateUser>;
                };
                groupBy: {
                    args: Prisma.UserGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserGroupByOutputType>[];
                };
                count: {
                    args: Prisma.UserCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserCountAggregateOutputType> | number;
                };
            };
        };
        Session: {
            payload: Prisma.$SessionPayload<ExtArgs>;
            fields: Prisma.SessionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.SessionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>;
                };
                findFirst: {
                    args: Prisma.SessionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>;
                };
                findMany: {
                    args: Prisma.SessionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>[];
                };
                create: {
                    args: Prisma.SessionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>;
                };
                createMany: {
                    args: Prisma.SessionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>[];
                };
                delete: {
                    args: Prisma.SessionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>;
                };
                update: {
                    args: Prisma.SessionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>;
                };
                deleteMany: {
                    args: Prisma.SessionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.SessionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.SessionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>[];
                };
                upsert: {
                    args: Prisma.SessionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>;
                };
                aggregate: {
                    args: Prisma.SessionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSession>;
                };
                groupBy: {
                    args: Prisma.SessionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SessionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.SessionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SessionCountAggregateOutputType> | number;
                };
            };
        };
        RefreshToken: {
            payload: Prisma.$RefreshTokenPayload<ExtArgs>;
            fields: Prisma.RefreshTokenFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.RefreshTokenFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.RefreshTokenFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>;
                };
                findFirst: {
                    args: Prisma.RefreshTokenFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.RefreshTokenFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>;
                };
                findMany: {
                    args: Prisma.RefreshTokenFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[];
                };
                create: {
                    args: Prisma.RefreshTokenCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>;
                };
                createMany: {
                    args: Prisma.RefreshTokenCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.RefreshTokenCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[];
                };
                delete: {
                    args: Prisma.RefreshTokenDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>;
                };
                update: {
                    args: Prisma.RefreshTokenUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>;
                };
                deleteMany: {
                    args: Prisma.RefreshTokenDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.RefreshTokenUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.RefreshTokenUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[];
                };
                upsert: {
                    args: Prisma.RefreshTokenUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>;
                };
                aggregate: {
                    args: Prisma.RefreshTokenAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateRefreshToken>;
                };
                groupBy: {
                    args: Prisma.RefreshTokenGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RefreshTokenGroupByOutputType>[];
                };
                count: {
                    args: Prisma.RefreshTokenCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RefreshTokenCountAggregateOutputType> | number;
                };
            };
        };
        Device: {
            payload: Prisma.$DevicePayload<ExtArgs>;
            fields: Prisma.DeviceFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.DeviceFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DevicePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.DeviceFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DevicePayload>;
                };
                findFirst: {
                    args: Prisma.DeviceFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DevicePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.DeviceFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DevicePayload>;
                };
                findMany: {
                    args: Prisma.DeviceFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DevicePayload>[];
                };
                create: {
                    args: Prisma.DeviceCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DevicePayload>;
                };
                createMany: {
                    args: Prisma.DeviceCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.DeviceCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DevicePayload>[];
                };
                delete: {
                    args: Prisma.DeviceDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DevicePayload>;
                };
                update: {
                    args: Prisma.DeviceUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DevicePayload>;
                };
                deleteMany: {
                    args: Prisma.DeviceDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.DeviceUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.DeviceUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DevicePayload>[];
                };
                upsert: {
                    args: Prisma.DeviceUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DevicePayload>;
                };
                aggregate: {
                    args: Prisma.DeviceAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateDevice>;
                };
                groupBy: {
                    args: Prisma.DeviceGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DeviceGroupByOutputType>[];
                };
                count: {
                    args: Prisma.DeviceCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DeviceCountAggregateOutputType> | number;
                };
            };
        };
        LoginHistory: {
            payload: Prisma.$LoginHistoryPayload<ExtArgs>;
            fields: Prisma.LoginHistoryFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.LoginHistoryFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LoginHistoryPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.LoginHistoryFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LoginHistoryPayload>;
                };
                findFirst: {
                    args: Prisma.LoginHistoryFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LoginHistoryPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.LoginHistoryFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LoginHistoryPayload>;
                };
                findMany: {
                    args: Prisma.LoginHistoryFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LoginHistoryPayload>[];
                };
                create: {
                    args: Prisma.LoginHistoryCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LoginHistoryPayload>;
                };
                createMany: {
                    args: Prisma.LoginHistoryCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.LoginHistoryCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LoginHistoryPayload>[];
                };
                delete: {
                    args: Prisma.LoginHistoryDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LoginHistoryPayload>;
                };
                update: {
                    args: Prisma.LoginHistoryUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LoginHistoryPayload>;
                };
                deleteMany: {
                    args: Prisma.LoginHistoryDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.LoginHistoryUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.LoginHistoryUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LoginHistoryPayload>[];
                };
                upsert: {
                    args: Prisma.LoginHistoryUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LoginHistoryPayload>;
                };
                aggregate: {
                    args: Prisma.LoginHistoryAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateLoginHistory>;
                };
                groupBy: {
                    args: Prisma.LoginHistoryGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.LoginHistoryGroupByOutputType>[];
                };
                count: {
                    args: Prisma.LoginHistoryCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.LoginHistoryCountAggregateOutputType> | number;
                };
            };
        };
        TwoFactorSecret: {
            payload: Prisma.$TwoFactorSecretPayload<ExtArgs>;
            fields: Prisma.TwoFactorSecretFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.TwoFactorSecretFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TwoFactorSecretPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.TwoFactorSecretFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TwoFactorSecretPayload>;
                };
                findFirst: {
                    args: Prisma.TwoFactorSecretFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TwoFactorSecretPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.TwoFactorSecretFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TwoFactorSecretPayload>;
                };
                findMany: {
                    args: Prisma.TwoFactorSecretFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TwoFactorSecretPayload>[];
                };
                create: {
                    args: Prisma.TwoFactorSecretCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TwoFactorSecretPayload>;
                };
                createMany: {
                    args: Prisma.TwoFactorSecretCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.TwoFactorSecretCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TwoFactorSecretPayload>[];
                };
                delete: {
                    args: Prisma.TwoFactorSecretDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TwoFactorSecretPayload>;
                };
                update: {
                    args: Prisma.TwoFactorSecretUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TwoFactorSecretPayload>;
                };
                deleteMany: {
                    args: Prisma.TwoFactorSecretDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.TwoFactorSecretUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.TwoFactorSecretUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TwoFactorSecretPayload>[];
                };
                upsert: {
                    args: Prisma.TwoFactorSecretUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TwoFactorSecretPayload>;
                };
                aggregate: {
                    args: Prisma.TwoFactorSecretAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateTwoFactorSecret>;
                };
                groupBy: {
                    args: Prisma.TwoFactorSecretGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TwoFactorSecretGroupByOutputType>[];
                };
                count: {
                    args: Prisma.TwoFactorSecretCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TwoFactorSecretCountAggregateOutputType> | number;
                };
            };
        };
        EmailVerificationToken: {
            payload: Prisma.$EmailVerificationTokenPayload<ExtArgs>;
            fields: Prisma.EmailVerificationTokenFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.EmailVerificationTokenFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmailVerificationTokenPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.EmailVerificationTokenFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmailVerificationTokenPayload>;
                };
                findFirst: {
                    args: Prisma.EmailVerificationTokenFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmailVerificationTokenPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.EmailVerificationTokenFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmailVerificationTokenPayload>;
                };
                findMany: {
                    args: Prisma.EmailVerificationTokenFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmailVerificationTokenPayload>[];
                };
                create: {
                    args: Prisma.EmailVerificationTokenCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmailVerificationTokenPayload>;
                };
                createMany: {
                    args: Prisma.EmailVerificationTokenCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.EmailVerificationTokenCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmailVerificationTokenPayload>[];
                };
                delete: {
                    args: Prisma.EmailVerificationTokenDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmailVerificationTokenPayload>;
                };
                update: {
                    args: Prisma.EmailVerificationTokenUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmailVerificationTokenPayload>;
                };
                deleteMany: {
                    args: Prisma.EmailVerificationTokenDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.EmailVerificationTokenUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.EmailVerificationTokenUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmailVerificationTokenPayload>[];
                };
                upsert: {
                    args: Prisma.EmailVerificationTokenUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmailVerificationTokenPayload>;
                };
                aggregate: {
                    args: Prisma.EmailVerificationTokenAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateEmailVerificationToken>;
                };
                groupBy: {
                    args: Prisma.EmailVerificationTokenGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.EmailVerificationTokenGroupByOutputType>[];
                };
                count: {
                    args: Prisma.EmailVerificationTokenCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.EmailVerificationTokenCountAggregateOutputType> | number;
                };
            };
        };
        PasswordResetToken: {
            payload: Prisma.$PasswordResetTokenPayload<ExtArgs>;
            fields: Prisma.PasswordResetTokenFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PasswordResetTokenFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PasswordResetTokenFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>;
                };
                findFirst: {
                    args: Prisma.PasswordResetTokenFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PasswordResetTokenFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>;
                };
                findMany: {
                    args: Prisma.PasswordResetTokenFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>[];
                };
                create: {
                    args: Prisma.PasswordResetTokenCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>;
                };
                createMany: {
                    args: Prisma.PasswordResetTokenCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PasswordResetTokenCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>[];
                };
                delete: {
                    args: Prisma.PasswordResetTokenDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>;
                };
                update: {
                    args: Prisma.PasswordResetTokenUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>;
                };
                deleteMany: {
                    args: Prisma.PasswordResetTokenDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PasswordResetTokenUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PasswordResetTokenUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>[];
                };
                upsert: {
                    args: Prisma.PasswordResetTokenUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>;
                };
                aggregate: {
                    args: Prisma.PasswordResetTokenAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePasswordResetToken>;
                };
                groupBy: {
                    args: Prisma.PasswordResetTokenGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PasswordResetTokenGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PasswordResetTokenCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PasswordResetTokenCountAggregateOutputType> | number;
                };
            };
        };
        Permission: {
            payload: Prisma.$PermissionPayload<ExtArgs>;
            fields: Prisma.PermissionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PermissionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PermissionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PermissionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PermissionPayload>;
                };
                findFirst: {
                    args: Prisma.PermissionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PermissionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PermissionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PermissionPayload>;
                };
                findMany: {
                    args: Prisma.PermissionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PermissionPayload>[];
                };
                create: {
                    args: Prisma.PermissionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PermissionPayload>;
                };
                createMany: {
                    args: Prisma.PermissionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PermissionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PermissionPayload>[];
                };
                delete: {
                    args: Prisma.PermissionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PermissionPayload>;
                };
                update: {
                    args: Prisma.PermissionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PermissionPayload>;
                };
                deleteMany: {
                    args: Prisma.PermissionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PermissionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PermissionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PermissionPayload>[];
                };
                upsert: {
                    args: Prisma.PermissionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PermissionPayload>;
                };
                aggregate: {
                    args: Prisma.PermissionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePermission>;
                };
                groupBy: {
                    args: Prisma.PermissionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PermissionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PermissionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PermissionCountAggregateOutputType> | number;
                };
            };
        };
        PlatformRole: {
            payload: Prisma.$PlatformRolePayload<ExtArgs>;
            fields: Prisma.PlatformRoleFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PlatformRoleFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlatformRolePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PlatformRoleFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlatformRolePayload>;
                };
                findFirst: {
                    args: Prisma.PlatformRoleFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlatformRolePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PlatformRoleFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlatformRolePayload>;
                };
                findMany: {
                    args: Prisma.PlatformRoleFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlatformRolePayload>[];
                };
                create: {
                    args: Prisma.PlatformRoleCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlatformRolePayload>;
                };
                createMany: {
                    args: Prisma.PlatformRoleCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PlatformRoleCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlatformRolePayload>[];
                };
                delete: {
                    args: Prisma.PlatformRoleDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlatformRolePayload>;
                };
                update: {
                    args: Prisma.PlatformRoleUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlatformRolePayload>;
                };
                deleteMany: {
                    args: Prisma.PlatformRoleDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PlatformRoleUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PlatformRoleUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlatformRolePayload>[];
                };
                upsert: {
                    args: Prisma.PlatformRoleUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlatformRolePayload>;
                };
                aggregate: {
                    args: Prisma.PlatformRoleAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePlatformRole>;
                };
                groupBy: {
                    args: Prisma.PlatformRoleGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PlatformRoleGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PlatformRoleCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PlatformRoleCountAggregateOutputType> | number;
                };
            };
        };
        PlatformUserRole: {
            payload: Prisma.$PlatformUserRolePayload<ExtArgs>;
            fields: Prisma.PlatformUserRoleFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PlatformUserRoleFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlatformUserRolePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PlatformUserRoleFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlatformUserRolePayload>;
                };
                findFirst: {
                    args: Prisma.PlatformUserRoleFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlatformUserRolePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PlatformUserRoleFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlatformUserRolePayload>;
                };
                findMany: {
                    args: Prisma.PlatformUserRoleFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlatformUserRolePayload>[];
                };
                create: {
                    args: Prisma.PlatformUserRoleCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlatformUserRolePayload>;
                };
                createMany: {
                    args: Prisma.PlatformUserRoleCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PlatformUserRoleCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlatformUserRolePayload>[];
                };
                delete: {
                    args: Prisma.PlatformUserRoleDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlatformUserRolePayload>;
                };
                update: {
                    args: Prisma.PlatformUserRoleUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlatformUserRolePayload>;
                };
                deleteMany: {
                    args: Prisma.PlatformUserRoleDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PlatformUserRoleUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PlatformUserRoleUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlatformUserRolePayload>[];
                };
                upsert: {
                    args: Prisma.PlatformUserRoleUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlatformUserRolePayload>;
                };
                aggregate: {
                    args: Prisma.PlatformUserRoleAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePlatformUserRole>;
                };
                groupBy: {
                    args: Prisma.PlatformUserRoleGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PlatformUserRoleGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PlatformUserRoleCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PlatformUserRoleCountAggregateOutputType> | number;
                };
            };
        };
        OrganizationType: {
            payload: Prisma.$OrganizationTypePayload<ExtArgs>;
            fields: Prisma.OrganizationTypeFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.OrganizationTypeFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrganizationTypePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.OrganizationTypeFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrganizationTypePayload>;
                };
                findFirst: {
                    args: Prisma.OrganizationTypeFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrganizationTypePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.OrganizationTypeFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrganizationTypePayload>;
                };
                findMany: {
                    args: Prisma.OrganizationTypeFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrganizationTypePayload>[];
                };
                create: {
                    args: Prisma.OrganizationTypeCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrganizationTypePayload>;
                };
                createMany: {
                    args: Prisma.OrganizationTypeCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.OrganizationTypeCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrganizationTypePayload>[];
                };
                delete: {
                    args: Prisma.OrganizationTypeDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrganizationTypePayload>;
                };
                update: {
                    args: Prisma.OrganizationTypeUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrganizationTypePayload>;
                };
                deleteMany: {
                    args: Prisma.OrganizationTypeDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.OrganizationTypeUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.OrganizationTypeUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrganizationTypePayload>[];
                };
                upsert: {
                    args: Prisma.OrganizationTypeUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrganizationTypePayload>;
                };
                aggregate: {
                    args: Prisma.OrganizationTypeAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateOrganizationType>;
                };
                groupBy: {
                    args: Prisma.OrganizationTypeGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.OrganizationTypeGroupByOutputType>[];
                };
                count: {
                    args: Prisma.OrganizationTypeCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.OrganizationTypeCountAggregateOutputType> | number;
                };
            };
        };
        Organization: {
            payload: Prisma.$OrganizationPayload<ExtArgs>;
            fields: Prisma.OrganizationFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.OrganizationFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrganizationPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.OrganizationFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrganizationPayload>;
                };
                findFirst: {
                    args: Prisma.OrganizationFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrganizationPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.OrganizationFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrganizationPayload>;
                };
                findMany: {
                    args: Prisma.OrganizationFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrganizationPayload>[];
                };
                create: {
                    args: Prisma.OrganizationCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrganizationPayload>;
                };
                createMany: {
                    args: Prisma.OrganizationCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.OrganizationCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrganizationPayload>[];
                };
                delete: {
                    args: Prisma.OrganizationDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrganizationPayload>;
                };
                update: {
                    args: Prisma.OrganizationUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrganizationPayload>;
                };
                deleteMany: {
                    args: Prisma.OrganizationDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.OrganizationUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.OrganizationUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrganizationPayload>[];
                };
                upsert: {
                    args: Prisma.OrganizationUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrganizationPayload>;
                };
                aggregate: {
                    args: Prisma.OrganizationAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateOrganization>;
                };
                groupBy: {
                    args: Prisma.OrganizationGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.OrganizationGroupByOutputType>[];
                };
                count: {
                    args: Prisma.OrganizationCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.OrganizationCountAggregateOutputType> | number;
                };
            };
        };
        OrganizationProfile: {
            payload: Prisma.$OrganizationProfilePayload<ExtArgs>;
            fields: Prisma.OrganizationProfileFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.OrganizationProfileFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrganizationProfilePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.OrganizationProfileFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrganizationProfilePayload>;
                };
                findFirst: {
                    args: Prisma.OrganizationProfileFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrganizationProfilePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.OrganizationProfileFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrganizationProfilePayload>;
                };
                findMany: {
                    args: Prisma.OrganizationProfileFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrganizationProfilePayload>[];
                };
                create: {
                    args: Prisma.OrganizationProfileCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrganizationProfilePayload>;
                };
                createMany: {
                    args: Prisma.OrganizationProfileCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.OrganizationProfileCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrganizationProfilePayload>[];
                };
                delete: {
                    args: Prisma.OrganizationProfileDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrganizationProfilePayload>;
                };
                update: {
                    args: Prisma.OrganizationProfileUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrganizationProfilePayload>;
                };
                deleteMany: {
                    args: Prisma.OrganizationProfileDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.OrganizationProfileUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.OrganizationProfileUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrganizationProfilePayload>[];
                };
                upsert: {
                    args: Prisma.OrganizationProfileUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrganizationProfilePayload>;
                };
                aggregate: {
                    args: Prisma.OrganizationProfileAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateOrganizationProfile>;
                };
                groupBy: {
                    args: Prisma.OrganizationProfileGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.OrganizationProfileGroupByOutputType>[];
                };
                count: {
                    args: Prisma.OrganizationProfileCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.OrganizationProfileCountAggregateOutputType> | number;
                };
            };
        };
        Branch: {
            payload: Prisma.$BranchPayload<ExtArgs>;
            fields: Prisma.BranchFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.BranchFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BranchPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.BranchFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BranchPayload>;
                };
                findFirst: {
                    args: Prisma.BranchFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BranchPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.BranchFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BranchPayload>;
                };
                findMany: {
                    args: Prisma.BranchFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BranchPayload>[];
                };
                create: {
                    args: Prisma.BranchCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BranchPayload>;
                };
                createMany: {
                    args: Prisma.BranchCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.BranchCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BranchPayload>[];
                };
                delete: {
                    args: Prisma.BranchDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BranchPayload>;
                };
                update: {
                    args: Prisma.BranchUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BranchPayload>;
                };
                deleteMany: {
                    args: Prisma.BranchDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.BranchUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.BranchUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BranchPayload>[];
                };
                upsert: {
                    args: Prisma.BranchUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BranchPayload>;
                };
                aggregate: {
                    args: Prisma.BranchAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateBranch>;
                };
                groupBy: {
                    args: Prisma.BranchGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.BranchGroupByOutputType>[];
                };
                count: {
                    args: Prisma.BranchCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.BranchCountAggregateOutputType> | number;
                };
            };
        };
        OrganizationRole: {
            payload: Prisma.$OrganizationRolePayload<ExtArgs>;
            fields: Prisma.OrganizationRoleFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.OrganizationRoleFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrganizationRolePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.OrganizationRoleFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrganizationRolePayload>;
                };
                findFirst: {
                    args: Prisma.OrganizationRoleFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrganizationRolePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.OrganizationRoleFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrganizationRolePayload>;
                };
                findMany: {
                    args: Prisma.OrganizationRoleFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrganizationRolePayload>[];
                };
                create: {
                    args: Prisma.OrganizationRoleCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrganizationRolePayload>;
                };
                createMany: {
                    args: Prisma.OrganizationRoleCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.OrganizationRoleCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrganizationRolePayload>[];
                };
                delete: {
                    args: Prisma.OrganizationRoleDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrganizationRolePayload>;
                };
                update: {
                    args: Prisma.OrganizationRoleUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrganizationRolePayload>;
                };
                deleteMany: {
                    args: Prisma.OrganizationRoleDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.OrganizationRoleUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.OrganizationRoleUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrganizationRolePayload>[];
                };
                upsert: {
                    args: Prisma.OrganizationRoleUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrganizationRolePayload>;
                };
                aggregate: {
                    args: Prisma.OrganizationRoleAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateOrganizationRole>;
                };
                groupBy: {
                    args: Prisma.OrganizationRoleGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.OrganizationRoleGroupByOutputType>[];
                };
                count: {
                    args: Prisma.OrganizationRoleCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.OrganizationRoleCountAggregateOutputType> | number;
                };
            };
        };
        RolePermission: {
            payload: Prisma.$RolePermissionPayload<ExtArgs>;
            fields: Prisma.RolePermissionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.RolePermissionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePermissionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.RolePermissionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePermissionPayload>;
                };
                findFirst: {
                    args: Prisma.RolePermissionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePermissionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.RolePermissionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePermissionPayload>;
                };
                findMany: {
                    args: Prisma.RolePermissionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePermissionPayload>[];
                };
                create: {
                    args: Prisma.RolePermissionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePermissionPayload>;
                };
                createMany: {
                    args: Prisma.RolePermissionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.RolePermissionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePermissionPayload>[];
                };
                delete: {
                    args: Prisma.RolePermissionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePermissionPayload>;
                };
                update: {
                    args: Prisma.RolePermissionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePermissionPayload>;
                };
                deleteMany: {
                    args: Prisma.RolePermissionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.RolePermissionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.RolePermissionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePermissionPayload>[];
                };
                upsert: {
                    args: Prisma.RolePermissionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePermissionPayload>;
                };
                aggregate: {
                    args: Prisma.RolePermissionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateRolePermission>;
                };
                groupBy: {
                    args: Prisma.RolePermissionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RolePermissionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.RolePermissionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RolePermissionCountAggregateOutputType> | number;
                };
            };
        };
        Membership: {
            payload: Prisma.$MembershipPayload<ExtArgs>;
            fields: Prisma.MembershipFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.MembershipFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MembershipPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.MembershipFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MembershipPayload>;
                };
                findFirst: {
                    args: Prisma.MembershipFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MembershipPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.MembershipFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MembershipPayload>;
                };
                findMany: {
                    args: Prisma.MembershipFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MembershipPayload>[];
                };
                create: {
                    args: Prisma.MembershipCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MembershipPayload>;
                };
                createMany: {
                    args: Prisma.MembershipCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.MembershipCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MembershipPayload>[];
                };
                delete: {
                    args: Prisma.MembershipDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MembershipPayload>;
                };
                update: {
                    args: Prisma.MembershipUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MembershipPayload>;
                };
                deleteMany: {
                    args: Prisma.MembershipDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.MembershipUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.MembershipUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MembershipPayload>[];
                };
                upsert: {
                    args: Prisma.MembershipUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MembershipPayload>;
                };
                aggregate: {
                    args: Prisma.MembershipAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateMembership>;
                };
                groupBy: {
                    args: Prisma.MembershipGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MembershipGroupByOutputType>[];
                };
                count: {
                    args: Prisma.MembershipCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MembershipCountAggregateOutputType> | number;
                };
            };
        };
        MembershipRole: {
            payload: Prisma.$MembershipRolePayload<ExtArgs>;
            fields: Prisma.MembershipRoleFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.MembershipRoleFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MembershipRolePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.MembershipRoleFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MembershipRolePayload>;
                };
                findFirst: {
                    args: Prisma.MembershipRoleFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MembershipRolePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.MembershipRoleFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MembershipRolePayload>;
                };
                findMany: {
                    args: Prisma.MembershipRoleFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MembershipRolePayload>[];
                };
                create: {
                    args: Prisma.MembershipRoleCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MembershipRolePayload>;
                };
                createMany: {
                    args: Prisma.MembershipRoleCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.MembershipRoleCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MembershipRolePayload>[];
                };
                delete: {
                    args: Prisma.MembershipRoleDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MembershipRolePayload>;
                };
                update: {
                    args: Prisma.MembershipRoleUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MembershipRolePayload>;
                };
                deleteMany: {
                    args: Prisma.MembershipRoleDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.MembershipRoleUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.MembershipRoleUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MembershipRolePayload>[];
                };
                upsert: {
                    args: Prisma.MembershipRoleUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MembershipRolePayload>;
                };
                aggregate: {
                    args: Prisma.MembershipRoleAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateMembershipRole>;
                };
                groupBy: {
                    args: Prisma.MembershipRoleGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MembershipRoleGroupByOutputType>[];
                };
                count: {
                    args: Prisma.MembershipRoleCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MembershipRoleCountAggregateOutputType> | number;
                };
            };
        };
        OrgRoleTemplate: {
            payload: Prisma.$OrgRoleTemplatePayload<ExtArgs>;
            fields: Prisma.OrgRoleTemplateFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.OrgRoleTemplateFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrgRoleTemplatePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.OrgRoleTemplateFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrgRoleTemplatePayload>;
                };
                findFirst: {
                    args: Prisma.OrgRoleTemplateFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrgRoleTemplatePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.OrgRoleTemplateFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrgRoleTemplatePayload>;
                };
                findMany: {
                    args: Prisma.OrgRoleTemplateFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrgRoleTemplatePayload>[];
                };
                create: {
                    args: Prisma.OrgRoleTemplateCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrgRoleTemplatePayload>;
                };
                createMany: {
                    args: Prisma.OrgRoleTemplateCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.OrgRoleTemplateCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrgRoleTemplatePayload>[];
                };
                delete: {
                    args: Prisma.OrgRoleTemplateDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrgRoleTemplatePayload>;
                };
                update: {
                    args: Prisma.OrgRoleTemplateUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrgRoleTemplatePayload>;
                };
                deleteMany: {
                    args: Prisma.OrgRoleTemplateDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.OrgRoleTemplateUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.OrgRoleTemplateUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrgRoleTemplatePayload>[];
                };
                upsert: {
                    args: Prisma.OrgRoleTemplateUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrgRoleTemplatePayload>;
                };
                aggregate: {
                    args: Prisma.OrgRoleTemplateAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateOrgRoleTemplate>;
                };
                groupBy: {
                    args: Prisma.OrgRoleTemplateGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.OrgRoleTemplateGroupByOutputType>[];
                };
                count: {
                    args: Prisma.OrgRoleTemplateCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.OrgRoleTemplateCountAggregateOutputType> | number;
                };
            };
        };
        OrgRoleTemplatePermission: {
            payload: Prisma.$OrgRoleTemplatePermissionPayload<ExtArgs>;
            fields: Prisma.OrgRoleTemplatePermissionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.OrgRoleTemplatePermissionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrgRoleTemplatePermissionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.OrgRoleTemplatePermissionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrgRoleTemplatePermissionPayload>;
                };
                findFirst: {
                    args: Prisma.OrgRoleTemplatePermissionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrgRoleTemplatePermissionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.OrgRoleTemplatePermissionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrgRoleTemplatePermissionPayload>;
                };
                findMany: {
                    args: Prisma.OrgRoleTemplatePermissionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrgRoleTemplatePermissionPayload>[];
                };
                create: {
                    args: Prisma.OrgRoleTemplatePermissionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrgRoleTemplatePermissionPayload>;
                };
                createMany: {
                    args: Prisma.OrgRoleTemplatePermissionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.OrgRoleTemplatePermissionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrgRoleTemplatePermissionPayload>[];
                };
                delete: {
                    args: Prisma.OrgRoleTemplatePermissionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrgRoleTemplatePermissionPayload>;
                };
                update: {
                    args: Prisma.OrgRoleTemplatePermissionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrgRoleTemplatePermissionPayload>;
                };
                deleteMany: {
                    args: Prisma.OrgRoleTemplatePermissionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.OrgRoleTemplatePermissionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.OrgRoleTemplatePermissionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrgRoleTemplatePermissionPayload>[];
                };
                upsert: {
                    args: Prisma.OrgRoleTemplatePermissionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrgRoleTemplatePermissionPayload>;
                };
                aggregate: {
                    args: Prisma.OrgRoleTemplatePermissionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateOrgRoleTemplatePermission>;
                };
                groupBy: {
                    args: Prisma.OrgRoleTemplatePermissionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.OrgRoleTemplatePermissionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.OrgRoleTemplatePermissionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.OrgRoleTemplatePermissionCountAggregateOutputType> | number;
                };
            };
        };
        Role: {
            payload: Prisma.$RolePayload<ExtArgs>;
            fields: Prisma.RoleFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.RoleFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.RoleFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePayload>;
                };
                findFirst: {
                    args: Prisma.RoleFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.RoleFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePayload>;
                };
                findMany: {
                    args: Prisma.RoleFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePayload>[];
                };
                create: {
                    args: Prisma.RoleCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePayload>;
                };
                createMany: {
                    args: Prisma.RoleCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.RoleCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePayload>[];
                };
                delete: {
                    args: Prisma.RoleDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePayload>;
                };
                update: {
                    args: Prisma.RoleUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePayload>;
                };
                deleteMany: {
                    args: Prisma.RoleDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.RoleUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.RoleUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePayload>[];
                };
                upsert: {
                    args: Prisma.RoleUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePayload>;
                };
                aggregate: {
                    args: Prisma.RoleAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateRole>;
                };
                groupBy: {
                    args: Prisma.RoleGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RoleGroupByOutputType>[];
                };
                count: {
                    args: Prisma.RoleCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RoleCountAggregateOutputType> | number;
                };
            };
        };
        UserRole: {
            payload: Prisma.$UserRolePayload<ExtArgs>;
            fields: Prisma.UserRoleFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.UserRoleFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserRolePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.UserRoleFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserRolePayload>;
                };
                findFirst: {
                    args: Prisma.UserRoleFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserRolePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.UserRoleFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserRolePayload>;
                };
                findMany: {
                    args: Prisma.UserRoleFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserRolePayload>[];
                };
                create: {
                    args: Prisma.UserRoleCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserRolePayload>;
                };
                createMany: {
                    args: Prisma.UserRoleCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.UserRoleCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserRolePayload>[];
                };
                delete: {
                    args: Prisma.UserRoleDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserRolePayload>;
                };
                update: {
                    args: Prisma.UserRoleUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserRolePayload>;
                };
                deleteMany: {
                    args: Prisma.UserRoleDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.UserRoleUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.UserRoleUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserRolePayload>[];
                };
                upsert: {
                    args: Prisma.UserRoleUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserRolePayload>;
                };
                aggregate: {
                    args: Prisma.UserRoleAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateUserRole>;
                };
                groupBy: {
                    args: Prisma.UserRoleGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserRoleGroupByOutputType>[];
                };
                count: {
                    args: Prisma.UserRoleCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserRoleCountAggregateOutputType> | number;
                };
            };
        };
        Manufacturer: {
            payload: Prisma.$ManufacturerPayload<ExtArgs>;
            fields: Prisma.ManufacturerFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ManufacturerFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ManufacturerPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ManufacturerFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ManufacturerPayload>;
                };
                findFirst: {
                    args: Prisma.ManufacturerFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ManufacturerPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ManufacturerFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ManufacturerPayload>;
                };
                findMany: {
                    args: Prisma.ManufacturerFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ManufacturerPayload>[];
                };
                create: {
                    args: Prisma.ManufacturerCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ManufacturerPayload>;
                };
                createMany: {
                    args: Prisma.ManufacturerCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ManufacturerCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ManufacturerPayload>[];
                };
                delete: {
                    args: Prisma.ManufacturerDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ManufacturerPayload>;
                };
                update: {
                    args: Prisma.ManufacturerUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ManufacturerPayload>;
                };
                deleteMany: {
                    args: Prisma.ManufacturerDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ManufacturerUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ManufacturerUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ManufacturerPayload>[];
                };
                upsert: {
                    args: Prisma.ManufacturerUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ManufacturerPayload>;
                };
                aggregate: {
                    args: Prisma.ManufacturerAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateManufacturer>;
                };
                groupBy: {
                    args: Prisma.ManufacturerGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ManufacturerGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ManufacturerCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ManufacturerCountAggregateOutputType> | number;
                };
            };
        };
        Product: {
            payload: Prisma.$ProductPayload<ExtArgs>;
            fields: Prisma.ProductFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ProductFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ProductFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload>;
                };
                findFirst: {
                    args: Prisma.ProductFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ProductFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload>;
                };
                findMany: {
                    args: Prisma.ProductFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload>[];
                };
                create: {
                    args: Prisma.ProductCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload>;
                };
                createMany: {
                    args: Prisma.ProductCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ProductCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload>[];
                };
                delete: {
                    args: Prisma.ProductDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload>;
                };
                update: {
                    args: Prisma.ProductUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload>;
                };
                deleteMany: {
                    args: Prisma.ProductDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ProductUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ProductUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload>[];
                };
                upsert: {
                    args: Prisma.ProductUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload>;
                };
                aggregate: {
                    args: Prisma.ProductAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateProduct>;
                };
                groupBy: {
                    args: Prisma.ProductGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProductGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ProductCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProductCountAggregateOutputType> | number;
                };
            };
        };
        ProductUnit: {
            payload: Prisma.$ProductUnitPayload<ExtArgs>;
            fields: Prisma.ProductUnitFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ProductUnitFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductUnitPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ProductUnitFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductUnitPayload>;
                };
                findFirst: {
                    args: Prisma.ProductUnitFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductUnitPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ProductUnitFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductUnitPayload>;
                };
                findMany: {
                    args: Prisma.ProductUnitFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductUnitPayload>[];
                };
                create: {
                    args: Prisma.ProductUnitCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductUnitPayload>;
                };
                createMany: {
                    args: Prisma.ProductUnitCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ProductUnitCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductUnitPayload>[];
                };
                delete: {
                    args: Prisma.ProductUnitDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductUnitPayload>;
                };
                update: {
                    args: Prisma.ProductUnitUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductUnitPayload>;
                };
                deleteMany: {
                    args: Prisma.ProductUnitDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ProductUnitUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ProductUnitUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductUnitPayload>[];
                };
                upsert: {
                    args: Prisma.ProductUnitUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductUnitPayload>;
                };
                aggregate: {
                    args: Prisma.ProductUnitAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateProductUnit>;
                };
                groupBy: {
                    args: Prisma.ProductUnitGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProductUnitGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ProductUnitCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProductUnitCountAggregateOutputType> | number;
                };
            };
        };
        ProductUnitAuditLog: {
            payload: Prisma.$ProductUnitAuditLogPayload<ExtArgs>;
            fields: Prisma.ProductUnitAuditLogFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ProductUnitAuditLogFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductUnitAuditLogPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ProductUnitAuditLogFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductUnitAuditLogPayload>;
                };
                findFirst: {
                    args: Prisma.ProductUnitAuditLogFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductUnitAuditLogPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ProductUnitAuditLogFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductUnitAuditLogPayload>;
                };
                findMany: {
                    args: Prisma.ProductUnitAuditLogFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductUnitAuditLogPayload>[];
                };
                create: {
                    args: Prisma.ProductUnitAuditLogCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductUnitAuditLogPayload>;
                };
                createMany: {
                    args: Prisma.ProductUnitAuditLogCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ProductUnitAuditLogCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductUnitAuditLogPayload>[];
                };
                delete: {
                    args: Prisma.ProductUnitAuditLogDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductUnitAuditLogPayload>;
                };
                update: {
                    args: Prisma.ProductUnitAuditLogUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductUnitAuditLogPayload>;
                };
                deleteMany: {
                    args: Prisma.ProductUnitAuditLogDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ProductUnitAuditLogUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ProductUnitAuditLogUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductUnitAuditLogPayload>[];
                };
                upsert: {
                    args: Prisma.ProductUnitAuditLogUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductUnitAuditLogPayload>;
                };
                aggregate: {
                    args: Prisma.ProductUnitAuditLogAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateProductUnitAuditLog>;
                };
                groupBy: {
                    args: Prisma.ProductUnitAuditLogGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProductUnitAuditLogGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ProductUnitAuditLogCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProductUnitAuditLogCountAggregateOutputType> | number;
                };
            };
        };
        AuditLog: {
            payload: Prisma.$AuditLogPayload<ExtArgs>;
            fields: Prisma.AuditLogFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.AuditLogFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.AuditLogFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>;
                };
                findFirst: {
                    args: Prisma.AuditLogFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.AuditLogFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>;
                };
                findMany: {
                    args: Prisma.AuditLogFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>[];
                };
                create: {
                    args: Prisma.AuditLogCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>;
                };
                createMany: {
                    args: Prisma.AuditLogCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.AuditLogCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>[];
                };
                delete: {
                    args: Prisma.AuditLogDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>;
                };
                update: {
                    args: Prisma.AuditLogUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>;
                };
                deleteMany: {
                    args: Prisma.AuditLogDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.AuditLogUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.AuditLogUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>[];
                };
                upsert: {
                    args: Prisma.AuditLogUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>;
                };
                aggregate: {
                    args: Prisma.AuditLogAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateAuditLog>;
                };
                groupBy: {
                    args: Prisma.AuditLogGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AuditLogGroupByOutputType>[];
                };
                count: {
                    args: Prisma.AuditLogCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AuditLogCountAggregateOutputType> | number;
                };
            };
        };
        MedicineCategory: {
            payload: Prisma.$MedicineCategoryPayload<ExtArgs>;
            fields: Prisma.MedicineCategoryFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.MedicineCategoryFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MedicineCategoryPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.MedicineCategoryFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MedicineCategoryPayload>;
                };
                findFirst: {
                    args: Prisma.MedicineCategoryFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MedicineCategoryPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.MedicineCategoryFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MedicineCategoryPayload>;
                };
                findMany: {
                    args: Prisma.MedicineCategoryFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MedicineCategoryPayload>[];
                };
                create: {
                    args: Prisma.MedicineCategoryCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MedicineCategoryPayload>;
                };
                createMany: {
                    args: Prisma.MedicineCategoryCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.MedicineCategoryCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MedicineCategoryPayload>[];
                };
                delete: {
                    args: Prisma.MedicineCategoryDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MedicineCategoryPayload>;
                };
                update: {
                    args: Prisma.MedicineCategoryUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MedicineCategoryPayload>;
                };
                deleteMany: {
                    args: Prisma.MedicineCategoryDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.MedicineCategoryUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.MedicineCategoryUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MedicineCategoryPayload>[];
                };
                upsert: {
                    args: Prisma.MedicineCategoryUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MedicineCategoryPayload>;
                };
                aggregate: {
                    args: Prisma.MedicineCategoryAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateMedicineCategory>;
                };
                groupBy: {
                    args: Prisma.MedicineCategoryGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MedicineCategoryGroupByOutputType>[];
                };
                count: {
                    args: Prisma.MedicineCategoryCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MedicineCategoryCountAggregateOutputType> | number;
                };
            };
        };
        DosageForm: {
            payload: Prisma.$DosageFormPayload<ExtArgs>;
            fields: Prisma.DosageFormFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.DosageFormFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DosageFormPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.DosageFormFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DosageFormPayload>;
                };
                findFirst: {
                    args: Prisma.DosageFormFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DosageFormPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.DosageFormFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DosageFormPayload>;
                };
                findMany: {
                    args: Prisma.DosageFormFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DosageFormPayload>[];
                };
                create: {
                    args: Prisma.DosageFormCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DosageFormPayload>;
                };
                createMany: {
                    args: Prisma.DosageFormCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.DosageFormCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DosageFormPayload>[];
                };
                delete: {
                    args: Prisma.DosageFormDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DosageFormPayload>;
                };
                update: {
                    args: Prisma.DosageFormUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DosageFormPayload>;
                };
                deleteMany: {
                    args: Prisma.DosageFormDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.DosageFormUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.DosageFormUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DosageFormPayload>[];
                };
                upsert: {
                    args: Prisma.DosageFormUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DosageFormPayload>;
                };
                aggregate: {
                    args: Prisma.DosageFormAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateDosageForm>;
                };
                groupBy: {
                    args: Prisma.DosageFormGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DosageFormGroupByOutputType>[];
                };
                count: {
                    args: Prisma.DosageFormCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DosageFormCountAggregateOutputType> | number;
                };
            };
        };
        PackagingType: {
            payload: Prisma.$PackagingTypePayload<ExtArgs>;
            fields: Prisma.PackagingTypeFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PackagingTypeFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PackagingTypePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PackagingTypeFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PackagingTypePayload>;
                };
                findFirst: {
                    args: Prisma.PackagingTypeFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PackagingTypePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PackagingTypeFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PackagingTypePayload>;
                };
                findMany: {
                    args: Prisma.PackagingTypeFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PackagingTypePayload>[];
                };
                create: {
                    args: Prisma.PackagingTypeCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PackagingTypePayload>;
                };
                createMany: {
                    args: Prisma.PackagingTypeCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PackagingTypeCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PackagingTypePayload>[];
                };
                delete: {
                    args: Prisma.PackagingTypeDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PackagingTypePayload>;
                };
                update: {
                    args: Prisma.PackagingTypeUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PackagingTypePayload>;
                };
                deleteMany: {
                    args: Prisma.PackagingTypeDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PackagingTypeUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PackagingTypeUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PackagingTypePayload>[];
                };
                upsert: {
                    args: Prisma.PackagingTypeUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PackagingTypePayload>;
                };
                aggregate: {
                    args: Prisma.PackagingTypeAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePackagingType>;
                };
                groupBy: {
                    args: Prisma.PackagingTypeGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PackagingTypeGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PackagingTypeCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PackagingTypeCountAggregateOutputType> | number;
                };
            };
        };
        ProductFamily: {
            payload: Prisma.$ProductFamilyPayload<ExtArgs>;
            fields: Prisma.ProductFamilyFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ProductFamilyFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductFamilyPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ProductFamilyFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductFamilyPayload>;
                };
                findFirst: {
                    args: Prisma.ProductFamilyFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductFamilyPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ProductFamilyFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductFamilyPayload>;
                };
                findMany: {
                    args: Prisma.ProductFamilyFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductFamilyPayload>[];
                };
                create: {
                    args: Prisma.ProductFamilyCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductFamilyPayload>;
                };
                createMany: {
                    args: Prisma.ProductFamilyCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ProductFamilyCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductFamilyPayload>[];
                };
                delete: {
                    args: Prisma.ProductFamilyDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductFamilyPayload>;
                };
                update: {
                    args: Prisma.ProductFamilyUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductFamilyPayload>;
                };
                deleteMany: {
                    args: Prisma.ProductFamilyDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ProductFamilyUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ProductFamilyUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductFamilyPayload>[];
                };
                upsert: {
                    args: Prisma.ProductFamilyUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductFamilyPayload>;
                };
                aggregate: {
                    args: Prisma.ProductFamilyAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateProductFamily>;
                };
                groupBy: {
                    args: Prisma.ProductFamilyGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProductFamilyGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ProductFamilyCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProductFamilyCountAggregateOutputType> | number;
                };
            };
        };
        Brand: {
            payload: Prisma.$BrandPayload<ExtArgs>;
            fields: Prisma.BrandFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.BrandFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BrandPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.BrandFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BrandPayload>;
                };
                findFirst: {
                    args: Prisma.BrandFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BrandPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.BrandFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BrandPayload>;
                };
                findMany: {
                    args: Prisma.BrandFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BrandPayload>[];
                };
                create: {
                    args: Prisma.BrandCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BrandPayload>;
                };
                createMany: {
                    args: Prisma.BrandCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.BrandCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BrandPayload>[];
                };
                delete: {
                    args: Prisma.BrandDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BrandPayload>;
                };
                update: {
                    args: Prisma.BrandUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BrandPayload>;
                };
                deleteMany: {
                    args: Prisma.BrandDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.BrandUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.BrandUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BrandPayload>[];
                };
                upsert: {
                    args: Prisma.BrandUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BrandPayload>;
                };
                aggregate: {
                    args: Prisma.BrandAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateBrand>;
                };
                groupBy: {
                    args: Prisma.BrandGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.BrandGroupByOutputType>[];
                };
                count: {
                    args: Prisma.BrandCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.BrandCountAggregateOutputType> | number;
                };
            };
        };
        Medicine: {
            payload: Prisma.$MedicinePayload<ExtArgs>;
            fields: Prisma.MedicineFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.MedicineFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MedicinePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.MedicineFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MedicinePayload>;
                };
                findFirst: {
                    args: Prisma.MedicineFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MedicinePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.MedicineFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MedicinePayload>;
                };
                findMany: {
                    args: Prisma.MedicineFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MedicinePayload>[];
                };
                create: {
                    args: Prisma.MedicineCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MedicinePayload>;
                };
                createMany: {
                    args: Prisma.MedicineCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.MedicineCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MedicinePayload>[];
                };
                delete: {
                    args: Prisma.MedicineDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MedicinePayload>;
                };
                update: {
                    args: Prisma.MedicineUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MedicinePayload>;
                };
                deleteMany: {
                    args: Prisma.MedicineDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.MedicineUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.MedicineUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MedicinePayload>[];
                };
                upsert: {
                    args: Prisma.MedicineUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MedicinePayload>;
                };
                aggregate: {
                    args: Prisma.MedicineAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateMedicine>;
                };
                groupBy: {
                    args: Prisma.MedicineGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MedicineGroupByOutputType>[];
                };
                count: {
                    args: Prisma.MedicineCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MedicineCountAggregateOutputType> | number;
                };
            };
        };
        Variant: {
            payload: Prisma.$VariantPayload<ExtArgs>;
            fields: Prisma.VariantFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.VariantFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VariantPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.VariantFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VariantPayload>;
                };
                findFirst: {
                    args: Prisma.VariantFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VariantPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.VariantFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VariantPayload>;
                };
                findMany: {
                    args: Prisma.VariantFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VariantPayload>[];
                };
                create: {
                    args: Prisma.VariantCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VariantPayload>;
                };
                createMany: {
                    args: Prisma.VariantCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.VariantCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VariantPayload>[];
                };
                delete: {
                    args: Prisma.VariantDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VariantPayload>;
                };
                update: {
                    args: Prisma.VariantUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VariantPayload>;
                };
                deleteMany: {
                    args: Prisma.VariantDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.VariantUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.VariantUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VariantPayload>[];
                };
                upsert: {
                    args: Prisma.VariantUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VariantPayload>;
                };
                aggregate: {
                    args: Prisma.VariantAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateVariant>;
                };
                groupBy: {
                    args: Prisma.VariantGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.VariantGroupByOutputType>[];
                };
                count: {
                    args: Prisma.VariantCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.VariantCountAggregateOutputType> | number;
                };
            };
        };
        PackageDefinition: {
            payload: Prisma.$PackageDefinitionPayload<ExtArgs>;
            fields: Prisma.PackageDefinitionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PackageDefinitionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PackageDefinitionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PackageDefinitionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PackageDefinitionPayload>;
                };
                findFirst: {
                    args: Prisma.PackageDefinitionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PackageDefinitionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PackageDefinitionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PackageDefinitionPayload>;
                };
                findMany: {
                    args: Prisma.PackageDefinitionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PackageDefinitionPayload>[];
                };
                create: {
                    args: Prisma.PackageDefinitionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PackageDefinitionPayload>;
                };
                createMany: {
                    args: Prisma.PackageDefinitionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PackageDefinitionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PackageDefinitionPayload>[];
                };
                delete: {
                    args: Prisma.PackageDefinitionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PackageDefinitionPayload>;
                };
                update: {
                    args: Prisma.PackageDefinitionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PackageDefinitionPayload>;
                };
                deleteMany: {
                    args: Prisma.PackageDefinitionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PackageDefinitionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PackageDefinitionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PackageDefinitionPayload>[];
                };
                upsert: {
                    args: Prisma.PackageDefinitionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PackageDefinitionPayload>;
                };
                aggregate: {
                    args: Prisma.PackageDefinitionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePackageDefinition>;
                };
                groupBy: {
                    args: Prisma.PackageDefinitionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PackageDefinitionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PackageDefinitionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PackageDefinitionCountAggregateOutputType> | number;
                };
            };
        };
        Batch: {
            payload: Prisma.$BatchPayload<ExtArgs>;
            fields: Prisma.BatchFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.BatchFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BatchPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.BatchFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BatchPayload>;
                };
                findFirst: {
                    args: Prisma.BatchFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BatchPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.BatchFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BatchPayload>;
                };
                findMany: {
                    args: Prisma.BatchFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BatchPayload>[];
                };
                create: {
                    args: Prisma.BatchCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BatchPayload>;
                };
                createMany: {
                    args: Prisma.BatchCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.BatchCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BatchPayload>[];
                };
                delete: {
                    args: Prisma.BatchDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BatchPayload>;
                };
                update: {
                    args: Prisma.BatchUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BatchPayload>;
                };
                deleteMany: {
                    args: Prisma.BatchDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.BatchUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.BatchUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BatchPayload>[];
                };
                upsert: {
                    args: Prisma.BatchUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BatchPayload>;
                };
                aggregate: {
                    args: Prisma.BatchAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateBatch>;
                };
                groupBy: {
                    args: Prisma.BatchGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.BatchGroupByOutputType>[];
                };
                count: {
                    args: Prisma.BatchCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.BatchCountAggregateOutputType> | number;
                };
            };
        };
        WarehouseType: {
            payload: Prisma.$WarehouseTypePayload<ExtArgs>;
            fields: Prisma.WarehouseTypeFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.WarehouseTypeFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WarehouseTypePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.WarehouseTypeFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WarehouseTypePayload>;
                };
                findFirst: {
                    args: Prisma.WarehouseTypeFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WarehouseTypePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.WarehouseTypeFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WarehouseTypePayload>;
                };
                findMany: {
                    args: Prisma.WarehouseTypeFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WarehouseTypePayload>[];
                };
                create: {
                    args: Prisma.WarehouseTypeCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WarehouseTypePayload>;
                };
                createMany: {
                    args: Prisma.WarehouseTypeCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.WarehouseTypeCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WarehouseTypePayload>[];
                };
                delete: {
                    args: Prisma.WarehouseTypeDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WarehouseTypePayload>;
                };
                update: {
                    args: Prisma.WarehouseTypeUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WarehouseTypePayload>;
                };
                deleteMany: {
                    args: Prisma.WarehouseTypeDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.WarehouseTypeUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.WarehouseTypeUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WarehouseTypePayload>[];
                };
                upsert: {
                    args: Prisma.WarehouseTypeUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WarehouseTypePayload>;
                };
                aggregate: {
                    args: Prisma.WarehouseTypeAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateWarehouseType>;
                };
                groupBy: {
                    args: Prisma.WarehouseTypeGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WarehouseTypeGroupByOutputType>[];
                };
                count: {
                    args: Prisma.WarehouseTypeCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WarehouseTypeCountAggregateOutputType> | number;
                };
            };
        };
        Warehouse: {
            payload: Prisma.$WarehousePayload<ExtArgs>;
            fields: Prisma.WarehouseFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.WarehouseFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WarehousePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.WarehouseFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WarehousePayload>;
                };
                findFirst: {
                    args: Prisma.WarehouseFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WarehousePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.WarehouseFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WarehousePayload>;
                };
                findMany: {
                    args: Prisma.WarehouseFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WarehousePayload>[];
                };
                create: {
                    args: Prisma.WarehouseCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WarehousePayload>;
                };
                createMany: {
                    args: Prisma.WarehouseCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.WarehouseCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WarehousePayload>[];
                };
                delete: {
                    args: Prisma.WarehouseDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WarehousePayload>;
                };
                update: {
                    args: Prisma.WarehouseUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WarehousePayload>;
                };
                deleteMany: {
                    args: Prisma.WarehouseDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.WarehouseUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.WarehouseUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WarehousePayload>[];
                };
                upsert: {
                    args: Prisma.WarehouseUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WarehousePayload>;
                };
                aggregate: {
                    args: Prisma.WarehouseAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateWarehouse>;
                };
                groupBy: {
                    args: Prisma.WarehouseGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WarehouseGroupByOutputType>[];
                };
                count: {
                    args: Prisma.WarehouseCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WarehouseCountAggregateOutputType> | number;
                };
            };
        };
        InventoryPosition: {
            payload: Prisma.$InventoryPositionPayload<ExtArgs>;
            fields: Prisma.InventoryPositionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.InventoryPositionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InventoryPositionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.InventoryPositionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InventoryPositionPayload>;
                };
                findFirst: {
                    args: Prisma.InventoryPositionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InventoryPositionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.InventoryPositionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InventoryPositionPayload>;
                };
                findMany: {
                    args: Prisma.InventoryPositionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InventoryPositionPayload>[];
                };
                create: {
                    args: Prisma.InventoryPositionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InventoryPositionPayload>;
                };
                createMany: {
                    args: Prisma.InventoryPositionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.InventoryPositionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InventoryPositionPayload>[];
                };
                delete: {
                    args: Prisma.InventoryPositionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InventoryPositionPayload>;
                };
                update: {
                    args: Prisma.InventoryPositionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InventoryPositionPayload>;
                };
                deleteMany: {
                    args: Prisma.InventoryPositionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.InventoryPositionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.InventoryPositionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InventoryPositionPayload>[];
                };
                upsert: {
                    args: Prisma.InventoryPositionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InventoryPositionPayload>;
                };
                aggregate: {
                    args: Prisma.InventoryPositionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateInventoryPosition>;
                };
                groupBy: {
                    args: Prisma.InventoryPositionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.InventoryPositionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.InventoryPositionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.InventoryPositionCountAggregateOutputType> | number;
                };
            };
        };
        InventoryMovement: {
            payload: Prisma.$InventoryMovementPayload<ExtArgs>;
            fields: Prisma.InventoryMovementFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.InventoryMovementFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InventoryMovementPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.InventoryMovementFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InventoryMovementPayload>;
                };
                findFirst: {
                    args: Prisma.InventoryMovementFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InventoryMovementPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.InventoryMovementFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InventoryMovementPayload>;
                };
                findMany: {
                    args: Prisma.InventoryMovementFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InventoryMovementPayload>[];
                };
                create: {
                    args: Prisma.InventoryMovementCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InventoryMovementPayload>;
                };
                createMany: {
                    args: Prisma.InventoryMovementCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.InventoryMovementCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InventoryMovementPayload>[];
                };
                delete: {
                    args: Prisma.InventoryMovementDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InventoryMovementPayload>;
                };
                update: {
                    args: Prisma.InventoryMovementUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InventoryMovementPayload>;
                };
                deleteMany: {
                    args: Prisma.InventoryMovementDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.InventoryMovementUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.InventoryMovementUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InventoryMovementPayload>[];
                };
                upsert: {
                    args: Prisma.InventoryMovementUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InventoryMovementPayload>;
                };
                aggregate: {
                    args: Prisma.InventoryMovementAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateInventoryMovement>;
                };
                groupBy: {
                    args: Prisma.InventoryMovementGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.InventoryMovementGroupByOutputType>[];
                };
                count: {
                    args: Prisma.InventoryMovementCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.InventoryMovementCountAggregateOutputType> | number;
                };
            };
        };
        PackagingInstance: {
            payload: Prisma.$PackagingInstancePayload<ExtArgs>;
            fields: Prisma.PackagingInstanceFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PackagingInstanceFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PackagingInstancePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PackagingInstanceFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PackagingInstancePayload>;
                };
                findFirst: {
                    args: Prisma.PackagingInstanceFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PackagingInstancePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PackagingInstanceFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PackagingInstancePayload>;
                };
                findMany: {
                    args: Prisma.PackagingInstanceFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PackagingInstancePayload>[];
                };
                create: {
                    args: Prisma.PackagingInstanceCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PackagingInstancePayload>;
                };
                createMany: {
                    args: Prisma.PackagingInstanceCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PackagingInstanceCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PackagingInstancePayload>[];
                };
                delete: {
                    args: Prisma.PackagingInstanceDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PackagingInstancePayload>;
                };
                update: {
                    args: Prisma.PackagingInstanceUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PackagingInstancePayload>;
                };
                deleteMany: {
                    args: Prisma.PackagingInstanceDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PackagingInstanceUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PackagingInstanceUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PackagingInstancePayload>[];
                };
                upsert: {
                    args: Prisma.PackagingInstanceUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PackagingInstancePayload>;
                };
                aggregate: {
                    args: Prisma.PackagingInstanceAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePackagingInstance>;
                };
                groupBy: {
                    args: Prisma.PackagingInstanceGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PackagingInstanceGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PackagingInstanceCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PackagingInstanceCountAggregateOutputType> | number;
                };
            };
        };
        TrackableUnit: {
            payload: Prisma.$TrackableUnitPayload<ExtArgs>;
            fields: Prisma.TrackableUnitFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.TrackableUnitFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TrackableUnitPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.TrackableUnitFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TrackableUnitPayload>;
                };
                findFirst: {
                    args: Prisma.TrackableUnitFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TrackableUnitPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.TrackableUnitFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TrackableUnitPayload>;
                };
                findMany: {
                    args: Prisma.TrackableUnitFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TrackableUnitPayload>[];
                };
                create: {
                    args: Prisma.TrackableUnitCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TrackableUnitPayload>;
                };
                createMany: {
                    args: Prisma.TrackableUnitCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.TrackableUnitCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TrackableUnitPayload>[];
                };
                delete: {
                    args: Prisma.TrackableUnitDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TrackableUnitPayload>;
                };
                update: {
                    args: Prisma.TrackableUnitUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TrackableUnitPayload>;
                };
                deleteMany: {
                    args: Prisma.TrackableUnitDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.TrackableUnitUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.TrackableUnitUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TrackableUnitPayload>[];
                };
                upsert: {
                    args: Prisma.TrackableUnitUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TrackableUnitPayload>;
                };
                aggregate: {
                    args: Prisma.TrackableUnitAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateTrackableUnit>;
                };
                groupBy: {
                    args: Prisma.TrackableUnitGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TrackableUnitGroupByOutputType>[];
                };
                count: {
                    args: Prisma.TrackableUnitCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TrackableUnitCountAggregateOutputType> | number;
                };
            };
        };
        ScanEvent: {
            payload: Prisma.$ScanEventPayload<ExtArgs>;
            fields: Prisma.ScanEventFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ScanEventFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ScanEventPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ScanEventFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ScanEventPayload>;
                };
                findFirst: {
                    args: Prisma.ScanEventFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ScanEventPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ScanEventFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ScanEventPayload>;
                };
                findMany: {
                    args: Prisma.ScanEventFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ScanEventPayload>[];
                };
                create: {
                    args: Prisma.ScanEventCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ScanEventPayload>;
                };
                createMany: {
                    args: Prisma.ScanEventCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ScanEventCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ScanEventPayload>[];
                };
                delete: {
                    args: Prisma.ScanEventDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ScanEventPayload>;
                };
                update: {
                    args: Prisma.ScanEventUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ScanEventPayload>;
                };
                deleteMany: {
                    args: Prisma.ScanEventDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ScanEventUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ScanEventUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ScanEventPayload>[];
                };
                upsert: {
                    args: Prisma.ScanEventUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ScanEventPayload>;
                };
                aggregate: {
                    args: Prisma.ScanEventAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateScanEvent>;
                };
                groupBy: {
                    args: Prisma.ScanEventGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ScanEventGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ScanEventCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ScanEventCountAggregateOutputType> | number;
                };
            };
        };
        CustodyTransfer: {
            payload: Prisma.$CustodyTransferPayload<ExtArgs>;
            fields: Prisma.CustodyTransferFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.CustodyTransferFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustodyTransferPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.CustodyTransferFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustodyTransferPayload>;
                };
                findFirst: {
                    args: Prisma.CustodyTransferFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustodyTransferPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.CustodyTransferFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustodyTransferPayload>;
                };
                findMany: {
                    args: Prisma.CustodyTransferFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustodyTransferPayload>[];
                };
                create: {
                    args: Prisma.CustodyTransferCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustodyTransferPayload>;
                };
                createMany: {
                    args: Prisma.CustodyTransferCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.CustodyTransferCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustodyTransferPayload>[];
                };
                delete: {
                    args: Prisma.CustodyTransferDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustodyTransferPayload>;
                };
                update: {
                    args: Prisma.CustodyTransferUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustodyTransferPayload>;
                };
                deleteMany: {
                    args: Prisma.CustodyTransferDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.CustodyTransferUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.CustodyTransferUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustodyTransferPayload>[];
                };
                upsert: {
                    args: Prisma.CustodyTransferUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustodyTransferPayload>;
                };
                aggregate: {
                    args: Prisma.CustodyTransferAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateCustodyTransfer>;
                };
                groupBy: {
                    args: Prisma.CustodyTransferGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CustodyTransferGroupByOutputType>[];
                };
                count: {
                    args: Prisma.CustodyTransferCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CustodyTransferCountAggregateOutputType> | number;
                };
            };
        };
        CustodyTransferLine: {
            payload: Prisma.$CustodyTransferLinePayload<ExtArgs>;
            fields: Prisma.CustodyTransferLineFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.CustodyTransferLineFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustodyTransferLinePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.CustodyTransferLineFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustodyTransferLinePayload>;
                };
                findFirst: {
                    args: Prisma.CustodyTransferLineFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustodyTransferLinePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.CustodyTransferLineFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustodyTransferLinePayload>;
                };
                findMany: {
                    args: Prisma.CustodyTransferLineFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustodyTransferLinePayload>[];
                };
                create: {
                    args: Prisma.CustodyTransferLineCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustodyTransferLinePayload>;
                };
                createMany: {
                    args: Prisma.CustodyTransferLineCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.CustodyTransferLineCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustodyTransferLinePayload>[];
                };
                delete: {
                    args: Prisma.CustodyTransferLineDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustodyTransferLinePayload>;
                };
                update: {
                    args: Prisma.CustodyTransferLineUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustodyTransferLinePayload>;
                };
                deleteMany: {
                    args: Prisma.CustodyTransferLineDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.CustodyTransferLineUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.CustodyTransferLineUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustodyTransferLinePayload>[];
                };
                upsert: {
                    args: Prisma.CustodyTransferLineUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustodyTransferLinePayload>;
                };
                aggregate: {
                    args: Prisma.CustodyTransferLineAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateCustodyTransferLine>;
                };
                groupBy: {
                    args: Prisma.CustodyTransferLineGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CustodyTransferLineGroupByOutputType>[];
                };
                count: {
                    args: Prisma.CustodyTransferLineCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CustodyTransferLineCountAggregateOutputType> | number;
                };
            };
        };
        CustomerProfile: {
            payload: Prisma.$CustomerProfilePayload<ExtArgs>;
            fields: Prisma.CustomerProfileFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.CustomerProfileFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustomerProfilePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.CustomerProfileFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustomerProfilePayload>;
                };
                findFirst: {
                    args: Prisma.CustomerProfileFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustomerProfilePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.CustomerProfileFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustomerProfilePayload>;
                };
                findMany: {
                    args: Prisma.CustomerProfileFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustomerProfilePayload>[];
                };
                create: {
                    args: Prisma.CustomerProfileCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustomerProfilePayload>;
                };
                createMany: {
                    args: Prisma.CustomerProfileCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.CustomerProfileCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustomerProfilePayload>[];
                };
                delete: {
                    args: Prisma.CustomerProfileDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustomerProfilePayload>;
                };
                update: {
                    args: Prisma.CustomerProfileUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustomerProfilePayload>;
                };
                deleteMany: {
                    args: Prisma.CustomerProfileDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.CustomerProfileUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.CustomerProfileUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustomerProfilePayload>[];
                };
                upsert: {
                    args: Prisma.CustomerProfileUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustomerProfilePayload>;
                };
                aggregate: {
                    args: Prisma.CustomerProfileAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateCustomerProfile>;
                };
                groupBy: {
                    args: Prisma.CustomerProfileGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CustomerProfileGroupByOutputType>[];
                };
                count: {
                    args: Prisma.CustomerProfileCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CustomerProfileCountAggregateOutputType> | number;
                };
            };
        };
        Address: {
            payload: Prisma.$AddressPayload<ExtArgs>;
            fields: Prisma.AddressFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.AddressFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AddressPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.AddressFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AddressPayload>;
                };
                findFirst: {
                    args: Prisma.AddressFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AddressPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.AddressFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AddressPayload>;
                };
                findMany: {
                    args: Prisma.AddressFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AddressPayload>[];
                };
                create: {
                    args: Prisma.AddressCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AddressPayload>;
                };
                createMany: {
                    args: Prisma.AddressCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.AddressCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AddressPayload>[];
                };
                delete: {
                    args: Prisma.AddressDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AddressPayload>;
                };
                update: {
                    args: Prisma.AddressUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AddressPayload>;
                };
                deleteMany: {
                    args: Prisma.AddressDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.AddressUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.AddressUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AddressPayload>[];
                };
                upsert: {
                    args: Prisma.AddressUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AddressPayload>;
                };
                aggregate: {
                    args: Prisma.AddressAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateAddress>;
                };
                groupBy: {
                    args: Prisma.AddressGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AddressGroupByOutputType>[];
                };
                count: {
                    args: Prisma.AddressCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AddressCountAggregateOutputType> | number;
                };
            };
        };
        MarketplaceCategory: {
            payload: Prisma.$MarketplaceCategoryPayload<ExtArgs>;
            fields: Prisma.MarketplaceCategoryFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.MarketplaceCategoryFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MarketplaceCategoryPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.MarketplaceCategoryFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MarketplaceCategoryPayload>;
                };
                findFirst: {
                    args: Prisma.MarketplaceCategoryFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MarketplaceCategoryPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.MarketplaceCategoryFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MarketplaceCategoryPayload>;
                };
                findMany: {
                    args: Prisma.MarketplaceCategoryFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MarketplaceCategoryPayload>[];
                };
                create: {
                    args: Prisma.MarketplaceCategoryCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MarketplaceCategoryPayload>;
                };
                createMany: {
                    args: Prisma.MarketplaceCategoryCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.MarketplaceCategoryCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MarketplaceCategoryPayload>[];
                };
                delete: {
                    args: Prisma.MarketplaceCategoryDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MarketplaceCategoryPayload>;
                };
                update: {
                    args: Prisma.MarketplaceCategoryUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MarketplaceCategoryPayload>;
                };
                deleteMany: {
                    args: Prisma.MarketplaceCategoryDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.MarketplaceCategoryUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.MarketplaceCategoryUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MarketplaceCategoryPayload>[];
                };
                upsert: {
                    args: Prisma.MarketplaceCategoryUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MarketplaceCategoryPayload>;
                };
                aggregate: {
                    args: Prisma.MarketplaceCategoryAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateMarketplaceCategory>;
                };
                groupBy: {
                    args: Prisma.MarketplaceCategoryGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MarketplaceCategoryGroupByOutputType>[];
                };
                count: {
                    args: Prisma.MarketplaceCategoryCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MarketplaceCategoryCountAggregateOutputType> | number;
                };
            };
        };
        Listing: {
            payload: Prisma.$ListingPayload<ExtArgs>;
            fields: Prisma.ListingFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ListingFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ListingPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ListingFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ListingPayload>;
                };
                findFirst: {
                    args: Prisma.ListingFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ListingPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ListingFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ListingPayload>;
                };
                findMany: {
                    args: Prisma.ListingFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ListingPayload>[];
                };
                create: {
                    args: Prisma.ListingCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ListingPayload>;
                };
                createMany: {
                    args: Prisma.ListingCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ListingCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ListingPayload>[];
                };
                delete: {
                    args: Prisma.ListingDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ListingPayload>;
                };
                update: {
                    args: Prisma.ListingUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ListingPayload>;
                };
                deleteMany: {
                    args: Prisma.ListingDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ListingUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ListingUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ListingPayload>[];
                };
                upsert: {
                    args: Prisma.ListingUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ListingPayload>;
                };
                aggregate: {
                    args: Prisma.ListingAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateListing>;
                };
                groupBy: {
                    args: Prisma.ListingGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ListingGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ListingCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ListingCountAggregateOutputType> | number;
                };
            };
        };
        Cart: {
            payload: Prisma.$CartPayload<ExtArgs>;
            fields: Prisma.CartFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.CartFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CartPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.CartFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CartPayload>;
                };
                findFirst: {
                    args: Prisma.CartFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CartPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.CartFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CartPayload>;
                };
                findMany: {
                    args: Prisma.CartFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CartPayload>[];
                };
                create: {
                    args: Prisma.CartCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CartPayload>;
                };
                createMany: {
                    args: Prisma.CartCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.CartCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CartPayload>[];
                };
                delete: {
                    args: Prisma.CartDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CartPayload>;
                };
                update: {
                    args: Prisma.CartUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CartPayload>;
                };
                deleteMany: {
                    args: Prisma.CartDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.CartUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.CartUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CartPayload>[];
                };
                upsert: {
                    args: Prisma.CartUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CartPayload>;
                };
                aggregate: {
                    args: Prisma.CartAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateCart>;
                };
                groupBy: {
                    args: Prisma.CartGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CartGroupByOutputType>[];
                };
                count: {
                    args: Prisma.CartCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CartCountAggregateOutputType> | number;
                };
            };
        };
        CartItem: {
            payload: Prisma.$CartItemPayload<ExtArgs>;
            fields: Prisma.CartItemFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.CartItemFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CartItemPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.CartItemFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CartItemPayload>;
                };
                findFirst: {
                    args: Prisma.CartItemFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CartItemPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.CartItemFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CartItemPayload>;
                };
                findMany: {
                    args: Prisma.CartItemFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CartItemPayload>[];
                };
                create: {
                    args: Prisma.CartItemCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CartItemPayload>;
                };
                createMany: {
                    args: Prisma.CartItemCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.CartItemCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CartItemPayload>[];
                };
                delete: {
                    args: Prisma.CartItemDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CartItemPayload>;
                };
                update: {
                    args: Prisma.CartItemUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CartItemPayload>;
                };
                deleteMany: {
                    args: Prisma.CartItemDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.CartItemUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.CartItemUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CartItemPayload>[];
                };
                upsert: {
                    args: Prisma.CartItemUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CartItemPayload>;
                };
                aggregate: {
                    args: Prisma.CartItemAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateCartItem>;
                };
                groupBy: {
                    args: Prisma.CartItemGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CartItemGroupByOutputType>[];
                };
                count: {
                    args: Prisma.CartItemCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CartItemCountAggregateOutputType> | number;
                };
            };
        };
        Order: {
            payload: Prisma.$OrderPayload<ExtArgs>;
            fields: Prisma.OrderFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.OrderFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.OrderFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderPayload>;
                };
                findFirst: {
                    args: Prisma.OrderFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.OrderFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderPayload>;
                };
                findMany: {
                    args: Prisma.OrderFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderPayload>[];
                };
                create: {
                    args: Prisma.OrderCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderPayload>;
                };
                createMany: {
                    args: Prisma.OrderCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.OrderCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderPayload>[];
                };
                delete: {
                    args: Prisma.OrderDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderPayload>;
                };
                update: {
                    args: Prisma.OrderUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderPayload>;
                };
                deleteMany: {
                    args: Prisma.OrderDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.OrderUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.OrderUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderPayload>[];
                };
                upsert: {
                    args: Prisma.OrderUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderPayload>;
                };
                aggregate: {
                    args: Prisma.OrderAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateOrder>;
                };
                groupBy: {
                    args: Prisma.OrderGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.OrderGroupByOutputType>[];
                };
                count: {
                    args: Prisma.OrderCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.OrderCountAggregateOutputType> | number;
                };
            };
        };
        OrderLine: {
            payload: Prisma.$OrderLinePayload<ExtArgs>;
            fields: Prisma.OrderLineFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.OrderLineFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderLinePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.OrderLineFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderLinePayload>;
                };
                findFirst: {
                    args: Prisma.OrderLineFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderLinePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.OrderLineFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderLinePayload>;
                };
                findMany: {
                    args: Prisma.OrderLineFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderLinePayload>[];
                };
                create: {
                    args: Prisma.OrderLineCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderLinePayload>;
                };
                createMany: {
                    args: Prisma.OrderLineCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.OrderLineCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderLinePayload>[];
                };
                delete: {
                    args: Prisma.OrderLineDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderLinePayload>;
                };
                update: {
                    args: Prisma.OrderLineUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderLinePayload>;
                };
                deleteMany: {
                    args: Prisma.OrderLineDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.OrderLineUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.OrderLineUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderLinePayload>[];
                };
                upsert: {
                    args: Prisma.OrderLineUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderLinePayload>;
                };
                aggregate: {
                    args: Prisma.OrderLineAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateOrderLine>;
                };
                groupBy: {
                    args: Prisma.OrderLineGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.OrderLineGroupByOutputType>[];
                };
                count: {
                    args: Prisma.OrderLineCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.OrderLineCountAggregateOutputType> | number;
                };
            };
        };
        WishlistItem: {
            payload: Prisma.$WishlistItemPayload<ExtArgs>;
            fields: Prisma.WishlistItemFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.WishlistItemFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WishlistItemPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.WishlistItemFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WishlistItemPayload>;
                };
                findFirst: {
                    args: Prisma.WishlistItemFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WishlistItemPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.WishlistItemFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WishlistItemPayload>;
                };
                findMany: {
                    args: Prisma.WishlistItemFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WishlistItemPayload>[];
                };
                create: {
                    args: Prisma.WishlistItemCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WishlistItemPayload>;
                };
                createMany: {
                    args: Prisma.WishlistItemCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.WishlistItemCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WishlistItemPayload>[];
                };
                delete: {
                    args: Prisma.WishlistItemDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WishlistItemPayload>;
                };
                update: {
                    args: Prisma.WishlistItemUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WishlistItemPayload>;
                };
                deleteMany: {
                    args: Prisma.WishlistItemDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.WishlistItemUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.WishlistItemUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WishlistItemPayload>[];
                };
                upsert: {
                    args: Prisma.WishlistItemUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WishlistItemPayload>;
                };
                aggregate: {
                    args: Prisma.WishlistItemAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateWishlistItem>;
                };
                groupBy: {
                    args: Prisma.WishlistItemGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WishlistItemGroupByOutputType>[];
                };
                count: {
                    args: Prisma.WishlistItemCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WishlistItemCountAggregateOutputType> | number;
                };
            };
        };
        ListingReview: {
            payload: Prisma.$ListingReviewPayload<ExtArgs>;
            fields: Prisma.ListingReviewFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ListingReviewFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ListingReviewPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ListingReviewFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ListingReviewPayload>;
                };
                findFirst: {
                    args: Prisma.ListingReviewFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ListingReviewPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ListingReviewFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ListingReviewPayload>;
                };
                findMany: {
                    args: Prisma.ListingReviewFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ListingReviewPayload>[];
                };
                create: {
                    args: Prisma.ListingReviewCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ListingReviewPayload>;
                };
                createMany: {
                    args: Prisma.ListingReviewCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ListingReviewCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ListingReviewPayload>[];
                };
                delete: {
                    args: Prisma.ListingReviewDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ListingReviewPayload>;
                };
                update: {
                    args: Prisma.ListingReviewUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ListingReviewPayload>;
                };
                deleteMany: {
                    args: Prisma.ListingReviewDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ListingReviewUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ListingReviewUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ListingReviewPayload>[];
                };
                upsert: {
                    args: Prisma.ListingReviewUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ListingReviewPayload>;
                };
                aggregate: {
                    args: Prisma.ListingReviewAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateListingReview>;
                };
                groupBy: {
                    args: Prisma.ListingReviewGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ListingReviewGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ListingReviewCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ListingReviewCountAggregateOutputType> | number;
                };
            };
        };
        Coupon: {
            payload: Prisma.$CouponPayload<ExtArgs>;
            fields: Prisma.CouponFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.CouponFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CouponPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.CouponFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CouponPayload>;
                };
                findFirst: {
                    args: Prisma.CouponFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CouponPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.CouponFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CouponPayload>;
                };
                findMany: {
                    args: Prisma.CouponFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CouponPayload>[];
                };
                create: {
                    args: Prisma.CouponCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CouponPayload>;
                };
                createMany: {
                    args: Prisma.CouponCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.CouponCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CouponPayload>[];
                };
                delete: {
                    args: Prisma.CouponDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CouponPayload>;
                };
                update: {
                    args: Prisma.CouponUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CouponPayload>;
                };
                deleteMany: {
                    args: Prisma.CouponDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.CouponUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.CouponUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CouponPayload>[];
                };
                upsert: {
                    args: Prisma.CouponUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CouponPayload>;
                };
                aggregate: {
                    args: Prisma.CouponAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateCoupon>;
                };
                groupBy: {
                    args: Prisma.CouponGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CouponGroupByOutputType>[];
                };
                count: {
                    args: Prisma.CouponCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CouponCountAggregateOutputType> | number;
                };
            };
        };
        Payment: {
            payload: Prisma.$PaymentPayload<ExtArgs>;
            fields: Prisma.PaymentFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PaymentFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PaymentFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentPayload>;
                };
                findFirst: {
                    args: Prisma.PaymentFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PaymentFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentPayload>;
                };
                findMany: {
                    args: Prisma.PaymentFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentPayload>[];
                };
                create: {
                    args: Prisma.PaymentCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentPayload>;
                };
                createMany: {
                    args: Prisma.PaymentCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PaymentCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentPayload>[];
                };
                delete: {
                    args: Prisma.PaymentDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentPayload>;
                };
                update: {
                    args: Prisma.PaymentUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentPayload>;
                };
                deleteMany: {
                    args: Prisma.PaymentDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PaymentUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PaymentUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentPayload>[];
                };
                upsert: {
                    args: Prisma.PaymentUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentPayload>;
                };
                aggregate: {
                    args: Prisma.PaymentAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePayment>;
                };
                groupBy: {
                    args: Prisma.PaymentGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PaymentGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PaymentCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PaymentCountAggregateOutputType> | number;
                };
            };
        };
        Notification: {
            payload: Prisma.$NotificationPayload<ExtArgs>;
            fields: Prisma.NotificationFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.NotificationFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.NotificationFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>;
                };
                findFirst: {
                    args: Prisma.NotificationFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.NotificationFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>;
                };
                findMany: {
                    args: Prisma.NotificationFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>[];
                };
                create: {
                    args: Prisma.NotificationCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>;
                };
                createMany: {
                    args: Prisma.NotificationCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.NotificationCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>[];
                };
                delete: {
                    args: Prisma.NotificationDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>;
                };
                update: {
                    args: Prisma.NotificationUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>;
                };
                deleteMany: {
                    args: Prisma.NotificationDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.NotificationUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.NotificationUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>[];
                };
                upsert: {
                    args: Prisma.NotificationUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>;
                };
                aggregate: {
                    args: Prisma.NotificationAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateNotification>;
                };
                groupBy: {
                    args: Prisma.NotificationGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.NotificationGroupByOutputType>[];
                };
                count: {
                    args: Prisma.NotificationCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.NotificationCountAggregateOutputType> | number;
                };
            };
        };
        WorkflowDefinition: {
            payload: Prisma.$WorkflowDefinitionPayload<ExtArgs>;
            fields: Prisma.WorkflowDefinitionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.WorkflowDefinitionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowDefinitionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.WorkflowDefinitionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowDefinitionPayload>;
                };
                findFirst: {
                    args: Prisma.WorkflowDefinitionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowDefinitionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.WorkflowDefinitionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowDefinitionPayload>;
                };
                findMany: {
                    args: Prisma.WorkflowDefinitionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowDefinitionPayload>[];
                };
                create: {
                    args: Prisma.WorkflowDefinitionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowDefinitionPayload>;
                };
                createMany: {
                    args: Prisma.WorkflowDefinitionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.WorkflowDefinitionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowDefinitionPayload>[];
                };
                delete: {
                    args: Prisma.WorkflowDefinitionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowDefinitionPayload>;
                };
                update: {
                    args: Prisma.WorkflowDefinitionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowDefinitionPayload>;
                };
                deleteMany: {
                    args: Prisma.WorkflowDefinitionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.WorkflowDefinitionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.WorkflowDefinitionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowDefinitionPayload>[];
                };
                upsert: {
                    args: Prisma.WorkflowDefinitionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowDefinitionPayload>;
                };
                aggregate: {
                    args: Prisma.WorkflowDefinitionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateWorkflowDefinition>;
                };
                groupBy: {
                    args: Prisma.WorkflowDefinitionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WorkflowDefinitionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.WorkflowDefinitionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WorkflowDefinitionCountAggregateOutputType> | number;
                };
            };
        };
        WorkflowStepDefinition: {
            payload: Prisma.$WorkflowStepDefinitionPayload<ExtArgs>;
            fields: Prisma.WorkflowStepDefinitionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.WorkflowStepDefinitionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowStepDefinitionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.WorkflowStepDefinitionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowStepDefinitionPayload>;
                };
                findFirst: {
                    args: Prisma.WorkflowStepDefinitionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowStepDefinitionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.WorkflowStepDefinitionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowStepDefinitionPayload>;
                };
                findMany: {
                    args: Prisma.WorkflowStepDefinitionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowStepDefinitionPayload>[];
                };
                create: {
                    args: Prisma.WorkflowStepDefinitionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowStepDefinitionPayload>;
                };
                createMany: {
                    args: Prisma.WorkflowStepDefinitionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.WorkflowStepDefinitionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowStepDefinitionPayload>[];
                };
                delete: {
                    args: Prisma.WorkflowStepDefinitionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowStepDefinitionPayload>;
                };
                update: {
                    args: Prisma.WorkflowStepDefinitionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowStepDefinitionPayload>;
                };
                deleteMany: {
                    args: Prisma.WorkflowStepDefinitionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.WorkflowStepDefinitionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.WorkflowStepDefinitionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowStepDefinitionPayload>[];
                };
                upsert: {
                    args: Prisma.WorkflowStepDefinitionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowStepDefinitionPayload>;
                };
                aggregate: {
                    args: Prisma.WorkflowStepDefinitionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateWorkflowStepDefinition>;
                };
                groupBy: {
                    args: Prisma.WorkflowStepDefinitionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WorkflowStepDefinitionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.WorkflowStepDefinitionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WorkflowStepDefinitionCountAggregateOutputType> | number;
                };
            };
        };
        WorkflowInstance: {
            payload: Prisma.$WorkflowInstancePayload<ExtArgs>;
            fields: Prisma.WorkflowInstanceFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.WorkflowInstanceFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowInstancePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.WorkflowInstanceFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowInstancePayload>;
                };
                findFirst: {
                    args: Prisma.WorkflowInstanceFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowInstancePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.WorkflowInstanceFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowInstancePayload>;
                };
                findMany: {
                    args: Prisma.WorkflowInstanceFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowInstancePayload>[];
                };
                create: {
                    args: Prisma.WorkflowInstanceCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowInstancePayload>;
                };
                createMany: {
                    args: Prisma.WorkflowInstanceCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.WorkflowInstanceCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowInstancePayload>[];
                };
                delete: {
                    args: Prisma.WorkflowInstanceDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowInstancePayload>;
                };
                update: {
                    args: Prisma.WorkflowInstanceUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowInstancePayload>;
                };
                deleteMany: {
                    args: Prisma.WorkflowInstanceDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.WorkflowInstanceUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.WorkflowInstanceUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowInstancePayload>[];
                };
                upsert: {
                    args: Prisma.WorkflowInstanceUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowInstancePayload>;
                };
                aggregate: {
                    args: Prisma.WorkflowInstanceAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateWorkflowInstance>;
                };
                groupBy: {
                    args: Prisma.WorkflowInstanceGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WorkflowInstanceGroupByOutputType>[];
                };
                count: {
                    args: Prisma.WorkflowInstanceCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WorkflowInstanceCountAggregateOutputType> | number;
                };
            };
        };
        WorkflowAction: {
            payload: Prisma.$WorkflowActionPayload<ExtArgs>;
            fields: Prisma.WorkflowActionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.WorkflowActionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowActionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.WorkflowActionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowActionPayload>;
                };
                findFirst: {
                    args: Prisma.WorkflowActionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowActionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.WorkflowActionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowActionPayload>;
                };
                findMany: {
                    args: Prisma.WorkflowActionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowActionPayload>[];
                };
                create: {
                    args: Prisma.WorkflowActionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowActionPayload>;
                };
                createMany: {
                    args: Prisma.WorkflowActionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.WorkflowActionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowActionPayload>[];
                };
                delete: {
                    args: Prisma.WorkflowActionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowActionPayload>;
                };
                update: {
                    args: Prisma.WorkflowActionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowActionPayload>;
                };
                deleteMany: {
                    args: Prisma.WorkflowActionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.WorkflowActionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.WorkflowActionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowActionPayload>[];
                };
                upsert: {
                    args: Prisma.WorkflowActionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowActionPayload>;
                };
                aggregate: {
                    args: Prisma.WorkflowActionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateWorkflowAction>;
                };
                groupBy: {
                    args: Prisma.WorkflowActionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WorkflowActionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.WorkflowActionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WorkflowActionCountAggregateOutputType> | number;
                };
            };
        };
    };
} & {
    other: {
        payload: any;
        operations: {
            $executeRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $executeRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
            $queryRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $queryRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
        };
    };
};
/**
 * Enums
 */
export declare const TransactionIsolationLevel: {
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly email: "email";
    readonly password: "password";
    readonly firstName: "firstName";
    readonly lastName: "lastName";
    readonly phoneNumber: "phoneNumber";
    readonly isActive: "isActive";
    readonly status: "status";
    readonly emailVerifiedAt: "emailVerifiedAt";
    readonly deletedAt: "deletedAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const SessionScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly deviceId: "deviceId";
    readonly ipAddress: "ipAddress";
    readonly userAgent: "userAgent";
    readonly expiresAt: "expiresAt";
    readonly revokedAt: "revokedAt";
    readonly createdAt: "createdAt";
};
export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum];
export declare const RefreshTokenScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly sessionId: "sessionId";
    readonly tokenHash: "tokenHash";
    readonly familyId: "familyId";
    readonly expiresAt: "expiresAt";
    readonly revokedAt: "revokedAt";
    readonly replacedByToken: "replacedByToken";
    readonly createdAt: "createdAt";
};
export type RefreshTokenScalarFieldEnum = (typeof RefreshTokenScalarFieldEnum)[keyof typeof RefreshTokenScalarFieldEnum];
export declare const DeviceScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly name: "name";
    readonly fingerprint: "fingerprint";
    readonly lastSeenAt: "lastSeenAt";
    readonly createdAt: "createdAt";
};
export type DeviceScalarFieldEnum = (typeof DeviceScalarFieldEnum)[keyof typeof DeviceScalarFieldEnum];
export declare const LoginHistoryScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly ipAddress: "ipAddress";
    readonly userAgent: "userAgent";
    readonly success: "success";
    readonly reason: "reason";
    readonly createdAt: "createdAt";
};
export type LoginHistoryScalarFieldEnum = (typeof LoginHistoryScalarFieldEnum)[keyof typeof LoginHistoryScalarFieldEnum];
export declare const TwoFactorSecretScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly secret: "secret";
    readonly enabled: "enabled";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type TwoFactorSecretScalarFieldEnum = (typeof TwoFactorSecretScalarFieldEnum)[keyof typeof TwoFactorSecretScalarFieldEnum];
export declare const EmailVerificationTokenScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly tokenHash: "tokenHash";
    readonly expiresAt: "expiresAt";
    readonly usedAt: "usedAt";
    readonly createdAt: "createdAt";
};
export type EmailVerificationTokenScalarFieldEnum = (typeof EmailVerificationTokenScalarFieldEnum)[keyof typeof EmailVerificationTokenScalarFieldEnum];
export declare const PasswordResetTokenScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly tokenHash: "tokenHash";
    readonly expiresAt: "expiresAt";
    readonly usedAt: "usedAt";
    readonly createdAt: "createdAt";
};
export type PasswordResetTokenScalarFieldEnum = (typeof PasswordResetTokenScalarFieldEnum)[keyof typeof PasswordResetTokenScalarFieldEnum];
export declare const PermissionScalarFieldEnum: {
    readonly id: "id";
    readonly key: "key";
    readonly description: "description";
    readonly group: "group";
    readonly createdAt: "createdAt";
};
export type PermissionScalarFieldEnum = (typeof PermissionScalarFieldEnum)[keyof typeof PermissionScalarFieldEnum];
export declare const PlatformRoleScalarFieldEnum: {
    readonly id: "id";
    readonly key: "key";
    readonly name: "name";
    readonly description: "description";
    readonly createdAt: "createdAt";
};
export type PlatformRoleScalarFieldEnum = (typeof PlatformRoleScalarFieldEnum)[keyof typeof PlatformRoleScalarFieldEnum];
export declare const PlatformUserRoleScalarFieldEnum: {
    readonly userId: "userId";
    readonly roleId: "roleId";
    readonly assignedAt: "assignedAt";
};
export type PlatformUserRoleScalarFieldEnum = (typeof PlatformUserRoleScalarFieldEnum)[keyof typeof PlatformUserRoleScalarFieldEnum];
export declare const OrganizationTypeScalarFieldEnum: {
    readonly id: "id";
    readonly key: "key";
    readonly name: "name";
    readonly description: "description";
    readonly createdAt: "createdAt";
};
export type OrganizationTypeScalarFieldEnum = (typeof OrganizationTypeScalarFieldEnum)[keyof typeof OrganizationTypeScalarFieldEnum];
export declare const OrganizationScalarFieldEnum: {
    readonly id: "id";
    readonly typeId: "typeId";
    readonly name: "name";
    readonly slug: "slug";
    readonly status: "status";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly deletedAt: "deletedAt";
};
export type OrganizationScalarFieldEnum = (typeof OrganizationScalarFieldEnum)[keyof typeof OrganizationScalarFieldEnum];
export declare const OrganizationProfileScalarFieldEnum: {
    readonly id: "id";
    readonly organizationId: "organizationId";
    readonly companyEmail: "companyEmail";
    readonly companyPhone: "companyPhone";
    readonly website: "website";
    readonly address: "address";
    readonly city: "city";
    readonly state: "state";
    readonly country: "country";
    readonly postalCode: "postalCode";
    readonly licenseNumber: "licenseNumber";
    readonly registrationNumber: "registrationNumber";
    readonly taxId: "taxId";
    readonly nafdacNumber: "nafdacNumber";
    readonly sonCertification: "sonCertification";
    readonly supportingDocuments: "supportingDocuments";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type OrganizationProfileScalarFieldEnum = (typeof OrganizationProfileScalarFieldEnum)[keyof typeof OrganizationProfileScalarFieldEnum];
export declare const BranchScalarFieldEnum: {
    readonly id: "id";
    readonly organizationId: "organizationId";
    readonly name: "name";
    readonly code: "code";
    readonly address: "address";
    readonly city: "city";
    readonly state: "state";
    readonly country: "country";
    readonly status: "status";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly deletedAt: "deletedAt";
};
export type BranchScalarFieldEnum = (typeof BranchScalarFieldEnum)[keyof typeof BranchScalarFieldEnum];
export declare const OrganizationRoleScalarFieldEnum: {
    readonly id: "id";
    readonly organizationId: "organizationId";
    readonly key: "key";
    readonly name: "name";
    readonly description: "description";
    readonly isSystem: "isSystem";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly deletedAt: "deletedAt";
};
export type OrganizationRoleScalarFieldEnum = (typeof OrganizationRoleScalarFieldEnum)[keyof typeof OrganizationRoleScalarFieldEnum];
export declare const RolePermissionScalarFieldEnum: {
    readonly id: "id";
    readonly permissionId: "permissionId";
    readonly platformRoleId: "platformRoleId";
    readonly organizationRoleId: "organizationRoleId";
};
export type RolePermissionScalarFieldEnum = (typeof RolePermissionScalarFieldEnum)[keyof typeof RolePermissionScalarFieldEnum];
export declare const MembershipScalarFieldEnum: {
    readonly id: "id";
    readonly organizationId: "organizationId";
    readonly userId: "userId";
    readonly status: "status";
    readonly defaultBranchId: "defaultBranchId";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type MembershipScalarFieldEnum = (typeof MembershipScalarFieldEnum)[keyof typeof MembershipScalarFieldEnum];
export declare const MembershipRoleScalarFieldEnum: {
    readonly membershipId: "membershipId";
    readonly roleId: "roleId";
    readonly assignedAt: "assignedAt";
};
export type MembershipRoleScalarFieldEnum = (typeof MembershipRoleScalarFieldEnum)[keyof typeof MembershipRoleScalarFieldEnum];
export declare const OrgRoleTemplateScalarFieldEnum: {
    readonly id: "id";
    readonly key: "key";
    readonly name: "name";
    readonly description: "description";
    readonly createdAt: "createdAt";
};
export type OrgRoleTemplateScalarFieldEnum = (typeof OrgRoleTemplateScalarFieldEnum)[keyof typeof OrgRoleTemplateScalarFieldEnum];
export declare const OrgRoleTemplatePermissionScalarFieldEnum: {
    readonly id: "id";
    readonly templateId: "templateId";
    readonly permissionId: "permissionId";
};
export type OrgRoleTemplatePermissionScalarFieldEnum = (typeof OrgRoleTemplatePermissionScalarFieldEnum)[keyof typeof OrgRoleTemplatePermissionScalarFieldEnum];
export declare const RoleScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
};
export type RoleScalarFieldEnum = (typeof RoleScalarFieldEnum)[keyof typeof RoleScalarFieldEnum];
export declare const UserRoleScalarFieldEnum: {
    readonly userId: "userId";
    readonly roleId: "roleId";
};
export type UserRoleScalarFieldEnum = (typeof UserRoleScalarFieldEnum)[keyof typeof UserRoleScalarFieldEnum];
export declare const ManufacturerScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly companyName: "companyName";
    readonly companyEmail: "companyEmail";
    readonly companyPhone: "companyPhone";
    readonly website: "website";
    readonly address: "address";
    readonly city: "city";
    readonly state: "state";
    readonly country: "country";
    readonly postalCode: "postalCode";
    readonly licenseNumber: "licenseNumber";
    readonly registrationNumber: "registrationNumber";
    readonly taxId: "taxId";
    readonly nafdacNumber: "nafdacNumber";
    readonly sonCertification: "sonCertification";
    readonly businessType: "businessType";
    readonly yearsInBusiness: "yearsInBusiness";
    readonly supportingDocuments: "supportingDocuments";
    readonly verificationStatus: "verificationStatus";
    readonly verificationNotes: "verificationNotes";
    readonly applicationDate: "applicationDate";
    readonly reviewedAt: "reviewedAt";
    readonly reviewedBy: "reviewedBy";
    readonly isVerified: "isVerified";
    readonly verifiedAt: "verifiedAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ManufacturerScalarFieldEnum = (typeof ManufacturerScalarFieldEnum)[keyof typeof ManufacturerScalarFieldEnum];
export declare const ProductScalarFieldEnum: {
    readonly id: "id";
    readonly manufacturerId: "manufacturerId";
    readonly name: "name";
    readonly description: "description";
    readonly category: "category";
    readonly sku: "sku";
    readonly imageUrl: "imageUrl";
    readonly weight: "weight";
    readonly dimensions: "dimensions";
    readonly ingredients: "ingredients";
    readonly batchNumber: "batchNumber";
    readonly manufactureDate: "manufactureDate";
    readonly expiryDate: "expiryDate";
    readonly isActive: "isActive";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ProductScalarFieldEnum = (typeof ProductScalarFieldEnum)[keyof typeof ProductScalarFieldEnum];
export declare const ProductUnitScalarFieldEnum: {
    readonly id: "id";
    readonly productId: "productId";
    readonly manufacturerId: "manufacturerId";
    readonly barcode: "barcode";
    readonly unitNumber: "unitNumber";
    readonly qrCodeData: "qrCodeData";
    readonly signature: "signature";
    readonly status: "status";
    readonly isAuthentic: "isAuthentic";
    readonly firstScannedAt: "firstScannedAt";
    readonly firstScannedBy: "firstScannedBy";
    readonly scannedCount: "scannedCount";
    readonly lastScannedAt: "lastScannedAt";
    readonly currentOwnerId: "currentOwnerId";
    readonly soldAt: "soldAt";
    readonly soldTo: "soldTo";
    readonly lastLatitude: "lastLatitude";
    readonly lastLongitude: "lastLongitude";
    readonly geoAccuracy: "geoAccuracy";
    readonly lastCity: "lastCity";
    readonly lastCountry: "lastCountry";
    readonly reportedCount: "reportedCount";
    readonly isSuspicious: "isSuspicious";
    readonly suspiciousNotes: "suspiciousNotes";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ProductUnitScalarFieldEnum = (typeof ProductUnitScalarFieldEnum)[keyof typeof ProductUnitScalarFieldEnum];
export declare const ProductUnitAuditLogScalarFieldEnum: {
    readonly id: "id";
    readonly productUnitId: "productUnitId";
    readonly userId: "userId";
    readonly ipAddress: "ipAddress";
    readonly userAgent: "userAgent";
    readonly action: "action";
    readonly isFirstScan: "isFirstScan";
    readonly latitude: "latitude";
    readonly longitude: "longitude";
    readonly city: "city";
    readonly country: "country";
    readonly metadata: "metadata";
    readonly notes: "notes";
    readonly oldStatus: "oldStatus";
    readonly newStatus: "newStatus";
    readonly timestamp: "timestamp";
};
export type ProductUnitAuditLogScalarFieldEnum = (typeof ProductUnitAuditLogScalarFieldEnum)[keyof typeof ProductUnitAuditLogScalarFieldEnum];
export declare const AuditLogScalarFieldEnum: {
    readonly id: "id";
    readonly actorUserId: "actorUserId";
    readonly organizationId: "organizationId";
    readonly branchId: "branchId";
    readonly warehouseId: "warehouseId";
    readonly action: "action";
    readonly entityType: "entityType";
    readonly entityId: "entityId";
    readonly oldValueJson: "oldValueJson";
    readonly newValueJson: "newValueJson";
    readonly ipAddress: "ipAddress";
    readonly userAgent: "userAgent";
    readonly city: "city";
    readonly country: "country";
    readonly requestId: "requestId";
    readonly metadataJson: "metadataJson";
    readonly createdAt: "createdAt";
};
export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum];
export declare const MedicineCategoryScalarFieldEnum: {
    readonly id: "id";
    readonly key: "key";
    readonly name: "name";
    readonly parentId: "parentId";
};
export type MedicineCategoryScalarFieldEnum = (typeof MedicineCategoryScalarFieldEnum)[keyof typeof MedicineCategoryScalarFieldEnum];
export declare const DosageFormScalarFieldEnum: {
    readonly id: "id";
    readonly key: "key";
    readonly name: "name";
};
export type DosageFormScalarFieldEnum = (typeof DosageFormScalarFieldEnum)[keyof typeof DosageFormScalarFieldEnum];
export declare const PackagingTypeScalarFieldEnum: {
    readonly id: "id";
    readonly key: "key";
    readonly name: "name";
    readonly rank: "rank";
};
export type PackagingTypeScalarFieldEnum = (typeof PackagingTypeScalarFieldEnum)[keyof typeof PackagingTypeScalarFieldEnum];
export declare const ProductFamilyScalarFieldEnum: {
    readonly id: "id";
    readonly organizationId: "organizationId";
    readonly name: "name";
    readonly description: "description";
    readonly status: "status";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly deletedAt: "deletedAt";
};
export type ProductFamilyScalarFieldEnum = (typeof ProductFamilyScalarFieldEnum)[keyof typeof ProductFamilyScalarFieldEnum];
export declare const BrandScalarFieldEnum: {
    readonly id: "id";
    readonly organizationId: "organizationId";
    readonly familyId: "familyId";
    readonly name: "name";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly deletedAt: "deletedAt";
};
export type BrandScalarFieldEnum = (typeof BrandScalarFieldEnum)[keyof typeof BrandScalarFieldEnum];
export declare const MedicineScalarFieldEnum: {
    readonly id: "id";
    readonly organizationId: "organizationId";
    readonly brandId: "brandId";
    readonly categoryId: "categoryId";
    readonly name: "name";
    readonly description: "description";
    readonly status: "status";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly deletedAt: "deletedAt";
};
export type MedicineScalarFieldEnum = (typeof MedicineScalarFieldEnum)[keyof typeof MedicineScalarFieldEnum];
export declare const VariantScalarFieldEnum: {
    readonly id: "id";
    readonly organizationId: "organizationId";
    readonly medicineId: "medicineId";
    readonly dosageFormId: "dosageFormId";
    readonly name: "name";
    readonly strength: "strength";
    readonly sku: "sku";
    readonly gtin: "gtin";
    readonly color: "color";
    readonly size: "size";
    readonly weight: "weight";
    readonly attributesJson: "attributesJson";
    readonly status: "status";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly deletedAt: "deletedAt";
};
export type VariantScalarFieldEnum = (typeof VariantScalarFieldEnum)[keyof typeof VariantScalarFieldEnum];
export declare const PackageDefinitionScalarFieldEnum: {
    readonly id: "id";
    readonly organizationId: "organizationId";
    readonly variantId: "variantId";
    readonly packagingTypeId: "packagingTypeId";
    readonly name: "name";
    readonly unitsPerPackage: "unitsPerPackage";
    readonly barcodeTemplate: "barcodeTemplate";
    readonly status: "status";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly deletedAt: "deletedAt";
};
export type PackageDefinitionScalarFieldEnum = (typeof PackageDefinitionScalarFieldEnum)[keyof typeof PackageDefinitionScalarFieldEnum];
export declare const BatchScalarFieldEnum: {
    readonly id: "id";
    readonly organizationId: "organizationId";
    readonly packageDefinitionId: "packageDefinitionId";
    readonly batchNumber: "batchNumber";
    readonly lotNumber: "lotNumber";
    readonly manufactureDate: "manufactureDate";
    readonly expiryDate: "expiryDate";
    readonly qaStatus: "qaStatus";
    readonly recallStatus: "recallStatus";
    readonly productionQuantity: "productionQuantity";
    readonly currentQuantity: "currentQuantity";
    readonly certificatesJson: "certificatesJson";
    readonly documentsJson: "documentsJson";
    readonly nafdacRegistration: "nafdacRegistration";
    readonly notes: "notes";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly deletedAt: "deletedAt";
};
export type BatchScalarFieldEnum = (typeof BatchScalarFieldEnum)[keyof typeof BatchScalarFieldEnum];
export declare const WarehouseTypeScalarFieldEnum: {
    readonly id: "id";
    readonly key: "key";
    readonly name: "name";
    readonly description: "description";
};
export type WarehouseTypeScalarFieldEnum = (typeof WarehouseTypeScalarFieldEnum)[keyof typeof WarehouseTypeScalarFieldEnum];
export declare const WarehouseScalarFieldEnum: {
    readonly id: "id";
    readonly organizationId: "organizationId";
    readonly branchId: "branchId";
    readonly typeId: "typeId";
    readonly name: "name";
    readonly code: "code";
    readonly status: "status";
    readonly capacityUnits: "capacityUnits";
    readonly notes: "notes";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly deletedAt: "deletedAt";
};
export type WarehouseScalarFieldEnum = (typeof WarehouseScalarFieldEnum)[keyof typeof WarehouseScalarFieldEnum];
export declare const InventoryPositionScalarFieldEnum: {
    readonly id: "id";
    readonly organizationId: "organizationId";
    readonly branchId: "branchId";
    readonly warehouseId: "warehouseId";
    readonly batchId: "batchId";
    readonly packagingLevel: "packagingLevel";
    readonly available: "available";
    readonly reserved: "reserved";
    readonly damaged: "damaged";
    readonly expired: "expired";
    readonly quarantined: "quarantined";
    readonly returned: "returned";
    readonly inTransit: "inTransit";
    readonly sold: "sold";
    readonly destroyed: "destroyed";
    readonly version: "version";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type InventoryPositionScalarFieldEnum = (typeof InventoryPositionScalarFieldEnum)[keyof typeof InventoryPositionScalarFieldEnum];
export declare const InventoryMovementScalarFieldEnum: {
    readonly id: "id";
    readonly organizationId: "organizationId";
    readonly positionId: "positionId";
    readonly type: "type";
    readonly quantity: "quantity";
    readonly fromState: "fromState";
    readonly toState: "toState";
    readonly reason: "reason";
    readonly actorUserId: "actorUserId";
    readonly referenceType: "referenceType";
    readonly referenceId: "referenceId";
    readonly createdAt: "createdAt";
};
export type InventoryMovementScalarFieldEnum = (typeof InventoryMovementScalarFieldEnum)[keyof typeof InventoryMovementScalarFieldEnum];
export declare const PackagingInstanceScalarFieldEnum: {
    readonly id: "id";
    readonly batchId: "batchId";
    readonly parentId: "parentId";
    readonly level: "level";
    readonly barcode: "barcode";
    readonly serial: "serial";
    readonly createdAt: "createdAt";
};
export type PackagingInstanceScalarFieldEnum = (typeof PackagingInstanceScalarFieldEnum)[keyof typeof PackagingInstanceScalarFieldEnum];
export declare const TrackableUnitScalarFieldEnum: {
    readonly id: "id";
    readonly organizationId: "organizationId";
    readonly batchId: "batchId";
    readonly packageDefinitionId: "packageDefinitionId";
    readonly packagingInstanceId: "packagingInstanceId";
    readonly unitNumber: "unitNumber";
    readonly qrPayload: "qrPayload";
    readonly signature: "signature";
    readonly keyId: "keyId";
    readonly status: "status";
    readonly isAuthentic: "isAuthentic";
    readonly currentOrganizationId: "currentOrganizationId";
    readonly currentWarehouseId: "currentWarehouseId";
    readonly soldToCustomerId: "soldToCustomerId";
    readonly firstScannedAt: "firstScannedAt";
    readonly scannedCount: "scannedCount";
    readonly lastScannedAt: "lastScannedAt";
    readonly isSuspicious: "isSuspicious";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type TrackableUnitScalarFieldEnum = (typeof TrackableUnitScalarFieldEnum)[keyof typeof TrackableUnitScalarFieldEnum];
export declare const ScanEventScalarFieldEnum: {
    readonly id: "id";
    readonly trackableUnitId: "trackableUnitId";
    readonly organizationId: "organizationId";
    readonly userId: "userId";
    readonly result: "result";
    readonly reasonCodes: "reasonCodes";
    readonly isFirstScan: "isFirstScan";
    readonly payloadSnapshot: "payloadSnapshot";
    readonly ipAddress: "ipAddress";
    readonly userAgent: "userAgent";
    readonly latitude: "latitude";
    readonly longitude: "longitude";
    readonly city: "city";
    readonly country: "country";
    readonly metadataJson: "metadataJson";
    readonly createdAt: "createdAt";
};
export type ScanEventScalarFieldEnum = (typeof ScanEventScalarFieldEnum)[keyof typeof ScanEventScalarFieldEnum];
export declare const CustodyTransferScalarFieldEnum: {
    readonly id: "id";
    readonly fromOrganizationId: "fromOrganizationId";
    readonly toOrganizationId: "toOrganizationId";
    readonly fromWarehouseId: "fromWarehouseId";
    readonly toWarehouseId: "toWarehouseId";
    readonly status: "status";
    readonly notes: "notes";
    readonly documentsJson: "documentsJson";
    readonly createdByUserId: "createdByUserId";
    readonly approvedByUserId: "approvedByUserId";
    readonly receivedByUserId: "receivedByUserId";
    readonly rejectedByUserId: "rejectedByUserId";
    readonly rejectReason: "rejectReason";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly submittedAt: "submittedAt";
    readonly approvedAt: "approvedAt";
    readonly shippedAt: "shippedAt";
    readonly receivedAt: "receivedAt";
    readonly rejectedAt: "rejectedAt";
};
export type CustodyTransferScalarFieldEnum = (typeof CustodyTransferScalarFieldEnum)[keyof typeof CustodyTransferScalarFieldEnum];
export declare const CustodyTransferLineScalarFieldEnum: {
    readonly id: "id";
    readonly transferId: "transferId";
    readonly batchId: "batchId";
    readonly packagingLevel: "packagingLevel";
    readonly quantity: "quantity";
};
export type CustodyTransferLineScalarFieldEnum = (typeof CustodyTransferLineScalarFieldEnum)[keyof typeof CustodyTransferLineScalarFieldEnum];
export declare const CustomerProfileScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly displayName: "displayName";
    readonly phone: "phone";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type CustomerProfileScalarFieldEnum = (typeof CustomerProfileScalarFieldEnum)[keyof typeof CustomerProfileScalarFieldEnum];
export declare const AddressScalarFieldEnum: {
    readonly id: "id";
    readonly customerId: "customerId";
    readonly label: "label";
    readonly line1: "line1";
    readonly line2: "line2";
    readonly city: "city";
    readonly state: "state";
    readonly country: "country";
    readonly postalCode: "postalCode";
    readonly isDefault: "isDefault";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type AddressScalarFieldEnum = (typeof AddressScalarFieldEnum)[keyof typeof AddressScalarFieldEnum];
export declare const MarketplaceCategoryScalarFieldEnum: {
    readonly id: "id";
    readonly key: "key";
    readonly name: "name";
    readonly description: "description";
    readonly createdAt: "createdAt";
};
export type MarketplaceCategoryScalarFieldEnum = (typeof MarketplaceCategoryScalarFieldEnum)[keyof typeof MarketplaceCategoryScalarFieldEnum];
export declare const ListingScalarFieldEnum: {
    readonly id: "id";
    readonly organizationId: "organizationId";
    readonly packageDefinitionId: "packageDefinitionId";
    readonly categoryId: "categoryId";
    readonly title: "title";
    readonly description: "description";
    readonly price: "price";
    readonly currency: "currency";
    readonly status: "status";
    readonly stockHint: "stockHint";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly deletedAt: "deletedAt";
    readonly publishedAt: "publishedAt";
};
export type ListingScalarFieldEnum = (typeof ListingScalarFieldEnum)[keyof typeof ListingScalarFieldEnum];
export declare const CartScalarFieldEnum: {
    readonly id: "id";
    readonly customerId: "customerId";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type CartScalarFieldEnum = (typeof CartScalarFieldEnum)[keyof typeof CartScalarFieldEnum];
export declare const CartItemScalarFieldEnum: {
    readonly id: "id";
    readonly cartId: "cartId";
    readonly listingId: "listingId";
    readonly quantity: "quantity";
};
export type CartItemScalarFieldEnum = (typeof CartItemScalarFieldEnum)[keyof typeof CartItemScalarFieldEnum];
export declare const OrderScalarFieldEnum: {
    readonly id: "id";
    readonly customerId: "customerId";
    readonly organizationId: "organizationId";
    readonly status: "status";
    readonly total: "total";
    readonly currency: "currency";
    readonly discountAmount: "discountAmount";
    readonly couponCode: "couponCode";
    readonly shippingAddressJson: "shippingAddressJson";
    readonly trackingCode: "trackingCode";
    readonly trackingStatus: "trackingStatus";
    readonly notes: "notes";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly paidAt: "paidAt";
    readonly confirmedAt: "confirmedAt";
    readonly shippedAt: "shippedAt";
    readonly deliveredAt: "deliveredAt";
    readonly cancelledAt: "cancelledAt";
};
export type OrderScalarFieldEnum = (typeof OrderScalarFieldEnum)[keyof typeof OrderScalarFieldEnum];
export declare const OrderLineScalarFieldEnum: {
    readonly id: "id";
    readonly orderId: "orderId";
    readonly listingId: "listingId";
    readonly titleSnapshot: "titleSnapshot";
    readonly quantity: "quantity";
    readonly unitPrice: "unitPrice";
    readonly currency: "currency";
};
export type OrderLineScalarFieldEnum = (typeof OrderLineScalarFieldEnum)[keyof typeof OrderLineScalarFieldEnum];
export declare const WishlistItemScalarFieldEnum: {
    readonly id: "id";
    readonly customerId: "customerId";
    readonly listingId: "listingId";
    readonly createdAt: "createdAt";
};
export type WishlistItemScalarFieldEnum = (typeof WishlistItemScalarFieldEnum)[keyof typeof WishlistItemScalarFieldEnum];
export declare const ListingReviewScalarFieldEnum: {
    readonly id: "id";
    readonly listingId: "listingId";
    readonly customerId: "customerId";
    readonly rating: "rating";
    readonly comment: "comment";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ListingReviewScalarFieldEnum = (typeof ListingReviewScalarFieldEnum)[keyof typeof ListingReviewScalarFieldEnum];
export declare const CouponScalarFieldEnum: {
    readonly id: "id";
    readonly code: "code";
    readonly percentOff: "percentOff";
    readonly amountOff: "amountOff";
    readonly currency: "currency";
    readonly active: "active";
    readonly minOrderTotal: "minOrderTotal";
    readonly startsAt: "startsAt";
    readonly endsAt: "endsAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type CouponScalarFieldEnum = (typeof CouponScalarFieldEnum)[keyof typeof CouponScalarFieldEnum];
export declare const PaymentScalarFieldEnum: {
    readonly id: "id";
    readonly orderId: "orderId";
    readonly customerId: "customerId";
    readonly organizationId: "organizationId";
    readonly provider: "provider";
    readonly status: "status";
    readonly amount: "amount";
    readonly currency: "currency";
    readonly externalId: "externalId";
    readonly idempotencyKey: "idempotencyKey";
    readonly failureReason: "failureReason";
    readonly metadataJson: "metadataJson";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly paidAt: "paidAt";
};
export type PaymentScalarFieldEnum = (typeof PaymentScalarFieldEnum)[keyof typeof PaymentScalarFieldEnum];
export declare const NotificationScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly channel: "channel";
    readonly type: "type";
    readonly title: "title";
    readonly body: "body";
    readonly dataJson: "dataJson";
    readonly status: "status";
    readonly readAt: "readAt";
    readonly sentAt: "sentAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type NotificationScalarFieldEnum = (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum];
export declare const WorkflowDefinitionScalarFieldEnum: {
    readonly id: "id";
    readonly key: "key";
    readonly name: "name";
    readonly description: "description";
    readonly subjectType: "subjectType";
    readonly isActive: "isActive";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type WorkflowDefinitionScalarFieldEnum = (typeof WorkflowDefinitionScalarFieldEnum)[keyof typeof WorkflowDefinitionScalarFieldEnum];
export declare const WorkflowStepDefinitionScalarFieldEnum: {
    readonly id: "id";
    readonly definitionId: "definitionId";
    readonly stepOrder: "stepOrder";
    readonly name: "name";
    readonly requiredPermissionKey: "requiredPermissionKey";
};
export type WorkflowStepDefinitionScalarFieldEnum = (typeof WorkflowStepDefinitionScalarFieldEnum)[keyof typeof WorkflowStepDefinitionScalarFieldEnum];
export declare const WorkflowInstanceScalarFieldEnum: {
    readonly id: "id";
    readonly definitionId: "definitionId";
    readonly subjectType: "subjectType";
    readonly subjectId: "subjectId";
    readonly organizationId: "organizationId";
    readonly status: "status";
    readonly currentStep: "currentStep";
    readonly startedByUserId: "startedByUserId";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly completedAt: "completedAt";
};
export type WorkflowInstanceScalarFieldEnum = (typeof WorkflowInstanceScalarFieldEnum)[keyof typeof WorkflowInstanceScalarFieldEnum];
export declare const WorkflowActionScalarFieldEnum: {
    readonly id: "id";
    readonly instanceId: "instanceId";
    readonly actorUserId: "actorUserId";
    readonly stepOrder: "stepOrder";
    readonly decision: "decision";
    readonly comment: "comment";
    readonly createdAt: "createdAt";
};
export type WorkflowActionScalarFieldEnum = (typeof WorkflowActionScalarFieldEnum)[keyof typeof WorkflowActionScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
/**
 * Field references
 */
/**
 * Reference to a field of type 'String'
 */
export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>;
/**
 * Reference to a field of type 'Boolean'
 */
export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>;
/**
 * Reference to a field of type 'DateTime'
 */
export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>;
/**
 * Reference to a field of type 'Int'
 */
export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>;
/**
 * Reference to a field of type 'Float'
 */
export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>;
/**
 * Batch Payload for updateMany & deleteMany & createMany
 */
export type BatchPayload = {
    count: number;
};
export declare const defineExtension: runtime.Types.Extensions.ExtendsHook<"define", TypeMapCb, runtime.Types.Extensions.DefaultArgs>;
export type DefaultPrismaClient = PrismaClient;
export type ErrorFormat = 'pretty' | 'colorless' | 'minimal';
export type PrismaClientOptions = ({
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-pg`.
     */
    adapter: runtime.SqlDriverAdapterFactory;
    accelerateUrl?: never;
} | {
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl: string;
    adapter?: never;
}) & {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat;
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     *
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     *
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     *
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[];
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: TransactionIsolationLevel;
    };
    /**
     * Global configuration for omitting model fields by default.
     *
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: GlobalOmitConfig;
};
export type GlobalOmitConfig = {
    user?: Prisma.UserOmit;
    session?: Prisma.SessionOmit;
    refreshToken?: Prisma.RefreshTokenOmit;
    device?: Prisma.DeviceOmit;
    loginHistory?: Prisma.LoginHistoryOmit;
    twoFactorSecret?: Prisma.TwoFactorSecretOmit;
    emailVerificationToken?: Prisma.EmailVerificationTokenOmit;
    passwordResetToken?: Prisma.PasswordResetTokenOmit;
    permission?: Prisma.PermissionOmit;
    platformRole?: Prisma.PlatformRoleOmit;
    platformUserRole?: Prisma.PlatformUserRoleOmit;
    organizationType?: Prisma.OrganizationTypeOmit;
    organization?: Prisma.OrganizationOmit;
    organizationProfile?: Prisma.OrganizationProfileOmit;
    branch?: Prisma.BranchOmit;
    organizationRole?: Prisma.OrganizationRoleOmit;
    rolePermission?: Prisma.RolePermissionOmit;
    membership?: Prisma.MembershipOmit;
    membershipRole?: Prisma.MembershipRoleOmit;
    orgRoleTemplate?: Prisma.OrgRoleTemplateOmit;
    orgRoleTemplatePermission?: Prisma.OrgRoleTemplatePermissionOmit;
    role?: Prisma.RoleOmit;
    userRole?: Prisma.UserRoleOmit;
    manufacturer?: Prisma.ManufacturerOmit;
    product?: Prisma.ProductOmit;
    productUnit?: Prisma.ProductUnitOmit;
    productUnitAuditLog?: Prisma.ProductUnitAuditLogOmit;
    auditLog?: Prisma.AuditLogOmit;
    medicineCategory?: Prisma.MedicineCategoryOmit;
    dosageForm?: Prisma.DosageFormOmit;
    packagingType?: Prisma.PackagingTypeOmit;
    productFamily?: Prisma.ProductFamilyOmit;
    brand?: Prisma.BrandOmit;
    medicine?: Prisma.MedicineOmit;
    variant?: Prisma.VariantOmit;
    packageDefinition?: Prisma.PackageDefinitionOmit;
    batch?: Prisma.BatchOmit;
    warehouseType?: Prisma.WarehouseTypeOmit;
    warehouse?: Prisma.WarehouseOmit;
    inventoryPosition?: Prisma.InventoryPositionOmit;
    inventoryMovement?: Prisma.InventoryMovementOmit;
    packagingInstance?: Prisma.PackagingInstanceOmit;
    trackableUnit?: Prisma.TrackableUnitOmit;
    scanEvent?: Prisma.ScanEventOmit;
    custodyTransfer?: Prisma.CustodyTransferOmit;
    custodyTransferLine?: Prisma.CustodyTransferLineOmit;
    customerProfile?: Prisma.CustomerProfileOmit;
    address?: Prisma.AddressOmit;
    marketplaceCategory?: Prisma.MarketplaceCategoryOmit;
    listing?: Prisma.ListingOmit;
    cart?: Prisma.CartOmit;
    cartItem?: Prisma.CartItemOmit;
    order?: Prisma.OrderOmit;
    orderLine?: Prisma.OrderLineOmit;
    wishlistItem?: Prisma.WishlistItemOmit;
    listingReview?: Prisma.ListingReviewOmit;
    coupon?: Prisma.CouponOmit;
    payment?: Prisma.PaymentOmit;
    notification?: Prisma.NotificationOmit;
    workflowDefinition?: Prisma.WorkflowDefinitionOmit;
    workflowStepDefinition?: Prisma.WorkflowStepDefinitionOmit;
    workflowInstance?: Prisma.WorkflowInstanceOmit;
    workflowAction?: Prisma.WorkflowActionOmit;
};
export type LogLevel = 'info' | 'query' | 'warn' | 'error';
export type LogDefinition = {
    level: LogLevel;
    emit: 'stdout' | 'event';
};
export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;
export type GetLogType<T> = CheckIsLogLevel<T extends LogDefinition ? T['level'] : T>;
export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition> ? GetLogType<T[number]> : never;
export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
};
export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
};
export type PrismaAction = 'findUnique' | 'findUniqueOrThrow' | 'findMany' | 'findFirst' | 'findFirstOrThrow' | 'create' | 'createMany' | 'createManyAndReturn' | 'update' | 'updateMany' | 'updateManyAndReturn' | 'upsert' | 'delete' | 'deleteMany' | 'executeRaw' | 'queryRaw' | 'aggregate' | 'count' | 'runCommandRaw' | 'findRaw' | 'groupBy';
/**
 * `PrismaClient` proxy available in interactive transactions.
 */
export type TransactionClient = Omit<DefaultPrismaClient, runtime.ITXClientDenyList>;
//# sourceMappingURL=prismaNamespace.d.ts.map