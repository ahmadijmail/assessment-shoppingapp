import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import productsSlices, { productsFetch } from "./productSlices";

const store = configureStore({
  reducer: {
    products: productsSlices,
    cart:cartSlice.reducer
  },
});



export default store;
