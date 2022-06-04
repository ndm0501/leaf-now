import React from 'react';
import "./Navbar.css";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getStorage, removeStorage } from '../utils/storage';
import Button from './Button';
import { userLogout } from '../redux/actions/authActions';

const Navbar = ({ click }) => {
  const cart = useSelector((state) => state.cart);
  const authDetails = useSelector(state => state.auth);

  const dispatch = useDispatch();
  const history = useHistory();
  const { cartItems } = cart;

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
  };

  const handleLogout = () => {
    removeStorage('leafNowUser');
    dispatch(userLogout());
    history.push('/login');
  }
  
  const isLoggedIn = authDetails.isLoggedIn || (getStorage('leafNowUser') && getStorage('leafNowUser').isLoggedIn);
  
  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <h2>Leaf Now</h2>
      </div>

      <ul className="navbar__links">
        <li>
          <Link to="/cart" className="cart__link">
            <i className="fas fa-shopping-cart"></i>
            <span>
              Cart <span className="cartlogo__badge">{getCartCount()}</span>
            </span>
          </Link>
        </li>
        <li>
          <Link to="/">Shop</Link>
        </li>
        {
          isLoggedIn ? 
          <li>
            <Button type="secondary" onClick={handleLogout} label="Logout"/>
          </li> :
          null
        }
      </ul>

      <div className="hamburger__menu" onClick={click}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </nav>
  );
};

export default Navbar;
