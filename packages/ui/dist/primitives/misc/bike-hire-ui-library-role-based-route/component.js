import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Navigate, useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
export const RoleBasedRoute = ({ children, isAuthenticated, hasRequiredRole, isLoading = false, redirectTo = '/auth', fallbackRedirect = '/dashboard', loadingMessage = 'Verifying your permissions...', onUnauthorized }) => {
    const location = useLocation();
    // If auth is still loading, show loading
    if (isLoading) {
        return (_jsxs("div", { className: "min-h-screen flex flex-col items-center justify-center", children: [_jsx(Loader2, { className: "h-12 w-12 animate-spin text-primary" }), _jsx("p", { className: "mt-4 text-muted-foreground", children: loadingMessage })] }));
    }
    // If user is not authenticated, redirect to login
    if (!isAuthenticated) {
        return _jsx(Navigate, { to: redirectTo, state: { from: location.pathname }, replace: true });
    }
    // If user doesn't have required role, redirect to fallback
    if (!hasRequiredRole) {
        if (onUnauthorized) {
            onUnauthorized();
        }
        return _jsx(Navigate, { to: fallbackRedirect, replace: true });
    }
    // Render children if authenticated and has role
    return _jsx(_Fragment, { children: children });
};
export default RoleBasedRoute;
//# sourceMappingURL=component.js.map