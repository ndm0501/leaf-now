import * as actionTypes from "../constants/ActionTypes";
import axios from "axios";

export const userLogin = (user) => async (dispatch) => {
    try {
      dispatch({ type: actionTypes.USER_LOGIN_REQUEST });
  
      const { data } = await axios.post("/api/auth/login-user", user);
  
      dispatch({
        type: actionTypes.USER_LOGIN_SUCCESS,
        payload: data,
      });

    } catch (error) {
      dispatch({
        type: actionTypes.USER_LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  export const userLogout = () => async (dispatch) => {
    try{
      dispatch({ type: actionTypes.USER_LOGOUT_REQUEST });
      const { status, data } = await axios.post("/api/auth/signout");
      if(status === 200){
        dispatch({
          type: actionTypes.USER_LOGOUT_SUCCESS,
          payload: data,
        });
      }

    }catch(error){
      dispatch({
        type: actionTypes.USER_LOGOUT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  }