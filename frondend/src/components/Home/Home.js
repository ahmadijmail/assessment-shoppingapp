import React, { useEffect, useState } from "react";
import { productsFetch } from "../../store/productSlices";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../../store/cartSlice";
import { Link } from "react-router-dom";
import styled from "styled-components";

import "./home.scss";
const Home = () => {
  const dispatch = useDispatch();
  const datas = useSelector((data) => data.products.items);
  const auth = useSelector((data) => data.auth);

  const handelAddtoCart = (product) => {
    dispatch(cartActions.addtoCart(product));
  };

  // useEffect(() => {
  //   dispatch(productsFetch());
  // }, []);
  //console.log(datas);
  return (
    <>
      <div className="products">
        {datas?.map((product) => (
         
            <div key={product._id} className="product">
             
              <h3>{product.name}</h3>
              <StyledLink to={`/home/${product._id}`}  >
              <img
                src={product.image.url}
                alt={product.name}
                style={{ height: "150px", width: "150px" }}
              />
                 </StyledLink>

             <StyledLink to={`/home/${product._id}`}  >
              <div className="details">
                <span>{product.description}</span>
                <span className="price">${product.price}</span>
              </div>
              </StyledLink>
              <button onClick={() => handelAddtoCart(product)}>
                Add To Cart
              </button>
            </div>
         
        ))}
      </div>
    </>
  );
};

const StyledLink = styled(Link)`
    text-decoration: none;
color:black;
    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
    
`;
export default Home;
