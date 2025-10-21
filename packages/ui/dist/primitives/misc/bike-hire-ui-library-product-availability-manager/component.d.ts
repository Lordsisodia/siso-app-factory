import React from 'react';
export interface UnavailablePeriod {
    id?: string;
    startDate: string;
    endDate: string;
    reason: string;
}
export interface ProductAvailabilityManagerProps {
    productId: string;
    productName: string;
    fetchUnavailablePeriods: (productId: string) => Promise<UnavailablePeriod[]>;
    onMarkUnavailable: (productId: string, start: Date, end: Date, reason: string) => Promise<void>;
    onRemovePeriod?: (periodId: string) => Promise<void>;
    reasonOptions?: string[];
    customReasonLabel?: string;
    className?: string;
}
export declare const ProductAvailabilityManager: React.FC<ProductAvailabilityManagerProps>;
export default ProductAvailabilityManager;
//# sourceMappingURL=component.d.ts.map