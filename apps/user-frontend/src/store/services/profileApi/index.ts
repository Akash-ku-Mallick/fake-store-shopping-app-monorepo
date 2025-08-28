import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../../type";
import type { myProfileInterface } from "./type";

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth?.access_token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["UserProfile"],
  endpoints: (builder) => ({
    getMyProfile: builder.query<myProfileInterface, void>({
      query: () => "auth/profile",
      providesTags: ["UserProfile"],
    }),
  }),
});

export const { useGetMyProfileQuery } = profileApi;
