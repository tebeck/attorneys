import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class TermsComponent extends Component {

	constructor(props) {
	  super(props);
	
	  this.state = {
	  };
	}


  render() {
  	return (
     <div className="container main-body">
        <h3><Link style={{color: "black"}} to="/home"><i className="fas fa-1x fa-angle-left"></i></Link> Terms</h3>
         <hr />
          <div >

          </div>
         <hr />
     </div>
  	);
  }
}