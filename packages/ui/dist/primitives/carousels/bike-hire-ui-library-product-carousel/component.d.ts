import React from 'react';
export interface ProductCarouselProps<T = any> {
    products: T[];
    renderItem: (product: T) => React.ReactNode;
    itemsPerSlide?: {
        sm?: number;
        md?: number;
        lg?: number;
    };
    loop?: boolean;
    showControls?: boolean;
    className?: string;
}
export declare function ProductCarousel<T = any>({ products, renderItem, itemsPerSlide, loop, showControls, className }: ProductCarouselProps<T>): import("react/jsx-runtime").JSX.Element;
export default ProductCarousel;
//# sourceMappingURL=component.d.ts.map