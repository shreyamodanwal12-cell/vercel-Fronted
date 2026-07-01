import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
   const vendor = localStorage.getItem("VENDOR_TOKEN");

  if (!vendor) {
    return <Navigate to="/vendor/login" replace />;
  }

  return children;
};

export default ProtectedRoute;