import { ComponentPropsWithoutRef } from "react";
import { Transition, Variants } from "motion/react";
interface SpinningTextProps extends ComponentPropsWithoutRef<"div"> {
    children: string | string[];
    duration?: number;
    reverse?: boolean;
    radius?: number;
    transition?: Transition;
    variants?: {
        container?: Variants;
        item?: Variants;
    };
}
export declare function SpinningText({ children, duration, reverse, radius, transition, variants, className, style, }: SpinningTextProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map