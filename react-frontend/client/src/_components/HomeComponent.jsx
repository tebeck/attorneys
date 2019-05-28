import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie'
import  { Tabs, Tab } from 'react-bootstrap';




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

    console.log(this.state)
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
                        <p>Welcome to ESQUIRED</p>
                        <p><Link className="btn btn-primary" to="/getappearances">Get all appearances</Link></p>
                        <p><Link className="btn btn-primary" to="/createappearance">Create new appearance</Link></p>
                        <p><Link className="btn btn-primary" to="/deleteappearance">Delete one appearance</Link></p>
                        <p><Link className="btn btn-primary" to="/login">Logout from {this.state.email}</Link></p>
                    </Tab>
                  {isAttorney ? 
                    <Tab eventKey="myrequests" title="My Requests">
                       <p>Only attorney of record can see this</p>
                    </Tab>
                  :null}
                  {isSeeker ?
                    <Tab eventKey="myappearances" title="Appearances" >
                      <p>Only attorney of appearance can see this</p>
                    </Tab>
                  :null}
                </Tabs>
            </div>
		);
	}
}


export { HomeComponent };