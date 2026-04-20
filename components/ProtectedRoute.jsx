'use client';

import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

export default function ProtectedRoute({ 
  children, 
  requireAuth = true,
  redirectTo = '/login',
  allowedRoles = [],
  fallbackPath = '/dashboard'
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);
  
  useEffect(() => {
    // Wait for session to load
    if (status === 'loading') return;
    
    // Check authentication
    if (requireAuth && !session) {
      // Store the attempted URL to redirect back after login
      sessionStorage.setItem('redirectAfterLogin', pathname);
      router.push(redirectTo);
      return;
    }
    
    // Check role-based access
    if (session && allowedRoles.length > 0) {
      const userRole = session.user?.role || 'user';
      if (!allowedRoles.includes(userRole)) {
        router.push(fallbackPath);
        return;
      }
    }
    
    // User is authorized
    setIsAuthorized(true);
  }, [session, status, router, requireAuth, redirectTo, pathname, allowedRoles, fallbackPath]);
  
  // Loading state
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  // Not authenticated
  if (requireAuth && !session) {
    return null;
  }
  
  // Role check failed
  if (session && allowedRoles.length > 0 && !allowedRoles.includes(session.user?.role)) {
    return null;
  }
  
  // Authorized - render children
  return isAuthorized ? children : null;
}