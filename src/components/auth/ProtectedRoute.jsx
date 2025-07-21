import React from 'react';
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const decoded = JSON.parse(atob(token.split('.')[1]));
    console.log('Decoded token in ProtectedRoute:', decoded);

    if (decoded.isAdmin) {
      return children;
    } else {
      return <Navigate to="/login" />;
    }
  } catch (error) {
    console.error('Failed to decode token', error);
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
