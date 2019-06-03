import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {appearanceService} from '../../_services/appearance.service';
import "react-step-progress-bar/styles.css";
import { ProgressBar } from "react-step-progress-bar";
import Modal from 'react-awesome-modal';
   
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
      hearingDate:"",
      time:"",
      instructions:"",
      clientPresent: false,
      lateCall:false,
      price:0
    }
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
    if(currentStep <2){
      return (
        <button 
          className="btn btn-outline-primary btn-block" 
          type="button" onClick={this._next}>
        Next
        </button>        
      )
    }
    return null;
  }


  handleChange = ({target}) =>{
    this.setState({
      [target.name]: target.value
    })
    this.openModal()
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


  render() {
  
  if (this.state.backStep) {
    return <Redirect push to="/" />;
  }

  const {errors,currentStep} = this.state

	 return (
     <div className="container">
     
      <Modal 
        visible={this.state.visible}
        width="300"
        height="286"
        effect="fadeInDown"
        onClickAway={() => this.closeModal()}>
        
        <div className="modalHead">
          <i class="far fa-4x blue fa-check-circle"></i> <br/><br/>
          <h5>Your request has been published successfully!</h5>
        </div>
        <div>
          <button onClick={() => this.closeModal()} style={{margin: "20px", width: "86%"}} className="btn btn-lg btn-block btn-primary">Ok</button> 
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
        <ProgressBar  height={5} percent={50} filledBackground="blue" ></ProgressBar> <br />
        <p>Complete info</p>
            <input name="courtHouse" placeholder="Court House" type="text" className="form-control" onChange={props.handleChange} value={props.courtHouse} ></input>
            
            <div className="input-group mb-3"><div className="input-group-prepend">
            <label className="input-group-text" htmlFor="inputGroupSelect01"></label></div>
              <select name="areaOfLaw" className="custom-select" id="inputGroupSelect01" onChange={props.handleChange} value={props.areaOfLaw}>
                <option defaultValue>Area Of Law</option>
                <option value="FirstOption">First Option</option>
                <option value="SecondOption">Second Option</option>
                <option value="ThirdOption">Third Option</option>
              </select>
            </div>

            <input name="department" placeholder="Department"  type="text" className="form-control" onChange={props.handleChange} value={props.department} ></input>
            <input name="caseName"   placeholder="Case Name"   type="text" className="form-control" onChange={props.handleChange} value={props.caseName} ></input>
            <input name="caseNumber" placeholder="Case Number" type="text" className="form-control" onChange={props.handleChange} value={props.caseNumber} ></input>
            <input name="goal"       placeholder="Goal"        type="text" className="form-control" onChange={props.handleChange} value={props.goal} ></input>
      </div>
      )
  }

  function Step2(props){
    if(props.currentStep !== 2){
      return null;
    }

    return (
      <div>
      <ProgressBar  height={5} percent={100} filledBackground="blue" ></ProgressBar> <br />
          
          <div className="input-group date" id="datepicker" style={{marginBottom: "10px"}}>
            <input name="hearingDate"   placeholder="Hearing date" type="date" className="form-control" onChange={props.handleChange} value={props.hearingDate}/>
             <span className="input-group-append input-group-addon">
             <span className="input-group-text"><i style={{paddingLeft:"2px"}} className="fa fa-calendar"></i></span></span>
          </div>

          <div className="input-group time" id="timepicker" style={{marginBottom: "10px"}}>
            <input name="time"          placeholder="Time"         type="date" className="form-control" onChange={props.handleChange} value={props.time}/>
             <span className="input-group-append input-group-addon">
             <span className="input-group-text"><i  className="fa fa-clock"></i></span></span>
          </div>

            <input name="instructions"  placeholder="Description/instructions" type="text" className="form-control" onChange={props.handleChange} value={props.instructions} ></input>
            
          <div className="flex-space-between">
            <label> Client present or not?</label>  
            <div>
             <input name="clientPresent" type="checkbox" id="client" className="switch-input" onChange={props.handleChange} value={props.handleChange} value={props.clientPresent} />
             <label for="client" className="switch-label"></label>
            </div>
          </div>
          
            <div className="flex-space-between">
              <label> Late call accepted?</label>
                <div>
                 <input type="checkbox" id="call" name="lateCall" className="switch-input" onChange={props.handleChange} value={props.lateCall} /> 
                 <label for="call" className="switch-label"></label>
                </div>
            </div>

            <input name="price" type="text" className="form-group" onChange={props.handleChange} value={props.price} />
            <input className="btn btn-block btn-primary active" type="submit" value="Create request"></input><br />
      
      


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
  if(!values.clientPresent) {
    errors.clientPresent = 'Insert clientPresent'
  }
  if(!values.lateCall) {
    errors.lateCall = 'Insert lateCall'
  }
  if(!values.price) {
    errors.price = 'Insert price'
  }
  return errors;
}




