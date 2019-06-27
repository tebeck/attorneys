import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import backbutton from '../_assets/img/btnback.png'


export default class NotificationsComponent extends Component {

  render() {
   
   return (
    <div className="container main-body">
      <Link style={{color: "black"}} to="/home">
       <img width="16px" style={{marginBottom: "11px"}} src={backbutton} alt="esquired" />
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
