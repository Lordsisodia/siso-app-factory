import { ElementType, ReactNode } from "react";
export interface VideoTextProps {
    /**
     * The video source URL
     */
    src: string;
    /**
     * Additional className for the container
     */
    className?: string;
    /**
     * Whether to autoplay the video
     */
    autoPlay?: boolean;
    /**
     * Whether to mute the video
     */
    muted?: boolean;
    /**
     * Whether to loop the video
     */
    loop?: boolean;
    /**
     * Whether to preload the video
     */
    preload?: "auto" | "metadata" | "none";
    /**
     * The content to display (will have the video "inside" it)
     */
    children: ReactNode;
    /**
     * Font size for the text mask (in viewport width units)
     * @default 10
     */
    fontSize?: string | number;
    /**
     * Font weight for the text mask
     * @default "bold"
     */
    fontWeight?: string | number;
    /**
     * Text anchor for the text mask
     * @default "middle"
     */
    textAnchor?: string;
    /**
     * Dominant baseline for the text mask
     * @default "middle"
     */
    dominantBaseline?: string;
    /**
     * Font family for the text mask
     * @default "sans-serif"
     */
    fontFamily?: string;
    /**
     * The element type to render for the text
     * @default "div"
     */
    as?: ElementType;
}
export declare function VideoText({ src, children, className, autoPlay, muted, loop, preload, fontSize, fontWeight, textAnchor, dominantBaseline, fontFamily, as: Component, }: VideoTextProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=component.d.ts.map