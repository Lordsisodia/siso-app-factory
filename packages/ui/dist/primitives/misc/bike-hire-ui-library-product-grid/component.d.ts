import React from 'react';
export interface ProductGridProps<T = any> {
    products: T[];
    renderCard: (product: T, index: number) => React.ReactNode;
    columns?: {
        sm?: number;
        md?: number;
        lg?: number;
    };
    gap?: number;
    animated?: boolean;
    className?: string;
}
export declare function ProductGrid<T = any>({ products, renderCard, columns, gap, animated, className }: ProductGridProps<T>): import("react/jsx-runtime").JSX.Element;
export default ProductGrid;
//# sourceMappingURL=component.d.ts.map