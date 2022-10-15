import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {loginUser, registerUser} from "../../store/authenticationSlice";
import { StyledForm } from "./formstyling";
import {useNavigate} from 'react-router-dom'
const Login = () => {
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
    password: "",
  });
  const handelSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(userData));
  };

  return (
    <>
      <StyledForm onSubmit={handelSubmit}>
        <h2>Login</h2>
        <input
          type="text"
          onChange={(e) => {
            setUserData({ ...userData, email: e.target.value });
          }}
        />
        <input
          type="password"
          onChange={(e) => {
            setUserData({ ...userData, password: e.target.value });
          }}
        />
        <button>Login</button>

        {datafromApi.LoginStatus =="rejected"? <p>
        {datafromApi.LoginError} 
        </p> :""}
      </StyledForm>
    </>
  );
};

export default Login;
