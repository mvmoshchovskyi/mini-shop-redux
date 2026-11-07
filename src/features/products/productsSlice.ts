import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";

import type { Product } from "../../types/product";
import { products } from "../../data/products";

interface ProductsState {
  selectedProduct: Product | null;
  items: Product[];
  productsLoading: boolean;
  productLoading: boolean;
  productsByCategoryLoading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  selectedProduct: null,
  items: products,
  productsLoading: false,
  productLoading: false,
  productsByCategoryLoading: false,
  error: null,
};

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
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
    },

    clearProducts: (state) => {
      state.items = [];
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
        state.items = action.payload;
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
        state.items = action.payload;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.productsByCategoryLoading = false;
        state.error = action.payload ?? "Unknown error";
      });
  },
});

export const { setProducts, clearProducts } = productsSlice.actions;

export default productsSlice.reducer;
