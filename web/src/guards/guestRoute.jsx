import { Navigate } from "react-router";
import { useAuth } from "../contexts/auth-context";
import { Loading } from "../components";

export default function GuestRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
}
