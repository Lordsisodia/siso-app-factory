import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
declare const bannerVariants: any;
type BannerProps = React.ComponentProps<'div'> & VariantProps<typeof bannerVariants> & {
    title: string;
    description?: string;
    icon?: React.ReactNode;
    showShade?: boolean;
    show?: boolean;
    onHide?: () => void;
    action?: React.ReactNode;
    closable?: boolean;
    autoHide?: number;
};
export declare function Banner({ variant, size, title, description, icon, showShade, show, onHide, action, closable, className, autoHide, ...props }: BannerProps): import("react/jsx-runtime").JSX.Element | null;
export {};
//# sourceMappingURL=component.d.ts.map