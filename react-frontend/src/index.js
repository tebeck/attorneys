import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { history } from './_helpers';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
require('dotenv').config();

 ReactDOM.render(
      	<Router history={history}>
        	<App />
      	</Router>
      ,
    document.getElementById('root')
 );