import React from 'react';
export interface PopularProductsProps<T = any> {
    products: T[];
    badge?: string;
    heading: string;
    description?: string;
    renderCarousel: (products: T[]) => React.ReactNode;
    backgroundColor?: string;
    className?: string;
}
export declare function PopularProducts<T = any>({ products, badge, heading, description, renderCarousel, backgroundColor, className }: PopularProductsProps<T>): import("react/jsx-runtime").JSX.Element;
export default PopularProducts;
//# sourceMappingURL=component.d.ts.map