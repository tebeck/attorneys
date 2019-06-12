import React, {Component} from 'react';
import { Redirect, Link } from 'react-router-dom';
import {userServices} from '../../_services/user.service'
import "react-step-progress-bar/styles.css";
import { ProgressBar } from "react-step-progress-bar";
import Modal from 'react-awesome-modal';


export default class RegisterForm extends Component {

constructor(props) {
  super(props)
  this.state = {
    currentStep: 1,
    errors: {},
    firstName: "firstName", lastName: "lastName", lawFirm:"lawFirm",stateBar: "1",officePhone: "2",mobilePhone: "3",email: "thombeckford+1@gmail.com",streetAddrOne: "one",streetAddrTwo: "two", city: "city", state: "state", zip:"zip",password: "password",profilePicture:"",creditCard:"5555555555554444",policy:"4",insurancePolicy:"5"
  }
  this.handleChangeChk = this.handleChangeChk.bind(this);
}


fileSelectedHandler = ({target}) =>{
    
    const newForm = new FormData();
    newForm.append('avatar', target.files[0] , target.files[0].name)

    userServices.upload(newForm)
      .then(data => {
        this.setState({
          location: data.data.location,
          profilePicture: data.data.location
        })
      })

    this.setState({
      image: URL.createObjectURL(target.files[0]),
      showImage: true
    })

  }

  handleSubmit = (e) =>{
    
     e.preventDefault()
     const {errors, ...noErrors} = this.state // Destructuring...
     const result = validate(noErrors)
     this.setState({errors: result})
     if(!Object.keys(result).length) {
       
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
           if(res.state !== 200){
             this.setState({reviewError: true}) }
             else {
               console.log(res)
              this.setState({_id: res.user._id, token: res.token})
              this.openModal() 
            }
      })
      }
     else { this.setState({ errors: result  }) }
  }

  _next = () => {
    let currentStep = this.state.currentStep
    currentStep = currentStep >= 2? 3: currentStep + 1
    this.setState({
      currentStep: currentStep
    })
  }
    
  _prev = () => {
    let currentStep = this.state.currentStep
    currentStep = currentStep <= 1 ? 0 : currentStep - 1
    this.setState({
      currentStep: currentStep
    })
    if (currentStep <= 0){
       this.setState({backStep: true});
    }
  }



nextButton(){
  let currentStep = this.state.currentStep;
  if(currentStep <3){
    return (
      <button 
        className="btn btn-primary btn-block" 
        type="button" onClick={this._next}>
      Continue
      </button>        
    )
  }
  return null;
}

  // Handle value forms
  handleChange = ({target}) =>{ this.setState({ [target.name]: target.value }) }
  handleChangeChk() { this.setState(state => ({ notification: !state.notification }));}

  // Modal methods
  openModal()  { this.setState({ visible : true }) }
  closeModal() { this.setState({ visible : false }) }

  // set and push register seeker Redirect.
  setSekrRedirect = () => { this.setState({ redirect: true }) }
  pushingRedirect = () => { if (this.state.redirect) { this.props.history.push({ pathname: '/registerSeeker',state: {...this.state}  })}}


  render(){
    
    if (this.state.backStep) { return <Redirect push to="/definerole" /> } // Go back to /definerole
    const {currentStep, errors} = this.state


    let currentTitle = "";
    switch(currentStep){
      case 1: currentTitle = "Personal Information"
       break;
      case 2: currentTitle = "Address Information" 
       break;
      case 3: currentTitle = "Account Information"
       break;
      default: currentTitle = "null"
       break;
    }

 return(
  <div className="container">
        
    <Modal visible={this.state.visible} width="300" height="345" effect="fadeInDown" onClickAway={() => this.closeModal()}> <div style={{padding: "30px",textAlign: "center"}}> <h5>Your account has been created successfully!</h5> <p>You will receive a notification once your profile is approved.</p></div>
        <div style={{borderRadius: "0px 0px 5px 5px",padding: "30px",textAlign: "center",height:"50%", width:"100%", backgroundColor: "lightgrey"}}>
          <p>In the meantime, are you also planning to act as an Attorney of Appearing?</p>
          {this.pushingRedirect()}<p onClick={this.setSekrRedirect} className="btn btn-block btn-primary">Click here to add it to your profile</p>
          <Link to='/home' className="btn btn-block btn-primary">OK</Link>
        </div>  
    </Modal>

    <h3 onClick={this._prev}><i className="fas fa-1x fa-angle-left"></i> {currentTitle}</h3>

      <div className={this.state.reviewError ? 'display' : 'hide'}>
        <div className="alert alert-danger" role="alert">
          Please review all fields. That email could be in use.
        </div>
      </div>

   <form onSubmit={this.handleSubmit} >
        <input type="hidden" name="isAttorney" value={true} />
        <input type="hidden" name="notification" value="Email"  />
        
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
          _state={this.state._state}
          zip={this.state.zip}
          policy={this.state.policy}
          insurancePolicy={this.state.insurancePolicy}
          state={this.state}
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
          state={this.state}
        />
        {this.nextButton()}
        {errors.firstName && <div className="alert alert-danger" role="alert">{errors.firstName}</div>}
        {errors.lastName && <div className="alert alert-danger" role="alert">{errors.lastName}</div>}
        {errors.lawFirm && <div className="alert alert-danger" role="alert">{errors.lawFirm}</div>}
        {errors.stateBar && <div className="alert alert-danger" role="alert">{errors.stateBar}</div>}
        {errors.officePhone && <div className="alert alert-danger" role="alert">{errors.officePhone}</div>}
        {errors.mobilePhone && <div className="alert alert-danger" role="alert">{errors.mobilePhone}</div>}
        {errors.creditCard && <div className="alert alert-danger" role="alert">{errors.creditCard}</div>}
        {errors.policy && <div className="alert alert-danger" role="alert">{errors.policy}</div>}
        {errors.insurancePolicy && <div className="alert alert-danger" role="alert">{errors.insurancePolicy}</div>}
        {errors.password && <div className="alert alert-danger" role="alert">{errors.password}</div>}
        {errors.streetAddOne && <div className="alert alert-danger" role="alert">{errors.streetAddOne}</div>}
        {errors.streetAddTwo && <div className="alert alert-danger" role="alert">{errors.streetAddTwo}</div>}
        {errors.city && <div className="alert alert-danger" role="alert">{errors.city}</div>}
        {errors.state && <div className="alert alert-danger" role="alert">{errors.state}</div>}
        {errors.zip && <div className="alert alert-danger" role="alert">{errors.zip}</div>}
        {errors.email && <div className="alert alert-danger" role="alert">{errors.email}</div>}
   </form>
 </div> 

 )}
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
        <input className={props.state.streetAddrOneValid||!props.state.enableErrors ? "form-control" : "error"} type="text" name="streetAddrOne"   placeholder="Street Address 1" value={props.streetAddrOne}   onChange={props.handleChange}></input>
        <input className={props.state.streetAddrTwoValid||!props.state.enableErrors ? "form-control" : "error"} type="text" name="streetAddrTwo"   placeholder="Street Address 2" value={props.streetAddrTwo}   onChange={props.handleChange}></input>
        <input className={props.state.cityValid||!props.state.enableErrors ? "form-control" : "error"} type="text" name="city"            placeholder="City"             value={props.city}            onChange={props.handleChange}></input>
        <input className={props.state.stateValid||!props.state.enableErrors ? "form-control" : "error"} type="text" name="_state"           placeholder="State"            value={props._state}           onChange={props.handleChange}></input>
        <input className={props.state.zipValid||!props.state.enableErrors ? "form-control" : "error"} type="text" name="zip"             placeholder="Zip"              value={props.zip}             onChange={props.handleChange}></input>
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

  if(values.stateBar && !validator.isInt(values.stateBar)){ errors.stateBar = 'State bar must be numeric' }
  if(!values.stateBar) { errors.stateBar = 'Insert state bar' }

  if(values.officePhone && !validator.isInt(values.officePhone)){ errors.officePhone = 'Office phone must be numeric' }
  if(!values.officePhone) { errors.officePhone = 'Insert officePhone' }
  
  if(values.mobilePhone && !validator.isInt(values.mobilePhone)){ errors.mobilePhone = 'Mobile phone must be numeric' }
  if(!values.mobilePhone) { errors.mobilePhone = 'Insert mobilePhone' }

  if(values.creditCard && !validator.isCreditCard(values.creditCard)){ errors.creditCard = 'Invalid credit card number' }
  if(!values.creditCard) { errors.creditCard = 'Insert creditCard'}

  if(values.policy && !validator.isInt(values.policy)){ errors.policy = 'Policy must be numeric' }
  if(!values.policy) { errors.policy = 'Insert policy' }
  
  if(values.insurancePolicy && !validator.isInt(values.insurancePolicy)){ errors.insurancePolicy = 'Insurance policy must be numeric' } 
  if(!values.insurancePolicy) { errors.insurancePolicy = 'Insert insurancePolicy' }

  console.log(errors)
  return errors;
}

