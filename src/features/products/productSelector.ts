import type { RootState } from "../../app/store";
import { productsAdapter } from "./productsSlice";

export const productsSelectors = productsAdapter.getSelectors<RootState>(
  (state) => state.products,
);
