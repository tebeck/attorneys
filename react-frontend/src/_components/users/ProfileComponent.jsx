import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import  { Tabs, Tab } from 'react-bootstrap';
import {userServices} from '../../_services';
import Header from '../HeaderComponent';
import uploadImg from '../../_assets/img/upload_picture.png'
import Cookies from 'js-cookie';
import backbutton from '../../_assets/img/btnback.png'

export default class ProfileComponent extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      key: 'personalinfo',
      notification: "",
      firstName: "",
      lastName: "",
      email:"",
      password:"",
      firmName: "",
      policy: "",
      officePhone: "",
      mobilePhone: "",
      streetAddrOne: "",
      creditCard: "",
      showImage:true,
      image:""
    };

    
  }

  componentWillMount(){
    userServices.getProfile()
      .then(data => this.setState({
        firstName: data.data.firstName,
        lastName: data.data.lastName,
        firmName: data.data.firmName,
        stateBar: data.data.stateBar,
        officePhone: data.data.officePhone,
        mobilePhone: data.data.mobilePhone,
        email: data.data.email,
        profilePicture: data.data.profilePicture,
        password: data.data.password,
        _userId: data.data._id,
        creditCard: data.data.creditCard,
        notification: data.data.notification,
        policy: data.data.policy,
        streetAddrOne: data.data.mailingAddress[0].streetAddrOne,
        image: data.data.profilePicture,
        data: data.data
        
        })
      )
      this.handleChange = this.handleChange.bind(this); // Bind boolean checkbox value.
  }





  fileSelectedHandler = ({target}) => {
    const newForm = new FormData();
    console.log(target.value)
    if(target.value !== ""){

     newForm.append('avatar',  target.files[0] , target.files[0].name)

    userServices.upload(newForm)
      .then(data => {
         console.log(data)
         this.setState({
         image: data.data.location,
         profilePicture: data.data.location
          })
      })

    this.setState({
      profilePicture: URL.createObjectURL(target.files[0]),
      showImage: true
    })

  } else {
    console.log("No image selected")
  }

  }


  openModal() {
      this.setState({
          visible : true
      });
  }

  handleAccSubmit = (e) =>{
    e.preventDefault();
     const {...noErrors} = this.state // Destructuring...
     const result = validate(noErrors)
     this.setState({errors: result})

     if(!Object.keys(result).length) {
       console.log(noErrors)
        userServices.updateAccountInfo(noErrors).then(
          res =>{
           alert(res)
          }
        )
     }
  }

  handleProfSubmit = (e) =>{
   e.preventDefault();
     const {...noErrors} = this.state // Destructuring...
     // const result = validateProf(noErrors)
     // this.setState({errors: result})
     console.log(noErrors)
     // if(!Object.keys(result).length) {
        userServices.updateProfInfo(noErrors).then(
          res =>{
           alert(res)
          }
        )
     // } 
     // console.log(result)
  }

  handleAttorney = () =>{

   let body = {
     userId: this.state._userId
   }

    userServices.makeAttorney(body)
      .then(res => {
        if (res.state !== 200) {
          console.log(res)
      } else {
          console.log(res)
          let token = Cookies.getJSON('esquired').token;
          Cookies.set('esquired', {token: token, user: res.data.firstName, email: res.data.email, isAttorney: true, isSeeker: true,onHold: false}, { path: '' })   

      
    } 
  })
    }


    handleLogout = () =>{
    Cookies.remove('esquired');
    window.location.assign('/home');

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

   const {errors} = this.state

		return (
      <div>
        <Header guest="1" />
          <div className="container main-body">
  				  <Link style={{color: "black"}} to="/home"><img style={{marginBottom: "11px"}} width="16px" src={backbutton} alt="esquired" /><h3 style={{display: "inline"}  }> Profile</h3></Link>
          <div className="" style={{flexWrap: "none",alignItems: "center",justifyContent: "center"}}>
            <Tabs 
              id="controlled-tab-example"
              activeKey={this.state.key}
              onSelect={key => this.setState({ key })}
              className="tabs-control"
            >
             <Tab eventKey="personalinfo" title="Account info">
               
               <br />
                <div className="text-center">
                   <label className="uploadLabel" htmlFor="avatar">
                     { this.state.profilePicture ? <img alt="avatar" width="200px" src={this.state.profilePicture} /> : <img src={uploadImg} alt="profileImg" /> }
                     <br/><br/>Upload Profile Picture
                   </label>
                   <input id="avatar" type="file" className="inputfile" name="avatar" onChange={this.fileSelectedHandler} /><br /><br />    
                </div>

                  <form onSubmit={this.handleAccSubmit}>
                    <input className="form-control" type="hidden" name="avatar" value={this.state.image}></input>
                    <div className="form-group">
                      <label htmlFor="firstName" className="profileInputsTitle">First Name</label>
                      <input id="firstName" name="firstName" className="form-control bigInput" value={this.state.firstName} placeholder={this.state.firstName} onChange={this.handleChange} type="text" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastName" className="profileInputsTitle">Last Name</label>
                      <input id="lastName" name="lastName" className="form-control bigInput" value={this.state.lastName} placeholder={this.state.lastName} onChange={this.handleChange} type="text" />
                    </div>

                    <p className="p-profile">Account info</p>
                    <input disabled className="form-control bigInput" name="email"       type="email"    placeholder={this.state.email} onChange={this.handleChange} value={this.state.email} />
                    <input className="form-control bigInput" name="password"    type="password" placeholder="Old Password"         onChange={this.handleChange} />
                    <input className="form-control bigInput" name="newpassword" type="password" placeholder="New Password"     onChange={this.handleChange} />
                    <input className="form-control bigInput" name="confirm"     type="password" placeholder="Confirm"          onChange={this.handleChange} />
                    
                    
                    <p className="p-profile">Notifications</p>
                    <div className="form-check form-check-inline">
                     <input className="form-check-input" name="notification" type="checkbox" id="notification" checked={this.state.notification} onChange={this.handleChange } />
                     <label className="form-check-label" htmlFor="notification">Email</label>
                    </div>

                    <Link className="link-profile link-delete" to="/">Delete Account</Link><br /> 
                    
                    { !Cookies.getJSON('esquired').isAttorney ? <button type="button" className="btn btn-block btn-secondary" onClick={this.handleAttorney}>Be Attorney Of Record</button> : null }<br/>

                    <input className="btn btn-block btn-outline-primary btn-profile" style={{marginTop: "5px"}} type="submit" value="Save" />
                  </form><br/><br/>
                  <button className="btn btn-block btn-danger" onClick={this.handleLogout}>Logout</button>

                  <br/><br/>
                </Tab>
                <Tab eventKey="professionalinfo" title="Professional info">
                  <form onSubmit={this.handleProfSubmit}>
                    <div className="form-group">
                      <label htmlFor="firmName" className="profileInputsTitle">Firm Name</label>
                      <input id="firmName" name="firmName" className="form-control bigInput" value={this.state.firmName} placeholder={this.state.firmName} onChange={this.handleChange} type="text" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="policy" className="profileInputsTitle">Practice Insurance Policy Number</label>
                      <input id="policy" name="policy" className="form-control bigInput" value={this.state.policy} placeholder={this.state.policy} onChange={this.handleChange} type="text" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="officePhone" className="profileInputsTitle">Office Phone</label>
                      <input id="officePhone" name="officePhone" className="form-control bigInput" value={this.state.officePhone} placeholder={this.state.officePhone} onChange={this.handleChange} type="text" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="mobilePhone" className="profileInputsTitle">Mobile Phone</label>
                      <input id="mobilePhone" name="mobilePhone" className="form-control bigInput" value={this.state.mobilePhone} placeholder={this.state.mobilePhone} onChange={this.handleChange} type="text" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="streetAddrOne" className="profileInputsTitle">Street Address</label>
                      <input id="streetAddrOne" name="streetAddrOne" className="form-control bigInput" value={this.state.streetAddrOne} placeholder={this.state.streetAddrOne} onChange={this.handleChange} type="text" />
                    </div>
                    <p className="p-profile">Payment Info</p>
                    <div className="form-group">
                      <label htmlFor="creditCard" className="profileInputsTitle">Credit Card</label>
                      <input id="creditCard" name="creditCard" className="form-control bigInput" value={this.state.creditCard} placeholder={this.state.creditCard} onChange={this.handleChange} type="text" maxLength={16} />
                    </div>
                    <input className="btn btn-block btn-outline-primary btn-profile" type="submit" value="Save" />
                    <br/><br/>
                  </form>
                </Tab>
                
                <Tab eventKey="transactions" title="Transactions" >
                  <br /><br /><p>You don't have transactions</p>
                </Tab>
            </Tabs>
				</div>
			</div>
			</div>
		);


 }

}


// Validations

const validator = require('validator');
const validate = values => {

const errors = {}
  // email
  // if(!values.email) { errors.email = 'Insert email' }
  // if(values.email && !validator.isEmail(values.email)){ errors.email = "Invalid email"}
  
  // password
  if(values.newpassword && values.newpassword.length > 0 && !validator.isLength(values.password, 8, 20)){ errors.password = "Password must be between 8 and 20 characters"}

  // if(!values.streetAddrOne) { errors.streetAddrOne = 'Insert streetAddrOne' }

  // if(!values.streetAddrTwo) { errors.streetAddrTwo = 'Insert streetAddrTwo' }

  // if(!values.city) { errors.city = 'Insert city' }

  // if(!values.zip) { errors.zip = 'Insert zip' }

  // if(!values.firstName) { errors.firstName = 'Insert firstName' }

  // if(!values.lastName) { errors.lastName = 'Insert lastName' }

  //  if(!values.firmName) { errors.firmName = 'Insert firmName' }

  //  if(values.stateBar && !validator.isInt(values.stateBar)){ errors.stateBar = 'State bar must be numeric' }
  //  if(!values.stateBar) { errors.stateBar = 'Insert state bar' }

  //  if(values.officePhone && !validator.isInt(values.officePhone)){ errors.officePhone = 'Office phone must be numeric' }
  //  if(!values.officePhone) { errors.officePhone = 'Insert officePhone' }

  //  if(values.mobilePhone && !validator.isInt(values.mobilePhone)){ errors.mobilePhone = 'Mobile phone must be numeric' }
  //  if(!values.mobilePhone) { errors.mobilePhone = 'Insert mobilePhone' }

  // if(values.creditCard && !validator.isCreditCard(values.creditCard)){ errors.creditCard = 'Invalid credit card number' }
  // if(!values.creditCard) { errors.creditCard = 'Insert creditCard'}

  //  if(values.policy && !validator.isInt(values.policy)){ errors.policy = 'Policy must be numeric' }
  //  if(!values.policy) { errors.policy = 'Insert policy' }

  // no below
  // if(values.insurancePolicy && !validator.isInt(values.insurancePolicy)){ errors.insurancePolicy = 'Insurance policy must be numeric' }
  // if(!values.insurancePolicy) { errors.insurancePolicy = 'Insert insurancePolicy' }

  console.log(errors)
  return errors;
}

