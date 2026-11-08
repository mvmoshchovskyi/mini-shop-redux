import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Product } from "../../types/product";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://fakestoreapi.com/",
  }),
  refetchOnMountOrArgChange: 60,
  tagTypes: ["Products"],

  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => "products",
      providesTags: (result) => {
        if (!result) {
          return [{ type: "Products", id: "LIST" }];
        }

        const productTags = result.map((product) => ({
          type: "Products" as const,
          id: product.id,
        }));

        return [...productTags, { type: "Products", id: "LIST" }];
      },
      keepUnusedDataFor: 300,
    }),
    addProduct: builder.mutation<Product, Partial<Product>>({
      query: (newProduct) => ({
        url: "products",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["Products"],
    }),
    updateProduct: builder.mutation<
      Product,
      { id: number; updatedProduct: Partial<Product> }
    >({
      query: ({ id, updatedProduct }) => ({
        url: `products/${id}`,
        method: "PUT",
        body: updatedProduct,
      }),
      invalidatesTags: (_result, _error, arg) => {
        return [{ type: "Products", id: arg.id }];
      },
    }),
  }),
});

export const {
  useGetProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
} = productsApi;
