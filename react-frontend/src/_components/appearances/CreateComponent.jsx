import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {appearanceService, userServices} from '../../_services';
import "react-step-progress-bar/styles.css";
import { ProgressBar } from "react-step-progress-bar";
import Modal from 'react-awesome-modal';
// import TimePicker from 'rc-time-picker';
import backbutton from '../../_assets/img/btnback.png'
import 'rc-time-picker/assets/index.css';
import Select from 'react-select';
import "react-datepicker/dist/react-datepicker.css";
import uploadImg from '../../_assets/img/request/request_upload.png'
import requestImg from '../../_assets/img/request/request_published.png'
import Switch from "react-switch";  
import checkImg from '../../_assets/img/appearance/appearance_check.png'
import TimeKeeper from 'react-timekeeper';
import DatePicker from "react-datepicker";
import {options} from '../../_helpers/areaOfLaw.js'
import {optionsCourts} from '../../_helpers/optionsCourts.js'
import Dialog from 'react-bootstrap-dialog'
import esquired from '../../_assets/img/landing/logo.png'

Dialog.setOptions({
  defaultOkLabel: 'OK',
  defaultCancelLabel: 'Cancel',
  primaryClassName: 'btn-primary',
  defaultButtonClassName: 'btn-secondary btn-secondary-style'
})


let uploadForm = new FormData();

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
      areaOfLaw:"",
      county:"",
      department:"",
      caseName:"",
      hearingDate: new Date(),
      time: '9:30 am',
      instructions:"",
      price:75,
      caseNumber:"",
      documents:[],
      redirectHome: false,
      uploading: false,
      

      enableNextAction: false,     // enable next action button (invalid data in form)
      enableErrors: false,         // don't show errors when form is empty
      departmentValid: false,
      caseNameValid: false,
      caseNumberValid: false,
      areaOfLawValid: false,
      countyValid: false,
      courtHouseValid: false

    }

    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleChangeLC= this.handleChangeLC.bind(this); // Late call input
    this.handleChangeCP= this.handleChangeCP.bind(this); // client present input
    
  }



  handleSubmit = (e) =>{
    
    e.preventDefault()
    const {errors, ...noErrors} = this.state // seteo todo en el estado.
    const result = validate(noErrors)
    this.setState({errors: result})
    
    if(this.state.documents.length < 1){

        this.dialog.show({
          title: <img alt="esquired" className="dialog-img" src={esquired} />,
          body: "You're submitting the request without files, is it correct?",
          actions: [ 
            Dialog.OKAction(() => { 
              if(!Object.keys(result).length) {
                
                console.log(noErrors)
                noErrors.hearingDate = noErrors.hearingDate.toISOString().substring(0, 10)

                appearanceService.create(noErrors)
                  .then(data => console.log(data))
                   .then(uploadForm.delete('avatar'))
                   .then(this.openModal())
              } 
              else {
                this.setState({ errors: result  })
              }
             }),
            Dialog.CancelAction(() => {  }) 
            ],
          bsSize: 'small',
          onHide: (dialog) => { 
            dialog.hide()
          } 

        })

    } else {
      if(!Object.keys(result).length) {
        
        console.log(noErrors)
        noErrors.hearingDate = noErrors.hearingDate.toISOString().substring(0, 10)

        appearanceService.create(noErrors)
          .then(data => console.log(data))
           .then(uploadForm.delete('avatar'))
           .then(this.openModal())
      } 
      else {
        this.setState({ errors: result  })
      }
    }
  }
  


  fileSelectedHandler = ({target}) => {
   for (var i = 0; i < target.files.length; i++) {
     uploadForm.append('avatar', target.files[i] , target.files[i].name)
   }

    userServices.multiupload(uploadForm)
      .then(this.setState({uploading: true }))
      .then(data => {
         this.setState({ 
           documents: data.data.location
         })
        if(data.status === 200){
          this.setState({ uploading: false })
        }
      })
      .then(target.value = '')
  }


  deleteFiles = (e) => {
   e.preventDefault()

    this.dialog.show({
      title: <img alt="esquired" className="dialog-img" src={esquired} />,
      body: 'Do you want to clear all files?',
      actions: [ 
        Dialog.OKAction(() => { 
            uploadForm.delete('avatar')
            this.setState({ documents: [] });
         }),
        Dialog.CancelAction(() => {  }) 
        ],
      bsSize: 'small',
      onHide: (dialog) => { 
        dialog.hide()
      } 

    })
  }




  handleChange = (e,selectedItem, nameOfComponent) =>{

    
  
    let enableNextAction = this.state.enableNextAction;
    let departmentValid = this.state.departmentValid;
    let caseNameValid = this.state.caseNameValid;
    let caseNumberValid = this.state.caseNumberValid;
    let areaOfLawValid = this.state.areaOfLawValid;
    let countyValid = this.state.countyValid;
    let courtHouseValid = this.state.courtHouseValid;


    if (this.state.currentStep === 1){
    
      if(selectedItem){
      if(selectedItem.name === "county"){
        if (e.value.length < 1) {
          enableNextAction=false
        } else {
          countyValid=true;
        }
      } 
      if(selectedItem.name === "courtHouse"){
        if (e.value.length < 1) {
          enableNextAction=false
        } else {
          courtHouseValid=true;
        }
      } 
      if(selectedItem.name === "areaOfLaw"){
        if (e.value.length < 1) {
          enableNextAction=false
        } else {
          areaOfLawValid=true;
        }
      } 

      }

      else {


      if (e.target.name === 'department'){
        if (e.target.value.length < 1) {
          enableNextAction=false
          departmentValid=false;
        }else{
          departmentValid=true;
        }
      }

      if (e.target.name === 'caseName'){
        if (e.target.value.length<2) {
          enableNextAction=false
          caseNameValid=false;
        }else{
          caseNameValid=true;
        }
      }
      if (e.target.name === 'caseNumber'){
        if (e.target.value.length<2) {
          enableNextAction=false
          caseNumberValid=false;
        }else{
          caseNumberValid=true;
        }
      }

      }

      if ( departmentValid && caseNameValid  && caseNumberValid && countyValid && areaOfLawValid && courtHouseValid){
        enableNextAction=true
      }
      
      const newState = {
        countyValid: countyValid,
        departmentValid: departmentValid,
        caseNumberValid: caseNumberValid,
        caseNameValid: caseNameValid,
        areaOfLawValid: areaOfLawValid,
        courtHouseValid:courtHouseValid,
        enableNextAction: enableNextAction
      };

      console.log(newState)

      this.setState(newState);
    }
    

    if(selectedItem){
      if(selectedItem.name === "county"){
        this.setState({ county: e })
      }
      if(selectedItem.name === "courtHouse"){
        this.setState({ courtHouse: e })
      }
      if(selectedItem.name === "areaOfLaw"){
        this.setState({ areaOfLaw: e })
      }
    }

    else{
      this.setState({ [e.target.name]: e.target.value });
    }
  }



  handleChangeLC(lateCall){
    this.setState({ lateCall });
  }
  handleChangeCP(clientPresent){
    this.setState({ clientPresent });
  }

  setHomeRedirect = () => { this.setState({ homeRedirect: true }) }
  
  openModal()  {this.setState({visible : true})}
  
  closeModal() {this.setState({visible : false, redirectHome: true})}

  handleDateChange(date) { this.setState({ hearingDate: date })}
  handleTimeChange(newTime){
    this.setState({ 
      time: newTime.formatted 
    })
  }
  
  _next = () => {
    let currentStep = this.state.currentStep
    if (!this.state.enableNextAction){ // there are errors
     this.setState({ enableErrors: true }) }
    else{
     currentStep = currentStep >= 2? 3: currentStep + 1
     this.setState({ currentStep: currentStep, enableErrors: false, enableNextAction: false }) }
  }
  _prev = () => {
    if (this.props.location.backhome){ this.props.history.push({ pathname: '/', state: {...this.state} }) }
    if(this.state.enableNextAction === false){ this.setState({ enableNextAction: true })}
    let currentStep = this.state.currentStep
    currentStep = currentStep <= 1 ? 0 : currentStep - 1
     this.setState({ currentStep: currentStep})
    if (currentStep <= 0){ this.setState({redirectHome: true}) }
  }

  nextButton(){
    let currentStep = this.state.currentStep;
    if(currentStep <2){return (<div><button className="btn btn-primary link-button wizard-btn btn-block" type="button" onClick={this._next}>Continue </button><br/><br/></div>)}
     return null;
  }

  handleSelectChange = areaOfLaw => {
    this.setState({ 
      areaOfLaw: areaOfLaw
    });
    console.log(`Option selected:`, areaOfLaw);
  };

  handleSelectCountyChange = county => {
    this.setState({ county: county });
    console.log(`Option selected:`, county);
  };

  handleSelectCourtHouseChange = courts => {
    this.setState({ courtHouse: courts });
    console.log(`courthouse selected:`, courts);
  };




 render() {


  const {errors,currentStep} = this.state

  if (this.state.redirectHome) { return <Redirect to={{
      pathname: '/home',
      state: { key: "myrequests"} }} />
   } // Go back to /definerole

   return (
     <div className="container main-body">
     <Dialog ref={(el) => { this.dialog = el }} />
      <Modal 
        visible={this.state.visible}
        width="400"
        height="500"
        effect="fadeInDown"
        onClickAway={() => this.closeModal()}>
        
        <div className="modalRequestHead">
          <img src={requestImg} alt="esquired" /> <br/><br/>
          <h5>Your request has been published<br/> successfully!</h5>
          <button onClick={() => this.closeModal()}  style={{marginTop: "10px"}} className="btn btn-lg btn-block btn-primary link-button">Done</button> 
        </div>
   
      </Modal>
      
      <h3 onClick={this._prev} style={{cursor: "pointer"}}> <img  style={{marginBottom: "5px"}} width="16px" src={backbutton} alt="esquired" /> New request</h3>
        
        <form onSubmit={this.handleSubmit} >
        <Step1
          currentStep={currentStep}
          nextButton={this.nextButton()}
          handleChange={this.handleChange}
          courtHouse={this.state.courtHouse}
          areaOfLaw={this.state.areaOfLaw}
          department={this.state.department}
          caseName={this.state.caseName}
          caseNumber={this.state.caseNumber}
          county={this.state.county}
          state={this.state}
          handleSelectChange={this.handleSelectChange}
          handleSelectCountyChange={this.handleSelectCountyChange}
          handleSelectCourtHouseChange={this.handleSelectCourtHouseChange}
          errors={errors}
          
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
          handleChangeCP={this.handleChangeCP}
          handleChangeLC={this.handleChangeLC}
          state={this.state}
          handleDateChange={this.handleDateChange}
          handleTimeChange={this.handleTimeChange}
          fileSelectedHandler={this.fileSelectedHandler}
          deleteFiles={this.deleteFiles}
          errors={errors}
        />

        {this.nextButton()}
        {errors.courtHouse && <div className="alert alert-danger" role="alert">{errors.courtHouse}</div>}
        {errors.areaOfLaw && <div className="alert alert-danger" role="alert">{errors.areaOfLaw}</div>}
        {errors.department && <div className="alert alert-danger" role="alert">{errors.department}</div>}
        {errors.caseName && <div className="alert alert-danger" role="alert">{errors.caseName}</div>}
        {errors.caseNumber && <div className="alert alert-danger" role="alert">{errors.caseNumber}</div>}
        {errors.county && <div className="alert alert-danger" role="alert">{errors.county}</div>}
        {errors.hearingDate && <div className="alert alert-danger" role="alert">{errors.hearingDate}</div>}
        {errors.time && <div className="alert alert-danger" role="alert">{errors.time}</div>}
        
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



        for (var i = 0; i < optionsCourts.length; i++){

          if (optionsCourts[i] === props.county){
              var courtsh = optionsCourts[i].courts
          }
        }
        console.log(props.county)

    return(
      <div>
        <div className="center"><ProgressBar height={5} percent={50} filledBackground="#2ad4ae" ></ProgressBar> <img alt="checkimg" className="grey-check-icon" width="18px" src={checkImg} /></div><br />
        <p>Complete info</p>

            <Select placeholder="County..." required options={optionsCourts}  name="county" style={{width: "100%"}} onChange={props.handleChange} value={props.county} className={props.state.countyValid || !props.state.enableErrors ? null : "errorSelect"}/>

            <div style={{marginTop: "10px", marginBottom: "10px"}}>
              <Select placeholder="Court House..." required options={courtsh}  name="courtHouse" style={{width: "100%"}} onChange={props.handleChange} value={props.courtHouse} className={props.state.courtHouseValid || !props.state.enableErrors ? null : "errorSelect"}/>
            </div>

            <Select placeholder="Area of Law..." isSearchable required options={options}  name="areaOfLaw" style={{width: "100%"}} onChange={props.handleChange} value={props.areaOfLaw} className={props.state.areaOfLawValid || !props.state.enableErrors ? null : "errorSelect"}/>
            
            
            <input name="department" style={{marginTop: "10px"}} placeholder="Department"  type="text" className={props.state.departmentValid || !props.state.enableErrors ? "form-control" : "error"} onChange={props.handleChange} value={props.department} ></input>
            
            <input name="caseName"   placeholder="Case Name"   type="text" className={props.state.caseNameValid || !props.state.enableErrors ? "form-control" : "error"} onChange={props.handleChange} value={props.caseName} ></input>
            
            <input name="caseNumber" placeholder="Case Number" type="text" className={props.state.caseNumberValid || !props.state.enableErrors ? "form-control" : "error"} onChange={props.handleChange} value={props.caseNumber} ></input>
      </div>
      )
  }

  function Step2(props){
    if(props.currentStep !== 2){
      return null;
    }


    return (
      <div>
      <div className="center"><ProgressBar height={5} percent={100} filledBackground="#2ad4ae" ></ProgressBar> <img alt="checkimg" className="check-icon" width="18px" src={checkImg} /></div><br />
        <p>Complete info</p>
            
            <DatePicker
              className="form-control inputdatepicker"
              selected={ props.state.hearingDate }
              onChange={ props.handleDateChange }
              name="hearingDate"
              value={ props.state.hearingDate}
              locale="en"
              dateFormat="yyyy-dd-MM"
            />
             
             <TimeKeeper 
               time={props.state.time}
               name="time" 
               onChange={props.handleTimeChange} 
               config={{
                    TIME_SELECTED_COLOR: '#2ad4ae'
                    }}
             />


          
          {props.state.errors.instructions && <div style={{fontSize: "13px", padding: "1px", margin: "0px",color:"red"}} >{props.state.errors.instructions}</div>}
          <textarea name="instructions" placeholder="Description/instructions" className="form-control" cols="40" rows="5" onChange={props.handleChange} value={props.instructions}></textarea>
            <br/>
            <div className="flex-space-between">
              <label> Client present or not?</label>
                <div className="flex-space-between">
                 <span style={{marginRight: "5px"}}>No </span><Switch onChange={props.handleChangeCP} offColor="#B9D5FB" onColor="#2ad4ae" checkedIcon={false} uncheckedIcon={false} height={25} checked={props.clientPresent} /><span style={{marginLeft:"5px"}}>Yes</span></div>
            </div>
            <br/>


            <br/>
            <div className="flex-space-between">
              <label> Late call accepted?</label>
                 <div className="flex-space-between">
                 <span style={{marginRight: "5px"}}>No </span>
                 <Switch onChange={props.handleChangeLC} offColor="#B9D5FB" onColor="#2ad4ae" checkedIcon={false} uncheckedIcon={false} height={25} checked={props.lateCall} /><span style={{marginLeft:"5px"}}>Yes</span></div>
            </div>
            <br/>

            <div>
              <p><b>Documents</b></p>
              <label className="uploadLabel squareUpload" htmlFor="avatar" >
               <div className="squareImg uploadsimg" >
                 <img src={uploadImg} alt="profileImg" width="150px" /><br />Upload<br />
                 <input id="avatar" multiple type="file" className="inputfile" name="avatar" onChange={props.fileSelectedHandler} /><br /><br /> 
                </div>
              </label><br/>
            </div>

            <div>
            {props.state.documents ? 
              props.state.documents.map((x,i) => (
                  <div key={i} style={{marginBottom: "10px"}}><a href={x.location} className="link-new-file" download rel="noopener noreferrer" target="_blank">{x.originalname}</a></div>
              )): null}
              {props.state.documents.length > 0 ? <button className="clearFiles" style={{marginBottom: "20px"}} onClick={props.deleteFiles}>Clear files</button> : null }
            </div>

            <input name="price" type="hidden" className="form-group" value={props.price} />
            <input disabled={props.state.uploading} className="btn btn-block link-button" type="submit" value="Create request"></input><br />
     
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
  if(!values.county) {
    errors.county = 'Insert County'
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




