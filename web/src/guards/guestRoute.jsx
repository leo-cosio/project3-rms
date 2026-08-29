import { Navigate } from "react-router";
import { useAuth } from "../contexts/auth-context";

export default function GuestRoute({ children }) {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
}
