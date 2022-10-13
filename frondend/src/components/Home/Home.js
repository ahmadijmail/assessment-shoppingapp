import React, { useEffect, useState } from "react";

import { productsFetch } from "../../store/productSlices";
import { useSelector, useDispatch } from "react-redux";
import {cartActions } from "../../store/cartSlice"
import "./home.scss";
const Home = () => {
  const dispatch = useDispatch();
  const datas = useSelector((data) => data.products.items);

  const handelAddtoCart = (product)=>{
    dispatch(cartActions.addtoCart(product))
}
  useEffect(() => {
    dispatch(productsFetch());
  }, []);
  //console.log(datas);
  return (
    <>
      <div className="products">
        {datas?.map((product) => (
          <div key={product.id} className="product">
            <h3>{product.name}</h3>
            <img
              src={product.image}
              alt={product.name}
              style={{ height: "150px", width: "150px" }}
            />
            <div className="details">
              <span>{product.description}</span>
              <span className="price">${product.price}</span>
            </div>
            <button onClick={()=>handelAddtoCart(product)}>Add To Cart</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
