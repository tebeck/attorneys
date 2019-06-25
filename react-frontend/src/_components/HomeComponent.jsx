import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie'
import  { Tabs, Tab } from 'react-bootstrap';
import Appearances from './appearances/AppearancesComponent'
import Agenda from './appearances/AgendaComponent'
import Requests from './appearances/RequestsComponent'
import {userServices} from '../_services/user.service'
import logo from '../_assets/img/landing/logo.png'
import userIcon from '../_assets/img/profile.png'
import bellIcon from '../_assets/img/notifications.png'

export default class HomeComponent extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      key: 'agenda',
      isAttorney: Cookies.getJSON('esquired').isAttorney,
      isSeeker: Cookies.getJSON('esquired').isSeeker,
      onHold: Cookies.getJSON('esquired').onHold,
      user: Cookies.getJSON('esquired').user,
      email: Cookies.getJSON('esquired').email
    }

    if(!userServices.getProfile() ){
      console.log("usuario invalido")
      Cookies.remove('esquired');
      window.location.assign('/home');
   }  else {

     console.log("usuario valido")
   }

  }

  handleLogout = () =>{
    Cookies.remove('esquired');
    window.location.assign('/home');

  }

	render() {
    
    const {isAttorney, isSeeker, onHold} = this.state


    return (
            <div className="container">
                <div className="navbar">
                	<Link to="/profile"><img alt="userIcon" width="20px" src={userIcon} /></Link>
                      <div className="logo"><a href="/"><img src={logo} alt="esquired" /></a></div>
                    <Link to="/notifications"><img width="20px" src={bellIcon} alt="esquired" /></Link>
                </div>
 				        <Tabs id="controlled-tab-example" style={{flexWrap: "nowrap", alignItems: "center",justifyContent: "center", fontSize: "11.5px"}} activeKey={this.state.key} onSelect={key => this.setState({ key })} >
                    <Tab eventKey="agenda" title="Agenda">
                      <Agenda />
                    </Tab>
                  {isAttorney ? 
                    <Tab eventKey="myrequests" title="My Requests">
                      <Requests />                       
                    </Tab>
                  :null}
                  {isSeeker && !onHold ?
                    <Tab eventKey="myappearances" title="Appearances" >
                      <Appearances />
                    </Tab>
                  :null}
                </Tabs>
                <br /><br /><button onClick={this.handleLogout}>Logout</button>
            </div>
		);
	}
}


export { HomeComponent };