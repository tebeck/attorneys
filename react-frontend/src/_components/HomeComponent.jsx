import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie'
import  { Tabs, Tab } from 'react-bootstrap';
import Appearances from './appearances/AppearancesComponent'
import Agenda from './appearances/AgendaComponent'
import Requests from './appearances/RequestsComponent'


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

  }

  handleLogout = () =>{
    Cookies.remove('esquired');
    window.location.assign('/home');

  }

	render() {
    
    const {isAttorney, isSeeker, onHold} = this.state


    return (
            <div>
                <div className="navbar">
                	<Link to="/profile"><i className="far fa-lg fa-user-circle blue"></i></Link>
                      <span className="title">Esquire'd</span>
                    <Link to="/notifications"><i className="fas fa-lg fa-bell blue"></i></Link>
                </div>
 				        <Tabs id="controlled-tab-example" activeKey={this.state.key} onSelect={key => this.setState({ key })} >
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