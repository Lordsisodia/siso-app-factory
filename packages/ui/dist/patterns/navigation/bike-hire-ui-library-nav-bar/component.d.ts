import React from 'react';
export interface NavLink {
    label: string;
    href: string;
    authRequired?: boolean;
}
export interface NavBarProps {
    brandName?: string;
    brandLogo?: React.ReactNode;
    navLinks?: NavLink[];
    user?: {
        email?: string;
        avatar?: string;
    } | null;
    onSignOut?: () => void;
    onSignIn?: () => void;
    showAuthButton?: boolean;
    className?: string;
}
export declare const NavBar: React.FC<NavBarProps>;
export default NavBar;
//# sourceMappingURL=component.d.ts.map