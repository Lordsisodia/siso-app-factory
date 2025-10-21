import React from "react";
import { HTMLMotionProps } from "motion/react";
interface AnimatedSubscribeButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
    subscribeStatus?: boolean;
    children: React.ReactNode;
    className?: string;
}
export declare const AnimatedSubscribeButton: React.ForwardRefExoticComponent<Omit<AnimatedSubscribeButtonProps, "ref"> & React.RefAttributes<HTMLButtonElement>>;
export {};
//# sourceMappingURL=component.d.ts.map