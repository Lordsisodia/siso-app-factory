import { CSSProperties } from "react";
interface AnimationConfig {
    preview?: boolean;
    scale: number;
    speed: number;
}
interface NoiseConfig {
    opacity: number;
    scale: number;
}
interface ShadowOverlayProps {
    sizing?: "fill" | "stretch";
    color?: string;
    animation?: AnimationConfig;
    noise?: NoiseConfig;
    style?: CSSProperties;
    className?: string;
}
export declare function Component({ sizing, color, animation, noise, style, className, }: ShadowOverlayProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map