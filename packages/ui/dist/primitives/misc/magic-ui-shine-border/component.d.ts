import * as React from "react";
interface ShineBorderProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Width of the border in pixels
     * @default 1
     */
    borderWidth?: number;
    /**
     * Duration of the animation in seconds
     * @default 14
     */
    duration?: number;
    /**
     * Color of the border, can be a single color or an array of colors
     * @default "#000000"
     */
    shineColor?: string | string[];
}
/**
 * Shine Border
 *
 * An animated background border effect component with configurable properties.
 */
export declare function ShineBorder({ borderWidth, duration, shineColor, className, style, ...props }: ShineBorderProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map