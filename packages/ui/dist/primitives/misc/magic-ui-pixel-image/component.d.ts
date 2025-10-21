type Grid = {
    rows: number;
    cols: number;
};
declare const DEFAULT_GRIDS: Record<string, Grid>;
type PredefinedGridKey = keyof typeof DEFAULT_GRIDS;
interface PixelImageProps {
    src: string;
    grid?: PredefinedGridKey;
    customGrid?: Grid;
    grayscaleAnimation?: boolean;
    pixelFadeInDuration?: number;
    maxAnimationDelay?: number;
    colorRevealDelay?: number;
}
export declare const PixelImage: ({ src, grid, grayscaleAnimation, pixelFadeInDuration, maxAnimationDelay, colorRevealDelay, customGrid, }: PixelImageProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map