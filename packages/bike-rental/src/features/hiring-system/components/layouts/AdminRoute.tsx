
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../hooks/use-toast';

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { user, loading, isAdmin } = useAuth();
  const location = useLocation();
  const { toast } = useToast();

  console.log('AdminRoute: user =', user, 'loading =', loading, 'isAdmin =', isAdmin);

  useEffect(() => {
    if (user && !loading && !isAdmin) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access the admin area.",
        variant: "destructive"
      });
    }
  }, [user, loading, isAdmin, toast]);

  // If auth is still loading, show loading
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">
          Verifying your permissions...
        </p>
      </div>
    );
  }

  // If user is not authenticated, redirect to login
  if (!user) {
    console.log('User not signed in, redirecting to auth page from:', location.pathname);
    return <Navigate to="/auth" state={{ from: location.pathname }} replace />;
  }

  // If user is not an admin, redirect to dashboard
  if (!isAdmin) {
    console.log('User is not an admin, redirecting to dashboard');
    return <Navigate to="/dashboard" replace />;
  }

  // Render children if the user is an admin
  console.log('User is admin, rendering admin content');
  return <>{children}</>;
};

export default AdminRoute;
