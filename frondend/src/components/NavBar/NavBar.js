import React, {useEffect} from "react";
import "./NavBar.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { authactions } from "../../store/authenticationSlice";
import {useNavigate} from 'react-router-dom'

function NavBar() {
  const numberofItems = useSelector((state) => state.cart.carttotalquantity);
  const loginStatus = useSelector((state) => state.auth);
  let dispatch = useDispatch();
  let navigate= useNavigate()


  const handelLogOut = () => {
    dispatch(authactions.Logout());
  };


  useEffect(()=>{
    if(!loginStatus.token){
        navigate('/')
    }
  }, [loginStatus.id])


  return (
    <nav className="navbar">
      <Link to="/">
        <h2>Shop</h2>
      </Link>
      <Link to="/cart">
        <div className="navbag">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            fill="currentColor"
            className="bi bi-cart"
            viewBox="0 0 16 16"
          >
            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
          </svg>

          <span className="itemsinCartNum-nav">
            <span>{numberofItems}</span>
          </span>
        </div>
      </Link>

      {loginStatus?.id ? (
        <Logout onClick={handelLogOut}>Logout</Logout>
      ) : (
        <AuthLi>
          <Link to="/login">Login</Link>
          <Link to="/register">SignUp</Link>
        </AuthLi>
      )}
    </nav>
  );
}

export default NavBar;

const AuthLi = styled.div`
  a {
    &:last-child {
      margin-left: 2rem;
    }
  }
`;

const Logout = styled.div`
  color: white;
  cusror: pointer;
`;
