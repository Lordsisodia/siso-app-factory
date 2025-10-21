import React from 'react';
export interface RecentlyViewedProps<T = any> {
    renderItem: (product: T) => React.ReactNode;
    storageKey?: string;
    title?: string;
    icon?: React.ReactNode;
    backgroundColor?: string;
    maxItems?: number;
    className?: string;
}
export declare function RecentlyViewed<T = any>({ renderItem, storageKey, title, icon, backgroundColor, maxItems, className }: RecentlyViewedProps<T>): import("react/jsx-runtime").JSX.Element | null;
export default RecentlyViewed;
//# sourceMappingURL=component.d.ts.map