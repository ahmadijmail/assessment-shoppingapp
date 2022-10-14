import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const productsFetch = createAsyncThunk(
  "products/productsFetch",
  async () => {
    const response = await axios.get("http://localhost:5000/api/products");
    console.log(response.data, "Slice");
    return response?.data;
  }
);

export const addProduct = createAsyncThunk(
  "authentication/addProduct",
  async (userInput, { rejectWithValue }) => {
    console.log(userInput, "userinput");
    try {
      const response = await axios.post(
        "http://localhost:5000/api/products",
        userInput
      );

      return response.data;
    } catch (e) {
      console.log(e.response.data);
      return rejectWithValue(e.response.data);
    }
  }
);

export const editProduct = createAsyncThunk(
  "authentication/addProduct",
  async (userInput, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/products/${userInput.id}`,
        { name:userInput.name,
          description:userInput.description,
          price:userInput.price,
          image: userInput.image,
         }
      );

      return response.data;
    } catch (e) {
      console.log(e.response.data);
      return rejectWithValue(e.response.data);
    }
  }
);


export const deleteProduct = createAsyncThunk(
  "authentication/addProduct",
  async (id, { rejectWithValue }) => {
    console.log(id, "iddd");
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/products/${id}`
      );

      return response.data;
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
      state.items.push(action.payload);
      state.status = "success";
    },
    [addProduct.rejected]: (state, action) => {
      state.status = "rejected";
    },
  },
});

export default productsSlices.reducer;
