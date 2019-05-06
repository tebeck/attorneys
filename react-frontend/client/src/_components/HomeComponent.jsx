import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie'

const user = Cookies.get('user');
const email = Cookies.get('email');

export default class HomeComponent extends Component {


	render() {
		return (
            <div className="col-md-6 col-md-offset-3">
                <h1>Hello {user}</h1>
                <p>Welcome to DECAFE</p>
                <p><Link to="/createproduct">Create products</Link></p>
                <p><Link to="/products">Read/Update products</Link></p>
                <p><Link to="/deleteproduct">Delete product </Link></p><br />
                <p><Link to="/findproduct">Find product</Link></p>
                <p><Link className="btn btn-primary" to="/login">Logout from {email}</Link></p>
            </div>
		);
	}
}


export { HomeComponent };