import React from 'react';
export interface AdminSidebarItem {
    icon: React.ComponentType<any>;
    label: string;
    href: string;
    badge?: number;
}
export interface AdminLayoutProps {
    children: React.ReactNode;
    sidebarItems: AdminSidebarItem[];
    brandName?: string;
    brandLogo?: React.ReactNode;
    user?: {
        email?: string;
        avatar?: string;
        firstName?: string;
        lastName?: string;
    };
    onSignOut?: () => void;
    profileLink?: string;
    className?: string;
}
export declare const AdminLayout: React.FC<AdminLayoutProps>;
export default AdminLayout;
//# sourceMappingURL=component.d.ts.map