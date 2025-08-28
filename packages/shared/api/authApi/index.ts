import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserType } from "./type";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APP_URL,
  }),
  endpoints: (builder) => ({
    login: builder.mutation<{ token: string, message: string, user: UserType }, { email?: string; password: string, phoneNumber?: string, countryCode?: string }>({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    registerEmail: builder.mutation<{ message: string, user: UserType }, { email: string; password: string }>({
      query: (credentials) => ({
        url: "auth/register-email",
        method: "POST",
        body: credentials,
      }),
    }),
    verifyEmail: builder.mutation<{ message: string, user: UserType, authToken: string }, { userId: string; otp: string }>({
      query: (credentials) => ({
        url: "auth/verify-email",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { 
  useLoginMutation,
  useRegisterEmailMutation,
  useVerifyEmailMutation
 } = authApi;
