import { MotionProps } from "motion/react";
type CharacterSet = string[] | readonly string[];
interface HyperTextProps extends MotionProps {
    /** The text content to be animated */
    children: string;
    /** Optional className for styling */
    className?: string;
    /** Duration of the animation in milliseconds */
    duration?: number;
    /** Delay before animation starts in milliseconds */
    delay?: number;
    /** Component to render as - defaults to div */
    as?: React.ElementType;
    /** Whether to start animation when element comes into view */
    startOnView?: boolean;
    /** Whether to trigger animation on hover */
    animateOnHover?: boolean;
    /** Custom character set for scramble effect. Defaults to uppercase alphabet */
    characterSet?: CharacterSet;
}
export declare function HyperText({ children, className, duration, delay, as: Component, startOnView, animateOnHover, characterSet, ...props }: HyperTextProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map