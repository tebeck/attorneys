import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import {userServices} from '../../_services/user.service'
import "react-step-progress-bar/styles.css";
import { ProgressBar } from "react-step-progress-bar";
import Modal from 'react-awesome-modal';


export default class RegisterForm extends Component {

constructor(props) {
  super(props)
  this.state = {
    ...this.state,
    emailError: false,
    isAttorney: true,
    currentStep: 1,
    backStep: false,
    errors: {},
    visible: false,
    redirect: false,

    firstName: "string",
    lastName: "string",
    lawFirm:"string",
    stateBar: 123,
    officePhone: 123,
    mobilePhone: 123,
    email: "string",
    mailingAddress: {'streetAdd1': "STREEET ADDRESS 1"},
    password: "string",
    profilePicture:"string",
    creditCard:123,
    policy:123,
    insurancePolicy:123
  }
}

  handleSubmit = (e) =>{
    
     e.preventDefault()
     const {errors, ...noErrors} = this.state // Destructuring...
     const result = validate(noErrors)
     this.setState({errors: result})
     if(!Object.keys(result).length) {
         userServices.register(noErrors).then(res =>{ console.log(res)
           if(res.state !== 200){
             this.setState({emailError: true, email: ""}) }
             else { this.openModal() } })}
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


  handleChange = ({target}) =>{
    this.setState({
      [target.name]: target.value
    })
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

  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }
  
  
  renderRedirect = () => {
    if (this.state.redirect) {
      this.props.history.push({
        pathname: '/registerSeeker',
        state: {...this.state}  
      })
    }
  }






  render(){
    
    // Route for going back on the first step.
    if (this.state.backStep) {
      return <Redirect push to="/definerole" />;
    }

    const {isAttorney, currentStep, errors} = this.state
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
  return(



    <div className="container">
      
        <Modal 
            visible={this.state.visible}
            width="300"
            height="345"
            effect="fadeInDown"
            onClickAway={() => this.closeModal()}>
          
          <div style={{padding: "30px",textAlign: "center"}}>
            <h5>Your account has been created successfully!</h5>
            <p>You will receive a notification once your profile is approved.</p>
          </div>
            <div style={{borderRadius: "0px 0px 5px 5px",padding: "30px",textAlign: "center",height:"50%", width:"100%", backgroundColor: "lightgrey"}}>
              <p>In the meantime, are you also planning to act as an Attorney of Appearing?</p>

              
              {this.renderRedirect()}
              <button onClick={this.setRedirect} className="btn btn-block btn-primary">Click here to add it to your profile</button>


            </div>  
          
        </Modal>



          <h3><span onClick={this._prev}><i className="fas fa-1x fa-angle-left"></i></span> {currentTitle}</h3>
 
          <div className={this.state.emailError ? 'display' : 'hide'}>
            <div className="alert alert-danger" role="alert">
              Email already in use. Try another.
            </div>
          </div>

        <form onSubmit={this.handleSubmit}>
        <input type="hidden" name="isAttorney" value={isAttorney} />
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
          mailingAddress={this.state.mailingAddress}
          email={this.state.email}
        />

        <Step2
          currentStep={currentStep}
          handleChange={this.handleChange}
          policy={this.state.policy}
          insurancePolicy={this.state.insurancePolicy}
        />

        <Step3
          currentStep={currentStep}
          handleChange={this.handleChange}
          password={this.state.password}
          creditCard={this.state.creditCard}
        />

        {this.nextButton()}
        {errors.firstName && <div className="alert alert-danger" role="alert">{errors.firstName}</div>}
        {errors.lastName && <div className="alert alert-danger" role="alert">{errors.lastName}</div>}
        {errors.lawFirm && <div className="alert alert-danger" role="alert">{errors.lawFirm}</div>}
        {errors.stateBar && <div className="alert alert-danger" role="alert">{errors.stateBar}</div>}
        {errors.officePhone && <div className="alert alert-danger" role="alert">{errors.officePhone}</div>}
        {errors.mobilePhone && <div className="alert alert-danger" role="alert">{errors.mobilePhone}</div>}
        {errors.mailingAddress && <div className="alert alert-danger" role="alert">{errors.mailingAddress}</div>}
        {errors.creditCard && <div className="alert alert-danger" role="alert">{errors.creditCard}</div>}
        {errors.policy && <div className="alert alert-danger" role="alert">{errors.policy}</div>}
        {errors.insurancePolicy && <div className="alert alert-danger" role="alert">{errors.insurancePolicy}</div>}
        {errors.password && <div className="alert alert-danger" role="alert">{errors.password}</div>}
        {errors.email && <div className="alert alert-danger" role="alert">{errors.email}</div>}

        </form>
        
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
        <ProgressBar  height={5} percent={45} filledBackground="blue" ></ProgressBar> <br />
        
        <p>Complete info</p>
        <input className="form-control" name="firstName" placeholder="First Name" value={props.firstName} onChange={props.handleChange}></input>
        <input className="form-control" name="lastName"  placeholder="Last Name" value={props.lastName} onChange={props.handleChange}></input>      
        <input className="form-control" name="email"  placeholder="Email" value={props.email} onChange={props.handleChange}></input>      
        <input className='form-control' name="lawFirm"  placeholder="Firm Name" value={props.lawFirm} onChange={props.handleChange}></input>      
        <input className="form-control" name="stateBar"  placeholder="State Bar Number" value={props.stateBar} onChange={props.handleChange}></input>      
        <input className="form-control" name="officePhone" placeholder="Office Phone Number" value={props.officePhone} onChange={props.handleChange}></input>
        <input className="form-control" name="mobilePhone" placeholder="Mobile Phone Number" value={props.mobilePhone} onChange={props.handleChange}></input>
        <input className="form-control" name="mailingAddress"  placeholder="Mailing Address" value={props.mailingAddress} onChange={props.handleChange}></input>
        
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
        <input className="form-control" type="text" name="policy"  placeholder="Policy" value={props.policy} onChange={props.handleChange}></input>
        <input className="form-control" type="text" name="insurancePolicy"  placeholder="Insurance Policy" value={props.insurancePolicy} onChange={props.handleChange}></input>
      </div>
      )
  }


  function Step3(props){
    if(props.currentStep !== 3){
      return null
    }
    
    return (
      <div>
      <ProgressBar width={300} height={5} percent={100} filledBackground="blue" ></ProgressBar> <br />
        <input className="form-control" type="password" name="password"  placeholder="Password" value={props.password} onChange={props.handleChange}></input>
        <label> Payment Info</label>
        <input name="creditCard" className="form-control" type="text" placeholder="Credit Card Data" value={props.creditCard} onChange={props.handleChange}></input>
        <input className="btn btn-block btn-primary active" type="submit" value="Create Account"></input><br />
      </div>
      )

}

// Validations

const validate = values => {
  const errors = {}
  if(!values.password) {
    errors.password = 'Insert password'
  }
  if(!values.email) {
    errors.email = 'Insert email'
  }
  if(!values.firstName) {
    errors.firstName = 'Insert firstName'
  }
  if(!values.lastName) {
    errors.lastName = 'Insert lastName'
  }
  if(!values.lawFirm) {
    errors.lawFirm = 'Insert lawFirm'
  }
  if(!values.stateBar) {
    errors.stateBar = 'Insert stateBar'
  }
  if(!values.officePhone) {
    errors.officePhone = 'Insert officePhone'
  }
  if(!values.mobilePhone) {
    errors.mobilePhone = 'Insert mobilePhone'
  }
  if(!values.mailingAddress) {
    errors.mailingAddress = 'Insert mailingAddress'
  }
  if(!values.creditCard) {
    errors.creditCard = 'Insert creditCard'
  }
  if(!values.policy) {
    errors.policy = 'Insert policy'
  }
  if(!values.insurancePolicy) {
    errors.insurancePolicy = 'Insert insurancePolicy'
  }

  return errors;
}

