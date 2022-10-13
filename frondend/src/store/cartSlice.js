import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartlist: [],
    carttotalquantity: 0,
    totalPrices: 0,
  },

  reducers: {
    addtoCart(state, action) {
      const newItem = action.payload;
      // state.cartlist.push(newItem)

      const existingItem = state.cartlist.find(
        (item) => item.id === newItem.id
      );

      if (existingItem) {
        existingItem.CartQuantity++;
      } else {
        let existadd = { ...action.payload, CartQuantity: 1 };
        state.cartlist.push(existadd);
      }
      state.carttotalquantity++;
      state.totalPrices += newItem.price;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
