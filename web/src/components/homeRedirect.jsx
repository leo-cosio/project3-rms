import { Navigate } from "react-router";
import { useAuth } from "../contexts/auth-context";
import Loading from "./loading";

export default function HomeRedirect() {
  const { user, loading } = useAuth();

  if (loading) return <Loading />;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.type === "admin") {
    return <Navigate to="/admin" replace />;
  }

  if (user.type === "staff") {
    return <Navigate to="/tables" replace />;
  }

  if (user.type === "reception") {
    return <Navigate to="/recepcion" replace />;
  }

  return <Navigate to="/login" replace />;
}
