import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartlist: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
    carttotalquantity: localStorage.getItem("cartnumbers")
    ? JSON.parse(localStorage.getItem("cartnumbers"))
    : [],
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
        existingItem.price+=newItem.price;
        toast.info(`${action.payload.name} Added To Cart`,{ position:"bottom-left"})
      } else {
        let existadd = { ...action.payload, CartQuantity: 1, totalprice:action.payload.price };
        state.cartlist.push(existadd);
        toast.success(`${action.payload.name} Added To Cart`,{ position:"bottom-left"})
        state.carttotalquantity++;
        state.totalPrices += newItem.price;
      }
     
      localStorage.setItem("cartItems", JSON.stringify(state.cartlist ));
      
      localStorage.setItem("cartnumbers", JSON.stringify(state.carttotalquantity));
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
