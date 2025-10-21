import React, { ComponentPropsWithoutRef } from "react";
export interface ShimmerButtonProps extends ComponentPropsWithoutRef<"button"> {
    shimmerColor?: string;
    shimmerSize?: string;
    borderRadius?: string;
    shimmerDuration?: string;
    background?: string;
    className?: string;
    children?: React.ReactNode;
}
export declare const ShimmerButton: React.ForwardRefExoticComponent<ShimmerButtonProps & React.RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=component.d.ts.map