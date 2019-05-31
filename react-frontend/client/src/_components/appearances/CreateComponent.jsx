import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {appearanceService} from '../../_services/appearance.service';
import "react-step-progress-bar/styles.css";
import { ProgressBar } from "react-step-progress-bar";
   
export default class CreateComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      ...this.state,
      clientPresent:true,
      lateCall:true,
      responseCreate: {},
      currentStep: 1,
      backStep: false,
      courtHouse: "",
      areaOfLaw:"",
      deparment:"",
      caseName:"",
      caseNumber:0,
      goal:"",
      clientPresent: false
    }

    this.handleSubmit = this.handleSubmit.bind(this)
}

  handleChange = ({target}) =>{
    this.setState({
      [target.name]: target.value
    })
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



handleSubmit = (e) =>{
    
    e.preventDefault()
    const {errors, ...noErrors} = this.state // Destructuring...
    const result = validate(noErrors)
    this.setState({errors: result})

    if(!Object.keys(result).length) {

       appearanceService.create(noErrors)
         .then(data => alert(data.message) )

    } else {
      this.setState({ errors: result  })
    }
  }

  render() {


    if (this.state.backStep) {
      return <Redirect push to="/" />;
    }


  const {errors,currentStep} = this.state

		return (
      <div>
      <h3><span onClick={this._prev}><i className="fas fa-1x fa-angle-left"></i></span> New request</h3>
      
        <form onSubmit={this.handleSubmit}>

        <Step1
          currentStep={currentStep}
          handleChange={this.handleChange}
          courtHouse={this.state.courtHouse}
          areaOfLaw={this.state.areaOfLaw}
          deparment={this.state.deparment}
          caseName={this.state.caseName}
          caseNumber={this.state.caseNumber}
          goal={this.state.goal}
        />

        <Step2
          currentStep={currentStep}
          handleChange={this.handleChange}
          hearingDate={this.state.hearingDate}
          time={this.state.time}
          instructions={this.state.instructions}
          clientPresent={this.state.clientPresent}
          lateCall={this.state.lateCall}
          documents={this.state.documents}
        />


        {this.nextButton()}

{/*        {errors.courtHouse && <p className="form-text text-danger">{errors.courtHouse}</p>}
        {errors.areaOfLaw && <p className="form-text text-danger">{errors.areaOfLaw}</p>}
        {errors.goal && <p className="form-text text-danger">{errors.goal}</p>}
        {errors.contextInformation && <p className="form-text text-danger">{errors.contextInformation}</p>}
        {errors.additionalComments && <p className="form-text text-danger">{errors.additionalComments}</p>}
        */}
        </form>
    </div>
    );
  }




}

function Step1(props){
    if(props.currentStep !== 1){
      return null;
    }

    return(
      <div>
        <ProgressBar  height={5} percent={45} filledBackground="blue" ></ProgressBar> <br />
        <p>Complete info</p>
            <input name="courtHouse" placeholder="Court House" type="text" className="form-control" onChange={props.handleChange} ></input>
            <input name="areaOfLaw"  placeholder="Area Of Law" type="text" className="form-control" onChange={props.handleChange} ></input>
            <input name="department" placeholder="department"  type="text" className="form-control" onChange={props.handleChange} ></input>
            <input name="caseName"   placeholder="Case Name"   type="text" className="form-control" onChange={props.handleChange} ></input>
            <input name="caseNumber" placeholder="Case Number" type="text" className="form-control" onChange={props.handleChange} ></input>
            <input name="goal"       placeholder="Goal"        type="text" className="form-control" onChange={props.handleChange} ></input>
      </div>
      )
  }

  function Step2(props){
    if(props.currentStep !== 2){
      return null;
    }

    return (
      <div>
      <ProgressBar  height={5} percent={75} filledBackground="blue" ></ProgressBar> <br />
            <input name="hearingDate"   placeholder="Hearing date"             type="date"      className="form-control" onChange={props.handleChange} ></input>  
            <input name="time"          placeholder="Time"                     type="date"      className="form-control" onChange={props.handleChange} ></input>  
            <input name="instructions"  placeholder="Description/instructions" type="text"      className="form-control" onChange={props.handleChange} ></input><label> Client present or not?</label>  
            <input name="clientPresent" value={props.clientPresent}       type="checkbox"  className="form-control" onChange={props.handleChange} ></input><label> Late call accepted</label>
            <input name="lateCall"      value={props.lateCall}            type="checkbox"  className="form-control" onChange={props.handleChange} ></input>
      </div>
      )
  }







  const validate = values => {
  const errors = {}
  if(!values.courtHouse) {
    errors.courtHouse = 'Insert courtHouse'
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
  if(!values.notification) {
    errors.notification = 'Insert notification'
  }
  if(!values.insurancePolicy) {
    errors.insurancePolicy = 'Insert insurancePolicy'
  }

  return errors;
}