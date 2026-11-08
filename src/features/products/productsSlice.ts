import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";

import type { Product } from "../../types/product";
// import { products } from "../../data/products";
import { createEntityAdapter } from "@reduxjs/toolkit";

export const productsAdapter = createEntityAdapter<Product>();



interface ProductsExtraState {
  selectedProduct: Product | null;
  productsLoading: boolean;
  productLoading: boolean;
  productsByCategoryLoading: boolean;
  error: string | null;
}

// getInitialState() створює початкову структуру:
// {
//   ids: [],
//   entities: {}
// }
// а ми додаємо до неї власні властивості.
const initialState = productsAdapter.getInitialState<ProductsExtraState>({
  selectedProduct: null,
  productsLoading: false,
  productLoading: false,
  productsByCategoryLoading: false,
  error: null,
});

export const fetchProducts = createAsyncThunk<
  Product[],
  void,
  { rejectValue: string }
>("products/fetchProducts", async (_, { rejectWithValue }) => {
  const response = await fetch("https://fakestoreapi.com/products");

  if (!response.ok) {
    return rejectWithValue("Failed to fetch products");
  }

  return (await response.json()) as Product[];
});

export const fetchProductById = createAsyncThunk<Product, number>(
  "products/fetchProductById",
  async (id) => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);

    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }

    return (await response.json()) as Product;
  },
);

export const fetchProductsByCategory = createAsyncThunk<
  Product[],
  string,
  { rejectValue: string }
>("products/fetchProductsByCategory", async (category, { rejectWithValue }) => {
  const response = await fetch(
    `https://fakestoreapi.com/products/category/${category}`,
  );

  if (!response.ok) {
    return rejectWithValue("Failed to fetch products by category");
  }

  return (await response.json()) as Product[];
});

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // setAll замінює весь набір товарів: ids та entities перезаписуються.
    setProducts: (state, action: PayloadAction<Product[]>) => {
      productsAdapter.setAll(state, action.payload);
    },

    // removeAll очищає і ids, і entities.
    clearProducts: (state) => {
      productsAdapter.removeAll(state);
    },

    // addOne додає один товар у нормалізоване сховище.
    productAdded: (state, action: PayloadAction<Product>) => {
      productsAdapter.addOne(state, action.payload);
    },

    // updateOne приймає { id, changes } і оновлює лише потрібні поля.
    productUpdated: (
      state,
      action: PayloadAction<{ id: number; changes: Partial<Product> }>,
    ) => {
      productsAdapter.updateOne(state, action.payload);
    },

    // removeOne видаляє товар за id.
    productRemoved: (state, action: PayloadAction<number>) => {
      productsAdapter.removeOne(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.productsLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.productsLoading = false;
        // state.items = action.payload;
        productsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.productsLoading = false;
        state.error = action.payload ?? "Unknown error";
      })
      .addCase(fetchProductById.pending, (state) => {
        state.productLoading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.productLoading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.productLoading = false;
        state.error = action.error.message ?? "Unknown error";
      })
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.productsByCategoryLoading = true;
        state.error = null;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.productsByCategoryLoading = false;
        // state.items = action.payload;
        productsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.productsByCategoryLoading = false;
        state.error = action.payload ?? "Unknown error";
      });
  },
});
export const {
  setProducts,
  clearProducts,
  productAdded,
  productUpdated,
  productRemoved,
} = productsSlice.actions;

export default productsSlice.reducer;
