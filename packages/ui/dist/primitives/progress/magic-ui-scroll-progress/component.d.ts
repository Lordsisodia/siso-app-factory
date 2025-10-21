import { MotionProps } from "motion/react";
interface ScrollProgressProps extends Omit<React.HTMLAttributes<HTMLElement>, keyof MotionProps> {
    ref?: React.Ref<HTMLDivElement>;
}
export declare function ScrollProgress({ className, ref, ...props }: ScrollProgressProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map