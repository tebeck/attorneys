import React, { Component } from 'react';
import { Redirect} from 'react-router-dom';
import {appearanceService} from '../../_services/appearance.service'
import {userServices} from '../../_services/user.service'
import Moment from 'react-moment';
import Modal from 'react-awesome-modal';
import Cookie from 'js-cookie'
import listFilterImg from '../../_assets/img/listing_filter.png'
import listSortImg from '../../_assets/img/listing_sort.png'
import priceImg from '../../_assets/img/appearance/appearance_price.png'
import pingImg from '../../_assets/img/appearance/appearance_pin.png'
import dateImg from '../../_assets/img/appearance/appearance_date.png'
import welldoneImg from '../../_assets/img/request_welldone.png'
import { Link } from 'react-router-dom';
import backbutton from '../../_assets/img/btnback.png'
import Switch from "react-switch";  
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import LoaderAnimation from '../LoaderAnimation';
import {url_backend} from '../../_helpers';


const formData = new FormData(); // Currently empty
export default class AppearancesComponent extends Component {
	

	constructor(props) {
	  super(props);
	  this.state = {
	  	userId: Cookie.getJSON('esquired').userId,
	  	isAttorney: props.location.state.isAttorney, 
	  	appId: props.location.state.appearanceData._id,
      	files: [],
      	redirectHome: false,
      	showLoader: true
      };
      
      
	   let body = {
	     appId: props.location.state.appearanceData._id
	   }
   		appearanceService.getSpecific(body)
	      .then((result) => 	
	      	this.setState({
	      		result: result.data,
	      		clientPresent: result.data.clientPresent,
	      		lateCall: result.data.lateCall,
	      		caseName: result.data.caseName,
	      		courtHouse: result.data.courtHouse,
	      		areaOfLaw: result.data.areaOfLaw,
	      		department: result.data.department,
	      		instructions: result.data.instructions

	      	})
	      ) 
    this.handleChangeLC= this.handleChangeLC.bind(this); // Late call input
    this.handleChangeCP= this.handleChangeCP.bind(this); // client present input	






	}
	


	handleClick = (e) =>{
	 e.preventDefault()

    let body = {
      appId: this.state.appId,
      email: this.state.email
    }

     appearanceService.subscribe(body)
     	.then(data => {
          if(data.status === 200){
           userServices.sendmail(data)
	       this.openModal()
          }
     	}
    )}

	

	handleUpdate = (e) => {
	 e.preventDefault()
	 console.log(this.state.files)


	 // appearanceService.updateAll(this.state)
	 // 	.then(data => console.log(data))

	}



    handleInit() {
        console.log('FilePond instance has initialised');
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


 render() {

 	const {result} = this.state
 	

// 	const serverUpload = `${url_backend}/files/multiupload`;

	const serverConfig = {
	       url: `${url_backend}/files/multiupload`,
        timeout: 7000,
        process: {
            method: 'POST',
        	onload: (response) => { console.log(JSON.parse(response).map(x => x.location) ) }
        },
        
        revert: null,
        restore: './restore/',
        load: './load/'
    };




	if(result){


		 		
	let location = result.documents.map(z =>
		z.location )



  if (this.state.redirectHome) { return <Redirect to={{
      pathname: '/home',
      state: { key: "myappearances"} }} />
   } // Go back to /definerole






	return (
		<div className="container main-body">
	  

	  <Modal visible={this.state.visible} width="370" height="445" effect="fadeInDown" onClickAway={() => this.closeModal()}>
	   <div style={{padding: "20px",textAlign: "center"}}>
	    <img width="250px" src={welldoneImg}/><br/><br/>
	    <h5><b>Well done!</b></h5>
	     <p className="colorGrey">We will send you an email with confirmation and additional info.</p>
	   
	    <button onClick={() => this.closeModal()} className="btn btn-primary link-button btn-request outline-btn">Done</button>
	  </div>
	  </Modal>


	      <Link style={{color: "black"}} to={{
      pathname: '/home',
      state: { key: "myappearances"} }}>
	       <img width="16px" style={{marginBottom: "11px"}} src={backbutton} alt="esquired" />
	       <h3 style={{display: "inline"}  }> Appearance Detail</h3>
	      </Link>			
	       <hr />
	      	 <div>
	      	  <div className="appearanceDate">
	      	  	<div className="flex">
	      	  	  <img src={dateImg} style={{marginRight: "25px", width: "40px", height: "40px"}}/>
	      	  	  <div>
	      	  	  	<p className="adTitle">Appearance date</p>
	      	  	    <Moment className="timeformat adTime" format="LLL">{result.createdAt}</Moment> 
	      	  	  </div>
				</div>
	      	  </div>
	      	  <hr />
	      	  <form >
	      	    <p className="adTitle">Case Name</p>
	      	    <input type="text" className="form-control" value={this.state.caseName} disabled={!this.state.isAttorney} onChange={this.handleChange}/>
	            <hr />
	            <p className="adTitle">Court House</p>
	            <input type="text" className="form-control" value={this.state.courtHouse} disabled={!this.state.isAttorney} onChange={this.handleChange}/>
	            <hr />
	            <p className="adTitle">Area of Law</p>
	            <div className="input-group mb-3"><div className="input-group-prepend">
	            <label className="input-group-text" htmlFor="areaOfLawInput"></label></div>
	              <select name="areaOfLaw" className="custom-select" id="areaOfLawInput" value={this.state.areaOfLaw} disabled={!this.state.isAttorney} onChange={this.handleChange}>
	                <option defaultValue>{this.state.areaOfLaw}</option>
	                <option value="CRIMINAL">CRIMINAL</option>
	                <option value="CIVIL">CIVIL</option>
	                <option value="COMMON">COMMON</option>
	              </select>
	            </div>
	            <hr />
	            <p className="adTitle">Department</p>
	            <input type="text" className="form-control" value={this.state.department} disabled={!this.state.isAttorney} onChange={this.handleChange}/>
	            <hr />
	            <p className="adTitle">Client present or not?</p>
	            <br/>
	            <div className="flex-space-between">
	               <Switch checked={this.state.clientPresent} onChange={this.handleChangeCP} offColor="#B9D5FB" onColor="#2ad4ae" checkedIcon={false} uncheckedIcon={false} height={25} disabled={!this.state.isAttorney} />
	            </div>
	            <br/>
	            <hr />
	            <p className="adTitle">Late call accepted?</p>
	            <br/>
	            <div className="flex-space-between">
	               <Switch checked={this.state.lateCall} onChange={this.handleChangeLC} offColor="#B9D5FB" onColor="#2ad4ae" checkedIcon={false} uncheckedIcon={false} height={25} disabled={!this.state.isAttorney} />
	            </div>
	            <br/>
	            <hr />
	            <p className="adTitle">Pay Amount</p>
	            <input type="text" className="form-control" value="50" disabled />
	            <hr />
	            <p className="adTitle">Description</p>
	            <input type="text" className="form-control" value={this.state.instructions} disabled={!this.state.isAttorney} onChange={this.handleChange}/>
	            <hr />
	            <p className="adTitle">Files</p>
	             {result.documents.map(x => <p key={x.etag}>{x.originalname}</p>)}
	            
	              <FilePond 
	              name="avatar" 
	              maxFiles={12}
	              allowMultiple={true} 
	              oninit={() => this.handleInit() }
                  server={serverConfig}
                  onupdatefiles={(fileItems) => {this.setState({ files: fileItems.map(fileItem => fileItem.file)}) }}
				  allowMultiple={true}
			      labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                  >

	              </FilePond>

	            <hr /> <br/>
	            {!this.state.isAttorney ? 
	            <button className="btn btn-primary link-button btn-request" onClick={this.handleClick}>Accept Request</button> :
	            <div><span style={{display: "block", cursor: "pointer"}} onClick={this.cancelAppearance} className="termsLabel" to="/home" >Cancel Apperance</span>
	            <br/><button className="btn btn-primary link-button btn-request" onClick={this.handleUpdate}>Update Request</button></div>
	          	}
	         </form>

	          <br /><br /><br />
	         </div>
	       
	      
	       

	    </div>
	)} else {
		return ( <div className="centered"><LoaderAnimation /></div> )
	}
}

}


