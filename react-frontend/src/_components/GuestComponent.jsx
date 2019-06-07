import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie'
import  { Tabs, Tab } from 'react-bootstrap';
import Appearances from './appearances/AppearancesComponent'
import Agenda from './appearances/AgendaComponent'
import Requests from './appearances/RequestsComponent'
import Modal from 'react-awesome-modal';
import { Button } from 'react-bootstrap';




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
          <Button variant="primary" onClick={this.handleShow}>
            Custom Width Modal
          </Button>
          <Modal show={this.state.show}
             onHide={this.handleHide}
             dialogClassName="modal-90w"
             aria-labelledby="example-custom-modal-styling-title">
            <Modal.Header closeButton>
              <Modal.Title id="example-custom-modal-styling-title">
                Custom Modal Styling
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>
                Ipsum molestiae natus adipisci modi eligendi? Debitis amet quae
                unde commodi aspernatur enim, consectetur. Cumque deleniti
                temporibus ipsam atque a dolores quisquam quisquam adipisci
                possimus laboriosam. Quibusdam facilis doloribus debitis! Sit
                quasi quod accusamus eos quod. Ab quos consequuntur eaque quo rem!
                Mollitia reiciendis porro quo magni incidunt dolore amet atque
                facilis ipsum deleniti rem!
              </p>
            </Modal.Body>
          </Modal>
          <div className="navbar">
            <Link to="/"><i className="fas fa-bars blue"></i></Link>
              <span className="title">Esquire'd</span>
            <Link to="/"><i className="fas fa-lg fa-user blue"></i></Link>
          </div>
      </div>
		);
	}
}


export { HomeComponent };