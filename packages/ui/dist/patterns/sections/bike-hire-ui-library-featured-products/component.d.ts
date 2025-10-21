import React from 'react';
export interface FeaturedProductsProps<T = any> {
    products: T[];
    badge?: string;
    heading: string;
    description?: string;
    maxProducts?: number;
    viewAllLink?: string;
    viewAllText?: string;
    renderCard: (product: T) => React.ReactNode;
    backgroundColor?: string;
    className?: string;
}
export declare function FeaturedProducts<T = any>({ products, badge, heading, description, maxProducts, viewAllLink, viewAllText, renderCard, backgroundColor, className }: FeaturedProductsProps<T>): import("react/jsx-runtime").JSX.Element;
export default FeaturedProducts;
//# sourceMappingURL=component.d.ts.map