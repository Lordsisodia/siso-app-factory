import React from 'react';
export interface Review {
    id: string;
    user_name: string;
    rating: number;
    comment?: string;
    created_at: string;
}
export interface ReviewCardProps {
    review: Review;
    className?: string;
    showAvatar?: boolean;
    avatarUrl?: string;
}
export declare const ReviewCard: React.FC<ReviewCardProps>;
export default ReviewCard;
//# sourceMappingURL=component.d.ts.map