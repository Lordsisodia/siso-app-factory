import { MotionProps } from "motion/react";
interface LineShadowTextProps extends Omit<React.HTMLAttributes<HTMLElement>, keyof MotionProps>, MotionProps {
    shadowColor?: string;
    as?: React.ElementType;
}
export declare function LineShadowText({ children, shadowColor, className, as: Component, ...props }: LineShadowTextProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map