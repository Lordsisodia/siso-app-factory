import { MotionProps } from "motion/react";
interface AnimatedSpanProps extends MotionProps {
    children: React.ReactNode;
    delay?: number;
    className?: string;
    startOnView?: boolean;
}
export declare const AnimatedSpan: ({ children, delay, className, startOnView, ...props }: AnimatedSpanProps) => import("react/jsx-runtime").JSX.Element;
interface TypingAnimationProps extends MotionProps {
    children: string;
    className?: string;
    duration?: number;
    delay?: number;
    as?: React.ElementType;
    startOnView?: boolean;
}
export declare const TypingAnimation: ({ children, className, duration, delay, as: Component, startOnView, ...props }: TypingAnimationProps) => import("react/jsx-runtime").JSX.Element;
interface TerminalProps {
    children: React.ReactNode;
    className?: string;
    sequence?: boolean;
    startOnView?: boolean;
}
export declare const Terminal: ({ children, className, sequence, startOnView, }: TerminalProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map