import React from "react";
import { VariantProps } from "class-variance-authority";
declare const rainbowButtonVariants: any;
interface RainbowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof rainbowButtonVariants> {
    asChild?: boolean;
}
declare const RainbowButton: React.ForwardRefExoticComponent<RainbowButtonProps & React.RefAttributes<HTMLButtonElement>>;
export { RainbowButton, rainbowButtonVariants, type RainbowButtonProps };
//# sourceMappingURL=component.d.ts.map