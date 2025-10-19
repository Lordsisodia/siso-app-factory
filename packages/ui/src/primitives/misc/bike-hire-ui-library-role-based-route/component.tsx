import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

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

export const RoleBasedRoute: React.FC<RoleBasedRouteProps> = ({
  children,
  isAuthenticated,
  hasRequiredRole,
  isLoading = false,
  redirectTo = '/auth',
  fallbackRedirect = '/dashboard',
  loadingMessage = 'Verifying your permissions...',
  onUnauthorized
}) => {
  const location = useLocation();

  // If auth is still loading, show loading
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">
          {loadingMessage}
        </p>
      </div>
    );
  }

  // If user is not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location.pathname }} replace />;
  }

  // If user doesn't have required role, redirect to fallback
  if (!hasRequiredRole) {
    if (onUnauthorized) {
      onUnauthorized();
    }
    return <Navigate to={fallbackRedirect} replace />;
  }

  // Render children if authenticated and has role
  return <>{children}</>;
};

export default RoleBasedRoute;
