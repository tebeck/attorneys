import React, { Component } from 'react';
import backbutton from '../_assets/img/btnback.png'
import calendar from '../_assets/img/calendar.jpg'
import calendarx from '../_assets/img/calendarx.jpg'
import {userServices} from '../_services/user.service'
import Cookies from 'js-cookie'
import Header from "./HeaderComponent";

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
   
    console.log(this.state.notifications)

   return (
    <div>
    <Header className="header-container" guest="1"/>
    <div className="container main-body">
      <div className="pointer" onClick={this.handleClickNotifications} style={{color: "black"}} >
       <img width="16px" style={{marginBottom: "11px"}} src={backbutton} alt="esquired" />
       <h3 style={{display: "inline"}  }> Notifications</h3>
      </div>			
       <hr />
        { this.state.notifications && Object.keys(this.state.notifications).length > 0 ?
           this.state.notifications.slice(0).reverse().map(x =>
            <div className="unread-notification" key={x._id}>
            <div style={{display: "flex"}} className="notificationEdit">
              <div className="roundedImage">
                
                <img 
                src={x.msg === "created" ? calendar :
                     x.msg === "deleted" ? calendarx : 
                     x.msg === "unsubscribed" ? calendarx :
                     x.msg === "subscribed" ? calendar :
                     x.msg === "rejected" ? calendarx :
                     x.msg === "accepted" ? calendar :
                     x.msg === "completed" ? calendar :
                     x.msg === "finished" ? calendar :
                     x.msg === "rated" ? calendar : 
                     calendar
                    } 
                alt="notification" />
              </div>
              <div className="notificationType">{x.type}</div>
            </div>
            <hr />
            </div>
        ) : <p>You don't have new notifications.</p> }
           
    </div></div>
  	);
  }
}
