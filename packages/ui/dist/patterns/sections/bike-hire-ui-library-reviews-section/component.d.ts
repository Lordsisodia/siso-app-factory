import React from 'react';
import { Spec } from '../../grids/SpecsGrid';
export interface ReviewsSectionProps {
    productId: string;
    fetchReviews: (productId: string) => Promise<any[]>;
    fetchAverageRating?: (productId: string) => Promise<{
        average: number;
        count: number;
    }>;
    specs?: Spec[];
    showSpecsTab?: boolean;
    specsTitle?: string;
    className?: string;
}
export declare const ReviewsSection: React.FC<ReviewsSectionProps>;
export default ReviewsSection;
//# sourceMappingURL=component.d.ts.map