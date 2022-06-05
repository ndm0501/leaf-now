import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import "./Login.css";
import BrandLogo from "../assets/icons/leaf-now.svg";

import Button from '../components/Button';

// Actions
import { userLogin } from '../redux/actions/authActions';
import { getStorage } from "../utils/storage";

//validator
import {validateLoginInput} from '../utils/validator';

const Login = ({location}) => {
  const [state, setState] = useState({
    email:'',
    password:'',
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const history = useHistory();
  const authDetails = useSelector(state => state.auth);
  const { user } = authDetails;

  const isLoggedIn = authDetails.isLoggedIn;
  const prevPath = location.state && location.state.prevPath;

  useEffect(()=>{
    if(isLoggedIn){
      history.push('/');
    }
  });

  useEffect(()=>{
    if(prevPath && isLoggedIn){
      history.push(prevPath);
      return;
    }
    if(isLoggedIn){
      history.push('/');
    }
  },[user]);

  const handleLogin = (e) => {
    e.preventDefault();
    const {errors, isValid} = validateLoginInput(state);
    setErrors(errors);
    if(isValid){
      dispatch(userLogin(state));
    }
    
  }
  const handleChange = (e) => {
    setState(state =>({...state, [e.target.name]: e.target.value}));
  }
  console.log(errors)
  return (
    <div className="loginscreen">
      <div className="loginscreen__formcontainer">
        <div className="loginscreen_form_header">
          <img
            src={BrandLogo}
            alt="Leaf No Brand Logo"
            width={80}
            height={80}
          />
        </div>
        <form className="mt-2">
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              value={state.email}
              name="email"
              onChange={handleChange}
            />
            {errors['email'] && <small className="text text-danger">{errors['email']}</small>}
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={state.password}
              name="password"
              onChange={handleChange}
            />
            {errors['password'] && <small className="text text-danger">{errors['password']}</small>}
          </div>
          <Button label="Login" type="primary" onClick={handleLogin}/>
        </form>
      </div>
    </div>
  );
};
export default Login;
