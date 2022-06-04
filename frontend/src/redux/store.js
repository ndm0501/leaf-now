import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

// Reducers
import { cartReducer } from "./reducers/cartReducers";
import { authReducers } from "./reducers/authReducers";
import {
  getProductsReducer,
  getProductDetailsReducer,
} from "./reducers/productReducers";
import { getStorage } from "../utils/storage";


const reducer = combineReducers({
  cart: cartReducer,
  getProducts: getProductsReducer,
  getProductDetails: getProductDetailsReducer,
  auth: authReducers,
});

const middleware = [thunk];

const cartItemsInLocalStorage = getStorage("cart")|| [];
const data = getStorage("leafNowUser") || {};

const INITIAL_STATE = {
  cart: {
    cartItems: cartItemsInLocalStorage,
  },
  auth: {
    user: {token:data.authToken, userId: data.userId, isSellerOrDonor: data.isSellerOrDonor},
    isLoggedIn: data.isLoggedIn
  }
};

const store = createStore(
  reducer,
  INITIAL_STATE,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
