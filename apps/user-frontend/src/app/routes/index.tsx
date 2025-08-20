import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "./ProtectedRoute";
import { userRoutes } from "./userRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: userRoutes.map((route) => ({
      index: route.index,
      path: route.path,
      element: route.isProtected ? (
        <ProtectedRoute>{route.element}</ProtectedRoute>
      ) : (
        route.element
      ),
    })),
  },
]);

export default router