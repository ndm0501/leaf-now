import * as actionTypes from "../constants/ActionTypes";
import axios from "axios";

export const getCurrentUser = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_CURRENT_USER_DATA_REQUEST });

    const { status, data } = await axios.get("/api/users/current");
    if (status === 200) {
      dispatch({
        type: actionTypes.GET_CURRENT_USER_DATA_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_CURRENT_USER_DATA_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUser = (user) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.USER_DATA_UPDATE_REQUEST });
    const { status, data } = await axios.put("/api/users", user);
    dispatch({
      type: actionTypes.USER_DATA_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.USER_DATA_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const onUserDetailsChange = (key, value) => dispatch => {
  dispatch({
    type: actionTypes.ON_USER_DETAILS_CHANGE,
    payload: { key, value },
  });
};
