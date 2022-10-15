import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Home from "./components/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import Cart from "./components/Cart/Cart";
import Notfound from "./components/PageNotFound/Notfound";
import Register from "./components/authentication/register";
import { authactions } from "./store/authenticationSlice";
import { useDispatch } from "react-redux";
import AddProduct from "./components/addProduct/addProduct";
import Login from "./components/authentication/login";
import MyProducts from "./components/addProduct/myProducts";
import Dashboard from "./components/addProduct/sideBar";
import { productsFetch } from "./store/productSlices";
import Product from "./components/addProduct/product";
import EditProduct from "./components/addProduct/editProducts";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();

  dispatch(authactions.loadUserData());
  dispatch(productsFetch());

  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer />
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="home/:id" element={<Product />} />
          <Route path="/addproduct" element={<Dashboard />}>
            <Route path="add" element={<AddProduct />} />
            <Route path="myproducts" element={<MyProducts />} />
            <Route path=":id" element={<EditProduct />} />
           
          </Route>
          <Route path="*" element={<Notfound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
