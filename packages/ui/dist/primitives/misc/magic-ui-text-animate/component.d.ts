import { ElementType } from "react";
import { MotionProps, Variants } from "motion/react";
type AnimationType = "text" | "word" | "character" | "line";
type AnimationVariant = "fadeIn" | "blurIn" | "blurInUp" | "blurInDown" | "slideUp" | "slideDown" | "slideLeft" | "slideRight" | "scaleUp" | "scaleDown";
interface TextAnimateProps extends MotionProps {
    /**
     * The text content to animate
     */
    children: string;
    /**
     * The class name to be applied to the component
     */
    className?: string;
    /**
     * The class name to be applied to each segment
     */
    segmentClassName?: string;
    /**
     * The delay before the animation starts
     */
    delay?: number;
    /**
     * The duration of the animation
     */
    duration?: number;
    /**
     * Custom motion variants for the animation
     */
    variants?: Variants;
    /**
     * The element type to render
     */
    as?: ElementType;
    /**
     * How to split the text ("text", "word", "character")
     */
    by?: AnimationType;
    /**
     * Whether to start animation when component enters viewport
     */
    startOnView?: boolean;
    /**
     * Whether to animate only once
     */
    once?: boolean;
    /**
     * The animation preset to use
     */
    animation?: AnimationVariant;
    /**
     * Whether to enable accessibility features (default: true)
     */
    accessible?: boolean;
}
export declare const TextAnimate: import("react").MemoExoticComponent<({ children, delay, duration, variants, className, segmentClassName, as: Component, startOnView, once, by, animation, accessible, ...props }: TextAnimateProps) => import("react/jsx-runtime").JSX.Element>;
export {};
//# sourceMappingURL=component.d.ts.map