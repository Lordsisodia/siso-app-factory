import React from 'react';
export interface RoleBasedRouteProps {
    children: React.ReactNode;
    isAuthenticated: boolean;
    hasRequiredRole: boolean;
    isLoading?: boolean;
    redirectTo?: string;
    fallbackRedirect?: string;
    loadingMessage?: string;
    unauthorizedMessage?: string;
    onUnauthorized?: () => void;
}
export declare const RoleBasedRoute: React.FC<RoleBasedRouteProps>;
export default RoleBasedRoute;
//# sourceMappingURL=component.d.ts.map