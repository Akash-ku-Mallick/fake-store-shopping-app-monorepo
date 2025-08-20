import { type ReactNode } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/type";
import Login from "../(public)/login";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuth = useSelector((state: RootState) => !!state.auth.token);
  if (!isAuth) return <Login />;

  return <>{children}</>;
}

export default ProtectedRoute;
