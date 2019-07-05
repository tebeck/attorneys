import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import {appearanceService, userServices} from '../../_services';
import "react-step-progress-bar/styles.css";
import { ProgressBar } from "react-step-progress-bar";
import Modal from 'react-awesome-modal';
import TimePicker from 'rc-time-picker';
import backbutton from '../../_assets/img/btnback.png'
import moment from 'moment';
import 'rc-time-picker/assets/index.css';
import 'moment/locale/it.js';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import uploadImg from '../../_assets/img/request/request_upload.png'
import requestImg from '../../_assets/img/request/request_published.png'

import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';

let newForm = new FormData();
const format = 'h:mm a';
let doc = [];
let i = 0;


export default class CreateComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      visible: false,
      clientPresent:false,
      lateCall:false,
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
      time: moment().hour(0).minute(0),
      instructions:"",
      price:75,
      caseNumber:"",
      documents:[],

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
        doc = [];
        this.state.documents = [];
        i = 0;


        this.openModal()
        
    } else {
      this.setState({ errors: result  })
    }
  }
    
  _next = () => {
    let currentStep = this.state.currentStep
    if (!this.state.enableNextAction){ // there are errors
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
    // currentStep = currentStep <= 2 ? 1 : currentStep - 1
    currentStep = currentStep <= 1 ? 0 : currentStep - 1
    this.setState({
      currentStep: currentStep
    })
    
    if (currentStep <= 0){
       this.setState({homeRedirect: true});
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


  fileSelectedHandler = ({target}) => {


    i = this.state.documents.length;

    if(target.value !== ""){
      if(target.files.length > 1){
        console.log("mas de un file")
        console.log(i)

      for(var z = 0; z < target.files.length; z++){
         console.log(doc)
         doc.push([target.files[z],target.files[z].name])
         newForm.append('avatar', doc[i][0] , doc[i][1])
         i = i + 1;
      }
    } else {
        doc.push([target.files[0],target.files[0].name])
         newForm.append('avatar', doc[i][0] , doc[i][1])  
         i = i + 1;
    }
    
    console.log(i)
    console.log(...newForm)
    
    userServices.multiupload(newForm)
      .then(data => {
        console.log(data)
         console.log("documents: "+ this.state.documents.length)
         this.setState({
           documents: data.data.location
          })
      })

  } else {
    console.log("No image selected")
  }

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


 deleteFile = ({target}) =>{
  var array = [...this.state.documents]; // Copio el array
  var index = target.id
  console.log(target.id)
  if (index !== -1) {
 
   array.splice(index, 1);
   this.setState({ documents: array });
   // this.state.documents = array;
   // files = files.splice(index, 1)
   doc.splice(index, 1)
    i = i - 1
   newForm.delete("avatar", index)


      console.log(...newForm)

    }
  }



  render() {
  
  if (this.state.backStep) {
    return <Redirect push to="/home" />;
  }

 

  const {errors,currentStep} = this.state
  if (this.state.homeRedirect) { return <Redirect push to="/home" /> } // Go back to /definerole
	 return (
     <div className="container main-body">
     
      <Modal 
        visible={this.state.visible}
        width="400"
        height="500"
        effect="fadeInDown"
        onClickAway={() => this.closeModal()}>
        
        <div className="modalRequestHead">
          <img src={requestImg} alt="esquired" /> <br/><br/>
          <h5>Your request has been published<br/> successfully!</h5>
          <Link to="/home" style={{margin: "40px", marginBottom: "30px"}} className="btn btn-lg btn-block btn-primary link-button">Done</Link> 
        </div>
   
      </Modal>
      
      <h3 onClick={this._prev} style={{cursor: "pointer"}}> <img  style={{marginBottom: "5px"}} width="16px" src={backbutton} alt="esquired" /> New request</h3>
        
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
          fileSelectedHandler={this.fileSelectedHandler}
          deleteFile={this.deleteFile}
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

    console.log("llega ")
    let files = []
    console.log(props.state.documents)

    if(props.state.documents){
      for(var x = 0; x < props.state.documents.length; x++){
      files.push(<div key={x}><li style={{listStyleType: "none"}} key={x}>{props.state.documents[x].originalname}<button type="button" id={x} name={props.state.documents[x].originalname} onClick={props.deleteFile} style={{marginLeft: "5px"}}>X</button></li><br /></div>);
    }


    
    }
    

    return (
      <div>
      <ProgressBar  height={5} percent={100} filledBackground="#2ad4ae" ></ProgressBar> <br /><br />
        <p>Complete info</p>
            
            <DatePicker
              className="form-control inputdatepicker"
              selected={ props.state.hearingDate }
              onChange={ props.handleDateChange }
              name="hearingDate"
              value={ props.state.hearingDate }
              dateFormat="dd/mm/yyyy"
              locale="en"
            />
            

            
            <TimePicker
              showSecond={false}
              defaultValue={props.time}
              value={props.time}
              className="form-control"
              onChange={props.handleTimeChange}
              format={format}
              use12Hours
              inputReadOnly
            />

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

            <div>
              <p><b>Documents</b></p>
              <label className="uploadLabel squareUpload" htmlFor="avatar" >
               <div className="squareImg" >
                 <img src={uploadImg} alt="profileImg" width="150px" /><br />Upload<br />
                 <input id="avatar" multiple type="file" className="inputfile" name="avatar" onChange={props.fileSelectedHandler} /><br /><br /> 
                </div>
              </label><br/>
            </div>
            

            <div>{files}</div>
            
            {/*<FilePond allowMultiple={true} onChange={props.fileSelectedHandler} id="avatar" name="avatar" />*/}
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
  if(!values.price) {
    errors.price = 'Insert price'
  }
  return errors;
}




