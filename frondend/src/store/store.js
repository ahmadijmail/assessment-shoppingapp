import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import productsSlices, { productsFetch } from "./productSlices";
import authenticationSlices from "./authenticationSlice";

const store = configureStore({
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    products: productsSlices,
    cart: cartSlice.reducer,
    auth: authenticationSlices.reducer,
  },
});

export default store;
