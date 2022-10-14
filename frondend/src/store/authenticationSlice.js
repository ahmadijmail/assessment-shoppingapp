import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import jwtDecode from "jwt-decode";

export const registerUser = createAsyncThunk(
  "authentication/registerUser",
  async (userInput, { rejectWithValue }) => {
    try {
      const TokenFromApi = await axios.post(
        "http://localhost:5000/api/register",
        {
          name: userInput.name,
          email: userInput.email,
          password: userInput.password,
        }
      );
      console.log(TokenFromApi.data, "tokkk");
      localStorage.setItem("token", TokenFromApi.data);
      return TokenFromApi;
    } catch (e) {
      console.log(e.response.data);
      return rejectWithValue(e.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "authentication/loginUser",
  async (userInput, { rejectWithValue }) => {
    try {
      const TokenFromApi = await axios.post(
        "http://localhost:5000/api/login",
        {
          email: userInput.email,
          password: userInput.password,
        }
      );
      console.log(TokenFromApi.data, "tokkk");
      localStorage.setItem("token", TokenFromApi.data);
      return TokenFromApi;
    } catch (e) {
      console.log(e.response.data);
      return rejectWithValue(e.response.data);
    }

  }
);

const authenticationSlices = createSlice({

  name: "authentication",
  initialState: {
    token: localStorage.getItem("token"),
    name: "",
    email: "",
    id: "",
    registerStatus: "",
    registerError: "",
    userStatus: false,
  },

  reducers: {
    loadUserData(state,action){
      const token=state.token
      console.log(token);
      if(token){
        let decoded = jwtDecode(token);

        return {
          ...state,
          name: decoded.name,
          email: decoded.email,
          id: decoded._id,
          registerStatus: "success",
        };
      }
    },
    Logout(state,action){
      localStorage.removeItem("token")
      state.id=''
    }

    
  },
  extraReducers: {


    ////register
    [registerUser.pending]: (state, action) => {
      state.registerStatus = "pending";
    },
    [registerUser.fulfilled]: (state, action) => {
      let token = action.payload.data;
      console.log(token, "decodedd");
      if (token) {
        let decoded = jwtDecode(token);

        return {
          ...state,
          name: decoded.name,
          email: decoded.email,
          id: decoded._id,
          registerStatus: "success",
        };
      }
    },
    [registerUser.rejected]: (state, action) => {
      return {
        ...state,
        registerStatus: "rejected",
        registerError: action.payload,
      };
    },


    ///login

    [loginUser.pending]: (state, action) => {
      return {...state, LoginStatus : "pending"}
    },
    [loginUser.fulfilled]: (state, action) => {
      let token = action.payload.data;
      console.log(token, "decodedd");
      if (token) {
        let decoded = jwtDecode(token);

        return {
          ...state,
          name: decoded.name,
          email: decoded.email,
          id: decoded._id,
          LoginStatus: "success",
        };
      }
    },
    [loginUser.rejected]: (state, action) => {
      return {
        ...state,
        LoginStatus: "rejected",
        LoginError: action.payload,
      };
    },
  },
});

export const authactions = authenticationSlices.actions;

export default authenticationSlices;
