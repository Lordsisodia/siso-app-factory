import type React from "react";
type GradientBackgroundProps = React.ComponentProps<"div"> & {
    gradients?: string[];
    animationDuration?: number;
    animationDelay?: number;
    enableCenterContent?: boolean;
    overlay?: boolean;
    overlayOpacity?: number;
};
export declare function GradientBackground({ children, className, gradients, animationDuration, animationDelay, overlay, overlayOpacity, }: GradientBackgroundProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map