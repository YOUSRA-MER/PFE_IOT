"use client";
import { useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { apiService } from '@/services/api';

interface RouteGuardProps {
  children: ReactNode;
  requiredRoles: string[];
}

const RouteGuard = ({ children, requiredRoles }: RouteGuardProps) => {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Vérifier l'authentification
    if (!apiService.isAuthenticated()) {
      console.log("Non authentifié, redirection vers login");
      router.push('/');
      return;
    }

    // Vérifier les rôles
    const userRoles = apiService.getUserRoles();
    console.log("Rôles utilisateur:", userRoles);
    console.log("Rôles requis:", requiredRoles);

    const hasRequiredRole = requiredRoles.some(role => userRoles.includes(role));
    if (!hasRequiredRole) {
      console.log("Rôle non autorisé, redirection");
      router.push('/');
      return;
    }

    setAuthorized(true);
    setLoading(false);
  }, [router, requiredRoles]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return authorized ? <>{children}</> : null;
};

export default RouteGuard;