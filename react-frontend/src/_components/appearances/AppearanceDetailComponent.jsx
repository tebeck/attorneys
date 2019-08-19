import React, { Component } from 'react';
import { Redirect} from 'react-router-dom';
import {appearanceService} from '../../_services/appearance.service'
import {userServices} from '../../_services/user.service'
import Moment from 'react-moment';
import Modal from 'react-awesome-modal';
import Cookie from 'js-cookie'
// import listFilterImg from '../../_assets/img/listing_filter.png'
// import listSortImg from '../../_assets/img/listing_sort.png'
// import priceImg from '../../_assets/img/appearance/appearance_price.png'
// import pingImg from '../../_assets/img/appearance/appearance_pin.png'
import dateImg from '../../_assets/img/appearance/appearance_date.png'
import welldoneImg from '../../_assets/img/request_welldone.png'
import { Link } from 'react-router-dom';
import backbutton from '../../_assets/img/btnback.png'
import Switch from "react-switch";  
// import { FilePond } from 'react-filepond';
// import 'filepond/dist/filepond.min.css';
import LoaderAnimation from '../LoaderAnimation';
// import {url_backend} from '../../_helpers';
import uploadImg from '../../_assets/img/request/request_upload.png'
import TimeKeeper from 'react-timekeeper';
import DatePicker from "react-datepicker";
// import moment from 'moment';
import 'rc-time-picker/assets/index.css';
// import 'moment/locale/it.js';
import greyFaceImg from '../../_assets/img/grey-user.png'
import sobre from '../../_assets/img/sobre.png'
import phone from '../../_assets/img/phone.png'
import Cookies from 'js-cookie';

let docs = []
let uploadForm = new FormData();
// const formData = new FormData(); // Currently empty

export default class AppearancesComponent extends Component {
	

	constructor(props) {
	  super(props);
	  this.state = {
	  	userId: Cookie.getJSON('esquired').userId,
	  	attorneyId: props.location.state.appearanceData.attorneyId,
	  	recordView: props.location.state.recordView,
	  	appId: props.location.state.appearanceData._id,
	  	status: props.location.state.appearanceData.status,
	  	seekerId: props.location.state.appearanceData.subscription.seekerId,
	  	agendaClick: props.location.state.agendaClick,
	  	myRequestsClick: props.location.state.myRequestsClick,
	  	appearancesClick: props.location.state.appearancesClick,
      	files: [],
      	redirectHome: false,
      	showLoader: true,
      	redirectMyRequests: false,
      	email: Cookies.getJSON('esquired').email
      };
      
		docs = this.state.documents

	   let body = {
	     appId: props.location.state.appearanceData._id
	   }
   		appearanceService.getAppDetail(body)
	      .then((result) => {	
	      	this.setState({
	      		result: result.data,
	      		clientPresent: result.data.clientPresent,
	      		lateCall: result.data.lateCall,
	      		caseName: result.data.caseName,
	      		courtHouse: result.data.courtHouse,
	      		areaOfLaw: result.data.areaOfLaw,
	      		department: result.data.department,
	      		instructions: result.data.instructions,
	      		documents: result.data.documents,
	      		county: result.data.county,
                hearingDate: new Date(result.data.hearingDate),
                time: result.data.time,
                verdictDocs: result.data.subscription.verdictDocs,
                verdictDetail: result.data.subscription.information,
                appearanceState: result.data.subscription.state
	      	})})
	    

	  var recordData = { uid: this.state.attorneyId}
	  var seekerData = { uid: this.state.seekerId }

	  userServices.getUserProfile(recordData)
	    .then(recordInfo => this.setState({recordData: recordInfo}) )
	    	

	  if(props.location.state.appearanceData.subscription.seekerId.length > 0){  	
	    userServices.getUserProfile(seekerData)
	    	.then((dataProfiles) => this.setState({ seekerData: dataProfiles }))	
	  } else { this.state.seekerData = "not applied" }

    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);	      
    this.handleChangeLC= this.handleChangeLC.bind(this); // Late call input
    this.handleChangeCP= this.handleChangeCP.bind(this); // client present input


	}



	

  handleDateChange(date) { this.setState({ hearingDate: date })}
  handleTimeChange(newTime){
    this.setState({ 
      time: newTime.formatted 
    })
  }

	handleClick = (e) =>{
	 e.preventDefault()



    let body = {
      appId: this.state.appId
    }

     appearanceService.subscribe(body)
     	.then(data => {
          if(data.status === 200){
	 		console.log(data.data.courtHouse)
		     let findCourt ={
		     	court: data.data.courtHouse,
		     	day: data.data.hearingDate.substr(0,10)
		     }
		     appearanceService.getAppearanceByCourt(findCourt)
		       .then(data => this.setState({courtHouseNumber: data.data.length}))

	       this.openModal()
          }
     	}
    )}


    cancelAppearance = (e) =>{
      e.preventDefault()
	  var _deleteApp = window.confirm("Are you sure you want to delete this appearance?");
	  if (_deleteApp === true) {
      let body = {
     	appId: this.state.appId
      }
      
       appearanceService._delete(body)
        .then(alert("Appearance deleted"))
        .then(window.location.assign('/home'))
      }
    }
	

	handleUpdate = (e) => {
	 e.preventDefault()

	 if(this.state.newDocuments){
	 this.state.newDocuments.map(x =>{
	 	return this.state.documents.push(x)
	 })
	}

	 appearanceService.update(this.state)
	 	.then(data => alert("Your request was succesfully updated"))
	 	.then(uploadForm.delete('avatar'))
	 	.then(this.setState({
	 	  redirectMyRequests: true
	 	}))

	}









	openModal() {
     this.setState({
        visible : true
     });
    }

    closeModal() {
     this.setState({
       visible : false,
       redirectHome: true
     });
    }

  handleChangeLC(lateCall){
    this.setState({ lateCall });
  }
  handleChangeCP(clientPresent){
    this.setState({ clientPresent });
  }


  handleChange = ({target}) =>{
  	this.setState({ [target.name]: target.value });
  }








  handleDelete = (e) =>{
  	e.preventDefault()
   
	var _delete = window.confirm("Are you sure you want to delete this item?");
	if (_delete === true) {
   
	   let etag = {
	  	 etag: e.target.name,
	  	 appId: this.state.appId,
	   } 

	   
	   docs.splice(e.target.id, 1)
	  
	   appearanceService.deleteFile(etag)
	  	.then(data => {
	  		if(data.status === 200){
			  this.setState({
			  	documents: docs
		 	  })
	  	 	}
	  	 })

	} else {
	  
	}



  }



  fileSelectedHandler = ({target}) => {
   for (var i = 0; i < target.files.length; i++) {
     uploadForm.append('avatar', target.files[i] , target.files[i].name)
   }

    userServices.multiupload(uploadForm)
      .then(data => {
         this.setState({
          newDocuments: data.data.location 
         })

      })
      .then(target.value = '')
  }

  clearFiles = (e) => {

   e.preventDefault()
    var r = window.confirm("Do you want to clear all files?");
    if (r === true) {
     
     uploadForm.delete('avatar')

     
     this.setState({ newDocuments: [] });
    }

  }

  handleStaking = (result) =>{
  	
  	this.setState({
  		stackingData: result,
  		stackingRedirect: true
  	})

  }


  handleEmailStacking = (result) => {

  	
  }



 render() {

 	const {result, documents, recordData, seekerData} = this.state
 	 docs = this.state.documents





  if(result && recordData && seekerData){
	  
	  if (this.state.stackingRedirect) { return <Redirect to={{
	      pathname: '/stacking',
	      state: { data: this.state.result} }} />
	   }	

	  if (this.state.redirectHome) { return <Redirect to={{
	      pathname: '/home',
	      state: { key: "myappearances"} }} />
	   }
	  if (this.state.redirectMyRequests) { return <Redirect to={{
	      pathname: '/home',
	      state: { key: "myrequests"} }} />
	   }


     var checkStatus;
     
     if( 
      this.state.status === "accepted" ||
      this.state.status === "completed" ||
      this.state.status === "finished" ||
      this.state.userId === this.state.seekerId ||
      !this.state.recordView )
       	{ checkStatus = false }
       else { checkStatus = true  }


	return (



		<div className="container main-body">
	  

	  <Modal visible={this.state.visible} width="370"  effect="fadeInDown" onClickAway={() => this.closeModal()}>
	   <div style={{padding: "20px",textAlign: "center"}}>
	    <img alt="welldone" width="250px" src={welldoneImg}/><br/><br/>
	    <h5><b>Well done!</b></h5>
	     <p className="colorGrey">We will send you an email with confirmation and additional info.</p>
	   
	    <button onClick={() => this.closeModal()} className="btn btn-primary link-button btn-request outline-btn">Done</button><br />

	    {this.state.courtHouseNumber > 0 ?

	    <div className="stackingCard" >
	    {this.handleEmailStacking(result)}
	    	<p>We have detected {this.state.courtHouseNumber} appearances for<br/>the same day in the same court</p>
	    	<button onClick={this.handleStaking.bind(this,result)} className="btn btn-primary link-button btn-request">View Appearances</button>
	    </div>
	     : null}
	  </div>
	  </Modal>


	    {this.state.agendaClick ? 
	     <Link style={{color: "black"}} to={{ pathname: '/home',state: { key: "agenda"} }}>
	       <img width="16px" style={{marginBottom: "11px"}} src={backbutton} alt="esquired" />
	       <h3 style={{display: "inline"}  }> Appearance Detail</h3>
	    </Link>:
	    this.state.appearancesClick ?
	    <Link style={{color: "black"}} to={{ pathname: '/home',state: { key: "myappearances"} }}>
	       <img width="16px" style={{marginBottom: "11px"}} src={backbutton} alt="esquired" />
	       <h3 style={{display: "inline"}  }> Appearance Detail</h3>
	    </Link>:
	    this.state.myRequestsClick ?
	    <Link style={{color: "black"}} to={{ pathname: '/home',state: { key: "myrequests"} }}>
	       <img width="16px" style={{marginBottom: "11px"}} src={backbutton} alt="esquired" />
	       <h3 style={{display: "inline"}  }> Appearance Detail</h3>
	    </Link>:null
		}
	       <hr />

	     

	       <div className="adSquares">
	       { this.state.status !== "pending" && this.state.status !== "applied" ? 
	         <div className="adSquare">
	         	<p>Request created by:</p>
	         	  	<div className="adSquareDetail">
	         	  	 <div className="">

	         	  	 	{recordData ?
	                      recordData.profilePicture ? 
	                        <div class="detail-profile-picture">
	                         <img  alt="avatar" src={recordData.profilePicture} />
	                        </div>
	                       : 
	                       <div>
							 <img className="detail-profile-picture" src={greyFaceImg} alt={recordData.firstName} />
	                       </div> 
	         	  	 	: null}
	         	  	 </div>
	         	  	 <div>
	         	  	   <p className="adSquareName">{recordData.firstName}</p>
	         	  	   <p className="adSquareEmail">{recordData.email}</p>
         	  	 		{recordData.email !== this.state.email ?
         	  	 		<div className="contactImages"> 	 
	         	  	 	 <p className="desktop-content">{recordData.mobilePhone}</p>
	         	  	 	 <a className="mobile-content" rel="noopener noreferrer" target="_blank" href={'tel:+'+ recordData.mobilePhone}><img height="33" src={phone} alt="esquired" /></a>
	         	  	 	 <a href={'mailto:'+recordData.email} ><img height="25" src={sobre} alt="esquired" /></a>
	         	  	 	</div> :null}
	         	  	 </div>

	         	    </div>
	         	    
	         </div> : null }
	      { this.state.seekerId.length > 0 ?
	         <div className="adSquare">
	            <p>Request applied by:</p>
	         	  	<div className="adSquareDetail">
	         	  	 <div className="">
	         	  	 	{seekerData.profilePicture ?
	                        <div class="detail-profile-picture">
	                         <img  alt="avatar" src={seekerData.profilePicture} />
	                        </div>
	         	  	 		:
	         	  	 	  <img  className="detail-profile-picture" src={greyFaceImg} alt={seekerData.firstName} />
	         	  	 	}
	         	  	 </div>
	         	  	 <div>
	         	  	   <p className="adSquareName">{seekerData.firstName}</p>
	         	  	   <p className="adSquareEmail">{seekerData.email}</p>
	         	  	 	{ seekerData.email !== this.state.email ?
	         	  	 	<div className="contactImages">
	         	  	 	 <p className="desktop-content">{seekerData.mobilePhone}</p>
	         	  	 	 <a className="mobile-content" rel="noopener noreferrer" target="_blank" href={'tel:+'+ seekerData.mobilePhone}><img height="33" src={phone} alt="esquired" /></a>
	         	  	 	 <a href={'mailto:'+seekerData.email} ><img height="25" src={sobre} alt="esquired" /></a>
	         	  	 	</div> :null}
	         	  	 </div>
	         	    </div>
	         </div>
	        : null }
	       </div>
	      	 <div>
	      	  <div className="appearanceDate">
	      	  	<div className="flex">
	      	  	  <img src={dateImg} alt="date" style={{marginRight: "25px", width: "40px", height: "40px"}}/>
	      	  	  <div>
	      	  	  	<p className="adTitle">Appearance date</p>
	      	  	    <Moment className="timeformat" format="LL">{result.hearingDate}</Moment><span className="timeformat"> {result.time}</span>
	      	  	  </div>
				</div>
	      	  </div>
	      	  <hr />
	      	  <form >

	      	 <p className="adTitle">Hearing Date</p>
	      	<DatePicker
              className="form-control inputdatepicker"
              selected={ this.state.hearingDate }
              onChange={ this.handleDateChange }
              name="hearingDate"
              value={ this.state.hearingDate }
              locale="en"
              dateFormat="yyyy-dd-MM"
              disabled={!checkStatus}
              /><hr />
             <p className="adTitle">Time</p>
             <div className={!checkStatus ? "disabled" : null} >
             <TimeKeeper 
               time={this.state.time}
               name="time" 
               onChange={this.handleTimeChange} 
               config={{TIME_SELECTED_COLOR: '#2ad4ae'}}
               /><hr />
             </div>
	      	    <p className="adTitle">Case Name</p>
	      	    <input name="caseName" type="text" className="form-control" value={this.state.caseName} disabled={!checkStatus} onChange={this.handleChange}/>
	            <hr />
	            <p className="adTitle">County</p>
	             <input name="county" type="text" className="form-control" value={this.state.county} disabled={!checkStatus} onChange={this.handleChange}/>
	            <hr />
	            <p className="adTitle">Courthouse</p>
	            <input name="courtHouse" type="text" className="form-control" value={this.state.courtHouse} disabled={!checkStatus} onChange={this.handleChange}/>
	            <hr />
	            <p className="adTitle">Area of Law</p>
	            <div className="input-group mb-3"><div className="input-group-prepend">
	            <label className="input-group-text" htmlFor="areaOfLawInput"></label></div>
	              <select name="areaOfLaw" className="custom-select" id="areaOfLawInput" value={this.state.areaOfLaw} disabled={!checkStatus} onChange={this.handleChange}>
	                <option defaultValue>{this.state.areaOfLaw}</option>
	                <option value="CRIMINAL">CRIMINAL</option>
	                <option value="CIVIL">CIVIL</option>
	                <option value="COMMON">COMMON</option>
	              </select>
	            </div>
	            <hr />
	            <p className="adTitle">Department</p>
	            <input name="department" type="text" className="form-control" value={this.state.department} disabled={!checkStatus} onChange={this.handleChange}/>
	            <hr />
	            <p className="adTitle">Client present or not?</p>
	            <br/>
	            <div className="flex-space-between">
	               <Switch checked={this.state.clientPresent} onChange={this.handleChangeCP} offColor="#B9D5FB" onColor="#2ad4ae" checkedIcon={false} uncheckedIcon={false} height={25} disabled={!checkStatus} />
	            </div>
	            <br/>
	            <hr />
	            <p className="adTitle">Late call accepted?</p>
	            <br/>
	            <div className="flex-space-between">
	               <Switch checked={this.state.lateCall} onChange={this.handleChangeLC} offColor="#B9D5FB" onColor="#2ad4ae" checkedIcon={false} uncheckedIcon={false} height={25} disabled={!checkStatus} />
	            </div>
	            <br/>
	            <hr />
	            <p className="adTitle">Pay Amount</p>
	             <input type="text" className="form-control" value="50" disabled />
	            <hr />
	            <p className="adTitle">Description</p>
	            <textarea name="instructions" className="form-control" cols="40" rows="5" value={this.state.instructions} disabled={!checkStatus} onChange={this.handleChange}></textarea>
	             
	            <hr />
	            
	            { documents.length > 0 ? <p className="adTitle">Files</p> : null }
	             {
	             	documents.map((x,index) => 
	             		<div key={index}><a href={x.location} className="link-file" download rel="noopener noreferrer" target="_blank">{x.originalname}</a>
	             		 {checkStatus ? 
	             		 <button  className="xdelete" id={index} name={x.etag} onClick={this.handleDelete}> x</button> :null
	             		}<hr /></div>
	                )
	             }
	             
	            {this.state.verdictDocs.length > 0 ? <p className="adTitle">Verdict files</p> : null }
	            <div>
	            {this.state.verdictDocs ? 
	              this.state.verdictDocs.map(x => 
	            	<div style={{marginBottom: "10px"}}><a href={x.location} className="link-new-file" download rel="noopener noreferrer" target="_blank">{x.originalname}</a><hr /></div>
	              ): <p>No files uploaded</p>}

	            </div>
	           
	            {this.state.verdictDetail  ? 
	              <div><p className="adTitle">Verdict information</p>
	            	<input name="verdictDetail" type="text" className="form-control" value={this.state.verdictDetail} disabled={!checkStatus} onChange={this.handleChange}/>  
	               <hr /></div> : null}

	           
	            
	            <div>
	            { this.state.recordView ?
	            <div>
	            <br/>
	              {checkStatus ? <p><b>Documents</b></p> : null}
	              <label className={!checkStatus ? "squareUploadDisable" : "uploadLabel squareUpload"} htmlFor="avatar"  >
	               <div className="squareImg" >
	                 <img src={uploadImg} alt="profileImg" width="150px" /><br />Upload<br />
	                 <input id="avatar" multiple type="file" className="inputfile" name="avatar" onChange={this.fileSelectedHandler} /><br /><br /> 
	                </div>
	              </label><br/>
	             </div>
	              : null }
	            
	            </div>


	            <div>
	            {this.state.newDocuments ? 
	              this.state.newDocuments.map((x,i) => (
	            <div key={i} style={{marginBottom: "10px"}}><a href={x.location} className="link-new-file" download rel="noopener noreferrer" target="_blank">{x.originalname}</a><hr /></div>
	              )): null}
	              {this.state.newDocuments ? <button className="clear-files" onClick={this.clearFiles}>Clear files</button> : null }
	            
	            </div>
	            

	            

	            {!this.state.recordView ?
	            <button className="btn btn-primary link-button btn-request" onClick={this.handleClick}>Apply Request</button> :
 	            
 	            this.state.attorneyId === this.state.userId ?
 	             this.state.status === "pending" || this.state.status === "applied" ?
	            <div>
	             <span style={{display: "block", cursor: "pointer"}} onClick={this.cancelAppearance} className="termsLabel" to="/home" >Cancel Apperance</span><br/>
	             <button className="btn btn-primary link-button btn-request" onClick={this.handleUpdate}>Update Request</button>
	            </div>: null : null
	          	}
	         </form>


	          <br /><br />

	          <br />

	         </div>
	       
	      
	       

	    </div>
	)} else {
		return ( <div className="centered"><LoaderAnimation /></div> )
	}
}

}

