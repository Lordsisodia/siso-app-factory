interface OptimizedVideoProps {
    src: string;
    cloudinaryId?: string;
    className?: string;
    poster?: string;
    autoPlay?: boolean;
    muted?: boolean;
    loop?: boolean;
    controls?: boolean;
    width?: number;
    height?: number;
    lazy?: boolean;
    objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
    onLoadStart?: () => void;
    onLoadedData?: () => void;
    onError?: (error: any) => void;
}
/**
 * OptimizedVideo component
 * Renders an optimized video with lazy loading and poster image support
 */
export declare function OptimizedVideo({ src, cloudinaryId, className, poster, autoPlay, muted, loop, controls, width, height, lazy, objectFit, onLoadStart, onLoadedData, onError }: OptimizedVideoProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map