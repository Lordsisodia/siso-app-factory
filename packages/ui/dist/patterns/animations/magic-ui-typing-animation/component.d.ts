import { MotionProps } from "motion/react";
interface TypingAnimationProps extends MotionProps {
    children?: string;
    words?: string[];
    className?: string;
    duration?: number;
    typeSpeed?: number;
    deleteSpeed?: number;
    delay?: number;
    pauseDelay?: number;
    loop?: boolean;
    as?: React.ElementType;
    startOnView?: boolean;
    showCursor?: boolean;
    blinkCursor?: boolean;
    cursorStyle?: "line" | "block" | "underscore";
}
export declare function TypingAnimation({ children, words, className, duration, typeSpeed, deleteSpeed, delay, pauseDelay, loop, as: Component, startOnView, showCursor, blinkCursor, cursorStyle, ...props }: TypingAnimationProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map