import * as actionTypes from "../constants/ActionTypes";

const USER_INITIAL_STATE = {
  loading: true,
  user: {},
  error: {},
  isLoggedIn: false
};

export const authReducers = (state = USER_INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.USER_LOGIN_REQUEST:
      return { ...state };

    case actionTypes.USER_LOGIN_SUCCESS:
        return {
            ...state,
            loading: false,
            user: action.payload,
            isLoggedIn: true
        }
    
    case actionTypes.USER_LOGIN_FAIL:
        return {
            ...state,
            loading: false,
            error: action.payload
        }

    default:
        return {...state};
  }
};
