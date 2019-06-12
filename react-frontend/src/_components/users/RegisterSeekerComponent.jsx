import React, {Component} from 'react';
import { Redirect, Link } from 'react-router-dom';
import {userServices} from '../../_services/user.service'
import "react-step-progress-bar/styles.css";
import { ProgressBar } from "react-step-progress-bar";
import Modal from 'react-awesome-modal';


export default class RegisterForm extends Component {

 constructor(props) {
  super(props)
  const recordState = this.props.location.state;
   if(recordState){
      this.state = {
        ...recordState,   // Catch all state from attorney form and set it.
        homeRedirect: false
      }
   }
  this.handleChangeChk = this.handleChangeChk.bind(this); // Bind boolean checkbox value.
 }

 componentWillMount(){
  this.setState({

    currentStep: 1,   // Init current step at 1.
    errors: {},      // onSubmit errors stored here.
    visible: false, // Modal visible ?.

    // validation form
    enableNextAction: false, // enable next action button (invalid data in form)
    enableErrors: false, //don't show errors when form is empty

    emailValid: false,
    firstNameValid: false,
    lastNameValid: false,

    // form state
    firstName: "",
    lastName: "",
    lawFirm:"lawFirm",
    stateBar: "1",
    officePhone: "2",
    mobilePhone: "3",
    email: "",
    streetAddrOne: "one",
    streetAddrTwo: "two",
    city: "city",
    state: "state",
    zip:"zip",
    password: "password",
    profilePicture:"",
    creditCard:"5555555555554444",
    policy:"4",
    insurancePolicy:"5"
  })
 }


fileSelectedHandler = ({target}) => {

    const newForm = new FormData();
    newForm.append('avatar',  target.files[0] , target.files[0].name)

    userServices.upload(newForm)
      .then(data => { this.setState({
        profilePicture: data.data.location })
      })

    this.setState({
      image: URL.createObjectURL(target.files[0]),
      showImage: true
    })

  }

handleSubmit = (e) => {
    e.preventDefault()
    const {errors,...noErrors} = this.state // Destructuring...
    const result = validate(noErrors)
    this.setState({errors: result})

     if (!Object.keys(result).length && this.state.isAttorney) {
        let data = {"email": noErrors.email,"password": noErrors.password}
        let body = {userId: this.state._id}

          userServices.makeSeeker(body)
           .then(res => {
            if (res.state !== 200) {
              this.setState({aError: true})
            } else {
              console.log(res)
              this.openModal()
            }
          })
    }

    if (!Object.keys(result).length && !this.state.isAttorney) {

      const mailingAddress = {
         streetAddrOne: noErrors.streetAddrOne,
         streetAddrTwo: noErrors.streetAddrTwo,
         city: noErrors.city,
         state: noErrors.state,
         zip: noErrors.zip
       }

       noErrors.mailingAddress = mailingAddress;
       console.log(noErrors)


     userServices.register(noErrors).then(
      res =>{
        if (res.state !== 200) {
         this.setState({ emailError: true, email: "" })
        } else {
          console.log(res)
          this.openModal()
          }
      })
    }

    if (Object.keys(result).length) {
        this.setState({
            errors: result
        })
    }

}

  _next = () => {
    console.log('fn::next');
    let currentStep = this.state.currentStep

    if (!this.state.enableNextAction){ // there are errors
      this.setState({
        enableErrors: true
      })
    }else{
      currentStep = currentStep >= 2? 3: currentStep + 1

      this.setState({
        currentStep: currentStep,
        enableErrors: false
      })
    }
  }

  _prev = () => {
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
      <button
        //disabled={this.state.enableNextAction}
        className="btn btn-primary btn-block"
        type="button" onClick={this._next}>
      Continue
      </button>
    )
  }
  return null;
}


  handleChange = ({target}) =>{
    let enableNextAction = true;
    let emailValid = this.state.emailValid;
    let firstNameValid = this.state.firstNameValid;
    let lastNameValid = this.state.lastNameValid;


    if (this.state.currentStep === 1){
      if (target.name === 'email'){
        if (/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(target.value)){
          emailValid=true;
        }else{
          emailValid=false;
        }
      }
      if (target.name === 'firstName'){
        if (target.value.length<2) {
          firstNameValid=false;
        }else{
          firstNameValid=true;
        }
      }
      if (target.name === 'lastName'){
        if (target.value.length<2) {
          lastNameValid=false;
        }else{
          lastNameValid=true;
        }
      }

      if (firstNameValid && emailValid && lastNameValid){
        enableNextAction=true
      }
      const newState = {
        emailValid: emailValid,
        firstNameValid: firstNameValid,
        lastNameValid: lastNameValid,
        enableNextAction: enableNextAction
      };
      console.log('newState: ',newState)
      this.setState(newState);
    }

    this.setState({
      [target.name]: target.value
    })
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

  // set and push Redirect
  setHomeRedirect = () => { this.setState({ homeRedirect: true }) }
  pushingRedirect = () => { if (this.state.homeRedirect) { this.props.history.push({ pathname: '/', state: {...this.state} }) }}


  render(){

    if (this.state.defineroleRedirect) { return <Redirect push to="/definerole" /> } // Go back to /definerole

    const {isSeeker, currentStep, errors, isAttorney} = this.state
    var currentTitle = "";

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

  if(!isAttorney){
   return(
    <div className="container">
      <h3 onClick={this._prev}><i className="fas fa-1x fa-angle-left"></i> {currentTitle}</h3>

        <div className={this.state.emailError ? 'display' : 'hide'}>
          <div className="alert alert-danger" role="alert"> Email already in use. Try another.</div>
        </div>

        <form onSubmit={this.handleSubmit} id="registerSeeker">
         <input type="hidden" name="isSeeker" value={true} />

        <Step1
          currentStep={currentStep}
          handleChange={this.handleChange}
          firstName={this.state.firstName}
          lastName={this.state.lastName}
          lawFirm={this.state.lawFirm}
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
          state={this.state.state}
          zip={this.state.zip}
          policy={this.state.policy}
          insurancePolicy={this.state.insurancePolicy}
        />
        <Step3
          currentStep={currentStep}
          fileSelectedHandler={this.fileSelectedHandler}
          handleChange={this.handleChange}
          password={this.state.password}
          creditCard={this.state.creditCard}
          profilePicture={this.state.location}
          showImage={this.state.showImage}
          image={this.state.image}
          notification={this.state.notification}
          handleChangeChk={this.handleChangeChk}
        />

          {this.nextButton()}
          {errors.firstName && <div className="alert alert-danger" role="alert">{errors.firstName}</div>}
          {errors.lastName && <div className="alert alert-danger" role="alert">{errors.lastName}</div>}
          {errors.lawFirm && <div className="alert alert-danger" role="alert">{errors.lawFirm}</div>}
          {errors.stateBar && <div className="alert alert-danger" role="alert">{errors.stateBar}</div>}
          {errors.officePhone && <div className="alert alert-danger" role="alert">{errors.officePhone}</div>}
          {errors.mobilePhone && <div className="alert alert-danger" role="alert">{errors.mobilePhone}</div>}
          {errors.email && <div className="alert alert-danger" role="alert">{errors.email}</div>}
          {errors.creditCard && <div className="alert alert-danger" role="alert">{errors.creditCard}</div>}
          {errors.policy && <div className="alert alert-danger" role="alert">{errors.policy}</div>}
          {errors.insurancePolicy && <div className="alert alert-danger" role="alert">{errors.insurancePolicy}</div>}
          {errors.password && <div className="alert alert-danger" role="alert">{errors.password}</div>}
          {errors.streetAddOne && <div className="alert alert-danger" role="alert">{errors.streetAddOne}</div>}
          {errors.streetAddTwo && <div className="alert alert-danger" role="alert">{errors.streetAddTwo}</div>}
          {errors.city && <div className="alert alert-danger" role="alert">{errors.city}</div>}
          {errors.state && <div className="alert alert-danger" role="alert">{errors.state}</div>}
          {errors.zip && <div className="alert alert-danger" role="alert">{errors.zip}</div>}
        </form>

      <Modal visible={this.state.visible} width="300" height="286" effect="fadeInDown" onClickAway={() => this.closeModal()}>
        <div className="modalHead"> <i className="far fa-4x blue fa-check-circle"></i> <br/><br/> <h5>Your request has been published successfully!</h5> </div> <div> {this.pushingRedirect()}<button onClick={this.setHomeRedirect} style={{margin: "20px", width: "86%"}} className="btn btn-lg btn-block btn-primary">Ok</button> </div>
      </Modal>
      </div>
      )
  } else {
    return (
      <div>
       <form onSubmit={this.handleSubmit}>
         <input type="hidden" name="isSeeker" value={isSeeker} />
         <input className="btn btn-block btn-primary active" type="submit" value="Create Account"></input><br />
       </form>
       <Modal visible={this.state.visible} width="300" height="286" effect="fadeInDown" onClickAway={() => this.closeModal()}>
        <div className="modalHead"><i className="far fa-4x blue fa-check-circle"></i> <br/><br/><h5>Your request has been published successfully!</h5></div>
        <div>{this.pushingRedirect()}<button onClick={this.setHomeRedirect} style={{margin: "20px", width: "86%"}} className="btn btn-lg btn-block btn-primary">Ok</button> </div>
      </Modal>
    </div>
    )
  }
 }

}


function Step1(props){
    if(props.currentStep !== 1){
      return null
    }
    return(
      <div>
        <ProgressBar height={5} percent={45} filledBackground="blue" ></ProgressBar> <br />
        <p>Complete info</p>
        <input className={props.state.firstNameValid||!props.state.enableErrors ? "form-control" : "error"} type="text" name="firstName"   placeholder="First Name"          value={props.firstName}   onChange={props.handleChange}></input>
        <input className={props.state.lastNameValid ||!props.state.enableErrors ? "form-control" : "error"} type="text" name="lastName"    placeholder="Last Name"           value={props.lastName}    onChange={props.handleChange}></input>
        <input className='form-control' type="text" name="lawFirm"     placeholder="Firm Name"           value={props.lawFirm}     onChange={props.handleChange}></input>
        <input className="form-control" type="text" name="stateBar"    placeholder="State Bar Number"    value={props.stateBar}    onChange={props.handleChange}></input>
        <input className="form-control" type="text" name="officePhone" placeholder="Office Phone Number" value={props.officePhone} onChange={props.handleChange}></input>
        <input className="form-control" type="text" name="mobilePhone" placeholder="Mobile Phone Number" value={props.mobilePhone} onChange={props.handleChange}></input>
        <input className={props.state.emailValid||!props.state.enableErrors ? "form-control" : "error"} type="text" name="email"       placeholder="Email"               value={props.email}       onChange={props.handleChange}></input>
      </div>
    )
  }

  function Step2(props){
    if(props.currentStep !== 2){
      return null
    }
    return (
      <div>
        <ProgressBar  height={5} percent={75} filledBackground="blue" ></ProgressBar> <br />
        <input className="form-control" type="text" name="streetAddrOne"   placeholder="Street Address 1" value={props.streetAddrOne}   onChange={props.handleChange}></input>
        <input className="form-control" type="text" name="streetAddrTwo"   placeholder="Street Address 2" value={props.streetAddrTwo}   onChange={props.handleChange}></input>
        <input className="form-control" type="text" name="city"            placeholder="City"             value={props.city}            onChange={props.handleChange}></input>
        <input className="form-control" type="text" name="state"           placeholder="State"            value={props.state}           onChange={props.handleChange}></input>
        <input className="form-control" type="text" name="zip"             placeholder="Zip"              value={props.zip}             onChange={props.handleChange}></input>
        <input className="form-control" type="text" name="policy"          placeholder="Policy"           value={props.policy}          onChange={props.handleChange}></input>
        <input className="form-control" type="text" name="insurancePolicy" placeholder="Insurance Policy" value={props.insurancePolicy} onChange={props.handleChange}></input>
      </div>
    )
  }

  function Step3(props){
    if(props.currentStep !== 3){
      return null
    }
    return (
       <div>
        <ProgressBar height={5} percent={100} filledBackground="blue" ></ProgressBar><br />
        <label className="uploadLabel" htmlFor="avatar">Upload Profile Picture</label>
        <input id="avatar" type="file" className="inputfile" name="avatar" onChange={props.fileSelectedHandler} /><br /><br />
        <div className={props.showImage ? 'display' : 'hide'} ><img alt="avatar" width="300px" src={props.image} /></div>
        <input className="form-control" type="password" name="password"   placeholder="Password"         value={props.password}   onChange={props.handleChange}></input><label> Payment Info</label>
        <input className="form-control" type="text"     name="creditCard" placeholder="Credit Card Data" value={props.creditCard} onChange={props.handleChange}></input>
        <input className="form-control" type="hidden"   name="avatar"                                    value={props.location}></input>
        <label>Notifications</label><br />
        <div className="form-check form-check-inline">
         <input className="form-check-input" name="notification" type="checkbox" id="notification" value={props.notification} onClick={props.handleChangeChk} />
         <label className="form-check-label" htmlFor="notification">Email</label>
        </div><br/><br/>
        <div style={{textAlign: "center"}}><Link to="/terms" >Terms and Conditions</Link></div><br />
        <input className="btn btn-block btn-primary active" type="submit" value="Create Account"></input><br />
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
  if(!values.password) { errors.password = 'Insert password' }

  if(!values.streetAddrOne) { errors.streetAddrOne = 'Insert streetAddrOne' }

  if(!values.streetAddrTwo) { errors.streetAddrTwo = 'Insert streetAddrTwo' }

  if(!values.city) { errors.city = 'Insert city' }

  if(!values.state) { errors.state = 'Insert state' }

  if(!values.zip) { errors.zip = 'Insert zip' }

  if(!values.firstName) { errors.firstName = 'Insert firstName' }

  if(!values.lastName) { errors.lastName = 'Insert lastName' }

  if(!values.lawFirm) { errors.lawFirm = 'Insert lawFirm' }

  if(values.stateBar && !validator.isInt(values.stateBar.toString())){ errors.stateBar = 'State bar must be numeric' }
  if(!values.stateBar) { errors.stateBar = 'Insert state bar' }

  if(values.officePhone && !validator.isInt(values.officePhone.toString())){ errors.officePhone = 'Office phone must be numeric' }
  if(!values.officePhone) { errors.officePhone = 'Insert officePhone' }

  if(values.mobilePhone && !validator.isInt(values.mobilePhone.toString())){ errors.mobilePhone = 'Mobile phone must be numeric' }
  if(!values.mobilePhone) { errors.mobilePhone = 'Insert mobilePhone' }

  if(values.creditCard && !validator.isCreditCard(values.creditCard.toString())){ errors.creditCard = 'Invalid credit card number' }
  if(!values.creditCard) { errors.creditCard = 'Insert creditCard'}

  if(values.policy && !validator.isInt(values.policy.toString())){ errors.policy = 'Policy must be numeric' }
  if(!values.policy) { errors.policy = 'Insert policy' }

  if(values.insurancePolicy && !validator.isInt(values.insurancePolicy.toString())){ errors.insurancePolicy = 'Insurance policy must be numeric' }
  if(!values.insurancePolicy) { errors.insurancePolicy = 'Insert insurancePolicy' }


  return errors;
}
