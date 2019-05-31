import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';


export const PrivateRoute = ({ component: Component, ...rest }) => (

    <Route {...rest} render={props => (
        Cookies.getJSON('esquired') ?
         <Component {...props} /> :
          <Redirect to={{ pathname: '/authenticate', state: { from: props.location } }} />
    )} />
)