import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import processQueryParams from "@shared/utils/processQueryParams";
import { getProductsPayloadType, Product } from "./type";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], getProductsPayloadType>({
      query: (args) => ({
        url: "products/",
        params: processQueryParams(args)

      }),
      serializeQueryArgs: ({ endpointName }) => {
        // Cache per `title` so that different titles don't overwrite each other
        return endpointName;
      },
      merge: (currentCache, newItems, { arg }) => {
        if (arg.offset === 0) {
          // reset when title changes or offset starts from 0
          return newItems;
        }
        return [...currentCache, ...newItems];
      },
      forceRefetch({ currentArg, previousArg }) {
        // Refetch if title changes
        return currentArg?.title !== previousArg?.title;
      },
      providesTags: ["Products"],
    }),
    getProductById: builder.query<Product, number>({
      query: (id) => `products/${id}`,
      providesTags: (result, error, id) => [{ type: "Products", id }],
    }),
    addProduct: builder.mutation<Product, Partial<Product>>({
      query: (body) => ({
        url: "products",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Products"],
    }),
    updateProduct: builder.mutation<Product, { id: number; data: Partial<Product> }>({
      query: ({ id, data }) => ({
        url: `products/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Products", id }],
    }),
    deleteProduct: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({
        url: `products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;
