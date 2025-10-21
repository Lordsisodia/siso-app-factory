import React from 'react';
export interface AdditionalFee {
    label: string;
    amount: number;
}
export interface ReservationSummaryProps {
    startDate?: Date;
    endDate?: Date;
    pricePerDay: number;
    currency?: string;
    calculateTotal?: (days: number, pricePerDay: number) => number;
    additionalFees?: AdditionalFee[];
    showDuration?: boolean;
    className?: string;
}
export declare const ReservationSummary: React.FC<ReservationSummaryProps>;
export default ReservationSummary;
//# sourceMappingURL=component.d.ts.map