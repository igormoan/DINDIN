import { Navigate } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";

interface AuthenticatedRouteProps {
  e: React.ReactNode;
}

export default function AuthenticatedRoute({ e }: AuthenticatedRouteProps) {
  const { user, isLogging } = useAuth();
  if (isLogging) {
    return null;
  }

  if (user && !isLogging) {
    return <>{e}</>;
  } else {
    return <Navigate to="/" replace />;
  }
}
