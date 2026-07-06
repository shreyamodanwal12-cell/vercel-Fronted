import { Navigate } from "react-router-dom";

export default function VendorProtectedRoute({ children }) {
  const token = localStorage.getItem("VENDOR_TOKEN");

  if (!token) {
    return <Navigate to="/vendor/login" replace />;
  }

  return children;
}