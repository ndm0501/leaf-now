import React, { useState } from "react";
import Button from "../components/Button";
import "./UploadProductScreen.css";
import {uploadProductDetails} from '../redux/actions/productActions';
import { useDispatch } from "react-redux";


const UploadProductScreen = () => {
  const [state, setState] = useState({
    name: "",
    countInStock: "",
    description: "",
    file: "",
    price: "",
    isDonation: true,
  });
  const dispatch = useDispatch();

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
    dispatch(uploadProductDetails(formData));

  }
  console.log(state)
  return (
    <div className="uploadscreen__container">
      <div className="uploadscreen__contents">
        <h3>Add product details</h3>
        <form>
          <div className="form-group">
            <label htmlFor="name">Product name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={state.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="countInStock">Total count in current stock</label>
            <input
              type="text"
              className="form-control"
              id="countInStock"
              name="countInStock"
              value={state.countInStock}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Product description</label>
            <textarea
              className="form-control"
              id="description"
              rows="3"
              name="description"
              value={state.description}
              onChange={handleChange}
            ></textarea>
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
              id="price"
              value={state.price}
              name="price"
              onChange={handleChange}
            />
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
