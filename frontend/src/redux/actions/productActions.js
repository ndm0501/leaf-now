import * as actionTypes from "../constants/ActionTypes";
import axios from "axios";

export const getProducts = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_PRODUCTS_REQUEST });

    const { data } = await axios.get("/api/products");
    
    dispatch({
      type: actionTypes.GET_PRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_PRODUCTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({
      type: actionTypes.GET_PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const removeProductDetails = () => (dispatch) => {
  dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_RESET });
};

export const uploadProductDetails = (formData) => async (dispatch) => {
  try{
    dispatch({type: actionTypes.UPLOAD_PRODUCT_DETAILS_REQUEST});
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>'
      }
    };
    
    const { status, data } = await axios.post(`/api/products/upload`, formData, config);

    if(status===201){
      dispatch({
        type: actionTypes.UPLOAD_PRODUCT_DETAILS_SUCCESS,
        payload: data,
      });
    }

  }catch(error){
    dispatch({
      type: actionTypes.UPLOAD_PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}
