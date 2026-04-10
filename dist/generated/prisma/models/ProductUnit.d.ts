import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model ProductUnit
 *
 */
export type ProductUnitModel = runtime.Types.Result.DefaultSelection<Prisma.$ProductUnitPayload>;
export type AggregateProductUnit = {
    _count: ProductUnitCountAggregateOutputType | null;
    _avg: ProductUnitAvgAggregateOutputType | null;
    _sum: ProductUnitSumAggregateOutputType | null;
    _min: ProductUnitMinAggregateOutputType | null;
    _max: ProductUnitMaxAggregateOutputType | null;
};
export type ProductUnitAvgAggregateOutputType = {
    unitNumber: number | null;
    scannedCount: number | null;
    lastLatitude: number | null;
    lastLongitude: number | null;
    geoAccuracy: number | null;
    reportedCount: number | null;
};
export type ProductUnitSumAggregateOutputType = {
    unitNumber: number | null;
    scannedCount: number | null;
    lastLatitude: number | null;
    lastLongitude: number | null;
    geoAccuracy: number | null;
    reportedCount: number | null;
};
export type ProductUnitMinAggregateOutputType = {
    id: string | null;
    productId: string | null;
    manufacturerId: string | null;
    barcode: string | null;
    unitNumber: number | null;
    qrCodeData: string | null;
    signature: string | null;
    status: string | null;
    isAuthentic: boolean | null;
    firstScannedAt: Date | null;
    firstScannedBy: string | null;
    scannedCount: number | null;
    lastScannedAt: Date | null;
    currentOwnerId: string | null;
    soldAt: Date | null;
    soldTo: string | null;
    lastLatitude: number | null;
    lastLongitude: number | null;
    geoAccuracy: number | null;
    lastCity: string | null;
    lastCountry: string | null;
    reportedCount: number | null;
    isSuspicious: boolean | null;
    suspiciousNotes: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ProductUnitMaxAggregateOutputType = {
    id: string | null;
    productId: string | null;
    manufacturerId: string | null;
    barcode: string | null;
    unitNumber: number | null;
    qrCodeData: string | null;
    signature: string | null;
    status: string | null;
    isAuthentic: boolean | null;
    firstScannedAt: Date | null;
    firstScannedBy: string | null;
    scannedCount: number | null;
    lastScannedAt: Date | null;
    currentOwnerId: string | null;
    soldAt: Date | null;
    soldTo: string | null;
    lastLatitude: number | null;
    lastLongitude: number | null;
    geoAccuracy: number | null;
    lastCity: string | null;
    lastCountry: string | null;
    reportedCount: number | null;
    isSuspicious: boolean | null;
    suspiciousNotes: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ProductUnitCountAggregateOutputType = {
    id: number;
    productId: number;
    manufacturerId: number;
    barcode: number;
    unitNumber: number;
    qrCodeData: number;
    signature: number;
    status: number;
    isAuthentic: number;
    firstScannedAt: number;
    firstScannedBy: number;
    scannedCount: number;
    lastScannedAt: number;
    currentOwnerId: number;
    soldAt: number;
    soldTo: number;
    lastLatitude: number;
    lastLongitude: number;
    geoAccuracy: number;
    lastCity: number;
    lastCountry: number;
    reportedCount: number;
    isSuspicious: number;
    suspiciousNotes: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type ProductUnitAvgAggregateInputType = {
    unitNumber?: true;
    scannedCount?: true;
    lastLatitude?: true;
    lastLongitude?: true;
    geoAccuracy?: true;
    reportedCount?: true;
};
export type ProductUnitSumAggregateInputType = {
    unitNumber?: true;
    scannedCount?: true;
    lastLatitude?: true;
    lastLongitude?: true;
    geoAccuracy?: true;
    reportedCount?: true;
};
export type ProductUnitMinAggregateInputType = {
    id?: true;
    productId?: true;
    manufacturerId?: true;
    barcode?: true;
    unitNumber?: true;
    qrCodeData?: true;
    signature?: true;
    status?: true;
    isAuthentic?: true;
    firstScannedAt?: true;
    firstScannedBy?: true;
    scannedCount?: true;
    lastScannedAt?: true;
    currentOwnerId?: true;
    soldAt?: true;
    soldTo?: true;
    lastLatitude?: true;
    lastLongitude?: true;
    geoAccuracy?: true;
    lastCity?: true;
    lastCountry?: true;
    reportedCount?: true;
    isSuspicious?: true;
    suspiciousNotes?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ProductUnitMaxAggregateInputType = {
    id?: true;
    productId?: true;
    manufacturerId?: true;
    barcode?: true;
    unitNumber?: true;
    qrCodeData?: true;
    signature?: true;
    status?: true;
    isAuthentic?: true;
    firstScannedAt?: true;
    firstScannedBy?: true;
    scannedCount?: true;
    lastScannedAt?: true;
    currentOwnerId?: true;
    soldAt?: true;
    soldTo?: true;
    lastLatitude?: true;
    lastLongitude?: true;
    geoAccuracy?: true;
    lastCity?: true;
    lastCountry?: true;
    reportedCount?: true;
    isSuspicious?: true;
    suspiciousNotes?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ProductUnitCountAggregateInputType = {
    id?: true;
    productId?: true;
    manufacturerId?: true;
    barcode?: true;
    unitNumber?: true;
    qrCodeData?: true;
    signature?: true;
    status?: true;
    isAuthentic?: true;
    firstScannedAt?: true;
    firstScannedBy?: true;
    scannedCount?: true;
    lastScannedAt?: true;
    currentOwnerId?: true;
    soldAt?: true;
    soldTo?: true;
    lastLatitude?: true;
    lastLongitude?: true;
    geoAccuracy?: true;
    lastCity?: true;
    lastCountry?: true;
    reportedCount?: true;
    isSuspicious?: true;
    suspiciousNotes?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type ProductUnitAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which ProductUnit to aggregate.
     */
    where?: Prisma.ProductUnitWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ProductUnits to fetch.
     */
    orderBy?: Prisma.ProductUnitOrderByWithRelationInput | Prisma.ProductUnitOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.ProductUnitWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ProductUnits from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ProductUnits.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned ProductUnits
    **/
    _count?: true | ProductUnitCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: ProductUnitAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: ProductUnitSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: ProductUnitMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: ProductUnitMaxAggregateInputType;
};
export type GetProductUnitAggregateType<T extends ProductUnitAggregateArgs> = {
    [P in keyof T & keyof AggregateProductUnit]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateProductUnit[P]> : Prisma.GetScalarType<T[P], AggregateProductUnit[P]>;
};
export type ProductUnitGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductUnitWhereInput;
    orderBy?: Prisma.ProductUnitOrderByWithAggregationInput | Prisma.ProductUnitOrderByWithAggregationInput[];
    by: Prisma.ProductUnitScalarFieldEnum[] | Prisma.ProductUnitScalarFieldEnum;
    having?: Prisma.ProductUnitScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ProductUnitCountAggregateInputType | true;
    _avg?: ProductUnitAvgAggregateInputType;
    _sum?: ProductUnitSumAggregateInputType;
    _min?: ProductUnitMinAggregateInputType;
    _max?: ProductUnitMaxAggregateInputType;
};
export type ProductUnitGroupByOutputType = {
    id: string;
    productId: string;
    manufacturerId: string;
    barcode: string;
    unitNumber: number;
    qrCodeData: string | null;
    signature: string | null;
    status: string;
    isAuthentic: boolean;
    firstScannedAt: Date | null;
    firstScannedBy: string | null;
    scannedCount: number;
    lastScannedAt: Date | null;
    currentOwnerId: string | null;
    soldAt: Date | null;
    soldTo: string | null;
    lastLatitude: number | null;
    lastLongitude: number | null;
    geoAccuracy: number | null;
    lastCity: string | null;
    lastCountry: string | null;
    reportedCount: number;
    isSuspicious: boolean;
    suspiciousNotes: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: ProductUnitCountAggregateOutputType | null;
    _avg: ProductUnitAvgAggregateOutputType | null;
    _sum: ProductUnitSumAggregateOutputType | null;
    _min: ProductUnitMinAggregateOutputType | null;
    _max: ProductUnitMaxAggregateOutputType | null;
};
type GetProductUnitGroupByPayload<T extends ProductUnitGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ProductUnitGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ProductUnitGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ProductUnitGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ProductUnitGroupByOutputType[P]>;
}>>;
export type ProductUnitWhereInput = {
    AND?: Prisma.ProductUnitWhereInput | Prisma.ProductUnitWhereInput[];
    OR?: Prisma.ProductUnitWhereInput[];
    NOT?: Prisma.ProductUnitWhereInput | Prisma.ProductUnitWhereInput[];
    id?: Prisma.StringFilter<"ProductUnit"> | string;
    productId?: Prisma.StringFilter<"ProductUnit"> | string;
    manufacturerId?: Prisma.StringFilter<"ProductUnit"> | string;
    barcode?: Prisma.StringFilter<"ProductUnit"> | string;
    unitNumber?: Prisma.IntFilter<"ProductUnit"> | number;
    qrCodeData?: Prisma.StringNullableFilter<"ProductUnit"> | string | null;
    signature?: Prisma.StringNullableFilter<"ProductUnit"> | string | null;
    status?: Prisma.StringFilter<"ProductUnit"> | string;
    isAuthentic?: Prisma.BoolFilter<"ProductUnit"> | boolean;
    firstScannedAt?: Prisma.DateTimeNullableFilter<"ProductUnit"> | Date | string | null;
    firstScannedBy?: Prisma.StringNullableFilter<"ProductUnit"> | string | null;
    scannedCount?: Prisma.IntFilter<"ProductUnit"> | number;
    lastScannedAt?: Prisma.DateTimeNullableFilter<"ProductUnit"> | Date | string | null;
    currentOwnerId?: Prisma.StringNullableFilter<"ProductUnit"> | string | null;
    soldAt?: Prisma.DateTimeNullableFilter<"ProductUnit"> | Date | string | null;
    soldTo?: Prisma.StringNullableFilter<"ProductUnit"> | string | null;
    lastLatitude?: Prisma.FloatNullableFilter<"ProductUnit"> | number | null;
    lastLongitude?: Prisma.FloatNullableFilter<"ProductUnit"> | number | null;
    geoAccuracy?: Prisma.FloatNullableFilter<"ProductUnit"> | number | null;
    lastCity?: Prisma.StringNullableFilter<"ProductUnit"> | string | null;
    lastCountry?: Prisma.StringNullableFilter<"ProductUnit"> | string | null;
    reportedCount?: Prisma.IntFilter<"ProductUnit"> | number;
    isSuspicious?: Prisma.BoolFilter<"ProductUnit"> | boolean;
    suspiciousNotes?: Prisma.StringNullableFilter<"ProductUnit"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"ProductUnit"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"ProductUnit"> | Date | string;
    manufacturer?: Prisma.XOR<Prisma.ManufacturerScalarRelationFilter, Prisma.ManufacturerWhereInput>;
    product?: Prisma.XOR<Prisma.ProductScalarRelationFilter, Prisma.ProductWhereInput>;
    auditLogs?: Prisma.AuditLogListRelationFilter;
};
export type ProductUnitOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    manufacturerId?: Prisma.SortOrder;
    barcode?: Prisma.SortOrder;
    unitNumber?: Prisma.SortOrder;
    qrCodeData?: Prisma.SortOrderInput | Prisma.SortOrder;
    signature?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    isAuthentic?: Prisma.SortOrder;
    firstScannedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    firstScannedBy?: Prisma.SortOrderInput | Prisma.SortOrder;
    scannedCount?: Prisma.SortOrder;
    lastScannedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    currentOwnerId?: Prisma.SortOrderInput | Prisma.SortOrder;
    soldAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    soldTo?: Prisma.SortOrderInput | Prisma.SortOrder;
    lastLatitude?: Prisma.SortOrderInput | Prisma.SortOrder;
    lastLongitude?: Prisma.SortOrderInput | Prisma.SortOrder;
    geoAccuracy?: Prisma.SortOrderInput | Prisma.SortOrder;
    lastCity?: Prisma.SortOrderInput | Prisma.SortOrder;
    lastCountry?: Prisma.SortOrderInput | Prisma.SortOrder;
    reportedCount?: Prisma.SortOrder;
    isSuspicious?: Prisma.SortOrder;
    suspiciousNotes?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    manufacturer?: Prisma.ManufacturerOrderByWithRelationInput;
    product?: Prisma.ProductOrderByWithRelationInput;
    auditLogs?: Prisma.AuditLogOrderByRelationAggregateInput;
};
export type ProductUnitWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    barcode?: string;
    productId_unitNumber?: Prisma.ProductUnitProductIdUnitNumberCompoundUniqueInput;
    AND?: Prisma.ProductUnitWhereInput | Prisma.ProductUnitWhereInput[];
    OR?: Prisma.ProductUnitWhereInput[];
    NOT?: Prisma.ProductUnitWhereInput | Prisma.ProductUnitWhereInput[];
    productId?: Prisma.StringFilter<"ProductUnit"> | string;
    manufacturerId?: Prisma.StringFilter<"ProductUnit"> | string;
    unitNumber?: Prisma.IntFilter<"ProductUnit"> | number;
    qrCodeData?: Prisma.StringNullableFilter<"ProductUnit"> | string | null;
    signature?: Prisma.StringNullableFilter<"ProductUnit"> | string | null;
    status?: Prisma.StringFilter<"ProductUnit"> | string;
    isAuthentic?: Prisma.BoolFilter<"ProductUnit"> | boolean;
    firstScannedAt?: Prisma.DateTimeNullableFilter<"ProductUnit"> | Date | string | null;
    firstScannedBy?: Prisma.StringNullableFilter<"ProductUnit"> | string | null;
    scannedCount?: Prisma.IntFilter<"ProductUnit"> | number;
    lastScannedAt?: Prisma.DateTimeNullableFilter<"ProductUnit"> | Date | string | null;
    currentOwnerId?: Prisma.StringNullableFilter<"ProductUnit"> | string | null;
    soldAt?: Prisma.DateTimeNullableFilter<"ProductUnit"> | Date | string | null;
    soldTo?: Prisma.StringNullableFilter<"ProductUnit"> | string | null;
    lastLatitude?: Prisma.FloatNullableFilter<"ProductUnit"> | number | null;
    lastLongitude?: Prisma.FloatNullableFilter<"ProductUnit"> | number | null;
    geoAccuracy?: Prisma.FloatNullableFilter<"ProductUnit"> | number | null;
    lastCity?: Prisma.StringNullableFilter<"ProductUnit"> | string | null;
    lastCountry?: Prisma.StringNullableFilter<"ProductUnit"> | string | null;
    reportedCount?: Prisma.IntFilter<"ProductUnit"> | number;
    isSuspicious?: Prisma.BoolFilter<"ProductUnit"> | boolean;
    suspiciousNotes?: Prisma.StringNullableFilter<"ProductUnit"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"ProductUnit"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"ProductUnit"> | Date | string;
    manufacturer?: Prisma.XOR<Prisma.ManufacturerScalarRelationFilter, Prisma.ManufacturerWhereInput>;
    product?: Prisma.XOR<Prisma.ProductScalarRelationFilter, Prisma.ProductWhereInput>;
    auditLogs?: Prisma.AuditLogListRelationFilter;
}, "id" | "barcode" | "productId_unitNumber">;
export type ProductUnitOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    manufacturerId?: Prisma.SortOrder;
    barcode?: Prisma.SortOrder;
    unitNumber?: Prisma.SortOrder;
    qrCodeData?: Prisma.SortOrderInput | Prisma.SortOrder;
    signature?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    isAuthentic?: Prisma.SortOrder;
    firstScannedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    firstScannedBy?: Prisma.SortOrderInput | Prisma.SortOrder;
    scannedCount?: Prisma.SortOrder;
    lastScannedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    currentOwnerId?: Prisma.SortOrderInput | Prisma.SortOrder;
    soldAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    soldTo?: Prisma.SortOrderInput | Prisma.SortOrder;
    lastLatitude?: Prisma.SortOrderInput | Prisma.SortOrder;
    lastLongitude?: Prisma.SortOrderInput | Prisma.SortOrder;
    geoAccuracy?: Prisma.SortOrderInput | Prisma.SortOrder;
    lastCity?: Prisma.SortOrderInput | Prisma.SortOrder;
    lastCountry?: Prisma.SortOrderInput | Prisma.SortOrder;
    reportedCount?: Prisma.SortOrder;
    isSuspicious?: Prisma.SortOrder;
    suspiciousNotes?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.ProductUnitCountOrderByAggregateInput;
    _avg?: Prisma.ProductUnitAvgOrderByAggregateInput;
    _max?: Prisma.ProductUnitMaxOrderByAggregateInput;
    _min?: Prisma.ProductUnitMinOrderByAggregateInput;
    _sum?: Prisma.ProductUnitSumOrderByAggregateInput;
};
export type ProductUnitScalarWhereWithAggregatesInput = {
    AND?: Prisma.ProductUnitScalarWhereWithAggregatesInput | Prisma.ProductUnitScalarWhereWithAggregatesInput[];
    OR?: Prisma.ProductUnitScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ProductUnitScalarWhereWithAggregatesInput | Prisma.ProductUnitScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"ProductUnit"> | string;
    productId?: Prisma.StringWithAggregatesFilter<"ProductUnit"> | string;
    manufacturerId?: Prisma.StringWithAggregatesFilter<"ProductUnit"> | string;
    barcode?: Prisma.StringWithAggregatesFilter<"ProductUnit"> | string;
    unitNumber?: Prisma.IntWithAggregatesFilter<"ProductUnit"> | number;
    qrCodeData?: Prisma.StringNullableWithAggregatesFilter<"ProductUnit"> | string | null;
    signature?: Prisma.StringNullableWithAggregatesFilter<"ProductUnit"> | string | null;
    status?: Prisma.StringWithAggregatesFilter<"ProductUnit"> | string;
    isAuthentic?: Prisma.BoolWithAggregatesFilter<"ProductUnit"> | boolean;
    firstScannedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"ProductUnit"> | Date | string | null;
    firstScannedBy?: Prisma.StringNullableWithAggregatesFilter<"ProductUnit"> | string | null;
    scannedCount?: Prisma.IntWithAggregatesFilter<"ProductUnit"> | number;
    lastScannedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"ProductUnit"> | Date | string | null;
    currentOwnerId?: Prisma.StringNullableWithAggregatesFilter<"ProductUnit"> | string | null;
    soldAt?: Prisma.DateTimeNullableWithAggregatesFilter<"ProductUnit"> | Date | string | null;
    soldTo?: Prisma.StringNullableWithAggregatesFilter<"ProductUnit"> | string | null;
    lastLatitude?: Prisma.FloatNullableWithAggregatesFilter<"ProductUnit"> | number | null;
    lastLongitude?: Prisma.FloatNullableWithAggregatesFilter<"ProductUnit"> | number | null;
    geoAccuracy?: Prisma.FloatNullableWithAggregatesFilter<"ProductUnit"> | number | null;
    lastCity?: Prisma.StringNullableWithAggregatesFilter<"ProductUnit"> | string | null;
    lastCountry?: Prisma.StringNullableWithAggregatesFilter<"ProductUnit"> | string | null;
    reportedCount?: Prisma.IntWithAggregatesFilter<"ProductUnit"> | number;
    isSuspicious?: Prisma.BoolWithAggregatesFilter<"ProductUnit"> | boolean;
    suspiciousNotes?: Prisma.StringNullableWithAggregatesFilter<"ProductUnit"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"ProductUnit"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"ProductUnit"> | Date | string;
};
export type ProductUnitCreateInput = {
    id?: string;
    barcode: string;
    unitNumber: number;
    qrCodeData?: string | null;
    signature?: string | null;
    status?: string;
    isAuthentic?: boolean;
    firstScannedAt?: Date | string | null;
    firstScannedBy?: string | null;
    scannedCount?: number;
    lastScannedAt?: Date | string | null;
    currentOwnerId?: string | null;
    soldAt?: Date | string | null;
    soldTo?: string | null;
    lastLatitude?: number | null;
    lastLongitude?: number | null;
    geoAccuracy?: number | null;
    lastCity?: string | null;
    lastCountry?: string | null;
    reportedCount?: number;
    isSuspicious?: boolean;
    suspiciousNotes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    manufacturer: Prisma.ManufacturerCreateNestedOneWithoutProductUnitsInput;
    product: Prisma.ProductCreateNestedOneWithoutUnitsInput;
    auditLogs?: Prisma.AuditLogCreateNestedManyWithoutProductUnitInput;
};
export type ProductUnitUncheckedCreateInput = {
    id?: string;
    productId: string;
    manufacturerId: string;
    barcode: string;
    unitNumber: number;
    qrCodeData?: string | null;
    signature?: string | null;
    status?: string;
    isAuthentic?: boolean;
    firstScannedAt?: Date | string | null;
    firstScannedBy?: string | null;
    scannedCount?: number;
    lastScannedAt?: Date | string | null;
    currentOwnerId?: string | null;
    soldAt?: Date | string | null;
    soldTo?: string | null;
    lastLatitude?: number | null;
    lastLongitude?: number | null;
    geoAccuracy?: number | null;
    lastCity?: string | null;
    lastCountry?: string | null;
    reportedCount?: number;
    isSuspicious?: boolean;
    suspiciousNotes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    auditLogs?: Prisma.AuditLogUncheckedCreateNestedManyWithoutProductUnitInput;
};
export type ProductUnitUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    barcode?: Prisma.StringFieldUpdateOperationsInput | string;
    unitNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    qrCodeData?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    signature?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    isAuthentic?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    firstScannedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    firstScannedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    scannedCount?: Prisma.IntFieldUpdateOperationsInput | number;
    lastScannedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    currentOwnerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    soldAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    soldTo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastLatitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    lastLongitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    geoAccuracy?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    lastCity?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastCountry?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reportedCount?: Prisma.IntFieldUpdateOperationsInput | number;
    isSuspicious?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    suspiciousNotes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    manufacturer?: Prisma.ManufacturerUpdateOneRequiredWithoutProductUnitsNestedInput;
    product?: Prisma.ProductUpdateOneRequiredWithoutUnitsNestedInput;
    auditLogs?: Prisma.AuditLogUpdateManyWithoutProductUnitNestedInput;
};
export type ProductUnitUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    manufacturerId?: Prisma.StringFieldUpdateOperationsInput | string;
    barcode?: Prisma.StringFieldUpdateOperationsInput | string;
    unitNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    qrCodeData?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    signature?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    isAuthentic?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    firstScannedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    firstScannedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    scannedCount?: Prisma.IntFieldUpdateOperationsInput | number;
    lastScannedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    currentOwnerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    soldAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    soldTo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastLatitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    lastLongitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    geoAccuracy?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    lastCity?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastCountry?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reportedCount?: Prisma.IntFieldUpdateOperationsInput | number;
    isSuspicious?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    suspiciousNotes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    auditLogs?: Prisma.AuditLogUncheckedUpdateManyWithoutProductUnitNestedInput;
};
export type ProductUnitCreateManyInput = {
    id?: string;
    productId: string;
    manufacturerId: string;
    barcode: string;
    unitNumber: number;
    qrCodeData?: string | null;
    signature?: string | null;
    status?: string;
    isAuthentic?: boolean;
    firstScannedAt?: Date | string | null;
    firstScannedBy?: string | null;
    scannedCount?: number;
    lastScannedAt?: Date | string | null;
    currentOwnerId?: string | null;
    soldAt?: Date | string | null;
    soldTo?: string | null;
    lastLatitude?: number | null;
    lastLongitude?: number | null;
    geoAccuracy?: number | null;
    lastCity?: string | null;
    lastCountry?: string | null;
    reportedCount?: number;
    isSuspicious?: boolean;
    suspiciousNotes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ProductUnitUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    barcode?: Prisma.StringFieldUpdateOperationsInput | string;
    unitNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    qrCodeData?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    signature?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    isAuthentic?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    firstScannedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    firstScannedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    scannedCount?: Prisma.IntFieldUpdateOperationsInput | number;
    lastScannedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    currentOwnerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    soldAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    soldTo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastLatitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    lastLongitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    geoAccuracy?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    lastCity?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastCountry?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reportedCount?: Prisma.IntFieldUpdateOperationsInput | number;
    isSuspicious?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    suspiciousNotes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProductUnitUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    manufacturerId?: Prisma.StringFieldUpdateOperationsInput | string;
    barcode?: Prisma.StringFieldUpdateOperationsInput | string;
    unitNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    qrCodeData?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    signature?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    isAuthentic?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    firstScannedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    firstScannedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    scannedCount?: Prisma.IntFieldUpdateOperationsInput | number;
    lastScannedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    currentOwnerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    soldAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    soldTo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastLatitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    lastLongitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    geoAccuracy?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    lastCity?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastCountry?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reportedCount?: Prisma.IntFieldUpdateOperationsInput | number;
    isSuspicious?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    suspiciousNotes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProductUnitListRelationFilter = {
    every?: Prisma.ProductUnitWhereInput;
    some?: Prisma.ProductUnitWhereInput;
    none?: Prisma.ProductUnitWhereInput;
};
export type ProductUnitOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ProductUnitProductIdUnitNumberCompoundUniqueInput = {
    productId: string;
    unitNumber: number;
};
export type ProductUnitCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    manufacturerId?: Prisma.SortOrder;
    barcode?: Prisma.SortOrder;
    unitNumber?: Prisma.SortOrder;
    qrCodeData?: Prisma.SortOrder;
    signature?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    isAuthentic?: Prisma.SortOrder;
    firstScannedAt?: Prisma.SortOrder;
    firstScannedBy?: Prisma.SortOrder;
    scannedCount?: Prisma.SortOrder;
    lastScannedAt?: Prisma.SortOrder;
    currentOwnerId?: Prisma.SortOrder;
    soldAt?: Prisma.SortOrder;
    soldTo?: Prisma.SortOrder;
    lastLatitude?: Prisma.SortOrder;
    lastLongitude?: Prisma.SortOrder;
    geoAccuracy?: Prisma.SortOrder;
    lastCity?: Prisma.SortOrder;
    lastCountry?: Prisma.SortOrder;
    reportedCount?: Prisma.SortOrder;
    isSuspicious?: Prisma.SortOrder;
    suspiciousNotes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ProductUnitAvgOrderByAggregateInput = {
    unitNumber?: Prisma.SortOrder;
    scannedCount?: Prisma.SortOrder;
    lastLatitude?: Prisma.SortOrder;
    lastLongitude?: Prisma.SortOrder;
    geoAccuracy?: Prisma.SortOrder;
    reportedCount?: Prisma.SortOrder;
};
export type ProductUnitMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    manufacturerId?: Prisma.SortOrder;
    barcode?: Prisma.SortOrder;
    unitNumber?: Prisma.SortOrder;
    qrCodeData?: Prisma.SortOrder;
    signature?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    isAuthentic?: Prisma.SortOrder;
    firstScannedAt?: Prisma.SortOrder;
    firstScannedBy?: Prisma.SortOrder;
    scannedCount?: Prisma.SortOrder;
    lastScannedAt?: Prisma.SortOrder;
    currentOwnerId?: Prisma.SortOrder;
    soldAt?: Prisma.SortOrder;
    soldTo?: Prisma.SortOrder;
    lastLatitude?: Prisma.SortOrder;
    lastLongitude?: Prisma.SortOrder;
    geoAccuracy?: Prisma.SortOrder;
    lastCity?: Prisma.SortOrder;
    lastCountry?: Prisma.SortOrder;
    reportedCount?: Prisma.SortOrder;
    isSuspicious?: Prisma.SortOrder;
    suspiciousNotes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ProductUnitMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    manufacturerId?: Prisma.SortOrder;
    barcode?: Prisma.SortOrder;
    unitNumber?: Prisma.SortOrder;
    qrCodeData?: Prisma.SortOrder;
    signature?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    isAuthentic?: Prisma.SortOrder;
    firstScannedAt?: Prisma.SortOrder;
    firstScannedBy?: Prisma.SortOrder;
    scannedCount?: Prisma.SortOrder;
    lastScannedAt?: Prisma.SortOrder;
    currentOwnerId?: Prisma.SortOrder;
    soldAt?: Prisma.SortOrder;
    soldTo?: Prisma.SortOrder;
    lastLatitude?: Prisma.SortOrder;
    lastLongitude?: Prisma.SortOrder;
    geoAccuracy?: Prisma.SortOrder;
    lastCity?: Prisma.SortOrder;
    lastCountry?: Prisma.SortOrder;
    reportedCount?: Prisma.SortOrder;
    isSuspicious?: Prisma.SortOrder;
    suspiciousNotes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ProductUnitSumOrderByAggregateInput = {
    unitNumber?: Prisma.SortOrder;
    scannedCount?: Prisma.SortOrder;
    lastLatitude?: Prisma.SortOrder;
    lastLongitude?: Prisma.SortOrder;
    geoAccuracy?: Prisma.SortOrder;
    reportedCount?: Prisma.SortOrder;
};
export type ProductUnitScalarRelationFilter = {
    is?: Prisma.ProductUnitWhereInput;
    isNot?: Prisma.ProductUnitWhereInput;
};
export type ProductUnitCreateNestedManyWithoutManufacturerInput = {
    create?: Prisma.XOR<Prisma.ProductUnitCreateWithoutManufacturerInput, Prisma.ProductUnitUncheckedCreateWithoutManufacturerInput> | Prisma.ProductUnitCreateWithoutManufacturerInput[] | Prisma.ProductUnitUncheckedCreateWithoutManufacturerInput[];
    connectOrCreate?: Prisma.ProductUnitCreateOrConnectWithoutManufacturerInput | Prisma.ProductUnitCreateOrConnectWithoutManufacturerInput[];
    createMany?: Prisma.ProductUnitCreateManyManufacturerInputEnvelope;
    connect?: Prisma.ProductUnitWhereUniqueInput | Prisma.ProductUnitWhereUniqueInput[];
};
export type ProductUnitUncheckedCreateNestedManyWithoutManufacturerInput = {
    create?: Prisma.XOR<Prisma.ProductUnitCreateWithoutManufacturerInput, Prisma.ProductUnitUncheckedCreateWithoutManufacturerInput> | Prisma.ProductUnitCreateWithoutManufacturerInput[] | Prisma.ProductUnitUncheckedCreateWithoutManufacturerInput[];
    connectOrCreate?: Prisma.ProductUnitCreateOrConnectWithoutManufacturerInput | Prisma.ProductUnitCreateOrConnectWithoutManufacturerInput[];
    createMany?: Prisma.ProductUnitCreateManyManufacturerInputEnvelope;
    connect?: Prisma.ProductUnitWhereUniqueInput | Prisma.ProductUnitWhereUniqueInput[];
};
export type ProductUnitUpdateManyWithoutManufacturerNestedInput = {
    create?: Prisma.XOR<Prisma.ProductUnitCreateWithoutManufacturerInput, Prisma.ProductUnitUncheckedCreateWithoutManufacturerInput> | Prisma.ProductUnitCreateWithoutManufacturerInput[] | Prisma.ProductUnitUncheckedCreateWithoutManufacturerInput[];
    connectOrCreate?: Prisma.ProductUnitCreateOrConnectWithoutManufacturerInput | Prisma.ProductUnitCreateOrConnectWithoutManufacturerInput[];
    upsert?: Prisma.ProductUnitUpsertWithWhereUniqueWithoutManufacturerInput | Prisma.ProductUnitUpsertWithWhereUniqueWithoutManufacturerInput[];
    createMany?: Prisma.ProductUnitCreateManyManufacturerInputEnvelope;
    set?: Prisma.ProductUnitWhereUniqueInput | Prisma.ProductUnitWhereUniqueInput[];
    disconnect?: Prisma.ProductUnitWhereUniqueInput | Prisma.ProductUnitWhereUniqueInput[];
    delete?: Prisma.ProductUnitWhereUniqueInput | Prisma.ProductUnitWhereUniqueInput[];
    connect?: Prisma.ProductUnitWhereUniqueInput | Prisma.ProductUnitWhereUniqueInput[];
    update?: Prisma.ProductUnitUpdateWithWhereUniqueWithoutManufacturerInput | Prisma.ProductUnitUpdateWithWhereUniqueWithoutManufacturerInput[];
    updateMany?: Prisma.ProductUnitUpdateManyWithWhereWithoutManufacturerInput | Prisma.ProductUnitUpdateManyWithWhereWithoutManufacturerInput[];
    deleteMany?: Prisma.ProductUnitScalarWhereInput | Prisma.ProductUnitScalarWhereInput[];
};
export type ProductUnitUncheckedUpdateManyWithoutManufacturerNestedInput = {
    create?: Prisma.XOR<Prisma.ProductUnitCreateWithoutManufacturerInput, Prisma.ProductUnitUncheckedCreateWithoutManufacturerInput> | Prisma.ProductUnitCreateWithoutManufacturerInput[] | Prisma.ProductUnitUncheckedCreateWithoutManufacturerInput[];
    connectOrCreate?: Prisma.ProductUnitCreateOrConnectWithoutManufacturerInput | Prisma.ProductUnitCreateOrConnectWithoutManufacturerInput[];
    upsert?: Prisma.ProductUnitUpsertWithWhereUniqueWithoutManufacturerInput | Prisma.ProductUnitUpsertWithWhereUniqueWithoutManufacturerInput[];
    createMany?: Prisma.ProductUnitCreateManyManufacturerInputEnvelope;
    set?: Prisma.ProductUnitWhereUniqueInput | Prisma.ProductUnitWhereUniqueInput[];
    disconnect?: Prisma.ProductUnitWhereUniqueInput | Prisma.ProductUnitWhereUniqueInput[];
    delete?: Prisma.ProductUnitWhereUniqueInput | Prisma.ProductUnitWhereUniqueInput[];
    connect?: Prisma.ProductUnitWhereUniqueInput | Prisma.ProductUnitWhereUniqueInput[];
    update?: Prisma.ProductUnitUpdateWithWhereUniqueWithoutManufacturerInput | Prisma.ProductUnitUpdateWithWhereUniqueWithoutManufacturerInput[];
    updateMany?: Prisma.ProductUnitUpdateManyWithWhereWithoutManufacturerInput | Prisma.ProductUnitUpdateManyWithWhereWithoutManufacturerInput[];
    deleteMany?: Prisma.ProductUnitScalarWhereInput | Prisma.ProductUnitScalarWhereInput[];
};
export type ProductUnitCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.ProductUnitCreateWithoutProductInput, Prisma.ProductUnitUncheckedCreateWithoutProductInput> | Prisma.ProductUnitCreateWithoutProductInput[] | Prisma.ProductUnitUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ProductUnitCreateOrConnectWithoutProductInput | Prisma.ProductUnitCreateOrConnectWithoutProductInput[];
    createMany?: Prisma.ProductUnitCreateManyProductInputEnvelope;
    connect?: Prisma.ProductUnitWhereUniqueInput | Prisma.ProductUnitWhereUniqueInput[];
};
export type ProductUnitUncheckedCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.ProductUnitCreateWithoutProductInput, Prisma.ProductUnitUncheckedCreateWithoutProductInput> | Prisma.ProductUnitCreateWithoutProductInput[] | Prisma.ProductUnitUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ProductUnitCreateOrConnectWithoutProductInput | Prisma.ProductUnitCreateOrConnectWithoutProductInput[];
    createMany?: Prisma.ProductUnitCreateManyProductInputEnvelope;
    connect?: Prisma.ProductUnitWhereUniqueInput | Prisma.ProductUnitWhereUniqueInput[];
};
export type ProductUnitUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.ProductUnitCreateWithoutProductInput, Prisma.ProductUnitUncheckedCreateWithoutProductInput> | Prisma.ProductUnitCreateWithoutProductInput[] | Prisma.ProductUnitUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ProductUnitCreateOrConnectWithoutProductInput | Prisma.ProductUnitCreateOrConnectWithoutProductInput[];
    upsert?: Prisma.ProductUnitUpsertWithWhereUniqueWithoutProductInput | Prisma.ProductUnitUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: Prisma.ProductUnitCreateManyProductInputEnvelope;
    set?: Prisma.ProductUnitWhereUniqueInput | Prisma.ProductUnitWhereUniqueInput[];
    disconnect?: Prisma.ProductUnitWhereUniqueInput | Prisma.ProductUnitWhereUniqueInput[];
    delete?: Prisma.ProductUnitWhereUniqueInput | Prisma.ProductUnitWhereUniqueInput[];
    connect?: Prisma.ProductUnitWhereUniqueInput | Prisma.ProductUnitWhereUniqueInput[];
    update?: Prisma.ProductUnitUpdateWithWhereUniqueWithoutProductInput | Prisma.ProductUnitUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?: Prisma.ProductUnitUpdateManyWithWhereWithoutProductInput | Prisma.ProductUnitUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: Prisma.ProductUnitScalarWhereInput | Prisma.ProductUnitScalarWhereInput[];
};
export type ProductUnitUncheckedUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.ProductUnitCreateWithoutProductInput, Prisma.ProductUnitUncheckedCreateWithoutProductInput> | Prisma.ProductUnitCreateWithoutProductInput[] | Prisma.ProductUnitUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ProductUnitCreateOrConnectWithoutProductInput | Prisma.ProductUnitCreateOrConnectWithoutProductInput[];
    upsert?: Prisma.ProductUnitUpsertWithWhereUniqueWithoutProductInput | Prisma.ProductUnitUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: Prisma.ProductUnitCreateManyProductInputEnvelope;
    set?: Prisma.ProductUnitWhereUniqueInput | Prisma.ProductUnitWhereUniqueInput[];
    disconnect?: Prisma.ProductUnitWhereUniqueInput | Prisma.ProductUnitWhereUniqueInput[];
    delete?: Prisma.ProductUnitWhereUniqueInput | Prisma.ProductUnitWhereUniqueInput[];
    connect?: Prisma.ProductUnitWhereUniqueInput | Prisma.ProductUnitWhereUniqueInput[];
    update?: Prisma.ProductUnitUpdateWithWhereUniqueWithoutProductInput | Prisma.ProductUnitUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?: Prisma.ProductUnitUpdateManyWithWhereWithoutProductInput | Prisma.ProductUnitUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: Prisma.ProductUnitScalarWhereInput | Prisma.ProductUnitScalarWhereInput[];
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type ProductUnitCreateNestedOneWithoutAuditLogsInput = {
    create?: Prisma.XOR<Prisma.ProductUnitCreateWithoutAuditLogsInput, Prisma.ProductUnitUncheckedCreateWithoutAuditLogsInput>;
    connectOrCreate?: Prisma.ProductUnitCreateOrConnectWithoutAuditLogsInput;
    connect?: Prisma.ProductUnitWhereUniqueInput;
};
export type ProductUnitUpdateOneRequiredWithoutAuditLogsNestedInput = {
    create?: Prisma.XOR<Prisma.ProductUnitCreateWithoutAuditLogsInput, Prisma.ProductUnitUncheckedCreateWithoutAuditLogsInput>;
    connectOrCreate?: Prisma.ProductUnitCreateOrConnectWithoutAuditLogsInput;
    upsert?: Prisma.ProductUnitUpsertWithoutAuditLogsInput;
    connect?: Prisma.ProductUnitWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ProductUnitUpdateToOneWithWhereWithoutAuditLogsInput, Prisma.ProductUnitUpdateWithoutAuditLogsInput>, Prisma.ProductUnitUncheckedUpdateWithoutAuditLogsInput>;
};
export type ProductUnitCreateWithoutManufacturerInput = {
    id?: string;
    barcode: string;
    unitNumber: number;
    qrCodeData?: string | null;
    signature?: string | null;
    status?: string;
    isAuthentic?: boolean;
    firstScannedAt?: Date | string | null;
    firstScannedBy?: string | null;
    scannedCount?: number;
    lastScannedAt?: Date | string | null;
    currentOwnerId?: string | null;
    soldAt?: Date | string | null;
    soldTo?: string | null;
    lastLatitude?: number | null;
    lastLongitude?: number | null;
    geoAccuracy?: number | null;
    lastCity?: string | null;
    lastCountry?: string | null;
    reportedCount?: number;
    isSuspicious?: boolean;
    suspiciousNotes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    product: Prisma.ProductCreateNestedOneWithoutUnitsInput;
    auditLogs?: Prisma.AuditLogCreateNestedManyWithoutProductUnitInput;
};
export type ProductUnitUncheckedCreateWithoutManufacturerInput = {
    id?: string;
    productId: string;
    barcode: string;
    unitNumber: number;
    qrCodeData?: string | null;
    signature?: string | null;
    status?: string;
    isAuthentic?: boolean;
    firstScannedAt?: Date | string | null;
    firstScannedBy?: string | null;
    scannedCount?: number;
    lastScannedAt?: Date | string | null;
    currentOwnerId?: string | null;
    soldAt?: Date | string | null;
    soldTo?: string | null;
    lastLatitude?: number | null;
    lastLongitude?: number | null;
    geoAccuracy?: number | null;
    lastCity?: string | null;
    lastCountry?: string | null;
    reportedCount?: number;
    isSuspicious?: boolean;
    suspiciousNotes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    auditLogs?: Prisma.AuditLogUncheckedCreateNestedManyWithoutProductUnitInput;
};
export type ProductUnitCreateOrConnectWithoutManufacturerInput = {
    where: Prisma.ProductUnitWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductUnitCreateWithoutManufacturerInput, Prisma.ProductUnitUncheckedCreateWithoutManufacturerInput>;
};
export type ProductUnitCreateManyManufacturerInputEnvelope = {
    data: Prisma.ProductUnitCreateManyManufacturerInput | Prisma.ProductUnitCreateManyManufacturerInput[];
};
export type ProductUnitUpsertWithWhereUniqueWithoutManufacturerInput = {
    where: Prisma.ProductUnitWhereUniqueInput;
    update: Prisma.XOR<Prisma.ProductUnitUpdateWithoutManufacturerInput, Prisma.ProductUnitUncheckedUpdateWithoutManufacturerInput>;
    create: Prisma.XOR<Prisma.ProductUnitCreateWithoutManufacturerInput, Prisma.ProductUnitUncheckedCreateWithoutManufacturerInput>;
};
export type ProductUnitUpdateWithWhereUniqueWithoutManufacturerInput = {
    where: Prisma.ProductUnitWhereUniqueInput;
    data: Prisma.XOR<Prisma.ProductUnitUpdateWithoutManufacturerInput, Prisma.ProductUnitUncheckedUpdateWithoutManufacturerInput>;
};
export type ProductUnitUpdateManyWithWhereWithoutManufacturerInput = {
    where: Prisma.ProductUnitScalarWhereInput;
    data: Prisma.XOR<Prisma.ProductUnitUpdateManyMutationInput, Prisma.ProductUnitUncheckedUpdateManyWithoutManufacturerInput>;
};
export type ProductUnitScalarWhereInput = {
    AND?: Prisma.ProductUnitScalarWhereInput | Prisma.ProductUnitScalarWhereInput[];
    OR?: Prisma.ProductUnitScalarWhereInput[];
    NOT?: Prisma.ProductUnitScalarWhereInput | Prisma.ProductUnitScalarWhereInput[];
    id?: Prisma.StringFilter<"ProductUnit"> | string;
    productId?: Prisma.StringFilter<"ProductUnit"> | string;
    manufacturerId?: Prisma.StringFilter<"ProductUnit"> | string;
    barcode?: Prisma.StringFilter<"ProductUnit"> | string;
    unitNumber?: Prisma.IntFilter<"ProductUnit"> | number;
    qrCodeData?: Prisma.StringNullableFilter<"ProductUnit"> | string | null;
    signature?: Prisma.StringNullableFilter<"ProductUnit"> | string | null;
    status?: Prisma.StringFilter<"ProductUnit"> | string;
    isAuthentic?: Prisma.BoolFilter<"ProductUnit"> | boolean;
    firstScannedAt?: Prisma.DateTimeNullableFilter<"ProductUnit"> | Date | string | null;
    firstScannedBy?: Prisma.StringNullableFilter<"ProductUnit"> | string | null;
    scannedCount?: Prisma.IntFilter<"ProductUnit"> | number;
    lastScannedAt?: Prisma.DateTimeNullableFilter<"ProductUnit"> | Date | string | null;
    currentOwnerId?: Prisma.StringNullableFilter<"ProductUnit"> | string | null;
    soldAt?: Prisma.DateTimeNullableFilter<"ProductUnit"> | Date | string | null;
    soldTo?: Prisma.StringNullableFilter<"ProductUnit"> | string | null;
    lastLatitude?: Prisma.FloatNullableFilter<"ProductUnit"> | number | null;
    lastLongitude?: Prisma.FloatNullableFilter<"ProductUnit"> | number | null;
    geoAccuracy?: Prisma.FloatNullableFilter<"ProductUnit"> | number | null;
    lastCity?: Prisma.StringNullableFilter<"ProductUnit"> | string | null;
    lastCountry?: Prisma.StringNullableFilter<"ProductUnit"> | string | null;
    reportedCount?: Prisma.IntFilter<"ProductUnit"> | number;
    isSuspicious?: Prisma.BoolFilter<"ProductUnit"> | boolean;
    suspiciousNotes?: Prisma.StringNullableFilter<"ProductUnit"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"ProductUnit"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"ProductUnit"> | Date | string;
};
export type ProductUnitCreateWithoutProductInput = {
    id?: string;
    barcode: string;
    unitNumber: number;
    qrCodeData?: string | null;
    signature?: string | null;
    status?: string;
    isAuthentic?: boolean;
    firstScannedAt?: Date | string | null;
    firstScannedBy?: string | null;
    scannedCount?: number;
    lastScannedAt?: Date | string | null;
    currentOwnerId?: string | null;
    soldAt?: Date | string | null;
    soldTo?: string | null;
    lastLatitude?: number | null;
    lastLongitude?: number | null;
    geoAccuracy?: number | null;
    lastCity?: string | null;
    lastCountry?: string | null;
    reportedCount?: number;
    isSuspicious?: boolean;
    suspiciousNotes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    manufacturer: Prisma.ManufacturerCreateNestedOneWithoutProductUnitsInput;
    auditLogs?: Prisma.AuditLogCreateNestedManyWithoutProductUnitInput;
};
export type ProductUnitUncheckedCreateWithoutProductInput = {
    id?: string;
    manufacturerId: string;
    barcode: string;
    unitNumber: number;
    qrCodeData?: string | null;
    signature?: string | null;
    status?: string;
    isAuthentic?: boolean;
    firstScannedAt?: Date | string | null;
    firstScannedBy?: string | null;
    scannedCount?: number;
    lastScannedAt?: Date | string | null;
    currentOwnerId?: string | null;
    soldAt?: Date | string | null;
    soldTo?: string | null;
    lastLatitude?: number | null;
    lastLongitude?: number | null;
    geoAccuracy?: number | null;
    lastCity?: string | null;
    lastCountry?: string | null;
    reportedCount?: number;
    isSuspicious?: boolean;
    suspiciousNotes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    auditLogs?: Prisma.AuditLogUncheckedCreateNestedManyWithoutProductUnitInput;
};
export type ProductUnitCreateOrConnectWithoutProductInput = {
    where: Prisma.ProductUnitWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductUnitCreateWithoutProductInput, Prisma.ProductUnitUncheckedCreateWithoutProductInput>;
};
export type ProductUnitCreateManyProductInputEnvelope = {
    data: Prisma.ProductUnitCreateManyProductInput | Prisma.ProductUnitCreateManyProductInput[];
};
export type ProductUnitUpsertWithWhereUniqueWithoutProductInput = {
    where: Prisma.ProductUnitWhereUniqueInput;
    update: Prisma.XOR<Prisma.ProductUnitUpdateWithoutProductInput, Prisma.ProductUnitUncheckedUpdateWithoutProductInput>;
    create: Prisma.XOR<Prisma.ProductUnitCreateWithoutProductInput, Prisma.ProductUnitUncheckedCreateWithoutProductInput>;
};
export type ProductUnitUpdateWithWhereUniqueWithoutProductInput = {
    where: Prisma.ProductUnitWhereUniqueInput;
    data: Prisma.XOR<Prisma.ProductUnitUpdateWithoutProductInput, Prisma.ProductUnitUncheckedUpdateWithoutProductInput>;
};
export type ProductUnitUpdateManyWithWhereWithoutProductInput = {
    where: Prisma.ProductUnitScalarWhereInput;
    data: Prisma.XOR<Prisma.ProductUnitUpdateManyMutationInput, Prisma.ProductUnitUncheckedUpdateManyWithoutProductInput>;
};
export type ProductUnitCreateWithoutAuditLogsInput = {
    id?: string;
    barcode: string;
    unitNumber: number;
    qrCodeData?: string | null;
    signature?: string | null;
    status?: string;
    isAuthentic?: boolean;
    firstScannedAt?: Date | string | null;
    firstScannedBy?: string | null;
    scannedCount?: number;
    lastScannedAt?: Date | string | null;
    currentOwnerId?: string | null;
    soldAt?: Date | string | null;
    soldTo?: string | null;
    lastLatitude?: number | null;
    lastLongitude?: number | null;
    geoAccuracy?: number | null;
    lastCity?: string | null;
    lastCountry?: string | null;
    reportedCount?: number;
    isSuspicious?: boolean;
    suspiciousNotes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    manufacturer: Prisma.ManufacturerCreateNestedOneWithoutProductUnitsInput;
    product: Prisma.ProductCreateNestedOneWithoutUnitsInput;
};
export type ProductUnitUncheckedCreateWithoutAuditLogsInput = {
    id?: string;
    productId: string;
    manufacturerId: string;
    barcode: string;
    unitNumber: number;
    qrCodeData?: string | null;
    signature?: string | null;
    status?: string;
    isAuthentic?: boolean;
    firstScannedAt?: Date | string | null;
    firstScannedBy?: string | null;
    scannedCount?: number;
    lastScannedAt?: Date | string | null;
    currentOwnerId?: string | null;
    soldAt?: Date | string | null;
    soldTo?: string | null;
    lastLatitude?: number | null;
    lastLongitude?: number | null;
    geoAccuracy?: number | null;
    lastCity?: string | null;
    lastCountry?: string | null;
    reportedCount?: number;
    isSuspicious?: boolean;
    suspiciousNotes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ProductUnitCreateOrConnectWithoutAuditLogsInput = {
    where: Prisma.ProductUnitWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductUnitCreateWithoutAuditLogsInput, Prisma.ProductUnitUncheckedCreateWithoutAuditLogsInput>;
};
export type ProductUnitUpsertWithoutAuditLogsInput = {
    update: Prisma.XOR<Prisma.ProductUnitUpdateWithoutAuditLogsInput, Prisma.ProductUnitUncheckedUpdateWithoutAuditLogsInput>;
    create: Prisma.XOR<Prisma.ProductUnitCreateWithoutAuditLogsInput, Prisma.ProductUnitUncheckedCreateWithoutAuditLogsInput>;
    where?: Prisma.ProductUnitWhereInput;
};
export type ProductUnitUpdateToOneWithWhereWithoutAuditLogsInput = {
    where?: Prisma.ProductUnitWhereInput;
    data: Prisma.XOR<Prisma.ProductUnitUpdateWithoutAuditLogsInput, Prisma.ProductUnitUncheckedUpdateWithoutAuditLogsInput>;
};
export type ProductUnitUpdateWithoutAuditLogsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    barcode?: Prisma.StringFieldUpdateOperationsInput | string;
    unitNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    qrCodeData?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    signature?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    isAuthentic?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    firstScannedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    firstScannedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    scannedCount?: Prisma.IntFieldUpdateOperationsInput | number;
    lastScannedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    currentOwnerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    soldAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    soldTo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastLatitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    lastLongitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    geoAccuracy?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    lastCity?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastCountry?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reportedCount?: Prisma.IntFieldUpdateOperationsInput | number;
    isSuspicious?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    suspiciousNotes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    manufacturer?: Prisma.ManufacturerUpdateOneRequiredWithoutProductUnitsNestedInput;
    product?: Prisma.ProductUpdateOneRequiredWithoutUnitsNestedInput;
};
export type ProductUnitUncheckedUpdateWithoutAuditLogsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    manufacturerId?: Prisma.StringFieldUpdateOperationsInput | string;
    barcode?: Prisma.StringFieldUpdateOperationsInput | string;
    unitNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    qrCodeData?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    signature?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    isAuthentic?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    firstScannedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    firstScannedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    scannedCount?: Prisma.IntFieldUpdateOperationsInput | number;
    lastScannedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    currentOwnerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    soldAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    soldTo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastLatitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    lastLongitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    geoAccuracy?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    lastCity?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastCountry?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reportedCount?: Prisma.IntFieldUpdateOperationsInput | number;
    isSuspicious?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    suspiciousNotes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProductUnitCreateManyManufacturerInput = {
    id?: string;
    productId: string;
    barcode: string;
    unitNumber: number;
    qrCodeData?: string | null;
    signature?: string | null;
    status?: string;
    isAuthentic?: boolean;
    firstScannedAt?: Date | string | null;
    firstScannedBy?: string | null;
    scannedCount?: number;
    lastScannedAt?: Date | string | null;
    currentOwnerId?: string | null;
    soldAt?: Date | string | null;
    soldTo?: string | null;
    lastLatitude?: number | null;
    lastLongitude?: number | null;
    geoAccuracy?: number | null;
    lastCity?: string | null;
    lastCountry?: string | null;
    reportedCount?: number;
    isSuspicious?: boolean;
    suspiciousNotes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ProductUnitUpdateWithoutManufacturerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    barcode?: Prisma.StringFieldUpdateOperationsInput | string;
    unitNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    qrCodeData?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    signature?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    isAuthentic?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    firstScannedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    firstScannedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    scannedCount?: Prisma.IntFieldUpdateOperationsInput | number;
    lastScannedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    currentOwnerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    soldAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    soldTo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastLatitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    lastLongitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    geoAccuracy?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    lastCity?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastCountry?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reportedCount?: Prisma.IntFieldUpdateOperationsInput | number;
    isSuspicious?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    suspiciousNotes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    product?: Prisma.ProductUpdateOneRequiredWithoutUnitsNestedInput;
    auditLogs?: Prisma.AuditLogUpdateManyWithoutProductUnitNestedInput;
};
export type ProductUnitUncheckedUpdateWithoutManufacturerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    barcode?: Prisma.StringFieldUpdateOperationsInput | string;
    unitNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    qrCodeData?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    signature?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    isAuthentic?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    firstScannedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    firstScannedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    scannedCount?: Prisma.IntFieldUpdateOperationsInput | number;
    lastScannedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    currentOwnerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    soldAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    soldTo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastLatitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    lastLongitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    geoAccuracy?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    lastCity?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastCountry?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reportedCount?: Prisma.IntFieldUpdateOperationsInput | number;
    isSuspicious?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    suspiciousNotes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    auditLogs?: Prisma.AuditLogUncheckedUpdateManyWithoutProductUnitNestedInput;
};
export type ProductUnitUncheckedUpdateManyWithoutManufacturerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    barcode?: Prisma.StringFieldUpdateOperationsInput | string;
    unitNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    qrCodeData?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    signature?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    isAuthentic?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    firstScannedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    firstScannedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    scannedCount?: Prisma.IntFieldUpdateOperationsInput | number;
    lastScannedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    currentOwnerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    soldAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    soldTo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastLatitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    lastLongitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    geoAccuracy?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    lastCity?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastCountry?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reportedCount?: Prisma.IntFieldUpdateOperationsInput | number;
    isSuspicious?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    suspiciousNotes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProductUnitCreateManyProductInput = {
    id?: string;
    manufacturerId: string;
    barcode: string;
    unitNumber: number;
    qrCodeData?: string | null;
    signature?: string | null;
    status?: string;
    isAuthentic?: boolean;
    firstScannedAt?: Date | string | null;
    firstScannedBy?: string | null;
    scannedCount?: number;
    lastScannedAt?: Date | string | null;
    currentOwnerId?: string | null;
    soldAt?: Date | string | null;
    soldTo?: string | null;
    lastLatitude?: number | null;
    lastLongitude?: number | null;
    geoAccuracy?: number | null;
    lastCity?: string | null;
    lastCountry?: string | null;
    reportedCount?: number;
    isSuspicious?: boolean;
    suspiciousNotes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ProductUnitUpdateWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    barcode?: Prisma.StringFieldUpdateOperationsInput | string;
    unitNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    qrCodeData?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    signature?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    isAuthentic?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    firstScannedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    firstScannedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    scannedCount?: Prisma.IntFieldUpdateOperationsInput | number;
    lastScannedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    currentOwnerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    soldAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    soldTo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastLatitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    lastLongitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    geoAccuracy?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    lastCity?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastCountry?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reportedCount?: Prisma.IntFieldUpdateOperationsInput | number;
    isSuspicious?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    suspiciousNotes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    manufacturer?: Prisma.ManufacturerUpdateOneRequiredWithoutProductUnitsNestedInput;
    auditLogs?: Prisma.AuditLogUpdateManyWithoutProductUnitNestedInput;
};
export type ProductUnitUncheckedUpdateWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    manufacturerId?: Prisma.StringFieldUpdateOperationsInput | string;
    barcode?: Prisma.StringFieldUpdateOperationsInput | string;
    unitNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    qrCodeData?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    signature?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    isAuthentic?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    firstScannedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    firstScannedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    scannedCount?: Prisma.IntFieldUpdateOperationsInput | number;
    lastScannedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    currentOwnerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    soldAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    soldTo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastLatitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    lastLongitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    geoAccuracy?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    lastCity?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastCountry?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reportedCount?: Prisma.IntFieldUpdateOperationsInput | number;
    isSuspicious?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    suspiciousNotes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    auditLogs?: Prisma.AuditLogUncheckedUpdateManyWithoutProductUnitNestedInput;
};
export type ProductUnitUncheckedUpdateManyWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    manufacturerId?: Prisma.StringFieldUpdateOperationsInput | string;
    barcode?: Prisma.StringFieldUpdateOperationsInput | string;
    unitNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    qrCodeData?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    signature?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    isAuthentic?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    firstScannedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    firstScannedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    scannedCount?: Prisma.IntFieldUpdateOperationsInput | number;
    lastScannedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    currentOwnerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    soldAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    soldTo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastLatitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    lastLongitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    geoAccuracy?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    lastCity?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastCountry?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reportedCount?: Prisma.IntFieldUpdateOperationsInput | number;
    isSuspicious?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    suspiciousNotes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
/**
 * Count Type ProductUnitCountOutputType
 */
export type ProductUnitCountOutputType = {
    auditLogs: number;
};
export type ProductUnitCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    auditLogs?: boolean | ProductUnitCountOutputTypeCountAuditLogsArgs;
};
/**
 * ProductUnitCountOutputType without action
 */
export type ProductUnitCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductUnitCountOutputType
     */
    select?: Prisma.ProductUnitCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * ProductUnitCountOutputType without action
 */
export type ProductUnitCountOutputTypeCountAuditLogsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AuditLogWhereInput;
};
export type ProductUnitSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    productId?: boolean;
    manufacturerId?: boolean;
    barcode?: boolean;
    unitNumber?: boolean;
    qrCodeData?: boolean;
    signature?: boolean;
    status?: boolean;
    isAuthentic?: boolean;
    firstScannedAt?: boolean;
    firstScannedBy?: boolean;
    scannedCount?: boolean;
    lastScannedAt?: boolean;
    currentOwnerId?: boolean;
    soldAt?: boolean;
    soldTo?: boolean;
    lastLatitude?: boolean;
    lastLongitude?: boolean;
    geoAccuracy?: boolean;
    lastCity?: boolean;
    lastCountry?: boolean;
    reportedCount?: boolean;
    isSuspicious?: boolean;
    suspiciousNotes?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    manufacturer?: boolean | Prisma.ManufacturerDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    auditLogs?: boolean | Prisma.ProductUnit$auditLogsArgs<ExtArgs>;
    _count?: boolean | Prisma.ProductUnitCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["productUnit"]>;
export type ProductUnitSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    productId?: boolean;
    manufacturerId?: boolean;
    barcode?: boolean;
    unitNumber?: boolean;
    qrCodeData?: boolean;
    signature?: boolean;
    status?: boolean;
    isAuthentic?: boolean;
    firstScannedAt?: boolean;
    firstScannedBy?: boolean;
    scannedCount?: boolean;
    lastScannedAt?: boolean;
    currentOwnerId?: boolean;
    soldAt?: boolean;
    soldTo?: boolean;
    lastLatitude?: boolean;
    lastLongitude?: boolean;
    geoAccuracy?: boolean;
    lastCity?: boolean;
    lastCountry?: boolean;
    reportedCount?: boolean;
    isSuspicious?: boolean;
    suspiciousNotes?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    manufacturer?: boolean | Prisma.ManufacturerDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["productUnit"]>;
export type ProductUnitSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    productId?: boolean;
    manufacturerId?: boolean;
    barcode?: boolean;
    unitNumber?: boolean;
    qrCodeData?: boolean;
    signature?: boolean;
    status?: boolean;
    isAuthentic?: boolean;
    firstScannedAt?: boolean;
    firstScannedBy?: boolean;
    scannedCount?: boolean;
    lastScannedAt?: boolean;
    currentOwnerId?: boolean;
    soldAt?: boolean;
    soldTo?: boolean;
    lastLatitude?: boolean;
    lastLongitude?: boolean;
    geoAccuracy?: boolean;
    lastCity?: boolean;
    lastCountry?: boolean;
    reportedCount?: boolean;
    isSuspicious?: boolean;
    suspiciousNotes?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    manufacturer?: boolean | Prisma.ManufacturerDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["productUnit"]>;
export type ProductUnitSelectScalar = {
    id?: boolean;
    productId?: boolean;
    manufacturerId?: boolean;
    barcode?: boolean;
    unitNumber?: boolean;
    qrCodeData?: boolean;
    signature?: boolean;
    status?: boolean;
    isAuthentic?: boolean;
    firstScannedAt?: boolean;
    firstScannedBy?: boolean;
    scannedCount?: boolean;
    lastScannedAt?: boolean;
    currentOwnerId?: boolean;
    soldAt?: boolean;
    soldTo?: boolean;
    lastLatitude?: boolean;
    lastLongitude?: boolean;
    geoAccuracy?: boolean;
    lastCity?: boolean;
    lastCountry?: boolean;
    reportedCount?: boolean;
    isSuspicious?: boolean;
    suspiciousNotes?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type ProductUnitOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "productId" | "manufacturerId" | "barcode" | "unitNumber" | "qrCodeData" | "signature" | "status" | "isAuthentic" | "firstScannedAt" | "firstScannedBy" | "scannedCount" | "lastScannedAt" | "currentOwnerId" | "soldAt" | "soldTo" | "lastLatitude" | "lastLongitude" | "geoAccuracy" | "lastCity" | "lastCountry" | "reportedCount" | "isSuspicious" | "suspiciousNotes" | "createdAt" | "updatedAt", ExtArgs["result"]["productUnit"]>;
export type ProductUnitInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    manufacturer?: boolean | Prisma.ManufacturerDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    auditLogs?: boolean | Prisma.ProductUnit$auditLogsArgs<ExtArgs>;
    _count?: boolean | Prisma.ProductUnitCountOutputTypeDefaultArgs<ExtArgs>;
};
export type ProductUnitIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    manufacturer?: boolean | Prisma.ManufacturerDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
};
export type ProductUnitIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    manufacturer?: boolean | Prisma.ManufacturerDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
};
export type $ProductUnitPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ProductUnit";
    objects: {
        manufacturer: Prisma.$ManufacturerPayload<ExtArgs>;
        product: Prisma.$ProductPayload<ExtArgs>;
        auditLogs: Prisma.$AuditLogPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        productId: string;
        manufacturerId: string;
        barcode: string;
        unitNumber: number;
        qrCodeData: string | null;
        signature: string | null;
        status: string;
        isAuthentic: boolean;
        firstScannedAt: Date | null;
        firstScannedBy: string | null;
        scannedCount: number;
        lastScannedAt: Date | null;
        currentOwnerId: string | null;
        soldAt: Date | null;
        soldTo: string | null;
        lastLatitude: number | null;
        lastLongitude: number | null;
        geoAccuracy: number | null;
        lastCity: string | null;
        lastCountry: string | null;
        reportedCount: number;
        isSuspicious: boolean;
        suspiciousNotes: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["productUnit"]>;
    composites: {};
};
export type ProductUnitGetPayload<S extends boolean | null | undefined | ProductUnitDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ProductUnitPayload, S>;
export type ProductUnitCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ProductUnitFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ProductUnitCountAggregateInputType | true;
};
export interface ProductUnitDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ProductUnit'];
        meta: {
            name: 'ProductUnit';
        };
    };
    /**
     * Find zero or one ProductUnit that matches the filter.
     * @param {ProductUnitFindUniqueArgs} args - Arguments to find a ProductUnit
     * @example
     * // Get one ProductUnit
     * const productUnit = await prisma.productUnit.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductUnitFindUniqueArgs>(args: Prisma.SelectSubset<T, ProductUnitFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ProductUnitClient<runtime.Types.Result.GetResult<Prisma.$ProductUnitPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one ProductUnit that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductUnitFindUniqueOrThrowArgs} args - Arguments to find a ProductUnit
     * @example
     * // Get one ProductUnit
     * const productUnit = await prisma.productUnit.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductUnitFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ProductUnitFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProductUnitClient<runtime.Types.Result.GetResult<Prisma.$ProductUnitPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first ProductUnit that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductUnitFindFirstArgs} args - Arguments to find a ProductUnit
     * @example
     * // Get one ProductUnit
     * const productUnit = await prisma.productUnit.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductUnitFindFirstArgs>(args?: Prisma.SelectSubset<T, ProductUnitFindFirstArgs<ExtArgs>>): Prisma.Prisma__ProductUnitClient<runtime.Types.Result.GetResult<Prisma.$ProductUnitPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first ProductUnit that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductUnitFindFirstOrThrowArgs} args - Arguments to find a ProductUnit
     * @example
     * // Get one ProductUnit
     * const productUnit = await prisma.productUnit.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductUnitFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ProductUnitFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProductUnitClient<runtime.Types.Result.GetResult<Prisma.$ProductUnitPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more ProductUnits that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductUnitFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProductUnits
     * const productUnits = await prisma.productUnit.findMany()
     *
     * // Get first 10 ProductUnits
     * const productUnits = await prisma.productUnit.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const productUnitWithIdOnly = await prisma.productUnit.findMany({ select: { id: true } })
     *
     */
    findMany<T extends ProductUnitFindManyArgs>(args?: Prisma.SelectSubset<T, ProductUnitFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductUnitPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a ProductUnit.
     * @param {ProductUnitCreateArgs} args - Arguments to create a ProductUnit.
     * @example
     * // Create one ProductUnit
     * const ProductUnit = await prisma.productUnit.create({
     *   data: {
     *     // ... data to create a ProductUnit
     *   }
     * })
     *
     */
    create<T extends ProductUnitCreateArgs>(args: Prisma.SelectSubset<T, ProductUnitCreateArgs<ExtArgs>>): Prisma.Prisma__ProductUnitClient<runtime.Types.Result.GetResult<Prisma.$ProductUnitPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many ProductUnits.
     * @param {ProductUnitCreateManyArgs} args - Arguments to create many ProductUnits.
     * @example
     * // Create many ProductUnits
     * const productUnit = await prisma.productUnit.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends ProductUnitCreateManyArgs>(args?: Prisma.SelectSubset<T, ProductUnitCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many ProductUnits and returns the data saved in the database.
     * @param {ProductUnitCreateManyAndReturnArgs} args - Arguments to create many ProductUnits.
     * @example
     * // Create many ProductUnits
     * const productUnit = await prisma.productUnit.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many ProductUnits and only return the `id`
     * const productUnitWithIdOnly = await prisma.productUnit.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends ProductUnitCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ProductUnitCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductUnitPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a ProductUnit.
     * @param {ProductUnitDeleteArgs} args - Arguments to delete one ProductUnit.
     * @example
     * // Delete one ProductUnit
     * const ProductUnit = await prisma.productUnit.delete({
     *   where: {
     *     // ... filter to delete one ProductUnit
     *   }
     * })
     *
     */
    delete<T extends ProductUnitDeleteArgs>(args: Prisma.SelectSubset<T, ProductUnitDeleteArgs<ExtArgs>>): Prisma.Prisma__ProductUnitClient<runtime.Types.Result.GetResult<Prisma.$ProductUnitPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one ProductUnit.
     * @param {ProductUnitUpdateArgs} args - Arguments to update one ProductUnit.
     * @example
     * // Update one ProductUnit
     * const productUnit = await prisma.productUnit.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends ProductUnitUpdateArgs>(args: Prisma.SelectSubset<T, ProductUnitUpdateArgs<ExtArgs>>): Prisma.Prisma__ProductUnitClient<runtime.Types.Result.GetResult<Prisma.$ProductUnitPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more ProductUnits.
     * @param {ProductUnitDeleteManyArgs} args - Arguments to filter ProductUnits to delete.
     * @example
     * // Delete a few ProductUnits
     * const { count } = await prisma.productUnit.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends ProductUnitDeleteManyArgs>(args?: Prisma.SelectSubset<T, ProductUnitDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more ProductUnits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductUnitUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProductUnits
     * const productUnit = await prisma.productUnit.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends ProductUnitUpdateManyArgs>(args: Prisma.SelectSubset<T, ProductUnitUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more ProductUnits and returns the data updated in the database.
     * @param {ProductUnitUpdateManyAndReturnArgs} args - Arguments to update many ProductUnits.
     * @example
     * // Update many ProductUnits
     * const productUnit = await prisma.productUnit.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more ProductUnits and only return the `id`
     * const productUnitWithIdOnly = await prisma.productUnit.updateManyAndReturn({
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
    updateManyAndReturn<T extends ProductUnitUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ProductUnitUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductUnitPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one ProductUnit.
     * @param {ProductUnitUpsertArgs} args - Arguments to update or create a ProductUnit.
     * @example
     * // Update or create a ProductUnit
     * const productUnit = await prisma.productUnit.upsert({
     *   create: {
     *     // ... data to create a ProductUnit
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProductUnit we want to update
     *   }
     * })
     */
    upsert<T extends ProductUnitUpsertArgs>(args: Prisma.SelectSubset<T, ProductUnitUpsertArgs<ExtArgs>>): Prisma.Prisma__ProductUnitClient<runtime.Types.Result.GetResult<Prisma.$ProductUnitPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of ProductUnits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductUnitCountArgs} args - Arguments to filter ProductUnits to count.
     * @example
     * // Count the number of ProductUnits
     * const count = await prisma.productUnit.count({
     *   where: {
     *     // ... the filter for the ProductUnits we want to count
     *   }
     * })
    **/
    count<T extends ProductUnitCountArgs>(args?: Prisma.Subset<T, ProductUnitCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ProductUnitCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a ProductUnit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductUnitAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ProductUnitAggregateArgs>(args: Prisma.Subset<T, ProductUnitAggregateArgs>): Prisma.PrismaPromise<GetProductUnitAggregateType<T>>;
    /**
     * Group by ProductUnit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductUnitGroupByArgs} args - Group by arguments.
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
    groupBy<T extends ProductUnitGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ProductUnitGroupByArgs['orderBy'];
    } : {
        orderBy?: ProductUnitGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ProductUnitGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductUnitGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the ProductUnit model
     */
    readonly fields: ProductUnitFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for ProductUnit.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__ProductUnitClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    manufacturer<T extends Prisma.ManufacturerDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ManufacturerDefaultArgs<ExtArgs>>): Prisma.Prisma__ManufacturerClient<runtime.Types.Result.GetResult<Prisma.$ManufacturerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    product<T extends Prisma.ProductDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProductDefaultArgs<ExtArgs>>): Prisma.Prisma__ProductClient<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    auditLogs<T extends Prisma.ProductUnit$auditLogsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProductUnit$auditLogsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
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
 * Fields of the ProductUnit model
 */
export interface ProductUnitFieldRefs {
    readonly id: Prisma.FieldRef<"ProductUnit", 'String'>;
    readonly productId: Prisma.FieldRef<"ProductUnit", 'String'>;
    readonly manufacturerId: Prisma.FieldRef<"ProductUnit", 'String'>;
    readonly barcode: Prisma.FieldRef<"ProductUnit", 'String'>;
    readonly unitNumber: Prisma.FieldRef<"ProductUnit", 'Int'>;
    readonly qrCodeData: Prisma.FieldRef<"ProductUnit", 'String'>;
    readonly signature: Prisma.FieldRef<"ProductUnit", 'String'>;
    readonly status: Prisma.FieldRef<"ProductUnit", 'String'>;
    readonly isAuthentic: Prisma.FieldRef<"ProductUnit", 'Boolean'>;
    readonly firstScannedAt: Prisma.FieldRef<"ProductUnit", 'DateTime'>;
    readonly firstScannedBy: Prisma.FieldRef<"ProductUnit", 'String'>;
    readonly scannedCount: Prisma.FieldRef<"ProductUnit", 'Int'>;
    readonly lastScannedAt: Prisma.FieldRef<"ProductUnit", 'DateTime'>;
    readonly currentOwnerId: Prisma.FieldRef<"ProductUnit", 'String'>;
    readonly soldAt: Prisma.FieldRef<"ProductUnit", 'DateTime'>;
    readonly soldTo: Prisma.FieldRef<"ProductUnit", 'String'>;
    readonly lastLatitude: Prisma.FieldRef<"ProductUnit", 'Float'>;
    readonly lastLongitude: Prisma.FieldRef<"ProductUnit", 'Float'>;
    readonly geoAccuracy: Prisma.FieldRef<"ProductUnit", 'Float'>;
    readonly lastCity: Prisma.FieldRef<"ProductUnit", 'String'>;
    readonly lastCountry: Prisma.FieldRef<"ProductUnit", 'String'>;
    readonly reportedCount: Prisma.FieldRef<"ProductUnit", 'Int'>;
    readonly isSuspicious: Prisma.FieldRef<"ProductUnit", 'Boolean'>;
    readonly suspiciousNotes: Prisma.FieldRef<"ProductUnit", 'String'>;
    readonly createdAt: Prisma.FieldRef<"ProductUnit", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"ProductUnit", 'DateTime'>;
}
/**
 * ProductUnit findUnique
 */
export type ProductUnitFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductUnit
     */
    select?: Prisma.ProductUnitSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductUnit
     */
    omit?: Prisma.ProductUnitOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ProductUnitInclude<ExtArgs> | null;
    /**
     * Filter, which ProductUnit to fetch.
     */
    where: Prisma.ProductUnitWhereUniqueInput;
};
/**
 * ProductUnit findUniqueOrThrow
 */
export type ProductUnitFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductUnit
     */
    select?: Prisma.ProductUnitSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductUnit
     */
    omit?: Prisma.ProductUnitOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ProductUnitInclude<ExtArgs> | null;
    /**
     * Filter, which ProductUnit to fetch.
     */
    where: Prisma.ProductUnitWhereUniqueInput;
};
/**
 * ProductUnit findFirst
 */
export type ProductUnitFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductUnit
     */
    select?: Prisma.ProductUnitSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductUnit
     */
    omit?: Prisma.ProductUnitOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ProductUnitInclude<ExtArgs> | null;
    /**
     * Filter, which ProductUnit to fetch.
     */
    where?: Prisma.ProductUnitWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ProductUnits to fetch.
     */
    orderBy?: Prisma.ProductUnitOrderByWithRelationInput | Prisma.ProductUnitOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ProductUnits.
     */
    cursor?: Prisma.ProductUnitWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ProductUnits from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ProductUnits.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ProductUnits.
     */
    distinct?: Prisma.ProductUnitScalarFieldEnum | Prisma.ProductUnitScalarFieldEnum[];
};
/**
 * ProductUnit findFirstOrThrow
 */
export type ProductUnitFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductUnit
     */
    select?: Prisma.ProductUnitSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductUnit
     */
    omit?: Prisma.ProductUnitOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ProductUnitInclude<ExtArgs> | null;
    /**
     * Filter, which ProductUnit to fetch.
     */
    where?: Prisma.ProductUnitWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ProductUnits to fetch.
     */
    orderBy?: Prisma.ProductUnitOrderByWithRelationInput | Prisma.ProductUnitOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ProductUnits.
     */
    cursor?: Prisma.ProductUnitWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ProductUnits from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ProductUnits.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ProductUnits.
     */
    distinct?: Prisma.ProductUnitScalarFieldEnum | Prisma.ProductUnitScalarFieldEnum[];
};
/**
 * ProductUnit findMany
 */
export type ProductUnitFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductUnit
     */
    select?: Prisma.ProductUnitSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductUnit
     */
    omit?: Prisma.ProductUnitOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ProductUnitInclude<ExtArgs> | null;
    /**
     * Filter, which ProductUnits to fetch.
     */
    where?: Prisma.ProductUnitWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ProductUnits to fetch.
     */
    orderBy?: Prisma.ProductUnitOrderByWithRelationInput | Prisma.ProductUnitOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing ProductUnits.
     */
    cursor?: Prisma.ProductUnitWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ProductUnits from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ProductUnits.
     */
    skip?: number;
    distinct?: Prisma.ProductUnitScalarFieldEnum | Prisma.ProductUnitScalarFieldEnum[];
};
/**
 * ProductUnit create
 */
export type ProductUnitCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductUnit
     */
    select?: Prisma.ProductUnitSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductUnit
     */
    omit?: Prisma.ProductUnitOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ProductUnitInclude<ExtArgs> | null;
    /**
     * The data needed to create a ProductUnit.
     */
    data: Prisma.XOR<Prisma.ProductUnitCreateInput, Prisma.ProductUnitUncheckedCreateInput>;
};
/**
 * ProductUnit createMany
 */
export type ProductUnitCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProductUnits.
     */
    data: Prisma.ProductUnitCreateManyInput | Prisma.ProductUnitCreateManyInput[];
};
/**
 * ProductUnit createManyAndReturn
 */
export type ProductUnitCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductUnit
     */
    select?: Prisma.ProductUnitSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductUnit
     */
    omit?: Prisma.ProductUnitOmit<ExtArgs> | null;
    /**
     * The data used to create many ProductUnits.
     */
    data: Prisma.ProductUnitCreateManyInput | Prisma.ProductUnitCreateManyInput[];
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ProductUnitIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * ProductUnit update
 */
export type ProductUnitUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductUnit
     */
    select?: Prisma.ProductUnitSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductUnit
     */
    omit?: Prisma.ProductUnitOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ProductUnitInclude<ExtArgs> | null;
    /**
     * The data needed to update a ProductUnit.
     */
    data: Prisma.XOR<Prisma.ProductUnitUpdateInput, Prisma.ProductUnitUncheckedUpdateInput>;
    /**
     * Choose, which ProductUnit to update.
     */
    where: Prisma.ProductUnitWhereUniqueInput;
};
/**
 * ProductUnit updateMany
 */
export type ProductUnitUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update ProductUnits.
     */
    data: Prisma.XOR<Prisma.ProductUnitUpdateManyMutationInput, Prisma.ProductUnitUncheckedUpdateManyInput>;
    /**
     * Filter which ProductUnits to update
     */
    where?: Prisma.ProductUnitWhereInput;
    /**
     * Limit how many ProductUnits to update.
     */
    limit?: number;
};
/**
 * ProductUnit updateManyAndReturn
 */
export type ProductUnitUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductUnit
     */
    select?: Prisma.ProductUnitSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductUnit
     */
    omit?: Prisma.ProductUnitOmit<ExtArgs> | null;
    /**
     * The data used to update ProductUnits.
     */
    data: Prisma.XOR<Prisma.ProductUnitUpdateManyMutationInput, Prisma.ProductUnitUncheckedUpdateManyInput>;
    /**
     * Filter which ProductUnits to update
     */
    where?: Prisma.ProductUnitWhereInput;
    /**
     * Limit how many ProductUnits to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ProductUnitIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * ProductUnit upsert
 */
export type ProductUnitUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductUnit
     */
    select?: Prisma.ProductUnitSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductUnit
     */
    omit?: Prisma.ProductUnitOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ProductUnitInclude<ExtArgs> | null;
    /**
     * The filter to search for the ProductUnit to update in case it exists.
     */
    where: Prisma.ProductUnitWhereUniqueInput;
    /**
     * In case the ProductUnit found by the `where` argument doesn't exist, create a new ProductUnit with this data.
     */
    create: Prisma.XOR<Prisma.ProductUnitCreateInput, Prisma.ProductUnitUncheckedCreateInput>;
    /**
     * In case the ProductUnit was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.ProductUnitUpdateInput, Prisma.ProductUnitUncheckedUpdateInput>;
};
/**
 * ProductUnit delete
 */
export type ProductUnitDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductUnit
     */
    select?: Prisma.ProductUnitSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductUnit
     */
    omit?: Prisma.ProductUnitOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ProductUnitInclude<ExtArgs> | null;
    /**
     * Filter which ProductUnit to delete.
     */
    where: Prisma.ProductUnitWhereUniqueInput;
};
/**
 * ProductUnit deleteMany
 */
export type ProductUnitDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which ProductUnits to delete
     */
    where?: Prisma.ProductUnitWhereInput;
    /**
     * Limit how many ProductUnits to delete.
     */
    limit?: number;
};
/**
 * ProductUnit.auditLogs
 */
export type ProductUnit$auditLogsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * ProductUnit without action
 */
export type ProductUnitDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductUnit
     */
    select?: Prisma.ProductUnitSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductUnit
     */
    omit?: Prisma.ProductUnitOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ProductUnitInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=ProductUnit.d.ts.map