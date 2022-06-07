import * as actionTypes from "../constants/ActionTypes";

const USER_INITIAL_STATE = {
  loading: true,
  user: {},
  error: {},
  isLoggedIn: false,
};

export const userReducers = (state = USER_INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.USER_DATA_UPDATE_REQUEST:
      return { ...state };

    case actionTypes.USER_DATA_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        user: { ...state.user, ...action.payload },
        isLoggedIn: true,
      };

    case actionTypes.USER_DATA_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        error: {...state.error, ...action.payload},
      };
    case actionTypes.GET_CURRENT_USER_DATA_REQUEST:
      return { ...state };

    case actionTypes.GET_CURRENT_USER_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        user: { ...state.user, ...action.payload },
        isLoggedIn: true,
      };

    case actionTypes.GET_CURRENT_USER_DATA_FAIL:
      return {
        ...state,
        loading: false,
        error: {...state.error, ...action.payload},
      };

    default:
      return { ...state };
  }
};

export const userDetailsReducers = (state = { user:{} }, action) => {
  switch(action.type){
    case actionTypes.ON_USER_DETAILS_CHANGE:
        return {
          ...state,
          user:{
            ...state.user, [action.payload.key]: action.payload.value
          }
        }
  }
}
