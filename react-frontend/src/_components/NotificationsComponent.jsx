import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class NotificationsComponent extends Component {

	constructor(props) {
	  super(props);
	
	  this.state = {
	  };
	}

    render() {

    	const {fakedata} = this.state

    	console.log(fakedata)

    	return (

            <div className="container main-body">
                <h3><Link style={{color: "black"}} to="/home"><i className="fas fa-1x fa-angle-left"></i></Link> Notifications</h3>
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
