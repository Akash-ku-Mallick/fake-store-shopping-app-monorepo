import { type ReactNode } from "react";
// import { useAppSelector } from "@shared/store/hooks";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
//   const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);

//   if (!isAuthenticated) {
//     return <p className="text-center mt-10">Please login to continue.</p>;
//   }

  return <>{children}</>;
}
