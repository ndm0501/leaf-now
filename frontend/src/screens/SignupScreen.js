import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import "./Login.css";
import BrandLogo from "../assets/icons/leaf-now.svg";

import Button from "../components/Button";

// Actions
import { userSignup } from "../redux/actions/authActions";
import { getStorage } from "../utils/storage";
import { validateRegisterInput } from "../utils/validator";

const SignupScreen = ({ location }) => {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    verifyPassword: "",
    address: "",
    isSellerOrDonor: true,
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const history = useHistory();
  const authDetails = useSelector((state) => state.auth);
  const { user } = authDetails;

  const isLoggedIn =
    authDetails.isLoggedIn ||
    (getStorage("leafNowUser") && getStorage("leafNowUser").isLoggedIn);
  const prevPath = location.state && location.state.prevPath;

  useEffect(() => {
    if (isLoggedIn) {
      history.push("/");
    }
  });

  useEffect(() => {
    if (prevPath && isLoggedIn) {
      history.push(prevPath);
      return;
    }
    if (isLoggedIn) {
      history.push("/");
    }
  }, [user]);

  const handleSignup = (e) => {
    e.preventDefault();
    const {errors, isValid} = validateRegisterInput(state)
    setErrors(errors);
    
    if(isValid){
      dispatch(userSignup(state))
    }
    
  };
  const handleChange = (e) => {
      if(e.target.id === 'isSellerOrDonor'){
        setState((state) => ({ ...state, [e.target.name]: e.target.checked }));
      }else{
        setState((state) => ({ ...state, [e.target.name]: e.target.value }));
      }
    
  };

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
            <label htmlFor="name">Name</label>
            <input
              type="name"
              className="form-control"
              id="name"
              aria-describedby="emailHelp"
              value={state.name}
              name="name"
              onChange={handleChange}
            />
            {errors['name'] && <small className="text text-danger">{errors['name']}</small>}
          </div>
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
          <div className="form-group">
            <label htmlFor="verifyPassword">Re-enter password</label>
            <input
              type="password"
              className="form-control"
              id="verifyPassword"
              value={state.verifyPassword}
              name="verifyPassword"
              onChange={handleChange}
            />
            {errors['password'] && <small className="text text-danger">{errors['password']}</small>}
          </div>
          <div className="form-group form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="isSellerOrDonor"
              name="isSellerOrDonor"
              checked={state.isSellerOrDonor}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="isSellerOrDonor">
              I want to signup as seller or donor
            </label>
          </div>
          <Button
            label="Create account"
            type="primary"
            onClick={handleSignup}
          />
        </form>
      </div>
    </div>
  );
};
export default SignupScreen;
