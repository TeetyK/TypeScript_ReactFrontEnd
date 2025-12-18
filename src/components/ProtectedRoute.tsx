
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute: React.FC = () => {
  const { token, isLoading } = useAuth();

  if (isLoading) {
    // You can render a loading spinner here if you want
    return <div>Loading...</div>;
  }

  return token ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
