import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { history } from './_helpers';
import 'bootstrap/dist/css/bootstrap.css';
import * as serviceWorker from './serviceWorker';

import App from './App';
require('dotenv').config();

 ReactDOM.render(
      	<Router history={history}>
        	<App />
      	</Router>
      ,
    document.getElementById('root')
 );
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();