import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { productsFetch } from "../../store/productSlices";
import { editProduct } from "../../store/productSlices";

const EditProduct = () => {
  let { id } = useParams();
  const dispatch = useDispatch();
  const loginStatus = useSelector((state) => state.auth);
  const datas = useSelector((data) => data.products.items);
  const filtered = datas.filter((data) => data._id == id);

  const [productImg, setProductImg] = useState(filtered[0]?.image.url);
  const [name, setName] = useState(filtered[0]?.name);
  const [price, setPrice] = useState(filtered[0]?.price);
  const [description, setDesc] = useState(filtered[0]?.description);

  useEffect(() => {
    dispatch(productsFetch());
  }, [id]);

  const handleProductImageUpload = (e) => {
    const file = e.target.files[0];

    TransformFileData(file);
  };

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
      editProduct({
        name,
        description,
        price,
        image: productImg,
        id: id,
        userid: loginStatus.id,
      })
    );
  };

  return (
    <>
      <StyledCreateProduct>
        <StyledForm onSubmit={handleSubmit}>
          <h3>Edit Product</h3>
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
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Short Description"
            value={description}
            onChange={(e) => setDesc(e.target.value)}
            required
          />
          <button>Update</button>
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

export default EditProduct;

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
