import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';


export const AdminRoute = ({ component: Component, ...rest }) => (

    <Route {...rest} render={props => (
        Cookies.getJSON('esqadm') ?
         <Component {...props} /> :
          <Redirect to={{ pathname: '/admin', state: { from: props.location } }} />
    )} />
)