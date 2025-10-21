import React from 'react';
export interface Review {
    id: string;
    user_name: string;
    rating: number;
    comment?: string;
    created_at: string;
}
export interface ReviewsListProps {
    productId: string;
    fetchReviews: (productId: string) => Promise<Review[]>;
    fetchAverageRating?: (productId: string) => Promise<{
        average: number;
        count: number;
    }>;
    emptyMessage?: string;
    className?: string;
}
export declare const ReviewsList: React.FC<ReviewsListProps>;
export default ReviewsList;
//# sourceMappingURL=component.d.ts.map