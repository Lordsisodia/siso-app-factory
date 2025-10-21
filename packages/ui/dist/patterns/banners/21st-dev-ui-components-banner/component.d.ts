import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const bannerVariants: any;
interface BannerProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof bannerVariants> {
    icon?: React.ReactNode;
    action?: React.ReactNode;
    onClose?: () => void;
    isClosable?: boolean;
    layout?: "row" | "center" | "complex";
}
declare const Banner: React.ForwardRefExoticComponent<BannerProps & React.RefAttributes<HTMLDivElement>>;
export { Banner, type BannerProps };
//# sourceMappingURL=component.d.ts.map