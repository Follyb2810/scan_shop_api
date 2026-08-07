import * as Prisma from './internal/prismaNamespaceBrowser';
export { Prisma };
export * as $Enums from './enums';
export * from './enums';
/**
 * Model User
 *
 */
export type User = Prisma.UserModel;
/**
 * Model Session
 *
 */
export type Session = Prisma.SessionModel;
/**
 * Model RefreshToken
 *
 */
export type RefreshToken = Prisma.RefreshTokenModel;
/**
 * Model Device
 *
 */
export type Device = Prisma.DeviceModel;
/**
 * Model LoginHistory
 *
 */
export type LoginHistory = Prisma.LoginHistoryModel;
/**
 * Model TwoFactorSecret
 *
 */
export type TwoFactorSecret = Prisma.TwoFactorSecretModel;
/**
 * Model EmailVerificationToken
 *
 */
export type EmailVerificationToken = Prisma.EmailVerificationTokenModel;
/**
 * Model PasswordResetToken
 *
 */
export type PasswordResetToken = Prisma.PasswordResetTokenModel;
/**
 * Model Permission
 *
 */
export type Permission = Prisma.PermissionModel;
/**
 * Model PlatformRole
 *
 */
export type PlatformRole = Prisma.PlatformRoleModel;
/**
 * Model PlatformUserRole
 *
 */
export type PlatformUserRole = Prisma.PlatformUserRoleModel;
/**
 * Model OrganizationType
 * Minimal org for RBAC membership/roles. Step 6 expands types, branches, profile.
 */
export type OrganizationType = Prisma.OrganizationTypeModel;
/**
 * Model Organization
 *
 */
export type Organization = Prisma.OrganizationModel;
/**
 * Model OrganizationProfile
 *
 */
export type OrganizationProfile = Prisma.OrganizationProfileModel;
/**
 * Model Branch
 *
 */
export type Branch = Prisma.BranchModel;
/**
 * Model OrganizationRole
 *
 */
export type OrganizationRole = Prisma.OrganizationRoleModel;
/**
 * Model RolePermission
 *
 */
export type RolePermission = Prisma.RolePermissionModel;
/**
 * Model Membership
 *
 */
export type Membership = Prisma.MembershipModel;
/**
 * Model MembershipRole
 *
 */
export type MembershipRole = Prisma.MembershipRoleModel;
/**
 * Model OrgRoleTemplate
 * Global templates copied onto each new organization (Step 6 / seedOrganizationRoles).
 */
export type OrgRoleTemplate = Prisma.OrgRoleTemplateModel;
/**
 * Model OrgRoleTemplatePermission
 *
 */
export type OrgRoleTemplatePermission = Prisma.OrgRoleTemplatePermissionModel;
/**
 * Model Role
 *
 */
export type Role = Prisma.RoleModel;
/**
 * Model UserRole
 *
 */
export type UserRole = Prisma.UserRoleModel;
/**
 * Model Manufacturer
 *
 */
export type Manufacturer = Prisma.ManufacturerModel;
/**
 * Model Product
 *
 */
export type Product = Prisma.ProductModel;
/**
 * Model ProductUnit
 *
 */
export type ProductUnit = Prisma.ProductUnitModel;
/**
 * Model ProductUnitAuditLog
 * * Legacy unit-scan trail (kept for ENABLE_LEGACY_MODULES).
 */
export type ProductUnitAuditLog = Prisma.ProductUnitAuditLogModel;
/**
 * Model AuditLog
 *
 */
export type AuditLog = Prisma.AuditLogModel;
/**
 * Model MedicineCategory
 *
 */
export type MedicineCategory = Prisma.MedicineCategoryModel;
/**
 * Model DosageForm
 *
 */
export type DosageForm = Prisma.DosageFormModel;
/**
 * Model PackagingType
 *
 */
export type PackagingType = Prisma.PackagingTypeModel;
/**
 * Model ProductFamily
 *
 */
export type ProductFamily = Prisma.ProductFamilyModel;
/**
 * Model Brand
 *
 */
export type Brand = Prisma.BrandModel;
/**
 * Model Medicine
 *
 */
export type Medicine = Prisma.MedicineModel;
/**
 * Model Variant
 *
 */
export type Variant = Prisma.VariantModel;
/**
 * Model PackageDefinition
 *
 */
export type PackageDefinition = Prisma.PackageDefinitionModel;
/**
 * Model Batch
 *
 */
export type Batch = Prisma.BatchModel;
/**
 * Model WarehouseType
 *
 */
export type WarehouseType = Prisma.WarehouseTypeModel;
/**
 * Model Warehouse
 *
 */
export type Warehouse = Prisma.WarehouseModel;
/**
 * Model InventoryPosition
 *
 */
export type InventoryPosition = Prisma.InventoryPositionModel;
/**
 * Model InventoryMovement
 *
 */
export type InventoryMovement = Prisma.InventoryMovementModel;
/**
 * Model PackagingInstance
 *
 */
export type PackagingInstance = Prisma.PackagingInstanceModel;
/**
 * Model TrackableUnit
 *
 */
export type TrackableUnit = Prisma.TrackableUnitModel;
/**
 * Model ScanEvent
 *
 */
export type ScanEvent = Prisma.ScanEventModel;
/**
 * Model CustodyTransfer
 *
 */
export type CustodyTransfer = Prisma.CustodyTransferModel;
/**
 * Model CustodyTransferLine
 *
 */
export type CustodyTransferLine = Prisma.CustodyTransferLineModel;
/**
 * Model CustomerProfile
 *
 */
export type CustomerProfile = Prisma.CustomerProfileModel;
/**
 * Model Address
 *
 */
export type Address = Prisma.AddressModel;
/**
 * Model MarketplaceCategory
 *
 */
export type MarketplaceCategory = Prisma.MarketplaceCategoryModel;
/**
 * Model Listing
 *
 */
export type Listing = Prisma.ListingModel;
/**
 * Model Cart
 *
 */
export type Cart = Prisma.CartModel;
/**
 * Model CartItem
 *
 */
export type CartItem = Prisma.CartItemModel;
/**
 * Model Order
 *
 */
export type Order = Prisma.OrderModel;
/**
 * Model OrderLine
 *
 */
export type OrderLine = Prisma.OrderLineModel;
/**
 * Model WishlistItem
 *
 */
export type WishlistItem = Prisma.WishlistItemModel;
/**
 * Model ListingReview
 *
 */
export type ListingReview = Prisma.ListingReviewModel;
/**
 * Model Coupon
 *
 */
export type Coupon = Prisma.CouponModel;
/**
 * Model Payment
 *
 */
export type Payment = Prisma.PaymentModel;
/**
 * Model Notification
 *
 */
export type Notification = Prisma.NotificationModel;
/**
 * Model WorkflowDefinition
 *
 */
export type WorkflowDefinition = Prisma.WorkflowDefinitionModel;
/**
 * Model WorkflowStepDefinition
 *
 */
export type WorkflowStepDefinition = Prisma.WorkflowStepDefinitionModel;
/**
 * Model WorkflowInstance
 *
 */
export type WorkflowInstance = Prisma.WorkflowInstanceModel;
/**
 * Model WorkflowAction
 *
 */
export type WorkflowAction = Prisma.WorkflowActionModel;
//# sourceMappingURL=browser.d.ts.map