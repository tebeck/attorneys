import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { history } from './_helpers';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
require('dotenv').config();

 ReactDOM.render(
      	<Router history={history}>
        	<App />
      	</Router>
      ,
    document.getElementById('root')
 );
