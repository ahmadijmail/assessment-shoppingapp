import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {registerUser} from "../../store/authenticationSlice";
import { StyledForm } from "./formstyling";
import {useNavigate} from 'react-router-dom'
const Register = () => {
  const dispatch = useDispatch();
  let navigate= useNavigate()
  const datafromApi = useSelector((data) => data.auth);
  //console.log(datafromApi, "hh");

  useEffect(()=>{
    if(datafromApi.id){
        navigate('/')
    }
  }, [datafromApi.id])
  const [userData, setUserData] = useState({
    email: "",
    name: "",
    password: "",
  });
  const handelSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(userData));
  };

  return (
    <>
      <StyledForm onSubmit={handelSubmit}>
        <h2>Register</h2>

        <input
          type="text"
          placeholder="Name"
          onChange={(e) => {
            setUserData({ ...userData, name: e.target.value });
          }}
        />
        <input
          type="text"
          placeholder="Email"
          onChange={(e) => {
            setUserData({ ...userData, email: e.target.value });
          }}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setUserData({ ...userData, password: e.target.value });
          }}
        />
        <button>Register</button>

        {datafromApi.registerStatus =="rejected"? <p>
        {datafromApi.registerError} 
        </p> :""}
      </StyledForm>
    </>
  );
};

export default Register;
