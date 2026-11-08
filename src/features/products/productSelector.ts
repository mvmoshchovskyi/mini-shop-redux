import type { RootState } from "../../app/store";
import { productsAdapter } from "./productsSlice";

// Усі селектори для products живуть в одному місці.
// selectAll, selectById, selectIds, selectTotal створює createEntityAdapter.
export const productsSelectors = productsAdapter.getSelectors<RootState>(
  (state) => state.products,
);

// Стани завантаження не належать adapter, тому описуємо їх окремо.
export const selectProductsLoading = (state: RootState) =>
  state.products.productsLoading;

export const selectProductsError = (state: RootState) => state.products.error;

export const selectSelectedProduct = (state: RootState) =>
  state.products.selectedProduct;
