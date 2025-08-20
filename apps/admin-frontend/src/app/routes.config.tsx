import { lazy } from "react";
import { type RouteObject } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import PrivateLayout from "./layouts/PrivateLayout";
import ProtectedRoute from "./layouts/ProtectedRoute";

// lazy pages
const Login = lazy(() => import("./(public)/login"));
const Dashboard = lazy(() => import("./(private)/dashboard"));
const Users = lazy(() => import("./(private)/users"));
const Orders = lazy(() => import("./(private)/orders"));
const Products = lazy(() => import("./(private)/products"));
const Settings = lazy(() => import("./(private)/settings"));

export const routes: RouteObject[] = [
  {
    path: "/login",
    element: (
      <PublicLayout>
        <Login />
      </PublicLayout>
    ),
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <PrivateLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "users", element: <Users /> },
      { path: "orders", element: <Orders /> },
      { path: "products", element: <Products /> },
      { path: "settings", element: <Settings /> },
    ],
  },
  {
    path: "*",
    element: <Dashboard />, // or <Navigate to="/dashboard" />
  },
];
