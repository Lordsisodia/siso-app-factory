interface OptimizedImageProps {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    className?: string;
    priority?: boolean;
    cloudinaryId?: string;
    fill?: boolean;
    sizes?: string;
    quality?: number;
    loading?: "eager" | "lazy";
}
/**
 * OptimizedImage component
 * Renders an optimized image using either Cloudinary (preferred) or fallbacks to standard URLs
 */
export declare function OptimizedImage({ src, alt, width, height, className, priority, cloudinaryId, fill, sizes, quality, loading }: OptimizedImageProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map