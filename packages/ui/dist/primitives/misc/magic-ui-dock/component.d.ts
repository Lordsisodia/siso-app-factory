import React, { PropsWithChildren } from "react";
import { type VariantProps } from "class-variance-authority";
import { MotionValue } from "motion/react";
import type { MotionProps } from "motion/react";
export interface DockProps extends VariantProps<typeof dockVariants> {
    className?: string;
    iconSize?: number;
    iconMagnification?: number;
    disableMagnification?: boolean;
    iconDistance?: number;
    direction?: "top" | "middle" | "bottom";
    children: React.ReactNode;
}
declare const dockVariants: any;
declare const Dock: React.ForwardRefExoticComponent<DockProps & React.RefAttributes<HTMLDivElement>>;
export interface DockIconProps extends Omit<MotionProps & React.HTMLAttributes<HTMLDivElement>, "children"> {
    size?: number;
    magnification?: number;
    disableMagnification?: boolean;
    distance?: number;
    mouseX?: MotionValue<number>;
    className?: string;
    children?: React.ReactNode;
    props?: PropsWithChildren;
}
declare const DockIcon: {
    ({ size, magnification, disableMagnification, distance, mouseX, className, children, ...props }: DockIconProps): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
export { Dock, DockIcon, dockVariants };
//# sourceMappingURL=component.d.ts.map