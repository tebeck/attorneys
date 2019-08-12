import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import backbutton from '../_assets/img/btnback.png'
import notificationEdit from '../_assets/img/notifications/notification_edit.png'
import {userServices} from '../_services/user.service'
import Cookies from 'js-cookie'

export default class NotificationsComponent extends Component {

  constructor(props) {
    super(props);
  
    userServices.getProfile()
      .then(res => {
        if(res.data){
         this.setState({
          notifications: res.data.notifications
         })
        } else {
          Cookies.remove('esquired');
          window.location.assign('/home');
        }
      })

    this.state = {};
  }


  handleClickNotifications = () => {
    console.log("click noti")
    userServices.notificationRead()
      .then(data => console.log(data))
      .then(window.location.assign('/home'))
  }

  render() {
   
   return (
    <div className="container main-body">
      <a onClick={this.handleClickNotifications} style={{color: "black"}} >
       <img width="16px" style={{marginBottom: "11px"}} src={backbutton} alt="esquired" />
       <h3 style={{display: "inline"}  }> Notifications</h3>
      </a>			
       <hr />
        {this.state.notifications ?
           this.state.notifications.map(x =>
            <div className={x.read ? "read-notification" : "unread-notification"} key={x._id}>
            <div style={{display: "flex"}} className="notificationEdit">
              <div className="roundedImage">
                <img src={notificationEdit} alt="notification" />
              </div>
              <h5>{x.type}</h5>
            </div>
            </div>
        ) : null }
           <hr />
    </div>
  	);
  }
}
