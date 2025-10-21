import { RefObject } from "react";
export interface AnimatedBeamProps {
    className?: string;
    containerRef: RefObject<HTMLElement | null>;
    fromRef: RefObject<HTMLElement | null>;
    toRef: RefObject<HTMLElement | null>;
    curvature?: number;
    reverse?: boolean;
    pathColor?: string;
    pathWidth?: number;
    pathOpacity?: number;
    gradientStartColor?: string;
    gradientStopColor?: string;
    delay?: number;
    duration?: number;
    startXOffset?: number;
    startYOffset?: number;
    endXOffset?: number;
    endYOffset?: number;
}
export declare const AnimatedBeam: React.FC<AnimatedBeamProps>;
//# sourceMappingURL=component.d.ts.map