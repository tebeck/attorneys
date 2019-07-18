import React, {Component} from 'react';
import { Redirect, Link } from 'react-router-dom';
import {userServices} from '../../_services/user.service'
import "react-step-progress-bar/styles.css";
import { ProgressBar } from "react-step-progress-bar";
import Header from '../HeaderComponent';
import Modal from 'react-awesome-modal';
import SelectUSState from 'react-select-us-states';
import '../../_assets/css/ownstylesheet.scss';
import uploadImg from '../../_assets/img/upload_picture.png'
import checkImg from '../../_assets/img/appearance/appearance_check.png'
import backbutton from '../../_assets/img/btnback.png'
import LoaderAnimation from '../LoaderAnimation';
import Switch from "react-switch";
import Cookies from 'js-cookie';

export default class RegisterForm extends Component {

 constructor(props) {
  super(props)
  let role = this.props.location.state;
  // const backhome = this.props.location.backhome;
  let isAttorney = true;
  let isSeeker = false;
  if (!role){
    isAttorney = props.isAttorney;
    isSeeker = props.isSeeker;
  }else{
    isAttorney = role.isAttorney;
    isSeeker = role.isSeeker;
  }


  this.state = {
    currentStep: 1,              // Init current step at 1.
    errors: {},                  // onSubmit errors stored here.
    visible: false,              // Modal visible ?.
    isAttorney: isAttorney,
    isSeeker: isSeeker,
    onHold: isSeeker,
    backhome: false,

    //validate form
    enableNextAction: false,     // enable next action button (invalid data in form)
    enableErrors: false,         // don't show errors when form is empty
    emailValid: false,
    firstNameValid: false,
    lastNameValid: false,
    
    firmNameValid: false,
    stateBarValid: false,
    officePhoneValid: false,
    mobilePhoneValid: false,

    streetAddrOneValid: false,
    cityValid: false,
    zipValid: false,

    showLoader: false,

    // form state
    firstName: "",
    lastName: "",
    firmName:"",
    stateBar: "",
    officePhone: "",
    mobilePhone: "",
    email: "",
    streetAddrOne: "",
    streetAddrTwo: "",
    city: "",
    _state: "AL",
    zip:"",
    password: "",
    profilePicture:"",
    creditCard:"",
    // policy:"",
    policy: false,
    insurancePolicy:"",
    image: ""

  }

  this.setNewState = this.setNewState.bind(this);
  this.handleChangeChk = this.handleChangeChk.bind(this); // Bind boolean checkbox value.
  this.handleChangeCheck = this.handleChangeCheck.bind(this); // Bind boolean checkbox value.

 }



  fileSelectedHandler = ({target}) => {
    const newForm = new FormData();
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

handleSubmit = (e) => {
    e.preventDefault()
    this.setState({ showLoader: true })
    const {errors,...noErrors} = this.state // Destructuring...
    const result = validate(noErrors)
    
    if(this.state.isSeeker && this.state.stateBar === ""){
      result.stateBar = "Please insert state bar"
    }

    this.setState({errors: result})

    if (!Object.keys(result).length) {  
      this.setState({ showLoader: false })
      const mailingAddress = {
        streetAddrOne: noErrors.streetAddrOne,
        streetAddrTwo: noErrors.streetAddrTwo,
        city: noErrors.city,
        state: noErrors._state,
        zip: noErrors.zip
      }

     noErrors.mailingAddress = mailingAddress;
     noErrors.state = this.state._state;
     console.log(noErrors)
     userServices.register(noErrors).then(response => {
        if (response.state && response.state === 200) {
          this.openModal()
        } 
        else {
        // Error validating email
          this.setState({ 
            error: response.message,
            showLoader: false 
          })
        }
      })
    } else {
        this.setState({ 
          errors: result,
          showLoader: false
        })
    }

}

  _next = () => {
    let currentStep = this.state.currentStep

    if (!this.state.enableNextAction){ // there are errors
      console.log(this.state)
      this.setState({
        enableErrors: true
      })

    }else{
      currentStep = currentStep >= 2? 3: currentStep + 1

      this.setState({
        currentStep: currentStep,
        enableErrors: false,
        enableNextAction: false
      })
    }
  }

  _prev = () => {

    if (this.props.location.backhome){
     this.props.history.push({ pathname: '/', state: {...this.state} })
    }

    if(this.state.enableNextAction === false){
      this.setState({
        enableNextAction: true
      })
    }
    let currentStep = this.state.currentStep
    currentStep = currentStep <= 1 ? 0 : currentStep - 1
    this.setState({
      currentStep: currentStep
    })
    if (currentStep <= 0){
       this.setState({defineroleRedirect: true});
    }
  }


nextButton(){
  let currentStep = this.state.currentStep;
  if(currentStep <3){
    return (
      <div>
      <button
        className="btn btn-primary link-button wizard-btn btn-block"
        type="button" onClick={this._next}>
      Continue
      </button><br/><br/>
      </div>
    )
  }
  return null;
}


  handleChange = ({target}) =>{

    this.state.errors.creditCard = false;
    

    let enableNextAction = this.state.enableNextAction;
    let emailValid = this.state.emailValid;
    let firstNameValid = this.state.firstNameValid;
    let lastNameValid = this.state.lastNameValid;
    let firmNameValid = this.state.firmNameValid;
    let stateBarValid = this.state.stateBarValid;
    let officePhoneValid = this.state.officePhoneValid;
    let mobilePhoneValid = this.state.mobilePhoneValid;
    let streetAddrOneValid = this.state.streetAddrOneValid;
    let cityValid = this.state.cityValid;
    let zipValid = this.state.zipValid;



    if (this.state.currentStep === 1){
      if (target.name === 'email'){
        if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(target.value)){
          emailValid=true;
        }else{
          emailValid=false;
          enableNextAction = false;
        }
      }
      if (target.name === 'firstName'){
        if (target.value.length<2) {
          enableNextAction=false;
          firstNameValid=false;
        }else{
          firstNameValid=true;
        }
      }
      if (target.name === 'lastName'){
        if (target.value.length<2) {
          enableNextAction=false
          lastNameValid=false;
        }else{
          lastNameValid=true;
        }
      }
      if (target.name === 'firmName'){
        if (target.value.length<2) {
          enableNextAction=false
          firmNameValid=false;
        }else{
          firmNameValid=true;
        }
      }
      if (target.name === 'stateBar'){
        if (target.value.length<2) {
          enableNextAction=false
          stateBarValid=false;
        }else{
          stateBarValid=true;
        }
      }
      if (target.name === 'officePhone'){
        if(isNaN(target.value)) {
          enableNextAction=false
          officePhoneValid=false;
        }else{
          officePhoneValid=true;
        }
      }
      if (target.name === 'mobilePhone'){
        if(isNaN(target.value)) {
          enableNextAction=false
          mobilePhoneValid=false;
        }else{
          mobilePhoneValid=true;
        }
      }


      if (firstNameValid && emailValid && lastNameValid && firmNameValid && stateBarValid && officePhoneValid && mobilePhoneValid){
        enableNextAction=true
      }
      const newState = {
        emailValid: emailValid,
        firstNameValid: firstNameValid,
        lastNameValid: lastNameValid,
        firmNameValid: firmNameValid,
        stateBarValid: stateBarValid,
        officePhoneValid: officePhoneValid,
        mobilePhoneValid: mobilePhoneValid,
        enableNextAction: enableNextAction
      };
      // console.log('newState: ',newState)
      this.setState(newState);
    }

if (this.state.currentStep === 2){
    if (target.name === 'streetAddrOne'){
      if (target.value.length<2) {
        enableNextAction=false
        streetAddrOneValid=false;
      }else{
        streetAddrOneValid=true;
      }
    }
    if (target.name === 'city'){
      if (target.value.length<2) {
        enableNextAction=false
        cityValid=false;
      }else{
        cityValid=true;
      }
    }
    if (target.name === 'zip'){
      if (target.value.length<2) {
        enableNextAction=false
        zipValid=false;
      }else{
        zipValid=true;
      }
    }
      if (streetAddrOneValid && cityValid && zipValid){
        enableNextAction=true
        console.log("ahora es true!")
      }
      const newState = {
        emailValid: emailValid,
        firstNameValid: firstNameValid,
        lastNameValid: lastNameValid,
        streetAddrOneValid: streetAddrOneValid,
        cityValid: cityValid,
        zipValid: zipValid,
        enableNextAction: enableNextAction
      };
      console.log('newState: ',newState)
      this.setState(newState);
    }

    this.state.error = false;
    
    this.setState({ [target.name]: target.value })

  }

  handleChangeChk() {
    this.setState(state => ({
      notification: !state.notification
    }));
  }

  openModal() {
      this.setState({
          visible : true
      });
  }

  closeModal() {
      this.setState({
          visible : false
      });
  }

  setNewState(newValue) {
    console.log('this is the State code:' + newValue);
    this.setState({
      _state: newValue
    })
  }

  // set and push Redirect
  setHomeRedirect = () => { this.setState({ homeRedirect: true }) }
  pushingRedirect = () => { if (this.state.homeRedirect) { this.props.history.push({ pathname: '/', state: {...this.state} }) }}

  // set and push register seeker Redirect.
  setValidSeeker = (e) => {
   e.preventDefault();
   
   let body = {
     userId: Cookies.getJSON('esquired').userId
   }
   
   if(e.target.insurancePolicy){
     body.insurancePolicy = e.target.insurancePolicy.value
   }
   
   console.log(body)
    userServices.makeSeeker(body)
     .then(res => {
      if (res.state !== 200) {
        console.log(res)
    } else {
        console.log(res)
        window.location.assign('/')
    }
  })

  }

  handleChangeCheck(policy) {
    this.setState({ policy });
  }


  render(){
 
  if(this.state.showLoader){
  return (
      <div className="centered"><LoaderAnimation /></div>
  )}
    if (this.state.defineroleRedirect) { return <Redirect push to="/definerole" /> } // Go back to /definerole

    const {currentStep} = this.state
     let currentTitle = "";

    switch(currentStep){
      case 1:
        currentTitle = "Personal Information"
        break;
      case 2:
        currentTitle = "Address Information"
        break;
      case 3:
        currentTitle = "Account Information"
        break;
      default:
        currentTitle = "null"
        break;
    }

   return(
    <div>
       <Modal className="registerModal" width="450px" visible={this.state.visible} effect="fadeInDown" onClickAway={() => this.closeModal()} >
          <div style={{padding: "30px 30px 0px 30px", textAlign: "center"}}>
           <h5>Your account has been created successfully!</h5>
          </div>
            {this.state.isAttorney ?
            <div className="modalHead" style={{margin:"30px"}}>
              <p>In the meantime, are you also planning to act as an Appearing Attorney?</p>
              {this.pushingRedirect()}
              <form onSubmit={this.setValidSeeker}>
               {this.state.isAttorney && !this.state.stateBar ? <input className="form-control" type="text" placeholder="State Bar" name="stateBar" onChange={this.onChange} required />: null }
                <input type="submit" className="btn btn-block btn-primary link-button" value="Add this to my profile"/>
              </form>
            </div> : <p style={{padding:"20px"}}>You will receive a notification once your profile is approved.</p>}
            <Link style={{margin:"30px"}} to='/home' className="btn btn-block btn-primary link-button">Back home</Link>
        </Modal>


      <Header guest="1" />
      <div className="container main-body">

      <h3 onClick={this._prev} className="clickable"><img style={{marginBottom: "5px"}} width="16px" src={backbutton} alt="esquired" /> {currentTitle}</h3>

        <div className={this.state.emailError ? 'display' : 'hide'}>
          <div className="alert alert-danger" role="alert"> Email already in use. Try another.</div>
        </div>

        <form onSubmit={this.handleSubmit} id="registerSeeker">
         {this.state.isSeeker ? <input type="hidden" name="isSeeker" value={true} /> : <input type="hidden" name="isAttorney" value={true} /> }
         {this.state.isSeeker ? <input type="hidden" name="onHold" value={true} /> : null }

         <input className="form-control" type="hidden" value={this.state.image}></input>
        
        <Step1
          currentStep={currentStep}
          handleChange={this.handleChange}
          firstName={this.state.firstName}
          lastName={this.state.lastName}
          firmName={this.state.firmName}
          stateBar={this.state.stateBar}
          officePhone={this.state.officePhone}
          mobilePhone={this.state.mobilePhone}
          email={this.state.email}
          state={this.state}
        />
        <Step2
          currentStep={currentStep}
          handleChange={this.handleChange}
          streetAddrOne={this.state.streetAddrOne}
          streetAddrTwo={this.state.streetAddrTwo}
          city={this.state.city}
          _state={this.state._state}
          zip={this.state.zip}
          policy={this.state.policy}
          insurancePolicy={this.state.insurancePolicy}
          state={this.state}
          setNewState={this.setNewState}
          handleChangeCheck={this.handleChangeCheck}
        />
        <Step3
          currentStep={currentStep}
          fileSelectedHandler={this.fileSelectedHandler}
          handleChange={this.handleChange}
          password={this.state.password}
          creditCard={this.state.creditCard}
          profilePicture={this.state.profilePicture}
          showImage={this.state.showImage}
          image={this.state.image}
          notification={this.state.notification}
          handleChangeChk={this.handleChangeChk}
          state={this.state}
          handleChangeCheck={this.handleChangeCheck}
        />



          {this.nextButton()}


        </form>

      </div>
   </div>
      )
   }

  }


function Step1(props){
    if(props.currentStep !== 1){
      return null
    }

    return(
      <div>
        <br />
        <div className="center"><ProgressBar height={5} percent={45} filledBackground="#2ad4ae" ></ProgressBar> <img className="grey-check-icon" width="18px" src={checkImg} /></div><br />
        <br />
        <p>Complete info</p>
        <input className={props.state.firstNameValid||!props.state.enableErrors ? "form-control" : "error"} type="text" name="firstName"   placeholder="First Name"          value={props.firstName}   onChange={props.handleChange}></input>
        <input className={props.state.lastNameValid ||!props.state.enableErrors ? "form-control" : "error"} type="text" name="lastName"    placeholder="Last Name"           value={props.lastName}    onChange={props.handleChange}></input>
        <input className={props.state.firmNameValid ||!props.state.enableErrors ? "form-control" : "error"} type="text" name="firmName"     placeholder="Firm Name"           value={props.firmName}     onChange={props.handleChange}></input>
        <input className={props.state.stateBarValid ||!props.state.enableErrors ? "form-control" : "error"} type="text" name="stateBar"    placeholder="State Bar Number"    value={props.stateBar}    onChange={props.handleChange}></input>
        <input className={props.state.officePhoneValid ||!props.state.enableErrors ? "form-control" : "error"} type="text" name="officePhone" placeholder="Office Phone Number" value={props.officePhone} onChange={props.handleChange}></input>
        <input className={props.state.mobilePhoneValid ||!props.state.enableErrors ? "form-control" : "error"} type="text" name="mobilePhone" placeholder="Mobile Phone Number" value={props.mobilePhone} onChange={props.handleChange}></input>
        <input className={props.state.emailValid||!props.state.enableErrors ? "form-control" : "error"} type="text" name="email"       placeholder="Email"               value={props.email}       onChange={props.handleChange}></input>
      </div>
    )
  }

  function Step2(props){
    if(props.currentStep !== 2){
      return null
    }
   
     console.log(props.policy)
     
      if (props.state.streetAddrOneValid && props.state.cityValid && props.state.zipValid){
        props.state.enableNextAction=true
      }

    return (
      <div>
      <br />
        <div className="center"><ProgressBar  height={5} percent={75} filledBackground="#2ad4ae" ></ProgressBar> <img className="grey-check-icon" width="18px" src={checkImg} /> </div>
        <br />
        <input className={props.state.streetAddrOneValid||!props.state.enableErrors ? "form-control" : "error"} type="text" name="streetAddrOne"   placeholder="Street Address 1" value={props.streetAddrOne}   onChange={props.handleChange}></input>
        <input className="form-control" type="text" name="streetAddrTwo"   placeholder="Street Address 2" value={props.streetAddrTwo}   onChange={props.handleChange}></input>
        <input className={props.state.cityValid||!props.state.enableErrors ? "form-control" : "error"}          type="text" name="city"            placeholder="City"             value={props.city}            onChange={props.handleChange}></input>
        <SelectUSState default="" className="form-control" name="_state" onChange={props.setNewState}/>
        <input className={props.state.zipValid||!props.state.enableErrors ? "form-control" : "error"}           type="text" name="zip"             placeholder="Zip"              value={props.zip}             onChange={props.handleChange}></input>
        
        
        <br/>
        <div className="flex-space-between">
          <label> Do you have professional liability insurance?</label>
            <div className="flex-space-between">
                 <span style={{marginRight: "5px"}}>No </span><Switch onChange={props.handleChangeCheck} offColor="#B9D5FB" onColor="#2ad4ae" checkedIcon={false} uncheckedIcon={false} height={25} checked={props.policy} /><span style={{marginLeft:"5px"}}>Yes</span></div>
        </div>
        <br/>
        
        
      </div>
    )
  }

  function Step3(props){
    if(props.currentStep !== 3){
      return null
    }

    return (
       <div>
       <br />
        <div className="center"><ProgressBar height={5} percent={100} filledBackground="#2ad4ae" ></ProgressBar> <img width="18px" src={checkImg} /></div>
        <br />
        
        <div className="text-center">
        <label className="uploadLabel" htmlFor="avatar">
        { props.state.profilePicture ? <img alt="avatar" width="200px" src={props.state.profilePicture} /> : <div><img src={uploadImg} alt="profileImg" width="150px" /><br />Upload Profile Picture<br /></div> }
        
        </label>
        <input id="avatar" type="file" className="inputfile" name="avatar" onChange={props.fileSelectedHandler} /><br /><br /> 
        </div>

        <label> Password</label>
        <input className="form-control" type="password" name="password"   placeholder="Password"         value={props.password}   onChange={props.handleChange}></input>
        <label> Payment Info</label>
        <input className="form-control" type="text"     name="creditCard" placeholder="Credit Card Number" value={props.creditCard} onChange={props.handleChange} maxLength={16}></input>
        

        <label>Notifications</label><br />
        <div className="form-check form-check-inline">
         <input className="form-check-input" name="notification" type="checkbox" id="notification" value={props.notification} onClick={props.handleChangeChk} />
         <label className="form-check-label" htmlFor="notification">Email</label>
        </div><br/><br/>

        {props.state.errors.password && <div className="alert alert-danger" role="alert">{props.state.errors.password}</div>}
        {props.state.errors.firstName && <div className="alert alert-danger" role="alert">{props.state.errors.firstName}</div>}
        {props.state.errors.lastName && <div className="alert alert-danger" role="alert">{props.state.errors.lastName}</div>}
        {props.state.errors.firmName && <div className="alert alert-danger" role="alert">{props.state.errors.firmName}</div>}
        {props.state.errors.stateBar && <div className="alert alert-danger" role="alert">{props.state.errors.stateBar}</div>}
        {props.state.errors.officePhone && <div className="alert alert-danger" role="alert">{props.state.errors.officePhone}</div>}
        {props.state.errors.mobilePhone && <div className="alert alert-danger" role="alert">{props.state.errors.mobilePhone}</div>}
        {props.state.errors.email && <div className="alert alert-danger" role="alert">{props.state.errors.email}</div>}
        {props.state.errors.creditCard && <div className="alert alert-danger" role="alert">{props.state.errors.creditCard}</div>}
        {props.state.errors.policy && <div className="alert alert-danger" role="alert">{props.state.errors.policy}</div>}
        {props.state.errors.streetAddOne && <div className="alert alert-danger" role="alert">{props.state.errors.streetAddOne}</div>}
        {props.state.errors.streetAddTwo && <div className="alert alert-danger" role="alert">{props.state.errors.streetAddTwo}</div>}
        {props.state.errors.city && <div className="alert alert-danger" role="alert">{props.state.errors.city}</div>}
        {props.state.errors.zip && <div className="alert alert-danger" role="alert">{props.state.errors.zip}</div>}
        {props.state.error && <div className="alert alert-danger" role="alert">{props.state.error}</div>}
        <br />

        <div className="termsLabel">
          <Link target="_blank" to="/terms" style={{color: "black"}}>Terms and Conditions</Link>
        </div>
        <br />

        <input className="btn btn-block btn-primary link-button active" type="submit" value="Create Account"></input><br />

        
      </div>
    )
}

// Validations

const validator = require('validator');
const validate = values => {

const errors = {}
  // email
  if(!values.email) { errors.email = 'Insert email' }
  if(values.email && !validator.isEmail(values.email)){ errors.email = "Invalid email"}


  // password
  if(values.password && !validator.isLength(values.password, 8, 20)){ errors.password = "Password must be between 8 and 20 characters"}
  if(!values.password) { errors.password = 'Insert a valid password' }

  if(!values.streetAddrOne) { errors.streetAddrOne = 'Insert streetAddrOne' }


  if(!values.city) { errors.city = 'Insert city' }

  if(!values.zip) { errors.zip = 'Insert zip' }

  if(!values.firstName) { errors.firstName = 'Insert firstName' }

  if(!values.lastName) { errors.lastName = 'Insert lastName' }

  if(values.creditCard && !validator.isCreditCard(values.creditCard)){ errors.creditCard = 'Invalid credit card number' }
  if(!values.creditCard) { errors.creditCard = 'Insert creditCard'}

  console.log(errors)
  return errors;
}
