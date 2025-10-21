import React from 'react';
export interface SidebarItem {
    icon: React.ComponentType<any>;
    label: string;
    href: string;
}
export interface DashboardLayoutProps {
    children: React.ReactNode;
    sidebarItems: SidebarItem[];
    brandName?: string;
    brandLogo?: React.ReactNode;
    user?: {
        email?: string;
        avatar?: string;
    };
    onSignOut?: () => void;
    profileLink?: string;
    className?: string;
}
export declare const DashboardLayout: React.FC<DashboardLayoutProps>;
export default DashboardLayout;
//# sourceMappingURL=component.d.ts.map