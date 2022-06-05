import React from "react";
import "./SideDrawer.css";
import { Link, useHistory, withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../redux/actions/authActions";


const SideDrawer = ({ show, click, location }) => {
  const sideDrawerClass = ["sidedrawer"];
  const authDetails = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);
  const history = useHistory();
  const dispatch = useDispatch();
  const { cartItems } = cart;

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
  };

  if (show) {
    sideDrawerClass.push("show");
  }
  const isLoggedIn = authDetails.isLoggedIn;
  const isDiscussionsPage = location && location.pathname && location.pathname.indexOf('discussions') !== -1;

  const handleLogout = ()=>{
    dispatch(userLogout());
    setTimeout(()=>{
      history.push("/login");
    },100)
  }
  return (
    <div className={sideDrawerClass.join(" ")}>
      <ul className="sidedrawer__links" onClick={click}>
        <li>
          <Link to="/cart">
            <i className="fas fa-shopping-cart"></i>
            <span>
              Cart{" "}
              <span className="sidedrawer__cartbadge">{getCartCount()}</span>
            </span>
          </Link>
        </li>
        <li>
          <Link to="/">Shop</Link>
        </li>
        {!isLoggedIn ? (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
            {isDiscussionsPage && <li>
              <Link to="/add-post" className="d-md-none">Add Post</Link>
            </li>}
          </>
        ) : (
          <li>
            <Link onClick={handleLogout}>Logout</Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default withRouter(SideDrawer);
