import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import { authApi } from "@shared/api/authApi";
import { productsApi } from "@shared/api/productsApi";
import { cartsApi } from "@shared/api/cartsApi";
import { usersApi } from "@shared/api/usersApi";
import { categoriesApi } from "@shared/api/categoriesApi";
import { profileApi } from "./services/profileApi";
import { paymentApi } from "./services/paymentApis";

import authReducer from "./slices/authSlice";
import myProfile from "./slices/myProfile";
import myCart from "./slices/myCart";

// 🔹 persist config for specific slices
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "myCart"], // only persist these
};

// 🔹 Combine reducers
const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [productsApi.reducerPath]: productsApi.reducer,
  [cartsApi.reducerPath]: cartsApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
  [profileApi.reducerPath]: profileApi.reducer,
  [categoriesApi.reducerPath]: categoriesApi.reducer,
  [paymentApi.reducerPath]: paymentApi.reducer,
  auth: authReducer,
  myProfile: myProfile,
  myCart: myCart,
});

// 🔹 Wrap rootReducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist
    })
      .concat(authApi.middleware)
      .concat(productsApi.middleware)
      .concat(cartsApi.middleware)
      .concat(usersApi.middleware)
      .concat(profileApi.middleware)
      .concat(paymentApi.middleware)
      .concat(categoriesApi.middleware),
});

export const persistor = persistStore(store);
