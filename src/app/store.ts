import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import productsReducer from "../features/products/productsSlice";
import { loggerMiddleware } from "./loggerMiddleware";
import { productsApi } from '../features/products/productsApi';
import { demoApi } from '../features/demo/demoApi';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [demoApi.reducerPath]: demoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(loggerMiddleware)
      .concat(productsApi.middleware)
      .concat(demoApi.middleware),
});

// Тип усього Redux state
export type RootState = ReturnType<typeof store.getState>;

// Тип dispatch
export type AppDispatch = typeof store.dispatch;
