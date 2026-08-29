import { Navigate } from "react-router";
import { useAuth } from "../contexts/auth-context";

export default function PrivateRoute({ children, allowedRole }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && !allowedRole.includes(user.type)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
