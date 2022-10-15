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
      : 0,
    totalPrices: localStorage.getItem("totalPrices")
      ? JSON.parse(localStorage.getItem("totalPrices"))
      : 0,
  },

  reducers: {
    addtoCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.cartlist.find(
        (item) => item._id === newItem._id
      );

      if (existingItem) {
        existingItem.CartQuantity++;
        toast.info(`${action.payload.name} Added To Cart`, {
          position: "bottom-left",
        });
      } else {
        let newItem = {
          ...action.payload,
          CartQuantity: 1,
        };

        state.cartlist.push(newItem);
        toast.success(`${action.payload.name} Added To Cart`, {
          position: "bottom-left",
        });
      }
      state.totalPrices += parseInt(newItem.price);
      state.carttotalquantity++;
      localStorage.setItem("cartItems", JSON.stringify(state.cartlist));
      localStorage.setItem("totalPrices", JSON.stringify(state.totalPrices));
      localStorage.setItem(
        "cartnumbers",
        JSON.stringify(state.carttotalquantity)
      );
    },

    clearCart(state, action) {
      state.cartlist = [];
      localStorage.setItem("cartItems", JSON.stringify(state.cartlist));
      localStorage.removeItem("cartnumbers");
      localStorage.removeItem("totalPrices");
      window.location.reload();
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
