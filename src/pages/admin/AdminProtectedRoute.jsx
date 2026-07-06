import { Navigate } from "react-router-dom";

export default function AdminProtectedRoute({ children }) {
  const token = localStorage.getItem("IBID_ADMIN_TOKEN");

  if (!token) {
    return <Navigate to="/admin" replace />;
  }

  return children;
}