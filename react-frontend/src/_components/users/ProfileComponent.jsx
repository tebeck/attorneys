import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import  { Tabs, Tab } from 'react-bootstrap';
import {userServices} from '../../_services';

export default class ProfileComponent extends Component {
  
  constructor(props, context) {
    super(props, context);
    this.state = {
      key: 'personalinfo'
    };
  }


  componentDidMount(){

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
        password: data.data.password,
        _userId: data.data._id,
        data: data.data
        })
      )

  }

  openModal() {
      this.setState({
          visible : true
      });
  }

  handleSubmit = (e) =>{
    e.preventDefault();
     const {errors, ...noErrors} = this.state // Destructuring...
     const result = validate(noErrors)
     this.setState({errors: result})
     
     if(!Object.keys(result).length) {
     
        userServices.updatePassword(noErrors).then(
          res =>{
           alert(res)
          }
        )
     }
  }

  handleChange = ({target}) =>{
    this.setState({
      [target.name]: target.value
    })
  }


	render() {
    if(this.state.data && this.state.data.mailingAddress[0].city){
      
   }

		return (
			<div className="container main-body">
				<h3><Link style={{color: "black"}} to="/home"><i className="fas fa-1x fa-angle-left"></i></Link> Profile</h3>
				<div className="center">
					<img width="80px" src={this.state.profilePicture} alt="user" className="img-fluid" /><br />
					<Link to="/profile" style={{fontSize: "14px"}}><u>Upload Profile Picture</u></Link><br/><br/>
   		        <Tabs
                  id="controlled-tab-example"
                  activeKey={this.state.key}
                  onSelect={key => this.setState({ key })}
                >
                <Tab eventKey="personalinfo" title="Personal info">
                	<div className="form-control">
                    <p className="profileInputsTitle">First Name</p>
                    <p className="profileInputsValue">{this.state.firstName}</p>
                  </div>
                  <div className="form-control">
                    <p className="profileInputsTitle">Last Name</p>
                    <p className="profileInputsValue">{this.state.lastName}</p>
                  </div>
                  <div className="form-control">
                    <p className="profileInputsTitle">Firm Name</p>
                    <p className="profileInputsValue">{this.state.lawFirm}</p>
                  </div>
                  <form onSubmit={this.handleSubmit}>
                    <input className="form-control" name="password" type="password" placeholder="New password" onChange={this.handleChange} />
                    <input className="form-control" name="confirm"  type="password" placeholder="Confirm"      onChange={this.handleChange} />
                    <input type="submit" value="Submit" />
                  </form>
                  <div className="form-control">
                    <p className="profileInputsTitle">State Bar Number</p>
                    <p className="profileInputsValue">{this.state.stateBar}</p>
                  </div>
                  <div className="form-control">
                    <p className="profileInputsTitle">Office Phone</p>
                    <p className="profileInputsValue">{this.state.officePhone}</p>
                  </div>
                  <div className="form-control">
                    <p className="profileInputsTitle">Mobile Phone</p>
                    <p className="profileInputsValue">{this.state.mobilePhone}</p>
                  </div>
                  <div className="form-control">
                    <p className="profileInputsTitle">Street Address 1</p>
                    <p className="profileInputsValue">{this.state.data && this.state.data.mailingAddress[0].streetAddrOne ? this.state.data.mailingAddress[0].streetAddrOne :null}</p>
                  </div>
                  <div className="form-control">
                    <p className="profileInputsTitle">Street Address 2</p>
                    <p className="profileInputsValue">{this.state.data && this.state.data.mailingAddress[0].streetAddrTwo ? this.state.data.mailingAddress[0].streetAddrTwo :null}</p>
                  </div>
                  <div className="form-control">
                    <p className="profileInputsTitle">City</p>
                    <p className="profileInputsValue">{this.state.data && this.state.data.mailingAddress[0].city ? this.state.data.mailingAddress[0].city :null}</p>
                  </div>
                  <div className="form-control">
                    <p className="profileInputsTitle">State</p>
                    <p className="profileInputsValue">{this.state.data && this.state.data.mailingAddress[0].state ? this.state.data.mailingAddress[0].state :null}</p>
                  </div>
                  <div className="form-control">
                    <p className="profileInputsTitle">Zip</p>
                    <p className="profileInputsValue">{this.state.data && this.state.data.mailingAddress[0].zip ? this.state.data.mailingAddress[0].zip :null}</p>
                  </div>
                  <div className="form-control">
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


const validate = values => {
  const errors = {}
  if(!values.password) {
    errors.password = 'Insert password'
  }
  if(!values.confirm) {
    errors.confirm = 'Insert confirm password'
  }

  return errors;
}
















