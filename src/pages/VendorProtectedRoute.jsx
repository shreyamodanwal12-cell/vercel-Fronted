import { Navigate } from "react-router-dom";

export default function VendorProtectedRoute({ children }) {
  const vendorId = localStorage.getItem("VENDOR_ID");

  if (!vendorId) {
    return <Navigate to="/vendor/login" replace />;
  }

  return children;
}