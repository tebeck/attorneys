import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import backbutton from '../_assets/img/btnback.png'
import notificationEdit from '../_assets/img/notifications/notification_edit.png'

export default class NotificationsComponent extends Component {

  render() {
   
   return (
    <div className="container main-body">
      <Link style={{color: "black"}} to="/home">
       <img width="16px" style={{marginBottom: "11px"}} src={backbutton} alt="esquired" />
       <h3 style={{display: "inline"}  }> Notifications</h3>
      </Link>			
       <hr />
      <div style={{display: "flex"}} className="notificationEdit">
        <div className="roundedImage">
          <img src={notificationEdit} alt="notification" />
        </div>
        <div>
          <h5>Remember to upload the veredict</h5>
          <p>Upload the document to finalize the job</p>
        </div>  
        <hr />
        <h5>Title</h5>
        <p>Subtitle</p>
      </div>
       <hr />
    </div>
  	);
  }
}
