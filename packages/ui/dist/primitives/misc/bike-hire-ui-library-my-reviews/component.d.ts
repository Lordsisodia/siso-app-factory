import React from 'react';
export interface EligibleBooking {
    id: string;
    productId: string;
    productName: string;
    productImage?: string;
    startDate: string;
    endDate: string;
}
export interface MyReviewsProps {
    fetchEligibleBookings: () => Promise<EligibleBooking[]>;
    onReviewSubmit: (bookingId: string, productId: string, rating: number, comment?: string) => Promise<void>;
    onReviewSuccess?: () => void;
    className?: string;
}
export declare const MyReviews: React.FC<MyReviewsProps>;
export default MyReviews;
//# sourceMappingURL=component.d.ts.map