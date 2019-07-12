import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie'
import  { Tabs, Tab } from 'react-bootstrap';
import Appearances from './appearances/AppearancesComponent'
import Agenda from './appearances/AgendaComponent'
import Requests from './appearances/RequestsComponent'
import {userServices} from '../_services/user.service'
import logo from '../_assets/img/landing/logo.png'
// import userIcon from '../_assets/img/profile.png'
import bellIcon from '../_assets/img/notifications.png'
import Popup from "reactjs-popup";
import greyFaceImg from '../_assets/img/grey-user.png'

export default class HomeComponent extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      key: "agenda",
      isAttorney: Cookies.getJSON('esquired').isAttorney,
      isSeeker: Cookies.getJSON('esquired').isSeeker,
      onHold: Cookies.getJSON('esquired').onHold,
      user: Cookies.getJSON('esquired').user,
      email: Cookies.getJSON('esquired').email
    }

    userServices.getProfile()
      .then(res => {
        if(res.data){
          console.log("usuario valido")
         this.setState({
          imgUrl: res.data.profilePicture
         })
        } else {
          console.log("usuario invalido")
          Cookies.remove('esquired');
          window.location.assign('/home');
        }
      })
    

  }


  handleLogout = () =>{
    Cookies.remove('esquired');
    window.location.assign('/home');

  }

  render(){

   console.log(this.state.key)
  const {isAttorney, isSeeker, onHold} = this.state

  return (
     <div className="container">
        <div className="navbar">
          <Link className="home-popup-links" to="/profile">
            { this.state.imgUrl ? 
                <img alt="userIcon" className="userIcon" width="24px" src={this.state.imgUrl}/> :
                <img alt="userIcon" className="userIcon" width="24px" src={greyFaceImg} />
            }
          </Link>

          <div className="logo">
            <a href="/"><img src={logo} alt="esquired" /></a>
          </div>    
          
          <Link to="/notifications">
            <img width="20px" src={bellIcon} alt="esquired" />
          </Link>
        </div>
        <hr/>
          <Tabs id="controlled-tab-example" className="tabs-control" activeKey={this.state.key} onSelect={key => this.setState({ key })} >
                <Tab eventKey="agenda" title="Agenda">
                  <Agenda />
                </Tab>
              { isAttorney ? 
                <Tab eventKey="myrequests" title="My Requests">
                  <Requests />
                </Tab> : null
              }
              { isSeeker && !onHold ? 
                <Tab eventKey="myappearances" title="Appearances">
                   <Appearances />
                </Tab> : null
              }
          </Tabs>
    </div>
   );
   }
}


export { HomeComponent };