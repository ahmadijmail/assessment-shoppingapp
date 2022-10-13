import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import 'react-toastify/dist/ReactToastify.css'
import {ToastContainer} from 'react-toastify'
import Home from "./components/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import Cart from "./components/Cart/Cart";
import Notfound from "./components/PageNotFound/Notfound";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
