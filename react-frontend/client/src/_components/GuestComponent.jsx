import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import Cookies from 'js-cookie'

// const user = Cookies.get('user');
// const email = Cookies.get('email');

export default class HomeComponent extends Component {


	render() {
		return (
            <div className="col-md-6 col-md-offset-3">
                <h1>Hello</h1>
                <p>Welcome to ATTORNEYS</p>
                <p><Link to="/login">Login</Link></p>
                <p><Link to="/registerSeeker">Are you a seeker?</Link></p>
                <p><Link to="/registerAttorney">Are you an attorney?</Link></p>

            </div>
		);
	}
}


export { HomeComponent };