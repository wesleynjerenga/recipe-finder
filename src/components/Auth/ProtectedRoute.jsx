import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const userRole = localStorage.getItem('userRole');
  return userRole === 'admin' ? children : <Navigate to="/" />;
};

export default ProtectedRoute;