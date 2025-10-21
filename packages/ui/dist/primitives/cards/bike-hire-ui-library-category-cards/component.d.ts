import React from 'react';
export interface Category {
    name: string;
    image: string;
    description?: string;
    href: string;
    count?: number;
}
export interface CategoryCardsProps {
    categories: Category[];
    columns?: {
        sm?: number;
        md?: number;
        lg?: number;
    };
    cardHeight?: string;
    showCTA?: boolean;
    ctaText?: string;
    className?: string;
}
export declare const CategoryCards: React.FC<CategoryCardsProps>;
export default CategoryCards;
//# sourceMappingURL=component.d.ts.map