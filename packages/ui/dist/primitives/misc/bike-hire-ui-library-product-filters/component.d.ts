import React from 'react';
export interface ProductFiltersProps {
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
    categories: string[];
    priceSort: 'none' | 'asc' | 'desc';
    onPriceSortChange: (sort: 'none' | 'asc' | 'desc') => void;
    onAdvancedFiltersClick?: () => void;
    onMobileFiltersClick?: () => void;
    sticky?: boolean;
    className?: string;
}
export declare const ProductFilters: React.FC<ProductFiltersProps>;
export default ProductFilters;
//# sourceMappingURL=component.d.ts.map