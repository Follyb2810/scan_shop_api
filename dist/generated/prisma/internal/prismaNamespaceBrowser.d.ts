import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models';
export type * from './prismaNamespace';
export declare const Decimal: typeof runtime.Decimal;
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
export declare const ModelName: {
    readonly User: "User";
    readonly Role: "Role";
    readonly UserRole: "UserRole";
    readonly Manufacturer: "Manufacturer";
    readonly Product: "Product";
    readonly ProductUnit: "ProductUnit";
    readonly AuditLog: "AuditLog";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
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
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
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
export declare const AuditLogScalarFieldEnum: {
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
export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum];
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
//# sourceMappingURL=prismaNamespaceBrowser.d.ts.map