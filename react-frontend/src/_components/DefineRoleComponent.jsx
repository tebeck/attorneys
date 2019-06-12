import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "react-step-progress-bar/styles.css";
import { ProgressBar } from "react-step-progress-bar";

export default class DefineRoleComponent extends Component {


    render() {
    	return (

            <div className="container">
                <h3><Link style={{color: "black"}} to="/authenticate"><i className="fas fa-1x fa-angle-left"></i></Link> Define your role</h3>
                  <ProgressBar height={5} percent={25} filledBackground="blue" ></ProgressBar><br /> 
                <p>Select an option</p>

                <Link to={{ pathname: '/register', state: { isAttorney: true} }}>
                    <div className="userDefineRole">
                     <p className="userDefineRoleText">Attorney of Record</p>
                    </div>
                </Link><br />

                <Link to={{ pathname: '/register', state: { isSeeker: true } }}>
                    <div className="userDefineRole">
                     <p className="userDefineRoleText">Attorney of Appearance</p>
                    </div>
                </Link>

            </div>
    	);
    }
}


export { DefineRoleComponent };