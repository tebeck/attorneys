import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import {appearanceService} from '../../_services/appearance.service';
import "react-step-progress-bar/styles.css";
import { ProgressBar } from "react-step-progress-bar";
import Modal from 'react-awesome-modal';
import DatePicker from 'react-date-picker';
import TimePicker from 'react-time-picker';
   
export default class CreateComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      visible: false,
      clientPresent:true,
      lateCall:true,
      responseCreate: {},
      errors: {},
      currentStep: 1,
      backStep: false,
      courtHouse: "",
      areaOfLaw:0,
      department:"",
      caseName:"",
      goal:"",
      hearingDate: new Date(),
      time: new Date(),
      instructions:"",
      price:75,
      caseNumber:"",


      enableNextAction: false,     // enable next action button (invalid data in form)
      enableErrors: false,         // don't show errors when form is empty
      courtHouseValid: false,
      areaOfLawValid: false,
      departmentValid: false,
      caseNameValid: false,
      caseNumberValid: false,
      goalValid: false

    }
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleChangeChk = this.handleChangeChk.bind(this); // Bind boolean checkbox value.
  }

  handleSubmit = (e) =>{
    
    e.preventDefault()
    const {errors, ...noErrors} = this.state // Destructuring...
    const result = validate(noErrors)
    this.setState({errors: result})

    if(!Object.keys(result).length) {

      console.log(noErrors)

      appearanceService.create(noErrors)
        .then(data => console.log(data))

        this.openModal()
        
    } else {
      this.setState({ errors: result  })
    }
  }
    
  _next = () => {
    let currentStep = this.state.currentStep
    if (!this.state.enableNextAction){ // there are errors
      console.log("errors, setting enableErrors: true")
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
    currentStep = currentStep <= 2 ? 1 : currentStep - 1
    this.setState({
      currentStep: currentStep
    })
    if (currentStep < 1){
       window.location.assign('/home')
    }
  }

  nextButton(){
    let currentStep = this.state.currentStep;
    if(currentStep <2){
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
  
    let enableNextAction = this.state.enableNextAction;
    let courtHouseValid = this.state.courtHouseValid;
    let areaOfLawValid = this.state.areaOfLawValid;
    let departmentValid = this.state.departmentValid;
    let caseNameValid = this.state.caseNameValid;
    let caseNumberValid = this.state.caseNumberValid;
    let goalValid = this.state.goalValid;

    if (this.state.currentStep === 1){
      if (target.name === 'courtHouse'){
      
        if (target.value.length<2) {
          enableNextAction=false
          courtHouseValid=false;
        }else{
          courtHouseValid=true;
        }
      }
      if (target.name === 'department'){
      
        if (target.value.length<2) {
          enableNextAction=false
          departmentValid=false;
        }else{
          departmentValid=true;
        }
      }

      if (target.name === 'caseName'){
      
        if (target.value.length<2) {
          enableNextAction=false
          caseNameValid=false;
        }else{
          caseNameValid=true;
        }
      }

      if (target.name === 'caseNumber'){
      
        if (target.value.length<2) {
          enableNextAction=false
          caseNumberValid=false;
        }else{
          caseNumberValid=true;
        }
      }
      if (target.name === 'goal'){
      
        if (target.value.length<2) {
          enableNextAction=false
          goalValid=false;
        }else{
          goalValid=true;
        }
      }

      if (courtHouseValid && departmentValid && caseNameValid && goalValid && caseNumberValid){
        enableNextAction=true
      }
      
      const newState = {
        courtHouseValid: courtHouseValid,
        departmentValid: departmentValid,
        caseNumberValid: caseNumberValid,
        caseNameValid: caseNameValid,
        goalValid: goalValid,
        enableNextAction: enableNextAction
      };

      console.log(newState)
      this.setState(newState);
    }




    this.setState({
      [target.name]: target.value
    });
  
  }


  setHomeRedirect = () => { this.setState({ homeRedirect: true }) }

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


  handleChangeChk(e) {
    if(e.target.name === "lateCall"){
      this.setState(state => ({
        lateCall: !state.lateCall
      }))
    }
    if(e.target.name === "clientPresent"){
      this.setState(state => ({
        clientPresent: !state.clientPresent
      })) 
    }    
  }


  handleDateChange(date) {
    this.setState({
      hearingDate: date
    });
  }

  handleTimeChange(time){
    this.setState({
      time: time
    });   
  }



  render() {
  
  if (this.state.backStep) {
    return <Redirect push to="/home" />;
  }

  console.log(this.state.currentStep)

  const {errors,currentStep} = this.state

	 return (
     <div className="container main-body">
     
      <Modal 
        visible={this.state.visible}
        width="300"
        height="286"
        effect="fadeInDown"
        onClickAway={() => this.closeModal()}>
        
        <div className="modalHead">
          <i className="far fa-4x green-background fa-check-circle"></i> <br/><br/>
          <h5>Your request has been published successfully!</h5>
        </div>
        <div>
          <Link to="/home" style={{margin: "20px", width: "86%"}} className="btn btn-lg btn-block btn-primary link-button">Ok</Link> 
        </div>  
      </Modal>
      
      <h3><span onClick={this._prev}><i className="fas fa-1x fa-angle-left"></i></span> New request</h3>
        
        <form onSubmit={this.handleSubmit}>
        <Step1
          currentStep={currentStep}
          nextButton={this.nextButton()}
          handleChange={this.handleChange}
          courtHouse={this.state.courtHouse}
          areaOfLaw={this.state.areaOfLaw}
          department={this.state.department}
          caseName={this.state.caseName}
          caseNumber={this.state.caseNumber}
          goal={this.state.goal}
          state={this.state}
          
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
          price={this.state.price}
          handleChangeChk={this.handleChangeChk}
          state={this.state}
          handleDateChange={this.handleDateChange}
          handleTimeChange={this.handleTimeChange}
        />

        {this.nextButton()}
        {errors.courtHouse && <div className="alert alert-danger" role="alert">{errors.courtHouse}</div>}
        {errors.areaOfLaw && <div className="alert alert-danger" role="alert">{errors.areaOfLaw}</div>}
        {errors.department && <div className="alert alert-danger" role="alert">{errors.department}</div>}
        {errors.caseName && <div className="alert alert-danger" role="alert">{errors.caseName}</div>}
        {errors.caseNumber && <div className="alert alert-danger" role="alert">{errors.caseNumber}</div>}
        {errors.goal && <div className="alert alert-danger" role="alert">{errors.goal}</div>}
        {errors.hearingDate && <div className="alert alert-danger" role="alert">{errors.hearingDate}</div>}
        {errors.time && <div className="alert alert-danger" role="alert">{errors.time}</div>}
        {errors.instructions && <div className="alert alert-danger" role="alert">{errors.instructions}</div>}
        {errors.clientPresent && <div className="alert alert-danger" role="alert">{errors.clientPresent}</div>}
        {errors.lateCall && <div className="alert alert-danger" role="alert">{errors.lateCall}</div>}
        {errors.price && <div className="alert alert-danger" role="alert">{errors.price}</div>}
        
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
        <ProgressBar  height={5} percent={50} filledBackground="#2ad4ae" ></ProgressBar> <br />
        <p>Complete info</p>
            <input className={props.state.courtHouseValid || !props.state.enableErrors ? "form-control" : "error"} name="courtHouse" placeholder="Court House" type="text"  onChange={props.handleChange} value={props.courtHouse} ></input>
            <div className="input-group mb-3"><div className="input-group-prepend">
            <label className="input-group-text" htmlFor="inputGroupSelect01"></label></div>
              <select name="areaOfLaw" className="custom-select" id="inputGroupSelect01" onChange={props.handleChange} value={props.areaOfLaw}>
                <option defaultValue>Area Of Law</option>
                <option value="CRIMINAL">CRIMINAL</option>
                <option value="SECOPTION">Second Option</option>
                <option value="THROPTION">Third Option</option>
              </select>
            </div>

            <input name="department" placeholder="Department"  type="text" className={props.state.departmentValid || !props.state.enableErrors ? "form-control" : "error"} onChange={props.handleChange} value={props.department} ></input>
            <input name="caseName"   placeholder="Case Name"   type="text" className={props.state.caseNameValid || !props.state.enableErrors ? "form-control" : "error"} onChange={props.handleChange} value={props.caseName} ></input>
            <input name="caseNumber" placeholder="Case Number" type="text" className={props.state.caseNumberValid || !props.state.enableErrors ? "form-control" : "error"} onChange={props.handleChange} value={props.caseNumber} ></input>
            <input name="goal"       placeholder="Goal"        type="text" className={props.state.goalValid || !props.state.enableErrors ? "form-control" : "error"} onChange={props.handleChange} value={props.goal} ></input>
      </div>
      )
  }

  function Step2(props){
    if(props.currentStep !== 2){
      return null;
    }

    console.log(props)

    return (
      <div>
      <ProgressBar  height={5} percent={100} filledBackground="#2ad4ae" ></ProgressBar> <br /><br />
          
          <div className="input-group date" id="datepicker" style={{marginBottom: "10px"}}>
            <DatePicker
              className="form-control"
              selected={ props.state.hearingDate }
              onChange={ props.handleDateChange }
              name="hearingDate"
              value={ props.state.hearingDate }
              dateFormat="MM/DD/YYYY"
            />

        {/*    <input name="hearingDate" placeholder={props.hearingDate} type="date" className="form-control" onChange={props.handleChange} value={props.hearingDate}/>*/}
             <span className="input-group-append input-group-addon">
             <span className="input-group-text"><i style={{paddingLeft:"2px"}} className="fa fa-calendar"></i></span></span>
          </div>

          <div className="input-group time" id="timepicker" style={{marginBottom: "10px"}}>
            <TimePicker
            className="form-control"
              onChange={props.handleTimeChange}
              value={props.state.time} />

            {/*<input name="time"          placeholder="Time"         type="time" className="form-control" onChange={props.handleChange} value={props.time}/>*/}
             <span className="input-group-append input-group-addon">
             <span className="input-group-text"><i  className="fa fa-clock"></i></span></span>
          </div>

            <input name="instructions"  placeholder="Description/instructions" type="text" className="form-control" onChange={props.handleChange} value={props.instructions} ></input>
            
          <div className="flex-space-between">
            <label> Client present or not?</label>  
            <div>
             <input name="clientPresent" type="checkbox" id="client" className="switch-input" onClick={props.handleChangeChk} value={props.clientPresent} />
             <label htmlFor="client" className="switch-label"></label>
            </div>
          </div>
          
            <div className="flex-space-between">
              <label> Late call accepted?</label>
                <div>
                 <input type="checkbox" id="call" name="lateCall" className="switch-input" onClick={props.handleChangeChk} value={props.lateCall} /> 
                 <label htmlFor="call" className="switch-label"></label>
                </div>
            </div>

            <input name="price" type="hidden" className="form-group" value={props.price} />
            <input className="btn btn-block btn-primary link-button active" type="submit" value="Create request"></input><br />
     
      </div>
      


      )

  }


  const validate = values => {
  const errors = {}
  if(!values.courtHouse) {
    errors.courtHouse = 'Insert courtHouse'
  }
  if(!values.areaOfLaw) {
    errors.areaOfLaw = 'Insert areaOfLaw'
  }
  if(!values.department) {
    errors.department = 'Insert department'
  }
  if(!values.caseName) {
    errors.caseName = 'Insert caseName'
  }
  if(!values.caseNumber) {
    errors.caseNumber = 'Insert caseNumber'
  }
  if(!values.goal) {
    errors.goal = 'Insert goal'
  }
  if(!values.hearingDate) {
    errors.hearingDate = 'Insert hearingDate'
  }
  if(!values.time) {
    errors.time = 'Insert time'
  }
  if(!values.instructions) {
    errors.instructions = 'Insert instructions'
  }
  // if(!values.clientPresent) {
  //   errors.clientPresent = 'Insert clientPresent'
  // }
  // if(!values.lateCall) {
  //   errors.lateCall = 'Insert lateCall'
  // }
  if(!values.price) {
    errors.price = 'Insert price'
  }
  return errors;
}




