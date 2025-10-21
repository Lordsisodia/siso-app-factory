import React from 'react';
export interface ProtectedRouteProps {
    children: React.ReactNode;
    isAuthenticated: boolean;
    isLoading?: boolean;
    redirectTo?: string;
    loadingMessage?: string;
}
export declare const ProtectedRoute: React.FC<ProtectedRouteProps>;
export default ProtectedRoute;
//# sourceMappingURL=component.d.ts.map