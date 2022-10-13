import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const productsFetch = createAsyncThunk(
  "products/productsFetch",
  async () => {
    const response =await axios.get("http://localhost:5000/products");
   // console.log(response, "Slice");
    return response?.data;
    
  }
);

const productsSlices = createSlice({
  name: "products",
  initialState: {
    items: [],
    status: null,
  },

  reducers: {},

  extraReducers: {
    [productsFetch.pending]: (state, action) => {
      state.status = "pending";
    },
    [productsFetch.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "success";
    },
    [productsFetch.rejected]: (state, action) => {
      state.status = "rejected";
    },
  },
});

export default productsSlices.reducer;
