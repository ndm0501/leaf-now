import React, { useEffect } from 'react';
import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import SideDrawer from "./components/SideDrawer";
import Backdrop from "./components/Backdrop";

// Screens
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import Login from "./screens/Login";
import SignupScreen from "./screens/SignupScreen";
import UploadProductScreen from "./screens/UploadProductScreen";
import ProtectedRoute from './components/ProtectedRoute';
import DiscussionScreen from './screens/DiscussionScreen';
import AddPostScreen from './screens/AddPostScreen';
import AccountDetails from './screens/AccountDetails';
import Post from './components/Post';
import NotFound from './components/NotFound';
import { getCurrentUser } from './redux/actions/userActions';
import { useDispatch } from 'react-redux';


function App() {
  const [sideToggle, setSideToggle] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  
  useEffect(()=>{
    dispatch(getCurrentUser());
  }, [])
  return (
    <Router history={history}>
      <Navbar click={() => setSideToggle(true)} />
      <SideDrawer show={sideToggle} click={() => setSideToggle(false)} />
      <Backdrop show={sideToggle} click={() => setSideToggle(false)} />
      <main className="app">
        <Switch>
          <Route exact path="/" component={HomeScreen} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignupScreen} />
          <Route exact path="/product/:id" component={ProductScreen} />
          <Route exact path="/discussions" component={DiscussionScreen} />
          <Route exact path="/discussions/:id" component={Post} />
          <ProtectedRoute exact path="/add-post" component={AddPostScreen}/>
          <ProtectedRoute exact path="/cart" component={CartScreen} />
          <ProtectedRoute exact path="/sell-donate" component={UploadProductScreen} />
          {/* <ProtectedRoute exact path="/my-account" component={AccountDetails} /> */}
          <Route component={NotFound} />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
