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
      user: Cookies.getJSON('esquired').user,
      email: Cookies.getJSON('esquired').email
    }

  }

  handleLogout = () =>{
    Cookies.remove('esquired');
    window.location.reload();

  }

	render() {
    const {isAttorney, isSeeker} = this.state
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
{/*                        <p>Welcome to ESQUIRED</p>
                        <p><Link className="btn btn-primary" to="/getappearances">Get all appearances</Link></p>
                        <p><Link className="btn btn-primary" to="/createappearance">Create new appearance</Link></p>
                        <p><Link className="btn btn-primary" to="/deleteappearance">Delete one appearance</Link></p>
                        <p><Link className="btn btn-primary" to="/login">Logout from {this.state.email}</Link></p>*/}
                    </Tab>
                  {isAttorney ? 
                    <Tab eventKey="myrequests" title="My Requests">
                      <Requests />                       
                    </Tab>
                  :null}
                  {isSeeker ?
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