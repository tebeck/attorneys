import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import Cookies from 'js-cookie'
// import  { Tabs, Tab } from 'react-bootstrap';
// import Appearances from './appearances/AppearancesComponent'
// import Agenda from './appearances/AgendaComponent'
// import Requests from './appearances/RequestsComponent'
// import Modal from 'react-awesome-modal';
// import { Button } from 'react-bootstrap';




export default class HomeComponent extends Component {
  
  constructor(props, context) {
    super(props, context);

    this.state = {
      show: false,
    };

    this.handleShow = () => {
      this.setState({ show: true });
    };

    this.handleHide = () => {
      this.setState({ show: false });
    };
  }

	render() {

		return (
      <div>

          <div className="navbar">
            <Link to="/"><i className="fas fa-bars blue"></i></Link>
              <span className="title">Esquire'd</span>
              <Link to="/authenticate">Login</Link>
              <Link to="/definerole">Register</Link>  
            <Link to="/"><i className="fas fa-lg fa-user blue"></i></Link>
          </div>
      </div>
		);
	}
}


export { HomeComponent };