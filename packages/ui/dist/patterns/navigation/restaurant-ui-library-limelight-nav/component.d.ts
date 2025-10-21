import React from "react";
export type NavItem = {
    id: string | number;
    icon: React.ReactElement;
    label?: string;
    onClick?: () => void;
};
export interface LimelightNavProps {
    items?: NavItem[];
    defaultActiveIndex?: number;
    onTabChange?: (index: number) => void;
    className?: string;
    limelightClassName?: string;
    iconContainerClassName?: string;
    iconClassName?: string;
}
export declare const LimelightNav: ({ items, defaultActiveIndex, onTabChange, className, limelightClassName, iconContainerClassName, iconClassName, }: LimelightNavProps) => import("react/jsx-runtime").JSX.Element | null;
export default LimelightNav;
//# sourceMappingURL=component.d.ts.map