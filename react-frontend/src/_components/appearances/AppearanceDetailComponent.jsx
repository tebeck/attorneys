import React, { Component } from 'react';
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


export default class AppearancesComponent extends Component {
	
	constructor(props) {
	  super(props);
	  this.state = {
	  	email: Cookie.getJSON('esquired').email,
	  	isAttorney: props.location.state.isAttorney
      };

      console.log(this.state)
	   let body = {
	     appId: props.location.state.appearanceData._id
	   }
   		appearanceService.getSpecific(body)
	      .then((result) => 	
	      	this.setState({
	      		result: result.data
	      	})
	      ) 	
	}
	
	 cancelAppearance = () => {
	 	alert("Appearance deleted")
	 }

	handleClick = () =>{
		const data = [this.state.email, "aaa", "232323"]
		userServices.sendmail(data)
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

 	const {result} = this.state
	if(result){
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


	      <Link style={{color: "black"}} to="/home">
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
	      	  <p className="adTitle">Case Name</p>
	      	  <p>{result.caseName}</p>
	          <hr />
	          <p className="adTitle">Court House</p>
	          <p>{result.courtHouse}</p>
	          <hr />
	          <p className="adTitle">Type of Case</p>
	          <p>Civil</p>
	          <hr />
	          <p className="adTitle">Type of Appearance</p>
	          <p>General</p>
	          <hr />
	          <p className="adTitle">Pay Amount</p>
	          <p>$50</p>
	          <hr />
	          <p className="adTitle">Description</p>
	          <p>{result.instructions}</p><br />
	          
	          {!this.state.isAttorney ? 
	            <button className="btn btn-primary link-button btn-request" onClick={this.handleClick}>Accept Request</button> :
	            <span style={{display: "block"}} onClick={this.cancelAppearance} className="termsLabel" to="/home" >Cancel Apperance</span>}

	          <br /><br /><br />
	         </div>
	       
	      
	       

	    </div>
	)} else {
		return ( <p>Appearance detail not found</p> )
	}
}

}


