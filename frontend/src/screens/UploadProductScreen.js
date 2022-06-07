import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import "./UploadProductScreen.css";
import {uploadProductDetails} from '../redux/actions/productActions';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { validateEmail, validateNumerics, validateProductUploadInput } from "../utils/validator";


const UploadProductScreen = () => {
  const [state, setState] = useState({
    name: "",
    countInStock: 0,
    description: "",
    file: "",
    price: 0,
    isDonation: true,
  });
  const dispatch = useDispatch();
  const history = useHistory();
  const authDetails = useSelector(state => state.auth);
  const [errors, setErrors] = useState({});

  useEffect(()=>{
    if(authDetails.user && !authDetails.user.isSellerOrDonor){
      history.push('/');
    }
  });

  const handleChange = (e) => {
    if (e.target.id === "isDonation") {
      setState((state) => ({ ...state, [e.target.name]: e.target.checked }));
    } else if (e.target.id === "file") {
      setState((state) => ({ ...state, [e.target.name]: e.target.files[0] }));
    } else {
      setState((state) => ({ ...state, [e.target.name]: e.target.value }));
    }
  };
  const handleUpload = (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (let name in state) {
      formData.append(name, state[name]);
    }
    // for (let name in state) {
    //   console.log(formData.get(name))
    // }
    const {errors, isValid} = validateProductUploadInput(formData);
    setErrors(errors);
    if(isValid){
      dispatch(uploadProductDetails(formData));
      setTimeout(()=>{
        alert("Product updated successfully");
        setState({
          name: "",
          countInStock: 0,
          description: "",
          file: "",
          price: 0,
          isDonation: true,
        });
      },500)
    }
  }
  
  return (
    <div className="uploadscreen__container">
      <div className="uploadscreen__contents">
        <h3>Add product details</h3>
        <form>
          <div className="form-group">
            <label htmlFor="name">Product name<sup>*</sup></label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={state.name}
              onChange={handleChange}
              required
            />
            {errors['name'] && <small className="text text-danger">{errors['name']}</small>}
          </div>

          <div className="form-group">
            <label htmlFor="countInStock">Total count in current stock<sup>*</sup></label>
            <input
              type="text"
              className="form-control"
              pattern="^[1-9][0-9]*$"
              id="countInStock"
              name="countInStock"
              value={state.countInStock}
              onChange={handleChange}
              required
            />
            {errors['countInStock'] && <small className="text text-danger">{errors['countInStock']}</small>}
          </div>

          <div className="form-group">
            <label htmlFor="description">Product description<sup>*</sup></label>
            <textarea
              className="form-control"
              id="description"
              rows="3"
              name="description"
              value={state.description}
              onChange={handleChange}
              required
            ></textarea>
            {errors['description'] && <small className="text text-danger">{errors['description']}</small>}
          </div>

          <div className="form-group">
            <label htmlFor="file">Upload the product image</label>
            <br />
            <input
              type="file"
              className="form-controlro-file"
              id="file"
              name="file"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="text"
              className="form-control"
              pattern="^[1-9][0-9]*$"
              id="price"
              value={state.price}
              name="price"
              onChange={handleChange}
              disabled={state.isDonation}
            />
            {errors['price'] && <small className="text text-danger">{errors['price']}</small>}
            <small id="priceHelp" className="form-text text-muted">
              To add price uncheck the below donation option
            </small>
          </div>
          <div className="form-group form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="isDonation"
              name="isDonation"
              checked={state.isDonation}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="isDonation">
              I want to donate the product
            </label>
          </div>
          <Button type={"primary"} label="Upload product" onClick={handleUpload} />
        </form>
      </div>
    </div>
  );
};
export default UploadProductScreen;
