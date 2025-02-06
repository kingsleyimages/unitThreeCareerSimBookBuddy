import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// protecting routes based on login status;  if logged in go to where they want else go to signup.
function ProtectedRoute() {
  const getToken = () => localStorage.getItem('token');
  return <>{getToken() ? <Outlet /> : <Navigate to="/signup" />}</>;
}

export default ProtectedRoute;
