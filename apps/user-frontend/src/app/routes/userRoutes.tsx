import Home from "../(public)/home";
import ProductDetails from "../(public)/products/[id]";
import Login from "../(public)/login";
import Register from "../(public)/register";
import Cart from "../(private)/cart";
import Checkout from "../(private)/checkout";
import Profile from "../(private)/profile";
import type { JSX } from "react";

export interface AppRoute {
  path?: string;
  element: JSX.Element;
  isProtected?: boolean;
  index?: boolean;
}

export const userRoutes: AppRoute[] = [
  {
    index: true,
    element: <Home />,
    isProtected: false,
  },
  {
    path: "products/:id",
    element: <ProductDetails />,
    isProtected: false,
  },
  {
    path: "login",
    element: <Login />,
    isProtected: false,
  },
  {
    path: "register",
    element: <Register />,
    isProtected: false,
  },
  {
    path: "cart",
    element: <Cart />,
    isProtected: true,
  },
  {
    path: "checkout",
    element: <Checkout />,
    isProtected: true,
  },
  {
    path: "profile",
    element: <Profile />,
    isProtected: true,
  },
];
