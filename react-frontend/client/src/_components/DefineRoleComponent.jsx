import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "react-step-progress-bar/styles.css";
import { ProgressBar } from "react-step-progress-bar";

// import Cookies from 'js-cookie'

// const user = Cookies.get('user');
// const email = Cookies.get('email');

export default class DefineRoleComponent extends Component {


    render() {
    	return (

            <div className="container">
                <h3><Link style={{color: "black"}} to="/login"><i className="fas fa-1x fa-angle-left"></i></Link> Define your role</h3>
                  <ProgressBar height={5} percent={25} filledBackground="blue" ></ProgressBar><br /> 
                <p>Select an option</p>

                <Link to="/registerAttorney">
                    <div className="square">Attorney of Record</div>
                </Link><br />

                <Link to="/registerSeeker">
                    <div className="square">Attorney of Appearance</div>
                </Link>

            </div>
    	);
    }
}


export { DefineRoleComponent };