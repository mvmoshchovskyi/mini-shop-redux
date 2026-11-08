import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';

import type { Product } from '../../types/product';
import { demoServer } from './demoServer';

export interface DemoApiError {
  message: string;
}

export interface UpdateProductArgs {
  id: number;
  changes: Partial<Product>;
  simulateError?: boolean;
}

const toDemoError = (error: unknown): DemoApiError => ({
  message:
    error instanceof Error ? error.message : 'Unknown fake server error',
});

const fetchProducts = async (): Promise<
  { data: Product[] } | { error: DemoApiError }
> => {
  try {
    return { data: await demoServer.getProducts() };
  } catch (error) {
    return { error: toDemoError(error) };
  }
};

const updateProductOnServer = async ({
  id,
  changes,
  simulateError,
}: UpdateProductArgs): Promise<{ data: Product } | { error: DemoApiError }> => {
  try {
    return {
      data: await demoServer.updateProduct(id, changes, simulateError),
    };
  } catch (error) {
    return { error: toDemoError(error) };
  }
};

const providesProductTags = (result: Product[] | undefined) => {
  if (!result) {
    return [{ type: 'Products' as const, id: 'LIST' }];
  }

  return [
    ...result.map((product) => ({
      type: 'Products' as const,
      id: product.id,
    })),
    { type: 'Products' as const, id: 'LIST' },
  ];
};

const patchProduct = (
  draft: Product[],
  id: number,
  changes: Partial<Product>,
) => {
  const product = draft.find((item) => item.id === id);

  if (product) {
    Object.assign(product, changes);
  }
};

export const demoApi = createApi({
  reducerPath: 'demoApi',
  baseQuery: fakeBaseQuery<DemoApiError>(),
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    // Always-mounted query used by the product list on this page.
    getProducts: builder.query<Product[], void>({
      queryFn: fetchProducts,
      providesTags: providesProductTags,
      keepUnusedDataFor: 60,
    }),

    // Probe with the same caching rules as getProducts, but with
    // no other subscribers, so unmounting it shows the cache lifetime.
    getProductsCached: builder.query<Product[], void>({
      queryFn: fetchProducts,
      providesTags: providesProductTags,
      keepUnusedDataFor: 60,
    }),

    // keepUnusedDataFor: 0 removes the entry as soon as the last
    // subscriber unmounts. Remounting starts from isLoading again.
    getProductsNoCache: builder.query<Product[], void>({
      queryFn: fetchProducts,
      providesTags: providesProductTags,
      keepUnusedDataFor: 0,
    }),

    // Optimistic mutation: patch every product cache immediately,
    // then undo the patches if the fake server rejects the request.
    updateProduct: builder.mutation<Product, UpdateProductArgs>({
      queryFn: updateProductOnServer,
      onQueryStarted: async (
        { id, changes },
        { dispatch, queryFulfilled },
      ) => {
        const patches = [
          dispatch(
            demoApi.util.updateQueryData('getProducts', undefined, (draft) =>
              patchProduct(draft, id, changes),
            ),
          ),
          dispatch(
            demoApi.util.updateQueryData(
              'getProductsCached',
              undefined,
              (draft) => patchProduct(draft, id, changes),
            ),
          ),
          dispatch(
            demoApi.util.updateQueryData(
              'getProductsNoCache',
              undefined,
              (draft) => patchProduct(draft, id, changes),
            ),
          ),
        ];

        try {
          await queryFulfilled;
        } catch {
          patches.forEach((patch) => patch.undo());
        }
      },
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Products', id },
      ],
    }),

    // Server-first mutation: the cache is not touched until the
    // request succeeds and invalidated tags trigger a refetch.
    updateProductPessimistic: builder.mutation<Product, UpdateProductArgs>({
      queryFn: updateProductOnServer,
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Products', id },
      ],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductsCachedQuery,
  useGetProductsNoCacheQuery,
  useUpdateProductMutation,
  useUpdateProductPessimisticMutation,
} = demoApi;
