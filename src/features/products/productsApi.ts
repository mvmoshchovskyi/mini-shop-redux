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
      invalidatesTags: [{ type: "Products", id: "LIST" }],
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

      //Optimistic Update
      //  queryFulfilled Promise, який повідомляє, чи успішно завершився запит до сервера.
      onQueryStarted: async (
        { id, updatedProduct },
        { dispatch, queryFulfilled },
      ) => {
        const patchResult = dispatch(
          // updateQueryData — утиліта RTK Query, яка дозволяє вручну змінити дані в кеші конкретного query.
          productsApi.util.updateQueryData(
            "getProducts",
            undefined,
            // draft — це масив товарів із кешу getProducts.
            (draft) => {
              const product = draft.find((item) => item.id === id);

              // Завдяки Immer можемо змінювати product.price напряму
              if (product && updatedProduct.price !== undefined) {
                product.price = updatedProduct.price;
              }
            },
          ),
        );
        try {
          await queryFulfilled;
        } catch {
          // метод undo(), дозволяє скасувати внесені зміни.
          patchResult.undo();
        }
      },
      // Після цієї mutation дані товару з таким id можуть бути застарілими.
      invalidatesTags: (_result, _error, { id }) => [{ type: "Products", id }],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
} = productsApi;
