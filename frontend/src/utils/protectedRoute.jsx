import { Navigate } from "react-router-dom";

// Temporary fake auth check
// Later we'll connect this to Redux
const isAuthenticated = () => {
  return localStorage.getItem("userInfo");
};

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;