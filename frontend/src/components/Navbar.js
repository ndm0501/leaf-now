import React from "react";
import "./Navbar.css";
import { Link, useHistory, withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Button from "./Button";
import { userLogout } from "../redux/actions/authActions";
import BrandLogo from "../assets/icons/leaf-now.svg";
import { getStorage } from "../utils/storage";

const Navbar = ({ click, location, match }) => {
  const cart = useSelector((state) => state.cart);
  const authDetails = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const history = useHistory();
  const { cartItems } = cart;

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
  };

  const handleLogout = () => {
    dispatch(userLogout());
    setTimeout(()=>{
      history.push("/login");
    },100)
    
  };
  
  const handleSignup = () => {
    dispatch(userLogout());
    setTimeout(()=>{
      history.push("/signup");
    },100)
  };

  const handleLogin = () => {
    dispatch(userLogout());
    setTimeout(()=>{
      history.push("/login");
    }, 100)
  };
  
  const handleSellOrDonate = () => {
    history.push("/sell-donate")
  }
  
  const renderActionButton = () => {
    if (location.pathname === "/login") {
      return (
        <li>
          <Button type="secondary" onClick={handleSignup} label="Signup" />
        </li>
      );
    } else if (location.pathname === "/signup") {
      return (
        <li>
          <Button type="secondary" onClick={handleLogin} label="Login" />
        </li>
      );
    } else {
      return (
        <li>
          <Button
            type="secondary"
            onClick={handleLogin}
            label="Login / Signup"
          />
        </li>
      );
    }
  };
  const isLoggedIn = authDetails.isLoggedIn;
  const isSellerOrDonor = authDetails.user && authDetails.user.isSellerOrDonor;
  const isDiscussionsPage = location && location.pathname && location.pathname.indexOf('discussions') !== -1;

  return (
    <nav className="navbar">
      <div className="d-flex">
        <div className="navbar__logo">
          <img src={BrandLogo} width={50} height={50} alt="Brand Logo"/>
        </div>
        <div className="discussion ml-5 d-flex">
          <Link to="/" className="discussion__forum__link">
            Home
          </Link>
          <Link to="/discussions" className="discussion__forum__link">
            Discussions
          </Link>
          {isDiscussionsPage && <div className="ml-2 d-none d-md-block">
            <Button type="quaternary" label="Add Post" onClick={() => history.push('/add-post')} />
          </div>
          }
        </div>
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

        {isLoggedIn ? (
          <>
            {isSellerOrDonor ? <li>
              <Button
                type="primary"
                onClick={handleSellOrDonate}
                label="Sell / Donate"
              />
            </li>:null}
            <li>
              <Button type="secondary" onClick={handleLogout} label="Logout" />
            </li>
            <li>
              <Link to="/" className="user__avatar">
                <i className="fas fa-solid fa-user"></i>
              </Link>
            </li>

            
          </>
        ) : (
          renderActionButton()
        )}
      </ul>

      <div className="hamburger__menu" onClick={click}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </nav>
  );
};

export default withRouter(Navbar);
