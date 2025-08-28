import { createBrowserRouter, type RouteObject } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "./ProtectedRoute";
import { userRoutes, type AppRoute } from "./userRoutes";

export const transformRoutes = (routes: AppRoute[]): RouteObject[] => {
  return routes.map<RouteObject>((route) => {
    // If it's an index route, remove path
    if (route.index) {
      return {
        index: true,
        element: route.isProtected ? (
          <ProtectedRoute>{route.element}</ProtectedRoute>
        ) : (
          route.element
        ),
      };
    }

    // Normal route
    return {
      path: route.path,
      element: route.isProtected ? (
        <ProtectedRoute>{route.element}</ProtectedRoute>
      ) : (
        route.element
      ),
      children: route.children ? transformRoutes(route.children) : undefined,
    };
  });
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: transformRoutes(userRoutes),
  },
]);

export default router;
