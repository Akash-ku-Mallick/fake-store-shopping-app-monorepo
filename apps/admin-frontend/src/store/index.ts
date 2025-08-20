import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "@shared/api/authApi";
import { productsApi } from "@shared/api/productsApi";
import { cartsApi } from "@shared/api/cartsApi";
import { usersApi } from "@shared/api/usersApi";
import authReducer from "@shared/store/authSlice";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [cartsApi.reducerPath]: cartsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(productsApi.middleware)
      .concat(cartsApi.middleware)
      .concat(usersApi.middleware),
});