import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const productsFetch = createAsyncThunk(
  "products/productsFetch",
  async () => {
    const response =await axios.get("http://localhost:5000/api/products");
   // console.log(response, "Slice");
    return response?.data;
    
  }
);


export const addProduct = createAsyncThunk(
  "authentication/addProduct",
  async (userInput, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/products",
        userInput
      );
     
      return response.data
    } catch (e) {
      console.log(e.response.data);
      return rejectWithValue(e.response.data);
    }
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
    ///addproduct

    [addProduct.pending]: (state, action) => {
      state.status = "pending";
    },
    [addProduct.fulfilled]: (state, action) => {
      state.items.push(action.payload) 
      state.status = "success";
    },
    [addProduct.rejected]: (state, action) => {
      state.status = "rejected";
    },
  },
});

export default productsSlices.reducer;
