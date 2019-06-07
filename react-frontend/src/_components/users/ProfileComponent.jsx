import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import  { Tabs, Tab } from 'react-bootstrap';
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
      lawFirm: data.data.lawFirm,
      stateBar: data.data.stateBar,
      officePhone: data.data.officePhone,
      mobilePhone: data.data.mobilePhone,
      email: data.data.email,
      profilePicture: data.data.profilePicture,
      data: data.data
    }))  

  }	


	render() {

if(this.state.data && this.state.data.mailingAddress[0].city){
  console.log(this.state.data)
}

		return (
			<div className="container">
				<h3><Link style={{color: "black"}} to="/home"><i className="fas fa-1x fa-angle-left"></i></Link> Profile</h3>
				<div className="center">
					<img width="80px" src={this.state.profilePicture} alt="user" className="img-fluid" /><br />
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
                    <p className="profileInputsValue">{this.state.lawFirm}</p>
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
                    <p className="profileInputsTitle">Street Address 1</p>
                    <p className="profileInputsValue">{this.state.data && this.state.data.mailingAddress[0].streetAddrOne ? this.state.data.mailingAddress[0].streetAddrOne :null}</p>
                  </div>
                  <div className="profileInputs">
                    <p className="profileInputsTitle">Street Address 2</p>
                    <p className="profileInputsValue">{this.state.data && this.state.data.mailingAddress[0].streetAddrTwo ? this.state.data.mailingAddress[0].streetAddrTwo :null}</p>
                  </div>
                  <div className="profileInputs">
                    <p className="profileInputsTitle">City</p>
                    <p className="profileInputsValue">{this.state.data && this.state.data.mailingAddress[0].city ? this.state.data.mailingAddress[0].city :null}</p>
                  </div>
                  <div className="profileInputs">
                    <p className="profileInputsTitle">State</p>
                    <p className="profileInputsValue">{this.state.data && this.state.data.mailingAddress[0].state ? this.state.data.mailingAddress[0].state :null}</p>
                  </div>
                  <div className="profileInputs">
                    <p className="profileInputsTitle">Zip</p>
                    <p className="profileInputsValue">{this.state.data && this.state.data.mailingAddress[0].zip ? this.state.data.mailingAddress[0].zip :null}</p>
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
