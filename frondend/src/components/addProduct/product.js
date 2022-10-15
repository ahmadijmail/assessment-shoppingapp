import React, {useEffect} from "react";
import "./product.scss";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { cartActions } from "../../store/cartSlice";
import { productsFetch } from "../../store/productSlices";
const Product = () => {
  let { id } = useParams();
  const datas = useSelector((data) => data.products.items);
  const filtered = datas.filter((data) => data._id == id);
  const data = filtered[0];
  const dispatch = useDispatch();

  const handelAddtoCart = (product) => {
    dispatch(cartActions.addtoCart(product));
  };

  useEffect(()=>{
    dispatch(productsFetch());
  }, [data])
  console.log(data);
  return (
    <>
      <div className="container">
        <div className="left-column">
          <img
            data-image="red"
            className="active"
            src={data.image.url}
            alt=""
          />
        </div>

        <div className="right-column">
          <div className="product-description">
            <h1>{data.name} </h1>
            <p>{data.description}</p>
          </div>

          <div className="product-configuration">
            <div className="product-color">
              <span>Color</span>

              <div className="color-choose">
                <div>
                  <input
                    data-image="red"
                    type="radio"
                    id="red"
                    name="color"
                    value="red"
                  />
                  <label htmlFor="red">
                    <span></span>
                  </label>
                </div>
                <div>
                  <input
                    data-image="blue"
                    type="radio"
                    id="blue"
                    name="color"
                    value="blue"
                  />
                  <label htmlFor="blue">
                    <span></span>
                  </label>
                </div>
                <div>
                  <input
                    data-image="black"
                    type="radio"
                    id="black"
                    name="color"
                    value="black"
                  />
                  <label htmlFor="black">
                    <span></span>
                  </label>
                </div>
              </div>
            </div>

            <div className="cable-config">
              <span>Box Contains</span>

              <div className="cable-choose">
                <button>Cable</button>
                <button>Plug</button>
                <button>Charger</button>
              </div>
              <a href="#">Created At : {data.createdAt} </a>
            </div>
          </div>

          <div className="product-price">
            <span>{data.price}$</span>
            <button
              href="#"
              className="cart-btn"
              onClick={() => handelAddtoCart(data)}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
