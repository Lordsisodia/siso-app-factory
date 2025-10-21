import React from "react";
import { type MotionProps } from "motion/react";
interface ShinyButtonProps extends Omit<React.HTMLAttributes<HTMLElement>, keyof MotionProps>, MotionProps {
    children: React.ReactNode;
    className?: string;
}
export declare const ShinyButton: React.ForwardRefExoticComponent<ShinyButtonProps & React.RefAttributes<HTMLButtonElement>>;
export {};
//# sourceMappingURL=component.d.ts.map