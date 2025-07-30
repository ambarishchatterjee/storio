// ProtectedRoute.js
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuthContext()

  if (!user || !user.token) {
    return (<Navigate to="/login" />);
  }

  return children;
};

export default ProtectedRoute;
