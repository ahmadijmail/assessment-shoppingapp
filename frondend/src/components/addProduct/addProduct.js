import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from 'react-router-dom'
import styled from "styled-components";

import { addProduct } from "../../store/productSlices";

const AddProduct = () => {
  const loginStatus = useSelector((state) => state.auth);
const navigate =useNavigate()
  const dispatch = useDispatch();
  const [productImg, setProductImg] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDesc] = useState("");

  const handleProductImageUpload = (e) => {
    const file = e.target.files[0];

    TransformFileData(file);
  };

  useEffect(() => {
    if (addProduct.id) {
      navigate("/addproduct/myproducts");
    }
  }, [addProduct.id]);

  const TransformFileData = (file) => {
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setProductImg(reader.result);
      };
    } else {
      setProductImg("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(
      addProduct({
        name,
        description,
        price,
        image: productImg,
        userid: loginStatus.id,
      })
    );
  };

  return (
    <>
      <StyledCreateProduct>
        <StyledForm onSubmit={handleSubmit}>
          <h3>Create a Product</h3>
          <input
            id="imgUpload"
            accept="image/*"
            type="file"
            onChange={handleProductImageUpload}
            required
          />

          <input
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Price"
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Short Description"
            onChange={(e) => setDesc(e.target.value)}
            required
          />
          <button>submit</button>
          {/* <PrimaryButton type="submit">
          {createStatus === "pending" ? "Submitting" : "Submit"}
        </PrimaryButton> */}
        </StyledForm>
        <ImagePreview>
          {productImg ? (
            <>
              <img src={productImg} alt="error!" />
            </>
          ) : (
            <p>Image Preview</p>
          )}
        </ImagePreview>
      </StyledCreateProduct>
    </>
  );
};

export default AddProduct;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin-top: 2rem;

 height: 475px;
  select,
  input {
    padding: 7px;
    min-height: 35px;
    outline: none;
    border-radius: 5px;
    border: 1px solid rgb(182, 182, 182);
    margin: 0.3rem 0;

    &:focus {
      border: 2px solid rgb(0, 208, 255);
    }
  }
 h3{
  
  margin-bottom:50px;
 }
  button{
    width: 100%;
    height: 40px;
    border-radius: 5px;
    margin-top: 1rem;
    font-weight: 400;
    letter-spacing: 1.15px;
    background-color: #4b70e2;
    color: #f9f9f9;
    border: none;
    outline: none;
    cursor: pointer;
   margin-right: 5px;
  }
  select {
    color: rgb(95, 95, 95);
  }
`;

const StyledCreateProduct = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ImagePreview = styled.div`
  margin: 2rem 0 2rem 2rem;
  padding: 2rem;
  border: 1px solid rgb(183, 183, 183);
  max-width: 300px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: rgb(78, 78, 78);

  img {
    max-width: 100%;
  }
`;
