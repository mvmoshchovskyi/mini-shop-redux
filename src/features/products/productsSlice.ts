import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { Product } from '../../types/product';
import { products } from '../../data/products';

interface ProductsState {
  items: Product[];
}

const initialState: ProductsState = {
  items: products,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
    },

    clearProducts: (state) => {
      state.items = [];
    },
  },
});

export const { setProducts, clearProducts } = productsSlice.actions;

export default productsSlice.reducer;
