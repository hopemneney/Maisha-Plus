import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../lib/auth';

interface ProtectedRouteProps {
  requiredRole?: 'admin' | 'user';
  requiredRoles?: string[];
}

export default function ProtectedRoute({ requiredRole, requiredRoles }: ProtectedRouteProps) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const getRedirectPath = (role: string) => {
    if (role === 'admin') return '/admin';
    if (['accountant', 'secretary', 'chairman'].includes(role)) return '/staff';
    return '/dashboard';
  };

  if (requiredRoles && !requiredRoles.includes(user.role)) {
    return <Navigate to={getRedirectPath(user.role)} replace />;
  }

  if (requiredRole && user.role !== requiredRole && !requiredRoles) {
    return <Navigate to={getRedirectPath(user.role)} replace />;
  }

  return <Outlet />;
}
