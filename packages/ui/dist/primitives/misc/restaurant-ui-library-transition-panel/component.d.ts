import React from 'react';
import { Transition, Variant, MotionProps } from 'framer-motion';
type TransitionPanelProps = {
    children: React.ReactNode[];
    className?: string;
    transition?: Transition;
    activeIndex: number;
    variants?: {
        enter: Variant;
        center: Variant;
        exit: Variant;
    };
} & MotionProps;
export declare function TransitionPanel({ children, className, transition, variants, activeIndex, ...motionProps }: TransitionPanelProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map