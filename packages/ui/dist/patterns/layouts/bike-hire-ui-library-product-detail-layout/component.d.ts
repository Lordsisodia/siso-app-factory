import React from 'react';
export interface ProductDetailLayoutProps<T = any> {
    product: T;
    imageUrl: string;
    title: string;
    subtitle?: string;
    category?: string;
    backLink?: {
        href: string;
        label: string;
    };
    sidebar: React.ReactNode;
    children?: React.ReactNode;
    similarProducts?: React.ReactNode;
    className?: string;
}
export declare function ProductDetailLayout<T = any>({ product, imageUrl, title, subtitle, category, backLink, sidebar, children, similarProducts, className }: ProductDetailLayoutProps<T>): import("react/jsx-runtime").JSX.Element;
export default ProductDetailLayout;
//# sourceMappingURL=component.d.ts.map