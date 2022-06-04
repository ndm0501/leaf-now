import React from 'react';
import { useSelector } from 'react-redux';
import { getStorage } from '../utils/storage';
import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute = ({component: Component, ...restProps}) => {
    const auth = useSelector(state => state.auth);
    
    const isLoggedIn = auth.isLoggedIn;

return (<Route 
    {...restProps}
    render={props => isLoggedIn ? <Component {...props} /> : <Redirect to={{pathname:"/login", state:{ prevPath: restProps.location.pathname }}}/>}
/>);
}
export default ProtectedRoute;