import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import  { Tabs, Tab } from 'react-bootstrap';
import {userServices} from '../../_services';
import Header from '../HeaderComponent';

export default class ProfileComponent extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      key: 'personalinfo',
      notification: "",
    };

    
  }

  componentWillMount(){
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
        data: data.data,
        notification: data.data.notification
        })
      )
      this.handleChange = this.handleChange.bind(this); // Bind boolean checkbox value.
      console.log("will")
  }

  componentDidMount(){
    console.log("did")
    console.log(this.state)
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

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

	render() {
    if(this.state.data && this.state.data.mailingAddress[0].city){
   }
    
		return (
      <div>
        <Header guest="1" />
        <div className="container main-body">
				<h3><Link style={{color: "black"}} to="/home"><i className="fas fa-1x fa-angle-left"></i></Link> Profile</h3>
				<div className="center">
   		        <Tabs
                  id="controlled-tab-example"
                  activeKey={this.state.key}
                  onSelect={key => this.setState({ key })}
                >
                <Tab eventKey="personalinfo" title="Personal info">
                  <div className="text-center">
                    <img className="round-circle" src={this.state.profilePicture} alt="user"/><br />
                  </div>
                  <div className="form-control bigInput">
                    <p className="profileInputsTitle">First Name</p>
                    <p className="profileInputsValue">{this.state.firstName}</p>
                  </div>
                  <div className="form-control bigInput">
                    <p className="profileInputsTitle">Last Name</p>
                    <p className="profileInputsValue">{this.state.lastName}</p>
                  </div>
                  <p className="p-profile">Account info</p>
                  <form onSubmit={this.handleSubmit}>
                    <input className="form-control bigInput" name="password" type="password" placeholder="New password" onChange={this.handleChange} />
                    <input className="form-control bigInput" name="confirm"  type="password" placeholder="Confirm"      onChange={this.handleChange} />
                    
                    <p className="p-profile">Notifications</p>
                    <div className="form-check form-check-inline">
                     <input className="form-check-input" name="notification" type="checkbox" id="notification" checked={this.state.notification} onChange={this.handleChange } />
                     <label className="form-check-label" htmlFor="notification">Email</label>
                    </div>

                    <Link className="link-profile" to="/">Delete Account</Link>
                    

                    <input className="btn btn-block btn-outline-primary btn-profile" type="submit" value="Save" />
                  </form>

                </Tab>
                <Tab eventKey="professionalinfo" title="Prof info">

                  <div className="form-control bigInput">
                    <p className="profileInputsTitle">Firm Name</p>
                    <p className="profileInputsValue">{this.state.lawFirm}</p>
                  </div>

                  <div className="form-control bigInput">
                    <p className="profileInputsTitle">State Bar Number</p>
                    <p className="profileInputsValue">{this.state.stateBar}</p>
                  </div>
                  <div className="form-control bigInput">
                    <p className="profileInputsTitle">Office Phone</p>
                    <p className="profileInputsValue">{this.state.officePhone}</p>
                  </div>
                  <div className="form-control bigInput">
                    <p className="profileInputsTitle">Mobile Phone</p>
                    <p className="profileInputsValue">{this.state.mobilePhone}</p>
                  </div>
                  <div className="form-control bigInput">
                    <p className="profileInputsTitle">Street Address 1</p>
                    <p className="profileInputsValue">{this.state.data && this.state.data.mailingAddress[0].streetAddrOne ? this.state.data.mailingAddress[0].streetAddrOne :null}</p>
                  </div>
                  <div className="form-control bigInput">
                    <p className="profileInputsTitle">Street Address 2</p>
                    <p className="profileInputsValue">{this.state.data && this.state.data.mailingAddress[0].streetAddrTwo ? this.state.data.mailingAddress[0].streetAddrTwo :null}</p>
                  </div>
                  <div className="form-control bigInput">
                    <p className="profileInputsTitle">City</p>
                    <p className="profileInputsValue">{this.state.data && this.state.data.mailingAddress[0].city ? this.state.data.mailingAddress[0].city :null}</p>
                  </div>
                  <div className="form-control bigInput">
                    <p className="profileInputsTitle">State</p>
                    <p className="profileInputsValue">{this.state.data && this.state.data.mailingAddress[0].state ? this.state.data.mailingAddress[0].state :null}</p>
                  </div>
                  <div className="form-control bigInput">
                    <p className="profileInputsTitle">Zip</p>
                    <p className="profileInputsValue">{this.state.data && this.state.data.mailingAddress[0].zip ? this.state.data.mailingAddress[0].zip :null}</p>
                  </div>
                  <div className="form-control bigInput">
                    <p className="profileInputsTitle">Email</p>
                    <p className="profileInputsValue">{this.state.email}</p>
                  </div>
                </Tab>
                <Tab eventKey="transactions" title="Transactions" >

                </Tab>
            </Tabs>
				</div>
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
