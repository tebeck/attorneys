import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class NotificationsComponent extends Component {

	constructor(props) {
	  super(props);
	
	  this.state = {
	  };
	}
  render() {
   
   return (
    <div className="container main-body">
      <Link style={{color: "black"}} to="/home">
       <i className="fas fa-2x fa-angle-left"></i>
       <h3 style={{display: "inline"}  }> Notifications</h3>
      </Link>			
       <hr />
      <div >
        <h5>Title</h5>
        <p>Subtitle</p>
        <hr />
        <h5>Title</h5>
        <p>Subtitle</p>
      </div>
       <hr />
    </div>
  	);
  }
}
