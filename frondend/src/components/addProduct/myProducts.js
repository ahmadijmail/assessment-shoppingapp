import React, { useEffect, useState } from "react";
import { productsFetch } from "../../store/productSlices";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProduct } from "../../store/productSlices";

import "./myproducts.scss";
const MyProducts = () => {
  const dispatch = useDispatch();
  const datas = useSelector((data) => data.products.items);
  const auth = useSelector((data) => data.auth);
  const filtered = datas.filter((data) => data.userid == auth.id);

  useEffect(() => {
    dispatch(productsFetch());
  }, [filtered]);

  return (
    <>
      <div className="myproducts">
        {filtered?.map((product) => (
          <div key={product._id} className="myproductsB">
            <h3>{product.name}</h3>
            <img
              src={product.image.url}
              alt={product.name}
              style={{ height: "150px", width: "150px" }}
            />
            <div className="details">
              <span className="description">{product.description}</span>
              <span className="price">${product.price}</span>
            </div>
            <div className="buttons">
              <Link to={`/addproduct/${product._id}`}>
                <button>Edit Product</button>
              </Link>
              <button
                id="deletB"
                onClick={() => dispatch(deleteProduct(product._id))}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MyProducts;
