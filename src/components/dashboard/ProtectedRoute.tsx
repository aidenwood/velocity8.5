import React, { useEffect } from 'react';
import { useAuth } from './AuthProvider';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      window.location.href = '/dashboard/login';
    }
  }, [user, loading]);

  // Render children immediately so skeleton loaders show while auth loads.
  // Only block render after we've confirmed there's no user.
  if (!loading && !user) {
    return null;
  }

  return <>{children}</>;
}
