import React from "react";
interface Position {
    /** The x coordinate of the lens */
    x: number;
    /** The y coordinate of the lens */
    y: number;
}
interface LensProps {
    /** The children of the lens */
    children: React.ReactNode;
    /** The zoom factor of the lens */
    zoomFactor?: number;
    /** The size of the lens */
    lensSize?: number;
    /** The position of the lens */
    position?: Position;
    /** The default position of the lens */
    defaultPosition?: Position;
    /** Whether the lens is static */
    isStatic?: boolean;
    /** The duration of the animation */
    duration?: number;
    /** The color of the lens */
    lensColor?: string;
    /** The aria label of the lens */
    ariaLabel?: string;
}
export declare function Lens({ children, zoomFactor, lensSize, isStatic, position, defaultPosition, duration, lensColor, ariaLabel, }: LensProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map