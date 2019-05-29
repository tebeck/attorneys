import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import user from '../../assets/img/user_upload.png';
import  { Tabs, Tab } from 'react-bootstrap';
import Cookies from 'js-cookie';
import {userServices} from '../../_services/user.service';

export default class ProfileComponent extends Component {
  
  constructor(props, context) {
    super(props, context);
    this.state = {
      key: 'personalinfo'
    };


  userServices.getProfile()
    .then(data => this.setState({
      firstName: data.data.firstName,
      lastName: data.data.lastName,
      firmName: data.data.firmName,
      stateBar: data.data.stateBar,
      officePhone: data.data.officePhone,
      mobilePhone: data.data.mobilePhone,
      email: data.data.email
    }))  

  }	


	render() {


		return (
			<div className="container">
				<h3><Link style={{color: "black"}} to="/"><i className="fas fa-1x fa-angle-left"></i></Link> Profile</h3>
				<div className="center">
					<img width="80px" src={user} alt="user" className="img-fluid" /><br />
					<Link to="/" style={{fontSize: "14px"}}><u>Upload Profile Picture</u></Link><br/><br/>
   		        <Tabs
                  id="controlled-tab-example"
                  activeKey={this.state.key}
                  onSelect={key => this.setState({ key })}
                >
                <Tab eventKey="personalinfo" title="Personal info">
                	<div className="profileInputs">
                    <p className="profileInputsTitle">First Name</p>
                    <p className="profileInputsValue">{this.state.firstName}</p>
                  </div>
                  <div className="profileInputs">
                    <p className="profileInputsTitle">Last Name</p>
                    <p className="profileInputsValue">{this.state.lastName}</p>
                  </div>
                  <div className="profileInputs">
                    <p className="profileInputsTitle">Firm Name</p>
                    <p className="profileInputsValue">{this.state.firmName}</p>
                  </div>
                  <div className="profileInputs">
                    <p className="profileInputsTitle">State Bar Number</p>
                    <p className="profileInputsValue">{this.state.stateBar}</p>
                  </div>
                  <div className="profileInputs">
                    <p className="profileInputsTitle">Office Phone</p>
                    <p className="profileInputsValue">{this.state.officePhone}</p>
                  </div>
                  <div className="profileInputs">
                    <p className="profileInputsTitle">Mobile Phone</p>
                    <p className="profileInputsValue">{this.state.mobilePhone}</p>
                  </div>
                  <div className="profileInputs">
                    <p className="profileInputsTitle">Mailing Address</p>
                    <p className="profileInputsValue">{this.state.mailingAddress}</p>
                  </div>
                  <div className="profileInputs">
                    <p className="profileInputsTitle">Email</p>
                    <p className="profileInputsValue">{this.state.email}</p>
                  </div>
                </Tab>
                <Tab eventKey="professionalinfo" title="Prof info">
                  
                </Tab>
                <Tab eventKey="transactions" title="Transactions" >
                  
                </Tab>
            </Tabs>
				</div>
			</div>
		);
	}
}
