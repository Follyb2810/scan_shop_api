import * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "./prismaNamespace";
export type LogOptions<ClientOptions extends Prisma.PrismaClientOptions> = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never;
export interface PrismaClientConstructor {
    /**
   * ## Prisma Client
   *
   * Type-safe database client for TypeScript
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */
    new <Options extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions, LogOpts extends LogOptions<Options> = LogOptions<Options>, OmitOpts extends Prisma.PrismaClientOptions['omit'] = Options extends {
        omit: infer U;
    } ? U : Prisma.PrismaClientOptions['omit'], ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs>(options: Prisma.Subset<Options, Prisma.PrismaClientOptions>): PrismaClient<LogOpts, OmitOpts, ExtArgs>;
}
/**
 * ## Prisma Client
 *
 * Type-safe database client for TypeScript
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export interface PrismaClient<in LogOpts extends Prisma.LogLevel = never, in out OmitOpts extends Prisma.PrismaClientOptions['omit'] = undefined, in out ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['other'];
    };
    $on<V extends LogOpts>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;
    /**
     * Connect with the database
     */
    $connect(): runtime.Types.Utils.JsPromise<void>;
    /**
     * Disconnect from the database
     */
    $disconnect(): runtime.Types.Utils.JsPromise<void>;
    /**
       * Executes a prepared raw query and returns the number of affected rows.
       * @example
       * ```
       * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
       * ```
       *
       * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
       */
    $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;
    /**
     * Executes a raw query and returns the number of affected rows.
     * Susceptible to SQL injections, see documentation.
     * @example
     * ```
     * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
     * ```
     *
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
     */
    $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;
    /**
     * Performs a prepared raw query and returns the `SELECT` data.
     * @example
     * ```
     * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
     * ```
     *
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
     */
    $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;
    /**
     * Performs a raw query and returns the `SELECT` data.
     * Susceptible to SQL injections, see documentation.
     * @example
     * ```
     * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
     * ```
     *
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
     */
    $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;
    /**
     * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
     * @example
     * ```
     * const [george, bob, alice] = await prisma.$transaction([
     *   prisma.user.create({ data: { name: 'George' } }),
     *   prisma.user.create({ data: { name: 'Bob' } }),
     *   prisma.user.create({ data: { name: 'Alice' } }),
     * ])
     * ```
     *
     * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
     */
    $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: {
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): runtime.Types.Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>;
    $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => runtime.Types.Utils.JsPromise<R>, options?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): runtime.Types.Utils.JsPromise<R>;
    $extends: runtime.Types.Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<OmitOpts>, ExtArgs, runtime.Types.Utils.Call<Prisma.TypeMapCb<OmitOpts>, {
        extArgs: ExtArgs;
    }>>;
    /**
 * `prisma.user`: Exposes CRUD operations for the **User** model.
  * Example usage:
  * ```ts
  * // Fetch zero or more Users
  * const users = await prisma.user.findMany()
  * ```
  */
    get user(): Prisma.UserDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.session`: Exposes CRUD operations for the **Session** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Sessions
      * const sessions = await prisma.session.findMany()
      * ```
      */
    get session(): Prisma.SessionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.refreshToken`: Exposes CRUD operations for the **RefreshToken** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more RefreshTokens
      * const refreshTokens = await prisma.refreshToken.findMany()
      * ```
      */
    get refreshToken(): Prisma.RefreshTokenDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.device`: Exposes CRUD operations for the **Device** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Devices
      * const devices = await prisma.device.findMany()
      * ```
      */
    get device(): Prisma.DeviceDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.loginHistory`: Exposes CRUD operations for the **LoginHistory** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more LoginHistories
      * const loginHistories = await prisma.loginHistory.findMany()
      * ```
      */
    get loginHistory(): Prisma.LoginHistoryDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.twoFactorSecret`: Exposes CRUD operations for the **TwoFactorSecret** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more TwoFactorSecrets
      * const twoFactorSecrets = await prisma.twoFactorSecret.findMany()
      * ```
      */
    get twoFactorSecret(): Prisma.TwoFactorSecretDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.emailVerificationToken`: Exposes CRUD operations for the **EmailVerificationToken** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more EmailVerificationTokens
      * const emailVerificationTokens = await prisma.emailVerificationToken.findMany()
      * ```
      */
    get emailVerificationToken(): Prisma.EmailVerificationTokenDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.passwordResetToken`: Exposes CRUD operations for the **PasswordResetToken** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more PasswordResetTokens
      * const passwordResetTokens = await prisma.passwordResetToken.findMany()
      * ```
      */
    get passwordResetToken(): Prisma.PasswordResetTokenDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.permission`: Exposes CRUD operations for the **Permission** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Permissions
      * const permissions = await prisma.permission.findMany()
      * ```
      */
    get permission(): Prisma.PermissionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.platformRole`: Exposes CRUD operations for the **PlatformRole** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more PlatformRoles
      * const platformRoles = await prisma.platformRole.findMany()
      * ```
      */
    get platformRole(): Prisma.PlatformRoleDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.platformUserRole`: Exposes CRUD operations for the **PlatformUserRole** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more PlatformUserRoles
      * const platformUserRoles = await prisma.platformUserRole.findMany()
      * ```
      */
    get platformUserRole(): Prisma.PlatformUserRoleDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.organizationType`: Exposes CRUD operations for the **OrganizationType** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more OrganizationTypes
      * const organizationTypes = await prisma.organizationType.findMany()
      * ```
      */
    get organizationType(): Prisma.OrganizationTypeDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.organization`: Exposes CRUD operations for the **Organization** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Organizations
      * const organizations = await prisma.organization.findMany()
      * ```
      */
    get organization(): Prisma.OrganizationDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.organizationProfile`: Exposes CRUD operations for the **OrganizationProfile** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more OrganizationProfiles
      * const organizationProfiles = await prisma.organizationProfile.findMany()
      * ```
      */
    get organizationProfile(): Prisma.OrganizationProfileDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.branch`: Exposes CRUD operations for the **Branch** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Branches
      * const branches = await prisma.branch.findMany()
      * ```
      */
    get branch(): Prisma.BranchDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.organizationRole`: Exposes CRUD operations for the **OrganizationRole** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more OrganizationRoles
      * const organizationRoles = await prisma.organizationRole.findMany()
      * ```
      */
    get organizationRole(): Prisma.OrganizationRoleDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.rolePermission`: Exposes CRUD operations for the **RolePermission** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more RolePermissions
      * const rolePermissions = await prisma.rolePermission.findMany()
      * ```
      */
    get rolePermission(): Prisma.RolePermissionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.membership`: Exposes CRUD operations for the **Membership** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Memberships
      * const memberships = await prisma.membership.findMany()
      * ```
      */
    get membership(): Prisma.MembershipDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.membershipRole`: Exposes CRUD operations for the **MembershipRole** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more MembershipRoles
      * const membershipRoles = await prisma.membershipRole.findMany()
      * ```
      */
    get membershipRole(): Prisma.MembershipRoleDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.orgRoleTemplate`: Exposes CRUD operations for the **OrgRoleTemplate** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more OrgRoleTemplates
      * const orgRoleTemplates = await prisma.orgRoleTemplate.findMany()
      * ```
      */
    get orgRoleTemplate(): Prisma.OrgRoleTemplateDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.orgRoleTemplatePermission`: Exposes CRUD operations for the **OrgRoleTemplatePermission** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more OrgRoleTemplatePermissions
      * const orgRoleTemplatePermissions = await prisma.orgRoleTemplatePermission.findMany()
      * ```
      */
    get orgRoleTemplatePermission(): Prisma.OrgRoleTemplatePermissionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.role`: Exposes CRUD operations for the **Role** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Roles
      * const roles = await prisma.role.findMany()
      * ```
      */
    get role(): Prisma.RoleDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.userRole`: Exposes CRUD operations for the **UserRole** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more UserRoles
      * const userRoles = await prisma.userRole.findMany()
      * ```
      */
    get userRole(): Prisma.UserRoleDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.manufacturer`: Exposes CRUD operations for the **Manufacturer** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Manufacturers
      * const manufacturers = await prisma.manufacturer.findMany()
      * ```
      */
    get manufacturer(): Prisma.ManufacturerDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.product`: Exposes CRUD operations for the **Product** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Products
      * const products = await prisma.product.findMany()
      * ```
      */
    get product(): Prisma.ProductDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.productUnit`: Exposes CRUD operations for the **ProductUnit** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more ProductUnits
      * const productUnits = await prisma.productUnit.findMany()
      * ```
      */
    get productUnit(): Prisma.ProductUnitDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.productUnitAuditLog`: Exposes CRUD operations for the **ProductUnitAuditLog** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more ProductUnitAuditLogs
      * const productUnitAuditLogs = await prisma.productUnitAuditLog.findMany()
      * ```
      */
    get productUnitAuditLog(): Prisma.ProductUnitAuditLogDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.auditLog`: Exposes CRUD operations for the **AuditLog** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more AuditLogs
      * const auditLogs = await prisma.auditLog.findMany()
      * ```
      */
    get auditLog(): Prisma.AuditLogDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.medicineCategory`: Exposes CRUD operations for the **MedicineCategory** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more MedicineCategories
      * const medicineCategories = await prisma.medicineCategory.findMany()
      * ```
      */
    get medicineCategory(): Prisma.MedicineCategoryDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.dosageForm`: Exposes CRUD operations for the **DosageForm** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more DosageForms
      * const dosageForms = await prisma.dosageForm.findMany()
      * ```
      */
    get dosageForm(): Prisma.DosageFormDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.packagingType`: Exposes CRUD operations for the **PackagingType** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more PackagingTypes
      * const packagingTypes = await prisma.packagingType.findMany()
      * ```
      */
    get packagingType(): Prisma.PackagingTypeDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.productFamily`: Exposes CRUD operations for the **ProductFamily** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more ProductFamilies
      * const productFamilies = await prisma.productFamily.findMany()
      * ```
      */
    get productFamily(): Prisma.ProductFamilyDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.brand`: Exposes CRUD operations for the **Brand** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Brands
      * const brands = await prisma.brand.findMany()
      * ```
      */
    get brand(): Prisma.BrandDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.medicine`: Exposes CRUD operations for the **Medicine** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Medicines
      * const medicines = await prisma.medicine.findMany()
      * ```
      */
    get medicine(): Prisma.MedicineDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.variant`: Exposes CRUD operations for the **Variant** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Variants
      * const variants = await prisma.variant.findMany()
      * ```
      */
    get variant(): Prisma.VariantDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.packageDefinition`: Exposes CRUD operations for the **PackageDefinition** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more PackageDefinitions
      * const packageDefinitions = await prisma.packageDefinition.findMany()
      * ```
      */
    get packageDefinition(): Prisma.PackageDefinitionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.batch`: Exposes CRUD operations for the **Batch** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Batches
      * const batches = await prisma.batch.findMany()
      * ```
      */
    get batch(): Prisma.BatchDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.warehouseType`: Exposes CRUD operations for the **WarehouseType** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more WarehouseTypes
      * const warehouseTypes = await prisma.warehouseType.findMany()
      * ```
      */
    get warehouseType(): Prisma.WarehouseTypeDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.warehouse`: Exposes CRUD operations for the **Warehouse** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Warehouses
      * const warehouses = await prisma.warehouse.findMany()
      * ```
      */
    get warehouse(): Prisma.WarehouseDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.inventoryPosition`: Exposes CRUD operations for the **InventoryPosition** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more InventoryPositions
      * const inventoryPositions = await prisma.inventoryPosition.findMany()
      * ```
      */
    get inventoryPosition(): Prisma.InventoryPositionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.inventoryMovement`: Exposes CRUD operations for the **InventoryMovement** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more InventoryMovements
      * const inventoryMovements = await prisma.inventoryMovement.findMany()
      * ```
      */
    get inventoryMovement(): Prisma.InventoryMovementDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.packagingInstance`: Exposes CRUD operations for the **PackagingInstance** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more PackagingInstances
      * const packagingInstances = await prisma.packagingInstance.findMany()
      * ```
      */
    get packagingInstance(): Prisma.PackagingInstanceDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.trackableUnit`: Exposes CRUD operations for the **TrackableUnit** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more TrackableUnits
      * const trackableUnits = await prisma.trackableUnit.findMany()
      * ```
      */
    get trackableUnit(): Prisma.TrackableUnitDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.scanEvent`: Exposes CRUD operations for the **ScanEvent** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more ScanEvents
      * const scanEvents = await prisma.scanEvent.findMany()
      * ```
      */
    get scanEvent(): Prisma.ScanEventDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.custodyTransfer`: Exposes CRUD operations for the **CustodyTransfer** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more CustodyTransfers
      * const custodyTransfers = await prisma.custodyTransfer.findMany()
      * ```
      */
    get custodyTransfer(): Prisma.CustodyTransferDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.custodyTransferLine`: Exposes CRUD operations for the **CustodyTransferLine** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more CustodyTransferLines
      * const custodyTransferLines = await prisma.custodyTransferLine.findMany()
      * ```
      */
    get custodyTransferLine(): Prisma.CustodyTransferLineDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.customerProfile`: Exposes CRUD operations for the **CustomerProfile** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more CustomerProfiles
      * const customerProfiles = await prisma.customerProfile.findMany()
      * ```
      */
    get customerProfile(): Prisma.CustomerProfileDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.address`: Exposes CRUD operations for the **Address** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Addresses
      * const addresses = await prisma.address.findMany()
      * ```
      */
    get address(): Prisma.AddressDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.marketplaceCategory`: Exposes CRUD operations for the **MarketplaceCategory** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more MarketplaceCategories
      * const marketplaceCategories = await prisma.marketplaceCategory.findMany()
      * ```
      */
    get marketplaceCategory(): Prisma.MarketplaceCategoryDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.listing`: Exposes CRUD operations for the **Listing** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Listings
      * const listings = await prisma.listing.findMany()
      * ```
      */
    get listing(): Prisma.ListingDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.cart`: Exposes CRUD operations for the **Cart** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Carts
      * const carts = await prisma.cart.findMany()
      * ```
      */
    get cart(): Prisma.CartDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.cartItem`: Exposes CRUD operations for the **CartItem** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more CartItems
      * const cartItems = await prisma.cartItem.findMany()
      * ```
      */
    get cartItem(): Prisma.CartItemDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.order`: Exposes CRUD operations for the **Order** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Orders
      * const orders = await prisma.order.findMany()
      * ```
      */
    get order(): Prisma.OrderDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.orderLine`: Exposes CRUD operations for the **OrderLine** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more OrderLines
      * const orderLines = await prisma.orderLine.findMany()
      * ```
      */
    get orderLine(): Prisma.OrderLineDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.wishlistItem`: Exposes CRUD operations for the **WishlistItem** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more WishlistItems
      * const wishlistItems = await prisma.wishlistItem.findMany()
      * ```
      */
    get wishlistItem(): Prisma.WishlistItemDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.listingReview`: Exposes CRUD operations for the **ListingReview** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more ListingReviews
      * const listingReviews = await prisma.listingReview.findMany()
      * ```
      */
    get listingReview(): Prisma.ListingReviewDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.coupon`: Exposes CRUD operations for the **Coupon** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Coupons
      * const coupons = await prisma.coupon.findMany()
      * ```
      */
    get coupon(): Prisma.CouponDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.payment`: Exposes CRUD operations for the **Payment** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Payments
      * const payments = await prisma.payment.findMany()
      * ```
      */
    get payment(): Prisma.PaymentDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.notification`: Exposes CRUD operations for the **Notification** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Notifications
      * const notifications = await prisma.notification.findMany()
      * ```
      */
    get notification(): Prisma.NotificationDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.workflowDefinition`: Exposes CRUD operations for the **WorkflowDefinition** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more WorkflowDefinitions
      * const workflowDefinitions = await prisma.workflowDefinition.findMany()
      * ```
      */
    get workflowDefinition(): Prisma.WorkflowDefinitionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.workflowStepDefinition`: Exposes CRUD operations for the **WorkflowStepDefinition** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more WorkflowStepDefinitions
      * const workflowStepDefinitions = await prisma.workflowStepDefinition.findMany()
      * ```
      */
    get workflowStepDefinition(): Prisma.WorkflowStepDefinitionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.workflowInstance`: Exposes CRUD operations for the **WorkflowInstance** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more WorkflowInstances
      * const workflowInstances = await prisma.workflowInstance.findMany()
      * ```
      */
    get workflowInstance(): Prisma.WorkflowInstanceDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.workflowAction`: Exposes CRUD operations for the **WorkflowAction** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more WorkflowActions
      * const workflowActions = await prisma.workflowAction.findMany()
      * ```
      */
    get workflowAction(): Prisma.WorkflowActionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
}
export declare function getPrismaClientClass(): PrismaClientConstructor;
//# sourceMappingURL=class.d.ts.map