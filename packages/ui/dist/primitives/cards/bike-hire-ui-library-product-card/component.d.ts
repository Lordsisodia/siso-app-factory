export interface ProductSpec {
    label: string;
    value: string | number;
}
export interface ProductCardProps<T = any> {
    product: T;
    imageUrl: string;
    title: string;
    subtitle?: string;
    dailyRate: number;
    currency?: string;
    priceLabel?: string;
    specs: ProductSpec[];
    rating?: number;
    detailsLink?: string;
    onBookNow: (product: T) => void;
    onFavoriteToggle?: (product: T, isFavorited: boolean) => void;
    isFavorited?: boolean;
    showFavorite?: boolean;
    className?: string;
}
export declare function ProductCard<T = any>({ product, imageUrl, title, subtitle, dailyRate, currency, priceLabel, specs, rating, detailsLink, onBookNow, onFavoriteToggle, isFavorited, showFavorite, className }: ProductCardProps<T>): import("react/jsx-runtime").JSX.Element;
export default ProductCard;
//# sourceMappingURL=component.d.ts.map