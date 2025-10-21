import React from 'react';
export interface AdditionalFee {
    label: string;
    amount: number;
}
export interface PricingSidebarProps {
    price: number;
    priceLabel?: string;
    currency?: string;
    additionalFees?: AdditionalFee[];
    onBook: () => void;
    bookButtonText?: string;
    disclaimer?: string;
    sticky?: boolean;
    className?: string;
}
export declare const PricingSidebar: React.FC<PricingSidebarProps>;
export default PricingSidebar;
//# sourceMappingURL=component.d.ts.map