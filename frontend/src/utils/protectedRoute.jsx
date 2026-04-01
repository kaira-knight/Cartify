import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Replace this later with real auth logic (JWT, context, etc.)
  const isAuthenticated = localStorage.getItem("token");

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;