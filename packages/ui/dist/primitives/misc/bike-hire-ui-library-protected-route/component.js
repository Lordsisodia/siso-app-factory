import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Navigate, useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
export const ProtectedRoute = ({ children, isAuthenticated, isLoading = false, redirectTo = '/auth', loadingMessage = 'Verifying your authentication...' }) => {
    const location = useLocation();
    // If auth is still loading, show loading
    if (isLoading) {
        return (_jsxs("div", { className: "min-h-screen flex flex-col items-center justify-center", children: [_jsx(Loader2, { className: "h-12 w-12 animate-spin text-primary" }), _jsx("p", { className: "mt-4 text-muted-foreground", children: loadingMessage })] }));
    }
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
        return _jsx(Navigate, { to: redirectTo, state: { from: location.pathname }, replace: true });
    }
    // Render children if authenticated
    return _jsx(_Fragment, { children: children });
};
export default ProtectedRoute;
//# sourceMappingURL=component.js.map