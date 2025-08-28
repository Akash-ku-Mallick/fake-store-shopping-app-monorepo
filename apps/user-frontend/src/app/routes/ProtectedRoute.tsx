import { type ReactNode } from "react";
import Login from "../(public)/login";
import { useAppSelector } from "../../hooks/reduxHelper";
import { currentToken } from "../../store/slices/authSlice";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuth = useAppSelector(currentToken);
  if (!isAuth) return <Login />;

  return <>{children}</>;
}

export default ProtectedRoute;
