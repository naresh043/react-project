import React from "react";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ element, isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return element;
};
