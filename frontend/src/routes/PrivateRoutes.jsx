import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../components/common/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();
  if (!user) {
    // Si la ruta es de admin, redirige a /admin/login, si no a /login
    const isAdmin = location.pathname.startsWith('/admin');
    return <Navigate to={isAdmin ? '/admin/login' : '/login'} replace />;
  }
  return children;
};

export default PrivateRoute;
