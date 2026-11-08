import type { RootState } from "../../app/store";
import { createSelector } from "@reduxjs/toolkit";

export const selectCartItems = (state: RootState) => state.cart.items;

// export const selectCartTotal = (state: RootState) =>
//   state.cart.items.reduce(
//     (total, item) => total + item.price * item.quantity,
//     0,
//   );

export const selectCartTotal = createSelector([selectCartItems], (items) =>
  items.reduce((total, item) => total + item.price * item.quantity, 0),
);

export const selectCartTotalQuantity = createSelector(
  [selectCartItems],
  (items) => items.reduce((acc, curr) => acc + curr.quantity, 0),
);

export const selectCartIsEmpty = createSelector(
  [selectCartItems],
  (items) => items.length === 0,
);
