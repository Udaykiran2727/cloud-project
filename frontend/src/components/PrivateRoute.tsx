// src/components/PrivateRoute.tsx

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }: { children?: React.ReactNode }) => {
  const { token } = useSelector((state: any) => state.user); // Access JWT token from Redux

  // If there's no token, the user is not authenticated, so redirect to login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children ? children : <Outlet />;
};

export default PrivateRoute;
