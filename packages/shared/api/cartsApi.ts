import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Cart {
  id: number;
  userId: number;
  date: string;
  products: { productId: number; quantity: number }[];
}

export const cartsApi = createApi({
  reducerPath: "cartsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  tagTypes: ["Carts"],
  endpoints: (builder) => ({
    getCarts: builder.query<Cart[], void>({
      query: () => "carts",
      providesTags: ["Carts"],
    }),
    getCartByUser: builder.query<Cart[], number>({
      query: (userId) => `carts/user/${userId}`,
      providesTags: (result, error, id) => [{ type: "Carts", id }],
    }),
    addCart: builder.mutation<Cart, Partial<Cart>>({
      query: (body) => ({
        url: "carts",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Carts"],
    }),
    deleteCart: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({
        url: `carts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Carts"],
    }),
  }),
});

export const {
  useGetCartsQuery,
  useGetCartByUserQuery,
  useAddCartMutation,
  useDeleteCartMutation,
} = cartsApi;
