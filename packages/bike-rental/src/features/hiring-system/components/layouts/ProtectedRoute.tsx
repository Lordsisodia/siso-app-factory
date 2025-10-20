
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  console.log('ProtectedRoute: user =', user, 'loading =', loading);
  console.log('ProtectedRoute: current location =', location.pathname);

  // If auth is still loading, show loading
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">
          Verifying your authentication...
        </p>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    console.log('User not signed in, redirecting to auth page from:', location.pathname);
    return <Navigate to="/auth" state={{ from: location.pathname }} replace />;
  }

  // Render children if authenticated
  console.log('User is authenticated, rendering protected content');
  return <>{children}</>;
};

export default ProtectedRoute;
