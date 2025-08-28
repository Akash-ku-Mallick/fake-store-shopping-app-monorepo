// src/features/categoriesApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Product } from "../productsApi/type";

// Category type
export interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
  creationAt: string;
  updatedAt: string;
}


export const categoriesApi = createApi({
  reducerPath: "categoriesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  endpoints: (builder) => ({
    // ✅ Get all categories
    getCategories: builder.query<Category[], void>({
      query: () => `categories`,
    }),

    // ✅ Get category by ID
    getCategoryById: builder.query<Category, number>({
      query: (id) => `/api/v1/categories/${id}`,
    }),

    // ✅ Get products of a category by categoryId
    getCategoryProducts: builder.query<Product[], number>({
      query: (id) => `/api/v1/categories/${id}/products`,
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useGetCategoryProductsQuery,
} = categoriesApi;
