import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoutes() {
  const isAuthenticated = localStorage.getItem("CDS1-token");

  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
}

export default ProtectedRoutes;
